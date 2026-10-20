import { test, expect } from "@playwright/test";

const sectionIds = [
  "overview",
  "mobs",
  "skills",
  "gear",
  "quests",
  "training",
  "branches",
  "sources",
];
test.beforeEach(async ({ page }) => {
  await page.goto("/maple/");
});

test("Warrior tile opens skills by click or keyboard and supports history and reload", async ({
  page,
}) => {
  const tile = page.getByRole("link", { name: "Warrior guide", exact: true });
  await expect(tile).toHaveAttribute("href", "#skills");
  await tile.click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toBeFocused();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: /Your Warrior/ }),
  ).toBeVisible();
  await tile.focus();
  await tile.press("Enter");
  await expect(page).toHaveURL(/#skills$/);
  await page.reload();
  await expect(page.locator(".skill-card img.game-image")).toHaveCount(6);
  await page.goBack();
  await page.goForward();
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
});

test("direct route, search, history, and portfolio discovery", async ({
  page,
}) => {
  await expect(
    page.getByRole("heading", { name: /Your Warrior/ }),
  ).toBeVisible();
  await page.getByRole("searchbox", { name: "Search the guide" }).fill("Jane");
  await expect(
    page.getByRole("heading", { name: "Results for “Jane”" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Quests Jane and the Mushroom" })
    .click();
  await expect(page).toHaveURL(/#quests$/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Quests", exact: true }),
  ).toBeVisible();
  await page.getByRole("searchbox").fill("zzzz-unfindable");
  await expect(
    page.getByRole("heading", { name: "No results found" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.goto("/maple/#skills");
  await page.goto("/maple/#mobs");
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("heading", { name: "Mobs & drops", exact: true }),
  ).toBeVisible();
  await page.goto("/");
  await page
    .getByRole("link", { name: "Open Maple Fieldguide" })
    .click({ force: true });
  await expect(page).toHaveURL(/\/maple\/$/);
});

test("mobile menu reaches all sections, closes on selection, and supports Escape", async ({
  page,
}, info) => {
  if (info.project.name === "iphone") {
    const menu = page.getByRole("button", { name: "Guide menu" });
    for (const id of sectionIds) {
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await page.locator(`#mobile-guide-menu a[href="#${id}"]`).click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("main")).toBeFocused();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
    }
    await menu.click();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await page
      .getByRole("navigation", { name: "Quick sections" })
      .getByRole("link", { name: "Skills", exact: true })
      .click();
  } else {
    for (const id of sectionIds)
      await page.locator(`.sidebar a[href="#${id}"]`).click();
    await page
      .getByRole("navigation", { name: "Guide sections" })
      .getByRole("link", { name: "Skills", exact: true })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
});

test("skill references retain prerequisites and disputed values without calculators", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    }),
  );
  await page.goto("/maple/#skills");
  await page.reload();
  await expect(page.locator(".sp-note")).toContainText("61 first-job points");
  await expect(
    page.locator(".skill-card").filter({
      has: page.getByRole("heading", { name: "Slash Blast", exact: true }),
    }),
  ).toContainText("6 targets; older wiki: 4");
  const hp = page.locator(".skill-card").filter({
    has: page.getByRole("heading", { name: "Max HP Increase", exact: true }),
  });
  await expect(hp).toContainText("Requires Improved HP Recovery 3");
  for (const id of ["skills", "mobs", "quests", "gear"]) {
    await page.goto(`/maple/#${id}`);
    await expect(page.getByRole("slider")).toHaveCount(0);
    await expect(page.getByRole("spinbutton")).toHaveCount(0);
    await expect(page.getByRole("checkbox")).toHaveCount(0);
  }
});

test("equipment family filters preserve requirements and expandable source links", async ({
  page,
}) => {
  await page.goto("/maple/#gear");
  await page.getByLabel("Weapon family").selectOption("Polearm");
  await expect(page.locator(".equipment-card")).toHaveCount(1);
  await expect(page.locator(".equipment-card")).toContainText(
    "Studded Polearm",
  );
  await expect(page.locator(".item-stats")).toContainText("STR45");
  await page.locator(".equipment-card summary").click();
  await expect(
    page.getByRole("link", { name: "Warrior equipment progression" }),
  ).toBeVisible();
  await page.getByLabel("Weapon family").selectOption("All equipment");
  await expect(page.locator(".equipment-card")).toHaveCount(14);
});

test("quest reference filters levels and reveals prerequisites and rewards", async ({
  page,
}) => {
  await page.goto("/maple/#quests");
  await page.getByLabel("Quest level").selectOption("10–20");
  await expect(page.locator(".quest-card")).toHaveCount(2);
  await page
    .locator(".quest-card")
    .filter({ hasText: "Jane and the Mushroom" })
    .locator("summary")
    .first()
    .click();
  await expect(
    page.locator(".quest-reward").filter({ hasText: "1,610 EXP" }),
  ).toBeVisible();
  await page.getByLabel("Quest level").selectOption("30+");
  const instructor = page.locator(".quest-card").filter({
    has: page.locator("summary strong", {
      hasText: "Finding the Instructor",
    }),
  });
  await instructor.locator("summary").first().click();
  await expect(instructor.locator(".quest-prerequisite")).toContainText(
    "The Warrior’s Next Journey",
  );
});

test("unpublished job tiles are disabled and bundled artwork loads", async ({
  page,
}) => {
  for (const job of ["Magician", "Bowman", "Thief"]) {
    const tile = page.getByRole("link", { name: `${job} guide — coming soon` });
    await expect(tile).toBeVisible();
    await expect(tile).toHaveAttribute("aria-disabled", "true");
    await expect(tile).not.toHaveAttribute("href", /.+/);
  }
  for (const name of [
    "victoria-sky.webp",
    "orange-mushroom.png",
    "slime.png",
    "blue-snail.png",
    "classic-world.png",
  ]) {
    const response = await page.request.get(`/images/maple/${name}`);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
  for (const img of await page.locator("main img:visible").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty("complete", true);
    expect(
      await img.evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
      ),
    ).toBe(true);
  }
});

test("every section fits narrow screens and renders without runtime errors", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of info.project.name === "iphone" ? [320, 390] : [1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1050 : 844 });
    for (const id of sectionIds) {
      await page.goto(`/maple/#${id}`);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${id} at ${width}px`,
      ).toBe(true);
      if (
        [
          "overview",
          "skills",
          "gear",
          "quests",
          "mobs",
          "training",
          "branches",
        ].includes(id)
      ) {
        for (const image of await page.locator("main img:visible").all()) {
          await image.scrollIntoViewIfNeeded();
          await expect(image).toHaveJSProperty("complete", true);
        }
        if (id === "mobs")
          await page
            .locator('.mob-index-options button[aria-pressed="true"]')
            .scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `test-results-maple/${info.project.name}-${width}-${id}.png`,
          fullPage: true,
        });
      }
    }
  }
  expect(errors).toEqual([]);
});

test("entity artwork loads across reference pages and remains visible on phones", async ({
  page,
}) => {
  async function checkImages(selector: string, count: number) {
    const images = page.locator(selector);
    await expect(images).toHaveCount(count);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toBeVisible();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await expect(img).toHaveAttribute("src", /^\/images\/maple\/wiki\//);
    }
  }
  await page.goto("/maple/#skills");
  await checkImages(".skill-card img.game-image", 6);
  await page.goto("/maple/#gear");
  await checkImages(".equipment-card img.game-image", 14);
  await expect(page.locator(".art-caption")).toHaveText([
    "Illustrated: Bronze Helmet",
    "Illustrated: Scimitar",
  ]);
  await page.goto("/maple/#quests");
  await checkImages(".quest-portrait img.game-image", 9);
  await page
    .locator(".quest-card > summary")
    .filter({ hasText: "Jane and the Mushroom" })
    .click();
  await checkImages(".quest-card[open] .quest-materials img", 2);
  await page.goto("/maple/#mobs");
  await checkImages(".mob-index img.game-image", 15);
  for (const name of ["Green Mushroom", "Slime"]) {
    await page
      .locator(".mob-index button")
      .filter({ has: page.getByText(name, { exact: true }) })
      .click();
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await checkImages(".mob-portrait img.game-image", 1);
    const count = await page.locator(".drop-table tbody tr").count();
    expect(count).toBeGreaterThan(0);
    await checkImages(".drop-sprite img.game-image", count);
  }
});

test("mob search finds items, honors rarity and type filters, and preserves unknown rates", async ({
  page,
}) => {
  await page.goto("/maple/#mobs");
  await expect
    .poll(() =>
      page
        .locator('.mob-index-options button[aria-pressed="true"]')
        .evaluate((button) => {
          const selected = button.getBoundingClientRect();
          const index = button.parentElement!.getBoundingClientRect();
          return (
            selected.left >= index.left - 1 && selected.right <= index.right + 1
          );
        }),
    )
    .toBe(true);
  await page
    .getByRole("searchbox", { name: "Find a mob or drop" })
    .fill("Green Mushroom");
  await expect(
    page.getByRole("heading", { name: "Green Mushroom", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Item type").selectOption("Equipment");
  await page.getByLabel("Drop rarity").selectOption("Rare");
  await expect(page.locator(".drop-table tbody tr")).toHaveCount(2);
  await expect(page.locator(".drop-table")).toContainText("~0.16%");
  await expect(page.locator(".drop-table .rarity-badge")).toHaveText([
    "Rare",
    "Rare",
  ]);
  await page.getByLabel("Item type").selectOption("Quest");
  await page.getByLabel("Drop rarity").selectOption("Unknown");
  await expect(page.locator(".drop-table tbody tr")).toHaveCount(1);
  await expect(page.locator(".drop-table")).toContainText("Animal Fossil");
  await expect(page.locator(".drop-chance")).toHaveText("Not reported");
  await expect(page.locator(".quest-drop-condition")).toContainText(
    "Requires the relevant quest",
  );
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .click();
  await page
    .getByRole("searchbox", { name: "Find a mob or drop" })
    .fill("zzz-no-drop");
  await expect(
    page.getByRole("heading", { name: "No matching mobs or drops" }),
  ).toBeVisible();
});

test("global item search selects its mob and missing drop data stays explicitly incomplete", async ({
  page,
}) => {
  await page
    .getByRole("searchbox", { name: "Search the guide" })
    .fill("Animal Fossil");
  await page.getByRole("link", { name: "Mobs & drops Green Mushroom" }).click();
  await expect(
    page.getByRole("heading", { name: "Green Mushroom", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".drop-table")).toContainText("Animal Fossil");
  await page
    .getByRole("searchbox", { name: "Find a mob or drop" })
    .fill("Curse Eye");
  await expect(
    page.getByRole("heading", { name: "No drop list in the reviewed source" }),
  ).toBeVisible();
  await expect(page.locator(".drop-data-missing")).toContainText(
    "does not mean the monster drops nothing",
  );
  await page.goto("/maple/#stats");
  await expect(
    page.getByRole("heading", { name: "Mobs & drops", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Before you spend AP", { exact: true }),
  ).toHaveCount(0);
});
