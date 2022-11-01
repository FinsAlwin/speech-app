import { constants } from "./constant";
import { UserData } from "../../data/User";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: constants.LOGIN_REQUEST });
    try {
      const res = filterByUsername(UserData, user.username);

      if (res) {
        if (res.password === user.password) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("user", JSON.stringify(res));

          dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: {
              res,
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const isNotifications = () => {
  return async (dispatch) => {
    dispatch({
      type: constants.ISNOTIFICATIONS,
    });
  };
};

export const setNotificationMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: constants.NOTIFICATION_MESSAGE,
      payload: message,
    });
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: constants.LOGOUT_REQUEST });
    try {
      localStorage.clear();
      dispatch({ type: constants.LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({
        type: constants.LOGOUT_FAILURE,
        payload: { error },
      });
    }
  };
};

function filterByUsername(jsonObject, username) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["username"] == username;
  })[0];
}
