import React from 'react';
import { View, Image, TouchableOpacity } from "react-native";

const HeaderMessages = () => {
  return (
    <View>
      <TouchableOpacity title="message" onPress={() => console.log("heart")}>
        <Image
          source={require("./chat.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default HeaderMessages;