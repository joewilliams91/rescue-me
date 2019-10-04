import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack";
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Main from "../Components/Main";
import Register from '../Components/Register'
import CentreRegister from '../Components/CentreRegister'
import AddDog from '../Components/AddDog';
import SplashPage from '../Components/SplashPage'
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
    SplashPage: {
      screen: SplashPage
    },
    SwipeList: {
      screen: SwipeList
    },
    DogProfile: {
      screen: DogProfile
    }
  },
  {
    initialRouteName: "SplashPage"
  }
);

export default createAppContainer(SwitchNavigator);
