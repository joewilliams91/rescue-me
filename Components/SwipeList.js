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
  Button
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import HeaderHeart from "./HeaderComponents/HeaderHeart.js";
import HeaderGoBack from "./HeaderComponents/HeaderGoBack.js";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class SwipeList extends React.Component {
  state = {
    currentUser: null,
    dogs: [],
    isLoading: true,
    currentIndex: 0,
    dogId: null,
    user: {
      activityLevel: 5,
      coordinates: [53.4808, -2.2426],
      radiusPref: 30,
      hasChildren: "false",
      hasDogs: "true"
    }
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <HeaderHeart />,
      headerTitle: <HeaderHeart />,
      headerLeft: <HeaderGoBack />
    };
  };
  // componentDidMount() {

  // }

  componentDidUpdate() {
    console.log("didupdate");
  }

  dogID = null;
  // currentIndex = 0;
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
    outputRange: [1, 0, 0],
    extrapolate: "clamp"
  });

  componentDidMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
        console.log("pickedup");
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log("released");
        if (gestureState.dx > 120) {
          Animated.spring(
            this.position,
            {
              toValue: { x: SCREEN_WIDTH + 150, y: gestureState.dy }
            },
            console.log("<-- Touchy")
          ).start(() => {
            console.log("<-- Pooper - Dog ID"); // Swipe righty mctighty
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
      .then(({ data }) => this.setState({ dogs: data.dogs, isLoading: false }));
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
          <View style={{ flex: 2, alignItems: "center" }}>
            {dogs
              .map((dog, i) => {
                if (i < currentIndex) {
                  return null;
                } else if (i == currentIndex) {
                  this.dogID = dog.id;
                  console.log("Top Card");
                  return (
                    <Animated.View
                      {...this.PanResponder.panHandlers}
                      key={i}
                      style={[
                        this.rotateAndTranslate,

                        {
                          height: SCREEN_HEIGHT - 250,
                          width: SCREEN_WIDTH - 20,
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
                          bottom: 90,
                          left: 40,
                          zIndex: 1000,
                          color: "white",
                          fontSize: 40,
                          fontWeight: "800"
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
                    </Animated.View>
                  );
                } else {
                  return (
                    <Animated.View
                      key={i}
                      style={[
                        {
                          height: SCREEN_HEIGHT - 250,
                          width: SCREEN_WIDTH - 20,
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
                          bottom: 90,
                          left: 40,
                          color: "white",
                          fontSize: 40,
                          fontWeight: "800"
                        }}
                      >
                        {dog.name}
                      </Text>
                    </Animated.View>
                  );
                }
              })
              .reverse()}
          </View>
          <View style={{ height: 60 }}></View>
          <View>
            <Text>Footer must go here</Text>
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
  }
});

export default connect(mapStateToProps)(SwipeList);
