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
    await page.addInitScript(() => {
      const original = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () {
        const result = original.call(this);
        const src = this.src;
        result
          .then(() => {
            document.documentElement.dataset.playingAudio = src;
          })
          .catch(() => {});
        return result;
      };
    });
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
      await expect(page.locator("html")).toHaveAttribute(
        "data-playing-audio",
        `http://127.0.0.1:4173/learn/audio/explore-${category.id}-${items[i].id}.mp3`,
      );
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

test("home tiles, category menus, replay, mute, and browser history", async ({
  page,
}) => {
  await page.goto("/learn");
  await page.getByRole("button", { name: "LETTERS", exact: true }).click();
  await page.getByRole("button", { name: /Explore the Alphabet/ }).click();
  await page.getByRole("button", { name: "Turn sound off" }).click();
  await expect(page.getByRole("button", { name: "Hear again" })).toBeDisabled();
  await page.getByRole("button", { name: "Turn sound on" }).click();
  await expect(page.getByRole("button", { name: "Hear again" })).toBeEnabled();
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
    }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width);
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
