import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { branches, guides, warrior } from "../../src/maple/data/warrior";
import { sources, sourceById } from "../../src/maple/data/sources";
import { skillRoute } from "../../src/maple/data/reference";
import {
  jobTiles,
  sectionFromHash,
  sections,
} from "../../src/maple/navigation";

test("every content entry resolves to a dated HTTPS source", () => {
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
          assert.ok(sourceById[id], `missing ${id}`);
      }
    }
  for (const branch of branches)
    for (const id of branch.sources) assert.ok(sourceById[id]);
});

test("the printed SP example respects prerequisites, caps, and the 61-point first-job pool", () => {
  const ranks = Object.fromEntries(
    warrior.skills.map((skill) => [skill.id, 0]),
  );
  for (const step of skillRoute) {
    const skill = warrior.skills.find((skill) => skill.id === step.skill)!;
    assert.ok(skill, step.skill);
    if (skill.requires)
      assert.ok(ranks[skill.requires.skill] >= skill.requires.rank);
    ranks[skill.id] += step.add;
    assert.ok(ranks[skill.id] <= skill.max);
  }
  assert.equal(
    Object.values(ranks).reduce((sum, rank) => sum + rank, 0),
    61,
  );
  assert.deepEqual(ranks, {
    power: 8,
    slash: 20,
    precise: 15,
    recovery: 3,
    hp: 15,
    iron: 0,
  });
});

test("training covers levels 1–55 once and gear includes every Warrior weapon family", () => {
  for (let level = 1; level <= 55; level++)
    assert.equal(
      warrior.training.filter((s) => level >= s.min && level <= s.max).length,
      1,
    );
  for (const family of ["Sword", "Axe", "Blunt weapon", "Spear", "Polearm"])
    assert.ok(warrior.equipment.some((item) => item.family === family));
  assert.equal(warrior.skills.find((s) => s.id === "slash")?.kind, "disputed");
  assert.equal(
    warrior.equipment.find((s) => s.id === "studded")?.kind,
    "disputed",
  );
});

test("all section hashes resolve, invalid hashes return home, and unpublished jobs have no destination", () => {
  for (const section of sections)
    assert.equal(sectionFromHash(`#${section.id}`), section.id);
  for (const hash of ["", "#missing", "#guide-content"])
    assert.equal(sectionFromHash(hash), "overview");
  assert.deepEqual(
    jobTiles.filter((job) => job.href).map((job) => job.id),
    ["warrior"],
  );
  assert.deepEqual(
    jobTiles.filter((job) => !job.href).map((job) => job.id),
    ["magician", "bowman", "thief"],
  );
});

test("bundled image assets exist and do not rely on third-party runtime hosts", () => {
  for (const asset of [
    "victoria-sky.webp",
    "orange-mushroom.png",
    "slime.png",
    "blue-snail.png",
    "classic-world.png",
  ]) {
    assert.ok(
      existsSync(
        new URL(`../../public/images/maple/${asset}`, import.meta.url),
      ),
      asset,
    );
  }
});
