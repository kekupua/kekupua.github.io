import React from "react";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MapleApp } from "../../src/maple/MapleApp";

const testGlobal = globalThis as unknown as {
  window: { location: { hash: string } };
  localStorage: unknown;
};
testGlobal.window = { location: { hash: "" } };
Object.defineProperty(testGlobal, "localStorage", {
  get() {
    throw new Error("Reference pages must not require storage");
  },
});
for (const [section, heading] of Object.entries({
  overview: "adventure starts here.",
  mobs: "Mobs &amp; drops",
  skills: "Skills",
  gear: "Equipment",
  quests: "Quests",
  training: "Training",
  branches: "Choose your path",
  sources: "Sources &amp; credits",
})) {
  test(`direct #${section} renders a readable reference without calculator controls or storage`, () => {
    testGlobal.window.location.hash = `#${section}`;
    const html = renderToStaticMarkup(<MapleApp />);
    assert.ok(html.includes(heading));
    assert.ok(html.includes('id="guide-content"'));
    assert.ok(html.includes('aria-label="Guide sections"'));
    assert.ok(html.includes('aria-current="page"'));
    assert.ok(!html.includes('type="range"'));
    assert.ok(!html.includes('type="number"'));
    assert.ok(!html.includes('type="checkbox"'));
    assert.ok(!html.includes("undefined"));
  });
}
test("future jobs are announced as disabled links without destinations", () => {
  testGlobal.window.location.hash = "#missing";
  const html = renderToStaticMarkup(<MapleApp />);
  assert.equal((html.match(/aria-disabled="true"/g) || []).length, 3);
  assert.ok(html.includes("adventure starts here."));
});
