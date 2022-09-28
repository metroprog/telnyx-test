const basePage = require("../pages/base.page");
const loginPage = require("../pages/login.page");
const helper = require("../pages/helper");

describe("Test LogIn", () => {
    beforeEach(() => {
        cy.visit("https://portal.telnyx.com/");
        basePage.closeCookies();
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

    it("Successfully send Verification Email form", () => {
        loginPage.fillAndSubmitVerificationEmailForm(helper.userCreds);
        loginPage.assertSuccessSentVerificationEmailForm();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/resend-email");
    });
});
