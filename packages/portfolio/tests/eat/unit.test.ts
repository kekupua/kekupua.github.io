import { test } from "node:test";
import assert from "node:assert/strict";
import { defaults, safeWebsite, type Restaurant } from "../../src/eat/model";
import {
  chooseRestaurant,
  filterRestaurants,
  distanceMiles,
  categories,
} from "../../src/eat/filter";
import { openingStatus } from "../../src/eat/hours";
import {
  normalizeElements,
  discoverRestaurants,
  resolveZip,
  OVERPASS,
  OVERPASS_FALLBACK,
} from "../../src/eat/provider";
const center = { lat: 47.6718, lon: -122.1232, label: "Redmond" };
const make = (id: string, overrides: Partial<Restaurant> = {}): Restaurant => ({
  id,
  name: id,
  ...center,
  cuisine: ["korean"],
  address: "Unknown",
  kind: "restaurant",
  ...overrides,
});
test("radius is a straight-line haversine distance and filters remote places", () => {
  assert.equal(distanceMiles(center, center), 0);
  assert.ok(distanceMiles(center, { lat: 47.6062, lon: -122.3321 }) > 10);
  assert.deepEqual(
    filterRestaurants(
      [make("near"), make("far", { lat: 45 })],
      center,
      defaults,
    ).map((x) => x.id),
    ["near"],
  );
});
test("multiple cuisine selection, aliases, exclusion, and unknown cuisine", () => {
  const data = [
    make("k"),
    make("sushi", { cuisine: ["sushi"] }),
    make("unknown", { cuisine: [] }),
    make("other", { cuisine: ["ethiopian"] }),
  ];
  assert.deepEqual(
    filterRestaurants(data, center, {
      ...defaults,
      cuisines: ["korean", "japanese"],
      excluded: ["korean"],
    }).map((x) => x.id),
    ["sushi"],
  );
  assert.deepEqual(categories(data[2]), []);
  assert.deepEqual(
    filterRestaurants(data, center, { ...defaults, cuisines: ["other"] }).map(
      (x) => x.id,
    ),
    ["other"],
  );
});
test("strict filters never infer missing prices, service, or hours", () => {
  const data = [
    make("known", { price: "$$", takeout: true, dineIn: true, hours: "24/7" }),
    make("unknown"),
    make("closed", { hours: "Mo 01:00-02:00" }),
  ];
  for (const p of [
    { budget: "$$" as const },
    { mode: "takeout" as const },
    { mode: "dine-in" as const },
    { openNow: true },
  ])
    assert.deepEqual(
      filterRestaurants(
        data,
        center,
        { ...defaults, ...p },
        [],
        new Date("2026-10-09T19:00:00Z"),
      ).map((x) => x.id),
      ["known"],
    );
  assert.equal(filterRestaurants(data, center, defaults, ["known"]).length, 2);
  assert.equal(
    filterRestaurants(
      [make("quick", { kind: "fast_food" }), make("full")],
      center,
      { ...defaults, meal: "quick" },
    )[0].id,
    "quick",
  );
});
test("hours use venue time zone, midnight carryover, DST, and conservative unknowns", () => {
  const status = (hours: string, date: string) =>
    openingStatus(hours, center.lat, center.lon, new Date(date));
  assert.equal(status("Fr 09:00-17:00", "2026-10-09T16:30:00Z"), "open");
  assert.equal(status("Fr 09:00-17:00", "2026-10-09T15:30:00Z"), "closed");
  assert.equal(status("Fr 22:00-02:00", "2026-10-10T08:00:00Z"), "open");
  assert.equal(status("Fr 22:00-02:00", "2026-10-10T09:00:00Z"), "closed");
  assert.equal(status("Mo-Su 09:00-17:00", "2026-12-07T17:30:00Z"), "open");
  assert.equal(
    status("Mo-Fr 09:00-17:00; PH off", "2026-10-09T19:00:00Z"),
    "unknown",
  );
  assert.equal(status("sunrise-sunset", "2026-10-09T19:00:00Z"), "unknown");
  assert.equal(
    status("Mo-Fr 09:00-12:00,13:00-17:00", "2026-10-09T19:30:00Z"),
    "closed",
  );
  assert.equal(status("Su-Mo 00:00-24:00", "2026-10-12T19:00:00Z"), "open");
});
test("random picker cycles without repeats, then starts again; dismissed pool stays out", () => {
  const data = filterRestaurants(
    [make("a"), make("b"), make("c")],
    center,
    defaults,
    ["c"],
  );
  assert.equal(chooseRestaurant(data, [], () => 0)?.id, "a");
  assert.equal(chooseRestaurant(data, ["a"], () => 0)?.id, "b");
  assert.equal(chooseRestaurant(data, ["a", "b"], () => 0)?.id, "a");
  assert.equal(chooseRestaurant([], [])?.id, undefined);
});
test("OSM normalization includes ways, retains missing data and removes duplicate/invalid entries", () => {
  const data = normalizeElements([
    {
      type: "way",
      id: 1,
      center,
      tags: {
        name: "<script>real name</script>",
        amenity: "restaurant",
        cuisine: "korean;japanese",
        website: "example.com",
        opening_hours: "24/7",
      },
    },
    {
      type: "node",
      id: 2,
      ...center,
      tags: { name: "<script>real name</script>", amenity: "restaurant" },
    },
    { type: "node", id: 3, tags: { name: "Missing position" } },
  ]);
  assert.equal(data.length, 1);
  assert.equal(data[0].website, "https://example.com/");
  assert.equal(data[0].address, "Address not listed");
  assert.equal(data[0].price, undefined);
  assert.equal(data[0].dineIn, undefined);
  assert.equal(safeWebsite("https://user:pass@example.com"), undefined);
  assert.equal(safeWebsite("javascript:alert(1)"), undefined);
});
test("ZIP resolver validates and caches successful real-shaped responses", async () => {
  const original = globalThis.fetch;
  const memory = new Map();
  globalThis.localStorage = {
    getItem: (key) => memory.get(key),
    setItem: (key, value) => memory.set(key, value),
  } as unknown as Storage;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(
      JSON.stringify({
        places: [
          {
            latitude: "47.6718",
            longitude: "-122.1232",
            "place name": "Redmond",
            "state abbreviation": "WA",
          },
        ],
      }),
    );
  };
  try {
    await assert.rejects(
      resolveZip("abc", new AbortController().signal),
      /five-digit/,
    );
    assert.equal(
      (await resolveZip("98052", new AbortController().signal)).label,
      "Redmond, WA 98052",
    );
    await resolveZip("98052", new AbortController().signal);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
  }
});
test("discovery query preserves node coordinates and caches the normalized search", async () => {
  const originalFetch = globalThis.fetch;
  const originalSession = globalThis.sessionStorage;
  const memory = new Map<string, string>();
  globalThis.sessionStorage = {
    getItem: (k: string) => memory.get(k),
    setItem: (k: string, v: string) => {
      memory.set(k, v);
    },
  } as unknown as Storage;
  let calls = 0;
  globalThis.fetch = async (_url, init) => {
    calls++;
    const query = new URLSearchParams(String(init.body)).get("data");
    assert.ok(query.endsWith("out center;"));
    assert.ok(
      query.includes(
        'nwr[amenity~"^(restaurant|fast_food|food_court)$"][name]',
      ),
    );
    return new Response(
      JSON.stringify({
        elements: [
          {
            type: "node",
            id: 1,
            ...center,
            tags: { name: "Real-shaped test record", amenity: "restaurant" },
          },
        ],
      }),
    );
  };
  try {
    const result = await discoverRestaurants(
      center,
      5,
      new AbortController().signal,
    );
    assert.equal(result.restaurants[0].lat, center.lat);
    const cached = await discoverRestaurants(
      center,
      5,
      new AbortController().signal,
    );
    assert.equal(cached.cached, true);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.sessionStorage = originalSession;
  }
});
test("Overpass HTTP 200 partial timeout is rejected; repeated requests are throttled", async () => {
  const original = globalThis.fetch;
  const originalNow = Date.now;
  Date.now = () => originalNow() + 20000;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        elements: [],
        remark: "runtime error: Query timed out",
      }),
    );
  try {
    await assert.rejects(
      discoverRestaurants(center, 5, new AbortController().signal),
      /could not finish/,
    );
    await assert.rejects(
      discoverRestaurants(center, 10, new AbortController().signal),
      /ten seconds/,
    );
  } finally {
    globalThis.fetch = original;
    Date.now = originalNow;
  }
});

test("busy responses respect Retry-After before another network request", async () => {
  const fetchBefore = globalThis.fetch;
  const nowBefore = Date.now;
  let clock = nowBefore() + 40000;
  Date.now = () => clock;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response("busy", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  };
  try {
    await assert.rejects(
      discoverRestaurants(center, 5, new AbortController().signal),
      /busy/,
    );
    clock += 11000;
    await assert.rejects(
      discoverRestaurants(center, 10, new AbortController().signal),
      /49 seconds/,
    );
    assert.equal(calls, 1);
    clock += 50000;
    globalThis.fetch = async () => {
      calls++;
      return new Response(JSON.stringify({ elements: [] }));
    };
    await discoverRestaurants(center, 5, new AbortController().signal);
    assert.equal(calls, 2);
  } finally {
    globalThis.fetch = fetchBefore;
    Date.now = nowBefore;
  }
});

let scenarioTime = Date.now() + 86400000;
async function providerScenario(
  fetcher: typeof fetch,
  run: () => Promise<void>,
) {
  const originalFetch = globalThis.fetch;
  const originalNow = Date.now;
  const originalSession = globalThis.sessionStorage;
  const memory = new Map<string, string>();
  scenarioTime += 3600000;
  Date.now = () => scenarioTime;
  globalThis.fetch = fetcher;
  globalThis.sessionStorage = {
    getItem: (key: string) => memory.get(key) || null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
  } as Storage;
  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
    Date.now = originalNow;
    globalThis.sessionStorage = originalSession;
  }
}

test("DNS, server, and invalid JSON failures fall back once, then cache the result", async () => {
  for (const failure of ["dns", "json", 502, 503, 504] as const) {
    const calls: string[] = [];
    await providerScenario(
      async (url) => {
        calls.push(String(url));
        if (calls.length === 1) {
          if (failure === "dns") throw new TypeError("Failed to fetch");
          if (failure === "json")
            return new Response("<html>proxy error</html>");
          return new Response("unavailable", { status: failure });
        }
        return Response.json({
          elements: [
            {
              type: "node",
              id: 7,
              ...center,
              tags: { name: "Recovered restaurant", amenity: "restaurant" },
            },
          ],
        });
      },
      async () => {
        const result = await discoverRestaurants(
          center,
          5,
          new AbortController().signal,
        );
        assert.equal(result.restaurants[0].name, "Recovered restaurant");
        assert.equal(
          (await discoverRestaurants(center, 5, new AbortController().signal))
            .cached,
          true,
        );
        assert.deepEqual(calls, [OVERPASS, OVERPASS_FALLBACK]);
      },
    );
  }
});

test("client errors and rate limits never trigger another provider", async () => {
  for (const status of [400, 403, 404, 406, 429]) {
    let calls = 0;
    await providerScenario(
      async () => {
        calls++;
        return new Response("unavailable", {
          status,
          headers: { "Retry-After": "60" },
        });
      },
      async () => {
        await assert.rejects(
          discoverRestaurants(center, 5, new AbortController().signal),
        );
        if ([406, 429].includes(status)) {
          scenarioTime += 11000;
          await assert.rejects(
            discoverRestaurants(center, 10, new AbortController().signal),
            /49 seconds/,
          );
        }
        assert.equal(calls, 1);
      },
    );
  }
});

test("fallback failures stop after two attempts and do not cache an empty success", async () => {
  const calls: string[] = [];
  await providerScenario(
    async (url) => {
      calls.push(String(url));
      throw new TypeError("Failed to fetch");
    },
    async () => {
      await assert.rejects(
        discoverRestaurants(center, 5, new AbortController().signal),
        /Could not reach/,
      );
      assert.equal(sessionStorage.getItem("eat:search:v1"), null);
      await assert.rejects(
        discoverRestaurants(center, 5, new AbortController().signal),
        /ten seconds/,
      );
      assert.deepEqual(calls, [OVERPASS, OVERPASS_FALLBACK]);
    },
  );
});

test("an unresponsive endpoint is aborted before trying the fallback", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let firstSignal: AbortSignal;
  const calls: string[] = [];
  await providerScenario(
    async (url, init) => {
      calls.push(String(url));
      if (calls.length === 1) {
        firstSignal = init.signal;
        return new Promise<Response>((_, reject) => {
          init.signal.addEventListener(
            "abort",
            () => reject(init.signal.reason),
            { once: true },
          );
        });
      }
      return Response.json({ elements: [] });
    },
    async () => {
      const request = discoverRestaurants(
        center,
        5,
        new AbortController().signal,
      );
      t.mock.timers.tick(25000);
      await request;
      assert.equal(firstSignal.aborted, true);
      assert.deepEqual(calls, [OVERPASS, OVERPASS_FALLBACK]);
    },
  );
});

test("cancelling a search aborts the active request without a fallback or cache write", async () => {
  let calls = 0;
  await providerScenario(
    async (_url, init) => {
      calls++;
      return new Promise<Response>((_, reject) => {
        init.signal.addEventListener(
          "abort",
          () => reject(init.signal.reason),
          { once: true },
        );
      });
    },
    async () => {
      const controller = new AbortController();
      const request = discoverRestaurants(center, 5, controller.signal);
      controller.abort();
      await assert.rejects(request, /aborted/);
      assert.equal(calls, 1);
      assert.equal(sessionStorage.getItem("eat:search:v1"), null);
    },
  );
});

test("HTTP-date Retry-After is honored even when the fallback is rate limited", async () => {
  let calls = 0;
  await providerScenario(
    async () => {
      calls++;
      if (calls === 1) return new Response("unavailable", { status: 503 });
      return new Response("busy", {
        status: 429,
        headers: {
          "Retry-After": new Date(scenarioTime + 120000).toUTCString(),
        },
      });
    },
    async () => {
      await assert.rejects(
        discoverRestaurants(center, 5, new AbortController().signal),
        /busy/,
      );
      scenarioTime += 60000;
      await assert.rejects(
        discoverRestaurants(center, 5, new AbortController().signal),
        /60 seconds/,
      );
      assert.equal(calls, 2);
    },
  );
});

test("ZIP responses without valid coordinates never resolve to the equator", async () => {
  const original = globalThis.fetch;
  try {
    for (const coords of [
      { latitude: "", longitude: "" },
      { latitude: "91", longitude: "-122" },
    ]) {
      globalThis.fetch = async () => Response.json({ places: [coords] });
      await assert.rejects(
        resolveZip("00000", new AbortController().signal),
        /No geographic center/,
      );
    }
  } finally {
    globalThis.fetch = original;
  }
});
