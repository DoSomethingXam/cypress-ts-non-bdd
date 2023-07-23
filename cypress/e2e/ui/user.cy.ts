import NavigatorPage from '../../page-objects/pages/navigator-page';
import LoginPage from '../../page-objects/pages/login-page';
import BasePage from '../../page-objects/pages/base-page';
import { MSG_UI } from '../../utils/constants/message';
import { IAccount } from 'cypress/utils/interfaces/IUser';

const navigatorPage: NavigatorPage = new NavigatorPage(),
	loginPage: LoginPage = new LoginPage(),
	basePage: BasePage = new BasePage();

describe('User UI Testing', { tags: '@user' }, (): void => {
	before((): void => {
		cy.setUserData();
	});

	beforeEach((): void => {
		navigatorPage.goToLoginPage();
		const user: IAccount = Cypress.env('user');
		cy.wrap(user).as('user');
	});

	it(
		'Login successfully',
		{ tags: ['@login', '@success', '@smoke'] },
		function (): void {
			loginPage.inputUsername(this.user.username);
			loginPage.inputPassword(this.user.password);
			loginPage.clickLoginButton();
			basePage.waitForUsernameVisible();
			basePage.getUsername().should('be.visible');
		}
	);

	it(
		'Login unsuccessfully with wrong username',
		{ tags: ['@login', '@fail'] },
		function (): void {
			loginPage.inputUsername(this.user.username + '123');
			loginPage.inputPassword(this.user.password);
			loginPage.clickLoginButton();
			loginPage.getErrorMessage().should('have.text', MSG_UI.ERROR_TEXT);
		}
	);

	it(
		'Login unsuccessfully with wrong password',
		{ tags: ['@login', '@fail'] },
		function (): void {
			loginPage.inputUsername(this.user.username);
			loginPage.inputPassword(this.user.password + '123');
			loginPage.clickLoginButton();
			loginPage.getErrorMessage().should('have.text', MSG_UI.ERROR_TEXT);
		}
	);

	it(
		"Login unsuccessfully with class 'is-invalid' add to input when missing username",
		{ tags: ['@login', '@fail'] },
		function (): void {
			loginPage.inputPassword(this.user.password);
			loginPage.clickLoginButton();
			loginPage.getUsername().should('contain', 'is-invalid');
		}
	);

	it(
		"Login unsuccessfully with class 'is-invalid' add to input when missing password",
		{ tags: ['@login', '@fail'] },
		function (): void {
			loginPage.inputUsername(this.user.username);
			loginPage.clickLoginButton();
			loginPage.getPassword().should('contain', 'is-invalid');
		}
	);
});
