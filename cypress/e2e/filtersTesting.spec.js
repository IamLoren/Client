/// <reference types="cypress" />

describe("TypeFilter Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display all car types as checkboxes", () => {
    const expectedCarTypes = ["SUV", "sedan", "hatchback", "crossover"];

    cy.get('input[data-cy="carType"]').should(
      "have.length",
      expectedCarTypes.length
    );

    cy.get('[data-cy="carsList"]')
      .should("contain", "SUV")
      .and("contain", "crossover")
      .and("contain", "sedan")
      .and("contain", "hatchback");
  });

  it("should select and deselect car types and change list of cars", () => {
    const carType = "SUV";
    cy.get(`input[aria-label="select ${carType}"]`)
      .check()
      .should("be.checked");

    cy.get('[data-cy="carsList"]')
      .should("contain", "SUV")
      .and("not.contain", "crossover")
      .and("not.contain", "sedan")
      .and("not.contain", "hatchback");

    cy.get(`input[aria-label="select ${carType}"]`)
      .uncheck()
      .should("not.be.checked");

    cy.get('[data-cy="carsList"]')
      .should("contain", "SUV")
      .and("contain", "crossover")
      .and("contain", "sedan")
      .and("contain", "hatchback");
  });
});

describe("TransmissionFilter Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display all car types as checkboxes", () => {
    const expectedTransmissionTypes = ["automatic", "manual"];

    cy.get('input[data-cy="transmission"]').should(
      "have.length",
      expectedTransmissionTypes.length
    );

    cy.get('[data-cy="carsList"]')
      .should("contain", "automatic")
      .and("contain", "manual");
  });

  it("should select and deselect transmission types and change list of cars", () => {
    const transmissionType = "automatic";
    cy.get(`label`)
      .contains("automatic")
      .find('input[type="checkbox"]')
      .check()
      .should("be.checked");

    cy.get('[data-cy="carsList"]')
      .should("contain", "automatic")
      .and("not.contain", "manual");

    cy.get(`label`)
      .contains(transmissionType)
      .find('input[type="checkbox"]')
      .uncheck()
      .should("not.be.checked");

    cy.get('[data-cy="carsList"]')
      .should("contain", "automatic")
      .and("contain", "manual");
  });
});

describe("PriceRangeSlider Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display min and max price sliders", () => {
    cy.get('input[aria-label="select minimum price"]').should("exist");
    cy.get('input[aria-label="select maximum price"]').should("exist");
  });

  it("should display correct min and max prices", () => {
    cy.get("span").contains("Min Price:").should("exist");
    cy.get("span").contains("Max Price:").should("exist");
  });

  it("should update min price when min slider is changed", () => {
    const newMinPrice = 40;
    cy.wait(3000);
    cy.get('input[aria-label="select minimum price"]').as("minSlider");

    cy.get("@minSlider").invoke("val", newMinPrice);
    cy.get("@minSlider").trigger("input");
    cy.get("@minSlider").trigger("change");

    cy.wait(3000);
    cy.get('span[data-cy="minPrice"]').should(
      "contain",
      `Min Price: $${newMinPrice}`
    );
  });

  it("should update max price when max slider is changed", () => {
    const newMaxPrice = 100;
    cy.wait(3000);
    cy.get('input[aria-label="select maximum price"]')
      .invoke("val", newMaxPrice)
      .trigger("change");
      cy.wait(3000);
    cy.get('span[data-cy="maxPrice"]')
      .should("contain", `Max Price: $${newMaxPrice}`)
  });

  it("should not allow min price to exceed max price", () => {
    cy.get('input[aria-label="select minimum price"]')
      .invoke("val", 90)
      .trigger("change");

    cy.get('input[aria-label="select maximum price"]')
      .invoke("val", 80)
      .trigger("change");
      cy.wait(3000);
      cy.get('span[data-cy="minPrice"]').should(
        "contain",
        `Min Price: $80`
      );;
  });

  it("should not allow max price to be below min price", () => {
    cy.wait(3000);
    cy.get('input[aria-label="select minimum price"]')
      .invoke("val", 30)
      .trigger("change");
    cy.get('input[aria-label="select maximum price"]')
      .invoke("val", 20)
      .trigger("change");

      cy.wait(3000);

    cy.get("span").should("contain", "Max Price: $30");
  });
});
