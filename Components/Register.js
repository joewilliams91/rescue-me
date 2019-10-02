import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { RadioButton } from 'react-native-paper';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../actions/user";

class Register extends React.Component {
  state = {
    firstName: "",
    surname: "",
    location: [],
    hasChildren: "",
    hasDogs: "",
    gender: "",
    sizePrefs: [],
    radius: 0,
    dob: "",
    hasDogOptions: [true, false],
    checked: 'first'
  };

  

  render() {
    return (
      <View>
        <Text>Hi there! Please enter your details.</Text>
        <TextInput
          placeholder="Your first name(s)"
          maxLength={20}
        />
        <TextInput
        //   style={styles.textInput}
          placeholder="Your surname"
          maxLength={20}
        />
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'first' }); }}
        />
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'second' }); }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);