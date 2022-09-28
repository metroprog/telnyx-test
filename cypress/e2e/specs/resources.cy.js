const basePage = require("../pages/base.page");
const resourcesPage = require("../pages/resources.page");
let filterNumber = 3;

describe("Test Resources", () => {
    beforeEach(() => {
        cy.visit("/resources");
        basePage.closeCookies();
    });

    it("Filter by content in blog should display only articles in selected category", () => {
        resourcesPage.assertFiltersByContentIsNotChosenExcept();
        resourcesPage.toggleFilterByContent(filterNumber);
        resourcesPage.assertURLContainsChosenFilterName(filterNumber);
        resourcesPage.assertFilterByContentIsChosen(filterNumber);
        resourcesPage.assertFiltersByContentIsNotChosenExcept(filterNumber);
        resourcesPage.assertArticlesCategoryOnlyFiltered(filterNumber);
        filterNumber = 2;
        resourcesPage.toggleFilterByContent(filterNumber);
        resourcesPage.assertURLContainsChosenFilterName(filterNumber);
        resourcesPage.assertFilterByContentIsChosen(filterNumber);
        resourcesPage.assertFiltersByContentIsNotChosenExcept(filterNumber);
        resourcesPage.assertArticlesCategoryOnlyFiltered(filterNumber);
        resourcesPage.toggleFilterByContent(filterNumber);
        resourcesPage.assertFiltersByContentIsNotChosenExcept();
        cy.url().should("eq", "https://telnyx.com/resources");
    });
});