import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack";
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Register from '../Components/Register'
import CentreRegister from '../Components/CentreRegister'
import AddDog from '../Components/AddDog';
import SplashPage from '../Components/SplashPage'
import SwipeList from "../Components/SwipeList"
import LikedDogsList from "../Components/LikedDogsList"
import DogProfile from "../Components/DogProfile";
import CentreDogsList from "../Components/CentreDogsList"

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
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
    },
    DogProfile: {
      screen: DogProfile
    },
    CentreRegister: {
      screen: CentreRegister
    },
    AddDog: {
      screen: AddDog
    },
    CentreDogsList: {
      screen: CentreDogsList
    }
  },
  {
    initialRouteName: "LikedDogsList"
  }
);

export default createAppContainer(StackNavigator);
