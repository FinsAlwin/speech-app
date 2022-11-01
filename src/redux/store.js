import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }

export default configureStore({
  reducer: rootReducer,
  // middleware: [thunk],
  middleware: [thunk, logger],
});
