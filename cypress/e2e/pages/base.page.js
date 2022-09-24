const firstNameInput = "#FirstName";
const lastNameInput = "#LastName";
const emailInput = "#Email";
const websiteInput = "#Website";
const submitButton = '[type="submit"]';

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
}

module.exports = new BasePage();
