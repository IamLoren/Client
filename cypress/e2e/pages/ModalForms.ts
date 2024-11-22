class ModalForms {
  validSignUpData() {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="terms"]').check();
  }

  validSignInData(){
    cy.get('input[name="email"]').type("iryna@gmail.com");
    cy.get('input[name="password"]').type("asdfghjkl");
  }
}
export default new ModalForms();
