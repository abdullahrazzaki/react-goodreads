import BookSuggestion from "../components/Book";
import { push } from "connected-react-router";
import { SearchTypes, RootAction } from "../types";
import { Dispatch } from "redux";
export const SEARCH_ACTIONS = {
  FETCH_SEARCH_START: "FETCH_SEARCH_START",
  FETCH_SEARCH_SUCCESS: "FETCH_SEARCH_SUCCESS",
  FETCH_SEARCH_FAILED: "FETCH_SEARCH_FAILED",
  LOAD_MORE: "LOAD_MORE",
  LOAD_MORE_SUCCESS: "LOAD_MORE_SUCCESS"
};

function getSearchAction(text: string): SearchTypes.SearchAction {
  return {
    type: SEARCH_ACTIONS.FETCH_SEARCH_START,
    text: text
  };
}

function getSearchSuccess(
  obj: SearchTypes.BookResult
): SearchTypes.ResultAction {
  return {
    type: SEARCH_ACTIONS.FETCH_SEARCH_SUCCESS,
    ...obj
  };
}

function getLoadSuccess(obj: SearchTypes.BookResult): SearchTypes.ResultAction {
  return {
    type: SEARCH_ACTIONS.LOAD_MORE_SUCCESS,
    ...obj
  };
}

export function loadMore(text: string, page: number) {
  return (dispatch: Dispatch<RootAction>) => {
    dispatch({ type: SEARCH_ACTIONS.LOAD_MORE });
    console.log("loading");
    searchBooks(text, page).then((res: SearchTypes.SearchResult) => {
      console.log("loaded");
      dispatch(
        getLoadSuccess({
          results: res.results.map(
            book => new BookSuggestion(book.id, book.title, book.author)
          ),
          nextPage: res.nextPage,
          keyword: text
        })
      );
      //            dispatch(redirect("/results/"+text));
    });
  };
}

export function searchKeyword(keyword: string) {
  console.log("Searched", keyword);
  return (dispatch: Dispatch<RootAction>) => {
    dispatch(push("/search/" + keyword));
  };
}

export function search(text: string) {
  return (dispatch: Dispatch<RootAction>, getState: () => any) => {
    dispatch(getSearchAction(text));
    searchBooks(text).then(res => {
      console.log("Result", res);
      dispatch(
        getSearchSuccess({
          results: res.results.map(
            book => new BookSuggestion(book.id, book.title, book.author)
          ),
          nextPage: res.nextPage,
          keyword: text
        })
      );
    });
  };
}

function searchBooks(
  keyword: string,
  nextPage = 1
): Promise<SearchTypes.SearchResult> {
  return new Promise(function(resolve, reject) {
    fetch("/search?keyword=" + keyword + "&page=" + nextPage)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          resolve(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
        reject(err);
      });
  });
}
