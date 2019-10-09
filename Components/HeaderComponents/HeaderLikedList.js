import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const HeaderMessages = () => {
  return (
    <View style={{ width: 50, height: 30 }}>
      <TouchableOpacity
        title="message"
        onPress={() => console.log("take me to the liked list")}
      >
        <Image
          source={require("./heart.png")}
          style={{ width: 45, height: 40, marginTop: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMessages;
