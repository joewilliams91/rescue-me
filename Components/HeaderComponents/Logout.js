import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Firebase from "../../config/Firebase";
const Logout = () => {
  handleClick = () => {};

  signOut = () => {
    Firebase.auth().signOut();
    this.props.navigation.navigate("SplashPage");
  };

  return (
    <View style={{ paddingRight: 15 }}>
      <TouchableOpacity onPress={this.signOut}>
        <Image
          source={require("./exit.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(Logout);
