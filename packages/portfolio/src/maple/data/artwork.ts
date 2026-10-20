// Art references do not establish item availability, requirements, or drop rates.
export const equipmentIllustrations: Record<string, string> = {
  armor: "Bronze Helmet",
  craft: "Scimitar",
};

export const questNpcs: Record<string, string> = {
  advance: "Dances with Balrog",
  jane: "Jane",
  kpq: "Lakelis",
  journey: "Dances with Balrog",
  instructor: "Warrior Job Instructor",
  test: "Warrior Job Instructor",
  proof: "Warrior Job Instructor",
  maya: "Maya",
  book: "Mr. Wetbottom",
};

export const questMaterials: Record<string, string[]> = {
  jane: ["Blue Mushroom Cap", "Horny Mushroom Cap"],
  maya: [
    "Orange Mushroom Cap",
    "Green Mushroom Cap",
    "Blue Mushroom Cap",
    "Horny Mushroom Cap",
  ],
};

export const trainingMonsters: Record<string, string[]> = {
  island: ["Blue Snail", "Stump", "Orange Mushroom"],
  forest: ["Slime", "Green Mushroom"],
  subway: ["Bubbling"],
  cave: ["Stirge", "Horny Mushroom", "Zombie Mushroom"],
  ant: ["Horny Mushroom", "Zombie Mushroom"],
  eyes: ["Curse Eye"],
  jr: ["Jr. Wraith"],
  monkey: ["Zombie Lupin", "Curse Eye"],
  wraith: ["Wraith"],
};

// Representative weapons illustrate each path; they are not job portraits.
export const branchWeapons: Record<string, string> = {
  fighter: "Gladius",
  page: "War Hammer",
  spearman: "Forked Spear",
};

export const chapterImages: Record<string, string> = {
  mobs: "Orange Mushroom",
  skills: "Power Strike",
  gear: "Long Sword",
  quests: "Blue Mushroom Cap",
  training: "Slime",
  branches: "Forked Spear",
};
