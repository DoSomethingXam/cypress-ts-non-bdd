import commonLocator from "../locators/common-locator";

class BasePage {
  waitForUsernameVisible(): void {
    cy.get(commonLocator.USERNAME_TEXT, { timeout: 2000 });
  }

  getUsername(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(commonLocator.USERNAME_TEXT);
  }

  inputSearch(bookName: string): void {
    cy.get(commonLocator.SEARCH_TEXT_BOX).clear().type(bookName);
  }

  clickLoginButton(): void {
    cy.get(commonLocator.LOGIN_BUTTON).click();
  }

  clickLogoutButton(): void {
    cy.contains(commonLocator.LOGOUT_BUTTON).click();
  }

  clickBookStoreButton(): void {
    cy.contains(commonLocator.BOOK_STORE_BUTTON)
      .parent()
      .click({ force: true });
  }

  clickProfileButton(): void {
    cy.contains(commonLocator.PROFILE_BUTTON).parent().click({ force: true });
  }
}

export default BasePage;
