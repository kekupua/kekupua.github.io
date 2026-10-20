import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Bug,
  ChevronDown,
  ExternalLink,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { mobs } from "./data/mobs";
import { warrior } from "./data/warrior";
import { sourceById } from "./data/sources";
import {
  dropRarity,
  formatDropChance,
  matchingDrops,
  matchingMobs,
} from "./drops";
import type { MobFilters } from "./drops";
import { GameImage } from "./GameImage";

const defaults: MobFilters = {
  query: "",
  levels: "All levels",
  rarity: "All rarities",
  category: "All items",
};

export function MobsPage({
  initialMob = "slime",
  onQuests,
  onTraining,
}: {
  initialMob?: string;
  onQuests: () => void;
  onTraining: () => void;
}) {
  const [filters, setFilters] = useState(defaults);
  const [selected, setSelected] = useState(initialMob);
  const detailRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const visible = matchingMobs(mobs, filters);
  const active = visible.find((mob) => mob.id === selected) || visible[0];
  const drops = active ? matchingDrops(active, filters) : [];
  const indexSignature = visible.map((mob) => mob.id).join("|");
  useEffect(() => {
    const index = indexRef.current;
    const selectedButton = index?.querySelector<HTMLButtonElement>(
      'button[aria-pressed="true"]',
    );
    if (
      !index ||
      !selectedButton ||
      !window.matchMedia("(max-width: 700px)").matches
    )
      return;
    // Move only the index, so initial selection never jumps the whole page.
    index.scrollLeft = Math.max(
      0,
      selectedButton.offsetLeft -
        (index.clientWidth - selectedButton.offsetWidth) / 2,
    );
  }, [active?.id, indexSignature]);

  const filtered =
    filters.query.trim() ||
    filters.levels !== defaults.levels ||
    filters.rarity !== defaults.rarity ||
    filters.category !== defaults.category;

  function choose(id: string) {
    setSelected(id);
    requestAnimationFrame(() => {
      detailRef.current?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 700px)").matches)
        detailRef.current?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
    });
  }

  return (
    <>
      <header className="page-heading illustrated-heading">
        <div>
          <span className="eyebrow">WARRIOR / MONSTER FIELD NOTES</span>
          <h1>Mobs & drops</h1>
          <p>Find a monster. Check its loot. Know what is still unreported.</p>
          <div className="reference-count">
            <strong>{mobs.length}</strong> mobs <span>·</span>{" "}
            <strong>
              {mobs.reduce((count, mob) => count + mob.drops.length, 0)}
            </strong>{" "}
            listed drops <span>·</span> Lv. 2–48
          </div>
        </div>
        <img
          src="/images/maple/official-slime-spore.webp"
          width="176"
          height="189"
          alt="Nexon promotional artwork of a Slime and Spore"
        />
      </header>
      <div className="drop-provenance">
        <BookOpen size={18} aria-hidden="true" />
        <p>
          <strong>Player-observed estimates.</strong> Rates can change; sample
          sizes are not supplied in these tables. Unknown does not mean zero.
        </p>
      </div>
      <div className="mob-controls">
        <div className="mob-search">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            aria-label="Find a mob or drop"
            placeholder="Mob, item, or map…"
            value={filters.query}
            onChange={(event) =>
              setFilters({ ...filters, query: event.target.value })
            }
          />
          {filters.query && (
            <button
              type="button"
              aria-label="Clear mob search"
              onClick={() => setFilters({ ...filters, query: "" })}
            >
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="mob-filter-selects">
          <label>
            Mob level
            <select
              value={filters.levels}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  levels: event.target.value as MobFilters["levels"],
                })
              }
            >
              {["All levels", "1–10", "11–25", "26–55"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Item type
            <select
              value={filters.category}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  category: event.target.value as MobFilters["category"],
                })
              }
            >
              {[
                "All items",
                "Currency",
                "Equipment",
                "Use",
                "Etc.",
                "Quest",
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Drop rarity
            <select
              value={filters.rarity}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  rarity: event.target.value as MobFilters["rarity"],
                })
              }
            >
              {["All rarities", "Common", "Uncommon", "Rare", "Unknown"].map(
                (value) => (
                  <option key={value}>{value}</option>
                ),
              )}
            </select>
          </label>
          {filtered && (
            <button
              className="reset-mobs"
              type="button"
              onClick={() => setFilters(defaults)}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
      <details className="rarity-key">
        <summary>
          How to read rarity <ChevronDown size={13} aria-hidden="true" />
        </summary>
        <div>
          <p>
            These are editorial drop-frequency bands, not official item-quality
            tiers. Percentages are rounded from the source’s approximate ~1/N
            ratios.
          </p>
          <dl>
            <div>
              <dt>Common</dt>
              <dd>10% or more</dd>
            </div>
            <div>
              <dt>Uncommon</dt>
              <dd>1% to under 10%</dd>
            </div>
            <div>
              <dt>Rare</dt>
              <dd>Under 1%</dd>
            </div>
            <div>
              <dt>Unknown</dt>
              <dd>No rate reported</dd>
            </div>
          </dl>
          <p>
            Partial community tables: missing items may still drop. Stack ranges
            are observations, not guaranteed limits. Quest drops may need an
            active quest.
          </p>
          <a
            href={sourceById["drop-method"].url}
            target="_blank"
            rel="noreferrer"
          >
            How the estimates are collected{" "}
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </details>

      {!active ? (
        <div className="mob-empty reference-card" role="status">
          <Bug size={29} aria-hidden="true" />
          <h2>No matching mobs or drops</h2>
          <p>Try another item or clear a filter.</p>
          <button
            type="button"
            className="maple-button secondary"
            onClick={() => setFilters(defaults)}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="bestiary-layout">
          <nav className="mob-index" aria-label="Monster index">
            <div className="mob-index-title">
              FIELD INDEX{" "}
              <span aria-live="polite">
                {visible.length} / {mobs.length}
              </span>
            </div>
            <div className="mob-index-options" ref={indexRef}>
              {visible.map((mob) => (
                <button
                  key={mob.id}
                  type="button"
                  aria-pressed={active.id === mob.id}
                  aria-controls="mob-detail"
                  onClick={() => choose(mob.id)}
                >
                  <span className="index-level">{mob.level}</span>
                  <span>
                    <strong>{mob.name}</strong>
                    <small>
                      {mob.drops.length
                        ? `${mob.drops.length} listed drops`
                        : "Drops not documented"}
                    </small>
                  </span>
                  <GameImage name={mob.name} />
                </button>
              ))}
            </div>
          </nav>
          <section
            id="mob-detail"
            className="mob-detail"
            ref={detailRef}
            tabIndex={-1}
            aria-labelledby="mob-detail-title"
          >
            <div className="mob-detail-heading">
              <div>
                <span className="eyebrow">MONSTER / LEVEL {active.level}</span>
                <h2 id="mob-detail-title">{active.name}</h2>
                <dl className="mob-vitals">
                  <div>
                    <dt>HP</dt>
                    <dd>{active.hp.toLocaleString("en-US")}</dd>
                  </div>
                  <div>
                    <dt>EXP</dt>
                    <dd>{active.exp}</dd>
                  </div>
                </dl>
              </div>
              <div className="mob-portrait">
                <GameImage name={active.name} decorative={false} />
              </div>
            </div>
            <div className="mob-locations">
              <MapPin size={15} aria-hidden="true" />
              <div>
                <small>FIND IT AT</small>
                {active.locations.map((location) => (
                  <span key={location}>{location}</span>
                ))}
              </div>
            </div>
            <div className="drop-table-heading">
              <h3>Loot reference</h3>
              <span>
                {drops.length} {drops.length === 1 ? "entry" : "entries"}
                {filtered ? " matching filters" : " listed"}
              </span>
            </div>
            {drops.length ? (
              <div className="drop-table-wrap">
                <table className="drop-table">
                  <caption className="sr-only">
                    {active.name} items, reported drop chances, and derived
                    rarity
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Reported chance</th>
                      <th scope="col">Rarity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drops.map((drop) => {
                      const rarity = dropRarity(drop.oneIn);
                      return (
                        <tr key={drop.name}>
                          <td>
                            <div className="drop-item">
                              <span className="drop-sprite">
                                <GameImage name={drop.name} />
                              </span>
                              <div>
                                <strong>{drop.name}</strong>
                                <small>
                                  {drop.category}
                                  {drop.quantity && drop.quantity !== "1"
                                    ? ` · observed ×${drop.quantity}`
                                    : ""}
                                </small>
                                {drop.condition && (
                                  <small className="quest-drop-condition">
                                    {drop.condition}
                                  </small>
                                )}
                                {drop.questIds?.length ? (
                                  <button
                                    type="button"
                                    className="quest-material-link"
                                    onClick={onQuests}
                                  >
                                    Quest material{" "}
                                    <ArrowRight size={10} aria-hidden="true" />
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td className="drop-chance">
                            <strong>{formatDropChance(drop.oneIn)}</strong>
                            {rarity !== "Unknown" && (
                              <small>
                                ~1 / {drop.oneIn!.toLocaleString("en-US")}
                              </small>
                            )}
                          </td>
                          <td>
                            <span
                              className={`rarity-badge rarity-${rarity.toLowerCase()}`}
                            >
                              {rarity}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="drop-data-missing">
                <BookOpen size={25} aria-hidden="true" />
                <h3>No drop list in the reviewed source</h3>
                <p>
                  This does not mean the monster drops nothing. Check the source
                  for newer reports.
                </p>
              </div>
            )}
            {active.questIds?.length ? (
              <div className="mob-quest-uses">
                <BookOpen size={15} aria-hidden="true" />
                <div>
                  <small>QUEST CONNECTIONS</small>
                  {active.questIds.map((id) => (
                    <button key={id} type="button" onClick={onQuests}>
                      {warrior.quests.find((quest) => quest.id === id)?.name}
                      <ArrowRight size={11} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mob-source-line">
              <span>0.9.0 community snapshot · reviewed Oct. 19, 2026</span>
              <a
                href={sourceById[`mob-${active.id}`].url}
                target="_blank"
                rel="noreferrer"
              >
                Drop & location source{" "}
                <ExternalLink size={12} aria-hidden="true" />
              </a>
              <a
                href={sourceById["mob-index"].url}
                target="_blank"
                rel="noreferrer"
              >
                Stat source <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      )}
      <div className="mob-next-step">
        <img
          src="/images/maple/official-snail-mush.webp"
          width="208"
          height="108"
          alt="Nexon promotional artwork of a snail and mushroom"
          loading="lazy"
        />
        <div>
          <h2>Found your next target?</h2>
          <p>Use the level-by-level routes to plan the trip.</p>
          <button type="button" className="text-link" onClick={onTraining}>
            Open training routes <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
