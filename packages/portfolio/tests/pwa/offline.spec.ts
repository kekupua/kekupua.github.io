import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const config = JSON.parse(await readFile("dist/.vite/pwa.json", "utf8"));
const prefix = "sean-portfolio-";
async function command(page: Page, type = "CACHE_STATUS") {
  return page.evaluate(async (type) => {
    const reg = await navigator.serviceWorker.ready;
    return new Promise<{ ok: boolean; bytes: number; entries: number }>(
      (resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          channel.port1.close();
          resolve(event.data);
        };
        reg.active!.postMessage({ type }, [channel.port2]);
      },
    );
  }, type);
}
async function ready(page: Page, url = "/") {
  await page.goto(url);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect
    .poll(() =>
      page.evaluate(() => Boolean(navigator.serviceWorker.controller)),
    )
    .toBe(true);
  expect((await command(page)).ok).toBe(true);
}
async function paths(page: Page) {
  return page.evaluate(async (prefix) => {
    const keys = await caches.keys();
    return (
      await Promise.all(
        keys
          .filter((key) => key.startsWith(prefix))
          .map(async (key) =>
            (await (await caches.open(key)).keys()).map(
              (request) => new URL(request.url).pathname,
            ),
          ),
      )
    ).flat();
  }, prefix);
}

test("install shell excludes project bundles and media; home works offline", async ({
  page,
  context,
  request,
}) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script")
      scripts.push(new URL(request.url()).pathname);
  });
  await ready(page);
  const manifest = await (await request.get("/manifest.json")).json();
  expect(manifest).toMatchObject({
    id: "/",
    scope: "/",
    start_url: "/",
    display: "standalone",
  });
  expect(manifest.icons.map((icon) => icon.sizes)).toEqual([
    "192x192",
    "512x512",
  ]);
  for (const icon of manifest.icons)
    expect((await request.get(icon.src)).ok()).toBe(true);
  const cached = await paths(page);
  const shell = await page.evaluate(async (prefix) => {
    const name = (await caches.keys()).find((name) =>
      name.startsWith(`${prefix}shell-`),
    )!;
    return (await (await caches.open(name)).keys()).map(
      (r) => new URL(r.url).pathname,
    );
  }, prefix);
  expect(shell.sort()).toEqual([...config.shell].sort());
  for (const files of Object.values(config.routes) as string[][]) {
    for (const file of files.filter((file) => !config.shell.includes(file))) {
      expect(cached).not.toContain(file);
      expect(scripts).not.toContain(file);
    }
  }
  expect(
    cached.some(
      (path) => path.startsWith("/learn/") || path.startsWith("/hearthstone/"),
    ),
  ).toBe(false);
  expect(shell.some((path) => path.startsWith("/images/"))).toBe(false);
  expect(cached).not.toContain("/maple/");
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: /Sean Teramae/, level: 1 }),
  ).toBeVisible();
  await page.goto("/maple/");
  await expect(
    page.getByRole("heading", { name: "Open this project online first" }),
  ).toBeVisible();
});

test("lazy hash project downloads when visited and survives offline reload", async ({
  page,
  context,
}) => {
  await ready(page);
  await page.goto("/#/meal-prep");
  await expect(page.locator("h1")).toBeVisible();
  await command(page);
  const cached = await paths(page);
  for (const path of config.routes["/meal-prep"])
    expect(cached).toContain(path);
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "This project could not load" }),
  ).toHaveCount(0);
  await expect(page.locator("h1")).toContainText("Meal");
});

test("direct project first visit caches its eager graph without a reload", async ({
  page,
  context,
}) => {
  await ready(page, "/mortgage/");
  await command(page);
  for (const path of config.pages["/mortgage/"])
    expect(await paths(page)).toContain(path);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("h1")).toBeVisible();
  expect(await page.title()).toContain("Room to Grow");
});

test("unvisited lazy project has a recovery screen offline", async ({
  page,
  context,
}) => {
  await ready(page);
  await context.setOffline(true);
  await page.goto("/#/meal-prep");
  await expect(
    page.getByRole("heading", { name: "This project could not load" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to portfolio", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: /Sean Teramae/, level: 1 }),
  ).toBeVisible();
});

test("cache bounds, private URL exclusions, clear control, and worker coexistence", async ({
  page,
  context,
}) => {
  await ready(page);
  await page.evaluate(() => {
    localStorage.setItem("pwa-test-preference", "keep");
  });
  const files = Object.entries(config.sizes)
    .filter(
      ([path, size]) =>
        path.startsWith("/images/") && Number(size) < config.maxFileBytes,
    )
    .map(([path]) => path)
    .slice(0, 80);
  await page.evaluate(async (files) => {
    await Promise.all(files.map((file) => fetch(file)));
  }, files);
  const status = await command(page);
  expect(status.entries).toBeLessThanOrEqual(config.maxEntries);
  expect(status.bytes).toBeLessThanOrEqual(config.maxBytes);
  expect(status.entries).toBeGreaterThan(0);
  const large = Object.entries(config.sizes).find(
    ([path, size]) =>
      path.startsWith("/images/") && Number(size) > config.maxFileBytes,
  );
  if (large) {
    await page.evaluate((path) => fetch(path), large[0]);
    await command(page);
    expect(await paths(page)).not.toContain(large[0]);
  }
  await page.evaluate(() => fetch("/manifest.json?private=example"));
  expect(
    await page.evaluate(async (prefix) => {
      const names = (await caches.keys()).filter((name) =>
        name.startsWith(prefix),
      );
      const requests = (
        await Promise.all(
          names.map(async (name) => (await caches.open(name)).keys()),
        )
      ).flat();
      return requests.some((request) => new URL(request.url).search.length > 0);
    }, prefix),
  ).toBe(false);
  const other = await context.newPage();
  await other.goto("/learn/");
  await expect(other.getByRole("status")).toHaveText(
    "✓ Ready to play offline",
    { timeout: 30000 },
  );
  expect(
    await other.evaluate(() => navigator.serviceWorker.controller?.scriptURL),
  ).toContain("/learn/sw.js");
  const learnNames = await page.evaluate(async () =>
    (await caches.keys()).filter((name) => name.startsWith("little-wonders-")),
  );
  // Clearing the portfolio runtime does not erase a separate app or user data.
  await page.getByText("Install & offline storage", { exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Clear downloaded project files" }),
  ).toBeEnabled();
  await page
    .getByRole("button", { name: "Clear downloaded project files" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Downloaded project files cleared",
  );
  expect((await command(page)).entries).toBe(0);
  expect(
    await page.evaluate(() => localStorage.getItem("pwa-test-preference")),
  ).toBe("keep");
  expect(
    await page.evaluate(async () =>
      (await caches.keys()).filter((name) =>
        name.startsWith("little-wonders-"),
      ),
    ),
  ).toEqual(learnNames);
  await context.setOffline(true);
  await other.reload();
  await expect(other.locator("h1")).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: /Sean Teramae/, level: 1 }),
  ).toBeVisible();
});

test("activation deletes only old portfolio caches", async ({ page }) => {
  await page.goto("/offline.html");
  await page.evaluate(async () => {
    await caches.open("sean-portfolio-runtime-old");
    await caches.open("little-wonders-test");
    await caches.open("unrelated-project");
  });
  await ready(page);
  const names = await page.evaluate(() => caches.keys());
  expect(names).not.toContain("sean-portfolio-runtime-old");
  expect(names).toContain("little-wonders-test");
  expect(names).toContain("unrelated-project");
});
