import { bookEndpoint } from "../endpoints/book-endpoint";
import apiHelper from "../../helpers/api-helper";
import requestHelper from "../../helpers/request-helper";
import { IBook } from "../../interfaces/IBook";

export const bookService = {
  getListBooks(): Cypress.Chainable<Cypress.Response<any>> {
    const url: string = apiHelper.getApiUrl() + bookEndpoint.GET_LIST_BOOKS;
    return requestHelper.sendGetMethod({ url: url });
  },

  addBook(
    userId: string,
    listISBNs: Partial<IBook>[]
  ): Cypress.Chainable<Cypress.Response<any>> {
    const url: string = apiHelper.getApiUrl() + bookEndpoint.ADD_BOOK;
    let collectionOfIsbns: object[] = [];
    for (let i: number = 0; i < listISBNs.length; i++) {
      collectionOfIsbns.push({
        isbn: listISBNs[i],
      });
    }
    return requestHelper.sendPostMethod({
      url: url,
      body: {
        userId: userId,
        collectionOfIsbns: collectionOfIsbns,
      },
    });
  },

  replaceBook(
    isbnOld: string,
    userId: string,
    isbnNew: string
  ): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + bookEndpoint.REPLACE_BOOK(isbnOld);
    return requestHelper.sendPutMethod({
      url: url,
      body: {
        userId: userId,
        isbn: isbnNew,
      },
    });
  },

  deleteListBooks(userId: string): Cypress.Chainable<Cypress.Response<any>> {
    const url: string =
      apiHelper.getApiUrl() + bookEndpoint.DELETE_LIST_BOOKS(userId);
    return requestHelper.sendDeleteMethod({
      url: url,
    });
  },

  getBook(isbn: string): Cypress.Chainable<Cypress.Response<any>> {
    const url: string = apiHelper.getApiUrl() + bookEndpoint.GET_BOOK(isbn);
    return requestHelper.sendGetMethod({ url: url });
  },

  deleteBook(
    userId: string,
    isbn: string
  ): Cypress.Chainable<Cypress.Response<any>> {
    const url: string = apiHelper.getApiUrl() + bookEndpoint.DELETE_BOOK;
    return requestHelper.sendDeleteMethod({
      url: url,
      body: {
        userId: userId,
        isbn: isbn,
      },
    });
  },
};
