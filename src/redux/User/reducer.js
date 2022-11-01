import { constants } from "./constant";

const initState = {
  token: null,
  user: null,
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  isNotifications: false,
  notification_message: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case constants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.res,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;
    case constants.ISNOTIFICATIONS:
      state = {
        ...state,
        isNotifications: true,
      };
      break;
    case constants.NOTIFICATION_MESSAGE:
      state = {
        ...state,
        notification_message: action.payload,
      };
      break;
    case constants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
        authenticating: true,
        authenticate: false,
      };
      break;
    case constants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case constants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
        authenticating: false,
      };
      break;
  }

  return state;
};
