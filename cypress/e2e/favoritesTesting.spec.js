/// <reference types="cypress" />

import { default as homePage } from "./pages/homePage";

describe("Card component - Favorites functionality", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should show login tooltip message when a user is not logged in", () => {
    homePage.getFirstHeartIcon().trigger("mouseover");
    cy.wait(300);
    cy.get("[role='tooltip']").should(
      "contain",
      "Please sign up or log in to be able to add a car"
    );
  });

  it("should change icon color and tooltip after adding and removing a car from favorites when heart icon is clicked", () => {
    cy.loginToApplication();
    homePage.getFirstHeartIcon().as(
      "favoriteIcon"
    );

    cy.get("@favoriteIcon")
      .first()
      .find("svg[style='color: gray; fill: transparent;']")
      .should("exist");

    cy.get("@favoriteIcon").first().click();
    cy.get("@favoriteIcon")
      .find("svg")
      .first()
      .should("have.css", "fill", "rgb(255, 0, 0)");

    cy.get("@favoriteIcon").first().click();
    cy.get("@favoriteIcon")
      .find("svg")
      .should("have.css", "fill", "rgba(0, 0, 0, 0)");
  });

  it("should add car to favoriteList in Redux store and delete from store", () => {
    cy.loginToApplication();

    cy.get('[aria-label="press to add this car to favorites"]').as(
      "favoriteIcon"
    );

    cy.get("@favoriteIcon")
      .find("svg[style='color: gray; fill: transparent;']")
      .first()
      .closest("span")
      .invoke("attr", "data-tooltip-id")
      .then((tooltipId) => {
        const carId = tooltipId.split("-")[0];

        cy.get("@favoriteIcon")
          .find("svg[style='color: gray; fill: transparent;']")
          .first()
          .click();
        cy.window().its("store").invoke("dispatch", {
          type: "authSlice/updateFavoriteList",
          payload: { carId },
        });
        cy.wait(1000);
        cy.getReduxState().then((state) => {
          const favoriteList = state.auth.user.favorites;
          const isCarInFavorites = favoriteList.some(
            (car) => car._id === carId
          );
          expect(isCarInFavorites).to.be.true;

          cy.get("@favoriteIcon")
            .closest(`span[data-tooltip-id='${carId}-tooltip']`)
            .first()
            .click();
          cy.window().its("store").invoke("dispatch", {
            type: "authSlice/updateFavoriteList",
            payload: { carId },
          });
          cy.wait(1000);
          cy.getReduxState().then((state) => {
            const updatedFavoriteList = state.auth.user.favorites;
            const isCarInFavorites = updatedFavoriteList.some(
              (car) => car._id === carId
            );
            expect(isCarInFavorites).to.be.false;
          });
        });
      });
  });

  
});
