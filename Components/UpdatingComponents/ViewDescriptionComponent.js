import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const ViewDescriptionComponent = props => {
  const { description, changeDescription, editDescription, updateDescription, toggleEdit } = props;
  return (
    <View>
      <Text>Description: </Text>
      {editDescription ? (
        <TextInput
          placeholder="Add a short description"
          maxLength={30}
          onChangeText={text => changeDescription(text)}
          value={description}
        />
      ) : (
        <View>
          <Text>{description}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={editDescription? updateDescription : toggleEdit}>
        <Text style={styles.buttonText}>
          {editDescription === true ? "Save" : "Edit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  }
});

export default ViewDescriptionComponent;