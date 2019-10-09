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

const DogBreedComponent = props => {
  const { breed, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="What breed is your dog?"
        style={styles.inputBox}
        multiline={true}
        allowFontScaling={true}
        clearTextOnFocus={true}
        placeholderTextColor={"#c5c6ca"}
        onChangeText={text => updateDetails("breed", text)}
        value={breed}
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
    fontSize: 14,
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

export default DogBreedComponent;