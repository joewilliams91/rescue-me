import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const TelephoneComponent = props => {
  const { updateDetails, telephone } = props;
  return (
    <View>
      <TextInput
        placeholder="Your telephone number"
        maxLength={20}
        onChangeText={telephone => updateDetails("telephone", telephone)}
        value={telephone}
      />
    </View>
  );
};
export default TelephoneComponent;
