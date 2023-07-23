import bookLocator from "../locators/book-locator";

class BookStorePage {
  clickBookLink(bookName: string): void {
    cy.get(bookLocator.BOOK_LINK(bookName)).click();
  }

  clickAddCollectionButton(): void {
    cy.contains(bookLocator.ADD_COLLECTION_BUTTON).click({ force: true });
  }

  clickBackToBookStoreButton(): void {
    cy.contains(bookLocator.BACK_TO_BOOK_STORE_BUTTON).click({ force: true });
  }
}

export default BookStorePage;
