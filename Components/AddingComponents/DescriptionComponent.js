import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
const DescriptionComponent = props => {
  const { description, updateDetails } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a short description"
        style={styles.inputBox}
        multiline={true}
        allowFontScaling={true}
        placeholderTextColor={"#c5c6ca"}
        onChangeText={text => updateDetails("description", text)}
        value={description}
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
    fontSize: 16,
    textAlign: "left",
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
export default DescriptionComponent;
