import { combineReducers } from "redux";

import { reducer as userReducer } from "./user";
import { authentication } from "./user/authentication.reducer";
import { registration } from "./user/registration.reducer";
import { users } from "./user/users.reducer";

export const reducer = combineReducers({
  authentication,
  registration,
  users,
});
