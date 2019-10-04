import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const NameComponent = props => {
  const { updateDetails, firstName, surname } = props;
  return (
    <View>
      <TextInput
        placeholder="Your first name(s)"
        maxLength={20}
        onChangeText={text => updateDetails("firstName", text)}
        value={firstName}
      />
      <TextInput
        placeholder="Your surname"
        maxLength={20}
        onChangeText={text => updateDetails("surname", text)}
        value={surname}
      />
    </View>
  );
};

export default NameComponent;
