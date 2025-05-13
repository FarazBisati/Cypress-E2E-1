const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 100000,
  retries: {
    runMode: 2,
    openMode: 2,
  },
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://automationteststore.com/",
    video: true,
    videoCompression: 32,
    videosFolder: "cypress/reports/videos",
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
