import { userService } from "../../utils/api/services/user-service";
import { bookService } from "../../utils/api/services/book-service";
import { STATUS_CODE } from "../../utils/constants/status-code";
import userTokenHelper from "../../utils/helpers/user-token-helper";
import { MSG_API } from "../../utils/constants/message";
import { IBook } from "../../utils/interfaces/IBook";
import { IAccount } from "../../utils/interfaces/IUser";

describe("BookStore API Testing", (): void => {
  before((): void => {
    userTokenHelper.setToken();
    cy.setUserData();
    cy.setBookData();
    cy.setBookReplaceData();
  });

  beforeEach(function (): void {
    const user: IAccount = Cypress.env("user");
    const book: IBook = Cypress.env("book");
    const bookReplace: IBook = Cypress.env("bookReplace");

    userService.getUser(user.userId).then((response: any): void => {
      const user: IAccount = response.body;
      bookService.deleteListBooks(user.userId);
    });

    cy.wrap(user).as("user");
    cy.wrap(book).as("book");
    cy.wrap(bookReplace).as("bookReplace");
  });

  context("Add book successfully", (): void => {
    it("should add a new book", function (): void {
      bookService
        .addBook(this.user.userId, [this.book.isbn])
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_CREATE_SUCCESSFUL_201
          );
          expect(response.body.books.length).to.eq(1);
          expect(response.body.books[0].isbn).to.eq(this.book.isbn);
        });
    });
  });

  context("Add book unsuccessfully", (): void => {
    beforeEach(function (): void {
      userService
        .getUser(this.user.userId)
        .then((response: Cypress.Response<any>): void => {
          const user: IAccount = response.body;
          if (user.books.length <= 0) {
            bookService.addBook(user.userId, [this.book.isbn]);
          }
        });
    });

    it("should not add a new book with invalid isbn", function (): void {
      bookService
        .addBook(this.user.userId, [this.book.invalidISBN])
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
          );
          expect(response.body.message).to.eq(MSG_API.MESSAGE_INVALID_ISBN);
        });
    });

    it("should not add a new book with existing isbn", function (): void {
      bookService
        .addBook(this.user.userId, [this.book.isbn])
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
          );
          expect(response.body.message).to.eq(
            MSG_API.MESSAGE_ADD_BOOK_EXISTENT
          );
        });
    });
  });

  context("Replace book successfully", (): void => {
    beforeEach(function (): void {
      userService
        .getUser(this.user.userId)
        .then((response: Cypress.Response<any>): void => {
          const user: IAccount = response.body;
          const listBooks: IBook[] = user.books;
          const bookExists: IBook | undefined = listBooks.find(
            (book: Partial<IBook>): boolean => book.isbn === this.book.isbn
          );
          if (!bookExists) {
            bookService.addBook(user.userId, [this.book.isbn]);
          }
        });
    });

    it("should replace a book", function (): void {
      bookService
        .replaceBook(this.book.isbn, this.user.userId, this.bookReplace.isbn)
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_200
          );
          expect(response.body.userId).to.equal(this.user.userId);
          expect(response.body.username).to.equal(this.user.username);
          expect(response.body.books[0].isbn).to.eq(this.bookReplace.isbn);
          expect(response.body.books[0].title).to.eq(this.bookReplace.title);
          expect(response.body.books[0].subTitle).to.eq(
            this.bookReplace.subtitle
          );
          expect(response.body.books[0].author).to.eq(this.bookReplace.author);
          expect(response.body.books[0].publisher).to.eq(
            this.bookReplace.publisher
          );
          expect(response.body.books[0].publish_date).to.match(
            /^((\d{4}-((0[1-9])|(1[0-2]))-(0[1-9]|[12]\d|3[01]))T(((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)(?:\.\d{3})?)(Z|[+-]([01]\d|2[0-3]):([0-5]\d))?)$/
          );
        });
    });
  });

  context("Replace book unsuccessfully", (): void => {
    beforeEach(function (): void {
      userService
        .getUser(this.user.userId)
        .then((response: Cypress.Response<any>): void => {
          const user: IAccount = response.body;
          const listBooks: IBook[] = user.books;
          const bookExists: IBook | undefined = listBooks.find(
            (book: Partial<IBook>): boolean => book.isbn === this.book.isbn
          );
          if (bookExists) {
            bookService.deleteBook(user.userId, this.book.isbn);
          }
        });
    });

    it("should show an error message when replacing a book that does not exist in user's collection", function (): void {
      bookService
        .replaceBook(this.book.isbn, this.user.userId, this.bookReplace.isbn)
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
          );
          expect(response.body.message).to.eq(
            MSG_API.MESSAGE_REPLACE_OR_DELETE_BOOK_NOT_EXISTENT
          );
        });
    });
  });

  context("Delete book successfully", (): void => {
    beforeEach(function (): void {
      userService
        .getUser(this.user.userId)
        .then((response: Cypress.Response<any>): void => {
          const user: IAccount = response.body;
          const listBooks: IBook[] = user.books;
          const bookExists: IBook | undefined = listBooks.find(
            (book: Partial<IBook>): boolean => book.isbn === this.book.isbn
          );
          if (!bookExists) {
            bookService.addBook(user.userId, [this.book.isbn]);
          }
        });
    });

    it("should delete a book", function (): void {
      bookService
        .deleteBook(this.user.userId, this.book.isbn)
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_NO_CONTENT_204
          );
        });
    });
  });

  context("Delete book unsuccessfully", (): void => {
    beforeEach(function (): void {
      userService
        .getUser(this.user.userId)
        .then((response: Cypress.Response<any>): void => {
          const user: IAccount = response.body;
          const listBooks: IBook[] = user.books;
          const bookExists: IBook | undefined = listBooks.find(
            (book: Partial<IBook>): boolean => book.isbn === this.book.isbn
          );
          if (bookExists) {
            bookService.deleteBook(user.userId, this.book.isbn);
          }
        });
    });

    it("should show an error message when deleting a book that does not exist in user's collection", function (): void {
      bookService
        .deleteBook(this.user.userId, this.book.isbn)
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_BAD_REQUEST_400
          );
          expect(response.body.message).to.eq(
            MSG_API.MESSAGE_REPLACE_OR_DELETE_BOOK_NOT_EXISTENT
          );
        });
    });
  });

  context("Delete all books successfully", (): void => {
    it("should delete all books", function (): void {
      bookService
        .deleteListBooks(this.user.userId)
        .then((response: Cypress.Response<any>): void => {
          expect(response.status).to.eq(
            STATUS_CODE.RESPONSE_CODE_SUCCESSFUL_NO_CONTENT_204
          );
        });
    });
  });
});
