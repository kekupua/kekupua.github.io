import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/learn",
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.LEARN_CHROMIUM_PATH,
      args: process.env.LEARN_CHROMIUM_PATH
        ? [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--use-gl=angle",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
          ]
        : [],
    },
  },
  webServer: {
    command:
      "node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    {
      name: "iphone",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    {
      name: "ipad",
      use: { ...devices["iPad (gen 7)"], defaultBrowserType: "chromium" },
    },
  ],
});
