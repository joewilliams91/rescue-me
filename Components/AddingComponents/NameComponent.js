import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const NameComponent = props => {
  const { updateDetails, firstName, surname } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputBox}
        placeholder="First Name"
        placeholderTextColor={"#c5c6ca"}
        maxLength={20}
        onChangeText={text => updateDetails("firstName", text)}
        value={firstName}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Surname"
        placeholderTextColor={"#c5c6ca"}
        maxLength={20}
        onChangeText={text => updateDetails("surname", text)}
        value={surname}
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
  }
});

export default NameComponent;
