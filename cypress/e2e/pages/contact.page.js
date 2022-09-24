const basePage = require("./base.page");
const reasonContactSelect = "#Reason_for_Contact__c";
const primaryInterestSelect = "#Use_Case_Form__c";

class ContactPage {
    fillAndSubmitTalkExpertForm(userCreds) {
        cy.get(reasonContactSelect).select("Sales-Inquiry");
        basePage.fillFirstNameInput(userCreds.firstName);
        basePage.fillLastNameInput(userCreds.lastName);
        basePage.fillEmailInput(userCreds.email);
        basePage.fillWebsiteInput(userCreds.website);
        cy.get(primaryInterestSelect).select("AI / Voice Analytics");
        basePage.submitForm();
    }

    assertSuccessSentTalkExpertForm(email) {
        cy.url().should("include", `/thank-you?userEmail=${email.replace("@", "%40")}`);
        cy.contains("h1", "Thanks for Reaching Out!").should("be.visible");
        cy.contains("Our team will reach out to you shortly at").children().should("have.text", email);
        cy.contains("Wrong email address?").children().should("have.attr", "href", "/contact-us");
    }
}

module.exports = new ContactPage();