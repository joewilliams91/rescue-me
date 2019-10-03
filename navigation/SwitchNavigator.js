import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Main from '../Components/Main'
import Register from '../Components/Register'
import SplashPage from '../Components/SplashPage'

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
    }
  },
  {
    initialRouteName: "SplashPage"
  }
);

export default createAppContainer(SwitchNavigator)