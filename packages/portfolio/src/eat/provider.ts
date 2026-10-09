import {
  readLocal,
  writeLocal,
  safeWebsite,
  type Center,
  type Restaurant,
} from "./model";
export const OVERPASS = "https://overpass-api.de/api/interpreter";
export type OsmElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};
async function fetchJson(url: string, signal: AbortSignal, init?: RequestInit) {
  const response = await fetch(url, { ...init, signal });
  if (!response.ok) {
    if (response.status === 404)
      throw new Error(
        "That ZIP code was not found. Try a different US ZIP code.",
      );
    if ([429, 504].includes(response.status))
      throw new Error(
        "The restaurant service is busy. Please wait a minute before trying again.",
      );
    throw new Error(
      "The location or restaurant service is unavailable. Please try again shortly.",
    );
  }
  return response.json();
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
  const place = json.places?.[0];
  const center = {
    lat: Number(place?.latitude),
    lon: Number(place?.longitude),
    label: `${place?.["place name"]}, ${place?.["state abbreviation"]} ${zip}`,
  };
  if (!Number.isFinite(center.lat) || !Number.isFinite(center.lon))
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
  if (Date.now() - lastRequest < 10000)
    throw new Error(
      "Please wait ten seconds between new area searches. Preference changes use the results already loaded.",
    );
  lastRequest = Date.now();
  const query = `[out:json][timeout:25][maxsize:33554432];(${["restaurant", "fast_food", "food_court"].map((kind) => `nwr["amenity"="${kind}"]["name"](around:${Math.round(radius * 1609.344)},${center.lat},${center.lon});`).join("")});out center tags;`;
  const json = await fetchJson(OVERPASS, signal, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ data: query }).toString(),
  });
  // Overpass may return HTTP 200 with partial results on timeout. Never present
  // that response as a complete successful search.
  if (json.remark || !Array.isArray(json.elements))
    throw new Error(
      "The restaurant search could not finish. Try a smaller radius, or wait a minute and retry.",
    );
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
