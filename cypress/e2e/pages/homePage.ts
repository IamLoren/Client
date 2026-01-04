class HomePage { 
    visit() {
        cy.visit('/');
    }

    getFirstHeartIcon() {
        cy.get('[aria-label="press to add this car to favorites"]')
      .first()
    }

    clickOnSignInButton() {
        cy.get("button").contains("SIGN IN").click();
    }

    signInFormSubmit() {
        cy.get('[data-cy="signInForm"]').submit();
    }

    clickOnSignUpButton() {
        cy.get("button").contains("SIGN UP").click();
    }

    signUpFormSubmit() {
        cy.get('[data-cy="signUpForm"]').submit();
    }

    getFirstRentButton() {
        cy.contains("button", "Rent now").first().click();
    }

    rentalCarFormSubmit() {
        cy.get('[data-cy="rentalCarForm"]').submit();
    }

    getCarsList() {
        cy.get('[data-cy="carsList"]')
    }

    selectMinimumPriceInput() {
        cy.get('input[aria-label="select minimum price"]')
    }

    selectMaximumPriceInput() {
        cy.get('input[aria-label="select maximum price"]')
    }

    clickOnPickUPCalendar() {
        cy.get('[data-cy="Pick-Up"]')
      .find(".react-datepicker__input-container")
      .click();
    }

    clickOnDropOffCalendar() {
        cy.get('[data-cy="Drop-Off"]')
      .find(".react-datepicker__input-container")
      .click();
    }

    clickOnClientProfile() {
        cy.get("a").contains("CLIENT PROFILE").click();
    }
}

export default new HomePage();