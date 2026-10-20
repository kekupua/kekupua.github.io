import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BowArrow,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Heart,
  Leaf,
  LockKeyhole,
  Menu,
  Search,
  Shield,
  Sparkles,
  Sword,
  Swords,
  Target,
  VenetianMask,
  WandSparkles,
  X,
} from "lucide-react";
import { branches, guides } from "./data/warrior";
import { evidenceLabels, sourceById, sources } from "./data/sources";
import {
  artworkCredits,
  gearPriorities,
  skillRoute,
  statPriorities,
} from "./data/reference";
import { jobTiles, sectionFromHash, sections } from "./navigation";
import type { SectionId } from "./navigation";
import type { Evidence } from "./types";

const guide = guides[0];
const skillIcons = {
  sword: Sword,
  swords: Swords,
  shield: Shield,
  heart: Heart,
  target: Target,
};
const jobIcons = {
  warrior: Sword,
  magician: WandSparkles,
  bowman: BowArrow,
  thief: VenetianMask,
};
const asset = (name: string) => `/images/maple/${name}`;

function EvidenceNote({ kind, sources: ids }: Evidence) {
  return (
    <details className="evidence">
      <summary className={kind === "disputed" ? "disputed" : undefined}>
        {kind === "disputed" ? "Sources differ" : "Source"}
        <ChevronDown size={12} aria-hidden="true" />
      </summary>
      <div className="evidence-links">
        <small>{evidenceLabels[kind]}</small>
        {ids.map((id) => (
          <a
            key={id}
            href={sourceById[id].url}
            target="_blank"
            rel="noreferrer"
          >
            {sourceById[id].title}
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        ))}
      </div>
    </details>
  );
}

function PageHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}

export function MapleApp() {
  const [section, setSection] = useState<SectionId>(() =>
    sectionFromHash(window.location.hash),
  );
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [family, setFamily] = useState("All equipment");
  const [questFilter, setQuestFilter] = useState("All levels");
  const mainRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onHash = () => {
      setSection(sectionFromHash(window.location.hash));
      setQuery("");
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      mainRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function navigate(id: SectionId) {
    setSection(id);
    setQuery("");
    setMenuOpen(false);
    window.location.hash = id;
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const searchEntries = [
    ...guide.skills.map((item) => ({
      title: item.name,
      body: `${item.category} ${item.description} ${item.advice}`,
      section: "skills" as SectionId,
    })),
    ...guide.equipment.map((item) => ({
      title: item.name,
      body: `${item.family} ${item.acquisition}`,
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
      title: "STR, DEX & accuracy",
      body: "stats AP ability points weapon requirements",
      section: "stats" as SectionId,
    },
  ];
  const term = query.trim();
  const matches = searchEntries.filter((item) =>
    `${item.title} ${item.body}`.toLowerCase().includes(term.toLowerCase()),
  );
  const active = sections.find((item) => item.id === section)!;

  const sectionLink = (
    id: SectionId,
    label: React.ReactNode,
    className?: string,
  ) => (
    <a
      href={`#${id}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(id);
      }}
    >
      {label}
    </a>
  );
  const navLinks = () =>
    sections.map(({ id, label, icon: Icon }) => (
      <a
        key={id}
        href={`#${id}`}
        aria-current={section === id && !term ? "page" : undefined}
        onClick={(event) => {
          event.preventDefault();
          navigate(id);
        }}
      >
        <Icon size={17} aria-hidden="true" />
        <span>{label}</span>
        <ChevronRight size={13} className="nav-chevron" aria-hidden="true" />
      </a>
    ));

  return (
    <div className="maple-app">
      <a
        className="skip-link"
        href="#guide-content"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to guide
      </a>
      <header className="masthead">
        <div className="masthead-inner">
          <a
            className="brand"
            href="/maple/"
            aria-label="Maple Fieldguide home"
          >
            <span className="brand-mark">
              <Leaf size={29} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span>
              Maple<span className="brand-sub">FIELDGUIDE</span>
            </span>
          </a>
          <span className="world-label">
            CLASSIC WORLD <span>·</span> FAN GUIDE
          </span>
          <a className="portfolio-link" href="/">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Portfolio</span>
          </a>
        </div>
      </header>

      <div className="mobile-navigation">
        <div className="mobile-toolbar">
          <span>
            <Sword size={17} aria-hidden="true" />
            <strong>Warrior</strong>
            <span className="mobile-current">/ {active.label}</span>
          </span>
          <button
            ref={menuRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-guide-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={17} aria-hidden="true" />
            ) : (
              <Menu size={17} aria-hidden="true" />
            )}
            <span>Guide menu</span>
          </button>
        </div>
        <nav
          id="mobile-guide-menu"
          aria-label="Mobile guide sections"
          hidden={!menuOpen}
        >
          {navLinks()}
        </nav>
        <nav className="quick-tabs" aria-label="Quick sections">
          {sections.slice(0, 6).map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={section === id && !term ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigate(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="guide-layout">
        <aside className="sidebar">
          <div className="sidebar-window">
            <div className="window-title">
              <BookOpen size={14} aria-hidden="true" /> ADVENTURER’S GUIDE
            </div>
            <div className="selected-job">
              <span className="job-emblem">
                <Sword size={27} aria-hidden="true" />
              </span>
              <div>
                <small>FIRST JOB</small>
                <strong>Warrior</strong>
              </div>
              <span className="online-dot" />
            </div>
            <nav aria-label="Guide sections">{navLinks()}</nav>
          </div>
          <div className="sidebar-tip">
            <img
              src={asset("orange-mushroom.png")}
              alt=""
              width="48"
              height="42"
            />
            <div>
              <strong>Back to Victoria Island.</strong>
              <p>
                Keep the guide handy.
                <br />
                Adventure at your pace.
              </p>
            </div>
          </div>
          <div className="sidebar-meta">
            REFERENCE SNAPSHOT
            <br />
            <strong>October 19, 2026</strong>
            <span>First job & level-30 paths</span>
          </div>
        </aside>

        <div className="content-column">
          <div className="content-toolbar">
            <div className="breadcrumbs">
              JOB GUIDES <ChevronRight size={12} aria-hidden="true" />
              <strong>Warrior</strong>
            </div>
            <div className="guide-search">
              <Search size={16} aria-hidden="true" />
              <input
                aria-label="Search the guide"
                placeholder="Search guide…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setMenuOpen(false);
                }}
                type="search"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <main
            id="guide-content"
            ref={mainRef}
            tabIndex={-1}
            className="guide-content"
          >
            {term ? (
              <>
                <PageHeading
                  kicker="FIELDGUIDE SEARCH"
                  title={
                    matches.length
                      ? `Results for “${term}”`
                      : "No results found"
                  }
                >
                  {matches.length
                    ? `${matches.length} matches in the Warrior guide.`
                    : "Try a skill, NPC, item, or map name."}
                </PageHeading>
                <div className="search-results">
                  {matches.map((item) => (
                    <a
                      key={`${item.section}-${item.title}`}
                      href={`#${item.section}`}
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(item.section);
                      }}
                    >
                      <span>
                        <small>
                          {sections.find((s) => s.id === item.section)!.label}
                        </small>
                        <strong>{item.title}</strong>
                      </span>
                      <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <>
                {section === "overview" && (
                  <>
                    <section className="hero game-window">
                      <div className="window-title">
                        <Sword size={14} aria-hidden="true" /> JOB GUIDE{" "}
                        <span>01 / WARRIOR</span>
                        <span className="window-decor" aria-hidden="true">
                          ◆ ◆ ◆
                        </span>
                      </div>
                      <div className="hero-body">
                        <div className="hero-copy">
                          <span className="eyebrow">
                            MAPLESTORY CLASSIC WORLD
                          </span>
                          <h1>
                            Your Warrior
                            <br />
                            <em>adventure starts here.</em>
                          </h1>
                          <p>
                            Stats, skills, gear, and quests.
                            <br />
                            Everything you need for the road from Perion.
                          </p>
                          {sectionLink(
                            "skills",
                            <>
                              Explore the skills{" "}
                              <ArrowRight size={16} aria-hidden="true" />
                            </>,
                            "maple-button",
                          )}
                        </div>
                        <div
                          className="hero-scene"
                          role="img"
                          aria-label="Classic MapleStory scenery with an Orange Mushroom, Slime, and Blue Snail"
                        >
                          <div className="scene-label">
                            VICTORIA ISLAND<span>BEGINNER → WARRIOR</span>
                          </div>
                          <div className="scene-monsters">
                            <img src={asset("blue-snail.png")} alt="" />
                            <img src={asset("slime.png")} alt="" />
                            <img src={asset("orange-mushroom.png")} alt="" />
                          </div>
                          <span className="scene-caption">
                            A familiar world. A new adventure.
                          </span>
                        </div>
                      </div>
                      <div className="hero-stats">
                        <div>
                          <small>ADVANCEMENT</small>
                          <strong>Level 10</strong>
                        </div>
                        <div>
                          <small>HOME TOWN</small>
                          <strong>Perion</strong>
                        </div>
                        <div>
                          <small>PRIMARY STAT</small>
                          <strong>STR</strong>
                        </div>
                        <div>
                          <small>NEXT JOB</small>
                          <strong>Level 30</strong>
                        </div>
                      </div>
                    </section>

                    <section
                      className="job-directory"
                      aria-labelledby="job-directory-title"
                    >
                      <div className="section-heading">
                        <h2 id="job-directory-title">Choose your job</h2>
                        <span>One adventure at a time</span>
                      </div>
                      <div className="job-tiles">
                        {jobTiles.map((job) => {
                          const Icon = jobIcons[job.id];
                          const content = (
                            <>
                              <span className={`tile-emblem ${job.id}`}>
                                <Icon size={25} aria-hidden="true" />
                              </span>
                              <strong>{job.name}</strong>
                              <small>{job.detail}</small>
                              {job.href ? (
                                <span className="tile-state">
                                  GUIDE OPEN{" "}
                                  <ArrowRight size={11} aria-hidden="true" />
                                </span>
                              ) : (
                                <span className="tile-state">
                                  <LockKeyhole size={10} aria-hidden="true" />{" "}
                                  COMING SOON
                                </span>
                              )}
                            </>
                          );
                          return job.href ? (
                            <a
                              key={job.id}
                              href={job.href}
                              className="job-tile available"
                              aria-label="Warrior guide"
                              aria-current="page"
                              onClick={(event) => {
                                event.preventDefault();
                                navigate("overview");
                              }}
                            >
                              {content}
                            </a>
                          ) : (
                            <a
                              key={job.id}
                              role="link"
                              aria-disabled="true"
                              tabIndex={-1}
                              className="job-tile unavailable"
                              aria-label={`${job.name} guide — coming soon`}
                            >
                              {content}
                            </a>
                          );
                        })}
                      </div>
                    </section>

                    <section aria-labelledby="quick-reference-title">
                      <div className="section-heading">
                        <h2 id="quick-reference-title">Your quick reference</h2>
                        <span>Pick a chapter</span>
                      </div>
                      <div className="chapter-grid">
                        {sections
                          .slice(1, 7)
                          .map(
                            ({ id, label, icon: Icon, description }, index) => (
                              <a
                                key={id}
                                href={`#${id}`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  navigate(id);
                                }}
                              >
                                <span className="chapter-number">
                                  0{index + 1}
                                </span>
                                <Icon size={21} aria-hidden="true" />
                                <h3>{label}</h3>
                                <p>{description}</p>
                                <ArrowRight
                                  className="chapter-arrow"
                                  size={16}
                                  aria-hidden="true"
                                />
                              </a>
                            ),
                          )}
                      </div>
                    </section>

                    <div className="notice-board">
                      <Sparkles size={20} aria-hidden="true" />
                      <div>
                        <strong>First stop: Dances with Balrog</strong>
                        <p>
                          At level 10, visit Warriors’ Sanctuary in Perion for
                          your first advancement.
                        </p>
                      </div>
                      {sectionLink(
                        "quests",
                        <>
                          Quest details{" "}
                          <ArrowRight size={14} aria-hidden="true" />
                        </>,
                      )}
                    </div>
                  </>
                )}

                {section === "stats" && (
                  <>
                    <PageHeading
                      kicker="WARRIOR / ABILITY POINTS"
                      title="Stats & AP"
                    >
                      Prioritize STR. Add DEX for requirements and consistent
                      hits.
                    </PageHeading>
                    <div className="stat-priorities">
                      {statPriorities.map((item) => (
                        <article
                          className="reference-card stat-card"
                          key={item.stat}
                        >
                          <span className="stat-symbol">{item.stat}</span>
                          <h2>{item.title}</h2>
                          <p>{item.text}</p>
                        </article>
                      ))}
                    </div>
                    <section className="reference-card">
                      <h2>Before you spend AP</h2>
                      <ol className="plain-steps">
                        <li>
                          Choose your next weapon and check its level, STR, and
                          DEX requirements.
                        </li>
                        <li>Include stats from your equipped gear.</li>
                        <li>
                          If you keep missing, try accuracy gear or Precise
                          Strikes.
                        </li>
                        <li>Put remaining AP into STR.</li>
                      </ol>
                      <EvidenceNote
                        kind="client"
                        sources={["warrior", "precise"]}
                      />
                    </section>
                    <div className="note-strip">
                      <Target size={19} aria-hidden="true" />
                      <p>
                        No fixed DEX formula: your weapon and accuracy needs
                        decide the amount.
                      </p>
                    </div>
                    {sectionLink(
                      "gear",
                      <>
                        View weapon requirements{" "}
                        <ArrowRight size={16} aria-hidden="true" />
                      </>,
                      "maple-button secondary",
                    )}
                  </>
                )}

                {section === "skills" && (
                  <>
                    <PageHeading kicker="WARRIOR / FIRST JOB" title="Skills">
                      Effects, max ranks, and prerequisites at a glance.
                    </PageHeading>
                    <div className="sp-note">
                      <Swords size={23} aria-hidden="true" />
                      <div>
                        <strong>1 SP at level 10 · 3 SP per level after</strong>
                        <p>
                          61 first-job points by level 30. Second-job points are
                          separate.
                        </p>
                      </div>
                      <EvidenceNote kind="client" sources={["warrior"]} />
                    </div>
                    <div className="skill-grid">
                      {guide.skills.map((skill) => {
                        const Icon =
                          skillIcons[skill.symbol as keyof typeof skillIcons] ||
                          Sword;
                        const prerequisite = skill.requires
                          ? `${guide.skills.find((item) => item.id === skill.requires!.skill)!.name} ${skill.requires.rank}`
                          : "None";
                        return (
                          <article
                            className="reference-card skill-card"
                            key={skill.id}
                          >
                            <div className="skill-heading">
                              <span className={`skill-emblem ${skill.symbol}`}>
                                <Icon size={24} aria-hidden="true" />
                              </span>
                              <div>
                                <small>{skill.category}</small>
                                <h2>{skill.name}</h2>
                              </div>
                              <span className="max-rank">
                                MAX <strong>{skill.max}</strong>
                              </span>
                            </div>
                            <p>{skill.description}</p>
                            <p className="skill-prerequisite">
                              <strong>Requires</strong> {prerequisite}
                            </p>
                            <p className="skill-advice">{skill.advice}</p>
                            <EvidenceNote {...skill} />
                          </article>
                        );
                      })}
                    </div>
                    <section className="reference-card build-reference">
                      <div className="section-heading">
                        <h2>Mobbing route example</h2>
                        <span>Editorial · 61 SP</span>
                      </div>
                      <p>
                        Follow the numbered steps. Adjust for accuracy and
                        survival; this is not a tested meta build.
                      </p>
                      <ol className="skill-route">
                        {skillRoute.map((step, index) => (
                          <li key={index}>
                            <span>{index + 1}</span>
                            <strong>
                              {
                                guide.skills.find((s) => s.id === step.skill)!
                                  .name
                              }
                            </strong>
                            <b>+{step.add}</b>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </>
                )}

                {section === "gear" && (
                  <>
                    <PageHeading kicker="WARRIOR / EQUIPMENT" title="Equipment">
                      Useful upgrades and their listed requirements.
                    </PageHeading>
                    <div className="priority-row">
                      {gearPriorities.map((item, i) => (
                        <div key={item.title}>
                          <span>0{i + 1}</span>
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="filter-bar">
                      <label htmlFor="equipment-family">Weapon family</label>
                      <select
                        id="equipment-family"
                        value={family}
                        onChange={(event) => setFamily(event.target.value)}
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
                      <span>
                        {
                          guide.equipment.filter(
                            (item) =>
                              family === "All equipment" ||
                              item.family === family,
                          ).length
                        }{" "}
                        entries
                      </span>
                    </div>
                    <p className="reference-note">
                      Base stats and recorded shop prices. Confirm availability,
                      rolls, and recipes in game.
                    </p>
                    <div className="equipment-grid">
                      {guide.equipment
                        .filter(
                          (item) =>
                            family === "All equipment" ||
                            item.family === family,
                        )
                        .map((item) => (
                          <article
                            className="reference-card equipment-card"
                            key={item.id}
                          >
                            <div className="item-heading">
                              <span className="item-level">
                                LV. {item.level}
                              </span>
                              <span>{item.family}</span>
                            </div>
                            <h2>{item.name}</h2>
                            <dl className="item-stats">
                              {item.attack != null && (
                                <div>
                                  <dt>ATT</dt>
                                  <dd>{item.attack}</dd>
                                </div>
                              )}
                              <div>
                                <dt>STR</dt>
                                <dd>{item.str || "—"}</dd>
                              </div>
                              <div>
                                <dt>DEX</dt>
                                <dd>{item.dex || "—"}</dd>
                              </div>
                            </dl>
                            <p className="item-price">
                              {item.price
                                ? `${item.price.toLocaleString("en-US")} mesos`
                                : "Confirm acquisition in game"}
                            </p>
                            <p className="item-acquisition">
                              {item.acquisition}
                            </p>
                            <p>{item.advice}</p>
                            <EvidenceNote {...item} />
                          </article>
                        ))}
                    </div>
                  </>
                )}

                {section === "quests" && (
                  <>
                    <PageHeading
                      kicker="WARRIOR / QUEST REFERENCE"
                      title="Quests"
                    >
                      Where to go, what to collect, and what you get.
                    </PageHeading>
                    <div className="filter-bar">
                      <label htmlFor="quest-level">Quest level</label>
                      <select
                        id="quest-level"
                        value={questFilter}
                        onChange={(event) => setQuestFilter(event.target.value)}
                      >
                        {["All levels", "10–20", "21–29", "30+"].map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <span>Expand a quest for details</span>
                    </div>
                    <div className="quest-list">
                      {guide.quests
                        .filter(
                          (item) =>
                            questFilter === "All levels" ||
                            (questFilter === "10–20"
                              ? item.level <= 20
                              : questFilter === "21–29"
                                ? item.level >= 21 && item.level < 30
                                : item.level >= 30),
                        )
                        .map((quest) => (
                          <details className="quest-card" key={quest.id}>
                            <summary>
                              <span className="level-badge">
                                LV.<strong>{quest.level}</strong>
                              </span>
                              <span>
                                <strong>{quest.name}</strong>
                                <small>
                                  {quest.npc} · {quest.location}
                                </small>
                              </span>
                              <ChevronDown size={18} aria-hidden="true" />
                            </summary>
                            <div className="quest-body">
                              {quest.prerequisite && (
                                <p className="quest-prerequisite">
                                  <strong>Prerequisite:</strong>{" "}
                                  {quest.prerequisite}
                                </p>
                              )}
                              <p>{quest.objective}</p>
                              <div className="quest-reward">
                                <strong>Reward</strong>
                                <span>{quest.reward}</span>
                              </div>
                              <p className="reference-note">{quest.reason}</p>
                              <EvidenceNote {...quest} />
                            </div>
                          </details>
                        ))}
                    </div>
                    <div className="note-strip">
                      <BookOpen size={19} aria-hidden="true" />
                      <p>
                        Level 30 chain: Journey → Instructor → Qualification
                        test → Proof → choose your job.
                      </p>
                    </div>
                  </>
                )}

                {section === "training" && (
                  <>
                    <PageHeading
                      kicker="WARRIOR / LEVELING ROUTES"
                      title="Training"
                    >
                      Map candidates from level 1 to 55. Move on when hits and
                      kills feel consistent.
                    </PageHeading>
                    <div className="training-list">
                      {guide.training.map((spot) => (
                        <article className="training-card" key={spot.id}>
                          <span className="training-level">
                            <small>LEVEL</small>
                            <strong>
                              {spot.min}–{spot.max}
                            </strong>
                          </span>
                          <div>
                            <span className="eyebrow">{spot.town}</span>
                            <h2>{spot.map}</h2>
                            <p className="training-monsters">{spot.monsters}</p>
                            <p>{spot.advice}</p>
                            <EvidenceNote {...spot} />
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="note-strip">
                      <Shield size={19} aria-hidden="true" />
                      <p>
                        These are route suggestions, not measured EXP/hour
                        rankings. Factor in misses and potion costs.
                      </p>
                    </div>
                  </>
                )}

                {section === "branches" && (
                  <>
                    <PageHeading
                      kicker="WARRIOR / SECOND JOB · LEVEL 30"
                      title="Choose your path"
                    >
                      Pick the weapon family and playstyle you enjoy.
                    </PageHeading>
                    <div className="branch-grid">
                      {branches.map((branch, index) => (
                        <article
                          className="reference-card branch-card"
                          key={branch.id}
                        >
                          <span className="branch-emblem">
                            {index === 0 ? (
                              <Swords size={33} aria-hidden="true" />
                            ) : index === 1 ? (
                              <Shield size={33} aria-hidden="true" />
                            ) : (
                              <Sword size={33} aria-hidden="true" />
                            )}
                          </span>
                          <small>SECOND JOB</small>
                          <h2>{branch.name}</h2>
                          <span className="branch-weapons">
                            {branch.weapons}
                          </span>
                          <p>{branch.description}</p>
                          <p className="skill-advice">{branch.advice}</p>
                          <EvidenceNote
                            kind="client"
                            sources={branch.sources}
                          />
                        </article>
                      ))}
                    </div>
                    <section className="reference-card">
                      <h2>Advancement route</h2>
                      <ol className="plain-steps">
                        <li>
                          At level 30, speak to Dances with Balrog in Perion.
                        </li>
                        <li>
                          Take his letter to the instructor at West Rocky
                          Mountain IV.
                        </li>
                        <li>Collect 30 Dark Marbles in the test area.</li>
                        <li>
                          Complete the proof step, return to Perion, and choose
                          a job.
                        </li>
                      </ol>
                      {sectionLink(
                        "quests",
                        <>
                          Read the quest steps{" "}
                          <ArrowRight size={15} aria-hidden="true" />
                        </>,
                        "text-link",
                      )}
                    </section>
                  </>
                )}

                {section === "sources" && (
                  <>
                    <PageHeading
                      kicker="FIELDGUIDE / REFERENCES"
                      title="Sources & credits"
                    >
                      Gameplay snapshot: October 19, 2026. The live game takes
                      priority.
                    </PageHeading>
                    <div className="source-intro">
                      <a
                        className="official-art"
                        href={sourceById.notes.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={asset("classic-world.png")}
                          width="540"
                          height="304"
                          alt="Nexon’s MapleStory Classic World Founder’s Access release-notes illustration"
                          loading="lazy"
                        />
                        <span>
                          Official release notes{" "}
                          <ExternalLink size={13} aria-hidden="true" />
                        </span>
                      </a>
                      <div className="reference-card">
                        <h2>How to read this guide</h2>
                        <p>
                          Official posts establish scope. Client exports and
                          community guides supply detailed references.
                        </p>
                        <p>
                          Recommendations are editorial. Disputed values stay
                          marked; expand “Source” beside any entry.
                        </p>
                        <p className="reference-note">
                          No in-game verification or automatic updates. The
                          official release-note body was not extractable during
                          the mechanics review.
                        </p>
                      </div>
                    </div>
                    <section className="reference-card known-differences">
                      <h2>Known differences</h2>
                      <ul>
                        <li>
                          <strong>Slash Blast:</strong> 6 targets in the newer
                          export; 4 in the older wiki.
                        </li>
                        <li>
                          <strong>Studded Polearm:</strong> 42 base ATT in the
                          newer export; 39 in the older guide.
                        </li>
                        <li>
                          <strong>HP:</strong> current passive values apply;
                          historical HP-washing formulas are not used.
                        </li>
                      </ul>
                    </section>
                    <div className="source-list">
                      {sources.map((source) => (
                        <details key={source.id}>
                          <summary>
                            <span>
                              <strong>{source.title}</strong>
                              <small>
                                {source.publisher} · {source.version}
                              </small>
                            </span>
                            <span className={`source-kind ${source.kind}`}>
                              {evidenceLabels[source.kind]}
                            </span>
                            <ChevronDown size={15} aria-hidden="true" />
                          </summary>
                          <div>
                            <p>{source.note}</p>
                            <a
                              className="text-link"
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open reference{" "}
                              <ExternalLink size={13} aria-hidden="true" />
                            </a>
                            <small>Reviewed {source.checked}</small>
                          </div>
                        </details>
                      ))}
                    </div>
                    <section className="reference-card artwork-credits">
                      <h2>Artwork credits</h2>
                      {artworkCredits.map((credit) => (
                        <div key={credit.title}>
                          <a href={credit.url} target="_blank" rel="noreferrer">
                            {credit.title}{" "}
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                          <small>{credit.publisher}</small>
                          <p>{credit.note}</p>
                        </div>
                      ))}
                    </section>
                  </>
                )}
              </>
            )}
          </main>
          <footer className="guide-footer">
            <span>
              <Leaf size={13} aria-hidden="true" /> Maple Fieldguide
            </span>
            <p>Independent fan guide. MapleStory & artwork © Nexon.</p>
            {sectionLink(
              "sources",
              <>
                Sources & credits <ArrowRight size={12} aria-hidden="true" />
              </>,
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
