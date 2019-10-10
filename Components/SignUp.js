import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../actions/user";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#fff"
  };

  handleSignUp = () => {
    const { type } = this.props.user;
    console.log(type);
    this.props.signup();
    if (type === "user") {
      this.props.navigation.navigate("Register");
    } else if (type === "centre") {
      this.props.navigation.navigate("CentreRegister");
    }
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
          <Image
            style={{
              width: 80,
              height: 80,
              marginBottom: 30,
              marginTop: 100
            }}
            source={require("../assets/images/logo/rescueMe_logo_dog.png")}
          />
          <Text style={styles.heroMessage}>
            Pop an email and password in below
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputBox}
              value={this.props.user.email}
              onChangeText={email => this.props.updateEmail(email)}
              placeholder="Email"
              placeholderTextColor={"#c5c6ca"}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputBox}
              value={this.props.user.password}
              onChangeText={password => this.props.updatePassword(password)}
              placeholder="Password"
              placeholderTextColor={"#c5c6ca"}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.signUpbutton}
              onPress={this.handleSignUp}
            >
              <Text style={styles.signUpbuttonText}>Next</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  heroMessage: {
    color: "white",
    padding: 30,
    fontSize: 30,
    fontFamily: "poppins-bold"
  },
  gradient: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
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
  inputContainer: {
    flex: 4,
    marginBottom: 40,
    width: 300,
    textAlign: "center",
    alignItems: "center"
  },

  signUpbutton: {
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 60,
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
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
