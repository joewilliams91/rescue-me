import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
export default class Main extends React.Component {
  state = { currentUser: null };
  componentDidMount() {
    return fetch(
      "https://us-central1-rescuemetest-4a629.cloudfunctions.net/getDogs"
    ).then(console.log);
  }
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});