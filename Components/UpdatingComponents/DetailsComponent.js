import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
​
const DetailsComponent = props => {
  const {
    exerciseOptions,
    goodWithOptions,
    updateDetails,
    goodWithChildren,
    goodWithOtherDogs,
    exerciseLevel
  } = props;
  {
    return (
     
      <View>
        <Text>Is the dog good with children?</Text>
        {goodWithOptions.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text>{item.text}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => updateDetails("goodWithChildren", item.key)}
              >
                {goodWithChildren === item.key && (
                  <View style={styles.checkedCircle} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
​
        <Text>Is the dog good with other dogs?</Text>
        {goodWithOptions.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text>{item.text}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => updateDetails("goodWithOtherDogs", item.key)}
              >
                {goodWithOtherDogs === item.key && (
                  <View style={styles.checkedCircle} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
        <Text>
          How much exercise does your dog need (1 = low exercise needs, 5 = high
          exercise needs)?
        </Text>
        {exerciseOptions.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text>{item.text}</Text>
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
​
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
    borderColor: "#ACACAC",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#794F9B"
  }
});
​
export default DetailsComponent;