import { expect, test, type Page } from "@playwright/test";

async function ready(page: Page, url = "/learn/") {
  await page.goto(url);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect
    .poll(() =>
      page.evaluate(() => navigator.serviceWorker.controller?.scriptURL),
    )
    .toBe("http://127.0.0.1:4173/sw.js");
  await settled(page);
}

async function settled(page: Page) {
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await new Promise<void>((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = () => {
        channel.port1.close();
        resolve();
      };
      registration.active!.postMessage({ type: "CACHE_STATUS" }, [
        channel.port2,
      ]);
    });
  });
}

async function saved(page: Page) {
  return page.evaluate(async () => {
    const paths: string[] = [];
    for (const name of await caches.keys())
      if (name.startsWith("sean-portfolio-runtime-"))
        for (const request of await (await caches.open(name)).keys())
          paths.push(new URL(request.url).pathname);
    return paths;
  });
}

test("shared installation, on-demand media, offline deep links, and audio ranges", async ({
  page,
  context,
  request,
}) => {
  const downloads: string[] = [];
  page.on("request", (r) => downloads.push(new URL(r.url()).pathname));
  await ready(page);
  await expect(page.getByRole("status")).toContainText(
    "Saved files may be removed",
  );
  expect(downloads).not.toContain("/learn/animals/lion.webp");
  expect(downloads).not.toContain("/learn/audio/reward-music.mp3");
  expect(await saved(page)).not.toContain("/learn/animals/lion.webp");
  const manifestUrl = await page
    .locator('link[rel="manifest"]')
    .getAttribute("href");
  expect(manifestUrl).toBe("/manifest.json");
  const manifest = await (await request.get(manifestUrl!)).json();
  expect(manifest).toMatchObject({
    scope: "/",
    start_url: "/",
    display: "standalone",
  });
  for (const icon of manifest.icons)
    expect((await request.get(icon.src)).ok()).toBeTruthy();

  // Only media actually requested after opening the app enters the shared cache.
  await page.evaluate(async () => {
    await fetch("/learn/animals/dog.webp");
    await fetch("/learn/audio/reward-music.mp3", {
      headers: { Range: "bytes=0-99" },
    });
  });
  await settled(page);
  expect(await saved(page)).toContain("/learn/animals/dog.webp");
  expect(await saved(page)).toContain("/learn/audio/reward-music.mp3");
  expect(await saved(page)).not.toContain("/learn/animals/lion.webp");
  await context.setOffline(true);
  for (const category of ["letters", "animals", "colors"])
    for (const mode of ["explore", "find"]) {
      await page.goto(`/learn/#/${category}/${mode}`);
      await page.reload();
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Hear again" }),
      ).toHaveCount(0);
    }
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

test("learning and portfolio routes use the same root worker", async ({
  page,
  context,
}) => {
  await ready(page);
  const other = await context.newPage();
  for (const route of [
    "/",
    "/#/meal-prep",
    "/#/recipesByGpt",
    "/#/random-hearthstone",
  ]) {
    await ready(other, route);
    await expect(other.locator("#root")).not.toBeEmpty();
  }
});
