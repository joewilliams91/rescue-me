import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import Main from '../Components/Main'
import Register from '../Components/Register'

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
        }
    },
    {
        initialRouteName: 'SignUp'
    }
)

export default createAppContainer(SwitchNavigator)