const filterByContent = '[aria-labelledby="filter-by-content"]';
const filterByContentNames = ["New Products & Features", "Guides & Tutorials", "News & Events", "Insights & Resources"];
const notChosenFilterByContentBgColor = "rgba(0, 0, 0, 0)";
const notChosenFilterByContentFontColor = "rgb(63, 192, 139)";
const chosenFilterByContentBgColor = "rgb(63, 192, 139)";
const chosenFilterByContentFontColor = "rgb(255, 255, 255)";
const articlesCategories = "#articles header>span>span";
const articlesPagination = '[aria-label="pagination"]';

class ResourcesPage {
    toggleFilterByContent(number) {
        cy.get(filterByContent)
            .contains(filterByContentNames[number - 1])
            .click();
    }

    assertFiltersByContentIsNotChosenExcept(exceptNumber = 0) {
        let numbers = [...Array(filterByContentNames.length + 1).keys()];
        numbers.splice(0, 1);
        for (let number of numbers) {
            if (number == exceptNumber) {
                continue;
            }
            cy.get(filterByContent)
                .contains(filterByContentNames[number - 1])
                .should("have.attr", "aria-checked", "false")
                .should("have.css", "background-color", notChosenFilterByContentBgColor)
                .should("have.css", "color", notChosenFilterByContentFontColor);
        }
    }

    assertFilterByContentIsChosen(number) {
        cy.get(filterByContent)
            .contains(filterByContentNames[number - 1])
            .should("have.attr", "aria-checked", "true")
            .should("have.css", "background-color", chosenFilterByContentBgColor)
            .should("have.css", "color", chosenFilterByContentFontColor);
    }

    assertURLContainsChosenFilterName(number) {
        cy.url().should("include", `?category=${encodeURIComponent(filterByContentNames[number - 1])}`);
    }

    assertArticlesCategoryOnlyFiltered(number) {
        cy.get(articlesPagination).scrollIntoView({ duration: 3000 });
        cy.get(articlesCategories).each(($category, index, $list) => {
            expect($category.get(0).textContent).to.contain(filterByContentNames[number - 1]);
        });
    }

    get articlesCount() {
        return cy.get(articlesCategories).its("length");
    }
}

module.exports = new ResourcesPage();
