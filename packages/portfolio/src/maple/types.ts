export type EvidenceKind =
  | "official"
  | "client"
  | "community"
  | "editorial"
  | "disputed";
export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: EvidenceKind;
  version: string;
  checked: string;
  note: string;
}
export interface Evidence {
  kind: EvidenceKind;
  sources: string[];
}
export type DropCategory = "Currency" | "Equipment" | "Use" | "Etc." | "Quest";
export type DropRarity = "Common" | "Uncommon" | "Rare" | "Unknown";
export interface MobDrop {
  name: string;
  category: DropCategory;
  /** Approximate displayed ~1/N player estimate. null is unreported, never zero. */
  oneIn: number | null;
  quantity: string | null;
  condition?: string;
  questIds?: string[];
}
export interface Mob {
  id: string;
  name: string;
  level: number;
  hp: number;
  exp: number;
  locations: string[];
  revision: number;
  questIds?: string[];
  drops: MobDrop[];
}
export interface Skill extends Evidence {
  id: string;
  name: string;
  max: number;
  symbol: string;
  category: string;
  description: string;
  advice: string;
  requires?: { skill: string; rank: number };
}
export interface Equipment extends Evidence {
  id: string;
  name: string;
  level: number;
  family: string;
  attack?: number;
  str: number;
  dex: number;
  price?: number;
  acquisition: string;
  advice: string;
}
export interface Quest extends Evidence {
  id: string;
  name: string;
  level: number;
  npc: string;
  location: string;
  objective: string;
  reward: string;
  prerequisite?: string;
  reason: string;
}
export interface TrainingSpot extends Evidence {
  id: string;
  min: number;
  max: number;
  map: string;
  town: string;
  monsters: string;
  advice: string;
}
export interface JobGuide {
  id: string;
  name: string;
  title: string;
  primaryStat: string;
  skills: Skill[];
  equipment: Equipment[];
  quests: Quest[];
  training: TrainingSpot[];
}
