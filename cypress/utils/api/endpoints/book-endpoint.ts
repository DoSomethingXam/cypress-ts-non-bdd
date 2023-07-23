const bookUrl: string = '/BookStore/v1';

export const bookEndpoint = {
	GET_LIST_BOOKS: `${bookUrl}/Books`,
	ADD_BOOK: `${bookUrl}/Books`,
	DELETE_LIST_BOOKS: (userId: string) => `${bookUrl}/Books?UserId=${userId}`,
	GET_BOOK: (isbn: string) => `${bookUrl}/Book?ISBN=${isbn}`,
	REPLACE_BOOK: (isbn: string) => `${bookUrl}/Books/${isbn}`,
	DELETE_BOOK: `${bookUrl}/Book`,
};
