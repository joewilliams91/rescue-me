import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const HeaderMessagesInbox = () => {
  return (
    <View style={{ paddingRight: 15 }}>
      <TouchableOpacity
        title="heart"
        onPress={() => {
          console.log(this.props, "<---fucking fuck");
        }}
      >
        <Image
          source={require("./chat.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMessagesInbox;
