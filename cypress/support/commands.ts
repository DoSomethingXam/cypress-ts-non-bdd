/// <reference types="cypress" />
import BasePage from "../page-objects/pages/base-page";
import LoginPage from "../page-objects/pages/login-page";

const basePage: BasePage = new BasePage(),
  loginPage: LoginPage = new LoginPage();

Cypress.Commands.add("login", (): void => {
  basePage.clickLoginButton();
  cy.fixture("user").then((user): void => {
    loginPage.inputUsername(user.username);
    loginPage.inputPassword(user.password);
    loginPage.clickLoginButton();
    basePage.waitForUsernameVisible();
  });
});

Cypress.Commands.add("windowAlert", (alertText: string): void => {
  cy.on("window:alert", (message: string): void => {
    expect(message).to.equal(alertText);
  });
});

Cypress.Commands.add("setUserData", (): void => {
  cy.fixture("user").then((user): void => {
    Cypress.env("user", user);
  });
});

Cypress.Commands.add("setBookData", (): void => {
  cy.fixture("book").then((book): void => {
    Cypress.env("book", book);
  });
});

Cypress.Commands.add("setBookReplaceData", (): void => {
  cy.fixture("book-replace").then((bookReplace): void => {
    Cypress.env("bookReplace", bookReplace);
  });
});
