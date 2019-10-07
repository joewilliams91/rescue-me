import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

class Donations extends React.Component {
    render() {
      const { amount } = this.props.navigation.state.params;
        return (
          <WebView 
            source={{ uri: `https://us-central1-rescuemetest-4a629.cloudfunctions.net/pay?amount=${amount}`, 
            method: 'POST'
          }}
          />
        )
    }
}



const styles = StyleSheet.create({
    container: {}
  });
  
const mapStateToProps = state => ({ ...state });
  
export default connect(mapStateToProps)(Donations);