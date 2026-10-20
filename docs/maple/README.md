# Maple Fieldguide

A MapleStory Classic World reference at `/maple/` in the portfolio. Warrior includes stats, six first-job skills, fourteen equipment leads, nine quests, training through level 55, and Fighter/Page/Spearman comparisons.

## Reading the guide

- Desktop chapter navigation; mobile quick tabs and a collapsible full menu.
- Direct section URLs such as `/maple/#skills`, including reload and browser history.
- Search by skill, item, NPC, quest, or map. Equipment and quest lists have simple category filters.
- Static skill effects, prerequisites, SP example, and weapon requirements. No calculators, point allocation, character-level inputs, quest tracking, or storage dependency.
- Magician, Bowman, and Thief tiles are disabled until guides are published.
- Expand an entry’s **Source** or **Sources differ** disclosure for its references.

The earlier planner and storage code has been removed. Existing saved browser data is left untouched and is no longer read.

## Content and research

Gameplay snapshot: **October 19, 2026**. This redesign shortens existing content; it does not claim a fresh in-game mechanics review. All 24 gameplay sources retain their original review dates and limitations in `src/maple/data/sources.ts`.

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
  data/reference.ts editorial reference blocks and artwork credits
  data/sources.ts   dated gameplay source registry
  MapleApp.tsx       responsive reference views
  maple.css          isolated classic-inspired visual system
  main.tsx           React entry
```

To add a job, create a typed `JobGuide` module and register it in `guides`. Add job selection/routing and job-specific copy before enabling its tile in `navigation.ts`; the current guide shell selects Warrior. Give every new record stable IDs and source references. Do not enable an unfinished destination or reuse Warrior’s editorial SP example for another job.

## Artwork

Legacy MapleStory backdrop and monster sprites are bundled locally from the public `liwenone/maplestory` repository, whose README credits MapleSimulator. One official Classic World news illustration comes from Nexon. Exact source paths, commit, and file hashes are in [`assets.json`](assets.json). The backdrop and sprites are decorative, not proof of Classic World layouts or spawns.

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

Node checks cover provenance, reference prerequisites and point totals, training coverage, weapon families, disabled job destinations, local assets, and all eight page renders with storage blocked. Browser checks cover desktop and emulated iPhone navigation, search, history/reload, disclosures, filters, disabled tiles, bundled images, runtime errors, and all sections at 320px and 390px. CI uploads overview, skills, and quests screenshots in `maple-browser-tests-and-screenshots`. Emulation is not a physical iOS Safari test.
