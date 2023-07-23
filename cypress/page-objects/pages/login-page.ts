import loginLocator from "../locators/login-locator";

class LoginPage {
  inputUsername(username: string): void {
    cy.get(loginLocator.USERNAME_TEXT_BOX).clear().type(username);
  }

  inputPassword(password: string): void {
    cy.get(loginLocator.PASSWORD_TEXT_BOX).clear().type(password);
  }

  clickLoginButton(): void {
    cy.get(loginLocator.LOGIN_BUTTON).click();
  }

  getUsername(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(loginLocator.USERNAME_TEXT_BOX).invoke("attr", "class");
  }

  getPassword(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(loginLocator.PASSWORD_TEXT_BOX).invoke("attr", "class");
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(loginLocator.ERROR_MESSAGE_TEXT);
  }
}

export default LoginPage;
