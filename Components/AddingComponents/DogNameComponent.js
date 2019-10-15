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

const DogNameComponent = props => {
  const { name, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="What is your dog's name?"
        onChangeText={text => updateDetails("name", text)}
        value={name}
        placeholderTextColor={"#c5c6ca"}
        style={styles.inputBox}
        multiline={true}
        allowFontScaling={true}
        clearTextOnFocus={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    alignItems: "center",
    color: "#fff",
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: "#fff",
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
    width: 400,
    justifyContent: "center"
  }
});

export default DogNameComponent;
