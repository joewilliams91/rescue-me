import React, { Component } from "react";
<<<<<<< HEAD
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
=======
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class CentreDashboard extends Component {
 
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("CentreDogsList");
          }}
        >
          <Text>Your dog list</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("AddDog");
          }}
        >
          <Text>Add Dog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("InboxMessages");
          }}
        >
          <Text>Inbox messages</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CentreDashboard;
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
