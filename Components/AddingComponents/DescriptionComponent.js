import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const DescriptionComponent = props => {
  const { description, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="Add a short description"
        maxLength={20}
        onChangeText={text => updateDetails("description", text)}
        value={description}
      />
    </View>
  );
};

export default DescriptionComponent;
