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
    const { radius, updateDetails } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Radius preferences"
          maxLength={20}
          onChangeText={number => updateDetails("radius", number)}
          value={radius}
        />
      </View>
    );
  }
}

export default RadiusComponent;
