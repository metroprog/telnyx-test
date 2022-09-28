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
        video: false,
        videoUploadOnPasses: false,
        baseUrl: "https://telnyx.com",
        viewportHeight: 1080,
        viewportWidth: 1920,
    },
});
