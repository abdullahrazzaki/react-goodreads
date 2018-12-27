import { SearchActions } from "../actions";
import { merge, mergeWithKey, concat, pick } from "ramda";
import { SearchTypes } from "../types";
const concatResults = (key: string, l: any, r: any) =>
  key === "results" ? concat(l, r) : r;
export default (
  state = {
    results: []
  },
  action: SearchTypes.Actions
) => {
  console.log("search Sction", action.type);
  switch (action.type) {
    case SearchActions.SEARCH_ACTIONS.FETCH_SEARCH_SUCCESS:
      console.log("fetch success ", action);
      const a = action as SearchTypes.ResultAction;
      return merge(state, {
        results: a.results,
        nextPage: a.nextPage
      });
    case SearchActions.SEARCH_ACTIONS.LOAD_MORE_SUCCESS:
      const b = action as SearchTypes.ResultAction;
      return mergeWithKey(
        concatResults,
        state,
        pick(["results", "nextPage"], b)
      );
    default:
      return state;
  }
};
