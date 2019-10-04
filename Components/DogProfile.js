import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  Animated,
  Dimensions,
  PanResponder,
  Button
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import firebase from "firebase";
// import { Button } from "react-native-paper";
// import { GeoCollectionReference } from "geofirestore";
// firebase.initializeApp();

const firestore = firebase.firestore();
const dogsCollection = firestore.collection("dogs");

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DogProfile extends React.Component {
  state = {
    dog: {},
    isLoading: true,
    i: 0
  };

  activityLevel() {
    const { exerciseLevel } = this.state.dog;
    let activityLevel = null;
    switch (exerciseLevel) {
      case 5:
        activityLevel = "Extremely Active";
        break;
      case 4:
        activityLevel = "Fairly Active";
        break;
      case 3:
        activityLevel = "Moderately Active";
        break;
      case 2:
        activityLevel = "Leisurely";
        break;
      case 1:
        activityLevel = "Inactive";
    }
    return activityLevel;
  }

  getAge() {
    const { dob } = this.state.dog;
    const currentDate = Math.round(new Date().getTime() / 1000);
    const ageUnix = currentDate - dob.seconds;
    const age = ageUnix / (60 * 60 * 24 * 365);
    return Math.round(age);
  }

  goodWithKids() {
    const { goodWithChildren } = this.state.dog;
    let statement = null;
    switch (goodWithChildren) {
      case true:
        statement = "Good with children";
        break;
      case false:
        statement = "Uncomfortable with children";
        break;
    }
    return statement;
  }

  size() {
    const { size } = this.state.dog;
    let statement = null;
    switch (size) {
      case 1:
        statement = "Small";
        break;
      case 2:
        statement = "Medium";
        break;
      case 3:
        statement = "Large";
        break;
    }
    return statement;
  }
  goodWithDogs() {
    const { goodWithOtherDogs } = this.state.dog;
    let statement = null;
    switch (goodWithOtherDogs) {
      case true:
        statement = "Good with Dogs";
        break;
      case false:
        statement = "Not so good with dogs";
        break;
    }
    return statement;
  }

  componentDidMount() {
    dogsCollection
      .doc("jLUAzKxfLX2IFFS0H86k")
      .get()
      .then(dog => {
        const dogData = dog.data();
        this.setState({ dog: dogData.d, isLoading: false });
      });
  }

  incrementIndex = inc => {
    this.setState(currentState => {
      if (inc === 1 && currentState.i < this.state.dog.photos.length - 1)
        return { i: currentState.i + 1 };
      else if (inc === -1 && currentState.i > 0) {
        return { i: currentState.i - 1 };
      }
    });
  };
  render() {
    const { dog, isLoading, i } = this.state;
    const { goBack } = this.props.navigation;
    if (isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      return (
        <>
          <View
            key={dog.id}
            style={[
              {
                height: SCREEN_HEIGHT - 210,
                width: SCREEN_WIDTH,
                padding: 20,
                paddingTop: 50,
                position: "absolute"
              }
            ]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={{ uri: dog.photos[i] }}
            />
            <Button
              onPress={() => this.incrementIndex(1)}
              title="next photo"
            ></Button>
            <Button
              onPress={() => this.incrementIndex(-1)}
              title="previous photo"
            ></Button>

            <View>
              <Text>{dog.name}</Text>
              <Text>{dog.gender}</Text>
              <Text>{dog.description}</Text>
              <Text>Details</Text>
              <Text>Breed</Text>
              <Text>{dog.breed}</Text>
              <Text>Size</Text>
              <Text>{this.size()}</Text>
              <Text>Activity Levels</Text>
              <Text>{this.activityLevel()}</Text>
              <Text>Age</Text>
              <Text>{this.getAge()}</Text>
              <Text>Good With:</Text>
              <Text>{this.goodWithKids()}</Text>
              <Text>{this.goodWithDogs()}</Text>
              <Button
                title="Go to Dog Profile"
                style={{ zIndex: 2000 }}
                onPress={() => goBack("DogProfile")}
              >
                "I"
              </Button>
            </View>
          </View>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {}
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(DogProfile);
