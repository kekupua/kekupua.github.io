import { useState } from "react";
import { cacheCommand } from "./register";

export function PwaControls() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function storage(clear = false) {
    setBusy(true);
    const result = await cacheCommand(
      clear ? "CLEAR_PROJECT_CACHE" : "CACHE_STATUS",
    );
    setStatus(
      result.ok
        ? clear
          ? "Downloaded project files cleared. Reopen projects online to save them again."
          : `${((result.bytes || 0) / 1024 / 1024).toFixed(1)} MB of downloaded project files saved.`
        : "Offline storage is unavailable in this browser.",
    );
    setBusy(false);
  }
  return (
    <details
      className="mt-8 text-left text-sm text-slate-300 max-w-xl mx-auto"
      onToggle={(e) => {
        if (e.currentTarget.open) void storage();
      }}
    >
      <summary className="cursor-pointer font-semibold">
        Install &amp; offline storage
      </summary>
      <div className="mt-4 space-y-3">
        <p>
          On iPhone, open this site in Safari, tap Share, then Add to Home
          Screen. On Android, choose Install app or Add to Home screen from your
          browser menu.
        </p>
        <p>
          Projects download as you open them. Saved files may be removed to free
          up space. Online services still need a connection.
        </p>
        <p>
          Clear downloaded project files below to free space. Your saved
          preferences and the portfolio home stay on this device. This also
          clears Little Wonders downloads.
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={() => void storage(true)}
          className="border border-slate-500 rounded px-3 py-2 disabled:opacity-50"
        >
          Clear downloaded project files
        </button>
        <p role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </details>
  );
}
