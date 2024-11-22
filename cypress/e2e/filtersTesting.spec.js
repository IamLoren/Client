/// <reference types="cypress" />

import { default as homePage } from "./pages/homePage";

describe("TypeFilter Component", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should display all car types as checkboxes", () => {
    const expectedCarTypes = ["SUV", "sedan", "hatchback", "crossover"];

    cy.get('input[data-cy="carType"]').should(
      "have.length",
      expectedCarTypes.length
    );

    homePage.getCarsList()
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

      homePage.getCarsList()
      .should("contain", "SUV")
      .and("not.contain", "crossover")
      .and("not.contain", "sedan")
      .and("not.contain", "hatchback");

    cy.get(`input[aria-label="select ${carType}"]`)
      .uncheck()
      .should("not.be.checked");

      homePage.getCarsList()
      .should("contain", "SUV")
      .and("contain", "crossover")
      .and("contain", "sedan")
      .and("contain", "hatchback");
  });
});

describe("TransmissionFilter Component", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should display all car types as checkboxes", () => {
    const expectedTransmissionTypes = ["automatic", "manual"];

    cy.get('input[data-cy="transmission"]').should(
      "have.length",
      expectedTransmissionTypes.length
    );

    homePage.getCarsList()
      .should("contain", "automatic")
      .and("contain", "manual");
  });

  it("should select and deselect transmission types and change list of cars", () => {
    const transmissionType = "Automatic";
    cy.get(`label`)
      .contains("Automatic")
      .find('input[type="checkbox"]')
      .check()
      .should("be.checked");

      homePage.getCarsList()
      .should("contain", "automatic")
      .and("not.contain", "manual");

    cy.get(`label`)
      .contains(transmissionType)
      .find('input[type="checkbox"]')
      .uncheck()
      .should("not.be.checked");

      homePage.getCarsList()
      .should("contain", "automatic")
      .and("contain", "manual");
  });
});

describe("PriceRangeSlider Component", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should display min and max price sliders", () => {
    homePage.selectMinimumPriceInput().should("exist");
    homePage.selectMaximumPriceInput().should("exist");
  });

  it("should display correct min and max prices", () => {
    cy.get("span").contains("Min Price:").should("exist");
    cy.get("span").contains("Max Price:").should("exist");
  });

  it("should update Redux store and min price when min slider is changed", () => {
    const newMinPrice = 80;
    cy.wait(1000);
    homePage.selectMinimumPriceInput().as("minSlider");

    cy.get("@minSlider").invoke("val", newMinPrice).trigger("change");
    cy.window().its("store").invoke("dispatch", {
      type: "carRentalSlice/changeMinPrice",
      payload: newMinPrice,
    });
    cy.wait(500);
    cy.getReduxState().then((state) => {
      expect(state.cars.selectedMinPrice).to.equal(newMinPrice);
    });
    cy.get('span[data-cy="minPrice"]').should(
      "contain",
      `Min Price: $${newMinPrice}`
    );
  });

  it("should update Redux store and max price when max slider is changed", () => {
    const newMaxPrice = 100;
    cy.wait(500);
    homePage.selectMaximumPriceInput()
      .invoke("val", newMaxPrice)
      .trigger("change");
    cy.window().its("store").invoke("dispatch", {
      type: "carRentalSlice/changeMaxPrice",
      payload: newMaxPrice,
    });
    cy.wait(500);
    cy.getReduxState().then((state) => {
      expect(state.cars.selectedMaxPrice).to.equal(newMaxPrice);
    });
    cy.get('span[data-cy="maxPrice"]').should(
      "contain",
      `Max Price: $${newMaxPrice}`
    );
  });

  it("should not allow min price to exceed max price", () => {
    homePage.selectMaximumPriceInput()
      .invoke("val", 80)
      .trigger("change");
    cy.window().its("store").invoke("dispatch", {
      type: "carRentalSlice/changeMaxPrice",
      payload: 80,
    });

    homePage.selectMinimumPriceInput()
      .invoke("val", 90)
      .trigger("change");

    cy.getReduxState().then((state) => {
      expect(state.cars.selectedMinPrice).to.equal(80);
    });
    cy.get('span[data-cy="minPrice"]').should("contain", `Min Price: $80`);
  });

  it("should not allow max price to be below min price", () => {
    cy.wait(1000);
    homePage.selectMinimumPriceInput()
      .invoke("val", 30)
      .trigger("change");
      homePage.selectMaximumPriceInput()
      .invoke("val", 20)
      .trigger("change");

    cy.wait(500);

    cy.get("span").should("contain", "Max Price: $30");
  });
});

describe("DateTime Component", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should render the DateTime component with correct title", () => {
    cy.get("p").contains("Pick-Up").should("exist");
  });

  it("should render the DateTime component with correct title", () => {
    cy.get("p").contains("Drop-Off").should("exist");
  });

  it("should display two date picker inputs", () => {
    cy.get(".react-datepicker__input-container").should("have.length", 2);
  });

  it("should allow selecting a Pick-Up date", () => {
    homePage.clickOnPickUPCalendar();
    cy.get(
      "[class='react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time']"
    ).click();

    cy.get(".react-datepicker__day--020").trigger("input").click();
    cy.get(".react-datepicker__time-list-item")
      .not("[aria-disabled='true']")
      .first()
      .invoke("text")
      .then((selectedTime) => {
        cy.wrap(selectedTime).as("time");

        cy.get(".react-datepicker__time-list-item")
          .contains(selectedTime.trim())
          .click();

        cy.get('[data-cy="Pick-Up"]')
          .find("input")
          .should("have.value", `December 20, 2024 ${selectedTime.trim()}`);
      });
  });

  it("should update the Redux store when a Pick-Up date is selected", () => {
    const dateToSelect = new Date();
    dateToSelect.setDate(dateToSelect.getDate() + 1);

    homePage.clickOnPickUPCalendar();

    const dayToSelect = dateToSelect.getDate().toString().padStart(2, "0");
    cy.get(`.react-datepicker__day--0${dayToSelect}`)
      .not(".react-datepicker__day--outside-month")
      .click();

      cy.window().its("store").invoke("dispatch", {
        type: "carRentalSlice/setRentalTime",
        payload:{name: "Pick-Up", time: dateToSelect.toISOString()} ,
      });

      cy.wait(500)

    cy.getReduxState().then((state) => {
      expect(state.cars.startDate.slice(0, -5)).to.equal(
        dateToSelect.toISOString().slice(0, -5)
      );
    });
  });

  it("should not allow selecting past dates as a Pick-Up day", () => {
    homePage.clickOnPickUPCalendar();

    cy.get(".react-datepicker__day--001").should(
      "have.class",
      "react-datepicker__day--disabled"
    );
  });

  it("should allow selecting a Drop-Off date", () => {
    homePage.clickOnDropOffCalendar();
    cy.get(
      "[class='react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time']"
    ).click();

    cy.get(".react-datepicker__day--021").trigger("input").click();
    cy.get(".react-datepicker__time-list-item")
      .not("[aria-disabled='true']")
      .first()
      .invoke("text")
      .then((selectedTime) => {
        cy.wrap(selectedTime).as("time");

        cy.get(".react-datepicker__time-list-item")
          .contains(selectedTime.trim())
          .click();

        cy.get('[data-cy="Drop-Off"]')
          .find("input")
          .should("have.value", `December 21, 2024 ${selectedTime.trim()}`);
      });
  });

  it("should update the Redux store when a Drop-Off date is selected", () => {
    const dateToSelect = new Date();
    dateToSelect.setDate(dateToSelect.getDate() + 2);

    homePage.clickOnDropOffCalendar();
      cy.get(
        "[class='react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time']"
      ).click();  
      cy.get(`.react-datepicker__day--0${String(dateToSelect.getDate()).padStart(2, '0')}`).trigger("input").click();

      cy.window().its("store").invoke("dispatch", {
        type: "carRentalSlice/setRentalTime",
        payload: {name: "Drop-Off", time: dateToSelect.toISOString()},
      });

      cy.wait(500)
    cy.getReduxState().then((state) => {
      expect(state.cars.endDate.slice(0, -5)).to.equal(
        dateToSelect.toISOString().slice(0, -5)
      );
    });
  });

  it("should not allow selecting a Drop-Off day below a Pick-Up day", () => {
    homePage.clickOnPickUPCalendar();
    cy.get(
      "[class='react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time']"
    ).click();

    cy.get(".react-datepicker__day--020").trigger("input").click();
    cy.get(".react-datepicker__time-list-item")
      .not("[aria-disabled='true']")
      .first()
      .trigger("input")
      .click();

      homePage.clickOnDropOffCalendar();
    cy.get(
      "[class='react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time']"
    ).click();

    cy.get(".react-datepicker__day--019").should(
      "have.attr",
      "aria-disabled",
      "true"
    );

    cy.get(".react-datepicker__time-list-item")
      .contains("12:00 AM")
      .should("have.attr", "aria-disabled", "true");
  });
});