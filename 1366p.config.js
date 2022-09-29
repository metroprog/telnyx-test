const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    videoUploadOnPasses: true,
    baseUrl: 'https://telnyx.com',
    viewportHeight: 768,
    viewportWidth: 1366,
  },
});
