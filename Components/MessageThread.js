import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import Firebase, { db } from "../config/Firebase";
import firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";
const messagesCollection = db.collection("messages");

class MessageThread extends Component {
  state = {
    messages: [],
    userId: ""
  };

  componentDidMount() {
    const {messageId} = this.props
    messagesCollection
      .doc(messageId)
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
    const {messageId} = this.props;
    for (let i = 0; i < messages.length; i++) {
      const { text, user, _id } = messages[i];
      const message = {
        key: _id.toString() + this.timeStamp().toString(),
        text: text,
        user: user,
        timestamp: this.timestamp()
      };
      messagesCollection
        .doc(messageId)
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
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: userId }}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(MessageThread)