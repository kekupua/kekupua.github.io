# Maple Fieldguide

A MapleStory Classic World reference at `/maple/` in the portfolio. Warrior includes a 15-mob field reference with 77 listed drop associations, six first-job skills, fourteen equipment leads, nine quests, training through level 55, and Fighter/Page/Spearman comparisons.

## Reading the guide

- Desktop chapter navigation; mobile quick tabs and a collapsible full menu.
- Direct section URLs such as `/maple/#skills`, including reload and browser history.
- Search by mob, drop, skill, item, NPC, quest, or map. Global item search opens the matching mob; the mob reference has item-name, map, level, category, and rarity filters.
- Static skill effects, prerequisites, SP example, weapon requirements, and observed mob drop tables. No calculators, point allocation, character-level inputs, quest tracking, or storage dependency.
- The Warrior tile opens Skills directly, with a bookmarkable `#skills` URL and browser-history support. Magician, Bowman, and Thief tiles are disabled until guides are published.
- Expand an entry’s **Source** or **Sources differ** disclosure for its references.

The Stats & AP page has been replaced by Mobs & drops; old `#stats` bookmarks open the mob reference. The earlier planner and storage code has been removed. Existing saved browser data is left untouched and is no longer read.

## Content and research

Gameplay snapshot: **October 19, 2026**. This redesign shortens existing content; it does not claim a fresh in-game mechanics review. The original gameplay sources retain their review dates and limitations. New mob/drop sources and the official art gallery are separately registered in `src/maple/data/sources.ts`. See [drop research notes](drops.md) for scope and rarity semantics.

Official posts establish scope. Community client exports and guides provide the numerical references. Client records do not prove live availability; the current game takes priority. The official release-note body could not be independently extracted in the original review.

Preserved discrepancies:

- Slash Blast: newer export says six targets; older wiki says four.
- Studded Polearm: newer export says 42 base ATT; older guide says 39.
- Incomplete passive scaling: only documented maximum values are shown. No invented intermediate values or historical HP-washing formulas.

The printed SP route is an editorial example, not a tested meta build. Shop prices and crafting leads need live checks. Training routes are candidates rather than EXP/hour rankings. Third-job progression is outside this guide. No automatic update process is implemented.

## Structure and extension

```text
src/maple/
  types.ts           shared content and evidence types
  navigation.ts      chapter registry and published/disabled job tiles
  data/warrior.ts    sourced Warrior reference records
  data/mobs.ts       15 mobs, observed drops, and pinned wiki revisions
  drops.ts           deterministic rarity bands and composable filters
  MobsPage.tsx       mobile-friendly mob/item browser
  data/reference.ts editorial reference blocks and artwork credits
  data/sources.ts   dated gameplay source registry
  MapleApp.tsx       responsive reference views
  maple.css          isolated classic-inspired visual system
  main.tsx           React entry
```

To add a job, create a typed `JobGuide` module and register it in `guides`. Add job selection/routing and job-specific copy before enabling its tile in `navigation.ts`; the current guide shell selects Warrior. Give every new record stable IDs and source references. Do not enable an unfinished destination or reuse Warrior’s editorial SP example for another job.

## Artwork

**Entity artwork update (October 20, 2026):** 86 original game images from MapleClassic Wiki are bundled under `public/images/maple/wiki/` (about 225 KiB total). All six first-job skills, 15 mobs, 44 distinct loot names, 12 named equipment pieces, six quest NPCs, the Warrior job illustration, and two representative equipment examples have exact source-page/image URLs, dimensions, and SHA-256 hashes in [`assets.json`](assets.json).

`data/images.ts` is the shared name-to-image registry; `GameImage.tsx` renders local, lazy-loaded images with explicit dimensions. `data/artwork.ts` maps quests, training routes, chapters, and representative gear to those names. Monster portraits and index entries now use each monster’s own sprite; loot icons remain visible at phone widths. Equipment categories explicitly label the pictured Bronze Helmet and Scimitar as illustrations. Branches use representative weapons rather than claiming to depict job portraits. Gameplay records, source review dates, and rarity estimates are unchanged.

The wiki is the image distributor, not the rights holder: the assets are Nexon game artwork. The wiki’s text/data license is not represented as a license to Nexon’s art. Credits appear on the Sources page. No runtime image requests go to the wiki.

Legacy MapleStory backdrop and monster sprites are bundled locally from the public `liwenone/maplestory` repository, whose README credits MapleSimulator. Eight images come directly from Nexon’s CDN: the existing news illustration plus seven official character compositions and promotional gameplay images. Historical screenshots are labeled visual references, not current mechanics evidence. Exact source paths, commit, and file hashes are in [`assets.json`](assets.json). The backdrop and sprites are decorative, not proof of Classic World layouts or spawns. Official character art now appears on the overview, mob, quest, and job-path pages; gallery screenshots add context on overview and training.

The artwork remains © Nexon; no ownership or open-source license for game art is asserted. The original leaf SVG is portfolio artwork. The UI uses CSS and system fonts, with no runtime image or font service dependency. Source links and attribution appear in the guide’s Sources page and footer. This is an independent fan project.

## Verification

From the repository root:

```sh
pnpm --filter portfolio test:maple
pnpm --filter portfolio typecheck
pnpm --filter portfolio build
pnpm --filter portfolio exec playwright install chromium
pnpm --filter portfolio test:maple:browser
```

Node checks cover provenance, drop/rarity boundaries, filtering, unknown versus missing data, quest references, unchanged official asset hashes, reference prerequisites and point totals, training coverage, weapon families, disabled job destinations, and all eight page renders with storage blocked. Browser checks cover desktop and emulated iPhone navigation, search, history/reload, disclosures, item/rarity filters, global search-to-mob selection, old bookmark compatibility, disabled tiles, bundled images, runtime errors, and all sections at 320px and 390px. CI uploads overview, mobs, skills, and quests screenshots in `maple-browser-tests-and-screenshots`. Emulation is not a physical iOS Safari test.
