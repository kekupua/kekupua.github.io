import { expect, test } from "@playwright/test";

import {
  activityNames,
  categories,
  choicesFor,
  content,
} from "../../src/learn/content";

for (const category of categories) {
  const items = content[category.id];
  test(`${category.id}: explore every item and navigation boundaries`, async ({
    page,
  }) => {
    await page.goto(`/learn/#/${category.id}/explore`);
    await expect(
      page.getByRole("heading", { name: activityNames[category.id][0] }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Previous", exact: true }),
    ).toBeDisabled();
    for (let i = 0; i < items.length; i++) {
      const name =
        category.id === "letters"
          ? `${items[i].letter} for ${items[i].name}`
          : items[i].name;
      await page.getByRole("button", { name, exact: true }).click();
      await expect(
        page.getByRole("button", { name, exact: true }),
      ).toBeVisible();
      if (i < items.length - 1)
        await page.getByRole("button", { name: "Next", exact: true }).click();
    }
    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Previous", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Next", exact: true }),
    ).toBeEnabled();
    await page.getByRole("button", { name: "Home", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Let’s play & learn" }),
    ).toBeVisible();
  });
  test(`${category.id}: repeated mistakes, success, and explicit next round`, async ({
    page,
  }) => {
    await page.goto(`/learn/#/${category.id}/find`);
    for (let round = 0; round < 4; round++) {
      const { answer, choices } = choicesFor(items, round);
      const buttonName = (id: string) =>
        category.id === "letters"
          ? `Letter ${items.find((item) => item.id === id)!.letter}`
          : items.find((item) => item.id === id)!.name;
      const wrong = choices.find((choice) => choice.id !== answer.id)!;
      for (let retry = 0; retry < 3; retry++) {
        await page
          .getByRole("button", { name: buttonName(wrong.id), exact: true })
          .click();
        await expect(page.getByRole("status")).toHaveText("Let’s try again!");
        await expect(
          page.getByRole("button", {
            name: buttonName(answer.id),
            exact: true,
          }),
        ).toBeEnabled();
        await expect(
          page.getByRole("button", { name: "Next", exact: true }),
        ).toHaveCount(0);
      }
      await page
        .getByRole("button", { name: buttonName(answer.id), exact: true })
        .click();
      await expect(page.getByRole("status")).toContainText("You found it!");
      await expect(page.locator(".learning-card.selected")).toHaveCount(1);
      await expect(
        page.getByRole("button", { name: buttonName(answer.id), exact: true }),
      ).toBeDisabled();
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await expect(page.locator(".learning-card.selected")).toHaveCount(0);
    }
  });
}

test("home tiles, category menus, mute, and browser history", async ({
  page,
}) => {
  await page.goto("/learn");
  await page.getByRole("button", { name: "LETTERS", exact: true }).click();
  await page.getByRole("button", { name: /Explore the Alphabet/ }).click();
  await page.getByRole("button", { name: "Turn sound off" }).click();
  await expect(
    page.getByRole("button", { name: "Turn sound on" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Turn sound on" }).click();
  await expect(page.getByRole("button", { name: "Hear again" })).toHaveCount(0);
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.goBack();
  await expect(
    page.getByRole("button", { name: /Explore the Alphabet/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Explore the Alphabet/ }).click();
  await expect(page.getByRole("button", { name: "A for Apple" })).toBeVisible();
});

test("touch layout, reduced motion, safety, and screenshots", async ({
  page,
}, testInfo) => {
  const outbound: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173/"))
      outbound.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  const paths = [
    "",
    "letters",
    "letters/explore",
    "letters/find",
    "animals/explore",
    "animals/find",
    "colors/explore",
    "colors/find",
  ];
  for (const path of paths) {
    await page.goto(`/learn/#/${path}`);
    await expect(
      page.getByRole("button", { name: "Home", exact: true }),
    ).toBeVisible();
    expect(await page.locator("a, iframe, form").count()).toBe(0);
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      height: document.documentElement.clientHeight,
      scrollHeight: document.documentElement.scrollHeight,
    }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width);
    expect(dimensions.scrollHeight).toBeLessThanOrEqual(dimensions.height + 1);
    const mainBox = await page.locator("main").boundingBox();
    expect(mainBox!.height).toBeGreaterThan(dimensions.height * 0.7);
    const images = await page
      .locator("img.animal-photo")
      .evaluateAll((images) =>
        images.every(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
      );
    expect(images).toBeTruthy();
    for (const button of await page.getByRole("button").all()) {
      const box = await button.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    if (process.env.LEARN_SCREENSHOTS) {
      await page.screenshot({
        path: `../../docs/learn/${path.replaceAll("/", "-") || "home"}${testInfo.project.name === "desktop" ? "" : `-${testInfo.project.name}`}.png`,
        fullPage: true,
      });
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Red", exact: true }).click();
  expect(
    await page
      .locator(".learning-card.selected")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(outbound).toEqual([]);
  expect(errors).toEqual([]);
});

test("deep-link changes reset an exhausted alphabet and unknown URLs go home", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/learn/#/letters/explore");
  for (let i = 0; i < 25; i++)
    await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.evaluate(() => {
    window.location.hash = "/animals/explore";
  });
  await expect(
    page.getByRole("button", { name: "Dog", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Previous", exact: true }),
  ).toBeDisabled();
  await page.goto("/learn/#/unknown/activity");
  await expect(
    page.getByRole("heading", { name: "Let’s play & learn" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("nonverbal effects, success-only music, silent retries, and stopping music", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const players: HTMLAudioElement[] = [];
    (window as unknown as { learnPlayers: HTMLAudioElement[] }).learnPlayers =
      players;
    const Original = window.Audio;
    window.Audio = class extends Original {
      constructor(src?: string) {
        super(src);
        players.push(this);
      }
    };
  });
  await page.goto("/learn/#/letters/find");
  await expect(page.locator(".target-letter")).toHaveText("A");
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { learnPlayers: HTMLAudioElement[] }
      ).learnPlayers.every((player) => !player.src),
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Letter B", exact: true }).click();
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { learnPlayers: HTMLAudioElement[] }
      ).learnPlayers.every((player) => !player.src),
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Letter A", exact: true }).click();
  await expect
    .poll(() =>
      page.evaluate(() =>
        (
          window as unknown as { learnPlayers: HTMLAudioElement[] }
        ).learnPlayers.map((player) => ({
          name: player.src.split("/").pop(),
          paused: player.paused,
        })),
      ),
    )
    .toEqual([
      { name: "correct.mp3", paused: false },
      { name: "reward-music.mp3", paused: false },
    ]);
  await page.getByRole("button", { name: "Next", exact: true }).click();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { learnPlayers: HTMLAudioElement[] })
          .learnPlayers[1].paused,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Letter B", exact: true }).click();
  await page.getByRole("button", { name: "Turn sound off" }).click();
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { learnPlayers: HTMLAudioElement[] }
      ).learnPlayers.every((player) => player.paused),
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("button", { name: "Letter C", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("You found it!");
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { learnPlayers: HTMLAudioElement[] }
      ).learnPlayers.every((player) => player.paused),
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Home", exact: true }).click();
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { learnPlayers: HTMLAudioElement[] }
      ).learnPlayers.every((player) => player.paused),
    ),
  ).toBeTruthy();
});

test("small phone uses the viewport without clipping activity controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  for (const path of [
    "",
    "animals",
    "letters/explore",
    "animals/explore",
    "colors/explore",
    "letters/find",
    "animals/find",
    "colors/find",
  ]) {
    await page.goto(`/learn/#/${path}`);
    const size = await page.evaluate(() => ({
      height: innerHeight,
      scroll: document.documentElement.scrollHeight,
    }));
    expect(size.scroll).toBeLessThanOrEqual(size.height + 1);
    if (path.endsWith("/find")) {
      const correct = path.startsWith("letters")
        ? "Letter A"
        : path.startsWith("animals")
          ? "Dog"
          : "Red";
      await page.getByRole("button", { name: correct, exact: true }).click();
      await expect(
        page.getByRole("button", { name: "Next", exact: true }),
      ).toBeInViewport();
    }
  }
});
