import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

export default class CharityNumComponent extends React.Component {
  render() {
    const { charityNum, updateCharityNum } = this.props;
    return (
      <View>
        <TextInput
          placeholder="What is your charity number?"
          maxLength={20}
          onChangeText={text => updateCharityNum(text)}
          value={charityNum}
        />
      </View>
    );
  }
}
