import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class HeaderMessages extends React.Component {
  render() {
    return (
      <View style={{ width: 50, height: 30 }}>
        <Image
          source={require("./heart.png")}
          style={{ width: 45, height: 40, marginTop: 5 }}
        />
      </View>
    );
  }
}

export default withNavigation(HeaderMessages);
