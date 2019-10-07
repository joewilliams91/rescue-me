import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack";
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Register from '../Components/Register'
import CentreRegister from '../Components/CentreRegister'
import AddDog from '../Components/AddDog';
import SplashPage from '../Components/SplashPage'
import LikedDogsList from "../Components/LikedDogsList"
import SwipeList from "../Components/SwipeList";
import DogProfile from "../Components/DogProfile";
import MessageThread from "../Components/MessageThread"
import RescueCentreDogProfile from '../Components/RescueCentreDogProfile'

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
    RescueCentreDogProfile: {
      screen: RescueCentreDogProfile
    },
    CentreRegister: {
      screen: CentreRegister
    },
    AddDog: {
      screen: AddDog
    },
    MessageThread: {
      screen: MessageThread
    }
  },
  {
    initialRouteName: "MessageThread"
  }
);

export default createAppContainer(StackNavigator);
