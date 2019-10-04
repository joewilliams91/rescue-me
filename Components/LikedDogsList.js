import React, { Component } from 'react';
// import {getUsers} from 'axios';
import { View, Text, StyleSheet } from "react-native";

class LikedDogsList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <View style={styles.container}>
        <Text>Liked  Dogs list</Text>
      </View>
     );
  }

  // componentDidMount(){
  //   this.fetchAllUsers()
  // }


  // fetchAllUsers = () => {
  //     getUsers()
  //     .then(users => {
  //       console.log(users)
  //     })
  // }

}
 
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
  }
});

export default LikedDogsList;