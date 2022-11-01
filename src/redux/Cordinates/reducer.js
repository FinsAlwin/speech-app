import { constants } from "./constant";

const initState = {
  test: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case constants.TEST:
      state = {
        ...state,
        test: action.payload,
      };
      break;
  }

  return state;
};
