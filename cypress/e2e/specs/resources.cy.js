const basePage = require("../pages/base.page");
const resourcesPage = require("../pages/resources.page");
let filterNumber;

describe("Test Resources", () => {
    beforeEach(() => {
        cy.visit("/resources");
        basePage.closeCookies();
    });

    it("Filter by content in blog should display only articles in selected category", () => {
        filterNumber = 3;
        resourcesPage.assertFiltersByContentIsNotChosenExcept();
        resourcesPage.assertArticlesWithoutFiltrationByContent();
        resourcesPage.toggleFilterByContent(filterNumber);
        resourcesPage.assertURLContainsChosenFilterName(filterNumber);
        resourcesPage.assertFilterByContentIsChosen(filterNumber);
        resourcesPage.assertFiltersByContentIsNotChosenExcept(filterNumber);
        resourcesPage.assertArticlesOnlyFilteredByContent(filterNumber);
        filterNumber = 2;
        resourcesPage.toggleFilterByContent(filterNumber);
        resourcesPage.assertURLContainsChosenFilterName(filterNumber);
        resourcesPage.assertFilterByContentIsChosen(filterNumber);
        resourcesPage.assertFiltersByContentIsNotChosenExcept(filterNumber);
        resourcesPage.assertArticlesOnlyFilteredByContent(filterNumber);
        resourcesPage.toggleFilterByContent(filterNumber);
        cy.url().should("eq", "https://telnyx.com/resources");
        resourcesPage.assertFiltersByContentIsNotChosenExcept();
        resourcesPage.assertArticlesWithoutFiltrationByContent();
    });
});
