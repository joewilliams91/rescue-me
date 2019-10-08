import React, { Component } from "react";
<<<<<<< HEAD
import { StyleSheet } from "react-native";
=======
import { StyleSheet, Platform } from "react-native";
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
import { connect } from "react-redux";
import Firebase, { db } from "../config/Firebase";
import firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
const messagesCollection = db.collection("messages");

class MessageThread extends Component {
  state = {
    messages: [],
    userId: ""
  };

  componentDidMount() {
<<<<<<< HEAD
    const { id } = this.props.user;
    this.setState({ userId: id });
    const { messageId } = this.props.navigation.state.params;
    console.log(messageId, "----");
    messagesCollection
      .doc(messageId)
=======
    const userId = "L2QZactccSQ6b0TjdKurdWSBSHy2"; 
    this.setState({userId});
    const { messageId } = this.props.navigation.state.params;
    messagesCollection
      .doc(messageId.replace(/ /g, ""))
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      const { timestamp, user, text } = doc.data();
      const timeStamp = new Date(timestamp.seconds * 1000);

      messages.push({
        key: timestamp.seconds,
        _id: user._id,
        createdAt: timeStamp,
        text,
        user: user
      });
    });
    this.setState({ messages });
  };

  timestamp = () => {
    return firebase.firestore.Timestamp.fromDate(new Date());
  };

  onSend = (messages = []) => {
    const { messageId } = this.props.navigation.state.params;
    for (let i = 0; i < messages.length; i++) {
      const { text, user, _id } = messages[i];
      const message = {
        key: _id.toString() + this.timestamp().toString(),
        text: text,
        user: user,
        timestamp: this.timestamp()
      };
      messagesCollection
<<<<<<< HEAD
        .doc(messageId)
=======
        .doc(messageId.replace(/ /g, ""))
>>>>>>> b0ae1579a1ffc5847142d3897ec4961ada0892b5
        .collection("messages")
        .add(message)
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { messages, userId } = this.state;
    return (
      <>
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: userId }}
      />
      {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(MessageThread);
