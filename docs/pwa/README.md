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
  `React.lazy` and `Suspense`. The other apps already have separate HTML entries.
  Project preview images and the below-the-fold About photo use native lazy
  loading. Browser viewport heuristics determine exactly when images download.
- Visited projects save their own HTML and eager dependency graph, including a
  direct first visit before the new worker has control. Requested static files
  are eligible for runtime caching. Unvisited projects show an offline recovery
  screen, and failed lazy imports offer a return to the portfolio.
- Runtime Cache Storage is bounded to **64 entries / 12 MiB**, with **2 MiB per
  file**. The oldest stored entries are evicted first. Shell files are separate
  and pinned. Actual decoded body sizes enforce the byte budget; this is not a
  bound on all browser storage, HTTP cache, IndexedDB, or the separately installed
  learning app. Large images can display online without being retained offline.
- Only known same-origin build files are cached. External fonts, images, map
  tiles, remote APIs, requests with query strings or Range headers, redirects,
  errors, and responses marked `private`/`no-store` are not added to the runtime
  cache. APIs and restaurant searches still need an internet connection.
- The footer's **Install & offline storage** control shows runtime storage use
  and clears downloaded project files. It retains the home shell, preferences,
  and Little Wonders. Further requests/visits can save files again. Browser
  eviction and partial caches mean visiting a project does not guarantee every
  screen or image will be available offline.

The root worker ignores `/learn/` and requests from learning-app clients. Little
Wonders keeps `/learn/sw.js`, its own manifest, and full offline media cache.
Overlapping same-origin apps share browser storage quotas; installing an icon
does not download or reserve the entire portfolio. Shared files may exist in both
workers' caches when each app needs them independently.

## Builds and updates

`pnpm --filter portfolio build` generates the learning worker first, then the
portfolio worker from Vite's output manifest. `dist/.vite/pwa.json` records the
shell, entry graphs, sizes, and limits for verification. The shell size is printed
at build time. Any changed static output or worker policy changes the cache
version. Keep `tools/pwa/build-pwa.mjs`'s entry/route table in sync with new apps.

Registration is production-only, uses `updateViaCache: 'none'`, and fails without
preventing the site from rendering. Workers do not force `skipWaiting`. Close all
portfolio windows/tabs and reopen to activate an installed update. Activation
removes only older `sean-portfolio-*` caches. Cached HTML and assets are served
cache-first to retain a coherent visited version; new deployments appear after
worker activation. Do not change the worker URL to add a version number.

## Adding mobile push later

The root worker already handles `push` and `notificationclick`. This PR never asks
for notification permission and creates no subscriptions. Reuse the root worker
for a project that belongs to the installed portfolio. Do not register a competing
root worker. A separately installed project with its own worker will need its own
push handling and subscriptions instead.

1. Add the project's route/entry and a user-facing **Enable notifications** button.
   Detect `serviceWorker`, `PushManager`, and `Notification`. For iOS/iPadOS,
   explain how to install/open the Home Screen app first (Web Push is supported
   starting with iOS/iPadOS 16.4). Test on physical devices; Chromium's iPhone
   viewport emulation does not validate Safari or real notification delivery.
2. From that explicit button action, request `Notification.requestPermission()`.
   Handle denied, unsupported and already-subscribed states. Read the existing
   root registration with `navigator.serviceWorker.getRegistration('/')`.
3. Subscribe using `registration.pushManager.subscribe({ userVisibleOnly: true,
   applicationServerKey: /* public VAPID key as Uint8Array */ })`. Send the
   subscription to an authenticated backend over HTTPS. Never put the VAPID
   private key or service-account secrets in Vite/client code.
4. The backend stores each subscription, associates user/project preferences,
   sends standards-based Web Push, and deletes expired endpoints on 404/410.
   GitHub Pages is static hosting: use a separate server/serverless service to
   schedule/send notifications. A phone may receive pushes with the app closed;
   delivery timing is controlled by the browser/OS, not an exact alarm clock.
5. Add unsubscribe/preferences and remove the backend subscription on opt-out.
   Reconcile `getSubscription()` when opening the app after permission changes.

Payload contract:

```json
{
  "title": "Your project update",
  "body": "A short message",
  "url": "/your-project/#/updates",
  "tag": "project-update"
}
```

Titles/bodies are bounded strings, notification icons are local, and click URLs
are constrained to this origin. An exact existing destination is focused;
otherwise the destination opens in a window. Invalid payloads show a generic
notification and external URLs fall back to `/`.

References:
- [WebKit: Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- [MDN: PushManager.subscribe](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)
- [MDN: Service worker lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

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
limits, cache cleanup, and worker coexistence. Unit tests exercise byte/entry eviction, oversized/private response exclusions,
storage failures, push rendering, malformed payloads, same-origin click validation,
and focusing an existing window.
Real iPhone/Android installation, permission and end-to-end push delivery remain
manual checks for the future notification project.
