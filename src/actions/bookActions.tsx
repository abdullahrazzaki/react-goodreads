import { push } from "connected-react-router";
import { BookTypes, RootAction } from "../types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Dispatch, AnyAction, Action } from "redux";
export const BOOK_ACTIONS = {
  FETCH_BOOK_START: "FETCH_BOOK_START",
  FETCH_BOOK_SUCCESS: "FETCH_BOOK_SUCCESS",
  FETCH_BOOK_FAILED: "FETCH_BOOK_FAILED"
};
function getSelectBookAction(book: number): BookTypes.BookIdAction {
  return { type: BOOK_ACTIONS.FETCH_BOOK_START, book: book };
}

function getBookSelectedSuccess(book: BookTypes.Book) {
  return { type: BOOK_ACTIONS.FETCH_BOOK_SUCCESS, book: book };
}

export function loadBook(id: number) {
  return (dispatch: any) => {
    dispatch(getSelectBookAction(id));
    fetchBook("/book?id=" + id).then(result => {
      dispatch(getBookSelectedSuccess(result as BookTypes.Book));
    });
  };
}

export function selectBook(id: number) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(push("/book/" + id));
  };
}

function fetchBook(url: string): Promise<object> {
  return new Promise<object>(function(resolve, reject) {
    fetch(url)
      .then(function(response) {
        console.log(response);
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          console.log("xt");
          resolve(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
        reject(err);
      });
  });
}
