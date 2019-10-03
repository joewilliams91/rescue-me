import React, { Component } from 'react';
import HeaderGoBack from "./HeaderComponents/HeaderGoBack"
import HeaderSettings from './HeaderComponents/HeaderSettings';
class HeaderApp extends Component {
  
  render() { 
    return (
      <View style={styles.container}>
        <HeaderGoBack />
        <HeaderSettings />
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