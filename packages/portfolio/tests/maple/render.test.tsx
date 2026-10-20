import React from "react";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MapleApp } from "../../src/maple/MapleApp";

// SSR smoke checks require no browser. The interactive flows are covered by the CI browser suite.
const testGlobal = globalThis as unknown as {
  window: { location: { hash: string } };
  localStorage: { getItem: () => string | null };
};
testGlobal.window = { location: { hash: "" } };
testGlobal.localStorage = { getItem: () => null };

for (const [section, text] of Object.entries({
  overview: "A little less lost.",
  stats: "Can you equip your next weapon?",
  skills: "Every point has a purpose.",
  gear: "Useful gear. Sensible upgrades.",
  quests: "Leave a few boxes checked.",
  training: "Find your favorite loop.",
  branches: "Choose how you like to fight.",
  sources: "A guide you can question.",
})) {
  test(`direct #${section} renders the expected guide content`, () => {
    testGlobal.window.location.hash = `#${section}`;
    const html = renderToStaticMarkup(<MapleApp />);
    assert.ok(html.includes(text));
    assert.ok(html.includes('id="guide-content"'));
    assert.ok(html.includes('aria-label="Guide sections"'));
    assert.ok(html.includes('aria-current="page"'));
    assert.ok(!html.includes("undefined"));
  });
}

test("unknown section falls back to overview and blocked storage does not prevent reading", () => {
  testGlobal.window.location.hash = "#missing";
  testGlobal.localStorage.getItem = () => {
    throw new Error("Storage blocked");
  };
  assert.ok(renderToStaticMarkup(<MapleApp />).includes("A little less lost."));
});
