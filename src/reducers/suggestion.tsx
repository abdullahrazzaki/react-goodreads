import { SuggestionActions, SearchActions } from "../actions";
import { assoc, merge } from "ramda";
import { SuggestionTypes, SearchTypes } from "../types";

export default (
  state = {
    typedWord: "",
    searchedWord: "",
    suggestions: [],
    remainingResults: 0
  },
  action: SuggestionTypes.ResultAction | SearchTypes.SearchAction
) => {
  switch (action.type) {
    case SuggestionActions.SUGGESTION_ACTIONS.FETCH_SUGGESTION_START:
      const typedAction = action as SearchTypes.SearchAction;
      let text = typedAction.text;
      return merge(state, { typedWord: text, suggestions: [] });
    case SearchActions.SEARCH_ACTIONS.FETCH_SEARCH_START:
      const searchedAction = action as SearchTypes.SearchAction;
      return assoc("searchedWord", searchedAction.text, state);
    case SuggestionActions.SUGGESTION_ACTIONS.FETCH_SUGGESTION_SUCCESS:
      const resultAction = action as SuggestionTypes.ResultAction;
      return merge(state, {
        suggestions: resultAction.suggestions,
        remainingResults: resultAction.remainingCount
      });
    default:
      return state;
  }
};
