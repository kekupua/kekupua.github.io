import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const template = await readFile("tools/pwa/worker.js", "utf8");
function harness(limits = {}) {
  const origin = "https://seanteramae.com";
  const handlers = {};
  const cachesByName = new Map();
  const options = { failWrites: false, failReads: false };
  const config = {
    version: "test",
    shell: [],
    pages: {},
    routes: {},
    sizes: {},
    maxBytes: 12,
    maxFileBytes: 8,
    maxEntries: 3,
    ...limits,
  };
  const cacheStorage = {
    async open(name) {
      if (options.failReads) throw new Error("Storage disabled");
      if (!cachesByName.has(name)) cachesByName.set(name, new Map());
      const items = cachesByName.get(name);
      const key = (request) =>
        typeof request === "string"
          ? new URL(request, origin).href
          : request.url;
      return {
        async match(request) {
          return items.get(key(request))?.clone();
        },
        async put(request, response) {
          if (options.failWrites) throw new Error("QuotaExceededError");
          items.set(key(request), response.clone());
        },
        async delete(request) {
          return items.delete(key(request));
        },
        async keys() {
          return [...items.keys()].map((url) => new Request(url));
        },
      };
    },
  };
  let networkResponse;
  const self = {
    location: { origin },
    addEventListener: (type, listener) => {
      handlers[type] = listener;
    },
    clients: {},
  };
  vm.runInNewContext(template, {
    CONFIG: config,
    self,
    caches: cacheStorage,
    URL,
    Headers,
    Response,
    fetch: async () => networkResponse.clone(),
  });
  async function load(path, body = "123456", init = {}, requestInit = {}) {
    config.sizes[path.split("?")[0]] = body.length;
    networkResponse = new Response(body, init);
    const tasks = [];
    let result;
    handlers.fetch({
      request: new Request(`${origin}${path}`, requestInit),
      waitUntil: (task) => tasks.push(task),
      respondWith: (task) => {
        result = task;
      },
    });
    const response = await result;
    await Promise.all(tasks);
    return response;
  }
  const entries = () =>
    [
      ...(cachesByName.get("sean-portfolio-runtime-test") || new Map()).keys(),
    ].map((url) => new URL(url).pathname);
  return { load, entries, options };
}

test("actual response bodies enforce the byte budget and evict oldest entries", async () => {
  const w = harness();
  for (const path of ["/a.js", "/b.js", "/c.js"])
    assert.equal(await (await w.load(path)).text(), "123456");
  assert.deepEqual(w.entries(), ["/b.js", "/c.js"]);
  await w.load("/oversize.js", "123456789");
  assert.deepEqual(w.entries(), ["/b.js", "/c.js"]);
});

test("entry limit and sensitive/error response exclusions apply independently", async () => {
  const w = harness({ maxBytes: 100, maxEntries: 2 });
  for (const path of ["/a.js", "/b.js", "/c.js"]) await w.load(path, "x");
  assert.deepEqual(w.entries(), ["/b.js", "/c.js"]);
  for (const policy of ["private", "no-store"])
    await w.load(`/${policy}.json`, "x", {
      headers: { "cache-control": policy },
    });
  await w.load("/failed.js", "error", { status: 500 });
  assert.deepEqual(w.entries(), ["/b.js", "/c.js"]);
  assert.equal(await w.load("/c.js?token=example"), undefined);
  assert.equal(
    await w.load("/range.js", "x", {}, { headers: { Range: "bytes=0-1" } }),
    undefined,
  );
});

test("storage and quota failures still return the live response", async () => {
  const w = harness();
  w.options.failWrites = true;
  assert.equal(await (await w.load("/quota.js")).text(), "123456");
  assert.deepEqual(w.entries(), []);
  w.options.failReads = true;
  assert.equal(await (await w.load("/no-storage.js")).text(), "123456");
});
