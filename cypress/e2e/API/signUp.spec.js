/// <reference types="cypress" />

import { default as homePage } from "../pages/homePage";
import { default as ModalForms } from "../pages/ModalForms";

describe("API: SignUp", () => {
  const apiUrl = Cypress.env("api_server");
  const APIsignUp = Cypress.env("APIsignUp");


  beforeEach(() => {
    homePage.visit();
  });

  it("should return userCredentials after signUp", () => {
    const userValidPassword = Cypress.env("user_valid_password")

    cy.request({
      method: "POST",
      url: `${apiUrl}${APIsignUp}`,
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: userValidPassword,
        terms: true,
        role: "user"
      },
    }).then((resp) => {
      expect(resp.status).to.equal(201);
     
      const userId = resp.body.user.id; cy.log(userId)
      const token = resp.body.token;
      expect(resp.body).haveOwnProperty("token");
      expect(resp.body).haveOwnProperty("user");
      expect(resp.body.user).haveOwnProperty("email").to.equal("john.doe@example.com");
      expect(resp.body.user).haveOwnProperty("firstName").to.equal("John");
      expect(resp.body.user).haveOwnProperty("lastName").to.equal("Doe");
      expect(resp.body.user).haveOwnProperty("id");
      expect(resp.body.user).haveOwnProperty("role").to.equal("user");

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
  

    cy.request({
      method: "POST",
      url: `${apiUrl}${APIsignUp}`,
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

    cy.request("POST", `${apiUrl}${APIsignUp}`, userData).then((resp) => {
      expect(resp.status).to.equal(201);
      const userId = resp.body.user.id;
      const token = resp.body.token;

      cy.request({
        method: "POST",
        url: `${apiUrl}${APIsignUp}`,
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
      url: `${apiUrl}${APIsignUp}`,
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
