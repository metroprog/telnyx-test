const firstNameInput = "#FirstName";
const lastNameInput = "#LastName";
const emailInput = "#Email";
const websiteInput = "#Website";
const submitButton = '[type="submit"]';
const errorMessages = {
    firstName: "#ValidMsgFirstName",
    lastName: "#ValidMsgLastName",
    email: "#ValidMsgEmail",
    website: "#ValidMsgWebsite",
    reasonContact: "#ValidMsgReason_for_Contact__c",
    primaryInterest: "#ValidMsgUse_Case_Form__c",
};

class BasePage {
    fillFirstNameInput(firstName) {
        cy.get(firstNameInput).clear().type(firstName);
    }

    fillLastNameInput(lastName) {
        cy.get(lastNameInput).clear().type(lastName);
    }

    fillEmailInput(email) {
        cy.get(emailInput).clear().type(email);
    }

    fillWebsiteInput(website) {
        cy.get(websiteInput).clear().type(website);
    }

    submitForm() {
        cy.get(submitButton).click();
    }

    assertErrorMessage(field, text) {
        cy.get(errorMessages[field]).should("be.visible").should("have.text", text);
    }
}

module.exports = new BasePage();
