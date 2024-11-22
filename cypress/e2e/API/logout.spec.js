/// <reference types="cypress" />

describe("API: Logout", () => {
    const apiUrl = Cypress.env("api_server");
    const apiLogout = Cypress.env("APIlogout");
    
    beforeEach(() => {
      cy.loginToApplication(); 
    });
  
    it("Should successfully logout with a valid token", () => {
      cy.window().then((win) => {
        const token = win.localStorage.getItem("authToken");
        expect(token).to.not.be.null; 
  
        cy.request({
          method: "POST",
          url: `${apiUrl}${apiLogout}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => { 
            expect(response.status).to.eq(204); 
        })
      });
    });
  
    it("Should return 401 if no token is provided", () => {
      cy.request({
        method: "POST",
        url: `${apiUrl}${apiLogout}`,
        failOnStatusCode: false, 
      }).then((response) => {
        expect(response.status).to.eq(401); 
        expect(response.statusText).to.eq("Unauthorized");
      });
    });
  
    it("Should return 401 for an invalid token", () => {
      const invalidToken = "InvalidJWTTokenExample";
      cy.request({
        method: "POST",
        url: `${apiUrl}${apiLogout}`,
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