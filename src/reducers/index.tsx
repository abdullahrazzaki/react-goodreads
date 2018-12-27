import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import books from "./books";
import search from "./search";
import suggestion from "./suggestion";
import meta from "./meta";
import { isLoading, hasTyped } from "./reducers";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export default combineReducers({
  router: connectRouter(history),
  suggestion,
  search,
  books,
  meta,
  isLoading,
  hasTyped
});
