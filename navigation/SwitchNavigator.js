import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import Main from "../Components/Main";
import Register from "../Components/Register";
import SwipeList from "../Components/SwipeList";
import DogProfile from "../Components/DogProfile";

const SwitchNavigator = createStackNavigator(
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
    initialRouteName: "SwipeList"
  }
);

export default createAppContainer(SwitchNavigator);
