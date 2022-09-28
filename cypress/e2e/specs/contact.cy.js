const basePage = require("../pages/base.page");
const contactPage = require("../pages/contact.page");

describe("Test Contact", () => {
    let user;
    before(() => {
        cy.fixture("user").then((fuser) => {
            user = fuser;
        });
    });
    
    beforeEach(() => {
        cy.visit("/contact-us");
        basePage.closeCookies();
    });

    it("Successfully sending Talk to an expert form with valid values", () => {
        contactPage.fillAndSubmitTalkExpertForm(user);
        contactPage.assertSuccessSentTalkExpertForm(user.email);
    });

    it("Cannot submit Talk to an expert form with empty required fields", () => {
        contactPage.chooseReasonSelect("Sales-Inquiry");
        basePage.fillFirstNameInput(user.firstName);
        basePage.fillLastNameInput(user.lastName);
        basePage.fillEmailInput(user.email);
        basePage.fillWebsiteInput(user.website);
        basePage.submitForm();
        basePage.assertErrorMessage("primaryInterest", "This field is required.");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillFirstNameInput(user.firstName);
        basePage.fillLastNameInput(user.lastName);
        basePage.fillEmailInput(user.email);
        basePage.submitForm();
        basePage.assertErrorMessage("website", "Must be a url. http://www.example.com/");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillFirstNameInput(user.firstName);
        basePage.fillLastNameInput(user.lastName);
        basePage.fillWebsiteInput(user.website);
        basePage.submitForm();
        basePage.assertErrorMessage("email", "Must be valid email. example@yourdomain.com");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillFirstNameInput(user.firstName);
        basePage.fillEmailInput(user.email);
        basePage.fillWebsiteInput(user.website);
        basePage.submitForm();
        basePage.assertErrorMessage("lastName", "This field is required.");
        cy.reload(true);
        contactPage.chooseReasonSelect("Support");
        basePage.fillLastNameInput(user.lastName);
        basePage.fillEmailInput(user.email);
        basePage.fillWebsiteInput(user.website);
        basePage.submitForm();
        basePage.assertErrorMessage("firstName", "This field is required.");
        cy.reload(true);
        basePage.fillFirstNameInput(user.firstName);
        basePage.fillLastNameInput(user.lastName);
        basePage.fillEmailInput(user.email);
        basePage.fillWebsiteInput(user.website);
        basePage.submitForm();
        basePage.assertErrorMessage("reasonContact", "This field is required.");
    });

    it("All phonenumbers in Calling from overseas section are links as tel", () => {
        contactPage.assertLinkTextNumberEqualToHrefTel();
        contactPage.assertPhonenumbersAreLinksAsTel();
    });
});
