const basePage = require("../pages/base.page");
const loginPage = require("../pages/login.page");
const helper = require("../pages/helper");

describe("Test LogIn", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("https://portal.telnyx.com/");
        cy.wait(1000);
        cy.get("body").then(($body) => {
            if ($body.find('[aria-label="close and deny"]').length > 0) {
                cy.get('[aria-label="close and deny"]').click();
            }
        });
    });

    it("Cannot login with unregistered credentials", () => {
        loginPage.fillAndSubmitLogInForm(helper.userCreds);
        loginPage.assertIsNotLoggedIn();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/sign-in");
    });

    it("Cannot send Single Sign-On form with unregistered credentials", () => {
        loginPage.fillAndSubmitSSOForm(helper.userCreds);
        loginPage.assertSSOFormIsNotSent();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/sign-in");
    });

    it.only("Successfully send Verification Email form", () => {
        loginPage.fillAndSubmitVerificationEmailForm(helper.userCreds);
        loginPage.assertSuccessSentVerificationEmailForm();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/resend-email");
    });
});
