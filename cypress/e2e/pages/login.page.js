const basePage = require("./base.page");

const loginTab = '[data-testid="login.signin.tab.login"]';
const ssoTab = '[data-testid="login.signin.tab.sso"]';
const loginForm = '[aria-label="loginForm"]';
const ssoForm = '[aria-label="ssoForm"]';
const emailInput = '[name="email"]';
const passwordInput = '[name="password"]';
const submitButton = '[type="submit"]';
const errorMessage = '[data-testid="login.signin.message"]';

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
}

module.exports = new LoginPage();
