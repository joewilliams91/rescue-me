import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";
class HeaderMessagesInbox extends React.Component {
  handleClick = () => {};

  render() {
    return (
      <View style={{ paddingRight: 15 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("InboxMessages")}
        >
          <Image
            source={require("./chat.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(HeaderMessagesInbox);
