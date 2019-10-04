import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const CharityNumComponent = props => {
  const { charityNum, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="What is your charity number?"
        maxLength={20}
        onChangeText={text => updateDetails("charityNum", text)}
        value={charityNum}
      />
    </View>
  );
};

export default CharityNumComponent;
