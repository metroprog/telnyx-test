const storagePage = require('../pages/storage.page');
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
        // cy.visit("https://telnyx.com/products/storage");
        storagePage.goToJoinForm();
        storagePage.fillAndSubmitJoinForm(userCreds);
        storagePage.assertSuccessSentJoinForm();
    });
});
