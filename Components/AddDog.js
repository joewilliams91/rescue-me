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

  componentDidMount() {
    this.setState({ centreId: this.props.user.id });
  }

  setDate = dob => {
    this.setState({ dob });
  };

  handleAdd = () => {
    const {
      centreId,
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
    const geofirestore = new GeoFirestore(db);
    const geocollection = geofirestore.collection("dogs");

    geocollection.add({
      coordinates: new firebase.firestore.GeoPoint(0, 0),
      name: name,
      description: description,
      exerciseLevel: exerciseLevel,
      goodWithChildren: goodWithChildren,
      goodWithOtherDogs: goodWithOtherDogs,
      dob: dob,
      gender: gender,
      centreId: centreId,
      size: size,
      breed: breed
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
          updateDetails={this.updateDetails}
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
        <PhotoComponent />
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
