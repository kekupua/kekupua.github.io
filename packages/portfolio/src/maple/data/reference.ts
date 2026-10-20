// Editorial reference only; this is not an allocation tool or a tested meta build.
export const skillRoute = [
  { skill: "power", add: 1 },
  { skill: "slash", add: 1 },
  { skill: "precise", add: 5 },
  { skill: "slash", add: 19 },
  { skill: "precise", add: 10 },
  { skill: "recovery", add: 3 },
  { skill: "hp", add: 15 },
  { skill: "power", add: 7 },
] as const;

export const gearPriorities = [
  {
    title: "Weapon first",
    text: "Compare attack, speed, and requirements. Keep mesos for potions.",
  },
  {
    title: "Accuracy before luxury",
    text: "Use DEX or accuracy gear when misses slow your training.",
  },
  {
    title: "Pick a family at 30",
    text: "Choose your second job before investing in mastery or crafted weapons.",
  },
] as const;

export const artworkCredits = [
  {
    title: "Skill, monster, item, equipment & NPC images",
    publisher: "Nexon · via MapleClassic Wiki",
    url: "https://mapleclassic.wiki/wiki/Warrior",
    note: "Original game images bundled locally. Exact image URLs, source pages, dimensions, and hashes are recorded in docs/maple/assets.json. Artwork remains © Nexon; the wiki’s CC BY-NC-SA text license does not grant ownership of game art.",
  },
  {
    title: "Classic World character artwork & gameplay gallery",
    publisher: "Nexon · official promotional site",
    url: "https://www.nexon.com/mscw/pre-launch-sales",
    note: "Seven additional images downloaded from Nexon’s CDN: character compositions, Manji, and historical gameplay screenshots. Used for visual context, not to verify current maps or mechanics.",
  },
  {
    title: "Victoria Island backdrop & monster sprites",
    publisher: "Nexon · public MapleSimulator asset mirror",
    url: "https://github.com/liwenone/maplestory/tree/63c163adeae6088d329bb445ebf11bbbe41ec197",
    note: "Decorative legacy artwork; not evidence of Classic World map layouts or spawns.",
  },
  {
    title: "Classic World release artwork",
    publisher: "Nexon",
    url: "https://www.nexon.com/maplestory/news/general/45621/founder-s-access-release-notes",
    note: "Official Founder’s Access news illustration. MapleStory artwork remains with Nexon.",
  },
] as const;
