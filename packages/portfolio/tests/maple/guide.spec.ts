import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.goto("/maple/");
});

test("direct route, section navigation, search, and portfolio discovery work", async ({
  page,
}) => {
  await expect(
    page.getByRole("heading", { name: "A little less lost." }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search the guide" })
    .fill("mushroom");
  await expect(
    page.getByRole("heading", { name: "Looking for “mushroom”" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Quest checklist Jane and the Mushroom" })
    .click();
  await expect(page).toHaveURL(/#quests$/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Leave a few boxes checked." }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search the guide" })
    .fill("zzzz-unfindable");
  await expect(
    page.getByRole("heading", { name: "No trail found." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.goto("/");
  await page
    .getByRole("link", { name: "Open Maple Fieldguide" })
    .click({ force: true });
  await expect(page).toHaveURL(/\/maple\/$/);
});

test("planner obeys budget and dependencies, survives reload, and explains a lower-level reset", async ({
  page,
}) => {
  await page.goto("/maple/#skills");
  await expect(
    page.getByRole("button", { name: "Add point to Slash Blast", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Add point to Power Strike", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Add point to Precise Strikes",
      exact: true,
    }),
  ).toBeDisabled();
  await page.getByRole("slider", { name: "Character level" }).fill("30");
  await page
    .getByRole("button", { name: "Add point to Slash Blast", exact: true })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Remove point from Power Strike",
      exact: true,
    }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Load example" }).click();
  await expect(page.locator(".planner-bar")).toContainText("61");
  await page.reload();
  await expect(page.locator(".planner-bar")).toContainText("61");
  await expect(page.getByRole("slider")).toHaveValue("30");
  await page.getByRole("slider").fill("10");
  await expect(page.getByRole("status")).toContainText("cleared");
  await expect(page.locator(".planner-bar")).toContainText("0 / 1 used");
  await page.getByRole("slider").fill("1");
  await expect(
    page.getByRole("button", { name: "Load example" }),
  ).toBeDisabled();
});

test("requirement checker rejects invalid inputs, reports gaps, and includes level gates", async ({
  page,
}) => {
  await page.goto("/maple/#stats");
  await page.getByLabel("Target weapon").selectOption("gladius");
  await expect(page.locator(".requirement-result")).toContainText(
    "Reach level 30 first",
  );
  await page.getByRole("slider").fill("30");
  await expect(page.locator(".requirement-result")).toContainText(
    "25 more STR needed",
  );
  await page.getByLabel("Total STR").fill("65");
  await page.getByLabel("Total DEX").fill("30");
  await expect(page.locator(".requirement-result")).toContainText(
    "You meet the listed",
  );
  await page.getByLabel("Total DEX").fill("");
  await expect(page.locator(".requirement-result")).toContainText(
    "Enter whole-number stats",
  );
  await expect(page.locator(".requirement-result")).not.toContainText(
    "You meet",
  );
});

test("quest completion persists and filters keep a useful empty state", async ({
  page,
}) => {
  await page.goto("/maple/#quests");
  await page.getByLabel("Show quests").selectOption("Completed");
  await expect(
    page.getByRole("heading", { name: "No quests in this view." }),
  ).toBeVisible();
  await page.getByLabel("Show quests").selectOption("Available by level");
  await page
    .getByRole("checkbox", { name: "Mark Become a Warrior complete" })
    .check();
  await expect(page.locator(".quest-progress")).toContainText(
    "1 of 9 completed",
  );
  await page.reload();
  await expect(
    page.getByRole("checkbox", { name: "Mark Become a Warrior complete" }),
  ).toBeChecked();
  await page.getByLabel("Show quests").selectOption("Completed");
  await expect(
    page.getByRole("heading", { name: "Become a Warrior", exact: true }),
  ).toBeVisible();
});

test("all sections fit a narrow viewport and render without runtime errors", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  if (info.project.name === "iphone")
    await page.setViewportSize({ width: 320, height: 740 });
  for (const id of [
    "overview",
    "stats",
    "skills",
    "gear",
    "quests",
    "training",
    "branches",
    "sources",
  ]) {
    await page.goto(`/maple/#${id}`);
    await expect(page.locator("main h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (["overview", "skills"].includes(id))
      await page.screenshot({
        path: `test-results-maple/${info.project.name}-${id}.png`,
        fullPage: true,
      });
  }
  expect(errors).toEqual([]);
});

test("the guide remains usable with unavailable browser storage", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    });
  });
  await page.goto("/maple/#quests");
  await expect(
    page.getByText("Session only · storage unavailable"),
  ).toBeAttached();
  await page
    .getByRole("checkbox", { name: "Mark Become a Warrior complete" })
    .check();
  await expect(page.locator(".quest-progress")).toContainText(
    "1 of 9 completed",
  );
});
