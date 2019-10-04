import React from 'react';
import {  View, Image, TouchableOpacity } from "react-native";

const SwipeFooterLike = () => {
  return (
    <View>
      <TouchableOpacity title="Like" onPress={() => console.log("Like")}>
        <Image
          source={require("./like.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default SwipeFooterLike;