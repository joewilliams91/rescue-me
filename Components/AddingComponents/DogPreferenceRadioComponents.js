import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const DogPreferenceRadioComponents = props => {
  const { options, setSizePrefs, sizePrefs } = props;
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.question}>What size of dog are you looking for?</Text>
      {options.map(item => {
        return (
          <View key={item.key} style={styles.buttonContainer}>
            <Text style={styles.value}>{item.text}</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setSizePrefs(item.key)}
            >
              {sizePrefs.includes(item.key) && (
                <View style={styles.checkedCircle} />
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff"
  },
  question: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "poppins-regular"
  },
  value: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "poppins-regular"
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    width: 250,
    justifyContent: "center"
  }
});

export default DogPreferenceRadioComponents;
