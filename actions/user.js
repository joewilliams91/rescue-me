import Firebase, { db } from "../config/Firebase.js";
import firebase from 'firebase'

const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");

export const SIGNUP = "SIGNUP";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const LOGIN = "LOGIN";

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
          coordinates: new firebase.firestore.GeoPoint(2.1222, 2.1111)
        };

        const geofirestore = new GeoFirestore(db);
        const geocollection = geofirestore.collection("users");

        geocollection.doc(response.user.uid).set(user);

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