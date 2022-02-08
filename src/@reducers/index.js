import { combineReducers } from "redux";

import { reducer as $rootReducer } from "./$root";
import { reducer as $otherReducer } from "./$other";

export const rootReducer = combineReducers({
  $other: $otherReducer,
  $root: $rootReducer,
});
