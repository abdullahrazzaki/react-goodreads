import { Action } from "./action";
import { Book } from "./bookTypes";

export type SuggestionResult = {
  suggestions: Book[];
  remainingCount: number;
};

export type ResultAction = Action & SuggestionResult;
export type Actions = ResultAction;
