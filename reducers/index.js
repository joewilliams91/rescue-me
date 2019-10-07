import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_LOCATION,
  UPDATE_TYPE
} from "../actions/user";


const user = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP:      
      return action.payload;
    case LOGIN:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_LOCATION: 
      return {...state, coordinates: action.payload}
      case UPDATE_TYPE: 
      return {...state, type: action.payload}
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user
});

export default rootReducer;
