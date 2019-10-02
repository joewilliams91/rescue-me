import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

export default class NameComponent extends React.Component {
  render() {
    const { updateName, firstName, surname } = this.props;
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
  }
}
