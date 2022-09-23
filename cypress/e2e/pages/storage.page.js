const joinTheWaitListButtons = '[href*="#form"]';
const joinForm = '#form form';
const firstNameInput = '#FirstName';
const lastNameInput = '#LastName';
const emailInput = '#Email';
const submitButton = '[type="submit"]';
const signUpButtons = 'main [href*="sign-up"]';
const storageButtons = 'main [href*="storage"]';

class StoragePage {
    goToJoinForm() {
        cy.get(joinTheWaitListButtons).first().should("have.text", "Join the waitlist").click();
    }

    fillAndSubmitJoinForm(userCreds) {
        cy.url().should("include", "#form");
        cy.get(joinForm, { timeout: 10000 }).should("be.visible");
        cy.get(firstNameInput).type(userCreds.firstName);
        cy.get(lastNameInput).type(userCreds.lastName);
        cy.get(emailInput).type(userCreds.email);
        cy.get(submitButton).click();
    }

    assertSuccessSentJoinForm() {
        cy.url().should("include", "/storage-waitlist");
        cy.contains("h1", "You're on the waitlist!").should("be.visible");
        cy.get(signUpButtons).first().should("have.text", "Create a Telnyx account");
        cy.get(storageButtons).first().should("have.text", "Take me back to Telnyx Storage");
    }
}

module.exports = new StoragePage();

