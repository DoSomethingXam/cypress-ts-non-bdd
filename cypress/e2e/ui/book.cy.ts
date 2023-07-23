import userTokenHelper from '../../utils/helpers/user-token-helper';
import NavigatorPage from '../../page-objects/pages/navigator-page';
import { userService } from '../../utils/api/services/user-service';
import { bookService } from '../../utils/api/services/book-service';
import BookPage from '../../page-objects/pages/book-page';
import { MSG_UI } from '../../utils/constants/message';
import BasePage from '../../page-objects/pages/base-page';
import ProfilePage from '../../page-objects/pages/profile-page';
import { IAccount } from 'cypress/utils/interfaces/IUser';
import { IBook } from 'cypress/utils/interfaces/IBook';

const navigatorPage: NavigatorPage = new NavigatorPage(),
	bookPage: BookPage = new BookPage(),
	basePage: BasePage = new BasePage(),
	profilePage: ProfilePage = new ProfilePage();

describe('BookStore UI Testing', { tags: '@book' }, (): void => {
	before((): void => {
		cy.setUserData();
		cy.setBookData();
		cy.setBookReplaceData();
	});

	beforeEach((): void => {
		userTokenHelper.setToken();
		const user: IAccount = Cypress.env('user');
		const book: IBook = Cypress.env('book');
		const bookReplace: IBook = Cypress.env('bookReplace');
		cy.wrap(user).as('user');
		cy.wrap(book).as('book');
		cy.wrap(bookReplace).as('bookReplace');
	});

	beforeEach(function (): void {
		userService
			.getUser(this.user.userId)
			.then((response: Cypress.Response<any>): void => {
				const user: IAccount = response.body;
				bookService.deleteListBooks(user.userId);
			});

		navigatorPage.goToBookStorePage();
		cy.login();
	});

	context('Add book to collection', (): void => {
		it(
			'Add book to collection successfully',
			{ tags: ['@addBook', '@smoke'] },
			function (): void {
				bookPage.clickBookLink(this.book.bookName);
				bookPage.clickAddCollectionButton();
				cy.windowAlert(MSG_UI.ADD_BOOK_SUCCESS);
			}
		);
	});

	context('Delete book', (): void => {
		beforeEach(function (): void {
			bookPage.clickBookLink(this.book.bookName);
			bookPage.clickAddCollectionButton();
			bookPage.clickBackToBookStoreButton();
			bookPage.clickBookLink(this.bookReplace.title);
			bookPage.clickAddCollectionButton();
			basePage.clickProfileButton();
		});

		it(
			'Delete book successfully',
			{ tags: ['@deleteBook', '@oneBook'] },
			function (): void {
				profilePage.clickDeleteBookButton(this.book.bookName);
				profilePage.clickOKButton();
				cy.windowAlert(MSG_UI.DELETED_BOOK_SUCCESS);
			}
		);

		it(
			'Delete all books successfully',
			{ tags: ['@deleteBook', '@allBook'] },
			function (): void {
				profilePage.clickDeleteAllBooksButton();
				profilePage.clickOKButton();
				cy.windowAlert(MSG_UI.DELETED_ALL_BOOKS_SUCCESS);
				profilePage.getNoDataText().should('eq', MSG_UI.NO_DATA_TEXT);
			}
		);
	});
});
