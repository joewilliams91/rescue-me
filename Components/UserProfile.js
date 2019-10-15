import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  PanResponder,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import firebase from "firebase";
import { Video } from "expo-av";
import HeaderMessagesInbox from "./HeaderComponents/HeaderMessagesInbox";

const firestore = firebase.firestore();
const usersCollection = firestore.collection("users");

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class UserProfile extends React.Component {
  state = {
    user: {},
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
  };

  setImageWidth(event) {
    this.imageWidth = event.nativeEvent.layout.width;
  }
  imageWidth = null;

  activityLevel() {
    const { activityLevel } = this.state.user;
    let activity = null;
    switch (activityLevel) {
      case 5:
        activity = "Extremely Active";
        break;
      case 4:
        activity = "Fairly Active";
        break;
      case 3:
        activity = "Moderately Active";
        break;
      case 2:
        activity = "Leisurely";
        break;
      case 1:
        activity = "Inactive";
    }
    return activity;
  }

  getAge() {
    const { dob } = this.state.user;
    const currentDate = Math.round(new Date().getTime() / 1000);
    const ageUnix = currentDate - dob.seconds;
    const age = ageUnix / (60 * 60 * 24 * 365);
    return Math.round(age);
  }

  goodWithKids() {
    const { hasChildren } = this.state.user;
    let statement = null;
    switch (hasChildren) {
      case "true":
        statement = "I have children";
        break;
      case "false":
        statement = "I do not have children";
        break;
    }
    return statement;
  }

 
  goodWithDogs() {
    const { hasDogs } = this.state.user;
    let statement = null;
    switch (hasDogs) {
      case "true":
        statement = "I have a dog";

        break;
      case "false":
        statement = "I do not have a dog";

        break;
    }
    return statement;
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
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
    usersCollection
      .doc(id.replace(/ /g, ""))
      // .doc("CNZRmXLaILgwtkWyKu5tbHyV9OF3")
      .get()
      .then(user => {
        const userData = user.data();
        this.setState({ user: userData.d, isLoading: false });
      });
  }

  incrementIndex = inc => {
    this.setState(currentState => {
      if (inc === 1 && currentState.i < this.state.user.photos.length - 1)
        return { i: currentState.i + 1 };
      else if (inc === -1 && currentState.i > 0) {
        return { i: currentState.i - 1 };
      }
    });
  };

  render() {
    const { user, isLoading, i } = this.state;
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
          key={user.id}
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
                source={{ uri: user.photos[i] }}
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
                    left: (this.state.i * barWidth) / user.photos.length,
                    width: barWidth / user.photos.length,
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
                {user.firstName}
              </Text>
              
              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 20,
                  fontFamily: "poppins-regular",
                  paddingBottom: 20
                }}
              >
                {user.description} 
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
              
              <Text style={styles.detailTitle}>Activity Levels</Text>
              <Text style={styles.detailDescription}>
                {this.activityLevel()}
              </Text>
              <Text style={styles.detailTitle}>Age</Text>
              <Text style={styles.detailDescription}>{this.getAge()}</Text>
              <Text style={styles.detailTitle}>Important Information:</Text>
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

export default connect(mapStateToProps)(UserProfile);

