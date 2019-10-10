import React, { Component } from "react";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Firebase, { db } from "../config/Firebase";
import HeaderMessagesInbox from "../Components/HeaderComponents/HeaderMessagesInbox";
import HeaderLikedList from "../Components/HeaderComponents/HeaderLikedList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
// const firestore = firebase.firestore();

const messagesCollection = db.collection("messages");

class InboxMessages extends Component {
  state = {
    isLoading: true,
    chatRooms: ""
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#f5f5f5",
      borderBottomWidth: 0,
      height: hp("10")
    },
    headerTintColor: "#6f6f6f",
    headerRight: <HeaderMessagesInbox />,
    headerTitle: <HeaderLikedList />
  };

  render() {
    const { isLoading, chatRooms } = this.state;
    const { id } = this.props.user;
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.user.type === "centre"
                      ? this.props.navigation.navigate("UserProfile", {
                          id: chatRoom.user
                        })
                      : () => {};
                  }}
                >
                  <Text>
                    From:
                    {this.props.user.type === "user"
                      ? chatRoom.centreName
                      : chatRoom.userName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.user.type === "centre"
                      ? this.props.navigation.navigate(
                          "RescueCentreDogProfile",
                          {
                            id: chatRoom.dogId
                          }
                        )
                      : this.props.navigation.navigate("DogProfile", {
                          id: chatRoom.dogId
                        });
                  }}
                >
                  <Text>Regarding:{chatRoom.dogName}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("MessageThread", {
                      messageId: chatRoom.messageId,
                      userName: chatRoom.userName,
                      id: id
                    });
                  }}
                >
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
    const { id, type } = this.props.user;
    const userType = type === "user" ? "user" : "centreId";
    messagesCollection
      .where(`${userType}`, "==", `${id}`)
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(InboxMessages);
