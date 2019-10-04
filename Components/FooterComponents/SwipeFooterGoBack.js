import React from 'react';
import { View, Image, TouchableOpacity } from "react-native";
const SwipeFooterGoBack = () => {
  return (
    <View>
      <TouchableOpacity title="SwipeFooterBack" onPress={() => console.log("SwipeFooterBack")}>
        <Image
          source={require("./back.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default SwipeFooterGoBack;