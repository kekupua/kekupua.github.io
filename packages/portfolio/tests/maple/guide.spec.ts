import { test, expect } from "@playwright/test";

const sectionIds = [
  "overview",
  "stats",
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
  await page.goto("/maple/#stats");
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Skills", exact: true }),
  ).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("heading", { name: "Stats & AP", exact: true }),
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

test("skill and stat references retain prerequisites and disputed values without calculators", async ({
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
  for (const id of ["skills", "stats", "quests", "gear"]) {
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
  for (const img of await page.locator("main img").all())
    expect(
      await img.evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
      ),
    ).toBe(true);
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
      if (["overview", "skills", "quests"].includes(id))
        await page.screenshot({
          path: `test-results-maple/${info.project.name}-${width}-${id}.png`,
          fullPage: true,
        });
    }
  }
  expect(errors).toEqual([]);
});
