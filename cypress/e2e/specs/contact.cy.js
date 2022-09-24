const contactPage = require("../pages/contact.page");
const helper = require("../pages/helper");

describe("Test Contact", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("https://telnyx.com/contact-us");
        cy.wait(1000);
        cy.get("body").then(($body) => {
            if ($body.find('[aria-label="close and deny"]').length > 0) {
                cy.get('[aria-label="close and deny"]').click();
            }
        });
    });

    it("Successfully sending Talk to an expert form with valid values", () => {
        contactPage.fillAndSubmitTalkExpertForm(helper.userCreds);
        contactPage.assertSuccessSentTalkExpertForm(helper.userCreds.email);
    });
});
