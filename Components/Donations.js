import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

const SCREEN_HEIGHT = Dimensions.get("window").height;

class Donations extends React.Component {
  state = {
    isLoading: true
  }

  finishLoading = () => {
    this.setState({ isLoading: false })
  }
 
  handleResponse = data => {
    if (data.title === 'cancel') {
      this.props.navigation.navigate("DogProfile")
    }
    else if (data.title === 'success') {
      Alert.alert(
        'Thanks for your donation!',
        'Click OK to return to dog profile',
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate("DogProfile")}
        ]
      )
    }
  }

  render() {
    const { isLoading } = this.state;
    const { amount, id } = this.props.navigation.state.params;
    return (
      <Modal
        onRequestClose={() => this.props.navigation.navigate("DogProfile")}
      >
        <WebView
          onLoadEnd = {() => this.finishLoading()}
          onNavigationStateChange={data =>
            this.handleResponse(data)}
          source={{
            uri: `https://us-central1-rescuemetest-4a629.cloudfunctions.net/pay?amount=${amount}&id=${id}`,
            method: 'POST'
          }}
        />
        {isLoading && <ActivityIndicator
            style={{ position: "absolute", top: SCREEN_HEIGHT / 2, alignSelf: 'center' }}
            size="large"
          />}
      </Modal>

    )
  }
}



const styles = StyleSheet.create({
  container: {}
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Donations);