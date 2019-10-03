import React from 'react';
import { Image, View, TouchableOpacity } from "react-native";

const HeaderSettings = () => {
  return (
    <View>
      <TouchableOpacity title="gear" onPress={() => console.log("settings")}>
        <Image
          source={require("./gear.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
 
export default HeaderSettings;