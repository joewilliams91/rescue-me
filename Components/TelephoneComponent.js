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
    const { setTelephone, telephone } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Your telephone number"
          maxLength={20}
          onChangeText={telephone => setTelephone(telephone)}
          value={telephone}
        />
        
      </View>
    );
  }
}
