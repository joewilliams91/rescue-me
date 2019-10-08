import React from 'react';
import { View, Image, TouchableOpacity } from "react-native";

const HeaderHeart = () => {
  return (
    <View>
      <TouchableOpacity title="heart" onPress={() => console.log("heart")}>
        <Image
          source={require("./heart.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default HeaderHeart;