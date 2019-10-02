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
    const { updateName, name } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Your centre name(s)"
          maxLength={20}
          onChangeText={text => updateName(text)}
          value={name}
        />
      </View>
    );
  }
}
