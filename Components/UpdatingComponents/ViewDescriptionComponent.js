import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {KeyboardAwareScrollView}  from "react-native-keyboard-aware-scroll-view"

const ViewDescriptionComponent = props => {
  const { description, changeDescription, editDescription, updateDescription, toggleEdit } = props;
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View>
        {editDescription ? (
          <TextInput
            style={styles.inputText}
            multiline={true}
            placeholder="Add a short description"
            onChangeText={text => changeDescription(text)}
            value={description}
          />
        ) : (
          <View>
            <Text style={styles.value}>{description}</Text>
          </View>
        )}
        <View style={{ alignItems:"center"}}>
           <TouchableOpacity
          style={styles.signMeUpbutton}
          onPress={editDescription ? updateDescription : toggleEdit}
        >
          <Text style={styles.signMeUpbuttonText}>
            {editDescription === true ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
        </View>
       
      </View>
    </KeyboardAwareScrollView>
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
  signMeUpbutton: {
    backgroundColor: "white",
    marginBottom: 100,
    borderRadius: 25,
    overflow: "hidden",
    padding: 9,
    textAlign: "center",
    width: 280
  },
  signMeUpbuttonText: {
    color: "#f8789a",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "poppins-semibold"
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
    fontFamily: "poppins-regular",
    padding: 10,
    textAlign: "center"

  },
  inputText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "poppins-regular",
    flex: 1,
    flexWrap: "wrap",
    textAlignVertical: "top",
    padding: 10,
    textAlign: "center"
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

export default ViewDescriptionComponent;