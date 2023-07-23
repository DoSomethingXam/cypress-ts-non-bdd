export const MSG_UI = {
  ERROR_TEXT: "Invalid username or password!",
  ADD_BOOK_SUCCESS: "Book added to your collection.",
  DELETED_BOOK_SUCCESS: "Book deleted.",
  DELETED_ALL_BOOKS_SUCCESS: "All Books deleted.",
  NO_DATA_TEXT: "No rows found",
} as const;

export type MsgUI = (typeof MSG_UI)[keyof typeof MSG_UI];

export const MSG_API = {
  MESSAGE_GENERATE_TOKEN_SUCCESS: "User authorized successfully.",
  MESSAGE_GENERATE_TOKEN_FAIL: "User authorization failed.",
  MESSAGE_GENERATE_TOKEN_MISSING_USERNAME_OR_PASSWORD:
    "UserName and Password required.",
  MESSAGE_ADD_BOOK_EXISTENT: "ISBN already present in the User's Collection!",
  MESSAGE_REPLACE_OR_DELETE_BOOK_NOT_EXISTENT:
    "ISBN supplied is not available in User's Collection!",
  MESSAGE_INVALID_ISBN: "ISBN supplied is not available in Books Collection!",
} as const;

export type MsgAPI = (typeof MSG_API)[keyof typeof MSG_API];
