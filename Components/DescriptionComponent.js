import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

export default class DescriptionComponent extends React.Component {
  render() {
    const { description, updateDescription } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Add a short description"
          maxLength={20}
          onChangeText={text => updateDescription(text)}
          value={description}
        />
      </View>
    );
  }
}
