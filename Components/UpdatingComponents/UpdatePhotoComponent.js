import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  Button
} from "react-native";
import { Video } from "expo-av";
import PhotoComponent from "../AddingComponents/PhotoComponent";

export default class UpdatePhotoComponent extends React.Component {
  state = {
    edit: false
  };

  toggleEdit = () => {
    this.setState(currentState => {
      const newEdit = !currentState.edit;
      return { ...currentState, edit: newEdit };
    });
  };

  render() {
    const { photos, videos, addToPhotoArray, addToVideoArray } = this.props;
    const { edit } = this.state;
    return (
      <View>
        
        <Text style={styles.value}>Photos: </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          {photos.map(photo => {
            return (
              <Image
                style={{ width: 113, height: 113, borderRadius: 5, margin: 10 }}
                source={{ uri: photo }}
              />
            );
          })}
        </View>
        <Text style={styles.value}>Video: </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          {videos.map(video => {
            return (
              <Video
                style={{ width: 113, height: 113, borderRadius: 5, margin: 10 }}
                source={{ uri: video }}
              />
            );
          })}
        </View>

        <View style={{flexDirection: "row", justifyContent: "center"}}>
          {edit && (
          <PhotoComponent
            addToVideoArray={addToVideoArray}
            addToPhotoArray={addToPhotoArray}
          />
        )}
        <TouchableOpacity
          style={styles.signMeUpbutton}
          onPress={this.toggleEdit}
        >
          <Text style={styles.signMeUpbuttonText}>
            {edit ? "Done" : "Add new media"}
          </Text>
        </TouchableOpacity>
        </View>
        
      </View>
    );
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
