import {
  readLocal,
  writeLocal,
  safeWebsite,
  type Center,
  type Restaurant,
} from "./model";
export const OVERPASS = "https://overpass.private.coffee/api/interpreter";
export const OVERPASS_FALLBACK = "https://overpass-api.de/api/interpreter";
const endpoints = [OVERPASS, OVERPASS_FALLBACK];
const attemptTimeout = 25000;
let busyUntil = 0;
class ServiceError extends Error {
  constructor(
    message: string,
    readonly retryable = false,
  ) {
    super(message);
  }
}
export type OsmElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};
async function fetchJson(url: string, signal: AbortSignal, init?: RequestInit) {
  let response: Response;
  try {
    response = await fetch(url, { ...init, signal });
  } catch (error) {
    if (signal.aborted) throw error;
    throw new ServiceError(
      "Could not reach the location or restaurant service. Check your connection and try again.",
      true,
    );
  }
  if (!response.ok) {
    if (response.status === 404 && !endpoints.includes(url))
      throw new Error(
        "That ZIP code was not found. Try a different US ZIP code.",
      );
    if (endpoints.includes(url) && [406, 429].includes(response.status)) {
      const retry = response.headers.get("Retry-After");
      const until =
        retry && /^\d+$/.test(retry)
          ? Date.now() + Number(retry) * 1000
          : Date.parse(retry || "");
      busyUntil = Math.max(
        Date.now() + 30000,
        Number.isFinite(until) ? until : 0,
      );
    }
    if ([406, 429, 504].includes(response.status))
      throw new ServiceError(
        "The restaurant service is busy. Please wait a minute before trying again.",
        response.status === 504,
      );
    throw new ServiceError(
      "The location or restaurant service is unavailable. Please try again shortly.",
      response.status >= 500,
    );
  }
  try {
    return await response.json();
  } catch (error) {
    if (signal.aborted) throw error;
    throw new ServiceError(
      "The location or restaurant service returned an unreadable response. Please try again shortly.",
      true,
    );
  }
}
async function fetchRestaurants(query: string, signal: AbortSignal) {
  // At most two sequential attempts. Never switch servers to evade a cooldown,
  // retry an invalid query, or accept an HTTP-200 partial result as complete.
  for (const [index, endpoint] of endpoints.entries()) {
    signal.throwIfAborted();
    const attempt = new AbortController();
    const cancel = () => attempt.abort(signal.reason);
    signal.addEventListener("abort", cancel, { once: true });
    const timeout = setTimeout(() => attempt.abort("timeout"), attemptTimeout);
    try {
      const json = await fetchJson(endpoint, attempt.signal, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ data: query }).toString(),
      });
      attempt.signal.throwIfAborted();
      if (json?.remark || !Array.isArray(json?.elements))
        throw new Error(
          "The restaurant search could not finish. Try a smaller radius, or wait a minute and retry.",
        );
      return json;
    } catch (error) {
      signal.throwIfAborted();
      const timedOut = attempt.signal.aborted;
      if (
        index === endpoints.length - 1 ||
        !(timedOut || (error instanceof ServiceError && error.retryable))
      ) {
        if (timedOut)
          throw new Error(
            "The restaurant search timed out. Try a smaller radius or retry shortly.",
          );
        throw error;
      }
    } finally {
      clearTimeout(timeout);
      signal.removeEventListener("abort", cancel);
    }
  }
}
export async function resolveZip(
  zip: string,
  signal: AbortSignal,
): Promise<Center> {
  if (!/^\d{5}$/.test(zip)) throw new Error("Enter a five-digit US ZIP code.");
  const cached = readLocal<{ time: number; center: Center } | null>(
    `eat:zip:${zip}`,
    null,
  );
  if (
    cached &&
    Date.now() - cached.time < 30 * 86400000 &&
    Number.isFinite(cached.center?.lat) &&
    Number.isFinite(cached.center?.lon)
  )
    return cached.center;
  const json = await fetchJson(`https://api.zippopotam.us/us/${zip}`, signal);
  const place = json?.places?.[0];
  const center = {
    lat: place?.latitude?.trim() ? Number(place.latitude) : NaN,
    lon: place?.longitude?.trim() ? Number(place.longitude) : NaN,
    label: `${place?.["place name"]}, ${place?.["state abbreviation"]} ${zip}`,
  };
  if (
    !Number.isFinite(center.lat) ||
    !Number.isFinite(center.lon) ||
    Math.abs(center.lat) > 90 ||
    Math.abs(center.lon) > 180
  )
    throw new Error("No geographic center was available for that ZIP code.");
  writeLocal(`eat:zip:${zip}`, { time: Date.now(), center });
  return center;
}
export function normalizeElements(elements: OsmElement[]): Restaurant[] {
  const seen = new Set<string>();
  return elements.flatMap((e) => {
    const t = e.tags || {};
    const pos = e.center || e;
    if (
      !t.name ||
      !Number.isFinite(pos.lat) ||
      !Number.isFinite(pos.lon) ||
      t.disused === "yes" ||
      t.access === "private"
    )
      return [];
    // Buildings and POI nodes can represent the same venue. Deduplicate only
    // matching names with near-identical positions; retain separate branches.
    const key = `${t.name.toLowerCase()}:${pos.lat.toFixed(4)}:${pos.lon.toFixed(4)}`;
    if (seen.has(key)) return [];
    seen.add(key);
    const price = t["price:level"];
    const yesNo = (value?: string) =>
      value === "yes" || value === "only"
        ? true
        : value === "no"
          ? false
          : undefined;
    return [
      {
        id: `${e.type}/${e.id}`,
        name: t.name,
        lat: pos.lat,
        lon: pos.lon,
        cuisine: (t.cuisine || "")
          .toLowerCase()
          .split(";")
          .map((x) => x.trim())
          .filter(Boolean),
        address:
          [
            t["addr:housenumber"],
            t["addr:street"],
            t["addr:unit"] && `#${t["addr:unit"]}`,
            t["addr:city"],
            t["addr:state"],
            t["addr:postcode"],
          ]
            .filter(Boolean)
            .join(" ") ||
          t["addr:full"] ||
          "Address not listed",
        website: safeWebsite(t.website || t["contact:website"]),
        hours: t.opening_hours,
        price: ["$", "$$", "$$$"].includes(price)
          ? (price as Restaurant["price"])
          : undefined,
        takeout: yesNo(t.takeaway),
        dineIn: yesNo(t["dine_in"]),
        kind: t.amenity,
      },
    ];
  });
}
let lastRequest = 0;
export async function discoverRestaurants(
  center: Center,
  radius: number,
  signal: AbortSignal,
): Promise<{ restaurants: Restaurant[]; time: number; cached: boolean }> {
  signal.throwIfAborted();
  if (
    ![2, 5, 10, 15, 25].includes(radius) ||
    !Number.isFinite(center.lat) ||
    !Number.isFinite(center.lon) ||
    Math.abs(center.lat) > 90 ||
    Math.abs(center.lon) > 180
  )
    throw new Error("Invalid search location or radius.");
  // One most-recent search in session storage; no permanent location history.
  const key = `${center.lat.toFixed(5)}:${center.lon.toFixed(5)}:${radius}`;
  let cache: { key: string; restaurants: Restaurant[]; time: number } | null =
    null;
  try {
    cache = JSON.parse(sessionStorage.getItem("eat:search:v1") || "null");
  } catch {
    /* ignore */
  }
  if (
    cache?.key === key &&
    Date.now() - cache.time < 15 * 60000 &&
    Array.isArray(cache.restaurants)
  )
    return { ...cache, cached: true };
  if (Date.now() < busyUntil)
    throw new Error(
      `The restaurant service asked us to pause. Try again in ${Math.ceil((busyUntil - Date.now()) / 1000)} seconds.`,
    );
  if (Date.now() - lastRequest < 10000)
    throw new Error(
      "Please wait ten seconds between new area searches. Preference changes use the results already loaded.",
    );
  lastRequest = Date.now();
  const query = `[out:json][timeout:20][maxsize:33554432];nwr[amenity~"^(restaurant|fast_food|food_court)$"][name](around:${Math.round(radius * 1609.344)},${center.lat},${center.lon});out center;`;
  const json = await fetchRestaurants(query, signal);
  const restaurants = normalizeElements(json.elements);
  const time = Date.now();
  try {
    sessionStorage.setItem(
      "eat:search:v1",
      JSON.stringify({ key, restaurants, time }),
    );
  } catch {
    /* continue without caching */
  }
  return { restaurants, time, cached: false };
}
export function locateDevice(): Promise<Center> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(
        new Error(
          "Location is unavailable on this device. Please use a ZIP code.",
        ),
      );
    navigator.geolocation.getCurrentPosition(
      (p) =>
        resolve({
          lat: p.coords.latitude,
          lon: p.coords.longitude,
          label: "Your current location",
        }),
      () =>
        reject(
          new Error(
            "Location could not be accessed. You can still search by ZIP code.",
          ),
        ),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  });
}
