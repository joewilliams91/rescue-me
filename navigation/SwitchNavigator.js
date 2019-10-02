import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import Main from "../Components/Main";
import Register from "../Components/Register";
import SwipeList from "../Components/SwipeList";

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    Main: {
      screen: Main
    },
    Register: {
      screen: Register
    },
    SwipeList: {
      screen: SwipeList
    }
  },
  {
    initialRouteName: "SwipeList"
  }
);

export default createAppContainer(SwitchNavigator);
