/// <reference types="cypress" />

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
        cy.wait(500);
    })
})

Cypress.Commands.add("loginAdmin", () => {
    const userCredentials = {
             "email": "carrental795@gmail.com",
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
 })

Cypress.Commands.add("clickOnExitButton", ()=> {
    cy.get('[aria-label="Exit button"]').click();
})

Cypress.Commands.add('addToFavorites', (carName:string) => {
    cy.contains('h3', carName) 
      .parent()
      .parent() 
      .within(() => {
        cy.get('[aria-label="press to add this car to favorites"]').click();
      });
  });