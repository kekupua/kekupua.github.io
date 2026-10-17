import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/mortgage",
  testMatch: "**/*.spec.ts",
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-mortgage-report", open: "never" }],
  ],
  outputDir: "test-results-mortgage",
  use: {
    baseURL: "http://127.0.0.1:4175",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.MORTGAGE_CHROMIUM_PATH,
      args: process.env.MORTGAGE_CHROMIUM_PATH
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
      "node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4175",
    port: 4175,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1100 } } },
    {
      name: "iphone",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
});
