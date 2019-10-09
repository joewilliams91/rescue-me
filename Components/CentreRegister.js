import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button,
  Image
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { updateLocation, updateName } from "../actions/user";
import Firebase, { db } from "../config/Firebase.js";
import firebase from "firebase";
const {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot
} = require("geofirestore");
import TelephoneComponent from "./AddingComponents/TelephoneComponent";
import DescriptionComponent from "./AddingComponents/DescriptionComponent";
import CharityNumComponent from "./AddingComponents/CharityNumComponent";
import CentreNameComponent from "./AddingComponents/CentreNameComponent";
import AddressComponent from "./AddingComponents/AddressComponent";
class CentreRegister extends React.Component {
  state = {
    userId: "",
    name: "",
    coordinates: [],
    telephone: "",
    charityNum: "",
    description: ""
  };
  updateDetails = (type, text) => {
    this.setState({ [type]: text });
  };
  getCoordinates = event => {
    const postcode = event.nativeEvent.text.replace(/ /g, "");
    if (/\w{1,2}\d{2,3}\w{2}/.test(postcode)) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyA0NPRN93V8yRyOeg4IPwPuy-qQAXDBf2Q`
      )
        .then(response => response.json())
        .then(responseJson => {
          const coords = responseJson.results[0].geometry.location;
          const coordinates = [coords.lat, coords.lng];
          this.setState({ coordinates });
          return coordinates;
        })
        .then(coordinates => {
          this.props.updateLocation(coordinates);
        })
        .catch(error => alert(error));
    }
  };
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ userId: this.props.user.id });
    }
  }
  handleRegister = () => {
    const {
      userId,
      name,
      description,
      charityNum,
      coordinates,
      telephone
    } = this.state;

    this.props.updateName(name);

    const geofirestore = new GeoFirestore(db);
    const geocollection = geofirestore.collection("centres");
    geocollection.doc(userId).set({
      coordinates: new firebase.firestore.GeoPoint(
        coordinates[0],
        coordinates[1]
      ),
      id: userId,
      name: name,
      charityNum: charityNum,
      description: description,
      telephone: telephone,
      availableDogs: {}
    });
    this.props.navigation.navigate("AddDog");
  };
  render() {
    const {
      userId,
      name,
      charityNum,
      description,
      postcode,
      telephone
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
          <Text style={styles.heroMessage}>
            Tell us about your organisation?
          </Text>
          <CentreNameComponent updateDetails={this.updateDetails} name={name} />
          <TelephoneComponent
            telephone={telephone}
            updateDetails={this.updateDetails}
          />
          <AddressComponent
            postcode={postcode}
            getCoordinates={this.getCoordinates}
          />
          <CharityNumComponent
            charityNum={charityNum}
            updateDetails={this.updateDetails}
          />
          <Text style={styles.guideMessage}>
            Give us a little description about your centre. This will go onto
            your profile.
          </Text>
          <DescriptionComponent
            description={description}
            updateDetails={this.updateDetails}
          />
          <TouchableOpacity
            style={styles.signMeUpbutton}
            onPress={this.handleRegister}
          >
            <Text style={styles.signMeUpbuttonText}>Register</Text>
          </TouchableOpacity>
        </LinearGradient>
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
const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateLocation, updateName }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CentreRegister);
