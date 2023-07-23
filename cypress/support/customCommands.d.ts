declare namespace Cypress {
	interface Chainable {
		login(): Chainable<void>;
		setUserData(): Chainable<void>;
		setBookData(): Chainable<void>;
		setBookReplaceData(): Chainable<void>;
		windowAlert(alertText: string): Chainable<void>;
	}
}