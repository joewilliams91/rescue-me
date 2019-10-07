import Firebase, { db } from "../config/Firebase.js";
export const SIGNUP = "SIGNUP";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_TYPE = "UPDATE_TYPE";

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  };
};

export const updateLocation = coordinates => {
  return {
    type: UPDATE_LOCATION,
    payload: coordinates
  };
};

export const updateType = type => {
  return {
    type: UPDATE_TYPE,
    payload: type
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;

      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          id: response.user.uid,
          email: email,
          type: type
        };

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      dispatch({ type: LOGIN, payload: response.user });
    } catch (e) {
      console.log(e);
    }
  };
};
