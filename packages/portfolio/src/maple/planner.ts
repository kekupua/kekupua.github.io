import type { Allocation, Skill } from "./types";

export const STORAGE_KEY = "maple-fieldguide:warrior:v1";
export const emptyAllocation = (skills: Skill[]): Allocation =>
  Object.fromEntries(skills.map((skill) => [skill.id, 0]));
export const totalPoints = (allocation: Allocation) =>
  Object.values(allocation).reduce((sum, rank) => sum + rank, 0);
export const pointBudget = (level: number) =>
  Number.isFinite(level) && level >= 10
    ? 1 + (Math.min(30, Math.floor(level)) - 10) * 3
    : 0;
export const prerequisiteMet = (skill: Skill, allocation: Allocation) =>
  !skill.requires || allocation[skill.requires.skill] >= skill.requires.rank;

export function allocationValid(
  skills: Skill[],
  allocation: Allocation,
  level: number,
): boolean {
  return (
    Object.keys(allocation).length === skills.length &&
    skills.every((skill) => {
      const rank = allocation[skill.id];
      return (
        Number.isInteger(rank) &&
        rank >= 0 &&
        rank <= skill.max &&
        (rank === 0 || prerequisiteMet(skill, allocation))
      );
    }) &&
    totalPoints(allocation) <= pointBudget(level)
  );
}

export function adjustSkill(
  skills: Skill[],
  allocation: Allocation,
  level: number,
  id: string,
  delta: number,
): Allocation {
  if (!skills.some((skill) => skill.id === id) || ![-1, 1].includes(delta))
    return allocation;
  const next = { ...allocation, [id]: allocation[id] + delta };
  return allocationValid(skills, next, level) ? next : allocation;
}

// Editorial example, not a tested meta build. Prefixes respect both dependencies and the SP budget.
export const mobbingOrder: [string, number][] = [
  ["power", 1],
  ["slash", 1],
  ["precise", 5],
  ["slash", 19],
  ["precise", 10],
  ["recovery", 3],
  ["hp", 15],
  ["power", 7],
];
export function recommendedAllocation(
  skills: Skill[],
  level: number,
): Allocation {
  let result = emptyAllocation(skills);
  for (const [id, count] of mobbingOrder) {
    for (let i = 0; i < count; i++)
      result = adjustSkill(skills, result, level, id, 1);
  }
  return result;
}

export interface SavedProgress {
  version: 1;
  level: number;
  allocation: Allocation;
  completed: string[];
}
export function parseProgress(
  raw: string | null,
  skills: Skill[],
  questIds: string[],
): SavedProgress | null {
  try {
    const value = JSON.parse(raw || "null");
    if (
      !value ||
      value.version !== 1 ||
      !Number.isInteger(value.level) ||
      value.level < 1 ||
      value.level > 55 ||
      !value.allocation ||
      typeof value.allocation !== "object" ||
      Array.isArray(value.allocation) ||
      !allocationValid(skills, value.allocation, value.level) ||
      !Array.isArray(value.completed)
    )
      return null;
    return {
      version: 1,
      level: value.level,
      allocation: value.allocation,
      completed: [
        ...new Set<string>(
          value.completed.filter(
            (id: unknown): id is string =>
              typeof id === "string" && questIds.includes(id),
          ),
        ),
      ],
    };
  } catch {
    return null;
  }
}

export function equipmentGap(required: number, current: string): number | null {
  if (current.trim() === "") return null;
  const parsed = Number(current);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= 9999
    ? Math.max(0, required - parsed)
    : null;
}
