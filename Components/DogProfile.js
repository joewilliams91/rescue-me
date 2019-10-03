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
    if (isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      //   console.log(dog, "<---dog", dog.id, "<---dog id");
      return (
        <Animated.View
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
          {/* {dog.photos.map(photo => {
            return (
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20
                }}
                source={{ uri: photo }}
              />
            );
          })} */}

          <Text
            style={{
              position: "absolute",
              bottom: 50,
              left: 120,
              zIndex: 1000,
              color: "white",
              fontSize: 32,
              fontWeight: "800"
            }}
          >
            {dog.name}
          </Text>
          <Text>{dog.description}</Text>
          <Button
            onPress={() => this.incrementIndex(1)}
            title="next photo"
          ></Button>
          <Button
            onPress={() => this.incrementIndex(-1)}
            title="previous photo"
          ></Button>
        </Animated.View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {}
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(DogProfile);
