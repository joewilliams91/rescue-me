import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import Main from "../Components/Main";
import Register from "../Components/Register";
import SwipeList from "../Components/SwipeList";
import DogProfile from "../Components/DogProfile";

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
    },
    DogProfile: {
      screen: DogProfile
    }
  },
  {
    initialRouteName: "DogProfile"
  }
);

export default createAppContainer(SwitchNavigator);
