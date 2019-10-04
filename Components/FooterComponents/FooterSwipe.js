import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import SwipeFooterDislike from "./SwipeFooterDislike";
import SwipeFooterLike from "./SwipeFooterLike";
import SwipeFooterGoBack from "./SwipeFooterGoBack";
import SwipeFooterStar from './SwipeFooterStar';

class FooterSwipe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SwipeFooterGoBack />
        <SwipeFooterDislike />
        <SwipeFooterLike />
        <SwipeFooterStar />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  }
});

export default FooterSwipe;