const basePage = require("../pages/base.page");
const loginPage = require("../pages/login.page");

describe("Test LogIn", () => {
    let user;
    before(() => {
        cy.fixture("user").then((fuser) => {
            user = fuser;
        });
    });
    
    beforeEach(() => {
        cy.visit("https://portal.telnyx.com/");
        basePage.closeCookies();
    });

    it("Cannot login with unregistered credentials", () => {
        loginPage.fillAndSubmitLogInForm(user);
        loginPage.assertIsNotLoggedIn();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/sign-in");
    });

    it("Cannot send Single Sign-On form with unregistered credentials", () => {
        loginPage.fillAndSubmitSSOForm(user);
        loginPage.assertSSOFormIsNotSent();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/sign-in");
    });

    it("Successfully send Verification Email form", () => {
        loginPage.fillAndSubmitVerificationEmailForm(user);
        loginPage.assertSuccessSentVerificationEmailForm();
        loginPage.assertSameUrl("https://portal.telnyx.com/#/login/resend-email");
    });
});
