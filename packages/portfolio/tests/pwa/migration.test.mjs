import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const retirement = await readFile("public/learn/sw.js", "utf8");
const registration = ts.transpileModule(
  (await readFile("src/pwa/register.ts", "utf8")).replace(
    "import.meta.env.PROD",
    "true",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;

test("legacy worker update retires itself and only its own caches", async () => {
  const handlers = {};
  const actions = [];
  vm.runInNewContext(retirement, {
    self: {
      addEventListener: (name, handler) => {
        handlers[name] = handler;
      },
      registration: {
        unregister: async () => {
          actions.push("unregister");
        },
      },
    },
    caches: {
      keys: async () => [
        "little-wonders-old",
        "sean-portfolio-runtime-new",
        "unrelated",
      ],
      delete: async (name) => {
        actions.push(name);
      },
    },
  });
  let finished;
  handlers.activate({
    waitUntil: (task) => {
      finished = task;
    },
  });
  await finished;
  assert.deepEqual(actions, ["unregister", "little-wonders-old"]);
  assert.equal(handlers.fetch, undefined);
});

test("shared registration retires exactly the legacy scope before registering root", async () => {
  const actions = [];
  const active = { postMessage: (message) => actions.push(message.type) };
  const registrations = [
    ["/learn/", "/learn/sw.js"],
    ["/unrelated/", "/unrelated/sw.js"],
    ["/", "/sw.js"],
  ].map(([scope, script]) => ({
    scope: `https://seanteramae.com${scope}`,
    active: { scriptURL: `https://seanteramae.com${script}` },
    unregister: async () => {
      actions.push(`unregister:${scope}`);
    },
  }));
  const exports = {};
  vm.runInNewContext(registration, {
    exports,
    URL,
    navigator: {
      serviceWorker: {
        getRegistrations: async () => registrations,
        register: async (path, options) => {
          actions.push(`register:${path}:${options.scope}`);
          return { active };
        },
      },
    },
    caches: {
      keys: async () => ["little-wonders-old", "unrelated"],
      delete: async (name) => {
        actions.push(`delete:${name}`);
      },
    },
    window: { addEventListener() {} },
  });
  assert.ok(await exports.registerPortfolioPwa());
  await exports.registerPortfolioPwa();
  assert.deepEqual(actions, [
    "unregister:/learn/",
    "delete:little-wonders-old",
    "register:/sw.js:/",
    "CACHE_VISITED_PAGE",
  ]);
});
