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
// import axios from "axios";
import firebase from "firebase";
import { Video } from 'expo-av';
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

  setImageWidth(event) {
    this.imageWidth = event.nativeEvent.layout.width;
  }
  imageWidth = null;
  

  componentDidMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) =>  true,
      onMoveShouldSetPanResponder: (event, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
      onPanResponderGrant: (event, gestureState) => false,
      onPanResponderMove: (event, gestureState) => false,
      onPanResponderRelease: (event, gestureState) =>{
        const { locationX } = event.nativeEvent;
        if (locationX < this.imageWidth / 2) {
          this.incrementIndex(-1)
        }
        else this.incrementIndex(1)
      }
    })
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
      const barWidth = SCREEN_WIDTH * 0.8;
      return (
        <View
        {...this.PanResponder.panHandlers}
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
          <View
            style={{ flex: 2 }}
          >
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20
            }}
            onLayout={(event) => this.setImageWidth(event)}
            source={{ uri: dog.photos[i] }}
          />
          <View
          style={{position: 'absolute', flex: 1, left: 0.05 * SCREEN_WIDTH }}>
          <View
          style={{position: 'absolute', top: 5, width: barWidth, height: 5, backgroundColor:  '#ccc', overflow: 'hidden', left: 0 }}>
          </View>
          <View
          style={{ position: 'absolute', top: 5, left: this.state.i * barWidth / dog.photos.length,width: barWidth / dog.photos.length, backgroundColor:  '#5294d6', height: 5, overflow: 'hidden' }}
          >
          </View>
          </View>
          
          </View>
         
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
          <Video
  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/rescuemetest-4a629.appspot.com/o/videos%2FVID-20190918-WA0001.mp4?alt=media&token=4901ea2a-fd0c-4065-ac5d-30ac724b0258' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  useNativeControls
  style={{ width: 300, height: 300 }}
/>
         
          
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {}
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(DogProfile);
