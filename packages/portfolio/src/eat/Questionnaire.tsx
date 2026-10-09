import { useEffect, useRef, useState } from "react";
import { cuisines, type Center, type Cuisine, type Preferences } from "./model";
import { locateDevice } from "./provider";
export default function Questionnaire({
  initial,
  initialCenter,
  onSearch,
  onCancel,
}: {
  initial: Preferences;
  initialCenter?: Center;
  onSearch: (p: Preferences, center?: Center) => void;
  onCancel?: () => void;
}) {
  const [p, setP] = useState(initial);
  const [step, setStep] = useState(0);
  const [center, setCenter] = useState(initialCenter);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, [step]);
  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setP((old) => ({ ...old, [key]: value }));
  }
  function toggle(key: "cuisines" | "excluded", c: Cuisine) {
    setP((old) => ({
      ...old,
      [key]: old[key].includes(c)
        ? old[key].filter((x) => x !== c)
        : [...old[key], c],
      [key === "cuisines" ? "excluded" : "cuisines"]: old[
        key === "cuisines" ? "excluded" : "cuisines"
      ].filter((x) => x !== c),
    }));
  }
  const titles = [
    "Where are we eating?",
    "What sounds good?",
    "What’s the budget?",
    "How are we eating?",
  ];
  return (
    <section className="eat-questionnaire" aria-label="Restaurant preferences">
      <div className="eat-intro">
        <span className="eat-eyebrow">LESS SCROLLING. MORE EATING.</span>
        <h1>
          A little hungry.
          <br />A little undecided.
        </h1>
        <p>A few quick picks, then let’s find your next meal.</p>
        <div className="eat-food-art" aria-hidden="true">
          <span>🍜</span>
          <span>🥟</span>
          <span>🍣</span>
          <small>Something good is nearby.</small>
        </div>
        <p className="eat-source-note">
          Real places. No accounts. Just the two of you and a good meal.
        </p>
      </div>
      <div className="eat-question-panel">
        <div className="eat-step-row">
          <span>STEP {step + 1} OF 4</span>
          {onCancel && (
            <button className="eat-text-button" onClick={onCancel}>
              Back to results
            </button>
          )}
        </div>
        <div className="eat-progress" aria-hidden="true">
          {titles.map((t, i) => (
            <i key={t} className={i <= step ? "active" : ""} />
          ))}
        </div>
        <h2 ref={heading} tabIndex={-1}>
          {titles[step]}
        </h2>
        {step === 0 && (
          <>
            <p>Start close to home, or explore somewhere new.</p>
            <label className="eat-field">
              US ZIP code
              <input
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="[0-9]{5}"
                maxLength={5}
                value={p.zip}
                onChange={(e) => {
                  update("zip", e.target.value.replace(/\D/g, ""));
                  setCenter(undefined);
                  setError("");
                }}
              />
            </label>
            <button
              className="eat-location-button"
              disabled={locating}
              onClick={async () => {
                setLocating(true);
                setError("");
                try {
                  setCenter(await locateDevice());
                } catch (e) {
                  setError(
                    e instanceof Error ? e.message : "Location unavailable.",
                  );
                } finally {
                  setLocating(false);
                }
              }}
            >
              {locating
                ? "Finding you…"
                : center
                  ? "✓ Using current location"
                  : "⌖ Use my current location"}
            </button>
            {center && (
              <button
                className="eat-text-button"
                onClick={() => setCenter(undefined)}
              >
                Use ZIP code instead
              </button>
            )}
            <p className="eat-hint">
              Location is requested only when you tap. ZIP codes use an
              approximate area center.
            </p>
            <fieldset>
              <legend>How far should we look?</legend>
              <div className="eat-options radius">
                {[2, 5, 10, 15, 25].map((r) => (
                  <button
                    key={r}
                    aria-pressed={p.radius === r}
                    onClick={() => update("radius", r)}
                  >
                    {r}
                    <small>miles</small>
                  </button>
                ))}
              </div>
            </fieldset>
            <p className="eat-hint">Larger areas may take longer to search.</p>
          </>
        )}
        {step === 1 && (
          <>
            <p>Pick a craving. Or a few. We’re flexible.</p>
            <button
              className="eat-anything"
              aria-pressed={!p.cuisines.length}
              onClick={() => update("cuisines", [])}
            >
              <span>✨</span> Anything! <small>Let’s see what’s nearby</small>
            </button>
            <div className="eat-cuisines">
              {cuisines.map(([key, label, emoji]) => (
                <button
                  key={key}
                  aria-pressed={p.cuisines.includes(key)}
                  onClick={() => toggle("cuisines", key)}
                >
                  <span aria-hidden="true">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p>A casual dinner or a reason to celebrate?</p>
            <div className="eat-budget-options">
              {[
                ["any", "Any price", "Keep our options open"],
                ["$", "$", "Budget-friendly"],
                ["$$", "$$", "Moderate"],
                ["$$$", "$$$", "Special occasion"],
              ].map(([key, label, desc]) => (
                <button
                  key={key}
                  aria-pressed={p.budget === key}
                  onClick={() => update("budget", key as Preferences["budget"])}
                >
                  <strong>{label}</strong>
                  <span>{desc}</span>
                </button>
              ))}
            </div>
            <p className="eat-data-note">
              Prices are rarely listed in OpenStreetMap. Choosing a budget shows
              only places with a matching recorded price; it may leave very few
              results.
            </p>
          </>
        )}
        {step === 3 && (
          <>
            <p>Grab something to go, or make a night of it.</p>
            <div className="eat-options">
              {[
                ["either", "🍽️", "Either"],
                ["dine-in", "🪑", "Dine-in"],
                ["takeout", "🥡", "Takeout"],
              ].map(([key, emoji, label]) => (
                <button
                  key={key}
                  aria-pressed={p.mode === key}
                  onClick={() => update("mode", key as Preferences["mode"])}
                >
                  <span aria-hidden="true">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
            <p className="eat-hint">
              Dine-in and takeout choices require explicit service information.
              “Either” includes places with missing information.
            </p>
            <details className="eat-extras">
              <summary>
                A few extra preferences <span>optional</span>
              </summary>
              <label className="eat-check">
                <input
                  type="checkbox"
                  checked={p.openNow}
                  onChange={(e) => update("openNow", e.target.checked)}
                />{" "}
                Open now{" "}
                <small>Only places with interpretable listed hours</small>
              </label>
              <fieldset>
                <legend>Meal style</legend>
                <div className="eat-options">
                  {[
                    ["any", "Either"],
                    ["quick", "Quick bite"],
                    ["full", "Full meal"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      aria-pressed={p.meal === key}
                      onClick={() => update("meal", key as Preferences["meal"])}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="eat-hint">
                  Quick bite uses fast-food listings; full meal uses restaurant
                  listings. Wait times are unknown.
                </p>
              </fieldset>
              <fieldset>
                <legend>Skip these cuisines</legend>
                <div className="eat-excluded">
                  {cuisines.map(([key, label]) => (
                    <button
                      key={key}
                      aria-pressed={p.excluded.includes(key)}
                      onClick={() => toggle("excluded", key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="eat-hint">
                  Places without cuisine tags may still appear.
                </p>
              </fieldset>
              <label className="eat-check">
                <input
                  type="checkbox"
                  checked={p.random}
                  onChange={(e) => update("random", e.target.checked)}
                />{" "}
                Start with a random surprise
              </label>
            </details>
          </>
        )}
        {error && (
          <p className="eat-error" role="alert">
            {error}
          </p>
        )}
        <div className="eat-question-actions">
          {step > 0 && (
            <button
              className="eat-secondary"
              onClick={() => {
                setError("");
                setStep(step - 1);
              }}
            >
              Back
            </button>
          )}
          <button
            className="eat-primary"
            disabled={locating}
            onClick={() => {
              if (step === 0 && !center && !/^\d{5}$/.test(p.zip)) {
                setError("Enter a five-digit US ZIP code.");
                return;
              }
              setError("");
              if (step < 3) setStep(step + 1);
              else onSearch(p, center);
            }}
          >
            {step === 3 ? "Find our next meal" : "Continue"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="eat-hint eat-bottom-note">
          Your preferences stay on this device.
        </p>
      </div>
    </section>
  );
}
