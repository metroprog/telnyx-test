const basePage = require("../pages/base.page");
const storagePage = require("../pages/storage.page");
const helper = require("../pages/helper");

describe("Test Storage", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("https://telnyx.com/products/storage/");
        cy.wait(1000);
        cy.get("body").then(($body) => {
            if ($body.find('[aria-label="close and deny"]').length > 0) {
                cy.get('[aria-label="close and deny"]').click();
            }
        });
    });

    it("Successfully join the waitlist by sending form with valid values", () => {
        storagePage.goToJoinForm();
        storagePage.fillAndSubmitJoinForm(helper.userCreds);
        storagePage.assertSuccessSentJoinForm();
    });

    it("Cannot submit Join the waitlist form with empty required fields", () => {
        storagePage.goToJoinForm();
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.submitForm();
        basePage.assertErrorMessage("email", "Must be valid email. example@yourdomain.com");
        cy.reload(true);
        basePage.fillFirstNameInput(helper.userCreds.firstName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.submitForm();
        basePage.assertErrorMessage("lastName", "This field is required.");
        cy.reload(true);
        basePage.fillLastNameInput(helper.userCreds.lastName);
        basePage.fillEmailInput(helper.userCreds.email);
        basePage.submitForm();
        basePage.assertErrorMessage("firstName", "This field is required.");
    });

    it.only("Only one accordion at a time can be opened and displayed its content", () => {
        storagePage.scrollToFAQ();
        let accNumber = 1;
        storagePage.assertAccordionIsOpened(accNumber);
        storagePage.toggleAccordion(accNumber);
        storagePage.assertAccordionsAreClosedExcept();
        accNumber = 2;
        storagePage.toggleAccordion(accNumber);
        storagePage.assertAccordionIsOpened(accNumber);
        storagePage.assertAccordionsAreClosedExcept(accNumber);
        accNumber = 3;
        storagePage.toggleAccordion(accNumber);
        storagePage.assertAccordionIsOpened(accNumber);
        storagePage.assertAccordionsAreClosedExcept(accNumber);
    });
});
