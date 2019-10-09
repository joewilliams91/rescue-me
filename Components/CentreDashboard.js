import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class CentreDashboard extends Component {
  render() {
    return (
      <LinearGradient
        colors={["#f8789a", "#845efd"]}
        start={[0.1, 1.5]}
        end={[1.2, 0.1]}
        style={styles.gradient}
      >
        <View>
          <Image
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginTop: 100
            }}
            source={require("../assets/images/logo/rescueMe_logo_dog.png")}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("CentreDogsList");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontFamily: "poppins-semibold",
                marginBottom: 14
              }}
            >
              Your dog list
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("AddDog");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontFamily: "poppins-semibold",
                marginBottom: 14
              }}
            >
              Add Dog
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("InboxMessages");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontFamily: "poppins-semibold",
                marginBottom: 14
              }}
            >
              Inbox messages
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  heroMessage: {
    color: "white",
    fontSize: 30,
    fontFamily: "poppins-bold"
  },
  inputContainer: {
    flex: 1,
    marginTop: 150,
    marginBottom: 40,
    width: 300,
    justifyContent: "center"
  },
  inputBox: {
    alignItems: "center",
    color: "#fff",
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: "#c5c6ca",
    borderBottomWidth: 2,
    overflow: "hidden",
    padding: 12,
    fontSize: 14,
    textAlign: "left",
    alignSelf: "stretch",
    fontFamily: "poppins-regular"
  },
  signupContainer: {
    alignItems: "center",
    flex: 1,
    marginTop: 30
  },
  loginButton: {
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    padding: 9,
    textAlign: "center",
    width: 280
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "poppins-semibold"
  },
  signUpbutton: {
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 25,
    overflow: "hidden",
    padding: 9,
    textAlign: "center",
    width: 280
  },
  signUpbuttonText: {
    color: "#f8789a",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "poppins-semibold"
  },
  buttonSignup: {
    fontSize: 12
  }
});

export default CentreDashboard;
