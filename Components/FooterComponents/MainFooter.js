import React from "react";
import { View, Image } from "react-native";

const MainFooter = () => {
  return (
    <View>
      <Image source={require("./dog.png")} style={{ width: 50, height: 50 }} />
    </View>
  );
};

export default MainFooter;
