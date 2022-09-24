const basePage = require("./base.page");
const joinTheWaitListButtons = '[href*="#form"]';
const joinForm = "#form form";
const signUpButtons = 'main [href*="sign-up"]';
const storageButtons = 'main [href*="storage"]';
const errorMessages = {
    firstName: "#ValidMsgFirstName",
    lastName: "#ValidMsgLastName",
    email: "#ValidMsgEmail",
};
const accordionTitles = "[data-faq-question]";
const accordionContents = "[data-faq-answer]";

class StoragePage {
    goToJoinForm() {
        cy.get(joinTheWaitListButtons).first().should("have.text", "Join the waitlist").click();
        cy.url().should("include", "#form");
        cy.get(joinForm, { timeout: 10000 }).should("be.visible");
    }

    fillAndSubmitJoinForm(userCreds) {
        basePage.fillFirstNameInput(userCreds.firstName);
        basePage.fillLastNameInput(userCreds.lastName);
        basePage.fillEmailInput(userCreds.email);
        basePage.submitForm();
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
        cy.get(accordionTitles)
            .eq(number - 1)
            .click();
    }

    assertAccordionIsOpened(number) {
        cy.get(accordionContents)
            .eq(number - 1, { timeout: 5000 })
            .should("have.attr", "data-is-open", "true")
            .should("be.visible");
    }

    assertAccordionsAreClosed(numbers) {
        numbers = numbers == "all" ? [1, 2, 3, 4, 5, 6, 7, 8] : numbers;
        for (let number of numbers) {
            cy.get(accordionContents)
                .eq(number - 1)
                .should("have.attr", "data-is-open", "false")
                .should("not.be.visible");
        }
    }
}

module.exports = new StoragePage();
