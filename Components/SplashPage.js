import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

class SplashPage extends Component {
  state = {
    user: "user",
    commpany: "company"
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
          <View>
            <Image
              style={{
                width: 230,
                height: 90,
                marginBottom: 80,
                marginTop: 160
              }}
              source={require("../assets/images/logo/logo.png")}
            />
          </View>
          <View style={styles.textTitle}>
            <Text style={styles.heroMessage}>Power</Text>
            <Text style={styles.heroMessage}>to</Text>
            <Text style={styles.heroMessage}>the</Text>
            <Text style={styles.heroMessage}>pooch</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.welcomeMessage}>Who are you?</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            title="Budding rescuer"
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Dog Lover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            value="company"
            title="Budding rescuer"
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Rescue Centre</Text>
          </TouchableOpacity>
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
    alignSelf: "stretch",
    alignItems: "center"
  },
  textTitle: {
    marginBottom: 80
  },
  heroMessage: {
    justifyContent: "center",
    marginTop: 1,
    paddingTop: 1,
    marginBottom: 1,
    paddingBottom: 1,
    color: "white",
    fontSize: 35,
    fontFamily: "poppins-bold"
  },
  welcomeMessage: {
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "poppins-bold",
    marginBottom: 20,
    includeFontPadding: false,
    textAlign: "justify",
    lineHeight: 20
  },
  buttonStyle: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    width: 250
  },
  buttonText: { color: "#707070", fontSize: 15, fontFamily: "poppins-semibold" }
});

export default SplashPage;
