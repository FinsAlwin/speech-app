import { constants } from "./constant";

export const testItem = (test) => {
  return async (dispatch) => {
    dispatch({
      type: constants.TEST,
      payload: test,
    });
  };
};
