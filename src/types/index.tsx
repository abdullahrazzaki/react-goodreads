import * as BookTypes from "./bookTypes";
import * as SearchTypes from "./searchTypes";
import * as SuggestionTypes from "./suggestionTypes";
import { Action } from "./action";

export { BookTypes, SearchTypes, SuggestionTypes };
export type Actions =
  | BookTypes.Actions
  | SearchTypes.Actions
  | SuggestionTypes.Actions
  | Action;
export type RootAction = Actions;
