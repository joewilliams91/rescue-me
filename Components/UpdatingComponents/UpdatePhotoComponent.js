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
        <Text>Photos: </Text>
        {photos.map(photo => {
          return (
            <Image style={{ width: 50, height: 50 }} source={{ uri: photo }} />
          );
        })}
        <Text>Videos: </Text>
        {videos.map(video => {
          return (
            <Image style={{ width: 50, height: 50 }} source={{ uri: video }} />
          );
        })}
        {edit && (
          <PhotoComponent
            addToVideoArray={addToVideoArray}
            addToPhotoArray={addToPhotoArray}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={this.toggleEdit}>
          <Text style={styles.buttonText}>
            {edit ? "Done" : "Add a new photo"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
