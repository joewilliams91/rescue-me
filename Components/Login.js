import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Image
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
  updateName,
  updateLocation
} from "../actions/user";
import Firebase from "../config/Firebase";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#fff"
  };

  componentDidMount = () => {
    const { type } = this.props.user;
    Firebase.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.props.getUser(user.uid, type).then(user => {
          if (this.props.user.d) {
            const {
              coordinates,
              firstName,
              centreName,
              id
            } = this.props.user.d;
            const coords = [coordinates._lat, coordinates._long];
            this.props.updateName(firstName || centreName);
            this.props.updateLocation(coords);
            if (this.props.user.type === "user") {
              this.props.navigation.navigate("AddDog");
            } else if (this.props.user.type === "centre") {
              this.props.navigation.navigate("CentreDashboard");
            }
          }
        });
      }
    });
  };

  render() {
    return (
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
        <Text style={styles.heroMessage}>Hello!</Text>
        <View style={styles.inputContainer}>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontFamily: "poppins-semibold",
              textAlign: "center",
              marginBottom: 20
            }}
          >
            Sign In
          </Text>

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
            clearTextOnFocus={true}
            secureTextEntry={true}
          />
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.login()}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signupContainer}>
          <Text
            style={{
              color: "#fff",
              fontSize: 30,
              fontFamily: "poppins-semibold",
              marginBottom: 14
            }}
          >
            Newbie?
          </Text>
          <TouchableOpacity
            style={styles.signUpbutton}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpbuttonText}>SIGN UP</Text>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, updateName, updateLocation },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
