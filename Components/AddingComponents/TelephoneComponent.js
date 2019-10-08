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
    <View style={styles.inputContainer}>
      <Text style={styles.question}>What's your number?</Text>

      <TextInput
        style={styles.inputBox}
        placeholder="Telephone number"
        maxLength={20}
        placeholderTextColor={"#c5c6ca"}
        onChangeText={telephone => updateDetails("telephone", telephone)}
        value={telephone}
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
    marginTop: 50,
    marginBottom: 40,
    width: 300,
    justifyContent: "center"
  },
  question: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "poppins-semibold"
  }
});

export default TelephoneComponent;
