import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const NameComponent = props => {
  const { updateDetails, name } = props;
  return (
    <View>
      <TextInput
        placeholder="Your centre name(s)"
        maxLength={20}
        onChangeText={text => updateDetails("name", text)}
        value={name}
      />
    </View>
  );
};

export default NameComponent;
