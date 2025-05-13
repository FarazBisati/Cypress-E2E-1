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
      const { defineConfig } = require("cypress");

      module.exports = defineConfig({
        reporter: "cypress-mochawesome-reporter",
        reporterOptions: {
          reportDir: "cypress/reports/html",
          overwrite: false,
          html: true,
          json: true,
        },
        pageLoadTimeout: 100000,
        retries: {
          runMode: 2,
          openMode: 2,
        },

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
    },
  },
});
