import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Main from '../Components/Main'
import Register from '../Components/Register'
import SplashPage from '../Components/SplashPage'
import SwipeList from "../Components/SwipeList"
import LikedDogsList from "../Components/LikedDogsList"

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
    },
    LikedDogsList: {
      screen: LikedDogsList
    }
  },
  {
    initialRouteName: "SplashPage"
  }
);

export default createAppContainer(SwitchNavigator);
