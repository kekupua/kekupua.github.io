import {
  BookOpen,
  Compass,
  ExternalLink,
  Map,
  Shield,
  Sword,
  Swords,
  Bug,
} from "lucide-react";

export const sections = [
  {
    id: "overview",
    label: "Overview",
    icon: Compass,
    description: "The essentials, at a glance",
  },
  {
    id: "mobs",
    label: "Mobs & drops",
    icon: Bug,
    description: "Monsters, loot & observed rarity",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Swords,
    description: "Effects, caps & prerequisites",
  },
  {
    id: "gear",
    label: "Equipment",
    icon: Shield,
    description: "Weapons & upgrade priorities",
  },
  {
    id: "quests",
    label: "Quests",
    icon: BookOpen,
    description: "Objectives, NPCs & rewards",
  },
  {
    id: "training",
    label: "Training",
    icon: Map,
    description: "Routes from level 1 to 55",
  },
  {
    id: "branches",
    label: "Job paths",
    icon: Sword,
    description: "Fighter, Page & Spearman",
  },
  {
    id: "sources",
    label: "Sources",
    icon: ExternalLink,
    description: "References & artwork credits",
  },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export function sectionFromHash(hash: string): SectionId {
  const id = hash.replace(/^#/, "");
  if (id === "stats") return "mobs"; // Keep old bookmarks useful after removing the AP page.
  return sections.some((section) => section.id === id)
    ? (id as SectionId)
    : "overview";
}

// Only published guides receive an href. Future jobs never lead to an empty page.
export const jobTiles = [
  {
    id: "warrior",
    name: "Warrior",
    detail: "Skills · builds · gear",
    href: "#skills",
  },
  { id: "magician", name: "Magician", detail: "Coming soon", href: null },
  { id: "bowman", name: "Bowman", detail: "Coming soon", href: null },
  { id: "thief", name: "Thief", detail: "Coming soon", href: null },
] as const;
