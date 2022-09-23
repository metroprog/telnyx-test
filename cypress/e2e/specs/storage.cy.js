const storagePage = require("../pages/storage.page");
const userCreds = {
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
};

describe("Test Storage", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("https://telnyx.com/products/storage");
        cy.get("body").then(($body) => {
            if ($body.find('[aria-label="close and deny"]').length > 0) {
                cy.get('[aria-label="close and deny"]').click();
            }
        });
    });

    it("Successfully join the waitlist by sending form with valid values", () => {
        storagePage.goToJoinForm();
        storagePage.fillAndSubmitJoinForm(userCreds);
        storagePage.assertSuccessSentJoinForm();
    });

    it("Cannot submit Join the waitlist form with empty required fields", () => {
        storagePage.goToJoinForm();
        storagePage.fillFirstNameInput(userCreds.firstName);
        storagePage.fillLastNameInput(userCreds.lastName);
        storagePage.submitJoinForm();
        storagePage.assertErrorMessage("email", "Must be valid email. example@yourdomain.com");
        cy.reload(true);
        storagePage.fillFirstNameInput(userCreds.firstName);
        storagePage.fillEmailInput(userCreds.email);
        storagePage.submitJoinForm();
        storagePage.assertErrorMessage("lastName", "This field is required.");
        cy.reload(true);
        storagePage.fillLastNameInput(userCreds.lastName);
        storagePage.fillEmailInput(userCreds.email);
        storagePage.submitJoinForm();
        storagePage.assertErrorMessage("firstName", "This field is required.");
    });
});
