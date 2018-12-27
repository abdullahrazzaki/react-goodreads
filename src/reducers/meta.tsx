import { MetaActions } from "../actions";
import { assoc } from "ramda";
type MetaAction = {
  type: string;
  title: string;
};
export default (
  state = {
    title: "GoodAbc"
  },
  action: MetaAction
) => {
  switch (action.type) {
    case MetaActions.META_ACTIONS.CHANGE_TITLE:
      return assoc("title", action.title, state);
    default:
      return state;
  }
};
