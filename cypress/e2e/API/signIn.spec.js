/// <reference types="cypress" />

import homePage from "../pages/homePage";

describe("SignIn API testing", ()=> {
    beforeEach(() => {
        homePage.visit();
      });

      it("should return userCredentials and ProfileData after signIn", ()=> {
        const apiUrl = Cypress.env("api_server");
        cy.intercept("POST", `${apiUrl}/api/auth/signin`).as("SignIn");

        cy.request({
            method: "POST",
            url: `${apiUrl}/api/auth/signin`,
            body: {
              email: "iryna@gmail.com",
              password: "asdfghjkl",
            },
          }).then((resp) => {
            expect(resp.status).to.equal(200);
            expect(resp.body).haveOwnProperty("token");
            expect(resp.body).haveOwnProperty("user");
            expect(resp.body.user).haveOwnProperty("avatarURL");
            expect(resp.body.user).haveOwnProperty("email");
            expect(resp.body.user).haveOwnProperty("favorites");
            expect(resp.body.user).haveOwnProperty("firstName");
            expect(resp.body.user).haveOwnProperty("history");
            expect(resp.body.user).haveOwnProperty("id");
            expect(resp.body.user).haveOwnProperty("lastName");
            expect(resp.body.user).haveOwnProperty("role");
            expect(resp.body.user).haveOwnProperty("theme");
          });
      })

      it("should return 400 for missing required fields", () => {
        const apiUrl = Cypress.env("api_server");
        cy.intercept("POST", `${apiUrl}/api/auth/signin`).as("SignIn");
    
        cy.request({
          method: "POST",
          url: `${apiUrl}/api/auth/signin`,
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

      it("should return 404 for invalid email", () => {
        const apiUrl = Cypress.env("api_server");
        cy.intercept("POST", `${apiUrl}/api/auth/signin`).as("SignIn");
    
        cy.request({
          method: "POST",
          url: `${apiUrl}/api/auth/signin`,
          failOnStatusCode: false,
          body: {
            email: "invalid@test.com",
            password: "asdfghjkl",
          },
        }).then((resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.statusText).to.equal("Not Found");
        });
      });

      it("should return 401 for invalid password", () => {
        const apiUrl = Cypress.env("api_server");
        cy.intercept("POST", `${apiUrl}/api/auth/signin`).as("SignIn");
    
        cy.request({
          method: "POST",
          url: `${apiUrl}/api/auth/signin`,
          failOnStatusCode: false,
          body: {
            email: "iryna@gmail.com",
            password: "invalidPassword",
          },
        }).then((resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.statusText).to.equal("Unauthorized");
        });
      });
})