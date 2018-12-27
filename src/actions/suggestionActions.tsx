import BookSuggestion from "../components/Book";
import { SearchTypes, SuggestionTypes, RootAction } from "../types";
import { Dispatch } from "redux";
export const SUGGESTION_ACTIONS = {
  FETCH_SUGGESTION_START: "FETCH_SUGGESTION_START",
  FETCH_SUGGESTION_SUCCESS: "FETCH_SUGGESTION_SUCCESS",
  FETCH_SUGGESTION_FAILED: "FETCH_SUGGESTION_FAILED"
};
export function onTyped(text: string) {
  return (dispatch: Dispatch<RootAction>, getState: () => any) => {
    dispatch(getTypedAction(text));
    fetchBooks("/suggestions?keyword=" + text).then(res => {
      dispatch(
        getSuggestionSuccess({
          suggestions: res.suggestions.map(
            book => new BookSuggestion(book.id, book.title, book.author)
          ),
          remainingCount: res.remainingCount
        })
      );
    });
  };
}

function fetchBooks(url: string): Promise<SuggestionTypes.SuggestionResult> {
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          console.log("Suggestions ", data);
          resolve(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
        reject(err);
      });
  });
}

function getTypedAction(text: string): SearchTypes.SearchAction {
  return {
    type: SUGGESTION_ACTIONS.FETCH_SUGGESTION_START,
    text: text
  };
}

function getSuggestionSuccess(
  obj: SuggestionTypes.SuggestionResult
): SuggestionTypes.ResultAction {
  return {
    type: SUGGESTION_ACTIONS.FETCH_SUGGESTION_SUCCESS,
    ...obj
  };
}
