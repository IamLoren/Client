/// <reference types="cypress" />

describe("API: getAllUsers)", () => {
  const apiUrl = Cypress.env("api_server");
  const APIGetUsers = Cypress.env("APIuser");

  const adminCredentials = {
    email: "admin@example.com",
    password: "adminpassword",
  };

  let adminToken;

  it("Should return a list of all users for admin", () => {
    cy.loginAdmin();
    cy.window().then((win) => {
      adminToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "GET",
        url: `${apiUrl}${APIGetUsers}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).haveOwnProperty("allUsers");
        expect(response.body.allUsers).to.be.an("array");
        response.body.allUsers.forEach((user) => {
          expect(user).to.include.all.keys(
            "_id",
            "email",
            "role",
            "firstName",
            "lastName"
          );
        });
      });
    });
  });

  it("Should return 403 for non-admin users", () => {
    cy.loginToApplication();
    cy.window().then((win) => {
      const userToken = win.localStorage.getItem("authToken");

          cy.request({
          method: "GET",
          url: `${apiUrl}${APIGetUsers}`,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          failOnStatusCode: false,
        });
      })
      .then((response) => {
        expect(response.status).to.eq(403);
    });
  });

  it("Should return 401 for unauthorized requests", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}${APIGetUsers}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
