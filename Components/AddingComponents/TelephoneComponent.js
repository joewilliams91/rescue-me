import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

export default class TelephoneComponent extends React.Component {
  render() {
    const { updateDetails, telephone } = this.props;
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
  }
}
