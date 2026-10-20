# Mob and drop reference

Reviewed **October 19, 2026**. Scope: 15 mobs along the Warrior guide’s early/first-job and training routes, from Blue Snail through Wraith. The data module contains **77 mob-item associations**, including mesos; this is not 77 unique items or a complete server drop database.

## Sources and limits

`src/maple/data/mobs.ts` records displayed `~1/N` estimates from individual MapleClassic Wiki monster pages. Each mob links to the `oldid` page revision reviewed. The copied values also live in the data module as the dated snapshot; a page revision link alone should not be treated as an immutable copy of a rendered drop table. Level, HP, and EXP are sourced from the wiki’s Classic World monster roster, not a historical v83 stat table. The source registry includes both the roster and the wiki’s drop-reporting method.

These are **player-observed community estimates**, not official probabilities. The reference tables do not provide sample sizes or confidence intervals. Small samples can change substantially. Do not treat the displayed precision as evidence of statistical confidence. No official Classic World per-mob drop probability table was verified in this review.

- `oneIn: null`: the item is listed, but its rate is not reported. It stays **Unknown**, never zero or guaranteed.
- `drops: []`: the reviewed source has no listed drop data. This does not assert that the monster drops nothing.
- Quest-only entries retain a quest-condition note. Ordinary mushroom caps also link to their uses in Jane/Maya quests.
- Quantities are displayed only when the source provided a stack/pile count or observed range. These are observations, not guaranteed bounds.
- “Nothing” observations are excluded from the item table; the page is an item reference. Item estimates should not be summed into a total loot probability.
- No drop rolls, kill-count calculator, market valuation, or user character state is involved.

## Rarity

Rarity is an **editorial frequency band derived from the source estimate**, not an official equipment-quality tier:

| Band     | Estimated per-kill chance | Source denominator |
| -------- | ------------------------- | ------------------ |
| Common   | At least 10%              | `1 <= N <= 10`     |
| Uncommon | At least 1%, under 10%    | `10 < N <= 100`    |
| Rare     | Under 1%                  | `N > 100`          |
| Unknown  | No reported estimate      | `null`             |

The UI displays the approximate original ratio and a rounded percentage. For example, `~1/620` is displayed as `~0.16%` and **Rare**. Rarity boundaries use the source denominator, not the rounded label. Unknown or invalid values never become a displayed `0%`.

## Attribution and updates

The selected mob/drop dataset is adapted from [MapleClassic Wiki](https://mapleclassic.wiki/wiki/Monsters), which identifies its content as [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The module links individual source revisions; changes include selection, normalized display names, quest-use links, rounded percentages, and editorial rarity bands. Preserve attribution and these data notices when extending the dataset.

New Nexon artwork comes from the official [Classic World promotional site](https://www.nexon.com/mscw/pre-launch-sales). Exact CDN URLs and hashes are in `assets.json`. The promotional gameplay gallery contains historical visuals; it is not used to establish live item drops or map layouts.

To update, review the current monster page, retain its new revision ID and checked date, and copy only published associations and estimates. Do not fill unknowns from old MapleStory/private-server drop tables. Run drop-data, render, browser-filter, and narrow-layout checks after changes. Keep the original checked dates of unrelated guide mechanics.
