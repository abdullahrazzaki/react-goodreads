import { Action } from "./action";
import { Book } from "./bookTypes";

export type BookResult = {
  nextPage: number;
  keyword: string;
  results: Book[];
};
export type SearchResult = {
  results: Book[];
  nextPage: number;
};
export type ResultAction = Action & (SearchResult);
export type SearchAction = Action & {
  text: string;
};
export type Actions = ResultAction | SearchAction;
