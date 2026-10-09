# Little Wonders

A self-contained preschool learning app at `/learn/`. `/learn` redirects to the directory URL on GitHub Pages; local Vite dev/preview mirrors that redirect. Activities use hash URLs, for example `/learn/#/animals/find`, so bookmarks and refreshes need no GitHub Pages 404 rewrite.

## Activities

| Category | Explore | Find / Match |
| --- | --- | --- |
| Letters | All 26 uppercase/lowercase letters, illustrated objects, spoken names and one example sound | Three large letters, spoken target, unlimited retries |
| Animals | Dog, cat, cow, duck, elephant, lion; names and spoken animal sounds | Three illustrated animals, spoken target |
| Colors | Red, blue, yellow, green, orange, purple | Match the target ball to one of three colored balls |

Correct answers get a gentle star celebration and a spoken compliment. The child taps Next to continue; no timers, scores, negative sounds, or automatic round changes. Previous and Next stop at the exploration boundaries. Home is always available. Speaker repeats the current prompt; the smaller sound toggle mutes all speech. New navigation starts each activity at its first item. Audio never overlaps itself.

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

After an approved merge/deployment, a grown-up should open `/learn/` online and wait for **Ready to play offline**. On iOS Safari, use Share → Add to Home Screen → Add (enable Open as Web App where offered). On Android Chrome, use Install app / Add to Home screen. Launch the installed icon once online, wait for the same ready message, then check it in airplane mode. A first visit or first install requires network access.

The manifest uses start URL, ID, and scope `/learn/`, standalone display, 192/512 PNG icons, a maskable 512 icon, and an iOS 180 touch icon. `dist/learn/sw.js` is generated after Vite builds by walking the learning entry's dependency graph plus local learning assets. The worker scope is `/learn/`; it caches the learning HTML, its JS/CSS dependencies, all icons, and every audio clip. It does not cache portfolio images or HTML. Shared React/router JS can live under `/assets/`; the worker handles those dependencies only for its controlled learning pages. Hashed cache versions change when any learning dependency changes. An update waits for old learning windows to close; it does not force a running game to reload. Cleanup removes only caches beginning `little-wonders-`.

All essential speech is bundled MP3, including instructions, examples, retries, and celebrations. The worker handles audio byte ranges for Safari-compatible offline playback. There is no speech synthesis, remote image/font/sound request, API, analytics, or tracking at runtime. The separate HTML entry excludes the portfolio's footer, Google fonts, and Ionicons CDN scripts. Its content security policy limits resource requests to the same origin. The app has buttons and internal hash navigation, with no anchors, forms, embeds, or controls leading back to the portfolio.

## Content and asset authoring

- `packages/portfolio/src/learn/content.ts`: category metadata, letters/objects, animals/sounds, colors, activity names, deterministic question choices. Each round has one correct choice and two distinct alternatives, with the answer position rotating. Keep at least four unique items in a category if extending the current choice generator.
- `Art.tsx`: original rounded SVG illustrations. Add an illustration case matching the item's `art` key. SVGs are embedded in the JS bundle; no external image requests.
- `App.tsx`: reusable activity tiles, learning cards, audio controls, and celebration; a category can reuse explore/find without duplicating activity mechanics.
- `learn.css`: independent styles, safe area insets, 44px minimum controls, large primary targets, touch manipulation, and reduced-motion rules. Browser zoom remains enabled. Small screens and enlarged text can scroll when necessary.
- `public/learn/audio`: 119 generated MP3s plus readable transcripts. No audio synthesis dependency is needed to build or run the app.
- `tools/learn/generate-audio.ts`: optional authoring tool using eSpeak NG and ffmpeg. Install those locally, then run `pnpm --filter portfolio audio:learn` and commit the generated files. `ESPEAK_BIN` may select a local executable. New content needs corresponding explore/find/retry clips; the cache includes them automatically. Human recordings can replace MP3 files under the same names.

The voice is synthesized using eSpeak NG 1.51, en-us, at a moderate speed and volume. Animal sounds are spoken imitations, not field recordings. Phonics offers one example sound per letter; it is not a comprehensive phonics curriculum. X uses /z/ in xylophone and I uses the long vowel in ice cream. Illustrations and prompts were created for this project under the repository's existing license; eSpeak/ffmpeg are authoring tools and are not redistributed in the app.

## Validation and limits

Browser coverage includes all 26 letter cards and every animal/color; actual media playback after taps; exploration boundaries; repeated wrong answers, success and manual next; category/home navigation and browser history; replay/mute; all activity layouts; minimum control sizes and horizontal overflow; reduced motion; absence of external requests, links, forms and embeds; full offline cache including unvisited prompts; all six offline deep-link reloads; MP3 decoding and range responses; scoped manifest/icons; and the existing landing, meal-prep, recipe, and Hearthstone routes remaining outside worker control.

Tests run in Chromium with desktop (1280×900), iPhone 13 (390×844, touch), and iPad (810×1080, touch) profiles. This is viewport/device emulation, not a physical Safari/iOS test. Manifest and icons were checked; real iOS/Android installation, speaker volume, and Safari behavior still need device confirmation. Audio starts from a tap; an initial deep link has a large replay button rather than attempting blocked autoplay. A device can evict offline storage; reopen online and wait for Ready to play offline if needed. Native browser/OS navigation is outside the app's control.

No live deployment was performed. Main's existing workflow still builds the same portfolio and deploys to the existing gh-pages branch after an approved merge.

## Screenshots

[Desktop home](home.png) · [iPhone home](home-iphone.png) · [iPad home](home-ipad.png)

| Activity | Desktop | iPhone | iPad |
| --- | --- | --- | --- |
| Alphabet | [View](letters-explore.png) | [View](letters-explore-iphone.png) | [View](letters-explore-ipad.png) |
| Find letter | [View](letters-find.png) | [View](letters-find-iphone.png) | [View](letters-find-ipad.png) |
| Meet animals | [View](animals-explore.png) | [View](animals-explore-iphone.png) | [View](animals-explore-ipad.png) |
| Find animal | [View](animals-find.png) | [View](animals-find-iphone.png) | [View](animals-find-ipad.png) |
| Explore colors | [View](colors-explore.png) | [View](colors-explore-iphone.png) | [View](colors-explore-ipad.png) |
| Color matching | [View](colors-find.png) | [View](colors-find-iphone.png) | [View](colors-find-ipad.png) |
