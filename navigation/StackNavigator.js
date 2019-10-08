import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import Register from "../Components/Register";
import CentreRegister from "../Components/CentreRegister";
import AddDog from "../Components/AddDog";
import SplashPage from "../Components/SplashPage";
import SwipeList from "../Components/SwipeList";
import DogProfile from "../Components/DogProfile";
import LikedDogsList from '../Components/LikedDogsList'
import CentreDogsList from '../Components/CentreDogsList'
import MessageThread from '../Components/MessageThread'
import RescueCentreDogProfile from '../Components/RescueCentreDogProfile'
import CentreDashboard from '../Components/CentreDashboard'

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    CentreRegister: {
      screen: CentreRegister
    },
    Register: {
      screen: Register
    },
    AddDog: {
      screen: AddDog
    },
    SplashPage: {
      screen: SplashPage
    },
    SwipeList: {
      screen: SwipeList
    },
    DogProfile: {
      screen: DogProfile
    },
    LikedDogsList: {
      screen: LikedDogsList
    },
    CentreDogsList: {
      screen: CentreDogsList
    },
    MessageThread: {
      screen: MessageThread
    },
    RescueCentreDogProfile: {
      screen: RescueCentreDogProfile
    },
    CentreDashboard: {
      screen: CentreDashboard
    }
  },
  {
    initialRouteName: "SplashPage"
  } 
);

export default createAppContainer(StackNavigator);
