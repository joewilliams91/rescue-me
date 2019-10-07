import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const ActivityLevelRadioComponents = props => {
  function checkValue(value) {
    let activityValue = null;
    switch (value) {
      case "1":
        activityValue = "Never";
        break;
      case "2":
        activityValue = "Sometimes";
        break;
      case "3":
        activityValue = "Moderately";
        break;
      case "4":
        activityValue = "Fairly";
        break;
      case "5":
        activityValue = "Very";
        break;
    }
    return activityValue;
  }
  const { options, updateDetails, activityLevel } = props;

  {
    return (
      <View style={styles.inputContainer}>
        {options.map(item => {
          let activityValue = checkValue(item.text);

          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={styles.value}>{activityValue}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => updateDetails("activityLevel", item.key)}
              >
                {activityLevel === item.key && (
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
  }
});

export default ActivityLevelRadioComponents;
