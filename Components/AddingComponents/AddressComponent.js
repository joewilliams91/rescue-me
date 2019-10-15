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
  };

  handleChange = text => {
    this.setState({ postcode: text });
  };
  render() {
    const { postcode } = this.state;
    const { getCoordinates } = this.props;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.question}>What's your postcode?</Text>

        <TextInput
          style={styles.inputBox}
          placeholder="Your postcode"
          maxLength={20}
          placeholderTextColor={"#c5c6ca"}
          onChangeText={text => this.handleChange(text)}
          onEndEditing={text => getCoordinates(text)}
          value={postcode}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    alignItems: "center",
    color: "#fff",
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: "#c5c6ca",
    borderBottomWidth: 2,
    overflow: "hidden",
    padding: 12,
    textAlign: "left",
    fontSize: 14,
    alignSelf: "stretch",
    fontFamily: "poppins-regular"
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    width: 300,
    justifyContent: "center"
  },
  question: {
    color: "#fff",
    fontSize: 25,
    padding: 15,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "poppins-semibold"
  }
});
export default AddressComponent;
