import assert from "node:assert/strict";
import { test } from "node:test";
import { warrior, branches, guides } from "../../src/maple/data/warrior";
import { sourceById, sources } from "../../src/maple/data/sources";
import {
  adjustSkill,
  allocationValid,
  emptyAllocation,
  equipmentGap,
  parseProgress,
  pointBudget,
  recommendedAllocation,
  totalPoints,
} from "../../src/maple/planner";

const skills = warrior.skills;
test("SP starts at advancement, caps at first-job 30, and rejects nonfinite levels", () => {
  for (const [level, expected] of [
    [1, 0],
    [9, 0],
    [10, 1],
    [11, 4],
    [20, 31],
    [30, 61],
    [55, 61],
    [NaN, 0],
    [Infinity, 0],
  ])
    assert.equal(pointBudget(level), expected);
});

test("the editorial example is legal and exactly fills every first-job level budget", () => {
  for (let level = 1; level <= 55; level++) {
    const plan = recommendedAllocation(skills, level);
    assert.equal(totalPoints(plan), pointBudget(level), `budget at ${level}`);
    assert.ok(allocationValid(skills, plan, level), `legal plan at ${level}`);
  }
  assert.deepEqual(recommendedAllocation(skills, 30), {
    power: 8,
    slash: 20,
    precise: 15,
    recovery: 3,
    hp: 15,
    iron: 0,
  });
});

test("locked skills cannot receive points and valid prerequisites unlock them", () => {
  const blank = emptyAllocation(skills);
  for (const id of ["slash", "hp", "iron"])
    assert.strictEqual(adjustSkill(skills, blank, 30, id, 1), blank);
  const power = adjustSkill(skills, blank, 30, "power", 1);
  assert.equal(adjustSkill(skills, power, 30, "slash", 1).slash, 1);
  const recovery = { ...blank, recovery: 3 };
  assert.equal(adjustSkill(skills, recovery, 30, "hp", 1).hp, 1);
  const hp = { ...recovery, hp: 3 };
  assert.equal(adjustSkill(skills, hp, 30, "iron", 1).iron, 1);
});

test("removing a prerequisite cannot orphan an allocated dependent skill", () => {
  const plan = {
    ...emptyAllocation(skills),
    power: 1,
    slash: 1,
    recovery: 3,
    hp: 3,
    iron: 1,
  };
  for (const id of ["power", "recovery", "hp"])
    assert.strictEqual(adjustSkill(skills, plan, 30, id, -1), plan);
  const withoutIron = adjustSkill(skills, plan, 30, "iron", -1);
  assert.equal(adjustSkill(skills, withoutIron, 30, "hp", -1).hp, 2);
});

test("rank caps, nonnegative ranks, budget, unknown skills, and invalid deltas are enforced", () => {
  const blank = emptyAllocation(skills);
  assert.strictEqual(adjustSkill(skills, blank, 30, "power", -1), blank);
  assert.strictEqual(adjustSkill(skills, blank, 30, "unknown", 1), blank);
  assert.strictEqual(adjustSkill(skills, blank, 30, "power", 10), blank);
  const capped = { ...blank, precise: 15 };
  assert.strictEqual(adjustSkill(skills, capped, 30, "precise", 1), capped);
  const full = recommendedAllocation(skills, 10);
  assert.strictEqual(adjustSkill(skills, full, 10, "precise", 1), full);
  assert.ok(!allocationValid(skills, recommendedAllocation(skills, 30), 10));
});

test("a saved plan survives a round trip and retains only known quest IDs once", () => {
  const saved = {
    version: 1,
    level: 30,
    allocation: recommendedAllocation(skills, 30),
    completed: ["advance", "advance", "removed-quest", 45],
  };
  assert.deepEqual(
    parseProgress(
      JSON.stringify(saved),
      skills,
      warrior.quests.map((q) => q.id),
    ),
    { ...saved, completed: ["advance"] },
  );
});

test("malformed, future-version, overspent, and orphaned saved state is rejected", () => {
  const base = {
    version: 1,
    level: 10,
    allocation: emptyAllocation(skills),
    completed: [],
  };
  const invalid = [
    null,
    "",
    "{bad",
    "[]",
    JSON.stringify({ ...base, version: 2 }),
    JSON.stringify({ ...base, level: 100 }),
    JSON.stringify({ ...base, level: 10.2 }),
    JSON.stringify({ ...base, allocation: { ...base.allocation, power: 2 } }),
    JSON.stringify({ ...base, allocation: { ...base.allocation, slash: 1 } }),
    JSON.stringify({
      ...base,
      allocation: { ...base.allocation, precise: 1.5 },
    }),
    JSON.stringify({ ...base, completed: "advance" }),
    JSON.stringify({ ...base, allocation: [] }),
  ];
  for (const raw of invalid) assert.equal(parseProgress(raw, skills, []), null);
});

test("requirements accept whole-number totals and suppress invalid or missing inputs", () => {
  assert.equal(equipmentGap(30, "15"), 15);
  assert.equal(equipmentGap(30, "30"), 0);
  assert.equal(equipmentGap(30, "45"), 0);
  assert.equal(equipmentGap(0, "0"), 0);
  for (const input of [
    "",
    " ",
    "-1",
    "NaN",
    "Infinity",
    "1.5",
    "10000",
    "hello",
  ])
    assert.equal(equipmentGap(30, input), null);
});

test("every sourced guide record resolves to a dated source and HTTPS URL", () => {
  assert.equal(new Set(sources.map((s) => s.id)).size, sources.length);
  for (const source of sources) {
    assert.equal(new URL(source.url).protocol, "https:");
    assert.match(source.checked, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(source.version && source.note);
  }
  for (const guide of guides)
    for (const collection of [
      guide.skills,
      guide.equipment,
      guide.quests,
      guide.training,
    ]) {
      assert.equal(
        new Set(collection.map((item) => item.id)).size,
        collection.length,
      );
      for (const entry of collection) {
        assert.ok(entry.sources.length);
        for (const id of entry.sources)
          assert.ok(sourceById[id], `missing source ${id}`);
      }
    }
  for (const branch of branches)
    for (const id of branch.sources) assert.ok(sourceById[id]);
});

test("training candidates cover the advertised range exactly once", () => {
  for (let level = 1; level <= 55; level++)
    assert.equal(
      warrior.training.filter((spot) => level >= spot.min && level <= spot.max)
        .length,
      1,
      `coverage at ${level}`,
    );
});

test("item comparisons cover every Warrior family and preserve disputed data labels", () => {
  for (const family of ["Sword", "Axe", "Blunt weapon", "Spear", "Polearm"])
    assert.ok(warrior.equipment.some((item) => item.family === family));
  assert.equal(skills.find((s) => s.id === "slash")?.kind, "disputed");
  assert.equal(
    warrior.equipment.find((s) => s.id === "studded")?.kind,
    "disputed",
  );
});
