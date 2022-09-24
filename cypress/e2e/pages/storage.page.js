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
const accordionTitle = "data-faq-question";
const accordionContent = "data-faq-answer";

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
        this.fillFirstNameInput(userCreds.firstName);
        this.fillLastNameInput(userCreds.lastName);
        this.fillEmailInput(userCreds.email);
        this.submitJoinForm();
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

    scrollToFAQ() {
        cy.contains("h2", "Frequently Asked Questions").scrollIntoView();
    }

    toggleAccordion(number) {
        cy.get(`[${accordionTitle}="${number - 1}"]`).click();
    }

    assertAccordionIsOpened(number) {
        cy.get(`[${accordionContent}="${number - 1}"]`, { timeout: 5000 })
            .should("have.attr", "data-is-open", "true")
            .should("be.visible");
    }

    assertAccordionsAreClosed(numbers) {
        numbers = numbers == "all" ? [1, 2, 3, 4, 5, 6, 7, 8] : numbers;
        for (let value of numbers) {
            cy.get(`[${accordionContent}="${value - 1}"]`)
                .should("have.attr", "data-is-open", "false")
                .should("not.be.visible");
        }
    }
}

module.exports = new StoragePage();
