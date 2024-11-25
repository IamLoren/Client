/// <reference types="cypress" />

Cypress.Commands.add("getReduxState", () => {
  return cy.window().its("store").invoke("getState");
});

Cypress.Commands.add("loginToApplication", () => {
  const apiUrl = Cypress.env("api_server");
  const password = Cypress.env("user_valid_password");
  const userCredentials = {
    email: "iryna@gmail.com",
    password: password,
  };

  cy.request("POST", `${apiUrl}/api/auth/signin`, userCredentials)
    .its("body")
    .then((body) => {
      const token = body.token;
      cy.visit("/", {
        onLoad(win) {
          win.localStorage.setItem("authToken", token);
        },
      });
      cy.wait(500);
    });
});

Cypress.Commands.add("loginAdmin", () => {
  const apiUrl = Cypress.env("api_server");
  const password = Cypress.env("user_valid_password");
  const userCredentials = {
    email: "carrental795@gmail.com",
    password: password,
  };

  cy.request("POST", `${apiUrl}/api/auth/signin`, userCredentials)
    .its("body")
    .then((body) => {
      const token = body.token;
      cy.visit("/", {
        onLoad(win) {
          win.localStorage.setItem("authToken", token);
        },
      });
    });
});

Cypress.Commands.add("clickOnExitButton", () => {
  cy.get('[aria-label="Exit button"]').click();
});

Cypress.Commands.add("addToFavorites", (carName: string) => {
  cy.contains("h3", carName)
    .parent()
    .parent()
    .within(() => {
      cy.get('[aria-label="press to add this car to favorites"]').click();
    });
});

Cypress.Commands.add("newUserRegistration", () => {
    const apiUrl = Cypress.env("api_server");
    const signUpRoute = Cypress.env("APIsignUp");

    cy.request("POST", `${apiUrl}${signUpRoute}`, {
        email: "testuser@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
        role: "user",
        terms: true,
      }).then((response) => {
        expect(response.status).to.eq(201);
        Cypress.env("testUserId", response.body.user.id);
      });
});

Cypress.Commands.add("deleteTestUser", (testUserId, adminToken)=> {
    const apiUrl = Cypress.env("api_server");
    cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/user/${testUserId}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body.message).to.equal(
          "User and profile deleted successfully"
        );
      });
})