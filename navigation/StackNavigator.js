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
<<<<<<< HEAD
<<<<<<< HEAD
import Donations from '../Components/Donations';
=======
import LikedDogsList from '../Components/LikedDogsList'
import CentreDogsList from '../Components/CentreDogsList'
import MessageThread from '../Components/MessageThread'
import RescueCentreDogProfile from '../Components/RescueCentreDogProfile'
import CentreDashboard from '../Components/CentreDashboard'
>>>>>>> 13d6265937ad202f8dccc478eef4cb202d337707

=======
import InboxMessages from "../Components/InboxMessages";
import MessageThread from "../Components/MessageThread";
import CentreDashboard from "../Components/CentreDashboard"
import CentreDogsList from "../Components/CentreDogsList";
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
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
<<<<<<< HEAD
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
=======
    InboxMessages: {
      screen: InboxMessages
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
    },
    MessageThread: {
      screen: MessageThread
    },
<<<<<<< HEAD
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
=======
    CentreDashboard: {
      screen: CentreDashboard
    },
    CentreDogsList: {
      screen: CentreDogsList
    }
  },
  {
    initialRouteName: "CentreDashboard"
  }
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
);

export default createAppContainer(StackNavigator);
