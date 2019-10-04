import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from "react-native";

class AddressComponent extends React.Component {
    state = {
        postcode: ""
    }

    handleChange = (text) => {
        this.setState({postcode: text})
    }
  render() {
      const {postcode} = this.state;
      const {getCoordinates} = this.props;
    return (
      <View>
        <TextInput
          placeholder="Your postcode"
          maxLength={20}
          onChangeText={text => this.handleChange(text)}
          onEndEditing={text => getCoordinates(text)}
          value={postcode}
        />
      </View>
    );
  }
}

export default AddressComponent;
