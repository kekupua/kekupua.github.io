export type CacheStatus = { ok: boolean; entries?: number; bytes?: number };
let registration: Promise<ServiceWorkerRegistration | null> | undefined;

export function registerPortfolioPwa() {
  if (registration) return registration;
  if (!import.meta.env.PROD || !("serviceWorker" in navigator))
    return Promise.resolve(null);
  registration = navigator.serviceWorker
    .register("/sw.js", { scope: "/", updateViaCache: "none" })
    .then(async (reg) => {
      if (!reg.active) {
        await new Promise<void>((resolve, reject) => {
          const worker = reg.installing || reg.waiting;
          if (!worker)
            return reject(new Error("No portfolio worker available"));
          const changed = () => {
            if (worker.state === "activated" || worker.state === "redundant") {
              worker.removeEventListener("statechange", changed);
              if (worker.state === "activated") resolve();
              else reject(new Error("Portfolio offline setup failed"));
            }
          };
          worker.addEventListener("statechange", changed);
          changed();
        });
      }
      const saveVisit = () => {
        reg.active?.postMessage({ type: "CACHE_VISITED_PAGE" });
      };
      saveVisit();
      window.addEventListener("hashchange", saveVisit);
      return reg;
    })
    .catch(() => null);
  return registration;
}

export async function cacheCommand(
  type: "CACHE_STATUS" | "CLEAR_PROJECT_CACHE",
): Promise<CacheStatus> {
  const reg = await registerPortfolioPwa();
  if (!reg?.active) return { ok: false };
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    const timer = window.setTimeout(() => {
      channel.port1.close();
      resolve({ ok: false });
    }, 10000);
    channel.port1.onmessage = (event) => {
      window.clearTimeout(timer);
      channel.port1.close();
      resolve(event.data);
    };
    reg.active.postMessage({ type }, [channel.port2]);
  });
}
