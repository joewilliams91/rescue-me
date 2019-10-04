import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Register from '../Components/Register'
import CentreRegister from '../Components/CentreRegister'
import AddDog from '../Components/AddDog';
import SplashPage from '../Components/SplashPage'
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
    SplashPage: {
      screen: SplashPage
    },
    SwipeList: {
      screen: SwipeList
    }
  },
  {
    initialRouteName: "SplashPage"
  }
);

export default createAppContainer(SwitchNavigator);
