import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

export const NameComponent = props => {
  const { updateName, firstName, surname } = props;
  return (
    <View>
      <TextInput
        placeholder="Your first name(s)"
        maxLength={20}
        onChangeText={text => updateName("firstName", text)}
        value={firstName}
      />
      <TextInput
        placeholder="Your surname"
        maxLength={20}
        onChangeText={text => updateName("surname", text)}
        value={surname}
      />
    </View>
  );
};
