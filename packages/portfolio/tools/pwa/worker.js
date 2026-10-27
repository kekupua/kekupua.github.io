/* CONFIG is injected by build-pwa.mjs. No imports or CDN dependencies. */
const PREFIX = "sean-portfolio-";
const SHELL = `${PREFIX}shell-${CONFIG.version}`;
const RUNTIME = `${PREFIX}runtime-${CONFIG.version}`;
const shellPaths = new Set(CONFIG.shell);
let writes = Promise.resolve();
let messages = Promise.resolve();

const isLearn = (path) => path === "/learn" || path.startsWith("/learn/");
const pagePath = (path) =>
  path === "/index.html" ? "/" : path.replace(/index\.html$/, "");
function eligible(request) {
  const url = new URL(request.url);
  return (
    request.method === "GET" &&
    url.origin === self.location.origin &&
    !url.search &&
    !isLearn(url.pathname) &&
    !request.headers.has("range") &&
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
              name.startsWith(PREFIX) && name !== SHELL && name !== RUNTIME,
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
      await cache.delete(request);
      await cache.put(request, new Response(bytes, { headers, status: 200 }));
      const keys = await cache.keys();
      let total = 0;
      for (const key of keys)
        total += Number(
          (await cache.match(key)).headers.get("x-portfolio-bytes") || 0,
        );
      while (keys.length > CONFIG.maxEntries || total > CONFIG.maxBytes) {
        const key = keys.shift();
        total -= Number(
          (await cache.match(key)).headers.get("x-portfolio-bytes") || 0,
        );
        await cache.delete(key);
      }
    })
    .catch(() => {
      /* Quota/disabled storage: keep the live site usable. */
    });
  return writes;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (
    url.origin !== self.location.origin ||
    request.method !== "GET" ||
    url.search ||
    isLearn(url.pathname)
  )
    return;
  const page = pagePath(url.pathname);
  const navigation =
    request.mode === "navigate" && Object.hasOwn(CONFIG.pages, page);
  if (!navigation && !eligible(request)) return;
  event.respondWith(
    (async () => {
      const client = event.clientId
        ? await self.clients.get(event.clientId)
        : null;
      if (client && isLearn(new URL(client.url).pathname))
        return fetch(request);
      const key = navigation ? page : url.pathname;
      let shell;
      try {
        shell = await caches.open(SHELL);
        const runtime = await caches.open(RUNTIME);
        // Cache-first HTML and hashed assets keep a visited app on one build.
        const cached = (await shell.match(key)) || (await runtime.match(key));
        if (cached) return cached;
      } catch {
        // Storage can become unavailable even after a successful installation.
        return fetch(request);
      }
      try {
        const response = await fetch(request);
        // Query-bearing requests are network-only; never cache personalized URLs.
        if (!url.search) event.waitUntil(store(key, response));
        return response;
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
  if (url.origin !== self.location.origin || url.search || isLearn(page))
    return;
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

// Future projects can reuse this registration for standards-based Web Push.
// A separate backend must store subscriptions and send VAPID-signed messages.
function notificationUrl(value) {
  try {
    const url = new URL(
      typeof value === "string" ? value : "/",
      self.location.origin,
    );
    return url.origin === self.location.origin
      ? url.href
      : `${self.location.origin}/`;
  } catch {
    return `${self.location.origin}/`;
  }
}
self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data?.json() || {};
  } catch {
    /* Use a safe default. */
  }
  if (typeof payload !== "object" || payload === null) payload = {};
  event.waitUntil(
    self.registration.showNotification(
      typeof payload.title === "string"
        ? payload.title.slice(0, 100)
        : "Sean Teramae",
      {
        body:
          typeof payload.body === "string"
            ? payload.body.slice(0, 500)
            : "You have a new update.",
        icon: "/192.png",
        tag:
          typeof payload.tag === "string"
            ? `portfolio-${payload.tag.slice(0, 100)}`
            : undefined,
        data: { url: notificationUrl(payload.url) },
      },
    ),
  );
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = notificationUrl(event.notification.data?.url);
  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      const existing = windows.find((client) => client.url === url);
      if (existing) await existing.focus();
      else await self.clients.openWindow(url);
    })(),
  );
});
