/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add("getReduxState", ()=> {
    return cy.window().its("store").invoke("getState");
})

Cypress.Commands.add("loginToApplication", () => {
   const userCredentials = {
            "email": "iryna@gmail.com",
            "password": "asdfghjkl"
    }

    cy.request("POST", "https://server-osz5.onrender.com/api/auth/signin", userCredentials).its('body').then(body => {
        const token = body.token;
        cy.visit("/", {
            onLoad(win) {
                win.localStorage.setItem("authToken", token)
            },
        });
    })

    // cy.visit("/");
    // cy.get("button").contains("SIGN IN").click();
    // cy.get('input[name="email"]').type("iryna@gmail.com");
    // cy.get('input[name="password"]').type("asdfghjkl");
    // cy.get('[data-cy="signInForm"]').submit();
})