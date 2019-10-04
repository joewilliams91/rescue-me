import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from "react-native";
import { connect } from "react-redux";
import Firebase, { db } from "../config/Firebase.js";
import firebase from "firebase";
const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");
import DogNameComponent from "./DogNameComponent";
import DogBreedComponent from "./DogBreedComponent";
import DescriptionComponent from "./DescriptionComponent";
import DOBComponent from "./DOBComponent";
import GenderComponent from "./GenderComponent";
import ExerciseLevelComponent from "./ExerciseLevelComponent";
import GoodWithDogsComponent from "./GoodWithDogsComponent";
import GoodWithChildrenComponent from "./GoodWithChildrenComponent";
import SizeComponent from "./SizeComponent";
import PhotoComponent from "./PhotoComponent";

class AddDog extends React.Component {
  state = {
    centreId: "",
    breed: "",
    name: "",
    description: "",
    dob: "",
    exerciseLevel: "",
    gender: "",
    goodWithChildren: "",
    goodWithOtherDogs: "",
    photos: [],
    size: "",
    goodWithOptions: [
      { key: "true", text: "True" },
      { key: "false", text: "False" }
    ],

    genderOptions: [
      { key: "Male", text: "Male" },
      { key: "Female", text: "Female" }
    ],
    sizeOptions: [
      { key: 1, text: "Small" },
      { key: 2, text: "Medium" },
      { key: 3, text: "Large" }
    ],
    exerciseOptions: [
      { key: 1, text: "1" },
      { key: 2, text: "2" },
      { key: 3, text: "3" },
      { key: 4, text: "4" },
      { key: 5, text: "5" }
    ]
  };

  updateDetails = (type, text) => {
    this.setState({ [type]: text });
  };

  updateDescription = description => {
    this.setState({ description });
  };


  addToPhotoArray = url => {
    this.setState(currentState => {
      const newPhotos = [...currentState.photos, url];
      const newState = { ...currentState, photos: newPhotos };
      return newState;
    });
  };


  componentDidMount() {
    this.setState({
      centreId: this.props.user.id,
      coordinates: this.props.user.coordinates
    });
  }

  setDate = dob => {
    this.setState({ dob });
  };

  handleAdd = () => {
    const {
      centreId,
      coordinates,
      breed,
      name,
      description,
      dob,
      exerciseLevel,
      gender,
      goodWithChildren,
      goodWithOtherDogs,
      photos: [],
      size
    } = this.state;
    const parts = dob.split("-");
    const newDob = firebase.firestore.Timestamp.fromDate(
      new Date(+parts[2], +parts[1] - 1, +parts[0])
    );
    const geofirestore = new GeoFirestore(db);
    const dogsCollection = geofirestore.collection("dogs");
    const centreDoc = geofirestore.collection("centres").doc(centreId);

    const newDog = dogsCollection.doc();
    const newDogId = newDog.id;

    centreDoc.update({ ["availableDogs." + newDogId]: { name, photos: [] } });

    newDog.set({
      coordinates: new firebase.firestore.GeoPoint(
        coordinates[0],
        coordinates[1]
      ),
      name: name,
      description: description,
      exerciseLevel: exerciseLevel,
      goodWithChildren: goodWithChildren,
      goodWithOtherDogs: goodWithOtherDogs,
      dob: newDob,
      gender: gender,
      centreId: centreId,
      size: size,
      breed: breed,
      photos: []
    });
  };

  render() {
    const {
      centreId,
      genderOptions,
      name,
      gender,
      dob,
      exerciseLevel,
      breed,
      description,
      goodWithOptions,
      goodWithChildren,
      goodWithOtherDogs,
      sizeOptions,
      exerciseOptions,
      size
    } = this.state;
    return (
      <ScrollView>
        <Text>
          Hi there ${centreId}! Please enter some information about your dog.
        </Text>
        <DogNameComponent name={name} updateDetails={this.updateDetails} />
        <DogBreedComponent breed={breed} updateDetails={this.updateDetails} />
        <DescriptionComponent
          description={description}
          updateDescription={this.updateDescription}
        />
        <DOBComponent setDate={this.setDate} dob={dob} />
        <ExerciseLevelComponent
          options={exerciseOptions}
          exerciseLevel={exerciseLevel}
          updateDetails={this.updateDetails}
        />
        <GenderComponent
          options={genderOptions}
          gender={gender}
          updateDetails={this.updateDetails}
        />
        <GoodWithDogsComponent
          options={goodWithOptions}
          goodWithOtherDogs={goodWithOtherDogs}
          updateDetails={this.updateDetails}
        />
        <GoodWithChildrenComponent
          options={goodWithOptions}
          goodWithChildren={goodWithChildren}
          updateDetails={this.updateDetails}
        />
        <SizeComponent
          options={sizeOptions}
          size={size}
          updateDetails={this.updateDetails}
        />
        <PhotoComponent
          user={centreId}
          addToPhotoArray={this.addToPhotoArray}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleAdd}>
          <Text style={styles.buttonText}>Add dog</Text>
        </TouchableOpacity>
      </ScrollView>
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

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(AddDog);
