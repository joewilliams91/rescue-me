import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { LinearGradient } from "expo-linear-gradient";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import Register from "../Components/Register";
import CentreRegister from "../Components/CentreRegister";
import AddDog from "../Components/AddDog";
import SplashPage from "../Components/SplashPage";
import SwipeList from "../Components/SwipeList";
import DogProfile from "../Components/DogProfile";
import Donations from "../Components/Donations";
import LikedDogsList from "../Components/LikedDogsList";
import CentreDogsList from "../Components/CentreDogsList";
import MessageThread from "../Components/MessageThread";
import RescueCentreDogProfile from "../Components/RescueCentreDogProfile";
import InboxMessages from "../Components/InboxMessages";
import CentreDashboard from "../Components/CentreDashboard";
import PhotoComponent from "../Components/AddingComponents/PhotoComponent";
import UploadComponent from "../Components/AddingComponents/UploadComponent"

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
    CentreRegister: {
      screen: CentreRegister
    },
    AddDog: {
      screen: AddDog
    },
    Donations: {
      screen: Donations
    },
    LikedDogsList: {
      screen: LikedDogsList
    },
    CentreDogsList: {
      screen: CentreDogsList
    },
    InboxMessages: {
      screen: InboxMessages
    },
    MessageThread: {
      screen: MessageThread
    },
    RescueCentreDogProfile: {
      screen: RescueCentreDogProfile
    },
    CentreDashboard: {
      screen: CentreDashboard
    },

    CentreDogsList: {
      screen: CentreDogsList
    },
    PhotoComponent: {
      screen: PhotoComponent
    },
    UploadComponent: {
      screen: UploadComponent
    }
  },
  {
    initialRouteName: "SplashPage"
  }
);

export default createAppContainer(StackNavigator);
