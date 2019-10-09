import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const ExerciseLevelComponent = props => {
  const { options, updateDetails, exerciseLevel } = props;
  function checkValue(value) {
    let activityValue = null;
    switch (value) {
      case "1":
        activityValue = "Lazy";
        break;
      case "2":
        activityValue = "Relaxed";
        break;
      case "3":
        activityValue = "Moderate";
        break;
      case "4":
        activityValue = "Energetic";
        break;
      case "5":
        activityValue = "Hyperactive";
        break;
    }
    return activityValue;
  }
  {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.question}>
          How active is your dog?
        </Text>
        {options.map(item => {
          let activityValue = checkValue(item.text);
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={styles.value}>{activityValue}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => updateDetails("exerciseLevel", item.key)}
              >
                {exerciseLevel === item.key && (
                  <View style={styles.checkedCircle} />
                )}
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
  value: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "poppins-regular"
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    width: 250,
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

export default ExerciseLevelComponent;