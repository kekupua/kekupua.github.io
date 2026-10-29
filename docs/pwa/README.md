# Portfolio PWA

Install the portfolio from `https://seanteramae.com/`. Its stable manifest ID,
start URL and scope are `/`. iPhone users use Safari → Share → Add to Home
Screen; Android users use the browser's install menu. Existing 192px/512px icons
are reused. Local development does not register a worker; test a production build.

## Downloads and storage

- The root worker at `/sw.js` installs only the home HTML, its **eager** JS/CSS
  graph, manifest, icons, and a small offline fallback. It does not follow Vite's
  `dynamicImports`, download other projects, or precache the photo library.
- React project routes (recipes, recipe details, meal prep, Hearthstone) use
  `React.lazy` and `Suspense`. Little Wonders, restaurants, Maple, and mortgage
  already have separate HTML entries and download when opened.
  Project preview images and the below-the-fold About photo use native lazy
  loading. Browser viewport heuristics determine exactly when images download.
- Visited projects save their own HTML and eager dependency graph, including a
  direct first visit before the new worker has control. Requested static files
  are eligible for runtime caching. Unvisited projects show an offline recovery
  screen, and failed lazy imports offer a return to the portfolio.
- Runtime Cache Storage is bounded to **64 entries / 12 MiB**, with **2 MiB per
  file**. The oldest stored entries are evicted first. Shell files are separate
  and pinned. Actual decoded body sizes enforce the byte budget; this is not a
  bound on all browser storage, HTTP cache, or IndexedDB. **Every project,
  including Little Wonders, shares this single runtime budget**; it is not 12 MiB
  per project. Large images can display online without being retained offline.
- Only known same-origin build files are cached. External fonts, images, map
  tiles, remote APIs, requests with query strings, redirects,
  errors, and responses marked `private`/`no-store` are not added to the runtime
  cache. Small known build assets requested with byte ranges are downloaded in
  full on demand and cached within the same limits; only the requested range is
  returned. Partial responses and large range downloads are never cached. APIs
  and restaurant searches still need an internet connection.
- The footer's **Install & offline storage** control shows runtime storage use
  and clears downloaded project files. It retains the home shell and saved
  preferences. **All project downloads, including
  Little Wonders, are cleared**. Further requests/visits can save files again.
  Browser eviction and partial caches mean visiting a project does not guarantee every
  screen or image will be available offline.

All project entries register `/sw.js` with scope `/` and link to the same root
manifest. Little Wonders no longer installs a separate full-media cache. Only its
visited entry graph and requested pictures/sounds are saved, so unvisited media
may need a connection even after opening the app. Its footer describes this
best-effort behavior instead of promising complete offline readiness.

Existing installs migrate by unregistering only the former `/learn/sw.js`
registration and deleting `little-wonders-*` caches. The old worker URL serves a
retirement worker so old cached versions can escape on their normal update check.
Close old learning windows and reopen online to complete that transition. The
legacy manifest/icons remain available for existing Home Screen shortcuts; new
installations use the portfolio's manifest. Unrelated workers/caches and user
preferences are retained.

## Builds and updates

`pnpm --filter portfolio build` generates the shared portfolio worker from Vite's
output manifest. `dist/.vite/pwa.json` records the shell, entry graphs, sizes, and limits for verification. The shell size is printed
at build time. Any changed static output or worker policy changes the cache
version. Keep `tools/pwa/build-pwa.mjs`'s entry/route table in sync with new apps.

Registration is production-only, uses `updateViaCache: 'none'`, and fails without
preventing the site from rendering. Workers do not force `skipWaiting`. Close all
portfolio windows/tabs and reopen to activate an installed update. Activation
removes older `sean-portfolio-*` caches and the retired `little-wonders-*` caches.
Cached HTML and assets are served cache-first to retain a coherent visited version; new deployments appear after
worker activation. Do not change the worker URL to add a version number.

## Validation

```sh
pnpm typecheck
pnpm --filter portfolio build
pnpm --filter portfolio exec playwright install chromium
pnpm --filter portfolio test:pwa:unit
pnpm --filter portfolio test:pwa
pnpm --filter portfolio test:learn
```

Browser tests cover the exact initial shell, absence of eager project downloads,
offline root/hash/first-visit app reloads, unvisited project recovery, runtime
limits, shared learning storage, clearing, and legacy cache cleanup. Unit tests
exercise byte/entry eviction, oversized/private response exclusions, storage
failures, bounded media range handling, and retirement of the legacy worker.
Real iPhone/Android installation and Safari audio playback remain device checks.
