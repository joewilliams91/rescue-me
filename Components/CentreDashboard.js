import React, { Component } from "react";
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
