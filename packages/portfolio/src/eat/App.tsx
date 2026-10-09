import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import Questionnaire from "./Questionnaire";
import RestaurantCard from "./RestaurantCard";
import {
  chooseRestaurant,
  filterRestaurants,
  preferenceSummary,
  distanceMiles,
} from "./filter";
import { discoverRestaurants, resolveZip } from "./provider";
import { openingStatus } from "./hours";
import {
  defaults,
  loadPreferences,
  readLocal,
  writeLocal,
  safeWebsite,
  type Center,
  type Match,
  type Preferences,
  type Restaurant,
} from "./model";
const RestaurantMap = lazy(() => import("./RestaurantMap"));
const fallbackCenter: Center = {
  lat: 47.674,
  lon: -122.1215,
  label: "Redmond",
};
export default function App() {
  const [preferences, setPreferences] = useState(loadPreferences);
  const [center, setCenter] = useState<Center>();
  const [deviceCenter, setDeviceCenter] = useState<Center>();
  const [editing, setEditing] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string>();
  const [eliminated, setEliminated] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Restaurant[]>(() => {
    const stored = readLocal<Restaurant[]>("eat:favorites:v1", []);
    return Array.isArray(stored)
      ? stored
          .filter(
            (r) =>
              typeof r.id === "string" &&
              typeof r.name === "string" &&
              Array.isArray(r.cuisine) &&
              Number.isFinite(r.lat) &&
              Number.isFinite(r.lon),
          )
          .map((r) => ({ ...r, website: safeWebsite(r.website) }))
      : [];
  });
  const [view, setView] = useState<"list" | "map">("list");
  const [savedOnly, setSavedOnly] = useState(false);
  const [sort, setSort] = useState("distance");
  const [time, setTime] = useState(Date.now());
  const [fetchedAt, setFetchedAt] = useState(0);
  const [seen, setSeen] = useState<string[]>([]);
  const [choice, setChoice] = useState<Match>();
  const [rolling, setRolling] = useState(false);
  const controller = useRef<AbortController>();
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const closeChoice = useRef<HTMLButtonElement>(null);
  const surpriseTrigger = useRef<HTMLElement>();
  const content = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLElement>(null);
  useEffect(() => {
    if (choice || rolling) {
      content.current?.setAttribute("inert", "");
      if (rolling) dialog.current?.focus();
    } else content.current?.removeAttribute("inert");
  }, [choice, rolling]);
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
      controller.current?.abort();
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    writeLocal("eat:favorites:v1", favorites);
  }, [favorites]);
  useEffect(() => {
    if (choice) closeChoice.current?.focus();
  }, [choice]);
  const filtered = useMemo(
    () =>
      center
        ? filterRestaurants(
            restaurants,
            center,
            preferences,
            eliminated,
            new Date(time),
          )
        : [],
    [restaurants, center, preferences, eliminated, time],
  );
  const results = useMemo(() => {
    const list: Match[] = savedOnly
      ? favorites.map((r) => ({
          ...r,
          distance: distanceMiles(center || fallbackCenter, r),
          status: openingStatus(r.hours, r.lat, r.lon, new Date(time)),
        }))
      : [...filtered];
    return list.sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : a.distance - b.distance,
    );
  }, [filtered, favorites, savedOnly, sort, center, time]);
  useEffect(() => {
    if (selected && !results.some((r) => r.id === selected))
      setSelected(undefined);
  }, [results, selected]);
  function save(r: Restaurant) {
    setFavorites((old) =>
      old.some((x) => x.id === r.id)
        ? old.filter((x) => x.id !== r.id)
        : [...old, r],
    );
  }
  function select(id: string, fromMap = false) {
    setSelected(id);
    if (fromMap) {
      setView("list");
      requestAnimationFrame(() =>
        document
          .getElementById(`restaurant-${id.replace("/", "-")}`)
          ?.scrollIntoView({
            block: "nearest",
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          }),
      );
    }
  }
  function surprise(options = filtered, priorSeen = seen) {
    const next = chooseRestaurant(options, priorSeen);
    if (!next) return;
    surpriseTrigger.current = document.activeElement as HTMLElement;
    setRolling(true);
    setChoice(undefined);
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        setRolling(false);
        setChoice(next);
        setSeen((old) =>
          options.every((r) => old.includes(r.id))
            ? [next.id]
            : [...old, next.id],
        );
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700,
    );
  }
  function dismissChoice() {
    setChoice(undefined);
    surpriseTrigger.current?.focus();
  }
  async function search(p: Preferences, location?: Center) {
    clearTimeout(timer.current);
    setRolling(false);
    setChoice(undefined);
    setSeen([]);
    setPreferences(p);
    writeLocal("eat:preferences:v1", p);
    setDeviceCenter(location);
    setEditing(false);
    setSavedOnly(false);
    setState("loading");
    setError("");
    setSelected(undefined);
    setRestaurants([]);
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    const timeout = setTimeout(() => request.abort("timeout"), 35000);
    try {
      const nextCenter = location || (await resolveZip(p.zip, request.signal));
      if (request.signal.aborted) return;
      setCenter(nextCenter);
      const data = await discoverRestaurants(
        nextCenter,
        p.radius,
        request.signal,
      );
      if (request.signal.aborted) return;
      setRestaurants(data.restaurants);
      setFetchedAt(data.time);
      setTime(Date.now());
      setState("success");
      if (p.random)
        surprise(
          filterRestaurants(data.restaurants, nextCenter, p, eliminated),
          [],
        );
    } catch (e) {
      if (controller.current !== request) return;
      setState("error");
      setError(
        request.signal.aborted
          ? "The search timed out. Try a smaller radius or retry shortly."
          : e instanceof Error
            ? e.message
            : "Could not load restaurants. Check your connection and try again.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  function cancelEditing() {
    setEditing(false);
  }
  return (
    <div className="eat-app">
      <div ref={content}>
        <header className="eat-header">
          <a
            className="eat-brand"
            href="/eat/"
            aria-label="What Should We Eat home"
          >
            <span aria-hidden="true">🍴</span>
            <span>
              What Should
              <br />
              We Eat<span className="eat-brand-question">?</span>
            </span>
          </a>
          <span className="eat-header-note">Good food. Easy decisions.</span>
          <button
            className="eat-shortlist-button"
            aria-pressed={savedOnly && !editing}
            onClick={() => {
              setEditing(false);
              setSavedOnly(!savedOnly);
              setView("list");
            }}
          >
            ♡ <span>Shortlist</span>
            <b>{favorites.length}</b>
          </button>
        </header>
        <main>
          {editing ? (
            <Questionnaire
              initial={preferences}
              initialCenter={deviceCenter}
              onSearch={search}
              onCancel={
                state !== "idle" || savedOnly ? cancelEditing : undefined
              }
            />
          ) : (
            <>
              <section className="eat-results-header">
                <div>
                  <span className="eat-eyebrow">YOUR NEXT GOOD MEAL</span>
                  <h1>
                    {savedOnly
                      ? "The ones worth saving."
                      : "Let’s find your kind of food."}
                  </h1>
                  <p>
                    {center?.label || `ZIP ${preferences.zip}`} <span>·</span>{" "}
                    {savedOnly
                      ? "Saved places across all searches"
                      : preferenceSummary(preferences)}
                  </p>
                </div>
                <div className="eat-results-actions">
                  <button
                    className="eat-secondary"
                    onClick={() => setEditing(true)}
                  >
                    Edit preferences
                  </button>
                  <button
                    className="eat-primary"
                    disabled={rolling || !filtered.length || savedOnly}
                    onClick={() => surprise()}
                  >
                    ✦ {rolling ? "Choosing…" : "Surprise Me"}
                  </button>
                </div>
              </section>
              {savedOnly && (
                <p className="eat-notice">
                  Your shortlist ignores current filters. Distances use{" "}
                  {center?.label || "Redmond (default center)"}.{" "}
                  <button
                    className="eat-text-button"
                    onClick={() => {
                      setSavedOnly(false);
                      if (state === "idle") setEditing(true);
                    }}
                  >
                    Back to discovery
                  </button>
                </p>
              )}
              {!savedOnly && (
                <p className="eat-data-disclaimer">
                  Community listings may be incomplete. Unknown prices, hours,
                  and services do not pass strict filters. No ratings are
                  supplied. Confirm details before heading out.
                </p>
              )}
              <div className="eat-results-toolbar">
                <span aria-live="polite">
                  {state === "loading" && !savedOnly
                    ? "Finding real places nearby…"
                    : `${results.length} ${savedOnly ? "saved places" : "matches"}`}
                </span>
                <label>
                  Sort{" "}
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="distance">Nearest first</option>
                    <option value="name">Name A–Z</option>
                  </select>
                </label>
                <div className="eat-view-toggle">
                  <button
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                  >
                    List
                  </button>
                  <button
                    aria-pressed={view === "map"}
                    onClick={() => setView("map")}
                  >
                    Map
                  </button>
                </div>
              </div>
              <div className={`eat-workspace view-${view}`}>
                <section className="eat-list" aria-label="Restaurant results">
                  {state === "loading" && !savedOnly && (
                    <div className="eat-state" role="status">
                      <div className="eat-loader" aria-hidden="true">
                        🍜
                      </div>
                      <h2>Looking for something delicious…</h2>
                      <p>
                        Searching real OpenStreetMap listings. Larger areas can
                        take up to 35 seconds.
                      </p>
                    </div>
                  )}
                  {state === "error" && !savedOnly && (
                    <div className="eat-state">
                      <span aria-hidden="true">☁️</span>
                      <h2>We couldn’t finish that search.</h2>
                      <p role="alert">{error}</p>
                      <button
                        className="eat-primary"
                        onClick={() => search(preferences, deviceCenter)}
                      >
                        Try search again
                      </button>
                      <button
                        className="eat-secondary"
                        onClick={() => setEditing(true)}
                      >
                        Change search
                      </button>
                    </div>
                  )}
                  {(savedOnly || state === "success") && !results.length && (
                    <div className="eat-state">
                      <span aria-hidden="true">🍽️</span>
                      <h2>
                        {savedOnly
                          ? "Your next favorites belong here."
                          : "No matches this time."}
                      </h2>
                      <p>
                        {savedOnly
                          ? "Tap the heart on a restaurant to save it for another day."
                          : "Try Anything, Any price, or Either. Missing community data can make filters too narrow."}
                      </p>
                      <button
                        className="eat-primary"
                        onClick={() => setEditing(true)}
                      >
                        {savedOnly ? "Find restaurants" : "Change preferences"}
                      </button>
                      {!savedOnly && (
                        <button
                          className="eat-secondary"
                          onClick={() => {
                            const p = {
                              ...defaults,
                              zip: preferences.zip,
                              radius: preferences.radius,
                            };
                            setPreferences(p);
                            writeLocal("eat:preferences:v1", p);
                          }}
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  )}
                  {results.map((r, i) => (
                    <RestaurantCard
                      key={r.id}
                      restaurant={r}
                      index={i}
                      selected={selected === r.id}
                      saved={favorites.some((x) => x.id === r.id)}
                      onSelect={() => {
                        select(r.id);
                        setView("map");
                      }}
                      onSave={save}
                      onDismiss={
                        savedOnly
                          ? undefined
                          : () => {
                              setEliminated((old) => [...old, r.id]);
                              if (selected === r.id) setSelected(undefined);
                            }
                      }
                    />
                  ))}
                  {!!eliminated.length && !savedOnly && (
                    <div className="eat-eliminated">
                      {eliminated.length} dismissed this session{" "}
                      <button
                        className="eat-text-button"
                        onClick={() => setEliminated([])}
                      >
                        Restore dismissed
                      </button>
                    </div>
                  )}
                </section>
                <Suspense
                  fallback={
                    <div className="eat-map-loading">
                      Loading interactive map…
                    </div>
                  }
                >
                  <RestaurantMap
                    center={center || fallbackCenter}
                    radius={preferences.radius}
                    restaurants={results}
                    selected={selected}
                    onSelect={(id) => select(id, true)}
                  />
                </Suspense>
              </div>
              <p className="eat-data-footer">
                Restaurant data ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenStreetMap contributors · ODbL
                </a>
                . ZIP centers:{" "}
                <a
                  href="https://www.zippopotam.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zippopotam.us / GeoNames
                </a>
                .{" "}
                {fetchedAt > 0 && (
                  <>
                    Loaded{" "}
                    {new Date(fetchedAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    · cached for 15 minutes.
                  </>
                )}
              </p>
            </>
          )}
        </main>
      </div>
      {(choice || rolling) && (
        <div className="eat-reveal-backdrop">
          <section
            ref={dialog}
            className="eat-reveal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="eat-choice-title"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape" && !rolling) dismissChoice();
              if (e.key === "Tab") {
                const items = [
                  ...e.currentTarget.querySelectorAll<HTMLElement>(
                    "button:not(:disabled), a[href]",
                  ),
                ];
                const first = items[0],
                  last = items.at(-1);
                if (!first) {
                  e.preventDefault();
                  return;
                }
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <span
              className={`eat-reveal-icon ${rolling ? "rolling" : ""}`}
              aria-hidden="true"
            >
              {rolling ? "🎲" : "✨"}
            </span>
            <span className="eat-eyebrow">LET FATE PICK DINNER</span>
            <h2 id="eat-choice-title">
              {rolling
                ? "A delicious decision is coming…"
                : "How about this one?"}
            </h2>
            {choice && (
              <>
                <RestaurantCard
                  restaurant={choice}
                  selected={false}
                  saved={favorites.some((x) => x.id === choice.id)}
                  onSelect={() => {
                    select(choice.id);
                    setView("map");
                    dismissChoice();
                  }}
                  onSave={save}
                />
                <div className="eat-reveal-actions">
                  <button
                    ref={closeChoice}
                    className="eat-primary"
                    onClick={() => {
                      select(choice.id);
                      setView("map");
                      dismissChoice();
                    }}
                  >
                    Let’s go
                  </button>
                  <button className="eat-secondary" onClick={() => surprise()}>
                    Try Again
                  </button>
                  <button
                    className="eat-text-button"
                    onClick={() => {
                      const next = filtered.filter((r) => r.id !== choice.id);
                      setEliminated((old) => [...old, choice.id]);
                      if (next.length) surprise(next);
                      else dismissChoice();
                    }}
                  >
                    Eliminate this choice
                  </button>
                  <button className="eat-text-button" onClick={dismissChoice}>
                    Close
                  </button>
                </div>
                <p className="eat-hint">
                  No repeats until every available place gets a turn.
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
