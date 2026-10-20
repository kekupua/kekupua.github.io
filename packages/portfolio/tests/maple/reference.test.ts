import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { test } from "node:test";
import { branches, guides, warrior } from "../../src/maple/data/warrior";
import { sources, sourceById } from "../../src/maple/data/sources";
import { skillRoute } from "../../src/maple/data/reference";
import { gameImages } from "../../src/maple/data/images";
import { mobs } from "../../src/maple/data/mobs";
import {
  branchWeapons,
  chapterImages,
  equipmentIllustrations,
  questMaterials,
  questNpcs,
  trainingMonsters,
} from "../../src/maple/data/artwork";
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
  assert.equal(sectionFromHash("#stats"), "mobs");
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

test("Nexon artwork is bundled unchanged with precise CDN provenance", () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../../../../docs/maple/assets.json", import.meta.url),
      "utf8",
    ),
  );
  const official = manifest.assets.filter(
    (entry: { source: string }) =>
      new URL(entry.source).hostname === "g.nexonstatic.com",
  );
  assert.ok(official.length >= 8);
  for (const entry of official) {
    const local = new URL(`../../public${entry.file}`, import.meta.url);
    assert.ok(existsSync(local), entry.file);
    assert.equal(
      createHash("sha256").update(readFileSync(local)).digest("hex"),
      entry.sha256,
    );
  }
});

test("every illustrated reference has a local game image with verified bytes and wiki provenance", () => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../../../../docs/maple/assets.json", import.meta.url),
      "utf8",
    ),
  );
  const wiki = manifest.assets.filter(
    (entry: { source: string }) =>
      new URL(entry.source).hostname === "mapleclassic.wiki",
  );
  const names = [
    "Warrior",
    ...warrior.skills.map((entry) => entry.name),
    ...warrior.equipment.map(
      (entry) => equipmentIllustrations[entry.id] || entry.name,
    ),
    ...mobs.flatMap((mob) => [mob.name, ...mob.drops.map((drop) => drop.name)]),
    ...warrior.quests.map((quest) => questNpcs[quest.id]),
    ...warrior.training.flatMap((spot) => trainingMonsters[spot.id]),
    ...Object.values(questMaterials).flat(),
    ...Object.values(branchWeapons),
    ...Object.values(chapterImages),
  ];
  for (const name of names)
    assert.ok(gameImages[name], `Missing art for ${name}`);
  assert.equal(wiki.length, Object.keys(gameImages).length);
  for (const [name, image] of Object.entries(gameImages)) {
    const entry = wiki.find((entry: { name: string }) => entry.name === name);
    assert.ok(entry, `Missing provenance for ${name}`);
    assert.equal(entry.file, image.src);
    assert.match(entry.sourcePage, /^https:\/\/mapleclassic\.wiki\/wiki\//);
    assert.equal(entry.rightsHolder, "Nexon");
    assert.ok(image.width > 0 && image.height > 0);
    const bytes = readFileSync(
      new URL(`../../public${image.src}`, import.meta.url),
    );
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      entry.sha256,
    );
  }
});
