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
    currentUserID: "",
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
    console.log("<-- Component Updated");
  }

  currentDog = {};

  storeToLikedList(dog) {
    console.log(dog, "------dog")
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
            console.log("Added to liked list");
          })
          .catch(console.log("Not added to liked list"));
      }
    );
  }

  position = new Animated.ValueXY();
  rotate = this.position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 1, 0, SCREEN_WIDTH / 2],
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

  swipeLeft = () => {
    Animated.timing(this.position, {
      toValue: { x: -SCREEN_WIDTH - 200, y: SCREEN_HEIGHT + 100, duration: 0.5 }
    }).start(() => {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        this.position.setValue({ x: 0, y: 0 });
      });
    });
  };

  swipeRight = () => {
    Animated.timing(this.position, {
      toValue: { x: SCREEN_WIDTH + 100, y: SCREEN_HEIGHT + 100, duration: 0.5 }
    }).start(() => {
      this.storeToLikedList(this.currentDog);
      this.setState(
        currentState => ({
          currentIndex: currentState.currentIndex + 1
        }),
        () => {
          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });
  };

  superLike = () => {
    Animated.timing(this.position, {
      toValue: { y: -SCREEN_HEIGHT - 200, x: SCREEN_WIDTH + 10, duration: 0.5 }
    }).start(() => {
      this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        this.position.setValue({ x: 0, y: 0 });
      });
    });
  };

  // The SWIPE animations are set up on component did mount
  componentDidMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
        console.log("<== The Card has been picked up");
      }, //*************/  This part listens for when a card has been touched, and works instantly, its keep a track of where on the screen the finger is with gesture state
      onPanResponderRelease: (evt, gestureState) => {
        //*************/  This part listens for when a card has been released, and works instantly
        console.log("<==== Card has been released");
        if (gestureState.dx > 120) {
          //*************/  This checks the figure of gesturestate on release, and if it's on a certain side of the screen, runs the animation function, this works quickly
          Animated.timing(
            // actual animation
            this.position,
            {
              toValue: {
                x: SCREEN_WIDTH + 150,
                y: gestureState.dy,
                duration: 0.1
              }
            },
            console.log("<======  Just before the start part of the animation")
          ).start(() => {
            //*************/ This section is where it starts getting slow
            console.log("<<======== Inside the start");
            this.storeToLikedList(this.currentDog);
            const newArray = [...this.state.dogs];
            console.log(newArray, "<------- newarray");
            this.setState(
              //*************/ I believe its this triggering of re-render and the time it takes for the render to happen that causes the delay
              currentState => ({
                currentIndex: currentState.currentIndex + 1
              }),
              () => {
                this.position.setValue({ x: 0, y: 0 });
                console.log("<========== Swiped Right"); // Swipe righty mctighty
              }
            );
          });
        } else if (gestureState.dx < -120) {
          // Swipe left - dislike
          Animated.timing(this.position, {
            toValue: {
              x: -SCREEN_WIDTH - 200,
              y: gestureState.dy,
              duration: 0.5
            }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dy < -300) {
          // Swipe up - Superlike
          Animated.duration(this.position, {
            toValue: {
              y: -SCREEN_HEIGHT - 200,
              x: gestureState.dx,
              duration: 0.5
            }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
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
        .doc(currentUserID)
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

              return axios
                .get(
                  `https://us-central1-rescuemetest-4a629.cloudfunctions.net/getDogs?children=${hasChildren}&dogs=${hasDogs}&activityLevel=${activityLevel}&lat=${
                    coordinates[0]
                  }&lon=${coordinates[1]}&radius=${radiusPref}}`
                )
                .then(({ data }) =>
                  this.setState({ dogs: data.dogs, isLoading: false })
                );
            }
          );
        });
    });
  }

  navigate = (messageId, id, userName) => {
    this.storeToLikedList(this.currentDog);
    this.props.navigation.navigate("MessageThread", {
      messageId,
      id,
      userName
    });
  };

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
      console.log("<---- Inside our render");
      return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
          <View style={{ alignItems: "center", marginTop: hp("12") }}>
            {dogs
              .map((dog, i) => {
                if (i < currentIndex) {
                  return null;
                } else if (i == currentIndex) {
                  this.currentDog = dog;

                  console.log(
                    "<-------- Inside the else statement that returns the TOP card"
                  );
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
                    <View
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
                          fontFamily: "poppins-black"
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
                    </View>
                  );
                }
              })
              .reverse()}
          </View>
          <View>
            {console.log("THIS>>>>>>>>", this.currentDog)}
            <FooterSwipe
              swipeLeft={this.swipeLeft}
              swipeRight={this.swipeRight}
              superLike={this.superLike}
              dog={this.currentDog}
              id={this.state.currentUserID}
              name={this.props.user.name || this.props.user.d.firstName}
              navigate={this.navigate}
              storeToLikedList={this.storeToLikedList}
            />
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
