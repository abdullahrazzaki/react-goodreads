import { BookActions } from "../actions";
import { BookTypes } from "../types";
import { assoc } from "ramda";
export default (state = {}, action: BookTypes.BookAction) => {
  switch (action.type) {
    case BookActions.BOOK_ACTIONS.FETCH_BOOK_SUCCESS:
      return assoc(action.book.id.toString(), action.book, state);
    default:
      return state;
  }
};
