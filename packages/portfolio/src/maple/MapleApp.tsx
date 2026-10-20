import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  ExternalLink,
  Heart,
  Leaf,
  Map,
  Minus,
  Plus,
  Search,
  Shield,
  Sparkles,
  Sword,
  Swords,
  Target,
  X,
} from "lucide-react";
import { branches, guides } from "./data/warrior";
import { evidenceLabels, sourceById, sources } from "./data/sources";
import {
  adjustSkill,
  allocationValid,
  emptyAllocation,
  equipmentGap,
  parseProgress,
  pointBudget,
  prerequisiteMet,
  recommendedAllocation,
  STORAGE_KEY,
  totalPoints,
} from "./planner";
import type { Evidence } from "./types";
import type { SavedProgress } from "./planner";

const guide = guides[0];
const sections = [
  { id: "overview", label: "Start here", icon: Compass },
  { id: "stats", label: "Stats & AP", icon: Target },
  { id: "skills", label: "Skills & SP planner", icon: Swords },
  { id: "gear", label: "Equipment", icon: Shield },
  { id: "quests", label: "Quest checklist", icon: BookOpen },
  { id: "training", label: "Where to train", icon: Map },
  { id: "branches", label: "Choose your path", icon: Sword },
  { id: "sources", label: "Sources & updates", icon: ExternalLink },
] as const;
type SectionId = (typeof sections)[number]["id"];
const icons = {
  sword: Sword,
  swords: Swords,
  shield: Shield,
  heart: Heart,
  target: Target,
};

function EvidenceNote({ kind, sources: ids }: Evidence) {
  return (
    <div className="evidence">
      <span className={`evidence-label ${kind}`}>{evidenceLabels[kind]}</span>
      {ids.map((id) => (
        <a
          key={id}
          href={sourceById[id].url}
          target="_blank"
          rel="noreferrer"
          title={`${sourceById[id].title} · ${sourceById[id].version}`}
        >
          {sourceById[id].publisher}
          <ExternalLink size={10} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function readInitial(): SavedProgress {
  try {
    const saved = parseProgress(
      localStorage.getItem(STORAGE_KEY),
      guide.skills,
      guide.quests.map((q) => q.id),
    );
    if (saved) return saved;
  } catch {
    /* Private browsing can block storage. The guide still works. */
  }
  return {
    version: 1,
    level: 10,
    allocation: emptyAllocation(guide.skills),
    completed: [],
  };
}

export function MapleApp() {
  const [progress, setProgress] = useState(readInitial);
  const [section, setSection] = useState<SectionId>(() => {
    const hash = window.location.hash.slice(1);
    return sections.some((item) => item.id === hash)
      ? (hash as SectionId)
      : "overview";
  });
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [storage, setStorage] = useState("Saving on this device");
  const [family, setFamily] = useState("All equipment");
  const [questFilter, setQuestFilter] = useState("All quests");
  const [str, setStr] = useState("40");
  const [dex, setDex] = useState("15");
  const [weaponId, setWeaponId] = useState("machete");
  const { level, allocation, completed } = progress;
  const spent = totalPoints(allocation);
  const budget = level < 10 ? 0 : pointBudget(level);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorage("Saved on this device");
    } catch {
      setStorage("Session only · storage unavailable");
    }
  }, [progress]);
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.slice(1);
      if (sections.some((item) => item.id === hash)) {
        setSection(hash as SectionId);
        setQuery("");
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (id: SectionId) => {
    setSection(id);
    setQuery("");
    setNotice("");
    window.location.hash = id;
    document.getElementById("guide-content")?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const changeLevel = (newLevel: number) => {
    const next = Math.min(55, Math.max(1, newLevel));
    const valid = allocationValid(guide.skills, allocation, next);
    setProgress((p) => ({
      ...p,
      level: next,
      allocation: valid ? p.allocation : emptyAllocation(guide.skills),
    }));
    setNotice(
      valid
        ? ""
        : "Your skill plan was cleared because it exceeded the point budget at this lower level.",
    );
  };
  const toggleQuest = (id: string) =>
    setProgress((p) => ({
      ...p,
      completed: p.completed.includes(id)
        ? p.completed.filter((item) => item !== id)
        : [...p.completed, id],
    }));
  const currentSpot = guide.training.find(
    (spot) => level >= spot.min && level <= spot.max,
  );
  const nextQuest = guide.quests.find(
    (quest) => quest.level <= level && !completed.includes(quest.id),
  );
  const searchEntries = [
    ...guide.skills.map((item) => ({
      title: item.name,
      body: `${item.description} ${item.advice}`,
      section: "skills" as SectionId,
    })),
    ...guide.equipment.map((item) => ({
      title: item.name,
      body: `${item.family} ${item.acquisition} ${item.advice}`,
      section: "gear" as SectionId,
    })),
    ...guide.quests.map((item) => ({
      title: item.name,
      body: `${item.npc} ${item.location} ${item.objective} ${item.prerequisite || ""}`,
      section: "quests" as SectionId,
    })),
    ...guide.training.map((item) => ({
      title: item.map,
      body: `${item.monsters} ${item.town}`,
      section: "training" as SectionId,
    })),
    ...branches.map((item) => ({
      title: item.name,
      body: `${item.weapons} ${item.description}`,
      section: "branches" as SectionId,
    })),
    {
      title: "STR, DEX, accuracy & ability points",
      body: "stats AP weapon requirements",
      section: "stats" as SectionId,
    },
  ];
  const matches = searchEntries.filter((item) =>
    `${item.title} ${item.body}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <div className="maple-app">
      <a className="skip-link" href="#guide-content">
        Skip to guide
      </a>
      <aside className="sidebar">
        <a className="brand" href="/maple/" aria-label="Maple Fieldguide home">
          <span className="brand-mark">
            <Leaf size={25} />
          </span>
          <span>
            maple<span className="brand-sub">FIELDGUIDE</span>
          </span>
        </a>
        <div className="sidebar-label">YOUR ADVENTURE, A LITTLE CLEARER</div>
        <div className="job-card">
          <span className="job-icon">
            <Sword size={24} />
          </span>
          <div>
            <small>JOB GUIDE / 01</small>
            <strong>Warrior</strong>
          </div>
          <span className="job-dot" />
        </div>
        <nav aria-label="Guide sections">
          {sections.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={section === id && !query ? "selected" : ""}
              aria-current={section === id && !query ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigate(id);
              }}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {id === "skills" && <span className="nav-new">TOOL</span>}
            </a>
          ))}
        </nav>
        <div className="sidebar-note">
          <Leaf size={22} />
          <p>
            A new chapter.
            <br />
            <strong>A familiar world.</strong>
          </p>
          <small>
            More jobs will join the guide as their sources are reviewed.
          </small>
        </div>
        <a className="portfolio-link" href="/">
          <ArrowLeft size={15} /> Sean’s portfolio
        </a>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            Classic World <ChevronRight size={13} /> <strong>Warrior</strong>
          </div>
          <label className="search-box">
            <Search size={17} />
            <span className="sr-only">Search the guide</span>
            <input
              placeholder="Find a skill, item, or quest…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={16} />
              </button>
            )}
          </label>
          <span className="edition">
            VOL. 01 <span>•</span> WARRIOR
          </span>
        </header>
        <main id="guide-content" tabIndex={-1}>
          <div className="release-strip">
            <span className="live-dot" />
            <strong>Founder’s Access reference</strong>
            <span className="strip-detail">
              Reviewed Oct 19, 2026 · Grand Launch announced for Oct 21
            </span>
            <button onClick={() => navigate("sources")}>
              Read source notes <ArrowRight size={13} />
            </button>
          </div>
          <div className="content-wrap">
            <div className="level-toolbar">
              <span>
                <Compass size={16} /> Make the guide yours
              </span>
              <label htmlFor="character-level">
                Character level <strong>{level}</strong>
              </label>
              <input
                id="character-level"
                type="range"
                min="1"
                max="55"
                value={level}
                onChange={(event) => changeLevel(Number(event.target.value))}
              />
              <span className="save-status">
                <Check size={13} />
                {storage}
              </span>
            </div>
            {notice && (
              <p role="status" className="notice">
                {notice}
              </p>
            )}
            {query.trim() ? (
              <section className="search-results">
                <div className="eyebrow">FIELDGUIDE INDEX</div>
                <h1>Looking for “{query}”</h1>
                <p>{matches.length} matching entries</p>
                {matches.length ? (
                  matches.map((item, index) => (
                    <button
                      key={`${item.section}-${index}`}
                      onClick={() => navigate(item.section)}
                    >
                      <span>
                        <small>
                          {sections.find((s) => s.id === item.section)?.label}
                        </small>
                        <strong>{item.title}</strong>
                      </span>
                      <ArrowRight size={20} />
                    </button>
                  ))
                ) : (
                  <div className="empty-state">
                    <Search />
                    <h2>No trail found.</h2>
                    <p>Try “accuracy”, “mushroom”, “sword”, or an NPC name.</p>
                  </div>
                )}
              </section>
            ) : (
              <>
                {section === "overview" && (
                  <>
                    <section className="hero">
                      <div className="hero-copy">
                        <div className="eyebrow">
                          <span /> THE WARRIOR’S FIELD NOTES
                        </div>
                        <h1>
                          A little less lost.
                          <br />A lot more <em>Warrior.</em>
                        </h1>
                        <p>
                          Your companion from Maple Island to Perion and beyond.
                          Build with intention, find your next quest, and enjoy
                          the long way there.
                        </p>
                        <div className="hero-actions">
                          <button
                            className="primary"
                            onClick={() => navigate("skills")}
                          >
                            Plan your Warrior <ArrowRight size={17} />
                          </button>
                          <button
                            className="text-button"
                            onClick={() => navigate("quests")}
                          >
                            Find your next quest <ArrowDown size={15} />
                          </button>
                        </div>
                        <div className="hero-meta">
                          <span>
                            <Shield size={14} /> Built for a first character
                          </span>
                          <span>
                            <BookOpen size={14} /> Sources beside the advice
                          </span>
                        </div>
                      </div>
                      <div className="hero-art">
                        <img
                          src="/images/maple-perion.svg"
                          alt="Original illustration of a sword overlooking a sunlit, rocky village"
                        />
                        <span className="art-caption">
                          01 / THE ROAD TO PERION
                        </span>
                      </div>
                    </section>
                    <div className="at-a-glance">
                      <div>
                        <small>PRIMARY STAT</small>
                        <strong>
                          STR <span>with DEX for gear & accuracy</span>
                        </strong>
                      </div>
                      <div>
                        <small>FIRST ADVANCEMENT</small>
                        <strong>
                          Lv. 10 <span>Perion</span>
                        </strong>
                      </div>
                      <div>
                        <small>SECOND ADVANCEMENT</small>
                        <strong>
                          Lv. 30 <span>Three paths forward</span>
                        </strong>
                      </div>
                      <div>
                        <small>GUIDE COVERAGE</small>
                        <strong>
                          Lv. 1–55 <span>First-job planner: 10–30</span>
                        </strong>
                      </div>
                    </div>
                    <section className="next-section">
                      <div className="section-heading">
                        <div>
                          <div className="eyebrow">ONE GOOD STEP AT A TIME</div>
                          <h2>Your next chapter</h2>
                        </div>
                        <span className="level-pill">LEVEL {level}</span>
                      </div>
                      <div className="next-grid">
                        <button
                          className="next-card"
                          onClick={() => navigate("training")}
                        >
                          <span className="card-icon">
                            <Map size={23} />
                          </span>
                          <small>A PLACE TO PRACTICE</small>
                          <h3>{currentSpot?.map}</h3>
                          <p>{currentSpot?.monsters}</p>
                          <span className="card-link">
                            Explore training routes <ArrowRight size={16} />
                          </span>
                        </button>
                        <button
                          className="next-card"
                          onClick={() => navigate("quests")}
                        >
                          <span className="card-icon amber">
                            <BookOpen size={23} />
                          </span>
                          <small>SOMETHING TO WORK TOWARD</small>
                          <h3>
                            {nextQuest?.name ||
                              "You’ve checked every available quest"}
                          </h3>
                          <p>
                            {nextQuest
                              ? `${nextQuest.npc} · ${nextQuest.location}`
                              : "Raise your level to reveal more milestones."}
                          </p>
                          <span className="card-link">
                            Open your checklist <ArrowRight size={16} />
                          </span>
                        </button>
                        <button
                          className="next-card dark-card"
                          onClick={() => navigate("stats")}
                        >
                          <Sparkles size={22} />
                          <small>A TIP FOR THE ROAD</small>
                          <h3>
                            Missing more?
                            <br />
                            Check accuracy first.
                          </h3>
                          <p>
                            Meet your next weapon’s requirements, then decide
                            where the rest of your AP helps most.
                          </p>
                          <span className="card-link">
                            Understand your stats <ArrowRight size={16} />
                          </span>
                        </button>
                      </div>
                    </section>
                    <section className="field-note">
                      <div className="note-number">i</div>
                      <div>
                        <h3>Classic World has its own rules.</h3>
                        <p>
                          These notes use the current public references. Older
                          builds, private-server advice, and beta-only jobs can
                          describe a different game. Recommendations are
                          labeled; disputed details stay visible.
                        </p>
                      </div>
                      <button
                        className="text-button"
                        onClick={() => navigate("sources")}
                      >
                        Our approach <ArrowRight size={16} />
                      </button>
                    </section>
                  </>
                )}

                {section === "stats" && (
                  <section>
                    <PageHeading
                      kicker="01 / THE FOUNDATIONS"
                      title="Strong starts here."
                      description="Spend ability points with your next weapon in mind. There is no universal DEX target for every character."
                    />
                    <div className="stat-grid">
                      <article className="paper-card">
                        <span className="big-stat">STR</span>
                        <h2>Your main damage stat</h2>
                        <p>
                          STR drives Warrior weapon damage. Our recommendation:
                          prioritize it after meeting the actual requirements of
                          the equipment you intend to use.
                        </p>
                        <EvidenceNote kind="client" sources={["warrior"]} />
                      </article>
                      <article className="paper-card">
                        <span className="big-stat olive">DEX</span>
                        <h2>Access and accuracy</h2>
                        <p>
                          DEX contributes to accuracy and is required by many
                          weapons. A fixed “DEXless” rule can leave you unable
                          to equip an upgrade. Frequent misses also call for
                          checking Precise Strikes and your target’s level.
                        </p>
                        <EvidenceNote
                          kind="client"
                          sources={["warrior", "precise"]}
                        />
                      </article>
                    </div>
                    <div className="paper-card requirement-tool">
                      <div className="eyebrow">EQUIPMENT REQUIREMENT CHECK</div>
                      <h2>Can you equip your next weapon?</h2>
                      <p>
                        Enter your total stats, including equipment bonuses.
                        This compares requirements only; it does not predict hit
                        chance or damage.
                      </p>
                      <div className="form-grid">
                        <label>
                          Target weapon
                          <select
                            value={weaponId}
                            onChange={(e) => setWeaponId(e.target.value)}
                          >
                            {guide.equipment
                              .filter((item) => item.attack)
                              .map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name} · Lv. {item.level}
                                </option>
                              ))}
                          </select>
                        </label>
                        <label>
                          Total STR
                          <input
                            type="number"
                            min="0"
                            max="9999"
                            step="1"
                            value={str}
                            onChange={(e) => setStr(e.target.value)}
                          />
                        </label>
                        <label>
                          Total DEX
                          <input
                            type="number"
                            min="0"
                            max="9999"
                            step="1"
                            value={dex}
                            onChange={(e) => setDex(e.target.value)}
                          />
                        </label>
                      </div>
                      {(() => {
                        const weapon = guide.equipment.find(
                          (item) => item.id === weaponId,
                        )!;
                        const strGap = equipmentGap(weapon.str, str);
                        const dexGap = equipmentGap(weapon.dex, dex);
                        return (
                          <div
                            className="requirement-result"
                            aria-live="polite"
                          >
                            {strGap === null || dexGap === null ? (
                              <p>
                                Enter whole-number stats from 0 to 9,999 to
                                check requirements.
                              </p>
                            ) : (
                              <>
                                <strong>
                                  {level < weapon.level
                                    ? `Reach level ${weapon.level} first.`
                                    : strGap || dexGap
                                      ? "A little more preparation."
                                      : "You meet the listed level and stat requirements."}
                                </strong>
                                <span>
                                  Needs Lv. {weapon.level} · {weapon.str} STR ·{" "}
                                  {weapon.dex} DEX
                                </span>
                                <p>
                                  {strGap
                                    ? `${strGap} more STR needed. `
                                    : "STR requirement met. "}
                                  {dexGap
                                    ? `${dexGap} more DEX needed.`
                                    : "DEX requirement met."}
                                </p>
                                <EvidenceNote
                                  kind={weapon.kind}
                                  sources={weapon.sources}
                                />
                              </>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                    <div className="field-note">
                      <Target size={26} />
                      <div>
                        <h3>Our AP rule of thumb</h3>
                        <p>
                          Plan one upgrade ahead. Add only the DEX you need for
                          that plan, revisit your accuracy, and put remaining
                          damage-focused AP toward STR. Avoid allocating to HP,
                          MP, INT, or LUK without a verified reason for your
                          build. We do not recommend historical HP washing.
                        </p>
                        <span className="evidence-label editorial">
                          Our recommendation · not a tested optimal build
                        </span>
                      </div>
                    </div>
                  </section>
                )}

                {section === "skills" && (
                  <section>
                    <PageHeading
                      kicker="02 / BUILD WITH INTENTION"
                      title="Every point has a purpose."
                      description="Try a first-job allocation before you spend in game. Caps, prerequisites, and the point budget are enforced here."
                    />
                    <div className="planner-bar">
                      <div>
                        <small>FIRST-JOB SKILL POINTS</small>
                        <strong>
                          {spent}
                          <span> / {budget} used</span>
                        </strong>
                        <p>
                          {budget - spent} available · planning at level{" "}
                          {Math.min(30, level)}
                          {level > 30 && " (first-job pool capped)"}
                        </p>
                      </div>
                      <div className="planner-actions">
                        <button
                          className="primary"
                          disabled={level < 10}
                          onClick={() => {
                            setProgress((p) => ({
                              ...p,
                              allocation: recommendedAllocation(
                                guide.skills,
                                level,
                              ),
                            }));
                            setNotice(
                              "Loaded our mobbing & accuracy example for this level. This is an editorial plan, not a live-tested meta build.",
                            );
                          }}
                        >
                          Load example <Sparkles size={16} />
                        </button>
                        <button
                          className="secondary"
                          onClick={() => {
                            setProgress((p) => ({
                              ...p,
                              allocation: emptyAllocation(guide.skills),
                            }));
                            setNotice(
                              "Skill plan cleared. Your quest checklist is unchanged.",
                            );
                          }}
                        >
                          Clear plan
                        </button>
                      </div>
                    </div>
                    <p className="helper">
                      {level < 10
                        ? "Reach level 10 to plan Warrior skills."
                        : "The reference convention is 1 SP at advancement and 3 per level through 30: 61 total."}{" "}
                      Your plan is saved locally. Exported passive values are
                      shown only at max; intermediate effects are not estimated.
                    </p>
                    <EvidenceNote kind="client" sources={["warrior"]} />
                    <div className="skill-grid">
                      {guide.skills.map((skill) => {
                        const Icon = icons[skill.symbol];
                        const canAdd =
                          level >= 10 &&
                          adjustSkill(
                            guide.skills,
                            allocation,
                            level,
                            skill.id,
                            1,
                          ) !== allocation;
                        const canRemove =
                          adjustSkill(
                            guide.skills,
                            allocation,
                            level,
                            skill.id,
                            -1,
                          ) !== allocation;
                        return (
                          <article
                            key={skill.id}
                            className="paper-card skill-card"
                          >
                            <div className="skill-top">
                              <span className="skill-symbol">
                                <Icon size={25} />
                              </span>
                              <div>
                                <small>{skill.category}</small>
                                <h2>{skill.name}</h2>
                              </div>
                            </div>
                            <p>{skill.description}</p>
                            {skill.requires && (
                              <div
                                className={`prerequisite ${prerequisiteMet(skill, allocation) ? "met" : ""}`}
                              >
                                {prerequisiteMet(skill, allocation) ? (
                                  <Check size={13} />
                                ) : (
                                  <ChevronRight size={13} />
                                )}
                                Requires{" "}
                                {
                                  guide.skills.find(
                                    (s) => s.id === skill.requires.skill,
                                  )?.name
                                }{" "}
                                {skill.requires.rank}
                              </div>
                            )}
                            <div className="skill-advice">
                              <small>FIELD NOTE · OUR RECOMMENDATION</small>
                              <p>{skill.advice}</p>
                            </div>
                            <EvidenceNote
                              kind={skill.kind}
                              sources={skill.sources}
                            />
                            <div className="skill-counter">
                              <span>
                                Planned rank{" "}
                                <strong>
                                  {allocation[skill.id]}{" "}
                                  <span>/ {skill.max}</span>
                                </strong>
                              </span>
                              <div>
                                <button
                                  disabled={!canRemove}
                                  aria-label={`Remove point from ${skill.name}`}
                                  onClick={() =>
                                    setProgress((p) => ({
                                      ...p,
                                      allocation: adjustSkill(
                                        guide.skills,
                                        p.allocation,
                                        level,
                                        skill.id,
                                        -1,
                                      ),
                                    }))
                                  }
                                >
                                  <Minus size={16} />
                                </button>
                                <button
                                  disabled={!canAdd}
                                  aria-label={`Add point to ${skill.name}`}
                                  onClick={() =>
                                    setProgress((p) => ({
                                      ...p,
                                      allocation: adjustSkill(
                                        guide.skills,
                                        p.allocation,
                                        level,
                                        skill.id,
                                        1,
                                      ),
                                    }))
                                  }
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                    <div className="paper-card">
                      <h2>How our example spends points</h2>
                      <p>
                        Power Strike 1 → Slash Blast 1 → Precise Strikes 5 →
                        Slash Blast 20 → Precise Strikes 15 → Recovery 3 → Max
                        HP Increase 15 → remaining points in Power Strike (8 at
                        level 30).
                      </p>
                      <p>
                        This is a legal mobbing and accuracy example, not a
                        claim of optimal damage. If your live passive tooltip
                        differs, revise the allocation before spending. Iron
                        Body remains optional.
                      </p>
                      <span className="evidence-label editorial">
                        Our recommendation
                      </span>
                    </div>
                  </section>
                )}

                {section === "gear" && (
                  <section>
                    <PageHeading
                      kicker="03 / PACK FOR THE JOURNEY"
                      title="Useful gear. Sensible upgrades."
                      description="A starter shopping list, not a best-in-slot ranking. Test your current weapon before spending the next stack of mesos."
                    />
                    <div className="filter-bar">
                      <label>
                        Equipment family
                        <select
                          value={family}
                          onChange={(e) => setFamily(e.target.value)}
                        >
                          {[
                            "All equipment",
                            ...new Set(
                              guide.equipment.map((item) => item.family),
                            ),
                          ].map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                      <span>
                        Shop prices are recorded references, not live quotes.
                      </span>
                    </div>
                    <div className="equipment-list">
                      {guide.equipment
                        .filter(
                          (item) =>
                            family === "All equipment" ||
                            item.family === family,
                        )
                        .map((item) => (
                          <article className="equipment-row" key={item.id}>
                            <span className="equipment-icon">
                              {item.attack ? <Sword /> : <Shield />}
                            </span>
                            <div className="equipment-main">
                              <div className="item-heading">
                                <h2>{item.name}</h2>
                                <span
                                  className={`level-tag ${level < item.level ? "locked" : ""}`}
                                >
                                  Lv. {item.level}
                                  {level < item.level && " · upcoming"}
                                </span>
                              </div>
                              <small>
                                {item.family}{" "}
                                {item.attack && `· Base W.ATK ${item.attack}`}{" "}
                                {item.attack &&
                                  `· ${item.str} STR / ${item.dex} DEX`}
                              </small>
                              <p>{item.advice}</p>
                              <EvidenceNote
                                kind={item.kind}
                                sources={item.sources}
                              />
                            </div>
                            <div className="equipment-price">
                              <strong>
                                {item.price
                                  ? `${item.price.toLocaleString("en-US")} mesos`
                                  : "Compare in game"}
                              </strong>
                              <small>{item.acquisition}</small>
                            </div>
                          </article>
                        ))}
                    </div>
                    <div className="field-note">
                      <Shield size={28} />
                      <div>
                        <h3>Buy the upgrade you can actually use.</h3>
                        <p>
                          Check level, STR, DEX, weapon family, and attack
                          speed. One-handed weapons allow a shield; two-handed
                          weapons occupy both hands. After second job, mastery
                          and booster investment makes your family choice
                          matter. Keep a potion reserve, and compare scroll cost
                          with replacing an early weapon.
                        </p>
                        <span className="evidence-label editorial">
                          Our recommendation
                        </span>
                      </div>
                    </div>
                    <div className="paper-card">
                      <h2>A starting list, with room to grow.</h2>
                      <p>
                        Use the family filter for sword, axe, blunt weapon,
                        spear, or polearm examples. After level 30, compare the
                        full reference with the in-game recipe list. A source
                        listing an item is not confirmation of a live
                        acquisition method. Drops, rates, crafting materials,
                        and player-market prices need live verification.
                      </p>
                      <EvidenceNote kind="community" sources={["gear"]} />
                    </div>
                  </section>
                )}

                {section === "quests" && (
                  <section>
                    <PageHeading
                      kicker="04 / SOMETHING WORTH DOING"
                      title="Leave a few boxes checked."
                      description="Advancements first, then quests that fit your route. Progress stays on this device and does not connect to your game account."
                    />
                    <div className="quest-progress">
                      <CheckCircle2 size={25} />
                      <div>
                        <strong>
                          {completed.length} of {guide.quests.length} completed
                        </strong>
                        <span>Prerequisites still apply in game.</span>
                      </div>
                      <progress
                        max={guide.quests.length}
                        value={completed.length}
                        aria-label="Quest checklist progress"
                      />
                    </div>
                    <div className="filter-bar">
                      <label>
                        Show quests
                        <select
                          value={questFilter}
                          onChange={(e) => setQuestFilter(e.target.value)}
                        >
                          {[
                            "All quests",
                            "Available by level",
                            "Upcoming",
                            "Completed",
                          ].map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </label>
                      <span>
                        “Available” checks level only. Read each prerequisite.
                      </span>
                    </div>
                    <div className="quest-list">
                      {(() => {
                        const list = guide.quests.filter(
                          (quest) =>
                            questFilter === "All quests" ||
                            (questFilter === "Available by level" &&
                              quest.level <= level &&
                              !completed.includes(quest.id)) ||
                            (questFilter === "Upcoming" &&
                              quest.level > level) ||
                            (questFilter === "Completed" &&
                              completed.includes(quest.id)),
                        );
                        return list.length ? (
                          list.map((quest) => (
                            <article
                              key={quest.id}
                              className={`quest-card ${completed.includes(quest.id) ? "done" : ""}`}
                            >
                              <label className="quest-check">
                                <input
                                  type="checkbox"
                                  checked={completed.includes(quest.id)}
                                  onChange={() => toggleQuest(quest.id)}
                                />
                                <span className="sr-only">
                                  Mark {quest.name} complete
                                </span>
                              </label>
                              <div>
                                <div className="item-heading">
                                  <h2>{quest.name}</h2>
                                  <span
                                    className={`level-tag ${level < quest.level ? "locked" : ""}`}
                                  >
                                    Lv. {quest.level}+
                                  </span>
                                </div>
                                <small>
                                  {quest.npc} <span>•</span> {quest.location}
                                </small>
                                {quest.prerequisite && (
                                  <p className="quest-prerequisite">
                                    First: {quest.prerequisite}
                                  </p>
                                )}
                                <p>{quest.objective}</p>
                                <div className="quest-reward">
                                  <Sparkles size={14} />
                                  {quest.reward}
                                </div>
                                <p className="quest-reason">
                                  Our note: {quest.reason}
                                </p>
                                <EvidenceNote
                                  kind={quest.kind}
                                  sources={quest.sources}
                                />
                              </div>
                            </article>
                          ))
                        ) : (
                          <div className="empty-state">
                            <BookOpen />
                            <h2>No quests in this view.</h2>
                            <p>
                              Change the filter or your level to explore the
                              rest of the checklist.
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  </section>
                )}

                {section === "training" && (
                  <section>
                    <PageHeading
                      kicker="05 / A PLACE TO PRACTICE"
                      title="Find your favorite loop."
                      description="Reference map candidates from 1 to 55. Your kill speed, accuracy, crowding, and potion costs decide which one feels best."
                    />
                    <div className="current-route">
                      <Map size={26} />
                      <div>
                        <small>AT YOUR LEVEL · {level}</small>
                        <h2>{currentSpot?.map}</h2>
                        <p>
                          {currentSpot?.town} · {currentSpot?.monsters}
                        </p>
                      </div>
                    </div>
                    <EvidenceNote kind="community" sources={["training"]} />
                    <div className="training-timeline">
                      {guide.training.map((spot) => (
                        <article
                          key={spot.id}
                          className={
                            spot.id === currentSpot?.id ? "current" : ""
                          }
                        >
                          <div className="training-level">
                            <small>LEVEL</small>
                            <strong>
                              {spot.min}–{spot.max}
                            </strong>
                          </div>
                          <div>
                            <div className="item-heading">
                              <h2>{spot.map}</h2>
                              {spot.id === currentSpot?.id && (
                                <span className="level-tag">YOU ARE HERE</span>
                              )}
                            </div>
                            <small>
                              {spot.town} · {spot.monsters}
                            </small>
                            <p>{spot.advice}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="field-note">
                      <Compass size={26} />
                      <div>
                        <h3>Five minutes tells you more than a tier list.</h3>
                        <p>
                          Compare two maps for the same amount of time. Note EXP
                          gained, potion spending, misses, travel, and how
                          crowded the route is. Choose the loop you can sustain.
                          These are suggestions, not measured EXP/hour claims.
                        </p>
                        <span className="evidence-label editorial">
                          Our recommendation
                        </span>
                      </div>
                    </div>
                  </section>
                )}

                {section === "branches" && (
                  <section>
                    <PageHeading
                      kicker="06 / THREE ROADS FROM PERION"
                      title="Choose how you like to fight."
                      description="At level 30, complete your advancement and pick a specialization. Compare the current second-job kit before committing."
                    />
                    <div className="branch-grid">
                      {branches.map((branch, index) => (
                        <article
                          key={branch.id}
                          className="paper-card branch-card"
                        >
                          <span className="branch-number">0{index + 1}</span>
                          <Sword size={34} />
                          <h2>{branch.name}</h2>
                          <small>{branch.weapons}</small>
                          <h3>{branch.style}</h3>
                          <p>{branch.description}</p>
                          <div className="skill-advice">
                            <small>OUR RECOMMENDATION</small>
                            <p>{branch.advice}</p>
                          </div>
                          <EvidenceNote
                            kind="client"
                            sources={branch.sources}
                          />
                        </article>
                      ))}
                    </div>
                    <div className="paper-card">
                      <h2>A practical start after advancement</h2>
                      <p>
                        Our recommendation: choose a weapon family, inspect its
                        mastery and booster prerequisites, then compare the
                        branch utility skill with your training needs. Match
                        every point to the live tooltip. A complete second-job
                        SP build will follow after a dedicated review.
                      </p>
                      <p>
                        The Public Release references cover second job.
                        Third-job data in those databases is labeled Closed
                        Online Test 2, so it is not treated as available
                        progression here.
                      </p>
                      <EvidenceNote kind="client" sources={["world"]} />
                    </div>
                    <button
                      className="primary"
                      onClick={() => navigate("quests")}
                    >
                      See the advancement checklist <ArrowRight size={16} />
                    </button>
                  </section>
                )}

                {section === "sources" && (
                  <section>
                    <PageHeading
                      kicker="07 / FOLLOW THE SOURCE"
                      title="A guide you can question."
                      description="A manually reviewed research snapshot, not a live game database. Last reviewed October 19, 2026."
                    />
                    <div className="source-principles">
                      <article>
                        <CheckCircle2 />
                        <h2>Label the evidence.</h2>
                        <p>
                          Official announcements establish dates. Client
                          references are community exports. Community guides can
                          be stale. Our advice is editorial and has not been
                          tested in game.
                        </p>
                      </article>
                      <article>
                        <BookOpen />
                        <h2>Keep the differences.</h2>
                        <p>
                          Slash Blast: the newer export says six targets; the
                          older overview says four. HP and accuracy passive rank
                          scaling is incomplete. Check the live skill window
                          before spending.
                        </p>
                      </article>
                      <article>
                        <Leaf />
                        <h2>Grow carefully.</h2>
                        <p>
                          Warrior first job and routes to 55 are the first
                          chapter. Other jobs, second-job point builds, and
                          later content can be added after source review. No
                          automated update is running.
                        </p>
                      </article>
                    </div>
                    <p className="helper">
                      Snapshot: Founder’s Access / community Public Release
                      exports and 0.9.0 references. Grand Launch content may
                      change after Oct 21. No private-server formulas,
                      HP-washing prescriptions, fourth-job builds, or guaranteed
                      drops are used.
                    </p>
                    <div className="source-list">
                      {sources.map((source, index) => (
                        <article key={source.id}>
                          <span className="source-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <h2>{source.title}</h2>
                              <ExternalLink size={15} />
                            </a>
                            <small>
                              {source.publisher} · {source.version} · Checked{" "}
                              {source.checked}
                            </small>
                            <p>{source.note}</p>
                          </div>
                          <span className={`evidence-label ${source.kind}`}>
                            {evidenceLabels[source.kind]}
                          </span>
                        </article>
                      ))}
                    </div>
                    <div className="field-note">
                      <BookOpen size={26} />
                      <div>
                        <h3>Research and attribution</h3>
                        <p>
                          Original guide prose and artwork; brief factual
                          references linked to their publishers. MapleClassic
                          Wiki publishes under CC BY-NC-SA; follow its links for
                          the original tables and walkthroughs. MapleStory and
                          related names belong to Nexon. This is an independent
                          fan project, not affiliated with or endorsed by Nexon.
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
            <footer className="guide-footer">
              <a href="/" aria-label="Back to portfolio">
                Portfolio
              </a>
              <span>
                <Leaf size={15} /> maple fieldguide
              </span>
              <p>Take your time. There’s a whole world out there.</p>
              <button onClick={() => navigate("sources")}>
                Sources & version notes <ArrowRight size={13} />
              </button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function PageHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div className="eyebrow">{kicker}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
