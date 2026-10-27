import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const script = await readFile("dist/sw.js", "utf8");
function worker() {
  const handlers = {};
  const shown = [];
  const opened = [];
  const self = {
    location: { origin: "https://seanteramae.com" },
    addEventListener: (name, fn) => {
      handlers[name] = fn;
    },
    registration: {
      showNotification: async (...args) => {
        shown.push(args);
      },
    },
    clients: {
      matchAll: async () => [],
      openWindow: async (url) => {
        opened.push(url);
      },
    },
  };
  vm.runInNewContext(script, { self, URL, Headers, Response });
  async function dispatch(name, fields) {
    const tasks = [];
    handlers[name]({ ...fields, waitUntil: (promise) => tasks.push(promise) });
    await Promise.all(tasks);
  }
  return { self, shown, opened, dispatch };
}

test("push renders a notification and click opens its same-origin project", async () => {
  const w = worker();
  await w.dispatch("push", {
    data: {
      json: () => ({
        title: "Reminder",
        body: "Take a break",
        url: "/future/#/today",
        tag: "daily",
      }),
    },
  });
  const [title, options] = w.shown[0];
  assert.equal(title, "Reminder");
  assert.equal(options.body, "Take a break");
  assert.equal(options.tag, "portfolio-daily");
  assert.equal(options.icon, "/192.png");
  let closed = false;
  await w.dispatch("notificationclick", {
    notification: {
      data: options.data,
      close: () => {
        closed = true;
      },
    },
  });
  assert.equal(closed, true);
  assert.equal(w.opened[0], "https://seanteramae.com/future/#/today");
});

test("malformed payloads and external notification destinations use safe defaults", async () => {
  const w = worker();
  for (const data of [
    undefined,
    {
      json: () => {
        throw new Error("bad JSON");
      },
    },
    { json: () => null },
    { json: () => 42 },
  ]) {
    await w.dispatch("push", { data });
    assert.equal(w.shown.at(-1)[0], "Sean Teramae");
  }
  for (const url of [
    "https://example.com/phish",
    "javascript:alert(1)",
    "//example.com",
    "https://[",
  ]) {
    await w.dispatch("push", { data: { json: () => ({ url }) } });
    assert.equal(w.shown.at(-1)[1].data.url, "https://seanteramae.com/");
  }
});

test("notification clicks focus an existing destination window", async () => {
  const w = worker();
  let focused = false;
  w.self.clients.matchAll = async () => [
    {
      url: "https://seanteramae.com/#/meal-prep",
      focus: async () => {
        focused = true;
      },
    },
  ];
  await w.dispatch("notificationclick", {
    notification: { data: { url: "/#/meal-prep" }, close() {} },
  });
  assert.equal(focused, true);
  assert.equal(w.opened.length, 0);
});
