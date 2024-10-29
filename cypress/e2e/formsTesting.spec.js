/// <reference types="cypress" />

describe("SignUpForm validation testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays validation errors when submitting empty form", () => {
    cy.get("button").contains("SIGN UP").click();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="signUpForm"]').should("be.visible");
    });
    cy.get('[data-cy="signUpForm"]').submit();
    cy.contains("Required").should("be.visible");
    cy.contains("Required").should("be.visible");
    cy.contains("Required").should("be.visible");
    cy.contains("You must accept the terms and conditions").should(
      "be.visible"
    );
  });

  it("displays error for short names", () => {
    cy.get("button").contains("SIGN UP").click();
    cy.get('input[name="firstName"]').type("A");
    cy.get('input[name="lastName"]').type("B");
    cy.get('[data-cy="signUpForm"]').submit();
    cy.contains("Must be at least 2 characters").should("be.visible");
  });

  it("displays error for invalid email", () => {
    cy.get("button").contains("SIGN UP").click();
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('[data-cy="signUpForm"]').submit();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("displays error for short password", () => {
    cy.get("button").contains("SIGN UP").click();
    cy.get('input[name="password"]').type("123");
    cy.get('[data-cy="signUpForm"]').submit();
    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  it("requires terms and conditions to be checked", () => {
    cy.get("button").contains("SIGN UP").click();
    cy.get('input[name="terms"]').uncheck();
    cy.get('[data-cy="signUpForm"]').submit();
    cy.contains("You must accept the terms and conditions").should(
      "be.visible"
    );
  });

  it("submits successfully when all fields are valid", () => {
    cy.get("button").contains("SIGN UP").click();
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="terms"]').check();
    cy.get('[data-cy="signUpForm"]').submit();
    cy.contains("You have been registered as a new user").should("be.visible"); // Приклад
  });
});

describe("SignInForm validation testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays validation errors when submitting empty form", () => {
    cy.get("button").contains("SIGN IN").click();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="signInForm"]').should("be.visible");
    });
    cy.get('[data-cy="signInForm"]').submit();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("displays error for invalid email", () => {
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('[data-cy="signInForm"]').submit();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("displays error for short password", () => {
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="password"]').type("123");
    cy.get('[data-cy="signInForm"]').submit();
    cy.contains("Must be at least 8 characters").should("be.visible");
  });

  it("submits successfully when all fields are valid", () => {
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('[data-cy="signInForm"]').submit();
    cy.contains("You succesfully accessed your personal profile").should(
      "be.visible"
    );
  });
});

describe("OrderForm validation testing", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("SIGN IN").click();
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('[data-cy="signInForm"]').submit();
  });

  it("displays validation errors when submitting form without phone number", () => {
    cy.contains("button", "Rent now").first().click();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="rentalCarForm"]').should("be.visible");
    });
    cy.get('[data-cy="rentalCarForm"]').submit();
    cy.contains("Phone number is required").should("be.visible");
  });

  it("displays validation errors when submitting empty form", () => {
    cy.contains("button", "Rent now").first().click();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="rentalCarForm"]').should("be.visible");
    });
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="lastName"]').clear();
    cy.get('input[name="email"]').clear();
    cy.get('[data-cy="rentalCarForm"]').submit();
    cy.contains("Phone number is required").should("be.visible");
    cy.contains("First Name is required").should("be.visible");
    cy.contains("Last Name is required").should("be.visible");
  });

  it("displays error for invalid email", () => {
    cy.get("button").contains("Rent now").first().click();
    cy.get('input[name="phoneNumber"]').type("0501234567");
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('[data-cy="rentalCarForm"]').submit();
    cy.contains("Invalid email format").should("be.visible");
  });

  it("displays error for invalid phone format", () => {
    cy.get("button").contains("Rent now").first().click();
    cy.get('input[name="phoneNumber"]').type("invalid-phone");
    cy.get('[data-cy="rentalCarForm"]').submit();
    cy.contains("Invalid phone format").should("be.visible");
  });

  it("submits successfully when all fields are valid", () => {
    cy.get("button").contains("Rent now").first().click();
    cy.get('input[name="phoneNumber"]').type("0501234567");
    cy.get('[data-cy="rentalCarForm"]').submit();
  });
});

describe('Order button without login', ()=> {
  it("displays a message when the user is not logged in", () => {
    cy.visit("/");
    cy.getReduxState().then((state) => {
      const isLogged = state.auth.isLogged;

      if (isLogged) {
        cy.get('[aria-label="Exit button"]').click();
        cy.get('#modal-root').within(() => {
            cy.get('[data-cy="exit accepting"]').should('be.visible');
          });
         cy.get('[aria-label="Logout"]').click();
         cy.window().its("store").invoke("dispatch", {
            type: "authSlice/logoutThunk"
          });

          cy.wait(500);
          cy.contains("button", "Rent now").first().click();
        cy.wait(500);
        cy.get("[role='tooltip']").should(
          "contain",
          "You should sign up or sign in to rent a car"
        ).should(
          "be.visible"
        );
      } else {
        cy.contains("button", "Rent now").first().click();
        cy.wait(500);
        cy.get("div").should(
          "contain",
          "You should sign up or sign in to rent a car"
        ).should(
          "be.visible"
        );
      }
    });
  });
})