# Maple Fieldguide

An independent MapleStory Classic World companion at `/maple/`, added to the portfolio as a separate React/Vite entry. The first release covers Warrior stats, six first-job skills, fourteen equipment leads, nine quests, nine training bands through level 55, and the level-30 Fighter/Page/Spearman decision.

## Use the guide

- Move the character-level slider to personalize training suggestions, level gates, and the first-job skill budget.
- Search across skills, equipment, NPCs, quests, training maps, and branches.
- The skill planner enforces caps, prerequisites, dependent ranks, and the first-job SP budget. Lowering the level below the allocated budget clears the plan and explains the change. The example allocation is editorial, not an in-game tested meta build.
- The equipment checker compares entered total STR and DEX with a target weapon and the character's level. Empty or invalid input suppresses the previous result. It does not calculate hit chance or DPS.
- The checklist and skill allocation persist in versioned local storage. Blocked storage falls back to the current session. There is no game login, account connection, or backend.
- Sections have direct hash links, e.g. `/maple/#skills`. The directory is a real build entry so direct links and reloads work on GitHub Pages. The portfolio build's existing learning service worker is unchanged.

## Research boundaries

Reviewed **October 19, 2026**. The guide distinguishes official announcements, community client exports, community documentation, editorial recommendations, and disputed facts. All 24 references live in [`sources.ts`](../../packages/portfolio/src/maple/data/sources.ts), with publisher, URL, evidence type, version, checked date, and limitations.

Nexon's support FAQ establishes the announced access/launch dates. Its release-notes article body requires JavaScript and was not independently extractable during this review; it is included as an official follow-up reference, not a source for unverified numerical claims. The detailed guide uses the separately linked community Public Release exports and 0.9.0 wiki entries.

Known differences stay visible:

- Slash Blast: newer Public Release export lists six targets; older Warrior overview lists four.
- Studded Polearm: newer export lists 42 base attack; older equipment guide lists 39.
- Passive rank scaling is incomplete in the export. Only reported max-rank values appear; no interpolation or historical HP-growth formula is used.
- Third-job records marked CoT2 are not treated as available live progression. Later jobs and full second-job point builds are outside this first release.
- Shop prices are recorded references, not live quotes. Server-side drop tables, drop rates, item availability, and crafting recipes require live confirmation.
- The quest filter's “available” status checks level only. Prerequisites are printed separately. Checking a box is a personal note and does not modify the game.
- Training routes are candidates, not measured EXP/hour rankings. Scope stops at 55.

The guide does **not** claim to have verified the game in person or exhaustively indexed the web. There is no automatic update process. Review the release snapshot again after Grand Launch or a relevant patch.

## Extend the project

```
src/maple/
  types.ts             shared content and evidence types
  data/sources.ts      source registry and provenance
  data/warrior.ts      Warrior records, guide registry, branch summaries
  planner.ts           allocation rules, example, validation, storage parsing
  MapleApp.tsx         section navigation and interactive views
  maple.css            isolated visual system and responsive layouts
  main.tsx             entry point
```

For a new job:

1. Add a typed `JobGuide` module with stable IDs, references, and the actual skill prerequisites. Use new source IDs whenever version or provenance changes.
2. Register the guide. This release selects the first registry entry (Warrior); adding another job also requires a job selector/route and job-specific presentation copy. Avoid exposing empty job pages as completed guides.
3. Supply that job's point-budget rules and editorial allocation separately. `adjustSkill`/`allocationValid` support arbitrary skill arrays, while `pointBudget`, `mobbingOrder`, and the current UI copy intentionally describe Warrior first job. Do not reuse them blindly for another progression system.
4. Introduce a distinct versioned storage key per job, migrate only valid data, and retain stable quest IDs.
5. Run source-integrity, budget, prerequisite, render, and browser checks; inspect narrow layouts. Update the guide's review date only after actually reviewing the sources.

For additional Warrior content, extend the data modules and supply references beside each record. A complete second-job planner should have its own SP pool and prerequisites; it should not extend the first-job budget past 61.

## Development and verification

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter portfolio dev
pnpm --filter portfolio test:maple
pnpm --filter portfolio typecheck
pnpm --filter portfolio build
pnpm --filter portfolio exec playwright install chromium
pnpm --filter portfolio test:maple:browser
```

The 20 local Node checks cover budget boundaries, every example prefix across levels 1–55, prerequisite locking/removal, invalid allocation and saved data, requirements, source integrity, family coverage, complete training bands, all section renders, and blocked-storage initial rendering.

The separate Playwright suite covers desktop and emulated iPhone Chromium: route/reload, search, portfolio discovery, skill interactions, persistence, lower-level reset, equipment invalid states, checklist filters, blocked storage, all sections at 320px, and runtime errors. It captures overview/planner screenshots into the `maple-browser-tests-and-screenshots` Actions artifact. Emulation is not a physical iOS Safari test.

Local checks passed: Node suite, TypeScript, and production build. Local browser preview was unavailable in the managed environment, so the browser suite is configured for CI; this document does not claim a local browser pass. See the PR's current Actions result for the authoritative CI outcome.

## Artwork and attribution

`public/images/maple-perion.svg` and `maple-leaf.svg` are original vector artwork, not extracted game assets. Optional Google Fonts have system fallbacks. Editorial prose is original; linked source tables and walkthroughs remain with their publishers. MapleClassic Wiki identifies its content as CC BY-NC-SA. MapleStory names belong to Nexon; this fan project is not affiliated with or endorsed by Nexon.
