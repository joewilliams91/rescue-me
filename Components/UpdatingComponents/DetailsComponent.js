import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

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
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginBottom: 40,
          width: wp("85"),
          justifyContent: "center",
          borderRadius: 15,
          backgroundColor: "white",
          padding: wp("5")
        }}
      >
        <Text
          style={{
            color: "#a3a3a3",
            fontSize: 18,
            lineHeight: 19,
            fontFamily: "poppins-semibold",
            paddingLeft: wp("2"),
            textAlign: "left"
          }}
        >
          Is the dog good with children?
        </Text>
        {goodWithOptions.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={styles.value}>{item.text}</Text>
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

        <Text style={styles.question}>Is the dog good with other dogs?</Text>
        {goodWithOptions.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={styles.value}>{item.text}</Text>
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
        <Text style={styles.question}>
          How much exercise does your dog need (1 = low exercise needs, 5 = high
          exercise needs)?
        </Text>
        {exerciseOptions.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text style={styles.value}>{item.text}</Text>
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
    borderColor: "#a3a3a3",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#a3a3a3"
  },
  value: {
    color: "#a3a3a3",
    fontSize: 17,
    fontFamily: "poppins-regular"
  },
  question: {
    color: "#a3a3a3",
    fontSize: 18,
    lineHeight: 19,
    fontFamily: "poppins-semibold",
    paddingLeft: wp("2"),
    textAlign: "left"
  }
});

export default DetailsComponent;
