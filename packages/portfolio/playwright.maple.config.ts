import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/maple",
  testMatch: "**/*.spec.ts",
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-maple-report", open: "never" }],
  ],
  outputDir: "test-results-maple",
  use: { baseURL: "http://127.0.0.1:4176", trace: "retain-on-failure" },
  webServer: {
    command:
      "node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4176",
    port: 4176,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1050 } } },
    {
      name: "iphone",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
});
