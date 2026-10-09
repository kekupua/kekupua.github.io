export const cuisines = [
  ["korean", "Korean", "🍲"],
  ["japanese", "Japanese", "🍣"],
  ["chinese", "Chinese", "🥟"],
  ["american", "American", "🍔"],
  ["italian", "Italian", "🍝"],
  ["mexican", "Mexican", "🌮"],
  ["vietnamese", "Vietnamese", "🍜"],
  ["thai", "Thai", "🥘"],
  ["indian", "Indian", "🍛"],
  ["other", "Other", "🍽️"],
] as const;
export type Cuisine = (typeof cuisines)[number][0];
export type Center = { lat: number; lon: number; label: string };
export type Preferences = {
  zip: string;
  radius: number;
  cuisines: Cuisine[];
  excluded: Cuisine[];
  budget: "any" | "$" | "$$" | "$$$";
  mode: "either" | "dine-in" | "takeout";
  meal: "any" | "quick" | "full";
  openNow: boolean;
  random: boolean;
};
export type Restaurant = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  cuisine: string[];
  address: string;
  website?: string;
  hours?: string;
  price?: Preferences["budget"];
  takeout?: boolean;
  dineIn?: boolean;
  kind: string;
};
export type Match = Restaurant & {
  distance: number;
  status: "open" | "closed" | "unknown";
};
export const defaults: Preferences = {
  zip: "98052",
  radius: 5,
  cuisines: [],
  excluded: [],
  budget: "any",
  mode: "either",
  meal: "any",
  openNow: false,
  random: false,
};
export function readLocal<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeLocal(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Private browsing or full storage: continue in memory. */
  }
}
export function loadPreferences(): Preferences {
  const p = readLocal<Partial<Preferences>>("eat:preferences:v1", {});
  return {
    ...defaults,
    zip:
      typeof p.zip === "string" && /^\d{5}$/.test(p.zip) ? p.zip : defaults.zip,
    radius: [2, 5, 10, 15, 25].includes(p.radius) ? p.radius : 5,
    cuisines: Array.isArray(p.cuisines)
      ? p.cuisines.filter((x) => cuisines.some((c) => c[0] === x))
      : [],
    excluded: Array.isArray(p.excluded)
      ? p.excluded.filter((x) => cuisines.some((c) => c[0] === x))
      : [],
    budget: ["any", "$", "$$", "$$$"].includes(p.budget) ? p.budget : "any",
    mode: ["either", "dine-in", "takeout"].includes(p.mode) ? p.mode : "either",
    meal: ["any", "quick", "full"].includes(p.meal) ? p.meal : "any",
    openNow: p.openNow === true,
    random: p.random === true,
  };
}
export function safeWebsite(value?: string): string | undefined {
  if (!value) return;
  try {
    const u = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return ["http:", "https:"].includes(u.protocol) &&
      !u.username &&
      !u.password
      ? u.href
      : undefined;
  } catch {
    return;
  }
}
