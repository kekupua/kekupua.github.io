# What Should We Eat?

A React + TypeScript restaurant discovery app at `/eat/`. GitHub Pages redirects `/eat` to `/eat/`; Vite's separate `eat/index.html` entry allows direct visits and refreshes without an SPA 404 fallback. There are no nested client-side URLs.

## Run and validate

Use the repository's pnpm 10 toolchain:

```sh
pnpm install --frozen-lockfile
pnpm --filter portfolio dev
pnpm --filter portfolio typecheck
pnpm --filter portfolio test:eat:unit
pnpm --filter portfolio build
pnpm --filter portfolio exec playwright install chromium
pnpm --filter portfolio test:eat
```

The existing main-branch workflow builds the portfolio and publishes `packages/portfolio/dist` to `gh-pages`. This feature does not deploy or merge itself. After approval and merge, visit https://seanteramae.com/eat/ (or the repository's GitHub Pages domain). Restaurant browser tests run in PR CI and upload desktop/iPhone screenshots with their HTML report. Test records and the attributed frozen real OSM snapshot are test-only; they are not bundled into the application.

## Providers, licensing, and cost

Evaluated 2026-10-09 against official provider documentation. Current choice: Leaflet 1.9.4 + OpenStreetMap raster tiles + Overpass + Zippopotam.us. **No account, keys, server, billing configuration, or ongoing API subscription is required.** Services are best effort, with no uptime guarantee.

| Provider | Coverage and fields | Limits / license | Decision |
| --- | --- | --- | --- |
| [Overpass](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html) | Global community OSM POIs; names, coordinates, cuisine, addresses, website and hours when mapped. Prices and dine-in/takeaway tags are sparse. No authoritative review ratings. | Public shared endpoint; current regular-app guidance is fewer than 100 queries and 10 MB/day across all users, derived from dividing the one-off 10,000-query / 1 GB safety guidance by 100. This is not an app quota or SLA. Per-IP slots and load shedding apply; 406/429 responses require a 30-second pause. OSM data ODbL, attribution required. The operator advises a dedicated instance for sustained consumer-app usage. | No-account low-volume personal starting point. Change provider or self-host before promoting to broad public traffic. |
| [Geoapify](https://www.geoapify.com/pricing/) / [Places](https://apidocs.geoapify.com/docs/places/) | Global, largely OSM-based categorized POIs, address/contact data and listed hours; Place Details enriches available attributes. Missing metadata remains possible; prices/ratings are not guaranteed. | Free 3,000 credits/day, up to 5 requests/sec; no credit card required. Places pricing depends on result count (20 places/credit); separate details requests use credits. Geoapify and source attribution required. Paid API 10 plan listed at $59/month when evaluated. | Useful hosted upgrade, but adds an account/key without fixing all missing restaurant metadata. |
| [Foursquare](https://foursquare.com/pricing/) / [Places API](https://foursquare.com/products/places-api/) | Global dedicated commercial POI data; fields and richer attributes depend on endpoint, requested fields and licensed offering. | Developer sandbox, then volume-based pay-as-you-go Pro/Premium services. Commercial terms govern reuse/caching; do not assume an unlimited free production tier. | Defer: account, licensed data terms, secure backend, and billing review required. |
| [Zippopotam.us](https://www.zippopotam.us/) | US ZIP lookup with approximate postal center; adapted GeoNames data. Not a precise household address. | Free JSON API; no advertised guaranteed SLA or fixed quota. Cache on explicit submission; GeoNames credit provided. | No-account ZIP resolution. |
| [OSM tiles](https://operations.osmfoundation.org/policies/tiles/) | Real interactive base map, rendered by open-source Leaflet. | Attribution always visible; normal browser caching and Referer retained. No bulk downloading, offline tile caching, prefetch, or scraping. Best effort and access may be blocked under load. | Appropriate for modest interactive personal use. |

## Data behavior and limitations

- Radius and card distances are haversine **straight-line miles**, never driving time or driving distance. Directions opens Google Maps; no Maps SDK/key is used.
- Restaurant, fast-food, and food-court OSM nodes/ways/relations are retrieved in one bounded search. Matching name/near-identical position duplicates are removed. Chains at different locations remain separate.
- Multiple cuisines match any selected category. Common mapped aliases (sushi, ramen, pizza, burger, etc.) map to questionnaire categories. “Other” requires an explicit unmapped cuisine tag; missing cuisine is unknown. Exclusions cannot identify an untagged cuisine.
- Budget filters match explicit `$`/`$$`/`$$$` `price:level` tags only. No price inference from chain, cuisine, photos, or name. Most OSM results have no reliable price. “Any price” is recommended.
- Takeout and dine-in filters require explicit positive `takeaway` / `dine_in` tags. Unknown service does not pass strict filters. “Either” includes unknowns.
- Quick bite uses `amenity=fast_food`; full meal uses `amenity=restaurant`. These are venue-type approximations, not wait-time estimates.
- “Open now” accepts `24/7` and conservative weekly numeric schedules, including day ranges, split hours and overnight intervals. `tz-lookup` + `Intl` evaluates the venue's local time zone, including DST. Complex, invalid, seasonal, solar, holiday, or exception schedules remain **unknown**. Status re-evaluates every minute. Community data may be stale; listed hours never guarantee holiday operation.
- Ratings are omitted entirely because the chosen provider supplies no properly licensed review ratings. Listed websites are HTTP(S) only; external actions use `noopener noreferrer`. Text is rendered without injecting provider HTML.
- Optional strict filters can produce no matches. Empty states offer editing or clearing filters. Loading, 429/busy, timeout, service-error and map-tile-error states are explicit. An Overpass HTTP-200 partial-timeout response is rejected rather than shown as complete results.
- No paid-provider integration or automatic provider failover is implemented. Automatic retries could worsen overload, so busy searches ask the user to retry later.

## Caching, privacy and selection

Only explicit area searches call providers. Filters/sorting/random selection/shortlist use loaded data. One most-recent search is cached in session storage for 15 minutes; ZIP centers are cached locally for 30 days. New uncached Overpass searches are throttled to one per 10 seconds per tab; 406/429 responses enforce a minimum 30-second cooldown (or a longer numeric Retry-After), with a 25-second provider query limit and 35-second overall request timeout. This is not a global rate limiter; scale needs a dedicated backend/provider.

Preferences, ZIP code, and favorite restaurant records remain in local storage. Device coordinates are not stored as persistent preferences; the most recent search center is retained in session storage for caching. Dismissals and random history stay in memory for the current page session. Storage failure degrades gracefully to memory. Location permission is requested only after tapping the location button. ZIP/location coordinates are necessarily sent to the chosen lookup/search service; map viewport requests go to OSM. No analytics or account is added.

Surprise Me draws only from filtered, non-dismissed matches. Try Again uses each available restaurant before starting another cycle. Exhausting all non-dismissed candidates yields an empty state with Restore dismissed. The shortlist persists independently of filters and indicates which search center its distances use.

## Optional hosted-provider upgrade

No signup is needed for this version. If coverage/uptime requirements later justify Geoapify, start at https://myprojects.geoapify.com/ and check the current pricing and attribution terms above. The user must create their own account, choose the free plan, and generate their own key; do not approve paid upgrades automatically. Prefer a server-side proxy on separately authorized hosting, with the key in its secret manager, quotas, request validation, rate limits, and CORS restrictions for the site domain. GitHub Pages cannot securely store a private API key. Vite `VITE_*` variables become public browser code. Do not add secrets to `.env` committed to Git, PRs, screenshots, or static bundles. Account, billing, and secret setup require the user's involvement before implementation.

## Review screenshots and verification

[Successful CI run](https://github.com/kekupua/kekupua.github.io/actions/runs/38005343884): 9 restaurant unit tests, 16 restaurant browser cases across desktop/iPhone, and 39 existing learning-app browser cases passed, along with typechecking, lint and production build. Browser results use deterministic fixtures. The real-data screenshots below use the attributed frozen OSM response from a successful live 1 km Redmond request and live OSM map tiles; they are not a claim that listed hours are current or that the 5-mile live API response succeeded. Larger live Overpass queries also encountered overloaded-server timeouts during development; those failures are handled in the app.

- [Desktop results](screenshots/desktop-results.jpg)
- [iPhone map](screenshots/iphone-map.jpg)
- [iPhone questionnaire](screenshots/iphone-questionnaire.jpg)
- [iPhone random reveal](screenshots/iphone-surprise.jpg) (synthetic test-only restaurant)
