import profileLocator from "../locators/profile-locator";

class ProfilePage {
  clickDeleteBookButton(bookName: string): void {
    cy.contains(bookName)
      .parent()
      .parent()
      .parent()
      .siblings("div")
      .children("div")
      .children(profileLocator.DELETE_BOOK_BUTTON)
      .click();
  }

  clickDeleteAllBooksButton(): void {
    cy.contains(profileLocator.DELETE_ALL_BOOKS_BUTTON).click({ force: true });
  }

  clickOKButton(): void {
    cy.get(profileLocator.OK_BUTTON).click();
  }

  getNoDataText(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(profileLocator.NO_DATA_TEXT).invoke("text");
  }
}

export default ProfilePage;
