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
​
export default class UpdatePhotoComponent extends React.Component {
  state = {
    editPhotos: false
  };
​
  toggleEdit = () => {
    this.setState(currentState => {
      const newEditPhotos = !currentState.editPhotos;
      return { ...currentState, editPhotos: newEditPhotos };
    });
  };
​
  render() {
    const { photos, addToPhotoArray } = this.props;
    const {editPhotos} = this.state
    return (
      <View>
        <Text>Photos: </Text>
        {photos.map(photo => {
          return (
            <Image style={{ width: 50, height: 50 }} source={{ uri: photo }} />
          );
        })}
        {editPhotos && <PhotoComponent addToPhotoArray={addToPhotoArray}/>}
        <TouchableOpacity style={styles.button} onPress={this.toggleEdit}>
          <Text style={styles.buttonText}>{editPhotos ? "Done" : "Add a new photo"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
​
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