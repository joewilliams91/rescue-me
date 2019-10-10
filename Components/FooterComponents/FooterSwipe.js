import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class FooterSwipe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.swipeLeft()}>
          <Image
            source={require("./swipeLeftButton.png")}
            style={{
              width: 50,
              height: 50,
              alignSelf: "center",
              margin: 10
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.superLike()}>
          <Image
            source={require("./superLike.png")}
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
              paddingTop: 4,
              textAlign: "center",
              margin: 10
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.swipeRight()}>
          <Image
            source={require("./swipeRightButton.png")}
            style={{
              width: 50,
              height: 50,
              alignSelf: "center",
              textAlign: "center",
              margin: 10
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    width: wp("80")
  }
});

export default FooterSwipe;
