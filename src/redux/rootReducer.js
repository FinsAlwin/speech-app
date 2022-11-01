import { combineReducers } from "redux";

import cordinates from "./Cordinates/reducer";
import userReducer from "./User/reducer";

const appReducer = combineReducers({
  user: userReducer,
  cordinates: cordinates,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
