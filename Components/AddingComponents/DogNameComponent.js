import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from "react-native";

const DogNameComponent = props => {
  const { name, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="Your dog's name(s)"
        maxLength={20}
        onChangeText={text => updateDetails("name", text)}
        value={name}
      />
    </View>
  );
};

export default DogNameComponent;
