import * as BookTypes from "./bookTypes";
import * as MetaTypes from "./metaTypes";
import * as SearchTypes from "./searchTypes";
import * as SuggestionTypes from "./suggestionTypes";
import { Action } from "./action";

export { BookTypes, MetaTypes, SearchTypes, SuggestionTypes };
export type Actions =
  | BookTypes.Actions
  | MetaTypes.MetaAction
  | SearchTypes.Actions
  | SuggestionTypes.Actions
  | Action;
export type RootAction = Actions;
