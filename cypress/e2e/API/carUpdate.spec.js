/// <reference types="cypress" />

describe("API: updateCar", () => {
  const apiUrl = Cypress.env("api_server");
  const APIupdateCar = "/api/cars/:id";
  const carId = "670d10e33ca6a0d02fc434a3";
  const testCarData = {
    orderId: "67313cabca92ba592a3574e0",
    startDate: "2024-11-25T09:25:09.659Z",
    endDate: "2024-11-27T10:00:00.000Z",
  };

  it("should successfully update a car when user is an admin", () => {
    cy.loginAdmin();

    cy.window().then((win) => {
      const adminToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "PUT",
        url: `${apiUrl}/api/cars/${carId}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: testCarData,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("updatedCar");
        expect(response.body.updatedCar).to.have.property("availability");
        const updatedCar = response.body.updatedCar;
        const availabilityArray = updatedCar.availability;

        const isEntryAdded = availabilityArray.some(
          (entry) =>
            entry.orderId === testCarData.orderId &&
            entry.startDate === testCarData.startDate &&
            entry.endDate === testCarData.endDate
        );
        expect(isEntryAdded).to.be.true;
      });
    });
  });

  it("should return an error if user unauthorized", () => {
    cy.request({
      method: "PUT",
      url: `${apiUrl}/api/cars/${carId}`,
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer",
      },
      body: testCarData,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.statusText).to.eq("Unauthorized");
    });
  });

  it("should return an error if user is not an admin", () => {
    cy.loginToApplication();

    cy.window().then((win) => {
      const userToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "PUT",
        url: `${apiUrl}/api/cars/${carId}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: testCarData,
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });

  it("should return an error if the car with the given id does not exist", () => {
    const invalidCarId = "64c0b9f4a36dcd4b3480a999";
    cy.loginAdmin();

    cy.window().then((win) => {
      const adminToken = win.localStorage.getItem("authToken");

      cy.request({
        method: "PUT",
        url: `${apiUrl}/api/cars/${invalidCarId}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: testCarData,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property("message", "not updated");
      });
    });
  });
});
