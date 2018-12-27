import { MetaTypes } from "../types";
export const META_ACTIONS = { CHANGE_TITLE: "CHANGE_TITLE" };
export function changeTitle(title: string): MetaTypes.MetaAction {
  return {
    type: META_ACTIONS.CHANGE_TITLE,
    title: title
  };
}
