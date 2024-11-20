/// <reference types="cypress" />

import { default as homePage } from "../pages/homePage";
import { default as ModalForms } from "../pages/ModalForms";

describe("SignUp API testing", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should return userCredentials after signUp", () => {
    const apiUrl = Cypress.env("api_server");
    cy.intercept("POST", `${apiUrl}/api/auth/signup`).as("SignUp");

    homePage.clickOnSignUpButton();
    ModalForms.validSignUpData();
    homePage.signUpFormSubmit();

    cy.wait("@SignUp").then((resp) => {
      expect(resp.response.statusCode).to.equal(201);

      const expectedRequestBody = {
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "password123",
        role: "user",
        terms: true,
      };

      const userId = resp.response.body.user.id;
      const token = resp.response.body.token;

      expect(resp.request.body).to.deep.equal(expectedRequestBody);
      expect(resp.response.body).haveOwnProperty("token");
      expect(resp.response.body).haveOwnProperty("user");
      expect(resp.response.body.user).haveOwnProperty("email");
      expect(resp.response.body.user).haveOwnProperty("firstName");
      expect(resp.response.body.user).haveOwnProperty("lastName");
      expect(resp.response.body.user).haveOwnProperty("id");
      expect(resp.response.body.user).haveOwnProperty("role");

      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/user/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body.message).to.equal(
          "User and profile deleted successfully"
        );
      });
    });
  });

  it("should return 400 for missing required fields", () => {
    const apiUrl = Cypress.env("api_server");
    cy.intercept("POST", `${apiUrl}/api/auth/signup`).as("SignUp");

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/auth/signup`,
      failOnStatusCode: false,
      body: {
        email: "",
        password: "",
      },
    }).then((resp) => {
      expect(resp.status).to.equal(400);
      expect(resp.statusText).to.equal("Bad Request");
    });
  });

  it("should return 409 for duplicate email", () => {
    const apiUrl = Cypress.env("api_server");
    const userData = {
      email: "existing.user@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "password123",
      role: "user",
      terms: true,
    };

    cy.request("POST", `${apiUrl}/api/auth/signup`, userData).then((resp) => {
      expect(resp.status).to.equal(201);
      const userId = resp.body.user.id;
      const token = resp.body.token;

      cy.request({
        method: "POST",
        url: `${apiUrl}/api/auth/signup`,
        failOnStatusCode: false,
        body: userData,
      }).then((resp) => {
        expect(resp.status).to.equal(409);
        expect(resp.statusText).to.equal("Conflict");
      });

      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/user/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body.message).to.equal(
          "User and profile deleted successfully"
        );
      });
    });
  });

  it("should handle maximum input lengths", () => {
    const apiUrl = Cypress.env("api_server");
    const longString = "a".repeat(256);
    const userData = {
      email: `${longString}@example.com`,
      firstName: longString,
      lastName: longString,
      password: "password123",
      role: "user",
      terms: true,
    };

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/auth/signup`,
      failOnStatusCode: false,
      body: userData,
    }).then((resp) => {
      expect(resp.status).to.equal(400);
      expect(resp.statusText).to.equal("Bad Request");
    });
  });

  it("should return 401 for unauthorized user deletion", () => {
    const apiUrl = Cypress.env("api_server");

    cy.request({
      method: "DELETE",
      url: `${apiUrl}/api/user/someUserId`,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.equal(401);
      expect(resp.statusText).to.equal("Unauthorized");
    });
  });
});