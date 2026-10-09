import { test, expect, type Page } from "@playwright/test";
// Synthetic records exist only in the test runner, never in the shipped app.
const elements = [
  {
    type: "node",
    id: 101,
    lat: 47.674,
    lon: -122.121,
    tags: {
      name: "Test Korean Kitchen",
      amenity: "restaurant",
      cuisine: "korean",
      "addr:street": "Test Street",
      "price:level": "$$",
      opening_hours: "24/7",
      takeaway: "yes",
      dine_in: "yes",
      website: "https://example.com",
    },
  },
  {
    type: "way",
    id: 102,
    center: { lat: 47.678, lon: -122.116 },
    tags: {
      name: "Test Sushi",
      amenity: "restaurant",
      cuisine: "sushi",
      opening_hours: "24/7",
    },
  },
  {
    type: "node",
    id: 103,
    lat: 47.668,
    lon: -122.127,
    tags: {
      name: "Test Taco Stop",
      amenity: "fast_food",
      cuisine: "mexican",
      takeaway: "yes",
    },
  },
  {
    type: "node",
    id: 104,
    lat: 47.67,
    lon: -122.12,
    tags: { name: "Test Unknown Cafe", amenity: "restaurant" },
  },
  {
    type: "node",
    id: 105,
    lat: 46,
    lon: -122,
    tags: { name: "Test Far Away", amenity: "restaurant", cuisine: "korean" },
  },
];
async function mockData(page: Page, data = elements) {
  await page.route("https://api.zippopotam.us/**", (route) =>
    route.fulfill({
      json: {
        places: [
          {
            "place name": "Redmond",
            "state abbreviation": "WA",
            latitude: "47.6718",
            longitude: "-122.1232",
          },
        ],
      },
    }),
  );
  await page.route("https://overpass-api.de/**", (route) =>
    route.fulfill({ json: { elements: data } }),
  );
  // Honor tile policy: deterministic tests do not bulk-request public tiles.
  await page.route("https://tile.openstreetmap.org/**", (route) =>
    route.fulfill({
      contentType: "image/png",
      body: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a5wAAAABJRU5ErkJggg==",
        "base64",
      ),
    }),
  );
}
async function questions(page: Page, cuisine?: string) {
  await page.getByRole("button", { name: "Continue" }).click();
  if (cuisine)
    await page.getByRole("button", { name: cuisine, exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Find our next meal" }).click();
}
test("questionnaire, ZIP validation, filtering, route refresh, and no horizontal overflow", async ({
  page,
}) => {
  await mockData(page);
  await page.goto("/eat");
  await expect(page).toHaveURL(/\/eat\/$/);
  const zip = page.getByLabel("US ZIP code");
  await expect(zip).toHaveValue("98052");
  await zip.fill("123");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("alert")).toContainText("five-digit");
  await zip.fill("98052");
  await questions(page, "Korean");
  await expect(
    page.getByRole("heading", { name: "Test Korean Kitchen", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Test Sushi", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Test Far Away" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.reload();
  await expect(page.getByLabel("US ZIP code")).toHaveValue("98052");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(
    page.getByRole("button", { name: "Korean", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("cards and keyboard markers synchronize; shortlist survives refresh; dismissals restore", async ({
  page,
}, info) => {
  await mockData(page);
  await page.goto("/eat/");
  await questions(page);
  await expect(page.locator(".eat-card")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Show Test Korean Kitchen on map" })
    .click();
  await expect(page.locator("#restaurant-node-101")).toHaveAttribute(
    "data-selected",
    "true",
  );
  await expect(page.locator(".leaflet-popup-content")).toContainText(
    "Test Korean Kitchen",
  );
  // Leaflet marker keyboard activation should select and reveal its card.
  const marker = page.locator('.leaflet-marker-icon[title="Test Sushi"]');
  await marker.focus();
  await marker.press("Enter");
  await expect(page.locator("#restaurant-way-102")).toHaveAttribute(
    "data-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Test Sushi", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Save Test Sushi to shortlist" })
    .click();
  await page
    .getByRole("button", { name: "Eliminate Test Korean Kitchen" })
    .click();
  await expect(page.locator(".eat-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Restore dismissed" }).click();
  await expect(page.locator(".eat-card")).toHaveCount(4);
  await page.getByRole("button", { name: /Shortlist/ }).click();
  await expect(page.locator(".eat-card")).toHaveCount(1);
  await page.reload();
  await page.getByRole("button", { name: /Shortlist/ }).click();
  await expect(
    page.getByRole("heading", { name: "Test Sushi", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: info.outputPath("shortlist.png"),
    fullPage: true,
  });
});
test("surprise cycles choices and eliminates without repeats; dialog supports keyboard", async ({
  page,
}) => {
  await mockData(page);
  await page.goto("/eat/");
  await questions(page);
  await page
    .getByRole("button", { name: "Eliminate Test Unknown Cafe" })
    .click();
  await page.getByRole("button", { name: "Eliminate Test Taco Stop" }).click();
  await page.getByRole("button", { name: "Surprise Me" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("h3")).toBeVisible();
  const first = await dialog.locator("h3").textContent();
  await dialog.getByRole("button", { name: "Try Again", exact: true }).click();
  await expect(dialog.locator("h3")).toBeVisible();
  expect(await dialog.locator("h3").textContent()).not.toBe(first);
  await dialog
    .getByRole("button", { name: "Eliminate this choice", exact: true })
    .click();
  await expect(dialog.locator("h3")).toHaveText(first);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.locator(".eat-card")).toHaveCount(1);
});
test("empty, error, loading, strict budget, and missing-data states", async ({
  page,
}) => {
  await mockData(page, []);
  await page.goto("/eat/");
  await questions(page);
  await expect(
    page.getByRole("heading", { name: "No matches this time." }),
  ).toBeVisible();
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await page.route("https://overpass-api.de/**", (route) =>
    route.fulfill({ status: 429, body: "busy" }),
  );
  await questions(page);
  await expect(page.getByRole("alert")).toContainText("busy");
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await mockData(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "$$ Moderate", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Find our next meal" }).click();
  await expect(page.locator(".eat-card")).toHaveCount(1);
});
test("default preferences screenshot and reduced-motion behavior", async ({
  page,
}, info) => {
  await mockData(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/eat/");
  await page.screenshot({
    path: info.outputPath("questionnaire.png"),
    fullPage: true,
  });
  await questions(page);
  await expect(page.locator(".eat-card")).toHaveCount(4);
  await expect(
    page.getByText("Price not listed", { exact: true }).first(),
  ).toBeVisible();
  await page.getByRole("button", { name: "Surprise Me" }).click();
  await expect(page.getByRole("dialog").locator("h3")).toBeVisible();
  const duration = await page
    .locator(".eat-reveal-icon")
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(duration).toBe("none");
  await page.screenshot({
    path: info.outputPath("surprise.png"),
    fullPage: true,
  });
});

test("real OSM snapshot screenshots (frozen community data, not live opening guarantees)", async ({
  page,
}, info) => {
  const snapshot = await import("./redmond-osm.json");
  await mockData(page, snapshot.elements as unknown as typeof elements);
  await page.unroute("https://tile.openstreetmap.org/**");
  await page.goto("/eat/");
  await questions(page);
  await expect(page.locator(".eat-card").first()).toBeVisible();
  await page.screenshot({
    path: info.outputPath("real-results-list.png"),
    fullPage: true,
  });
  if (info.project.name === "iphone")
    await page.getByRole("button", { name: "Map", exact: true }).click();
  await expect(page.locator(".eat-map")).toBeVisible();
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: info.outputPath("real-results-map.png"),
    fullPage: true,
  });
});

test("location permission is opt-in and device center is sent to the search", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation({ latitude: 47.67, longitude: -122.12 });
  await mockData(page);
  await page.goto("/eat/");
  await page.getByRole("button", { name: "Use my current location" }).click();
  await expect(
    page.getByRole("button", { name: /Using current location/ }),
  ).toBeVisible();
  const request = page.waitForRequest("https://overpass-api.de/**");
  await questions(page);
  expect(decodeURIComponent((await request).postData() || "")).toContain(
    "47.67,-122.12",
  );
  await expect(
    page.getByText("Your current location", { exact: false }).first(),
  ).toBeVisible();
});
test("loading, ZIP lookup failure, cached re-filtering, and sort interactions", async ({
  page,
}) => {
  await mockData(page);
  await page.goto("/eat/");
  await page.route("https://overpass-api.de/**", async (route) => {
    await new Promise((r) => setTimeout(r, 1000));
    await route.fulfill({ json: { elements } });
  });
  await questions(page);
  await expect(
    page.getByRole("heading", { name: "Looking for something delicious…" }),
  ).toBeVisible();
  await expect(page.locator(".eat-card")).toHaveCount(4);
  await page.getByLabel("Sort").selectOption("name");
  await expect(page.locator(".eat-card h3").first()).toHaveText(
    "Test Korean Kitchen",
  );
  let newCalls = 0;
  page.on("request", (r) => {
    if (r.url().includes("overpass-api.de")) newCalls++;
  });
  await page.getByRole("button", { name: "Edit preferences" }).click();
  await questions(page, "Japanese");
  await expect(page.locator(".eat-card")).toHaveCount(1);
  expect(newCalls).toBe(0);
  await page.evaluate(() => {
    sessionStorage.clear();
    localStorage.removeItem("eat:zip:98052");
  });
  await page.reload();
  await page.route("https://api.zippopotam.us/**", (route) =>
    route.fulfill({ status: 404, body: "not found" }),
  );
  await questions(page);
  await expect(page.getByRole("alert")).toContainText("ZIP code was not found");
});
