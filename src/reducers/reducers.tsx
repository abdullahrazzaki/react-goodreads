import { BookActions, SuggestionActions, SearchActions } from "../actions";
type Action = {
  type: string;
};
export const isLoading = (state = false, action: Action) => {
  switch (action.type) {
    case BookActions.BOOK_ACTIONS.FETCH_BOOK_START:
    case SearchActions.SEARCH_ACTIONS.FETCH_SEARCH_START:
    case SearchActions.SEARCH_ACTIONS.LOAD_MORE:
    case SuggestionActions.SUGGESTION_ACTIONS.FETCH_SUGGESTION_START:
      return true;
    case BookActions.BOOK_ACTIONS.FETCH_BOOK_SUCCESS:
    case BookActions.BOOK_ACTIONS.FETCH_BOOK_FAILED:
    case SearchActions.SEARCH_ACTIONS.FETCH_SEARCH_SUCCESS:
    case SearchActions.SEARCH_ACTIONS.LOAD_MORE_SUCCESS:
    case SuggestionActions.SUGGESTION_ACTIONS.FETCH_SUGGESTION_SUCCESS:
    default:
      return false;
  }
};
export const hasTyped = (state = false, action: Action) => {
  switch (action.type) {
    case SuggestionActions.SUGGESTION_ACTIONS.FETCH_SUGGESTION_START:
      return true;
    default:
      return false;
  }
};
