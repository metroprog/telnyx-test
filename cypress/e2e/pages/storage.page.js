const joinTheWaitListButtons = '[href*="#form"]';
const joinForm = "#form form";
const firstNameInput = "#FirstName";
const lastNameInput = "#LastName";
const emailInput = "#Email";
const submitButton = '[type="submit"]';
const signUpButtons = 'main [href*="sign-up"]';
const storageButtons = 'main [href*="storage"]';
const errorMessages = {
    firstName: "#ValidMsgFirstName",
    lastName: "#ValidMsgLastName",
    email: "#ValidMsgEmail",
};

class StoragePage {
    goToJoinForm() {
        cy.get(joinTheWaitListButtons).first().should("have.text", "Join the waitlist").click();
        cy.url().should("include", "#form");
        cy.get(joinForm, { timeout: 10000 }).should("be.visible");
    }

    fillFirstNameInput(firstName) {
        cy.get(firstNameInput).clear().type(firstName);
    }

    fillLastNameInput(lastName) {
        cy.get(lastNameInput).clear().type(lastName);
    }

    fillEmailInput(email) {
        cy.get(emailInput).clear().type(email);
    }

    submitJoinForm() {
        cy.get(submitButton).click();
    }

    fillAndSubmitJoinForm(userCreds) {
        fillFirstNameInput(userCreds.firstName);
        fillLastNameInput(userCreds.lastName);
        fillEmailInput(userCreds.email);
        submitJoinForm();
    }

    assertSuccessSentJoinForm() {
        cy.url().should("include", "/storage-waitlist");
        cy.contains("h1", "You're on the waitlist!").should("be.visible");
        cy.get(signUpButtons).first().should("have.text", "Create a Telnyx account");
        cy.get(storageButtons).first().should("have.text", "Take me back to Telnyx Storage");
    }

    assertErrorMessage(field, text) {
        cy.get(errorMessages[field]).should("be.visible").should("have.text", text);
    }
}

module.exports = new StoragePage();
