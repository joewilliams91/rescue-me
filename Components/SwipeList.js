import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  Animated,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import HeaderMessagesInbox from "../Components/HeaderComponents/HeaderMessagesInbox";
import HeaderLikedList from "../Components/HeaderComponents/HeaderLikedList";
import FooterSwipe from "../Components/FooterComponents/FooterSwipe";
import firebase from "firebase";
import Firebase, { db } from "../config/Firebase.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const { GeoFirestore } = require("geofirestore");
const geofirestore = new GeoFirestore(db);
const usersCollection = geofirestore.collection("users");

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class SwipeList extends React.Component {
  state = {
    // currentUserID: "",
    currentUserID: "05hHgyVaKqTQ99uSePq5UrXUEYv2",
    isLoading: true,
    currentIndex: 0,
    dogId: null,
    user: {
      activityLevel: null,
      coordinates: [null, null],
      radiusPref: null,
      hasChildren: "",
      hasDogs: "",
      likedDogs: {}
    }
  };

  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#6f6f6f",
    headerRight: <HeaderMessagesInbox />,
    headerTitle: <HeaderLikedList />
  };

  componentDidUpdate() {
    console.log("didupdate");
  }

  currentDog = {};
  // currentIndex = 0;

  storeToLikedList(dog) {
    this.setState(
      currentState => {
        const newDog = dog.id;

        const newLikedDogs = { ...currentState.user.likedDogs, [newDog]: dog };

        const newUser = { ...currentState.user, likedDogs: newLikedDogs };

        const newState = { ...currentState, user: newUser };

        return newState;
      },
      () => {
        const { user, currentUserID } = this.state;
        const { likedDogs } = user;
        const userToUpdate = usersCollection
          .doc(currentUserID)
          .update({ likedDogs: likedDogs })
          .then(() => {
            console.log("Update to liked list successful");
          })
          .catch(console.log("Update unsuccessful"));
      }
    );
  }

  position = new Animated.ValueXY();
  rotate = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-30deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });

  rotateAndTranslate = {
    transform: [
      {
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
    ]
  };
  likedOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 5],
    extrapolate: "clamp"
  });
  nopeOpacity = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [5, 0, 0],
    extrapolate: "clamp"
  });
  superLikeOpacity = this.position.y.interpolate({
    inputRange: [-SCREEN_HEIGHT / 1, 0, SCREEN_HEIGHT / 1],
    outputRange: [3, 0, 0],
    extrapolate: "clamp"
  });

  componentDidMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
        console.log("The Card has been picked up");
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log("Card has been released");
        if (gestureState.dx > 120) {
          Animated.spring(
            this.position,
            {
              toValue: { x: SCREEN_WIDTH + 150, y: gestureState.dy }
            },
            console.log("<-- Just before the start part of the animation")
          ).start(() => {
            this.storeToLikedList(this.currentDog);
            this.setState(
              currentState => ({
                currentIndex: currentState.currentIndex + 1
              }),
              () => {
                this.position.setValue({ x: 0, y: 0 });
                console.log("<-- Swiped Right - Dog ID"); // Swipe righty mctighty
              }
            );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 200, y: gestureState.dy }
          }).start(() => {
            // this.currentIndex += 1;
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              // console.log(this.dogID, "<-- Swiped Left - Dog ID"); // Swipe left hefty
            });
          });
        } else if (gestureState.dy < -300) {
          Animated.spring(this.position, {
            toValue: { y: -SCREEN_HEIGHT - 200, x: gestureState.dx }
          }).start(() => {
            // this.currentIndex += 1;
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              // console.log(this.dogID, "<-- Superlike - Dog ID"); // swipe uppy super likey
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 6
          }).start();
        }
      }
    });

    const { id } = this.props.user;

    this.setState({ currentUserID: id }, () => {
      const { currentUserID } = this.state;

      usersCollection
        .doc("05hHgyVaKqTQ99uSePq5UrXUEYv2") // Change the below baxk to currebntUserID IAN
        .get()
        .then(user => {
          const {
            activityLevel,
            coordinates,
            radiusPref,
            hasChildren,
            hasDogs,
            likedDogs
          } = user.data();

          this.setState(
            {
              user: {
                activityLevel,
                coordinates,
                radiusPref,
                hasChildren,
                hasDogs,
                likedDogs
              }
            },
            () => {
              const {
                activityLevel,
                coordinates,
                radiusPref,
                hasChildren,
                hasDogs
              } = this.state.user;
              console.log(
                hasChildren,
                "<-----same answerrs?",
                this.state.user,
                "<----------The pissing user"
              );

              return axios
                .get(
                  `https://us-central1-rescuemetest-4a629.cloudfunctions.net/getDogs?children=${hasChildren}&dogs=${hasDogs}&activityLevel=${activityLevel}&lat=${
                    coordinates[0]
                  }&lon=${coordinates[1]}&radius=${radiusPref}}`
                )
                .then(({ data }) =>
                  this.setState({ dogs: data.dogs, isLoading: false }, () => {
                    console.log(data.dogs);
                  })
                );
            }
          );
        });
    });
  }

  render() {
    const { currentUser, dogs, isLoading, currentIndex } = this.state;
    if (isLoading) {
      console.log("isloading");
      return (
        <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      console.log("Main Content");
      return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
          <View style={{ alignItems: "center", marginTop: hp("12") }}>
            {dogs
              .map((dog, i) => {
                if (i < currentIndex) {
                  return null;
                } else if (i == currentIndex) {
                  this.currentDog = dog;
                  console.log("Top Card");
                  return (
                    <Animated.View
                      {...this.PanResponder.panHandlers}
                      key={i}
                      style={[
                        this.rotateAndTranslate,

                        {
                          height: SCREEN_HEIGHT - hp("30"),
                          width: SCREEN_WIDTH - wp("5"),
                          padding: 10
                        }
                      ]}
                    >
                      <Animated.View
                        style={{
                          opacity: this.nopeOpacity,
                          transform: [{ rotate: "30deg" }],
                          position: "absolute",
                          top: 90,
                          right: 50,
                          zIndex: 1000
                        }}
                      >
                        <Text
                          style={{
                            borderWidth: 2,
                            borderColor: "white",
                            color: "white",
                            fontSize: 32,
                            fontWeight: "800",
                            padding: 10
                          }}
                        >
                          NOPE
                        </Text>
                      </Animated.View>
                      <Animated.View
                        style={{
                          opacity: this.likedOpacity,
                          transform: [{ rotate: "-30deg" }],
                          position: "absolute",
                          top: 90,
                          left: 50,
                          zIndex: 1000
                        }}
                      >
                        <Text
                          style={{
                            borderWidth: 2,
                            borderColor: "white",
                            color: "white",
                            fontSize: 32,
                            fontWeight: "800",
                            padding: 10
                          }}
                        >
                          LIKED
                        </Text>
                      </Animated.View>
                      <Animated.View
                        style={{
                          opacity: this.superLikeOpacity,
                          position: "absolute",
                          bottom: 50,
                          left: 120,
                          zIndex: 1000
                        }}
                      >
                        <Text
                          style={{
                            borderWidth: 2,
                            borderColor: "white",
                            color: "white",
                            fontSize: 32,
                            fontWeight: "800",
                            padding: 10
                          }}
                        >
                          SuperLike
                        </Text>
                      </Animated.View>
                      <Text
                        style={{
                          position: "absolute",
                          bottom: 25,
                          left: 40,
                          zIndex: 1000,
                          color: "white",
                          fontSize: 40,
                          fontFamily: "poppins-black"
                        }}
                      >
                        {dog.name}
                      </Text>

                      <Image
                        style={{
                          flex: 1,
                          height: null,
                          width: null,
                          resizeMode: "cover",
                          borderRadius: 20
                        }}
                        source={{ uri: dog.photos[0] }}
                      />
                      <TouchableOpacity
                        style={styles.signUpbutton}
                        onPress={() =>
                          this.props.navigation.navigate("DogProfile", {
                            id: dog.id
                          })
                        }
                      >
                        <Image
                          style={{
                            zIndex: 1000,
                            height: 30,
                            width: 30,
                            position: "absolute",
                            bottom: 10
                          }}
                          source={require("../assets/images/profileInfo.png")}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  );
                } else {
                  return (
                    <Animated.View
                      key={i}
                      style={[
                        {
                          height: SCREEN_HEIGHT - hp("30"),
                          width: SCREEN_WIDTH - wp("5"),
                          padding: 10,
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
                        source={{ uri: dog.photos[0] }}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          bottom: 25,
                          left: 40,
                          zIndex: 1000,
                          color: "white",
                          fontSize: 40,
                          fontWeight: "800"
                        }}
                      >
                        {dog.name}
                      </Text>
                      <TouchableOpacity
                        style={styles.signUpbutton}
                        onPress={() =>
                          this.props.navigation.navigate("DogProfile", {
                            id: dog.id
                          })
                        }
                      >
                        <Image
                          style={{
                            zIndex: 1000,
                            height: 30,
                            width: 30,
                            position: "absolute",
                            bottom: 10
                          }}
                          source={require("../assets/images/profileInfo.png")}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  );
                }
              })
              .reverse()}
          </View>
          <View>
            <FooterSwipe />
          </View>
          <View>
            <Image
              source={require("../assets/images/logo/rescueMeLogoSmol.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                textAlign: "center",
                margin: 10
              }}
            ></Image>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({ ...state });

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  signUpbutton: {
    alignItems: "flex-end",
    padding: 20,
    position: "absolute",
    bottom: 20,
    right: 30
  }
});

export default connect(mapStateToProps)(SwipeList);
