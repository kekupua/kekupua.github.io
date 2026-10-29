# Little Wonders

A self-contained preschool learning app at `/learn/`. `/learn` redirects to the directory URL on GitHub Pages; local Vite dev/preview mirrors that redirect. Activities use hash URLs, for example `/learn/#/animals/find`, so bookmarks and refreshes need no GitHub Pages 404 rewrite.

## Activities

| Category | Explore                                                               | Find / Match                                                           |
| -------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Letters  | All 26 uppercase/lowercase letters and illustrated objects            | Match a large visual letter target to three choices; unlimited retries |
| Animals  | Dog, cat, cow, duck, elephant, lion; real locally bundled photographs | Match a photo target to three animal photographs                       |
| Colors   | Red, blue, yellow, green, orange, purple                              | Match the target ball to one of three colored balls                    |

Correct answers get a gentle star celebration, a short chime, and an original eight-second musical reward. The child taps Next to continue; no timers, scores, negative sounds, or automatic round changes. Incorrect answers stay silent and allow unlimited retries. There is no spoken audio, animal-sound imitation, or audio replay button. The sound toggle mutes both effects and music, and music stops immediately on Next, Home, other navigation, or mute. Visual letter/photo/color targets make matching understandable without speech or reading.

The app fills the available safe-area viewport. Cards and choices grow into the available vertical space instead of leaving an empty lower half. All six activities, category menus, and the home screen fit typical phone screens, including 375×667. Large text and short landscape screens may scroll rather than clipping controls; browser zoom remains enabled.

## Local development and validation

From the repository root, using Node 20.19+ and pnpm 10:

```sh
pnpm install --frozen-lockfile
pnpm --filter portfolio dev
# Open http://localhost:3000/learn/
pnpm typecheck
pnpm --filter portfolio lint:learn
pnpm --filter portfolio build
pnpm --filter portfolio exec playwright install --with-deps chromium
pnpm --filter portfolio test:learn
```

Production/offline preview: `pnpm --filter portfolio preview --host 127.0.0.1 --port 4173`, then open `http://127.0.0.1:4173/learn/`. The service worker registers only in production builds. `LEARN_SCREENSHOTS=1 pnpm --filter portfolio test:learn` refreshes the screenshots here. `LEARN_CHROMIUM_PATH` optionally supplies an existing Chromium executable; normally Playwright uses its installed browser. PR CI runs typecheck, targeted lint, build, and browser tests without deploying.

## Installation and offline use

Little Wonders uses the same portfolio manifest and root service worker as the
other projects. On iOS Safari, use Share → Add to Home Screen; on Android, use the
browser's install menu. New installations open the portfolio, with Little Wonders
available at `/learn/`. Existing learning shortcuts and their legacy manifest/icons
remain available.

Open activities online first. Only the visited entry's eager JS/CSS and requested
pictures/sounds are cached; opening Little Wonders does not download every photo
or sound. All projects share **64 runtime entries / 12 MiB**, with **2 MiB per
file** and oldest-entry eviction. The portfolio's clear-downloads control clears
learning downloads too, while retaining preferences and the home shell. Offline
availability is best effort; the footer no longer claims the whole app is ready.
See [PWA storage and updates](../pwa/README.md) for the shared policy.

The old `/learn/sw.js` now retires its registration and `little-wonders-*` caches.
The shared registration also unregisters that exact legacy worker. Existing users
should close old learning windows and reopen online after an update. Unrelated
workers, caches, and preferences are retained.

The bundled audio consists of three short original bell effects (`navigate`, `tap`, `correct`) and a short original musical reward (`reward-music`). Music starts exclusively from a correct-answer tap, plays once at a quiet volume, and stops when moving on. The shared worker handles MP3 byte ranges for requested, retained audio. No speech synthesis or voice assets remain. There are no remote image/font/sound requests, API calls, analytics, or tracking at runtime. The separate HTML entry excludes the portfolio's footer, Google fonts, and Ionicons CDN scripts. Its content security policy limits resource requests to the same origin. The app has buttons and internal hash navigation, with no anchors, forms, embeds, or controls leading back to the portfolio.

## Content and asset authoring

- `packages/portfolio/src/learn/content.ts`: category metadata, letters/objects, animals/photo paths, colors, activity names, deterministic question choices. Each round has one correct choice and two distinct alternatives, with the answer position rotating. Keep at least four unique items in a category if extending the current choice generator.
- `Art.tsx`: original rounded SVG illustrations for letters, colors, and decorative artwork. `Visual.tsx` chooses a local photo when an item has an `image` path. Animal category tiles also use photos.
- `App.tsx`: reusable activity tiles, learning cards, audio controls, and celebration; a category can reuse explore/find without duplicating activity mechanics.
- `learn.css`: independent styles, safe area insets, 44px minimum controls, large primary targets, touch manipulation, and reduced-motion rules, and a viewport-height layout. Browser zoom remains enabled. Enlarged text and short landscape screens can scroll when necessary.
- `public/learn/animals`: six optimized real photos. See [PHOTO-CREDITS.md](PHOTO-CREDITS.md) for each source, creator, and license. They remain subject to their source licenses. Photos are downloaded and bundled, never hotlinked.
- `public/learn/audio`: four compact MP3 files, with no voice assets.
- `tools/learn/generate-sounds.py`: optional authoring tool using standard-library Python and ffmpeg. Run `pnpm --filter portfolio audio:learn` to reproduce the original bell effects and melody, then commit generated MP3s. Ordinary builds and runtime do not require Python or ffmpeg. No external music recording or copyright-dependent song is used.

Additional items need only a local SVG/art key or local photo path; there are no per-item spoken prompts to generate. Keep at least four items per category for the current three-choice generator. Sounds, melody, and SVG illustrations were created for this project under the repository's existing license. Third-party photo licensing is documented separately.

## Validation and limits

Browser coverage includes all 26 letter cards and every animal/color; action effects, success-only music, silent retries, and stopping/muting playback; exploration boundaries; repeated wrong answers, success and manual next; category/home navigation and browser history; mute; all activity layouts; minimum control sizes, viewport-height filling, no horizontal/vertical overflow at standard phone sizes; reduced motion; absence of external requests, links, forms and embeds; on-demand media caching without unvisited-photo/audio downloads; all six offline deep-link reloads; MP3 decoding and range responses; shared manifest/icons; and the existing landing, meal-prep, recipe, and Hearthstone routes using the same root worker.

Tests run in Chromium with desktop (1280×900), iPhone 13 (390×844, touch), and iPad (810×1080, touch) profiles, plus 375×667 small-phone checks. This is viewport/device emulation, not a physical Safari/iOS test. Manifest and icons were checked; real iOS/Android installation, speaker volume, and Safari behavior still need device confirmation. Effects/music start only from appropriate taps; an initial page or deep link stays silent. A device can evict offline storage; reopen the needed activity online if files are missing. Native browser/OS navigation is outside the app's control.

No live deployment was performed. Main's existing workflow still builds the same portfolio and deploys to the existing gh-pages branch after an approved merge.

## Screenshots

[Desktop home](home.png) · [iPhone home](home-iphone.png) · [iPad home](home-ipad.png)

| Activity       | Desktop                     | iPhone                             | iPad                             |
| -------------- | --------------------------- | ---------------------------------- | -------------------------------- |
| Alphabet       | [View](letters-explore.png) | [View](letters-explore-iphone.png) | [View](letters-explore-ipad.png) |
| Find letter    | [View](letters-find.png)    | [View](letters-find-iphone.png)    | [View](letters-find-ipad.png)    |
| Meet animals   | [View](animals-explore.png) | [View](animals-explore-iphone.png) | [View](animals-explore-ipad.png) |
| Find animal    | [View](animals-find.png)    | [View](animals-find-iphone.png)    | [View](animals-find-ipad.png)    |
| Explore colors | [View](colors-explore.png)  | [View](colors-explore-iphone.png)  | [View](colors-explore-ipad.png)  |
| Color matching | [View](colors-find.png)     | [View](colors-find-iphone.png)     | [View](colors-find-ipad.png)     |
