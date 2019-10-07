import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateType } from "../actions/user";

class SplashPage extends Component {
  navigate = type => {
    console.log(type)
    this.props.updateType(type);
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <View>
          <Image
            style={{ width: 230, height: 90, marginBottom: 50, marginTop: 70 }}
            source={require("../images/logo/logo.png")}
          />
        </View>
        <View style={styles.textTitle}>
          <Text style={styles.textStyles}>Power</Text>
          <Text style={styles.textStyles}>to</Text>
          <Text style={styles.textStyles}>the</Text>
          <Text style={styles.textStyles}>pooch</Text>
        </View>

        <View>
          <Text style={styles.textStyles}>Hi, who are you?</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          value="user"
          title="Budding rescuer"
          onPress={() => {
            this.navigate("user");
          }}
        >
          <Text style={styles.button}>Budding rescuer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          value="centre"
          title="Budding rescuer"
          onPress={() => {
            this.navigate("centre");
          }}
        >
          <Text style={styles.button}>Rescue Centre</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6E0A83",
    flexDirection: "column"
  },
  textTitle: {
    marginBottom: 80
  },
  textStyles: {
    justifyContent: "center",
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    flexDirection: "column"
  },
  buttonStyle: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 25,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    width: 250
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateType }, dispatch);
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
