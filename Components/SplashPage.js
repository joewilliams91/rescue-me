import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { updateType, getUser } from "../actions/user";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { bindActionCreaters, bindActionCreators } from "redux";
import Firebase from "../config/Firebase";

class SplashPage extends Component {
  navigate = type => {
    this.props.updateType(type);
    this.props.navigation.navigate("Login");
  };
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#f8789a", "#845efd"]}
          start={[0.1, 1.5]}
          end={[1.2, 0.1]}
          style={styles.gradient}
        >
          <View
            style={{ alignItems: "center", width: wp("70"), height: hp("20") }}
          >
            <Image
              style={{
                height: 70,
                width: 200,
                marginBottom: hp("18"),
                marginTop: hp("18")
              }}
              source={require("../assets/images/logo/logo.png")}
            />
          </View>
          <View style={styles.textTitle}>
            <Text style={styles.heroMessage}>
              Power{"\n"}to{"\n"}the{"\n"}pooch
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={styles.welcomeMessage}>Who are you?</Text>

            <TouchableOpacity
              style={styles.buttonStyle}
              title="Budding rescuer"
              onPress={() => this.navigate("user")}
            >
              <Text style={styles.buttonText}>Dog Lover</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              title="centre"
              onPress={() => this.navigate("centre")}
            >
              <Text style={styles.buttonText}>Rescue Centre</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  gradient: {
    flex: 1,
    zIndex: -1000,
    alignSelf: "stretch",
    alignItems: "center"
  },
  textTitle: {
    marginTop: hp("15"),
    marginBottom: hp("10")
  },
  heroMessage: {
    color: "white",
    fontSize: 30,
    fontFamily: "poppins-bold"
  },
  welcomeMessage: {
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "poppins-bold",
    includeFontPadding: false,
    textAlign: "justify"
  },
  buttonStyle: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: hp("3"),
    borderRadius: 25,
    overflow: "hidden",
    padding: 8,
    textAlign: "center",
    width: wp("70")
  },
  buttonText: { color: "#707070", fontSize: 15, fontFamily: "poppins-semibold" }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateType, getUser }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashPage);
