import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Main from '../Components/Main'
import Register from '../Components/Register'
import CentreRegister from '../Components/CentreRegister'
import AddDog from '../Components/AddDog';

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
        CentreRegister: {
            screen: CentreRegister
        },
        AddDog: {
            screen: AddDog
        }
    },
    {
        initialRouteName: 'SignUp'
    }
)

export default createAppContainer(SwitchNavigator)