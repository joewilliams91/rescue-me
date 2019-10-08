import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Firebase, { db } from "../config/Firebase";
// const firestore = firebase.firestore();

const messagesCollection = db.collection("messages");

class InboxMessages extends Component {
  state = {
    isLoading: true,
    chatRooms: ""
  };

  render() {
    const { isLoading, chatRooms } = this.state;
    if (chatRooms === "") {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <>
          {chatRooms.map(chatRoom => {
            return (
              <View>
                <Text>From:{chatRoom.userName}</Text>
                <Text>Regarding:{chatRoom.dogName}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("MessageThread", {messageId : chatRoom.messageId})}}>
                  <Text>Link to the chat room here</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </>
      );
    }
  }
  componentDidMount() {
    messagesCollection
      .where("user", "==", "L2QZactccSQ6b0TjdKurdWSBSHy2")
      .get()
      .then(dataM => {
        let chatsData = [];
        dataM.forEach(element => {
          return chatsData.push(element.data());
        });
        this.setState({ chatRooms: chatsData, isLoading: false }, () => {});
      });
  }
}

const styles = StyleSheet.create({
  container: {
    color: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default InboxMessages;
