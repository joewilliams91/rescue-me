import React from "react";
import Firebase, { db } from "../config/Firebase.js";
import firebase from "firebase";
const { GeoFirestore } = require("geofirestore");
import {
  Image,
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
  updateLocation,
  updateName
} from "../actions/user";
import { LinearGradient } from "expo-linear-gradient";
import HasDogRadioComponents from "./AddingComponents/HasDogRadioComponents";
import HasChildrenRadioComponents from "./AddingComponents/HasChildrenRadioComponents";
import ActivityLevelRadioComponents from "./AddingComponents/ActivityLevelRadioComponents";
import DogPreferenceRadioComponents from "./AddingComponents/DogPreferenceRadioComponents";
import EmploymentStatusRadioComponents from "./AddingComponents/EmploymentStatusRadioComponents";
import NameComponent from "./AddingComponents/NameComponent";
import GenderComponent from "./AddingComponents/GenderComponent";
import DOBComponent from "./AddingComponents/DOBComponent";
import PhotoComponent from "./AddingComponents/PhotoComponent";
import RadiusComponent from "./AddingComponents/RadiusComponent";
import TelephoneComponent from "./AddingComponents/TelephoneComponent";
import DescriptionComponent from "./AddingComponents/DescriptionComponent";
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

  updateDetails = (type, text) => {
    this.setState({ [type]: text });
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
      console.log(this.props.user, "-----did mount ");
      this.setState({ userId: this.props.user.id });
    }
  }
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

    this.props.updateName(firstName);

    const geofirestore = new GeoFirestore(db);
    const geocollection = geofirestore.collection("users");

    const parts = dob.split("-");
    const newDob = firebase.firestore.Timestamp.fromDate(
      new Date(+parts[2], +parts[1] - 1, +parts[0])
    );

<<<<<<< HEAD
    geocollection
      .doc(userId)
      .set({
        coordinates: new firebase.firestore.GeoPoint(
          coordinates[0],
          coordinates[1]
        ),
        id: userId,
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
        likedDogs: {}
      })
      .then(() => {
        this.props.navigation.navigate("SwipeList");
      });
=======
    geocollection.doc(userId).set({
      coordinates: new firebase.firestore.GeoPoint(
        coordinates[0],
        coordinates[1]
      ),
      id: userId,
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
      likedDogs: {}
    });

    this.props.navigation.navigate("SwipeList")
>>>>>>> 13d6265937ad202f8dccc478eef4cb202d337707
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
        <LinearGradient
          colors={["#f8789a", "#845efd"]}
          start={[0.1, 1.5]}
          end={[1.2, 0.1]}
          style={styles.gradient}
        >
          <Image
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginTop: 100
            }}
            source={require("../assets/images/logo/rescueMe_logo_dog.png")}
          />
          <Text style={styles.heroMessage}>Tell us about yourself?</Text>
          <Text style={styles.guideMessage}>
            Help us find the best matches for you, by answering a few questions.
          </Text>
          <NameComponent
            firstName={firstName}
            surname={surname}
            updateDetails={this.updateDetails}
          />
          <Text style={styles.guideMessage}>
            Give us a little description about what makes you, you. This will go
            onto your profile.
          </Text>
          <DescriptionComponent
            description={description}
            updateDetails={this.updateDetails}
          />

          <DOBComponent dob={dob} updateDetails={this.updateDetails} />
          <TelephoneComponent
            telephone={telephone}
            updateDetails={this.updateDetails}
          />

          <EmploymentStatusRadioComponents
            updateDetails={this.updateDetails}
            employmentStatus={employmentStatus}
            options={employmentOptions}
          />
          <Text style={styles.guideMessage}>
            Will you walk 500 miles? Give us a distance radius to look for dogs.
          </Text>
          <RadiusComponent radius={radius} updateDetails={this.updateDetails} />

          <Text style={styles.guideMessage}>
            Say Cheese! We need a picture for your profile please.
          </Text>

          <PhotoComponent
            user={userId}
            addToPhotoArray={this.addToPhotoArray}
          />

          <ActivityLevelRadioComponents
            options={activityOptions}
            updateDetails={this.updateDetails}
            activityLevel={this.state.activityLevel}
          />
          <Text style={styles.guideMessage}>
            Not all dogs are equal, some need a bit more patience before they're
            ready to hang out with other dogs.
          </Text>
          <HasDogRadioComponents
            options={hasOptions}
            updateDetails={this.updateDetails}
            hasDogs={this.state.hasDogs}
          />
          <Text style={styles.guideMessage}>
            Some doggo's find kids a bit too much.
          </Text>
          <HasChildrenRadioComponents
            options={hasOptions}
            updateDetails={this.updateDetails}
            hasChildren={this.state.hasChildren}
          />
          <Text style={styles.guideMessage}>
            Think carefully here, big dogs are cool - but do you have guns like
            arnie and enough room on the sofa?
          </Text>
          <DogPreferenceRadioComponents
            sizePrefs={sizePrefs}
            options={sizeOptions}
            setSizePrefs={this.setSizePrefs}
          />
          <TouchableOpacity
            style={styles.signMeUpbutton}
            onPress={this.handleRegister}
          >
            <Text style={styles.signMeUpbuttonText}>Sign me up!</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, updateLocation, signup, updateName },
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
  },
  gradient: {
    flex: 1,
    zIndex: -1000,
    alignSelf: "stretch",
    alignItems: "center"
  },
  heroMessage: {
    color: "white",
    fontSize: 30,
    fontFamily: "poppins-bold"
  },
  guideMessage: {
    padding: 20,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "poppins-regular"
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
