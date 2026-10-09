import {
  cuisines,
  type Center,
  type Cuisine,
  type Match,
  type Preferences,
  type Restaurant,
} from "./model";
import { openingStatus } from "./hours";
const aliases: Record<string, Cuisine> = {
  korean: "korean",
  japanese: "japanese",
  sushi: "japanese",
  ramen: "japanese",
  chinese: "chinese",
  cantonese: "chinese",
  sichuan: "chinese",
  dim_sum: "chinese",
  american: "american",
  burger: "american",
  steak_house: "american",
  barbecue: "american",
  italian: "italian",
  pizza: "italian",
  pasta: "italian",
  mexican: "mexican",
  tex_mex: "mexican",
  vietnamese: "vietnamese",
  thai: "thai",
  indian: "indian",
};
export function categories(r: Restaurant): Cuisine[] {
  // Missing cuisine is unknown, never automatically treated as Other.
  return [...new Set(r.cuisine.map((x) => aliases[x] || "other"))];
}
export function cuisineLabel(r: Restaurant): string {
  return r.cuisine.length
    ? r.cuisine.map((c) => c.replaceAll("_", " ")).join(" · ")
    : "Cuisine not listed";
}
export function distanceMiles(
  a: Pick<Center, "lat" | "lon">,
  b: Pick<Center, "lat" | "lon">,
): number {
  const rad = (x: number) => (x * Math.PI) / 180;
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) *
      Math.cos(rad(b.lat)) *
      Math.sin(rad(b.lon - a.lon) / 2) ** 2;
  return (
    3958.7613 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)))
  );
}
export function filterRestaurants(
  data: Restaurant[],
  center: Center,
  p: Preferences,
  eliminated: string[] = [],
  now = new Date(),
): Match[] {
  return data
    .map((r) => ({
      ...r,
      distance: distanceMiles(center, r),
      status: openingStatus(r.hours, r.lat, r.lon, now),
    }))
    .filter((r) => {
      const cs = categories(r);
      return (
        r.distance <= p.radius &&
        !eliminated.includes(r.id) &&
        (!p.cuisines.length || p.cuisines.some((c) => cs.includes(c))) &&
        !p.excluded.some((c) => cs.includes(c)) &&
        (p.budget === "any" || r.price === p.budget) &&
        (p.mode === "either" ||
          (p.mode === "takeout" ? r.takeout === true : r.dineIn === true)) &&
        (p.meal === "any" ||
          (p.meal === "quick"
            ? r.kind === "fast_food"
            : r.kind === "restaurant")) &&
        (!p.openNow || r.status === "open")
      );
    });
}
export function chooseRestaurant(
  options: Match[],
  seen: string[],
  random = Math.random,
): Match | undefined {
  const fresh = options.filter((r) => !seen.includes(r.id));
  const pool = fresh.length ? fresh : options;
  return pool.length
    ? pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))]
    : undefined;
}
export function preferenceSummary(p: Preferences) {
  return [
    p.cuisines.length
      ? p.cuisines.map((c) => cuisines.find((x) => x[0] === c)?.[1]).join(", ")
      : "Anything sounds good",
    `${p.radius} miles`,
    p.budget === "any" ? "Any price" : p.budget,
    p.mode === "either"
      ? "Dine-in or takeout"
      : p.mode === "dine-in"
        ? "Dine-in"
        : "Takeout",
  ].join(" · ");
}
