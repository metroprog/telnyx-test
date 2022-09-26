const resourcesPage = require("../pages/resources.page");

describe("Test Resources", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit("https://telnyx.com/resources");
        cy.wait(1000);
        cy.get("body").then(($body) => {
            if ($body.find('[aria-label="close and deny"]').length > 0) {
                cy.get('[aria-label="close and deny"]').click();
            }
        });
    });

    it("Filter by content in blog should display only articles in selected category", () => {
        resourcesPage.assertFiltersByContentIsNotChosenExcept();
		resourcesPage.assertArticlesCategoryNotOnlyFiltered();
        let filterNumber = 3;
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
		// resourcesPage.assertArticlesCategoryNotOnlyFiltered(filterNumber);
		cy.url().should('eq', 'https://telnyx.com/resources');
    });
});
