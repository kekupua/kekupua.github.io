import type { DropCategory, DropRarity, Mob, MobDrop } from "./types";

// Editorial frequency bands, not official equipment quality/rarity tiers.
export function dropRarity(oneIn: number | null): DropRarity {
  if (oneIn === null || !Number.isFinite(oneIn) || oneIn < 1) return "Unknown";
  if (oneIn <= 10) return "Common";
  return oneIn <= 100 ? "Uncommon" : "Rare";
}

export function formatDropChance(oneIn: number | null): string {
  if (dropRarity(oneIn) === "Unknown") return "Not reported";
  const percent = 100 / oneIn!;
  return `~${percent.toLocaleString("en-US", { maximumFractionDigits: percent < 1 ? 2 : 1 })}%`;
}

export interface MobFilters {
  query: string;
  levels: "All levels" | "1–10" | "11–25" | "26–55";
  rarity: "All rarities" | DropRarity;
  category: "All items" | DropCategory;
}
export function matchingDrops(mob: Mob, filters: MobFilters): MobDrop[] {
  const term = filters.query.trim().toLocaleLowerCase();
  const mobMatches = `${mob.name} ${mob.locations.join(" ")}`
    .toLocaleLowerCase()
    .includes(term);
  return mob.drops.filter(
    (drop) =>
      (mobMatches || drop.name.toLocaleLowerCase().includes(term)) &&
      (filters.rarity === "All rarities" ||
        dropRarity(drop.oneIn) === filters.rarity) &&
      (filters.category === "All items" || drop.category === filters.category),
  );
}
export function matchingMobs(mobs: Mob[], filters: MobFilters): Mob[] {
  return mobs.filter((mob) => {
    const inBand =
      filters.levels === "All levels" ||
      (filters.levels === "1–10"
        ? mob.level <= 10
        : filters.levels === "11–25"
          ? mob.level >= 11 && mob.level <= 25
          : mob.level >= 26 && mob.level <= 55);
    if (!inBand) return false;
    const term = filters.query.trim().toLocaleLowerCase();
    const allowEmpty =
      mob.drops.length === 0 &&
      filters.rarity === "All rarities" &&
      filters.category === "All items" &&
      `${mob.name} ${mob.locations.join(" ")}`
        .toLocaleLowerCase()
        .includes(term);
    return allowEmpty || matchingDrops(mob, filters).length > 0;
  });
}
