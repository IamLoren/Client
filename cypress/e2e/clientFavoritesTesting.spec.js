/// <reference types="cypress" />

import clientPage from "./pages/clientPage";
import homePage from "./pages/homePage";

describe("Favorites Page Tests", () => {
  const carToAdd1 = "Jeep Grand Cherokee";
  const carToAdd2 = "BMW i530";
  beforeEach(() => {
    cy.loginToApplication();
  });

  it("Should display navigation links correctly", () => {
    homePage.visit();
    cy.addToFavorites(carToAdd1);
    cy.addToFavorites(carToAdd2).then(()=> {
        clientPage.visit();
    clientPage.verifyNavigationLinkExists("Settings");
    clientPage.verifyNavigationLinkExists("Orders History");
    clientPage.verifyNavigationLinkExists("Favorites");
    clientPage.verifyNavigationLinkExists("Notifications");
    })
  });

  it("Should remove a car from favorites", () => {
      clientPage.visit();
      cy.wait(2000);
      cy.get(clientPage.internalNavigation).should("exist");
      clientPage.verifyCarInFavorites(carToAdd1);
      clientPage.removeCarFromFavorites(carToAdd1);
      clientPage.verifyFavoritesCount(1);
  });
});
