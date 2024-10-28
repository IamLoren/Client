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
    const newMinPrice = 80;
    cy.wait(3000);
    cy.get('input[aria-label="select minimum price"]').as("minSlider");

//     cy.get("@minSlider")
//   .then(($el) => {
//     const width = $el.width();
//     const startX = $el.offset().left + 5; 
//     const endX = startX + width - 10; 

//     cy.wrap($el)
//       .trigger('mousedown', { which: 1, pageX: startX }) 

    
//       .trigger('mousemove', { pageX: startX + width * 0.25 })
//       .wait(100) 
//       .trigger('mousemove', { pageX: startX + width * 0.5 })
//       .wait(100)
//       .trigger('mousemove', { pageX: startX + width * 0.75 })
//       .wait(100)
//       .trigger('mousemove', { pageX: endX })

//       .trigger('mouseup');
//   });

//     cy.get("@minSlider")
//   .trigger('mousedown', { which: 1, pageX: 0 }) 
//   .trigger('mousemove', { pageX: 100 }) 
//   .trigger('mouseup'); 

    // cy.get("@minSlider").focus().should('have.focus');  
    // cy.get("@minSlider").trigger('keydown', { key: 'ArrowRight' }).trigger('keydown', { key: 'ArrowRight' }).trigger('keydown', { key: 'ArrowRight' }).trigger('keydown', { key: 'ArrowRight' })

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
    cy.get('span[data-cy="maxPrice"]').should(
      "contain",
      `Max Price: $${newMaxPrice}`
    );
  });

  it("should not allow min price to exceed max price", () => {
    cy.get('input[aria-label="select minimum price"]')
      .invoke("val", 90)
      .trigger("change");

    cy.get('input[aria-label="select maximum price"]')
      .invoke("val", 80)
      .trigger("change");
    cy.wait(3000);
    cy.get('span[data-cy="minPrice"]').should("contain", `Min Price: $80`);
  });

  it("should not allow max price to be below min price", () => {
    cy.wait(500);
    cy.get('input[aria-label="select minimum price"]')
      .invoke("val", 30)
      .trigger("change");
    cy.get('input[aria-label="select maximum price"]')
      .invoke("val", 20)
      .trigger("change");

    cy.wait(500);

    cy.get("span").should("contain", "Max Price: $30");
  });
});

describe("DateTime Component", () => {
  beforeEach(() => {
    cy.visit("/"); // Replace with the actual route where DateTime is used.
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

  it("should allow selecting a date", () => {
    cy.get('[data-cy="Pick-Up"]')
      .find(".react-datepicker__input-container")
      .click();
    cy.get('[class="react-datepicker__month-container"]')
      .find("[aria-label='Next Month']")
      .click();

    cy.get(".react-datepicker__day--020").trigger("input").click();
    cy.get(".react-datepicker__time-list-item")
      .first()
      .trigger("input")
      .click();

    cy.get('[data-cy="Pick-Up"]')
      .find("input")
      .should("have.value", "November 20, 2024 12:00 AM");
  });

  it("should update the Redux store when a date is selected", () => {
    const dateToSelect = new Date();
    dateToSelect.setDate(dateToSelect.getDate() + 1);

    // Open the date picker
    cy.get(".react-datepicker__input-container").click();

    // Select a date
    cy.get(".react-datepicker__day--003").click(); // Clicks on the 2nd day of the month; adjust accordingly.

    // Check if the Redux state has been updated (assuming you have a way to check it)
    cy.window()
      .its("store")
      .invoke("getState")
      .its("carRental.startDate")
      .should("equal", dateToSelect.toISOString());
  });

  it("should not allow selecting past dates", () => {
    // Open the date picker
    cy.get(".react-datepicker__input-container").click();

    // Ensure that past dates are not selectable
    cy.get(".react-datepicker__day--003").should(
      "have.class",
      "react-datepicker__day--disabled"
    ); // Adjust according to the actual disabled class in your DatePicker.
  });
});
