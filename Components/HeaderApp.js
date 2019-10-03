import React, { Component } from 'react';
import HeaderGoBack from "./HeaderComponents/HeaderGoBack"
import HeaderSettings from './HeaderComponents/HeaderSettings';
import HeaderHeart from './HeaderComponents/HeaderHeart';
import HeaderMessages from './HeaderComponents/HeaderMessages';
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
    color: "white",
    }
});

export default HeaderApp;