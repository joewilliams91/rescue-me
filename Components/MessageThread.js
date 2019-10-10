import React, { Component } from "react";
import { StyleSheet, Platform, Text } from "react-native";
import { connect } from "react-redux";
import Firebase, { db } from "../config/Firebase";
import firebase from "firebase";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
import uuidv4 from "uuidv4";

const uuid = require("uuidv4").default;
const messagesCollection = db.collection("messages");

class MessageThread extends Component {
  state = {
    messages: [],
    userId: "",
    isLoading: true
  };

  componentDidMount() {
    const { messageId, id } = this.props.navigation.state.params;
    messagesCollection
      .doc(messageId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(this.onCollectionUpdate);
    this.setState({ userId: id, isLoading: false });
  }

  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      const { timestamp, user, text, _id } = doc.data();
      const timeStamp = new Date(timestamp.seconds * 1000);

      messages.push({
        _id: _id,
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
      const { text, user } = messages[i];

      const message = {
        text: text,
        user: user,
        timestamp: this.timestamp(),
        _id: uuidv4()
      };

      messagesCollection
        .doc(messageId.replace(/ /g, ""))
        .collection("messages")
        .add(message)
        .catch(error => {
          alert("Message could not be sent");
        });
    }
  };
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#f84d60",
            color: "#fff"
          },
          left: {
            backgroundColor: "#c6c6c6",
            color: "#fffff"
          }
        }}
        textStyle={{
          left: {
            color: "white"
          }
        }}
        timeStamp={{
          left: {
            color: "white"
          }
        }}
      />
    );
  };

  render() {
    const { messages, isLoading } = this.state;

    const props = this.props.navigation.state.params;
    const { id, userName } = this.props.navigation.state.params;

    if (isLoading) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <>
          <GiftedChat
            messages={messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: id,
              name: userName
            }}
            keyboardShouldPersistTaps="never"
            renderBubble={this.renderBubble}
          />
          {Platform.OS === "android" ? <KeyboardSpacer /> : null}
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(MessageThread);
