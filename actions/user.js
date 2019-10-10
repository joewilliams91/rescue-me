import Firebase, { db } from "../config/Firebase.js";
export const SIGNUP = "SIGNUP";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_TYPE = "UPDATE_TYPE";
export const UPDATE_NAME = "UPDATE_NAME";

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

export const updateName = type => {
  return {
    type: UPDATE_NAME,
    payload: type
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password, type } = getState().user;

      try{
        /.+@.+\..+/.test(email)
      } catch(e){
        alert("Invalid email")
      }

      try{
        /.{6,}/.test(password)
      } catch(e){
        alert("Please enter a password of at least six characters")
      }      

      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email.trim(),
        password
      );
      if (response.user.uid) {
        const user = {
          id: response.user.uid,
          email: email.trim(),
          type: type
        };

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (error) {
      alert(error);
    } 
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email.trim(),
        password
      );
      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = (uid, type) => {
  return async (dispatch, getState) => {
    try {
      const { type } = getState().user;

      const user =
        type === "user"
          ? await db
              .collection("users")
              .doc(uid)
              .get()
          : await db
              .collection("centres")
              .doc(uid)
              .get();

      const fetchedUser = { ...user.data(), id: uid, type };


      dispatch({ type: LOGIN, payload: fetchedUser });
    } catch (e) {
      alert(e);
    }
  };
};
