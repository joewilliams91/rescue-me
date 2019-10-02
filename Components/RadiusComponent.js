import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

class RadiusComponent extends React.Component {
  render() {
    const { radius, updateRadius } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Radius preferences"
          maxLength={20}
          onChangeText={number => updateRadius(number)}
          value={radius}
        />
      </View>
    );
  }
}

export default RadiusComponent;
