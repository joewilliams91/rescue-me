import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import HeaderGoBack from "./HeaderComponents/HeaderGoBack"
import HeaderSettings from './HeaderComponents/HeaderSettings';
import HeaderHeart from './HeaderComponents/HeaderHeart';
import HeaderMessages from './HeaderComponents/HeaderMessages';
class HeaderApp extends Component {
  
  render() { 
    console.log("HeaderApp",this.props.header)
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