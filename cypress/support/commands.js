// ***********************************************
// This example commands.js shows you how to
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
import Homepage from "../pages/homePage";
import LoginPage from "../pages/loginPage";

Cypress.Commands.add("login", (data) => {
  cy.session(
    [data],
    () => {
      cy.visit("/");
      Homepage.clickLoginAndRegister();
      LoginPage.login(data.valid1);
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});
