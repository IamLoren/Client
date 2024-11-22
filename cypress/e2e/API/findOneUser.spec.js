/// <reference types="cypress" />

describe("API: findOneUser", () => {
  const apiUrl = Cypress.env("api_server");
  const findUserRoute = Cypress.env("APIfindUser");
  const signUpRoute = Cypress.env("APIsignUp");
  let adminToken;
  let testUserId;

  before(() => {
    cy.request("POST", `${apiUrl}${signUpRoute}`, {
      email: "testuser@example.com",
      password: "password123",
      firstName: "Test",
      lastName: "User",
      role: "user",
      terms: true,
    }).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(response.body.user.id);
      testUserId = response.body.user.id;
    });
    cy.log(testUserId)
    cy.loginAdmin();
  });

  it("Should return user details when requested by an admin", () => {
    cy.window().then((win) => {
      adminToken = win.localStorage.getItem("authToken");
      cy.request({
        method: "GET",
        url: `${apiUrl}${findUserRoute}/${testUserId}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("client");
        expect(response.body.client).to.include.all.keys(
          "_id",
          "email",
          "role",
          "firstName",
          "lastName"
        );
        expect(response.body.client._id).to.eq(testUserId);
      });
      cy.log(testUserId)
      cy.log(adminToken)
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
    });
  });

  it("Should return 403 if a non-admin user tries to access", () => {
    cy.loginToApplication();
    cy.window().then((win) => {
      const userToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "GET",
        url: `${apiUrl}${findUserRoute}/${testUserId}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });

  it("Should return 404 if the user does not exist", () => {
    const fakeUserId = "647e7f7f7e7f7e7f7e7f7f7f";

    cy.request({
      method: "GET",
      url: `${apiUrl}${findUserRoute}/${fakeUserId}`,
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("Should return 401 if no token is provided", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}${findUserRoute}/${testUserId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
