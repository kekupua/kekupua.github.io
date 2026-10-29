/* CONFIG is injected by build-pwa.mjs. No imports or CDN dependencies. */
const PREFIX = "sean-portfolio-";
const SHELL = `${PREFIX}shell-${CONFIG.version}`;
const RUNTIME = `${PREFIX}runtime-${CONFIG.version}`;
const shellPaths = new Set(CONFIG.shell);
let writes = Promise.resolve();
let messages = Promise.resolve();
let runtimeSizes;

async function runtimeIndex(cache) {
  if (!runtimeSizes) {
    runtimeSizes = new Map();
    for (const request of await cache.keys()) {
      const response = await cache.match(request);
      if (response)
        runtimeSizes.set(
          request.url,
          Number(response.headers.get("x-portfolio-bytes") || 0),
        );
    }
  }
  return runtimeSizes;
}

const pagePath = (path) =>
  path === "/index.html" ? "/" : path.replace(/index\.html$/, "");
function eligible(request) {
  const url = new URL(request.url);
  return (
    request.method === "GET" &&
    url.origin === self.location.origin &&
    !url.search &&
    Object.hasOwn(CONFIG.sizes, url.pathname)
  );
}

self.addEventListener("install", (event) => {
  // Only the eager home shell is fetched at installation. Never skipWaiting:
  // existing tabs keep their version until all of them close.
  event.waitUntil(
    caches.open(SHELL).then((cache) => cache.addAll(CONFIG.shell)),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter(
            (name) =>
              (name.startsWith(PREFIX) && name !== SHELL && name !== RUNTIME) ||
              name.startsWith("little-wonders-"),
          )
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

function store(request, response) {
  // Serialize writes and eviction so parallel image/chunk downloads cannot
  // overrun the budget. Failure to cache must never break a network response.
  const copy = response.clone();
  writes = writes
    .then(async () => {
      if (
        !response.ok ||
        response.status !== 200 ||
        response.redirected ||
        /no-store|private/i.test(response.headers.get("cache-control") || "") ||
        response.headers.get("vary") === "*"
      )
        return;
      const bytes = await copy.arrayBuffer();
      if (bytes.byteLength > CONFIG.maxFileBytes) return;
      const headers = new Headers(response.headers);
      headers.delete("content-encoding");
      headers.delete("content-length");
      headers.set("x-portfolio-bytes", String(bytes.byteLength));
      const cache = await caches.open(RUNTIME);
      // Read persisted sizes once per worker lifetime, rather than scanning
      // every cached response again for every image downloaded by a page.
      const sizes = await runtimeIndex(cache);
      const url = new URL(
        typeof request === "string" ? request : request.url,
        self.location.origin,
      ).href;
      await cache.delete(request);
      await cache.put(request, new Response(bytes, { headers, status: 200 }));
      sizes.delete(url);
      sizes.set(url, bytes.byteLength);
      let total = [...sizes.values()].reduce((sum, size) => sum + size, 0);
      while (sizes.size > CONFIG.maxEntries || total > CONFIG.maxBytes) {
        const key = sizes.keys().next().value;
        total -= sizes.get(key);
        await cache.delete(key);
        sizes.delete(key);
      }
    })
    .catch(() => {
      /* Quota/disabled storage: keep the live site usable. */
    });
  return writes;
}

// Audio players can request byte ranges even on first play. Fetch a complete
// small build asset on demand, then serve the range from that bounded response.
// Partial responses never enter the cache; this policy is shared by every app.
async function byteRange(response, range) {
  if (!range || response.status !== 200) return response;
  const bytes = await response.arrayBuffer();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  let start = match?.[1] ? Number(match[1]) : 0;
  let end = match?.[2] ? Number(match[2]) : bytes.byteLength - 1;
  if (match && !match[1] && match[2]) {
    start = Math.max(0, bytes.byteLength - Number(match[2]));
    end = bytes.byteLength - 1;
  }
  end = Math.min(end, bytes.byteLength - 1);
  if (
    !match ||
    (!match[1] && !match[2]) ||
    start > end ||
    start >= bytes.byteLength
  )
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${bytes.byteLength}` },
    });
  const headers = new Headers(response.headers);
  headers.delete("content-encoding");
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Content-Range", `bytes ${start}-${end}/${bytes.byteLength}`);
  headers.set("Accept-Ranges", "bytes");
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (
    url.origin !== self.location.origin ||
    request.method !== "GET" ||
    url.search
  )
    return;
  const range = request.headers.get("range");
  // Leave large range downloads to the network without retaining them.
  if (range && CONFIG.sizes[url.pathname] > CONFIG.maxFileBytes) return;
  const page = pagePath(url.pathname);
  const navigation =
    request.mode === "navigate" && Object.hasOwn(CONFIG.pages, page);
  if (!navigation && !eligible(request)) return;
  event.respondWith(
    (async () => {
      const key = navigation ? page : url.pathname;
      let shell;
      try {
        shell = await caches.open(SHELL);
        const runtime = await caches.open(RUNTIME);
        // Cache-first HTML and hashed assets keep a visited app on one build.
        const cached = (await shell.match(key)) || (await runtime.match(key));
        if (cached) return byteRange(cached, range);
      } catch {
        // Storage can become unavailable even after a successful installation.
        return fetch(request);
      }
      try {
        const headers = new Headers(request.headers);
        headers.delete("range");
        const response = await fetch(
          range ? new Request(request, { headers }) : request,
        );
        // Query-bearing requests are network-only; never cache personalized URLs.
        if (!url.search) event.waitUntil(store(key, response));
        return byteRange(response, range);
      } catch {
        if (navigation) return shell.match("/offline.html");
        return Response.error();
      }
    })(),
  );
});

async function saveVisitedPage(event) {
  const client = event.source;
  if (!client?.url) return;
  const url = new URL(client.url);
  const page = pagePath(url.pathname);
  if (url.origin !== self.location.origin || url.search) return;
  const files = new Set(CONFIG.pages[page] || []);
  if (page === "/") {
    const route = url.hash.slice(1).split("?")[0];
    const key = /^\/recipesByGpt\/[^/]+$/.test(route)
      ? "/recipesByGpt/:id"
      : route;
    for (const file of CONFIG.routes[key] || []) files.add(file);
  }
  // Initial loads may finish before the worker controls the page. Save only
  // this visited entry's eager graph so a direct first visit also works offline.
  for (const file of files) {
    if (shellPaths.has(file)) continue;
    const cache = await caches.open(RUNTIME);
    if (await cache.match(file)) continue;
    try {
      await store(file, await fetch(file));
    } catch {
      /* Best effort offline. */
    }
  }
}
self.addEventListener("message", (event) => {
  messages = messages.then(async () => {
    try {
      if (event.data?.type === "CACHE_VISITED_PAGE")
        await saveVisitedPage(event);
      else if (event.data?.type === "CLEAR_PROJECT_CACHE") {
        await writes;
        await caches.delete(RUNTIME);
        runtimeSizes = undefined;
      } else if (event.data?.type !== "CACHE_STATUS") return;
      await writes;
      const cache = await caches.open(RUNTIME);
      const keys = await cache.keys();
      let bytes = 0;
      for (const key of keys)
        bytes += Number(
          (await cache.match(key)).headers.get("x-portfolio-bytes") || 0,
        );
      event.ports[0]?.postMessage({ ok: true, entries: keys.length, bytes });
    } catch {
      event.ports[0]?.postMessage({ ok: false });
    }
  });
  event.waitUntil(messages);
});
