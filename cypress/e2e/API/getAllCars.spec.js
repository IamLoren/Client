/// <reference types="cypress" />

describe("API: getAllCars", () => {
  const apiUrl = Cypress.env("api_server");
  const APIgetAllCars = Cypress.env("APIgetAllCars");

  it("should return a list of cars with status 200", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}${APIgetAllCars}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
      response.body.forEach((car) => {
        expect(car).to.have.property("make");
        expect(car).to.have.property("model");
        expect(car).to.have.property("year");
        expect(car).to.have.property("_id");
        expect(car).to.have.property("type");
        expect(car).to.have.property("engine");
        expect(car).to.have.property("fuel");
        expect(car).to.have.property("transmission");
        expect(car).to.have.property("price");
        expect(car).to.have.property("color");
        expect(car).to.have.property("img");
        expect(car).to.have.property("availability");
        expect(car).to.have.property("isRemoved");
      });
    });
  });

});
