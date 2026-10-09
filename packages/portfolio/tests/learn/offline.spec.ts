import { expect, test } from "@playwright/test";

import { animals } from "../../src/learn/content";

test("installation assets, full offline cache, deep refresh, and audio byte ranges", async ({
  page,
  context,
  request,
}) => {
  await page.goto("/learn/");
  await expect(page.getByRole("status")).toHaveText("✓ Ready to play offline", {
    timeout: 30000,
  });
  await page.reload();
  expect(
    await page.evaluate(() => navigator.serviceWorker.controller?.scriptURL),
  ).toContain("/learn/sw.js");
  const manifest = await (
    await request.get("/learn/manifest.webmanifest")
  ).json();
  expect(manifest.scope).toBe("/learn/");
  expect(manifest.start_url).toBe("/learn/");
  expect(manifest.display).toBe("standalone");
  for (const icon of manifest.icons)
    expect((await request.get(icon.src)).ok()).toBeTruthy();
  await context.setOffline(true);
  for (const category of ["letters", "animals", "colors"]) {
    for (const mode of ["explore", "find"]) {
      await page.goto(`/learn/#/${category}/${mode}`);
      await page.reload();
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Hear again" }),
      ).toHaveCount(0);
    }
  }
  // Every local effect, music track, and photo is cached before first use.
  const ids = ["navigate", "tap", "correct", "reward-music"]
    .map((id) => `/learn/audio/${id}.mp3`)
    .concat(animals.map((animal) => animal.image!));
  const results = await page.evaluate(
    async (ids) =>
      Promise.all(
        ids.map(async (id) => {
          const response = await fetch(id);
          return (
            response.ok && (await response.arrayBuffer()).byteLength > 1000
          );
        }),
      ),
    ids,
  );
  expect(results.every(Boolean)).toBeTruthy();
  const range = await page.evaluate(async () => {
    const response = await fetch("/learn/audio/reward-music.mp3", {
      headers: { Range: "bytes=0-99" },
    });
    return {
      status: response.status,
      length: (await response.arrayBuffer()).byteLength,
      contentRange: response.headers.get("content-range"),
    };
  });
  expect(range.status).toBe(206);
  expect(range.length).toBe(100);
  expect(range.contentRange).toMatch(/^bytes 0-99\//);
  const duration = await page.evaluate(
    () =>
      new Promise<number>((resolve, reject) => {
        const audio = new Audio("/learn/audio/reward-music.mp3");
        audio.onloadedmetadata = () => resolve(audio.duration);
        audio.onerror = () =>
          reject(new Error("Offline audio could not decode"));
      }),
  );
  expect(duration).toBeGreaterThan(7);
  expect(duration).toBeLessThan(9);
  await page.goto("/learn/#/letters/find");
  await page.getByRole("button", { name: "Letter A" }).click();
  await expect(page.getByRole("status")).toContainText("You found it!");
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Let’s play & learn" }),
  ).toBeVisible();
});

test("worker scope leaves existing portfolio routes uncontrolled", async ({
  page,
  context,
}) => {
  await page.goto("/learn/");
  await expect(page.getByRole("status")).toHaveText("✓ Ready to play offline", {
    timeout: 30000,
  });
  const other = await context.newPage();
  for (const route of [
    "/",
    "/#/meal-prep",
    "/#/recipesByGpt",
    "/#/random-hearthstone",
  ]) {
    await other.goto(route);
    await expect(other.locator("#root")).not.toBeEmpty();
    expect(
      await other.evaluate(() => navigator.serviceWorker.controller),
    ).toBeNull();
  }
});
