import React from 'react';
import { View, Image, TouchableOpacity } from "react-native";

const SwipeFooterDislike = () => {
  return (
    <View>
      <TouchableOpacity title="Dislike" onPress={() => console.log("Dislike")}>
        <Image
          source={require("./dislike.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default SwipeFooterDislike;