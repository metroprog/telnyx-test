const basePage = require("./base.page");

const loginTab = '[data-testid="login.signin.tab.login"]';
const ssoTab = '[data-testid="login.signin.tab.sso"]';
const loginForm = '[aria-label="loginForm"]';
const ssoForm = '[aria-label="ssoForm"]';
const resendEmailForm = '[aria-label="resendEmailForm"]';
const emailInput = '[name="email"]';
const passwordInput = '[name="password"]';
const submitButton = '[type="submit"]';
const errorMessage = '[data-testid="login.signin.message"]';
const successMessage = '[data-testid="login.resend.message"]';
const resendEmailLink = '[href*="/resend-email"]';

class LoginPage {
    fillAndSubmitLogInForm(userCreds) {
		cy.get(loginTab).click();
        cy.get(`${loginForm} ${emailInput}`, { timeout: 5000 }).type(userCreds.email);
        cy.get(`${loginForm} ${passwordInput}`).type(userCreds.password);
        cy.get(`${loginForm} ${submitButton}`).click();
    }

    fillAndSubmitSSOForm(userCreds) {
		cy.get(ssoTab).click();
        cy.get(`${ssoForm} ${emailInput}`, { timeout: 5000 }).type(userCreds.email);
        cy.get(`${ssoForm} ${submitButton}`).click();
    }

    fillAndSubmitVerificationEmailForm(userCreds) {
		cy.get(resendEmailLink).click();
        cy.get(`${resendEmailForm} ${emailInput}`, { timeout: 5000 }).type(userCreds.email);
        cy.get(`${resendEmailForm} ${submitButton}`).click();
    }

    assertSameUrl(address) {
        cy.url().should("eq", address);
    }

    assertIsNotLoggedIn() {
        cy.get(`${errorMessage}`)
            .should("be.visible")
            .should(
                "have.text",
                "That email and password combination is not valid, or your browser could not be authenticated via recaptcha. Please try again."
            );
    }

    assertSSOFormIsNotSent() {
        cy.get(`${errorMessage}`)
            .should("be.visible")
            .should("have.text", "The requested resource or URL could not be found.");
    }

    assertSuccessSentVerificationEmailForm() {
        cy.get(`${successMessage}`)
            .should("be.visible")
            .should('contain.text', "If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes.");
    }
}

module.exports = new LoginPage();
