/// <reference types="cypress" />

import { default as clientPage } from "./pages/clientPage";
import { default as homePage } from "./pages/homePage";

describe("Navigation Test", () => {
  beforeEach(() => {
    cy.loginToApplication();
  });

  it("should navigate to Client profile page", () => {
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    clientPage.checkClientNavigationExisting();
  });

  it("should navigate back to Home page", () => {
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    cy.go("back");
    clientPage.checkBaseURLExisting();
  });

  it("should navigate back to Home page after Catalog click", () => {
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    cy.get("a").contains("CATALOG").click();
    clientPage.checkBaseURLExisting();
  });

  it("should navigate back to Home page after Logo click", () => {
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    cy.get("a[aria-label='pass to home page']").click();
    clientPage.checkBaseURLExisting();
  });

  it("should navigate to Setting page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/settings"]').click();
    cy.url().should("include", "/client/settings");
    cy.get("a").should("exist").and("contain", "Settings");

    cy.go("back");

    clientPage.checkBaseURLExisting();
  });

  it("should navigate to Setting page through the Client page and then back", () => {
    cy.wait(500);
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    cy.get("a").should("exist").and("contain", "Favorites");
    cy.get("a").contains("Settings").click();
    cy.go("back");
    clientPage.checkFavoritesURL();
    cy.go("back");
    clientPage.checkBaseURLExisting();
  });

  it("should navigate to History page through the Client page and then back", () => {
    cy.wait(500);
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    cy.get("a").should("exist").and("contain", "Favorites");
    cy.get("a").contains("Orders History").click();
    cy.get("div").contains("Your orders history").should("exist");
    cy.go("back");
    clientPage.checkFavoritesURL();
    cy.go("back");
    clientPage.checkBaseURLExisting();
  });

  it("should navigate to Notifications from Homepage page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/notifications"]').click();
    cy.url().should("include", "/client/notifications");
    cy.get("a").should("exist").and("contain", "Notifications");
    cy.go("back");
    clientPage.checkBaseURLExisting();
  });

  it("should navigate to Notifications page through the Client page and then back", () => {
    cy.wait(500);
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    clientPage.checkClientNavigationExisting();
    cy.get("a").contains("Notifications").click();
    cy.get("div").contains("Notifications").should("exist");
    cy.go("back");
    clientPage.checkFavoritesURL();
    cy.go("back");
    clientPage.checkBaseURLExisting();
  });

  it("should switch between internal tabs in the client profile", () => {
    cy.wait(500);
    homePage.clickOnClientProfile();
    clientPage.checkFavoritesURL();
    cy.get("[data-cy='internal navigation']").should("exist");
    cy.get("a").should("exist").and("contain", "Favorites");
    cy.get('[data-cy="favorite list"]').should("exist");
    cy.get("a").contains("Notifications").click();
    cy.get("div").contains("Notifications").should("exist");
    cy.get("a").contains("Settings").click();
    cy.get("h2").contains("You can update your user data").should("exist");
    cy.get("a").contains("Orders History").click();
    cy.get("div").contains("Your orders history").should("exist");
  });

  it("should switch mode to dark and light after clicking switch-mode icon", () => {
    cy.wait(500);
    cy.get('[aria-label="switch mode"]').click();
    cy.get('body[class="dark-mode"]').should("exist");
    cy.get('[aria-label="switch mode"]').click();
    cy.get('body[class="dark-mode"]').should("not.exist");
  });

  it("should open modal window with logout button after click on exit icon", () => {
    cy.wait(500);
    cy.clickOnExitButton();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="exit accepting"]').should("be.visible");
    });
  });

  it("should logout user after click logout button", () => {
    cy.wait(500);
    cy.clickOnExitButton();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="exit accepting"]').should("be.visible");
    });
    cy.get('[aria-label="Logout"]').click();
    cy.window().its("store").invoke("dispatch", {
      type: "authSlice/logoutThunk",
    });
    cy.wait(500);
    cy.getReduxState().then((state) => {
      expect(state.auth.isLogged).to.equal(false);
    });
  });
});
