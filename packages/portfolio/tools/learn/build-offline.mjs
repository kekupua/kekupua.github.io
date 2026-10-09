import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const assets = new Set(["/learn/", "/learn/index.html"]);
function collect(key) {
  const chunk = manifest[key];
  if (!chunk || assets.has(`/${chunk.file}`)) return;
  assets.add(`/${chunk.file}`);
  for (const css of chunk.css || []) assets.add(`/${css}`);
  for (const asset of chunk.assets || []) assets.add(`/${asset}`);
  for (const dependency of [
    ...(chunk.imports || []),
    ...(chunk.dynamicImports || []),
  ])
    collect(dependency);
}
collect("learn/index.html");
async function walk(path) {
  for (const entry of await readdir(`dist/${path}`, { withFileTypes: true })) {
    const file = `${path}/${entry.name}`;
    if (entry.isDirectory()) await walk(file);
    else if (entry.name !== "sw.js" && !entry.name.endsWith(".map"))
      assets.add(`/${file}`);
  }
}
await walk("learn");
const hash = createHash("sha256");
for (const url of [...assets].sort())
  hash.update(
    await readFile(`dist${url === "/learn/" ? "/learn/index.html" : url}`),
  );
const cache = `little-wonders-${hash.digest("hex").slice(0, 16)}`;
const worker = `/* Generated after Vite build. Only learning dependencies are cached. */
const CACHE = ${JSON.stringify(cache)};
const ASSETS = ${JSON.stringify([...assets])};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('little-wonders-') && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim(),
  ]));
});
// Waiting updates activate after all old app windows close; no mixed-version sessions.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== 'GET') return;
  if (!ASSETS.includes(url.pathname) && !(event.request.mode === 'navigate' && url.pathname.startsWith('/learn/'))) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = event.request.mode === 'navigate' ? '/learn/index.html' : url.pathname;
    const response = await cache.match(key);
    if (!response) return fetch(event.request);
    // Safari may request byte ranges for MP3 playback, including while offline.
    const range = event.request.headers.get('range');
    if (range && url.pathname.endsWith('.mp3')) {
      const bytes = await response.arrayBuffer();
      const match = /^bytes=(\\d*)-(\\d*)$/.exec(range);
      let start = match && match[1] ? Number(match[1]) : 0;
      let end = match && match[2] ? Number(match[2]) : bytes.byteLength - 1;
      if (match && !match[1] && match[2]) { start = Math.max(0, bytes.byteLength - Number(match[2])); end = bytes.byteLength - 1; }
      end = Math.min(end, bytes.byteLength - 1);
      if (!match || start > end || start >= bytes.byteLength) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + bytes.byteLength } });
      return new Response(bytes.slice(start, end + 1), { status: 206, headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': String(end - start + 1), 'Content-Range': 'bytes ' + start + '-' + end + '/' + bytes.byteLength, 'Accept-Ranges': 'bytes' } });
    }
    return response;
  })());
});
`;
await writeFile("dist/learn/sw.js", worker);
console.log(`Learning offline cache: ${assets.size} assets, ${cache}`);
