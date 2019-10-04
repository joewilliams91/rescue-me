import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import HeaderGoBack from "./HeaderGoBack"
import HeaderSettings from './HeaderSettings';
import HeaderHeart from './HeaderHeart';
import HeaderMessages from './HeaderMessages';
class HeaderApp extends Component {
  
  render() { 
    return (
      <View style={styles.container}>
        <HeaderGoBack />
        <HeaderSettings />
        <HeaderHeart />
        <HeaderMessages />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white"
  }
});

export default HeaderApp;