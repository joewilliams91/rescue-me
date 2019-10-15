import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class HeaderMessages extends React.Component {
  render() {
    return (
      <View style={{ width: 50, height: 30 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("LikedDogsList")}
        >
          <Image
            source={require("./heart.png")}
            style={{ width: 45, height: 40, marginTop: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(HeaderMessages);
