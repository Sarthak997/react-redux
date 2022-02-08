import { combineReducers } from "redux";

import { reducer as homeReducer } from "./home";

export const reducer = combineReducers({
  home: homeReducer,
});
