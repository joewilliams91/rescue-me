import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

class GenderComponent extends React.Component {

  render() {
    const { options, setHasProperty, gender } = this.props;
    
    {
      return (
        <View>
          <Text>
            What is your gender?
          </Text>
          {options.map(item => {
            return (
              <View key={item.key} style={styles.buttonContainer}>
                <Text>{item.text}</Text>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => setHasProperty("gender", item.key)}
                >
                  {gender === item.key && (
                    <View style={styles.checkedCircle} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    }
  }
}

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

export default GenderComponent;