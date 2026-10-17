import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  House,
  Leaf,
  Printer,
  RotateCcw,
  Bookmark,
  X,
} from "lucide-react";
import {
  calculate,
  defaults,
  limits,
  money,
  validate,
  type Inputs,
} from "./calculator";

type Draft = Record<Exclude<keyof Inputs, "downMode">, string> & {
  downMode: Inputs["downMode"];
};
const storageKey = "room-to-grow:v1";
const toDraft = (input: Inputs) =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, String(value)]),
  ) as Draft;
const toInputs = (draft: Draft): Inputs =>
  Object.fromEntries(
    Object.entries(draft).map(([key, value]) => [
      key,
      key === "downMode" ? value : value.trim() === "" ? NaN : Number(value),
    ]),
  ) as Inputs;
function initialDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (
      saved &&
      Object.keys(defaults).every(
        (key) => typeof saved[key] === typeof defaults[key as keyof Inputs],
      ) &&
      !Object.keys(validate(saved)).length
    )
      return toDraft(saved);
  } catch {
    /* Storage is optional; private browsing still works. */
  }
  return toDraft(defaults);
}

type FieldProps = {
  name: Exclude<keyof Inputs, "downMode">;
  label: string;
  unit: string;
  draft: Draft;
  set: (key: keyof Draft, value: string) => void;
  error?: string;
  hint?: string;
  step?: string;
};
function Field({
  name,
  label,
  unit,
  draft,
  set,
  error,
  hint,
  step = "any",
}: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className={`input-wrap ${error ? "invalid" : ""}`}>
        {unit === "$" && <span aria-hidden="true">$</span>}
        <input
          id={name}
          type="number"
          inputMode="decimal"
          min="0"
          max={
            name === "down" && draft.downMode === "percent" ? 100 : limits[name]
          }
          step={step}
          value={draft[name]}
          onChange={(e) => set(name, e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${name}-hint` : undefined}
        />
        {unit !== "$" && <span aria-hidden="true">{unit}</span>}
      </div>
      {(error || hint) && (
        <small id={`${name}-hint`} className={error ? "error" : ""}>
          {error || hint}
        </small>
      )}
    </div>
  );
}
function Row({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="cost-row">
      <span>
        {color && <i style={{ background: color }} />}
        {label}
      </span>
      <strong>{money(value)}</strong>
    </div>
  );
}

export function MortgageApp() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [saved, setSaved] = useState<Inputs | null>(null);
  const [notice, setNotice] = useState("");
  const [storageAvailable, setStorageAvailable] = useState(true);
  const input = toInputs(draft);
  const errors = validate(input);
  const valid = Object.keys(errors).length === 0;
  const result = valid ? calculate(input) : null;
  const comparison = saved ? calculate(saved) : null;
  useEffect(() => {
    const parsed = toInputs(draft);
    if (!Object.keys(validate(parsed)).length) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(parsed));
      } catch {
        setStorageAvailable(false);
      }
    }
  }, [draft]);
  const set = (key: keyof Draft, value: string) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setNotice("");
  };
  const changeDownMode = (mode: Inputs["downMode"]) => {
    if (draft.downMode === mode) return;
    if (
      !Number.isFinite(input.down) ||
      !Number.isFinite(input.price) ||
      input.price <= 0
    ) {
      set("downMode", mode);
      return;
    }
    const value =
      mode === "dollars"
        ? (input.price * input.down) / 100
        : (input.down / input.price) * 100;
    setDraft((previous) => ({
      ...previous,
      downMode: mode,
      down: String(Number(value.toFixed(6))),
    }));
  };
  const field = (
    name: FieldProps["name"],
    label: string,
    unit: string,
    hint?: string,
  ) => (
    <Field
      name={name}
      label={label}
      unit={unit}
      hint={hint}
      draft={draft}
      set={set}
      error={errors[name]}
    />
  );
  const segments = result
    ? [
        {
          label: "Principal & interest",
          value: result.principalInterest,
          color: "#476b57",
        },
        { label: "Property taxes", value: result.tax, color: "#9eaf8b" },
        { label: "Home insurance", value: result.insurance, color: "#d7b67e" },
        { label: "HOA dues", value: input.hoa, color: "#b7826d" },
        {
          label: "Mortgage insurance (PMI)",
          value: result.pmi,
          color: "#8a96a5",
        },
      ]
    : [];
  return (
    <div className="mortgage-app">
      <a className="skip-link" href="#home-details">
        Skip to calculator
      </a>
      <header className="topbar">
        <a className="brand" href="/mortgage/" aria-label="Room to Grow home">
          <span className="brand-icon">
            <House size={21} strokeWidth={1.7} />
          </span>
          room to grow<span className="brand-dot">.</span>
        </a>
        <a className="portfolio-link" href="/#projects">
          <ArrowLeft size={15} /> Sean’s portfolio
        </a>
      </header>
      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> A LITTLE CLARITY FOR A BIG CHAPTER
            </div>
            <h1 id="page-title">
              A home for your life.
              <br />
              <em>A plan for your peace of mind.</em>
            </h1>
            <p>
              Look beyond the listing price. Find the monthly costs and upfront
              cash that fit your next chapter, together.
            </p>
            <div className="hero-note">
              <Leaf size={15} /> A mortgage calculator with the whole picture.
            </div>
          </div>
          <img
            className="home-art"
            src="/images/mortgage-home.svg"
            alt="A welcoming home among trees, with a couple and their dog outside"
            width="640"
            height="360"
          />
        </section>
        {result && (
          <a href="#estimate" className="mobile-preview">
            <span>
              Monthly housing cost
              <strong>
                {money(result.monthly)}
                <small>/mo</small>
              </strong>
            </span>
            <span className="preview-arrow">
              See breakdown <ArrowDown size={16} />
            </span>
          </a>
        )}
        <div className="calculator-grid">
          <section
            className="input-panel panel"
            id="home-details"
            aria-labelledby="details-title"
          >
            <div className="section-heading">
              <span className="step">01</span>
              <div>
                <h2 id="details-title">Start with your home</h2>
                <p>A few numbers. A clearer picture.</p>
              </div>
              <House className="heading-icon" size={21} />
            </div>
            <div className="inputs-body">
              {field("price", "Home price", "$")}
              <div className="down-label">
                <span>Down payment</span>
                <div
                  className="unit-toggle"
                  role="group"
                  aria-label="Down payment unit"
                >
                  <button
                    type="button"
                    aria-pressed={draft.downMode === "percent"}
                    onClick={() => changeDownMode("percent")}
                  >
                    %
                  </button>
                  <button
                    type="button"
                    aria-pressed={draft.downMode === "dollars"}
                    onClick={() => changeDownMode("dollars")}
                  >
                    $
                  </button>
                </div>
              </div>
              <div className="down-field">
                {field(
                  "down",
                  `Down payment (${draft.downMode === "percent" ? "percent" : "dollars"})`,
                  draft.downMode === "percent" ? "%" : "$",
                  result
                    ? `${draft.downMode === "percent" ? money(result.downPayment) : `${result.downPercent.toFixed(2)}%`} down · ${money(result.loan)} to borrow`
                    : undefined,
                )}
              </div>
              <div
                className="quick-options"
                role="group"
                aria-label="Down payment presets"
              >
                {[3, 5, 10, 20].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    aria-pressed={
                      !!result &&
                      Math.abs(result.downPercent - percent) < 0.00001
                    }
                    onClick={() =>
                      setDraft((previous) => ({
                        ...previous,
                        downMode: "percent",
                        down: String(percent),
                      }))
                    }
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <div className="field-grid">
                {field("rate", "Interest rate", "%", "Annual rate, not APR.")}
                <div className="field">
                  <label htmlFor="years">Loan term</label>
                  <div className="select-wrap">
                    <select
                      id="years"
                      value={draft.years}
                      onChange={(e) => set("years", e.target.value)}
                    >
                      {[30, 20, 15, 10, 40].map((year) => (
                        <option value={year} key={year}>
                          {year} years
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                  <small>Fixed-rate mortgage</small>
                </div>
              </div>
              <p className="soft-note">
                <Leaf size={15} /> These are example assumptions. Use your
                lender’s rate and local costs for a closer estimate.
              </p>
            </div>
            <details className="expense-details" open>
              <summary>
                <span>
                  <span className="step">02</span> The everyday costs
                </span>
                <ChevronDown size={18} />
              </summary>
              <div className="details-content">
                <p className="section-description">
                  The little things that make the full monthly picture.
                </p>
                <div className="field-grid">
                  {field(
                    "tax",
                    "Property tax / year",
                    "%",
                    "Percent of the home price.",
                  )}
                  {field("insurance", "Home insurance / year", "$")}
                  {field("hoa", "HOA dues / month", "$")}
                  {field(
                    "pmi",
                    "PMI rate / year",
                    "%",
                    "Percent of the original loan; included below 20% down.",
                  )}
                </div>
                <div className="reserve-field">
                  {field(
                    "maintenance",
                    "Maintenance reserve / year",
                    "%",
                    "Percent of home price. Savings for repairs, separate from your housing payment.",
                  )}
                </div>
              </div>
            </details>
            <details className="expense-details">
              <summary>
                <span>
                  <span className="step">03</span> Getting the keys
                </span>
                <ChevronDown size={18} />
              </summary>
              <div className="details-content">
                <p className="section-description">
                  Plan for cash upfront, beyond your down payment.
                </p>
                <div className="field-grid">
                  {field(
                    "closing",
                    "Closing fees",
                    "%",
                    "Percent of price. Excludes prepaids below.",
                  )}
                  {field(
                    "prepaid",
                    "Prepaids & initial escrow",
                    "$",
                    "Upfront taxes, insurance, and prepaid interest.",
                  )}
                </div>
                {field(
                  "deposit",
                  "Earnest money already paid",
                  "$",
                  "Subtracts your deposit from remaining cash to close.",
                )}
                {result && input.deposit > result.upfront && (
                  <p className="error">
                    Your deposit exceeds estimated upfront costs. Cash to close
                    is shown as $0; confirm any refund with your lender.
                  </p>
                )}
              </div>
            </details>
            <div className="form-footer">
              <span>
                {storageAvailable
                  ? "Your inputs stay in this browser."
                  : "Browser storage is unavailable; inputs last for this visit."}
              </span>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setDraft(toDraft(defaults));
                  setSaved(null);
                  setNotice("Example values restored.");
                }}
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </section>
          <aside
            className="results-column"
            id="estimate"
            aria-label="Your home cost estimate"
          >
            {result ? (
              <>
                <section className="estimate-card panel">
                  <div className="estimate-top">
                    <div className="eyebrow">YOUR NEXT CHAPTER, IN NUMBERS</div>
                    <span className="estimate-badge">
                      <span /> Live estimate
                    </span>
                  </div>
                  <h2>Estimated monthly housing cost</h2>
                  <div className="monthly-total">
                    <span>{money(result.monthly)}</span>
                    <small>/ month</small>
                  </div>
                  <p className="result-subtitle">
                    A little more certainty before you get the keys.
                  </p>
                  <div className="cost-bar" aria-hidden="true">
                    {segments
                      .filter((s) => s.value > 0)
                      .map((s) => (
                        <span
                          key={s.label}
                          style={{ background: s.color, flex: s.value }}
                        />
                      ))}
                  </div>
                  <div className="breakdown">
                    {segments.map((s) => (
                      <Row key={s.label} {...s} />
                    ))}
                  </div>
                  <div className="budget-box">
                    <Row
                      label="Set aside for maintenance"
                      value={result.maintenance}
                    />
                    <div className="budget-total">
                      <span>Monthly budget with reserve</span>
                      <strong>{money(result.budget)}</strong>
                    </div>
                  </div>
                  <p className="estimate-footnote">
                    Initial monthly estimate. Taxes, insurance, and dues can
                    change. Utilities are not included. PMI cancellation is not
                    projected.
                  </p>
                </section>
                <section className="cash-card panel">
                  <div className="cash-heading">
                    <span className="cash-icon">
                      <House size={21} />
                    </span>
                    <div>
                      <h2>Ready for the keys</h2>
                      <p>Estimated cash still needed at closing</p>
                    </div>
                  </div>
                  <div className="cash-total">{money(result.cashToClose)}</div>
                  <Row label="Down payment" value={result.downPayment} />
                  <Row label="Closing fees" value={result.closingFees} />
                  <Row
                    label="Prepaids & initial escrow"
                    value={input.prepaid}
                  />
                  <Row
                    label="Earnest money already paid"
                    value={-input.deposit}
                  />
                  <p>Keep moving costs and an emergency cushion separate.</p>
                </section>
                <div className="result-actions">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => {
                      setSaved({ ...input });
                      setNotice(
                        "Scenario saved for comparison. Change any number to compare.",
                      );
                    }}
                  >
                    <Bookmark size={17} />{" "}
                    {saved ? "Replace saved scenario" : "Save to compare"}
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="Print estimate"
                    onClick={() => window.print()}
                  >
                    <Printer size={19} />
                  </button>
                </div>
                <p className="compare-hint">
                  Save this scenario, then explore another price or rate.
                </p>
              </>
            ) : (
              <section className="panel invalid-result" role="status">
                <House size={30} />
                <h2>Let’s check those numbers</h2>
                <p>Update the highlighted fields to see your estimate.</p>
                <a href="#home-details">
                  Back to home details <ArrowRight size={16} />
                </a>
              </section>
            )}
            <p className="status-message" role="status">
              {notice && (
                <>
                  <Check size={15} /> {notice}
                </>
              )}
            </p>
          </aside>
        </div>
        {saved && comparison && (
          <section
            className="comparison panel"
            aria-labelledby="comparison-title"
          >
            <div className="section-heading">
              <div>
                <div className="eyebrow">MAKE SPACE FOR POSSIBILITIES</div>
                <h2 id="comparison-title">Two paths to home</h2>
              </div>
              <button
                className="icon-button"
                aria-label="Remove saved scenario"
                onClick={() => setSaved(null)}
              >
                <X size={19} />
              </button>
            </div>
            <div
              className="comparison-scroll"
              tabIndex={0}
              role="region"
              aria-label="Compare mortgage scenarios"
            >
              <table>
                <caption className="sr-only">
                  Saved scenario and current estimate comparison
                </caption>
                <thead>
                  <tr>
                    <th scope="col">At a glance</th>
                    <th scope="col">Saved scenario</th>
                    <th scope="col">Your current plan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Home price",
                      money(saved.price),
                      valid ? money(input.price) : "—",
                    ],
                    [
                      "Down payment",
                      money(comparison.downPayment),
                      result ? money(result.downPayment) : "—",
                    ],
                    [
                      "Rate / term",
                      `${saved.rate}% / ${saved.years} years`,
                      valid ? `${input.rate}% / ${input.years} years` : "—",
                    ],
                    [
                      "Monthly housing",
                      money(comparison.monthly),
                      result ? money(result.monthly) : "—",
                    ],
                    [
                      "With maintenance reserve",
                      money(comparison.budget),
                      result ? money(result.budget) : "—",
                    ],
                    [
                      "Cash to close",
                      money(comparison.cashToClose),
                      result ? money(result.cashToClose) : "—",
                    ],
                    [
                      "Lifetime loan interest",
                      money(comparison.totalInterest),
                      result ? money(result.totalInterest) : "—",
                    ],
                  ].map(([label, a, b]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{a}</td>
                      <td>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result && (
              <p className="comparison-note">
                Your current plan is{" "}
                <strong>
                  {money(Math.abs(result.monthly - comparison.monthly))}{" "}
                  {result.monthly >= comparison.monthly ? "more" : "less"} per
                  month
                </strong>{" "}
                in housing costs. Saved comparisons last for this visit.
              </p>
            )}
          </section>
        )}
        {result && (
          <section
            className="long-view panel"
            aria-labelledby="long-view-title"
          >
            <div className="long-view-intro">
              <div>
                <div className="eyebrow">THE LONG VIEW</div>
                <h2 id="long-view-title">
                  Little by little, more of it is yours.
                </h2>
                <p>
                  Your loan balance over {input.years} years of scheduled
                  payments.
                </p>
              </div>
              <div className="interest-stat">
                <span>Total loan interest</span>
                <strong>{money(result.totalInterest)}</strong>
              </div>
            </div>
            <div
              className="balance-chart"
              role="img"
              aria-label={`Loan balance starts at ${money(result.loan)} and reaches zero after ${input.years} years. See annual table below for values.`}
            >
              <div className="chart-axis">
                <span>{money(result.loan)}</span>
                <span>$0</span>
              </div>
              <div className="chart-area">
                <svg
                  viewBox="0 0 800 120"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    x2="800"
                    y1="1"
                    y2="1"
                    stroke="#dde2d5"
                    strokeDasharray="5 5"
                  />
                  <path
                    d={`M0,${result.loan ? 1 : 120} ${result.schedule.map((row) => `L${(row.year / input.years) * 800},${result.loan ? 120 - (row.balance / result.loan) * 119 : 120}`).join(" ")} L800,120 L0,120 Z`}
                    fill="#e5ebdd"
                  />
                  <path
                    d={`M0,${result.loan ? 1 : 120} ${result.schedule.map((row) => `L${(row.year / input.years) * 800},${result.loan ? 120 - (row.balance / result.loan) * 119 : 120}`).join(" ")}`}
                    stroke="#56755c"
                    strokeWidth="3"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="chart-years">
                  <span>Today</span>
                  <span>Year {Math.round(input.years / 2)}</span>
                  <span>Year {input.years}</span>
                </div>
              </div>
            </div>
            <details className="schedule-details">
              <summary>
                See the year-by-year breakdown <ChevronDown size={17} />
              </summary>
              <div
                className="schedule-scroll"
                tabIndex={0}
                role="region"
                aria-label="Annual loan amortization"
              >
                <table>
                  <caption>
                    Scheduled loan payments only; excludes taxes, insurance,
                    HOA, PMI, and reserves.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Year</th>
                      <th scope="col">Principal paid</th>
                      <th scope="col">Interest paid</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.year}>
                        <th scope="row">{row.year}</th>
                        <td>{money(row.principal)}</td>
                        <td>{money(row.interest)}</td>
                        <td>{money(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </section>
        )}
        <section className="fine-print">
          <Heart size={19} />
          <div>
            <h2>A starting point for a thoughtful decision.</h2>
            <p>
              This estimates a US conventional, fixed-rate mortgage. Example
              values are not offers, live rates, or local tax quotes. PMI is an
              editable initial estimate when down payment is below 20%; actual
              requirements and cancellation vary. FHA, VA, USDA, adjustable-rate
              loans, points, credits, and tax deductions are not modeled.
              Confirm figures with your lender’s Loan Estimate.
            </p>
            <a
              href="https://www.consumerfinance.gov/owning-a-home/loan-estimate/"
              target="_blank"
              rel="noreferrer"
            >
              Understand your Loan Estimate at the CFPB <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <footer className="page-footer">
        <span>
          room to grow. <span className="footer-divider">/</span> Made for your
          next chapter.
        </span>
        <a href="/#projects">
          A project by Sean Teramae <ArrowUpRight />
        </a>
      </footer>
    </div>
  );
}
function ArrowUpRight() {
  return <ArrowRight size={14} style={{ transform: "rotate(-45deg)" }} />;
}
