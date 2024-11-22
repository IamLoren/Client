class ClientPage {
    internalNavigation = '[data-cy="internal navigation"]';
    favoriteList = '[data-cy="favorite list"]';
    favoriteItem = (carName) => `.primary-background h3:contains("${carName}")`;
    removeFromFavoritesButton = (carName) =>
        `.primary-background h3:contains("${carName}") ~ span[aria-label*="press to add this car to favorites"]`;
      rentNowButton = (carName) =>
        `.primary-background h3:contains("${carName}") ~ div button[aria-label="Rent now"]`;

    visit() {
        cy.visit('/client/favorites');
    }
    
    checkFavoritesURL() {
        cy.url().should("include", "/client/favorites");
    }

    checkClientNavigationExisting() {
        cy.get("a").should("exist").and("contain", "Favorites");
    }

    checkBaseURLExisting() {
        cy.url().should("eq", Cypress.config().baseUrl);
    }

    verifyNavigationLinkExists(linkText) {
        cy.get(this.internalNavigation).contains(linkText).should('exist');
      }
    
      clickNavigationLink(linkText) {
        cy.get(this.internalNavigation).contains(linkText).click();
      }
    
      verifyCarInFavorites(carName) {
        cy.get(this.favoriteList)
          .find(this.favoriteItem(carName))
          .should('exist');
      }
    
      removeCarFromFavorites(carName) {
        cy.contains('h3', carName) 
      .parent()
      .parent() 
      .within(() => {
        cy.get('[aria-label="press to add this car to favorites"]').click();
      })
      }
    
      rentCar(carName) {
        cy.get(this.favoriteList).find(this.rentNowButton(carName)).click();
      }
    
      verifyFavoritesCount(expectedCount) {
        cy.get(this.favoriteList).find('li').should('have.length', expectedCount);
      }

}
export default new ClientPage()