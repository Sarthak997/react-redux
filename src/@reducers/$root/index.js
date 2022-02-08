import { combineReducers } from "redux";

import { reducer as userReducer } from "./user";

export const reducer = combineReducers({
  user: userReducer,
});
