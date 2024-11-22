/// <reference types="cypress" />

describe("API: getCurrent", () => {
    const apiUrl = Cypress.env("api_server");
    const apiCurrent = Cypress.env("APIcurrent");
  
    beforeEach(() => {
      cy.loginToApplication(); 
    });
  
    it("Should return user data for a valid token", () => {
      cy.window().then((win) => {
        const token = win.localStorage.getItem("authToken");
        expect(token).to.not.be.null;
  
        cy.request({
          method: "GET",
          url: `${apiUrl}${apiCurrent}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("firstName");
          expect(response.body).to.have.property("lastName");
          expect(response.body).to.have.property("email");
          expect(response.body).to.have.property("role");
          expect(response.body).to.have.property("favorites");
        });
      });
    });
  
    it("Should return 401 if no token is provided", () => {
      cy.request({
        method: "GET",
        url: `${apiUrl}${apiCurrent}`,
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
    });
  
    it("Should return 401 for an invalid token", () => {
      const invalidToken = "InvalidJWTTokenExample";
      cy.request({
        method: "GET",
        url: `${apiUrl}${apiCurrent}`,
        headers: {
          Authorization: `Bearer ${invalidToken}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.statusText).to.eq("Unauthorized");
      });
    });
  });