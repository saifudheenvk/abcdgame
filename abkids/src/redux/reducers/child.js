import { SET_CHILD_DETAILS } from "../actions/child";

const childReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CHILD_DETAILS:
      return action.payload;
    default:
      return "";
  }
};
export default childReducer;
