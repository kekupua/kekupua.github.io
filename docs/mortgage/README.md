# Room to Grow

A mobile-first homebuying cost calculator at `/mortgage/`, linked first in the portfolio project cards. It is a separate Vite entry, following the existing `/eat/` and `/learn/` routes, so direct links and reloads work on GitHub Pages.

## What it estimates

- Fixed-rate, fully amortizing US conventional mortgage principal and interest.
- Initial monthly property taxes, homeowners insurance, HOA dues, and editable PMI.
- A separate maintenance reserve and combined monthly planning budget.
- Down payment plus closing fees and prepaids, less earnest money already paid.
- Annual principal, interest, and outstanding balance; lifetime loan interest.
- One saved scenario compared with current inputs. Comparisons last for the visit; valid inputs persist in local browser storage with graceful fallback when storage is unavailable.

All defaults are illustrative, not current rates, local tax estimates, or lender offers. No account, API key, analytics, or mortgage data transmission is required. Google Fonts is optional; system fonts provide a fallback. The original SVG home illustration is included in the repo.

## Calculation conventions

For principal `P`, monthly rate `r = annual percentage / 1200`, and `n` monthly payments, principal and interest is `P*r / (1 - (1+r)^(-n))`. `log1p`/`expm1` keep very small rates stable. At zero interest it is `P/n`; at 100% down it is zero.

- Property tax and maintenance inputs are annual percentages of purchase price divided by 12.
- Insurance is an annual dollar amount divided by 12; HOA is monthly dollars.
- PMI is an annual percentage of original loan principal divided by 12, included only below 20% down. This is an initial-payment estimate; cancellation is not modeled.
- Closing fees are a percentage of purchase price, excluding the separate dollar input for prepaids and initial escrow.
- Cash still needed is `max(0, down payment + closing fees + prepaids - deposit)`. A deposit larger than estimated upfront costs produces an explanatory note.
- Amortization covers scheduled principal and interest only. Values are calculated at full precision and rounded to whole dollars for display; line-item rounding can differ from rounded totals by a dollar.
- No appreciation, tax deductions, extra payments, credits, points, mortgage insurance termination, or increases in ownership costs are projected. FHA/VA/USDA and adjustable-rate loans are outside scope.

Input validation rejects missing, negative, nonfinite, and out-of-range values, as well as down payments above the purchase price. Invalid input hides the previous result rather than presenting stale calculations.

Reference: [CFPB monthly mortgage payment explanation](https://www.consumerfinance.gov/ask-cfpb/on-a-mortgage-whats-the-difference-between-my-principal-and-interest-payment-and-my-total-monthly-payment-en-1941/), [PMI explanation](https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/), and [Loan Estimate explainer](https://www.consumerfinance.gov/owning-a-home/loan-estimate/).

## Run and verify

From the repo root:

```sh
pnpm install --frozen-lockfile
pnpm --filter portfolio dev
pnpm --filter portfolio typecheck
pnpm --filter portfolio test:mortgage:unit
pnpm --filter portfolio build
pnpm --filter portfolio exec playwright install chromium
pnpm --filter portfolio test:mortgage
```

The Playwright config starts the production preview on port 4175. `MORTGAGE_CHROMIUM_PATH` optionally points to an installed Chromium executable. Tests cover desktop and emulated iPhone Chromium, plus a 320px-wide layout, keyboard navigation, blocked storage, reload persistence, direct routing, portfolio navigation, comparison, invalid inputs, and cost edits. This is not a physical iOS Safari test.

CI runs the unit and browser suites and uploads the report and screenshots. Screenshots are captured from the production build, not mockups:

- [Desktop overview](screenshots/desktop-overview.jpg)
- [Mobile overview](screenshots/iphone-overview.jpg)
- [Mobile estimate](screenshots/iphone-estimate.jpg)
- [Desktop comparison](screenshots/desktop-comparison.jpg)
- [Mobile comparison](screenshots/iphone-comparison.jpg)
