import React from 'react';
import { View, Image, TouchableOpacity } from "react-native";4

const SwipeFooterStar = () => {
  return (
    <View>
      <TouchableOpacity title="Star" onPress={() => console.log("Star")}>
        <Image
          source={require("./star.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default SwipeFooterStar;