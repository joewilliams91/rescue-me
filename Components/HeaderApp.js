import React, { Component } from 'react';
import HeaderGoBack from "./HeaderComponents/HeaderGoBack"
class HeaderApp extends Component {
  
  render() { 
    return (
      <View style={styles.container}>
        <HeaderGoBack />
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