import React, { Component } from 'react';

class HeaderApp extends Component {
  
  render() { 
    return (
      <View style={styles.container}>
        <Text>Header</Text>
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