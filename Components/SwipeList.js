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
  PanResponder
} from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import axios from "axios";
import HeaderApp from "./HeaderApp";

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
    },
    header: "swipeList"
  };
  // componentDidMount() {
    
  // }

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
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 150, y: gestureState.dy }
          })
          .start(() => {
            // this.currentIndex += 1;
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              console.log(this.dogID, "<-- Swiped Right - Dog ID"); // Swipe righty mctighty
            });
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 200, y: gestureState.dy }
          }).start(() => {
            // this.currentIndex += 1;
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              console.log(this.dogID, "<-- Swiped Left - Dog ID"); // Swipe left hefty
            });
          });
        } else if (gestureState.dy < -300) {
          Animated.spring(this.position, {
            toValue: { y: -SCREEN_HEIGHT - 200, x: gestureState.dx }
          }).start(() => {
            // this.currentIndex += 1;
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
              console.log(this.dogID, "<-- Superlike - Dog ID"); // swipe uppy super likey
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

  componentDidUpdate() {}

  render() {
    const { currentUser, dogs, isLoading, currentIndex, header } = this.state;
    if (isLoading) {
      console.log(Date.now())
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      console.log(Date.now())

      return (
        <View style={{ flex: 1 }}>
          <View style={{ height: 60 }}></View>
          <View>
            <HeaderApp header={header} />
          </View>
          <View style={{ flex: 1 }}>
            {dogs
              .map((dog, i) => {
                // console.log("mapping", i, "<---- i", this.currentIndex, "<---this.currentIndex")
                if (i < currentIndex) {
                  // console.log(Date.now())
                  return null;
                } else if (i == currentIndex) {
                  this.dogID = dog.id;
                  // console.log(Date.now())
                  return (
                    <Animated.View
                      {...this.PanResponder.panHandlers}
                      key={i}
                      style={[
                        this.rotateAndTranslate,

                        {
                          height: SCREEN_HEIGHT - 210,
                          width: SCREEN_WIDTH,
                          padding: 20,
                          paddingTop: 50,
                          position: "absolute"
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
                } else if (i === currentIndex + 1) {
                  // console.log(Date.now())
                  return (
                    <Animated.View
                      key={i}
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
                        source={{ uri: dog.photos[0] }}
                      />
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
                    </Animated.View>
                  );
                } else return null;
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default connect(mapStateToProps)(SwipeList);
