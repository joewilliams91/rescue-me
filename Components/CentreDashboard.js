import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const firestore = firebase.firestore();
const centresCollection = firestore.collection("centres");

class CentreDashboard extends Component {
    render(){
        return (
            <View>
               <Text>Hi</Text> 
            </View>
        )
    }
}

export default CentreDashboard;