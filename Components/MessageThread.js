import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  Animated,
  Dimensions,
  PanResponder,
  Button
} from "react-native";
import { connect } from "react-redux";
​
import Firebase, { db } from "../config/Firebase";
import firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";
const messagesCollection = db.collection("messages");
​
class MessageThread extends Component {
  state = {
    messages: [],
    userId: ""
  };
  componentDidMount() {
    console.log(this.props.user.id);
    messagesCollection
      .doc("l720KbX6Ojk2lvRKbTlx")
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(this.onCollectionUpdate);
  }
​
  componentDidUpdate(prevProps) {
    console.log(this.props)
    if (this.props.user !== prevProps.user) {
      this.setState({ userId: this.props.user.id });
    }
  }
​
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      const { timestamp, user, text } = doc.data();
      const {userId} = this.state
​
      const timeStamp = new Date(timestamp.seconds * 1000);
​
      messages.push({
        key: this.timestamp(),
        _id: userId,
        createdAt: timeStamp,
        text,
        user: user
      });
    });
    this.setState({ messages });
  };
​
  timestamp = () => {
    return firebase.firestore.Timestamp.fromDate(new Date());
  };
​
  onSend = (messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        key: this.timestamp(),
        _id: user._id,
        text: text,
        user: user,
        timestamp: this.timestamp()
      };
      messagesCollection
        .doc("l720KbX6Ojk2lvRKbTlx")
        .collection("messages")
        .add(message)
        .catch(error => {
          console.log("ERROR", error);
        });
    }
  };
​
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
​
const mapStateToProps = state => ({
  ...state
});
​
const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  }
});
export default connect(mapStateToProps)(MessageThread);