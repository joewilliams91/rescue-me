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
import Geolocation from '@react-native-community/geolocation';
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../actions/user";
import HasDogRadioComponents from "./HasDogRadioComponents";
import HasChildrenRadioComponents from "./HasChildrenRadioComponents";
import ActivityLevelRadioComponents from "./ActivityLevelRadioComponents";
import DogPreferenceRadioComponents from "./DogPreferenceRadioComponents";
import EmploymentStatusRadioComponents from "./EmploymentStatusRadioComponents";
import NameComponent from "./NameComponent";
import GenderComponent from "./GenderComponent";
import DOBComponent from "./DOBComponent";
import PhotoComponent from "./PhotoComponent";
import MapComponent from "./MapComponent";

class Register extends React.Component {
  state = {
    userId: "",
    firstName: "",
    surname: "",
    location: {
      latitude: 53.78825,
      longitude: -2.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    hasChildren: "",
    hasDogs: "",
    gender: "",
    sizePrefs: [],
    activityLevel: "",
    radius: 0,
    dob: "",
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

  setHasProperty = (has, key) => {
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
    }
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

  setLocation = location => {
    this.setState({ location });
  };

  updateName = (type, name) => {
    if (type === "firstName") {
      this.setState({ firstName: name });
    } else {
      this.setState({ surname: name });
    }
  };

  componentDidMount(){
    Geolocation.getCurrentPosition(info => console.log(info));
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ userId: this.props.user.id });
    }
  }

  handleRegister = () => {
    const {
      userId,
      firstName,
      surname,
      employmentStatus,
      activityLevel,
      hasChildren,
      hasDogs,
      dob,
      sizePrefs,
      gender
    } = this.state;
    const geofirestore = new GeoFirestore(db);
    const geocollection = geofirestore.collection("users");

    geocollection
      .doc(userId)
      .set({
        coordinates: new firebase.firestore.GeoPoint(2.1222, 2.1111),
        firstName: firstName,
        surname: surname,
        radiusPref: 30,
        employmentStatus: employmentStatus,
        activityLevel,
        hasChildren: hasChildren,
        hasDogs: hasDogs,
        dob: dob,
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
      location
    } = this.state;
    return (
      <ScrollView>
        <Text>Hi there ${userId}! Please enter your details to register.</Text>
        <NameComponent
          firstName={firstName}
          surname={surname}
          updateName={this.updateName}
        />
        <ActivityLevelRadioComponents
          options={activityOptions}
          setHasProperty={this.setHasProperty}
          activityLevel={this.state.activityLevel}
        />
        <HasDogRadioComponents
          options={hasOptions}
          setHasProperty={this.setHasProperty}
          hasDogs={this.state.hasDogs}
        />
        <HasChildrenRadioComponents
          options={hasOptions}
          setHasProperty={this.setHasProperty}
          hasChildren={this.state.hasChildren}
        />
        <DogPreferenceRadioComponents
          sizePrefs={sizePrefs}
          options={sizeOptions}
          setSizePrefs={this.setSizePrefs}
        />
        <EmploymentStatusRadioComponents
          setHasProperty={this.setHasProperty}
          employmentStatus={employmentStatus}
          options={employmentOptions}
        />
        <DOBComponent dob={dob} setDate={this.setDate} />
        <GenderComponent
          setHasProperty={this.setHasProperty}
          options={genderOptions}
          gender={gender}
        />
        {/* <PhotoComponent /> */}
        {/* <MapComponent setLocation={this.setLocation} location={location} /> */}
        <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
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
