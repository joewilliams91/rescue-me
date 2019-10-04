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
    const { updateDetails, name } = this.props;
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
  }
}
