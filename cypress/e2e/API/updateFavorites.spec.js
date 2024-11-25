/// <reference types="cypress" />

describe("API: updateFavorites", () => {
  const apiUrl = Cypress.env("api_server");
  const APIupdateFavorites = Cypress.env("APIupdateFavorites");

  let authToken;
  let testUserId;

  let testCar = {
    _id: "670d10e33ca6a0d02fc434a3",
    make: "BMW",
    model: "i530",
    year: "2019",
    type: "sedan",
    engine: 2,
    fuel: "gasoline",
    transmission: "manual",
    price: { hour: 3, day: 35 },
    color: "blue",
    img: "https://res.cloudinary.com/carsphoto/image/upload/v1728239585/cars/BMW…",
    availability: [],
    isRemoved: false,
  };

  beforeEach(() => {
    cy.newUserRegistration();
    cy.then(() => {
      testUserId = Cypress.env("testUserId");
    });
    cy.loginToApplication();
  });

  it("Should add a car to favorites", () => {
    cy.window().then((win) => {
      authToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "PUT",
        url: `${apiUrl}${APIupdateFavorites}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: testCar,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Car added to favorites");
        expect(response.body.arrFavorite).to.be.an("array");
        expect(response.body.arrFavorite[0]).to.deep.include(testCar);
      });

      cy.loginAdmin();
      cy.window().then((win) => {
        const adminToken = win.localStorage.getItem("authToken");
        cy.deleteTestUser(testUserId, adminToken);
      });
    });
  });

  it("Should remove a car from favorites", () => {
    cy.window().then((win) => {
      authToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "PUT",
        url: `${apiUrl}${APIupdateFavorites}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: { _id: testCar._id },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Car removed from favorites");
        expect(response.body.arrFavorite).to.be.an("array").that.is.empty;
      });
    });

    cy.loginAdmin();
    cy.window().then((win) => {
      const adminToken = win.localStorage.getItem("authToken");
      cy.deleteTestUser(testUserId, adminToken);
    });
  });

  it("Should return an error if car data is missing", () => {
    cy.window().then((win) => {
      authToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "PUT",
        url: `${apiUrl}${APIupdateFavorites}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        failOnStatusCode: false,
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.include(
          "Request body doesn't contain carId to add to favorites"
        );
      });
    });

    cy.loginAdmin();
    cy.window().then((win) => {
      const adminToken = win.localStorage.getItem("authToken");
      cy.deleteTestUser(testUserId, adminToken);
    });
  });

  it("Should return an error if profile not found", () => {
    cy.request({
      method: "PUT",
      url: `${apiUrl}${APIupdateFavorites}`,
      headers: {
        Authorization: `Bearer fakeToken`,
      },
      failOnStatusCode: false,
      body: testCar,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.statusText).to.include("Unauthorized");
    });

    cy.loginAdmin();
    cy.window().then((win) => {
      const adminToken = win.localStorage.getItem("authToken");
      cy.deleteTestUser(testUserId, adminToken);
    });
  });
});
