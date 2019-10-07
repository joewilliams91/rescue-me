import React from 'react';
import { Image, View, TouchableOpacity } from "react-native";
const HeaderGoBack = () => {
  return (
    <View>
      <TouchableOpacity title="back" onPress={() => console.log("back")}>
        <Image
          source={require("./back.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default HeaderGoBack;