/* Generated after Vite build. Only learning dependencies are cached. */
const CACHE = "little-wonders-41de071883a9d6f4";
const ASSETS = ["/learn/","/learn/index.html","/assets/learn-CIAo-9bN.js","/assets/learn-Br7tQsgA.css","/assets/client-BL59Oi6A.js","/assets/index-ec0exYlB.js","/learn/animals/cat.webp","/learn/animals/cow.webp","/learn/animals/dog.webp","/learn/animals/duck.webp","/learn/animals/elephant.webp","/learn/animals/lion.webp","/learn/audio/correct.mp3","/learn/audio/navigate.mp3","/learn/audio/reward-music.mp3","/learn/audio/tap.mp3","/learn/icon-180.png","/learn/icon-192.png","/learn/icon-512.png","/learn/icon.svg","/learn/manifest.webmanifest"];
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
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
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
