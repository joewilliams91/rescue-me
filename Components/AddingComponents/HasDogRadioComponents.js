import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const HasDogRadioComponents = props => {
  function checkValue(value) {
    let activityValue = null;
    switch (value) {
      case "True":
        activityValue = "Yes";
        break;
      case "False":
        activityValue = "No";
        break;
    }
    return activityValue;
  }
  const { options, updateDetails, hasDogs } = props;

  {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.question}>Do you have dogs?</Text>
        {options.map(item => {
          let boolValue = checkValue(item.text);
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={styles.value}>{boolValue}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => updateDetails("hasDogs", item.key)}
              >
                {hasDogs === item.key && <View style={styles.checkedCircle} />}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
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
    fontSize: 25,
    padding: 15,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "poppins-semibold"
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

export default HasDogRadioComponents;
