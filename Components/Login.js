import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { updateEmail, updatePassword, login } from "../actions/user";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: "#fff"
  };

  handleLogin = () => {
    this.props.login();
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <LinearGradient
        colors={["#f8789a", "#845efd"]}
        start={[0.1, 1.5]}
        end={[1.2, 0.1]}
        style={styles.gradient}
      >
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
              style={styles.loginButton}
              onPress={this.handleLogin}
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
  inputContainer: {
    flex: 1,
    marginTop: 150,
    marginBottom: 40,
    width: 300,
    justifyContent: "center"
  },
  inputBox: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    borderBottomColor: "#c5c6ca",
    borderBottomWidth: 2,
    overflow: "hidden",
    padding: 12,
    textAlign: "left",
    alignSelf: "stretch",
    fontFamily: "poppins-semibold"
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
    padding: 12,
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
    padding: 12,
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
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch);
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
