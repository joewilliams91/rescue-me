import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from "react-native";
import { bindActionCreators } from "redux";

class CentreRegister extends React.Component {
    state = {
      userId: "",
        name = "",
        location: {
            latitude: 53.78825,
            longitude: -2.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
        telephone: "",
        description: ""
    }

    componentDidMount(){
      this.setState({userId: this.props.user.id})
    }

    updateName = (name) => {
      this.setState({name})
    }

    render() {
      const {userId, name} = this.state;
      <ScrollView>
      <Text>Hi there ${userId}! Please enter your details to register.</Text>
      <CentreNameComponent updateName={this.updateName} name={name}/>
      </ScrollView>
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
)(CentreRegister);