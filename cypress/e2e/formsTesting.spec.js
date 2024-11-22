/// <reference types="cypress" />

import { default as homePage } from "./pages/homePage";
import { default as ModalForms } from "./pages/ModalForms";

describe("SignUpForm validation testing", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("displays validation errors when submitting empty form", () => {
    homePage.clickOnSignUpButton();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="signUpForm"]').should("be.visible");
    });
    homePage.signUpFormSubmit();
    cy.contains("Required").should("be.visible");
    cy.contains("Required").should("be.visible");
    cy.contains("Required").should("be.visible");
    cy.contains("You must accept the terms and conditions").should(
      "be.visible"
    );
  });

  it("displays error for short names", () => {
    homePage.clickOnSignUpButton();
    cy.get('input[name="firstName"]').type("A");
    cy.get('input[name="lastName"]').type("B");
    homePage.signUpFormSubmit();
    cy.contains("Must be at least 2 characters").should("be.visible");
  });

  it("displays error for invalid email", () => {
    homePage.clickOnSignUpButton();
    cy.get('input[name="email"]').type("invalid-email");
    homePage.signUpFormSubmit();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("displays error for short password", () => {
    homePage.clickOnSignUpButton();
    cy.get('input[name="password"]').type("123");
    homePage.signUpFormSubmit();
    cy.contains("Password must be at least 8 characters").should("be.visible");
  });

  it("requires terms and conditions to be checked", () => {
    homePage.clickOnSignUpButton();
    cy.get('input[name="terms"]').uncheck();
    homePage.signUpFormSubmit();
    cy.contains("You must accept the terms and conditions").should(
      "be.visible"
    );
  });

  it("submits successfully when all fields are valid", () => {
    homePage.clickOnSignUpButton();
    ModalForms.validSignUpData();
    homePage.signUpFormSubmit();
    cy.contains("You have been registered as a new user").should("be.visible");
    cy.log(Cypress.env());
  });

  it("deletes the registered user", () => {
    const apiUrl = Cypress.env("api_server");
    cy.wait(1000);
    cy.request("POST", `${apiUrl}/api/auth/signin`, {
      email: "john.doe@example.com",
      password: "password123",
    }).then((response) => {
      const {
        user: { userId },
        token,
      } = response.body;
      expect(response.status).to.equal(200);

      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/user/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body.message).to.equal(
          "User and profile deleted successfully"
        );
      });
    });
  });
});

describe("SignInForm validation testing", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("displays validation errors when submitting empty form", () => {
    homePage.clickOnSignInButton();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="signInForm"]').should("be.visible");
    });
    homePage.signInFormSubmit();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("displays error for invalid email", () => {
    homePage.clickOnSignInButton();
    cy.get('input[name="email"]').type("invalid-email");
    homePage.signInFormSubmit();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("displays error for short password", () => {
    homePage.clickOnSignInButton();
    cy.get('input[name="password"]').type("123");
    homePage.signInFormSubmit();
    cy.contains("Must be at least 8 characters").should("be.visible");
  });

  it("submits successfully when all fields are valid", () => {
    homePage.clickOnSignInButton();
    ModalForms.validSignInData();
    homePage.signInFormSubmit();
    cy.contains("You succesfully accessed your personal profile").should(
      "be.visible"
    );
  });
});

describe("OrderForm validation testing", () => {
  beforeEach(() => {
    cy.loginToApplication();
  });

  it("displays validation errors when submitting form without phone number", () => {
    homePage.getFirstRentButton();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="rentalCarForm"]').should("be.visible");
    });
    homePage.rentalCarFormSubmit();
    cy.contains("Phone number is required").should("be.visible");
  });

  it("displays validation errors when submitting empty form", () => {
    homePage.getFirstRentButton();
    cy.get("#modal-root").within(() => {
      cy.get('[data-cy="rentalCarForm"]').should("be.visible");
    });
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="lastName"]').clear();
    cy.get('input[name="email"]').clear();
    homePage.rentalCarFormSubmit();
    cy.contains("Phone number is required").should("be.visible");
    cy.contains("First Name is required").should("be.visible");
    cy.contains("Last Name is required").should("be.visible");
  });

  it("displays error for invalid email", () => {
    homePage.getFirstRentButton();
    cy.get('input[name="phoneNumber"]').type("0501234567");
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type("invalid-email");
    homePage.rentalCarFormSubmit();
    cy.contains("Invalid email format").should("be.visible");
  });

  it("displays error for invalid phone format", () => {
    homePage.getFirstRentButton();
    cy.get('input[name="phoneNumber"]').type("invalid-phone");
    homePage.rentalCarFormSubmit();
    cy.contains("Invalid phone format").should("be.visible");
  });

  it("submits successfully when all fields are valid", () => {
    homePage.getFirstRentButton();
    cy.get('input[name="phoneNumber"]').type("0501234567");
    homePage.rentalCarFormSubmit();
  });
});

describe("Order button without login", () => {
  it("displays a message when the user is not logged in", () => {
    homePage.visit();
    cy.getReduxState().then((state) => {
      const isLogged = state.auth.isLogged;

      if (isLogged) {
        cy.clickOnExitButton();
        cy.get("#modal-root").within(() => {
          cy.get('[data-cy="exit accepting"]').should("be.visible");
        });
        cy.get('[aria-label="Logout"]').click();
        cy.window().its("store").invoke("dispatch", {
          type: "authSlice/logoutThunk",
        });

        cy.wait(500);
        homePage.getFirstRentButton();
        cy.wait(500);
        cy.get("[role='tooltip']")
          .should("contain", "You should sign up or sign in to rent a car")
          .should("be.visible");
      } else {
        homePage.getFirstRentButton();
        cy.wait(500);
        cy.get("div")
          .should("contain", "You should sign up or sign in to rent a car")
          .should("be.visible");
      }
    });
  });
});
