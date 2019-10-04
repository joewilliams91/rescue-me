import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const RadiusComponent = props => {
  const { radius, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="Radius preferences"
        maxLength={20}
        onChangeText={number => updateDetails("radius", number)}
        value={radius}
      />
    </View>
  );
};

export default RadiusComponent;
