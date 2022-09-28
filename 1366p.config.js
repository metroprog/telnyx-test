const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    videoUploadOnPasses: false,
    baseUrl: 'https://telnyx.com',
    viewportHeight: 768,
    viewportWidth: 1366,
  },
});
