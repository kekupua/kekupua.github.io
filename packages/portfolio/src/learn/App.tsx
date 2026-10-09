import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Art } from "./Art";
import { playAudio, setMuted, stopAudio } from "./audio";
import { activityNames, categories, choicesFor, content } from "./content";
import type { Category, Item } from "./content";

export function Icon({
  name,
}: {
  name: "home" | "speaker" | "back" | "next" | "mute";
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "home" ? (
        <>
          <path d="M4 15 L16 4 L28 15 M8 13 V28 H24 V13" />
          <path d="M13 28 V19 H19 V28" />
        </>
      ) : name === "back" ? (
        <path d="M20 6 L10 16 L20 26" />
      ) : name === "next" ? (
        <path d="M12 6 L22 16 L12 26" />
      ) : (
        <>
          <path d="M4 12 H10 L18 5 V27 L10 20 H4 Z" />
          {name === "mute" ? (
            <path d="M23 12 L29 20 M29 12 L23 20" />
          ) : (
            <>
              <path d="M23 11 Q29 16 23 21 M27 6 Q37 16 27 26" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
function AudioControl({
  onReplay,
  muted,
  onMute,
}: {
  onReplay: () => void;
  muted: boolean;
  onMute: () => void;
}) {
  return (
    <div className="audio-controls">
      <button
        className="icon-button speaker"
        onClick={onReplay}
        aria-label="Hear again"
        disabled={muted}
      >
        <Icon name="speaker" />
      </button>
      <button
        className="icon-button mute"
        onClick={onMute}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={muted}
      >
        <Icon name={muted ? "mute" : "speaker"} />
      </button>
    </div>
  );
}
export function Celebration({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) {
  return (
    <div
      className={`feedback ${success ? "success" : ""}`}
      role="status"
      aria-live="polite"
    >
      {success && (
        <span className="celebration-stars" aria-hidden="true">
          ✦ <span>★</span> ✦
        </span>
      )}
      <span>{message}</span>
    </div>
  );
}
function LearningCard({
  item,
  category,
  onClick,
  selected,
  disabled = false,
}: {
  item: Item;
  category: Category;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`learning-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={category === "letters" ? `Letter ${item.letter}` : item.name}
    >
      {category === "letters" ? (
        <span className="big-letter">{item.letter}</span>
      ) : (
        <Art kind={item.art} color={item.color} />
      )}
      <span className="card-label">
        {category === "letters" ? item.letter : item.name}
      </span>
      {selected && (
        <span className="correct-mark" aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
}
function ActivityTile({
  category,
  onClick,
}: {
  category: (typeof categories)[number];
  onClick: () => void;
}) {
  return (
    <button className={`activity-tile ${category.id}`} onClick={onClick}>
      <span className="tile-title">{category.title}</span>
      <Art kind={category.art} />
      <span className="tile-action" aria-hidden="true">
        <Icon name="next" />
      </span>
    </button>
  );
}
export function LearnApp() {
  const navigate = useNavigate();
  const { category: rawCategory, mode } = useParams();
  const category = categories.find((c) => c.id === rawCategory)?.id;
  const activity = mode === "explore" || mode === "find" ? mode : undefined;
  const [muted, updateMuted] = useState(false);
  const [exploreIndex, setIndex] = useState(0);
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState("");
  const [offline, setOffline] = useState(false);
  const [cacheError, setCacheError] = useState(false);
  const speak = (id: string) =>
    playAudio(id, () => setMessage("Tap the speaker to try sound again."));
  useEffect(() => {
    window.addEventListener("popstate", stopAudio);
    return () => {
      stopAudio();
      window.removeEventListener("popstate", stopAudio);
    };
  }, []);
  useEffect(() => {
    let active = true;
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register("/learn/sw.js", { scope: "/learn/" })
        .then(() => navigator.serviceWorker.ready)
        .then(() => {
          if (active) setOffline(true);
        })
        .catch(() => {
          if (active) setCacheError(true);
        });
    }
    return () => {
      active = false;
    };
  }, []);
  // Hash deep links and browser back always start a fresh, predictable activity.
  useEffect(() => {
    setIndex(0);
    setRound(0);
    setCorrect(false);
    setMessage("");
  }, [category, activity]);
  const items = category ? content[category] : [];
  const index = Math.min(exploreIndex, Math.max(0, items.length - 1));
  const item = items[index];
  const question = category ? choicesFor(items, round) : undefined;
  const prompt = !category
    ? "welcome"
    : !activity
      ? `${category}-menu`
      : activity === "find"
        ? `find-${category}-${question!.answer.id}`
        : `explore-${category}-${item.id}`;
  function go(path: string) {
    stopAudio();
    setMessage("");
    navigate(path);
    const [, nextCategory, nextMode] = path.split("/");
    if (!nextCategory) speak("welcome");
    else if (!nextMode) speak(`${nextCategory}-menu`);
    else {
      const nextItems = content[nextCategory as Category];
      speak(
        `${nextMode === "find" ? "find" : "explore"}-${nextCategory}-${nextItems[0].id}`,
      );
    }
  }
  function select(id: string) {
    if (!question || correct) return;
    if (id === question.answer.id) {
      setCorrect(true);
      setMessage("You found it!");
      speak("hooray");
    } else {
      setMessage("Let’s try again!");
      speak(`retry-${category}-${question.answer.id}`);
    }
  }
  function nextRound() {
    setCorrect(false);
    setMessage("");
    setRound(round + 1);
    speak(`find-${category}-${choicesFor(items, round + 1).answer.id}`);
  }
  return (
    <div className={`learn-app ${category || "home"}`}>
      <header className="learn-header">
        <button
          className="icon-button home-button"
          onClick={() => go("/")}
          aria-label="Home"
        >
          <Icon name="home" />
          <span>Home</span>
        </button>
        <div className="brand">
          <span aria-hidden="true">✦</span> Little Wonders
        </div>
        <AudioControl
          muted={muted}
          onReplay={() => speak(prompt)}
          onMute={() => {
            updateMuted(!muted);
            setMuted(!muted);
            if (muted) speak(prompt);
          }}
        />
      </header>
      <main>
        {!category ? (
          <section className="home-screen">
            <div className="home-heading">
              <span className="eyebrow">
                A LITTLE PLACE FOR BIG DISCOVERIES
              </span>
              <h1>
                Let’s play & learn<span aria-hidden="true">!</span>
              </h1>
              <p>What shall we discover today?</p>
            </div>
            <div className="activity-tiles">
              {categories.map((c) => (
                <ActivityTile
                  key={c.id}
                  category={c}
                  onClick={() => go(`/${c.id}`)}
                />
              ))}
            </div>
            <div className="home-bottom">
              <Art kind="sun" />
              <p>A little curiosity. A lot of wonder.</p>
              <Art kind="rainbow" />
            </div>
          </section>
        ) : !activity ? (
          <section className="category-screen">
            <h1>{categories.find((c) => c.id === category)!.title}</h1>
            <p>Tap a picture to play</p>
            <div className="mode-tiles">
              {(["explore", "find"] as const).map((m, i) => (
                <button
                  className={`mode-tile ${m}`}
                  key={m}
                  onClick={() => go(`/${category}/${m}`)}
                >
                  <Art
                    kind={
                      m === "explore"
                        ? categories.find((c) => c.id === category)!.art
                        : "sun"
                    }
                  />
                  <span>{activityNames[category][i]}</span>
                  <small>
                    {m === "explore"
                      ? "Tap, listen & discover"
                      : "Look, listen & find"}
                  </small>
                  <Icon name="next" />
                </button>
              ))}
            </div>
          </section>
        ) : activity === "explore" ? (
          <section className="explore-screen">
            <h1>{activityNames[category][0]}</h1>
            <p>Tap to listen</p>
            <div className="explore-layout">
              <button
                className="icon-button arrow"
                aria-label="Previous"
                disabled={index === 0}
                onClick={() => {
                  setIndex(index - 1);
                  setMessage("");
                  speak(`explore-${category}-${items[index - 1].id}`);
                }}
              >
                <Icon name="back" />
              </button>
              <button
                className="explore-card"
                aria-label={
                  category === "letters"
                    ? `${item.letter} for ${item.name}`
                    : item.name
                }
                onClick={() => speak(prompt)}
              >
                {category === "letters" && (
                  <span className="giant-letter">
                    {item.letter}
                    <small>{item.letter!.toLowerCase()}</small>
                  </span>
                )}
                <Art kind={item.art} color={item.color} />
                <span className="explore-label">
                  {category === "letters"
                    ? `${item.letter} is for ${item.name}`
                    : item.name}
                </span>
              </button>
              <button
                className="icon-button arrow"
                aria-label="Next"
                disabled={index === items.length - 1}
                onClick={() => {
                  setIndex(index + 1);
                  setMessage("");
                  speak(`explore-${category}-${items[index + 1].id}`);
                }}
              >
                <Icon name="next" />
              </button>
            </div>
            <div className="explore-bottom">
              <span>
                {index + 1} / {items.length}
              </span>
              <button
                className="pill-button"
                onClick={() => go(`/${category}/find`)}
              >
                Let’s find <Icon name="next" />
              </button>
            </div>
            <Celebration success={false} message={message} />
          </section>
        ) : (
          <section className="find-screen">
            <h1>
              {category === "colors"
                ? "Find the matching color"
                : `Find ${category === "letters" ? "the letter" : "the"} ${category === "letters" ? question!.answer.letter : question!.answer.name.toLowerCase()}`}
            </h1>
            <p>Tap the speaker, then choose a picture</p>
            {category === "colors" && (
              <div
                className="color-target"
                aria-label={`Match ${question!.answer.name}`}
              >
                <Art kind="ball" color={question!.answer.color} />
                <span>{question!.answer.name}</span>
              </div>
            )}
            <div className="choice-grid">
              {question!.choices.map((choice) => (
                <LearningCard
                  key={choice.id}
                  item={choice}
                  category={category}
                  onClick={() => select(choice.id)}
                  selected={correct && choice.id === question!.answer.id}
                  disabled={correct}
                />
              ))}
            </div>
            <Celebration
              success={correct}
              message={message || "Take your time. You can try again."}
            />
            <div className="next-space">
              {correct && (
                <button className="pill-button next-round" onClick={nextRound}>
                  Next <Icon name="next" />
                </button>
              )}
            </div>
          </section>
        )}
      </main>
      {!category && (
        <footer className="learn-footer" role="status">
          {offline
            ? "✓ Ready to play offline"
            : cacheError
              ? "Offline saving unavailable. Ask a grown-up to reopen online."
              : import.meta.env.PROD
                ? "Getting ready for offline play…"
                : "Preview · offline saving starts in the production build"}
        </footer>
      )}
    </div>
  );
}
