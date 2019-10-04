import React from "react";
import Firebase, { db } from "../config/Firebase.js";
import firebase from "firebase";
const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  signup,
  updateLocation
} from "../actions/user";
import HasDogRadioComponents from "./HasDogRadioComponents";
import HasChildrenRadioComponents from "./HasChildrenRadioComponents";
import ActivityLevelRadioComponents from "./ActivityLevelRadioComponents";
import DogPreferenceRadioComponents from "./DogPreferenceRadioComponents";
import EmploymentStatusRadioComponents from "./EmploymentStatusRadioComponents";
import NameComponent from "./NameComponent";
import GenderComponent from "./GenderComponent";
import DOBComponent from "./DOBComponent";
import PhotoComponent from "./PhotoComponent";
import RadiusComponent from "./RadiusComponent";
import TelephoneComponent from "./TelephoneComponent";
import DescriptionComponent from "./DescriptionComponent";

class Register extends React.Component {
  state = {
    userId: "",
    firstName: "",
    surname: "",
    photos: [],
    coordinates: [],
    hasChildren: "",
    hasDogs: "",
    gender: "",
    sizePrefs: [],
    description: "",
    activityLevel: "",
    radius: 0,
    dob: "",
    telephone: "",
    employmentStatus: "",
    sizeOptions: [
      { key: 1, text: "Small" },
      { key: 2, text: "Medium" },
      { key: 3, text: "Large" }
    ],
    hasOptions: [
      { key: "true", text: "True" },
      { key: "false", text: "False" }
    ],
    employmentOptions: [
      { key: 1, text: "Full time" },
      { key: 2, text: "Part time" },
      { key: 3, text: "Not currently working" }
    ],
    activityOptions: [
      { key: 1, text: "1" },
      { key: 2, text: "2" },
      { key: 3, text: "3" },
      { key: 4, text: "4" },
      { key: 5, text: "5" }
    ],
    genderOptions: [
      { key: "Male", text: "Male" },
      { key: "Female", text: "Female" }
    ]
  };

  updateDetails = (has, key) => {
    if (has === "dogs") {
      this.setState({ hasDogs: key });
    } else if (has === "children") {
      this.setState({ hasChildren: key });
    } else if (has === "activity") {
      this.setState({ activityLevel: key });
    } else if (has === "employment") {
      this.setState({ employmentStatus: key });
    } else if (has === "gender") {
      this.setState({ gender: key });
    } else if (has === "description") {
      this.setState({ description: key });
    }
  };

  updateDescription = description => {
    this.setState({ description });
  };

  setDate = dob => {
    this.setState({ dob });
  };

  setSizePrefs = key => {
    const { sizePrefs } = this.state;
    if (sizePrefs.includes(key)) {
      newSizePrefs = sizePrefs.filter(sizeKey => sizeKey !== key);
      this.setState({ sizePrefs: newSizePrefs });
    } else {
      this.setState(currentState => {
        currentState = {
          ...currentState,
          sizePrefs: [...currentState.sizePrefs, key]
        };
        return currentState;
      });
    }
  };

  updateName = (type, name) => {
    if (type === "firstName") {
      this.setState({ firstName: name });
    } else {
      this.setState({ surname: name });
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coordinates: [position.coords.latitude, position.coords.longitude]
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ userId: this.props.user.id });
    }
  }

  updateRadius = radius => {
    this.setState({ radius });
  };

  setTelephone = telephone => {
    this.setState({ telephone });
  };

  addToPhotoArray = url => {
    this.setState(currentState => {
      const newPhotos = [...currentState.photos, url];
      const newState = { ...currentState, photos: newPhotos };
      return newState;
    });
  };

  handleRegister = () => {
    const {
      userId,
      firstName,
      surname,
      photos,
      employmentStatus,
      activityLevel,
      hasChildren,
      hasDogs,
      dob,
      description,
      sizePrefs,
      coordinates,
      gender,
      radius,
      telephone
    } = this.state;
    const geofirestore = new GeoFirestore(db);
    const geocollection = geofirestore.collection("users");

    const parts = dob.split("-");
    const newDob = firebase.firestore.Timestamp.fromDate(
      new Date(+parts[2], +parts[1] - 1, +parts[0])
    );

    geocollection.doc(userId).set({
      coordinates: new firebase.firestore.GeoPoint(
        coordinates[0],
        coordinates[1]
      ),
      firstName: firstName,
      photos: photos,
      surname: surname,
      description: description,
      radiusPref: radius,
      employmentStatus: employmentStatus,
      activityLevel,
      hasChildren: hasChildren,
      hasDogs: hasDogs,
      dob: newDob,
      telephone: telephone,
      sizePref: sizePrefs,
      gender: gender,
      likedDogs: []
    });
  };

  render() {
    const {
      userId,
      hasOptions,
      sizePrefs,
      sizeOptions,
      activityOptions,
      firstName,
      surname,
      gender,
      employmentStatus,
      employmentOptions,
      dob,
      genderOptions,
      radius,
      telephone,
      description
    } = this.state;
    return (
      <ScrollView>
        <Text>Hi there ${userId}! Please enter your details to register.</Text>
        <NameComponent
          firstName={firstName}
          surname={surname}
          updateName={this.updateName}
        />
        <DescriptionComponent
          description={description}
          updateDescription={this.updateDescription}
        />
        <ActivityLevelRadioComponents
          options={activityOptions}
          updateDetails={this.updateDetails}
          activityLevel={this.state.activityLevel}
        />
        <HasDogRadioComponents
          options={hasOptions}
          updateDetails={this.updateDetails}
          hasDogs={this.state.hasDogs}
        />
        <HasChildrenRadioComponents
          options={hasOptions}
          updateDetails={this.updateDetails}
          hasChildren={this.state.hasChildren}
        />
        <DogPreferenceRadioComponents
          sizePrefs={sizePrefs}
          options={sizeOptions}
          setSizePrefs={this.setSizePrefs}
        />
        <EmploymentStatusRadioComponents
          updateDetails={this.updateDetails}
          employmentStatus={employmentStatus}
          options={employmentOptions}
        />
        <DOBComponent dob={dob} setDate={this.setDate} />
        <TelephoneComponent
          telephone={telephone}
          setTelephone={this.setTelephone}
        />
        <GenderComponent
          updateDetails={this.updateDetails}
          options={genderOptions}
          gender={gender}
        />
        <PhotoComponent
          user={this.props.user.id}
          addToPhotoArray={this.addToPhotoArray}
        />
        <RadiusComponent radius={radius} updateRadius={this.updateRadius} />
        <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, updateLocation, signup },
    dispatch
  );
};

const mapStateToProps = state => ({
  ...state
});

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
