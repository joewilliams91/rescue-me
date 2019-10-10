import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  PanResponder,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import firebase from "firebase";
import { Video } from "expo-av";
import HeaderMessagesInbox from "../Components/HeaderComponents/HeaderMessagesInbox";
import HeaderLikedList from "../Components/HeaderComponents/HeaderLikedList";

const firestore = firebase.firestore();
const dogsCollection = firestore.collection("dogs");

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DogProfile extends React.Component {
  state = {
    dog: {},
    isLoading: true,
    i: 0,
    input: ""
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#f5f5f5",
      borderBottomWidth: 0,
      height: hp("10")
    },
    headerTintColor: "#6f6f6f",
    headerRight: <HeaderMessagesInbox />,
    headerTitle: <HeaderLikedList />
  };

  setImageWidth(event) {
    this.imageWidth = event.nativeEvent.layout.width;
  }
  imageWidth = null;

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
      case "true":
        statement = "Good with children";
        break;
      case "false":
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
      case "true":
        statement = "Good with Dogs";

        break;
      case "false":
        statement = "Not so good with dogs";

        break;
    }
    return statement;
  }

  componentDidMount() {
    // const { id } = this.props.navigation.state.params;
    // console.log(id);
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
      onPanResponderGrant: (event, gestureState) => false,
      onPanResponderMove: (event, gestureState) => false,
      onPanResponderRelease: (event, gestureState) => {
        const { locationX } = event.nativeEvent;
        if (locationX < this.imageWidth / 2) {
          this.incrementIndex(-1);
        } else this.incrementIndex(1);
      }
    });
    dogsCollection
      // .doc(id.replace(/ /g, ""))
      .doc("DUS2SbN2Vd9SN5pxGxg2")
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
      const barWidth = SCREEN_WIDTH * 0.8;
      return (
        <ScrollView
          key={dog.id}
          contentContainerStyle={{ alignItems: "center" }}
          style={[
            {
              height: hp("100"),
              width: SCREEN_WIDTH,
              backgroundColor: "#f5f5f5"
            }
          ]}
        >
          <View
            style={{
              width: wp("90"),
              borderRadius: 10,
              backgroundColor: "#fff",
              marginBottom: hp("1")
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                {...this.PanResponder.panHandlers}
                style={{
                  height: hp("50"),
                  width: wp("90"),
                  resizeMode: "cover",
                  borderRadius: 10,
                  alignItems: "center"
                }}
                onLayout={event => this.setImageWidth(event)}
                source={{ uri: dog.photos[i] }}
              />

              <View
                style={{
                  position: "absolute",
                  alignItems: "center",
                  left: wp("5")
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    width: barWidth,
                    height: 5,
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    opacity: 0.5,
                    left: 0
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    left: (this.state.i * barWidth) / dog.photos.length,
                    width: barWidth / dog.photos.length,
                    backgroundColor: "#fff",
                    height: 5,
                    overflow: "hidden"
                  }}
                ></View>
              </View>
            </View>

            <View style={{ padding: wp("4") }}>
              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 40,
                  fontFamily: "poppins-semibold",
                  marginBottom: 0,
                  paddingBottom: 0,
                  lineHeight: 42
                }}
              >
                {dog.name}
              </Text>
              <Text
                style={{
                  color: "#a3a3a3",

                  fontSize: 25,
                  lineHeight: 25,
                  fontFamily: "poppins-regular"
                }}
              >
                {dog.gender}
              </Text>
              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 20,
                  fontFamily: "poppins-regular",
                  paddingBottom: 20
                }}
              >
                {dog.description} {"\n"}ps. You can donate to this pooch's cause
                below!
              </Text>
              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 25,
                  fontFamily: "poppins-semibold"
                }}
              >
                Details
              </Text>
              <Text style={styles.detailTitle}>Breed</Text>
              <Text style={styles.detailDescription}>{dog.breed}</Text>
              <Text style={styles.detailTitle}>Size</Text>
              <Text style={styles.detailDescription}>{this.size()}</Text>
              <Text style={styles.detailTitle}>Activity Levels</Text>
              <Text style={styles.detailDescription}>
                {this.activityLevel()}
              </Text>
              <Text style={styles.detailTitle}>Age</Text>
              <Text style={styles.detailDescription}>{this.getAge()}</Text>
              <Text style={styles.detailTitle}>Good With:</Text>
              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 18,
                  lineHeight: 19,
                  fontFamily: "poppins-regular"
                }}
              >
                {this.goodWithKids()}
              </Text>
              <Text style={styles.detailDescription}>
                {this.goodWithDogs()}
              </Text>
            </View>

            <View style={{ alignItems: "center", paddingBottom: 30 }}>
              {dog.videos && dog.videos.map(video =>{
                return  <Video
                source={{
                  uri: video
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                useNativeControls
                style={{ width: 300, height: 200, borderRadius: 20, marginBottom: 10 }}
              />
              })}
             
            </View>
            <View style={styles.donationContainer}>
              <Text
                style={{
                  color: "#f8789a",
                  fontSize: 32,
                  fontFamily: "poppins-bold"
                }}
              >
                Donate!
              </Text>
              <Text
                style={{
                  color: "#a3a3a3",
                  textAlign: "center",
                  fontSize: 18,
                  lineHeight: 19,
                  fontFamily: "poppins-regular",
                  padding: 10
                }}
              >
                Food, Medical, Pawdicures - these doggo's appreciate your
                generosity, all donations go to your chosen rescue centre!
              </Text>
              <View style={styles.donationButtons}>
                <TouchableOpacity
                  style={styles.donateButton}
                  onPress={() =>
                    this.props.navigation.navigate("Donations", {
                      amount: 1,
                      id: dog.centreId
                    })
                  }
                >
                  <Text style={styles.donateButtonText}>£1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.donateButton}
                  onPress={() =>
                    this.props.navigation.navigate("Donations", {
                      amount: 2,
                      id: dog.centreId
                    })
                  }
                >
                  <Text style={styles.donateButtonText}>£2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.donateButton}
                  onPress={() =>
                    this.props.navigation.navigate("Donations", {
                      amount: 5,
                      id: dog.centreId
                    })
                  }
                >
                  <Text style={styles.donateButtonText}>£5</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.customDonation}>
                <TextInput
                  style={styles.customDonationInput}
                  clearButtonMode="always"
                  placeholder="Or custom amount here"
                  value={this.state.input}
                  keyboardType="number-pad"
                  onChange={event =>
                    this.setState({ input: event.nativeEvent.text })
                  }
                />
                <TouchableOpacity
                  disabled={this.state.input.length === 0}
                  style={styles.customDonateButton}
                  onPress={() => {
                    this.props.navigation.navigate("Donations", {
                      amount: Number(this.state.input).toFixed(2),
                      id: dog.centreId
                    });
                    this.setState({ input: "" });
                  }}
                >
                  <Text style={styles.donateButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Image
              source={require("../assets/images/logo/rescueMeLogoSmol.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                margin: 20
              }}
            ></Image>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  detailTitle: {
    color: "#a3a3a3",
    fontSize: 18,
    lineHeight: 19,
    fontFamily: "poppins-semibold"
  },
  detailDescription: {
    color: "#a3a3a3",
    fontSize: 18,
    lineHeight: 19,
    fontFamily: "poppins-regular",
    paddingBottom: 10
  },
  donationContainer: {
    alignSelf: "stretch",
    alignItems: "center"
  },
  donationButtons: {
    flexDirection: "row"
  },
  donateButton: {
    backgroundColor: "#f8789a",
    marginBottom: 10,
    borderRadius: 50,
    overflow: "hidden",
    padding: 20,
    margin: 15,
    width: 62
  },
  donateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "poppins-semibold"
  },
  customDonation: { alignItems: "center" },
  customDonationInput: {
    alignItems: "center",
    color: "#a3a3a3",
    marginTop: 25,
    borderBottomColor: "#c5c6ca",
    borderBottomWidth: 2,
    overflow: "hidden",
    padding: 5,
    fontSize: 20,
    textAlign: "left",
    fontFamily: "poppins-regular",
    width: 200
  },
  customDonateButton: {
    backgroundColor: "#f8789a",
    marginBottom: 30,
    borderRadius: 50,
    overflow: "hidden",
    padding: 10,
    margin: 15,
    width: 280
  }
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(DogProfile);
