import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/eat",
  testMatch: "**/*.spec.ts",
  workers: 2,
  fullyParallel: true,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-eat-report", open: "never" }],
  ],
  outputDir: "test-results-eat",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    launchOptions: { executablePath: process.env.LEARN_CHROMIUM_PATH },
  },
  webServer: {
    command:
      "node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "iphone",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
});
