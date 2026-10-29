// Retire the old full-precache worker. Keep this URL for existing installs so
// their update check can escape stale cached HTML and load the shared root worker.
// Wait for existing app windows to close before activating this migration.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.registration.unregister();
      for (const name of await caches.keys())
        if (name.startsWith("little-wonders-")) await caches.delete(name);
    })(),
  );
});
