import { IBook } from "./IBook";

export interface IAccount {
  userId: string;
  username: string;
  password: string;
  books: IBook[];
  message: string;
  token: string;
  expires: string;
  status: string;
  result: string;
}
