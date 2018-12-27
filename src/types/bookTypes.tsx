import { Action } from "./action";
export type Book = {
  id: number;
  title: string;
  author: string;
};
export type BookDetail = {
  id: number;
  title: string;
  authors: string[];
  image: string;
  review_widget: string;
  rating: number;
};
export type BookAction = Action & {
  book: Book;
};
export type BookIdAction = Action & {
  book: number;
};
export type Actions = BookAction | BookIdAction;
