const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        reporter: "mochawesome",
        reporterOptions: {
            reportDir: "cypress/report",
            overwrite: false,
            html: false,
            json: true,
        },
        video: true,
        videoUploadOnPasses: true,
        baseUrl: "https://telnyx.com",
        viewportHeight: 768,
        viewportWidth: 1366,
    },
});
