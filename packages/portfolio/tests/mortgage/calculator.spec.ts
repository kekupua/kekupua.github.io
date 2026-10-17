import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test.beforeEach(async ({ page }) => {
  await page.goto("/mortgage/");
});

test("default estimate, responsive layout, and actual page screenshots", async ({
  page,
}, testInfo) => {
  await expect(
    page.getByRole("heading", { name: "Start with your home" }),
  ).toBeVisible();
  await expect(page.locator(".monthly-total")).toContainText("$5,451");
  await expect(page.locator(".cash-total")).toHaveText("$201,000");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  await mkdir("../../docs/mortgage/screenshots", { recursive: true });
  if (testInfo.project.name === "iphone") {
    await page.screenshot({
      path: "../../docs/mortgage/screenshots/iphone-start.jpg",
      scale: "css",
      type: "jpeg",
      quality: 85,
    });
  }
  await page.screenshot({
    path: `../../docs/mortgage/screenshots/${testInfo.project.name}-overview.jpg`,
    fullPage: true,
    scale: "css",
    type: "jpeg",
    quality: 85,
  });
  if (testInfo.project.name === "iphone") {
    await page.getByRole("link", { name: /See breakdown/ }).click();
    await expect(page.locator(".monthly-total")).toBeInViewport();
    await page.screenshot({
      path: "../../docs/mortgage/screenshots/iphone-estimate.jpg",
      type: "jpeg",
      quality: 85,
      scale: "css",
    });
  }
});

test("editing costs, unit conversion, zero interest, PMI, and deposit", async ({
  page,
}) => {
  await page.getByLabel("Home price", { exact: true }).fill("300000");
  await page.getByRole("button", { name: "10%", exact: true }).click();
  await page.getByLabel("Interest rate", { exact: true }).fill("0");
  await page.getByLabel("Property tax / year").fill("1.2");
  await page.getByLabel("Home insurance / year").fill("1200");
  await page.getByLabel("HOA dues / month").fill("250");
  await page.getByLabel("PMI rate / year").fill("0.6");
  await expect(page.locator(".monthly-total")).toContainText("$1,535");
  await page
    .getByRole("group", { name: "Down payment unit", exact: true })
    .getByRole("button", { name: "$", exact: true })
    .click();
  await expect(page.getByLabel("Down payment (dollars)")).toHaveValue("30000");
  await expect(page.locator(".monthly-total")).toContainText("$1,535");
  await page.getByText("Getting the keys", { exact: false }).click();
  await page.getByLabel("Earnest money already paid").fill("5000");
  await expect(page.locator(".cash-total")).toHaveText("$34,000");
  await page.getByRole("button", { name: "20%", exact: true }).click();
  await expect(
    page
      .locator(".breakdown .cost-row")
      .filter({ hasText: "Mortgage insurance" }),
  ).toContainText("$0");
});

test("save scenario, compare changes, inspect amortization, and reset", async ({
  page,
}, testInfo) => {
  await page
    .getByRole("button", { name: "Save to compare", exact: true })
    .click();
  await page.getByLabel("Home price", { exact: true }).fill("850000");
  await expect(
    page.getByRole("heading", { name: "Two paths to home" }),
  ).toBeVisible();
  const row = page.locator(".comparison tr").filter({ hasText: "Home price" });
  await expect(row).toContainText("$900,000");
  await expect(row).toContainText("$850,000");
  await expect(page.locator(".comparison-note")).toContainText(
    "less per month",
  );
  await page
    .locator(".comparison")
    .evaluate((element) => element.scrollIntoView({ block: "start" }));
  await page.locator(".comparison").screenshot({
    path: `../../docs/mortgage/screenshots/${testInfo.project.name}-comparison.jpg`,
    type: "jpeg",
    quality: 85,
    scale: "css",
  });
  await page
    .getByText("See the year-by-year breakdown", { exact: false })
    .click();
  await expect(page.locator(".schedule-scroll tbody tr")).toHaveCount(30);
  await expect(
    page.locator(".schedule-scroll tbody tr").last().locator("td").last(),
  ).toHaveText("$0");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByLabel("Home price", { exact: true })).toHaveValue(
    "900000",
  );
  await expect(page.locator(".comparison")).toHaveCount(0);
});

test("invalid fields hide stale estimates and recover; inputs survive reload", async ({
  page,
}) => {
  await page.getByLabel("Home price", { exact: true }).fill("");
  await expect(page.getByLabel("Home price", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Let’s check those numbers" }),
  ).toBeVisible();
  await expect(page.locator(".monthly-total")).toHaveCount(0);
  await page.getByLabel("Home price", { exact: true }).fill("750000");
  await page.reload();
  await expect(page.getByLabel("Home price", { exact: true })).toHaveValue(
    "750000",
  );
  await page.getByLabel("Down payment (percent)").fill("101");
  await expect(
    page.getByText("Down payment cannot exceed 100%."),
  ).toBeVisible();
  await page.getByLabel("Down payment (percent)").fill("100");
  await expect(
    page
      .locator(".breakdown .cost-row")
      .filter({ hasText: "Principal & interest" }),
  ).toContainText("$0");
  await expect(page.locator(".monthly-total")).not.toContainText("NaN");
});

test("route redirect and first homepage project link", async ({ page }) => {
  await page.goto("/mortgage");
  await expect(page).toHaveURL(/\/mortgage\/$/);
  await page.goto("/");
  const project = page.getByRole("heading", {
    name: "Room to Grow",
    exact: true,
  });
  await expect(project).toBeVisible();
  await project.click();
  await expect(page).toHaveURL(/\/mortgage\/$/);
});

test("small screens, blocked storage, and keyboard access", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage disabled");
      },
    });
  });
  await page.setViewportSize({ width: 320, height: 720 });
  await page.reload();
  await expect(
    page.getByText("Browser storage is unavailable;", { exact: false }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to calculator" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Home price", { exact: true })).toBeFocused();
});
