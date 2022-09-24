const basePage = require("../pages/base.page");
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

    it("Cannot submit Talk to an expert form with empty required fields", () => {
        contactPage.chooseReasonSelect("Sales-Inquiry");
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.fillWebsiteInput(helper.userCreds.website);
        basePage.submitForm();
        basePage.assertErrorMessage("primaryInterest", "This field is required.");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.submitForm();
        basePage.assertErrorMessage("website", "Must be a url. http://www.example.com/");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.fillWebsiteInput(helper.userCreds.website);
        basePage.submitForm();
        basePage.assertErrorMessage("email", "Must be valid email. example@yourdomain.com");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.fillWebsiteInput(helper.userCreds.website);
        basePage.submitForm();
        basePage.assertErrorMessage("lastName", "This field is required.");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.fillWebsiteInput(helper.userCreds.website);
        basePage.submitForm();
        basePage.assertErrorMessage("firstName", "This field is required.");
        cy.reload(true);
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.fillWebsiteInput(helper.userCreds.website);
        basePage.submitForm();
        basePage.assertErrorMessage("reasonContact", "This field is required.");
    });

    it("All phonenumbers in Calling from overseas section are links as tel", () => {
        contactPage.assertLinkTextNumberEqualToHrefTel();
        contactPage.assertPhonenumbersAreLinksAsTel();
    });
});
