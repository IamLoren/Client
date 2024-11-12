/// <reference types="cypress" />

describe("Navigation Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="email"]').type("iryna@gmail.com");
    cy.get('input[name="password"]').type("asdfghjkl");
    cy.get('[data-cy="signInForm"]').submit();
  });

  it("should navigate to Client profile page", () => {
    cy.get("a").contains("CLIENT PROFILE").click();

    cy.url().should("include", "/client/favorites");
    cy.get("a").should("exist").and("contain", "Favorites");
  });

  it("should navigate back to Home page", () => {
    cy.get("a").contains("CLIENT PROFILE").click();
    cy.url().should("include", "/client/favorites");

    cy.go("back");

    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate back to Home page after Catalog click", () => {
    cy.get("a").contains("CLIENT PROFILE").click();
    cy.url().should("include", "/client/favorites");
    cy.get("a").contains("CATALOG").click();

    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate back to Home page after Logo click", () => {
    cy.get("a").contains("CLIENT PROFILE").click();
    cy.url().should("include", "/client/favorites");
    cy.get("a[aria-label='pass to home page']").click();

    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate to Setting page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/settings"]').click();
    cy.url().should("include", "/client/settings");
    cy.get("a").should("exist").and("contain", "Settings");

    cy.go("back");

    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate to Setting page through the Client page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/favorites"]').click();
    cy.url().should("include", "/client/favorites");
    cy.get("a").should("exist").and("contain", "Favorites");
    cy.get("a").contains("Settings").click();

    cy.go("back");
    cy.url().should("include", "/client/favorites");
    cy.go("back");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate to History page through the Client page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/favorites"]').click();
    cy.url().should("include", "/client/favorites");
    cy.get("a").should("exist").and("contain", "Favorites");
    cy.get("a").contains("Orders History").click();
    cy.get("div").contains("Your orders history").should("exist");

    cy.go("back");
    cy.url().should("include", "/client/favorites");
    cy.go("back");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate to Notifications from Homepage page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/notifications"]').click();
    cy.url().should("include", "/client/notifications");
    cy.get("a").should("exist").and("contain", "Notifications");

    cy.go("back");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should navigate to Notifications page through the Client page and then back", () => {
    cy.wait(500);
    cy.get('a[href="/client/favorites"]').click();
    cy.url().should("include", "/client/favorites");
    cy.get("a").should("exist").and("contain", "Favorites");
    cy.get("a").contains("Notifications").click();
    cy.get("div").contains("Notifications").should("exist");

    cy.go("back");
    cy.url().should("include", "/client/favorites");
    cy.go("back");
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("should switch between internal tabs in the client profile", () => {
    cy.wait(500);
    cy.get('a[href="/client/favorites"]').click();
    cy.url().should("include", "/client/favorites");
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
    cy.get('[aria-label="Exit button"]').click();
    cy.get('#modal-root').within(() => {
        cy.get('[data-cy="exit accepting"]').should('be.visible');
      });
  });

  it("should logout user after click logout button", () => {
    cy.wait(500);
    cy.get('[aria-label="Exit button"]').click();
    cy.get('#modal-root').within(() => {
        cy.get('[data-cy="exit accepting"]').should('be.visible');
      });
     cy.get('[aria-label="Logout"]').click();
     cy.window().its("store").invoke("dispatch", {
        type: "authSlice/logoutThunk"
      });
      cy.wait(500);
      cy.getReduxState().then((state) => {
        expect(state.auth.isLogged).to.equal(false);
      });
  });
});
