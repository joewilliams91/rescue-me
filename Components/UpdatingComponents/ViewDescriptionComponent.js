import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
const ViewDescriptionComponent = props => {
  const {
    description,
    changeDescription,
    editDescription,
    updateDescription,
    toggleEdit
  } = props;
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <View>
        {editDescription ? (
          <View
            style={{
              width: wp("85"),
              height: hp("40"),
              flexDirection: "row",
              borderRadius: 15,
              backgroundColor: "white"
            }}
          >
            <TextInput
              style={styles.inputText}
              multiline={true}
              placeholder="Add a short description"
              onChangeText={text => changeDescription(text)}
              value={description}
            />
          </View>
        ) : (
          <View
            style={{
              width: wp("85"),
              height: hp("20"),
              flexDirection: "row",
              borderRadius: 15,
              backgroundColor: "white"
            }}
          >
            <Text
              style={{
                color: "#a3a3a3",
                fontSize: 20,
                fontFamily: "poppins-regular",
                paddingBottom: 20,
                padding: wp("10")
              }}
            >
              {description}
            </Text>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#00c066",
              marginBottom: 100,
              marginTop: hp("2"),
              borderRadius: 25,
              overflow: "hidden",
              padding: 9,
              textAlign: "center",
              width: 280
            }}
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
    color: "#fff",
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
  inputText: {
    color: "#a3a3a3",
    fontSize: 17,
    fontFamily: "poppins-regular",
    flex: 1,
    flexWrap: "wrap",
    textAlignVertical: "top",
    padding: 10,
    textAlign: "center"
  },
  inputContainer: {
    width: wp("85"),
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "white"
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
