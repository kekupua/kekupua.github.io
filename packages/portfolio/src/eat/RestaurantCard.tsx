import { cuisineLabel } from "./filter";
import type { Match, Restaurant } from "./model";
export default function RestaurantCard({
  restaurant: r,
  index,
  selected,
  saved,
  onSelect,
  onSave,
  onDismiss,
}: {
  restaurant: Match;
  index?: number;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onSave: (r: Restaurant) => void;
  onDismiss?: () => void;
}) {
  return (
    <article
      className={`eat-card ${selected ? "selected" : ""}`}
      id={`restaurant-${r.id.replace("/", "-")}`}
      data-selected={selected}
    >
      <div className="eat-card-top">
        <button
          className="eat-card-select"
          aria-label={`Show ${r.name} on map`}
          aria-pressed={selected}
          onClick={onSelect}
        >
          {index !== undefined && (
            <span className="eat-number">{index + 1}</span>
          )}
          <span>
            <h3>{r.name}</h3>
            <span className="eat-cuisine-label">{cuisineLabel(r)}</span>
          </span>
        </button>
        <button
          className="eat-save"
          aria-label={`${saved ? "Remove" : "Save"} ${r.name}${saved ? " from" : " to"} shortlist`}
          aria-pressed={saved}
          onClick={() => onSave(r)}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="eat-card-facts">
        <span>
          {r.distance.toFixed(1)} mi <small>straight-line</small>
        </span>
        <span>{r.price || "Price not listed"}</span>
        <span className={`eat-status ${r.status}`}>
          {r.status === "unknown"
            ? "Hours unknown"
            : r.status === "open"
              ? "Open · listed hours"
              : "Closed · listed hours"}
        </span>
      </div>
      <p className="eat-address">{r.address}</p>
      {r.hours && (
        <details className="eat-hours">
          <summary>Listed hours</summary>
          <p>{r.hours}</p>
          <small>
            Community data; confirm with the restaurant. Holiday exceptions may
            be missing.
          </small>
        </details>
      )}
      <div className="eat-card-actions">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${r.lat},${r.lon}`)}`}
        >
          Directions ↗
        </a>
        {r.website && (
          <a target="_blank" rel="noopener noreferrer" href={r.website}>
            Website ↗
          </a>
        )}
        {onDismiss && (
          <button onClick={onDismiss} aria-label={`Eliminate ${r.name}`}>
            Not today
          </button>
        )}
      </div>
    </article>
  );
}
