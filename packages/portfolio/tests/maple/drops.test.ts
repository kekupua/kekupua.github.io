import assert from "node:assert/strict";
import { test } from "node:test";
import { mobs } from "../../src/maple/data/mobs";
import { sourceById } from "../../src/maple/data/sources";
import { warrior } from "../../src/maple/data/warrior";
import {
  dropRarity,
  formatDropChance,
  matchingDrops,
  matchingMobs,
} from "../../src/maple/drops";
import type { MobFilters } from "../../src/maple/drops";

const defaults: MobFilters = {
  query: "",
  levels: "All levels",
  rarity: "All rarities",
  category: "All items",
};
test("drop bands obey boundaries and unknown or invalid input never becomes a zero chance", () => {
  for (const n of [null, 0, -1, NaN, Infinity]) {
    assert.equal(dropRarity(n), "Unknown");
    assert.equal(formatDropChance(n), "Not reported");
  }
  assert.equal(dropRarity(1), "Common");
  assert.equal(dropRarity(10), "Common");
  assert.equal(dropRarity(10.001), "Uncommon");
  assert.equal(dropRarity(100), "Uncommon");
  assert.equal(dropRarity(100.001), "Rare");
  assert.equal(formatDropChance(620), "~0.16%");
  assert.equal(formatDropChance(1.4), "~71.4%");
});

test("every mob has a versioned source and all drop observations are valid and traceable", () => {
  assert.equal(new Set(mobs.map((mob) => mob.id)).size, mobs.length);
  for (const mob of mobs) {
    assert.ok(
      Number.isInteger(mob.level) &&
        mob.level > 0 &&
        mob.hp > 0 &&
        mob.exp >= 0,
    );
    assert.ok(mob.locations.length && mob.revision > 0);
    const source = sourceById[`mob-${mob.id}`];
    assert.ok(source && source.kind === "community");
    assert.ok(source.url.includes(`oldid=${mob.revision}`));
    assert.equal(
      new Set(mob.drops.map((drop) => drop.name)).size,
      mob.drops.length,
    );
    for (const drop of mob.drops) {
      assert.ok(
        drop.oneIn === null || (Number.isFinite(drop.oneIn) && drop.oneIn >= 1),
      );
      for (const id of drop.questIds || [])
        assert.ok(warrior.quests.some((quest) => quest.id === id));
      if (drop.category === "Quest") assert.ok(drop.condition);
    }
  }
  assert.ok(sourceById["drop-method"] && sourceById["mob-index"]);
});

test("item and rarity filters compose without hiding matching rows or inventing empty drop lists", () => {
  const green = mobs.find((mob) => mob.id === "green-mushroom")!;
  const rareGear: MobFilters = {
    ...defaults,
    query: "green mushroom",
    category: "Equipment",
    rarity: "Rare",
  };
  assert.deepEqual(
    matchingMobs(mobs, rareGear).map((mob) => mob.id),
    ["green-mushroom"],
  );
  assert.equal(matchingDrops(green, rareGear).length, 2);
  const fossil: MobFilters = { ...defaults, query: "animal fossil" };
  assert.deepEqual(
    matchingMobs(mobs, fossil).map((mob) => mob.id),
    ["green-mushroom"],
  );
  assert.deepEqual(
    matchingDrops(green, fossil).map((drop) => drop.name),
    ["Animal Fossil"],
  );
  assert.equal(matchingDrops(green, { ...fossil, rarity: "Rare" }).length, 0);
  const curse = mobs.find((mob) => mob.id === "curse-eye")!;
  assert.ok(matchingMobs(mobs, defaults).includes(curse));
  assert.ok(
    !matchingMobs(mobs, { ...defaults, rarity: "Unknown" }).includes(curse),
  );
  assert.equal(matchingDrops(curse, defaults).length, 0);
  assert.ok(
    matchingMobs(mobs, { ...defaults, levels: "1–10" }).every(
      (mob) => mob.level <= 10,
    ),
  );
});
