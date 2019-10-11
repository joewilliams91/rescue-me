import React, { Component } from "react";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
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
      height: hp("10"),
      width: wp("100")
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
        <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{ backgroundColor: "#f5f5f5", flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.headerMessage}>Messages</Text>
            <View style={styles.messagesContainer}>
              {chatRooms.map(chatRoom => {
                return (
                  <View
                    style={styles.messageContainer}
                    key={chatRoom.messageId}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("MessageThread", {
                          messageId: chatRoom.messageId,
                          userName: chatRoom.userName,
                          id: id,
                          avatar: chatRoom.avatar,
                          centreName: chatRoom.centreName
                        });
                      }}
                    >
                      <Image
                        source={{ uri: chatRoom.avatar }}
                        style={styles.avatarImg}
                      />
                    </TouchableOpacity>
                    <View style={styles.messageInfo}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.user.type === "centre"
                            ? this.props.navigation.navigate("UserProfile", {
                                id: chatRoom.user
                              })
                            : () => {};
                        }}
                      >
                        <Text style={styles.messageFrom}>
                          From:{" "}
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
                        <Text style={styles.messageFrom}>
                          See {chatRoom.dogName}
                          {"'s Profile"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View>
            <Image
              source={require("../assets/images/logo/rescueMeLogoSmol.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                marginTop: hp("2"),
                marginBottom: hp("3")
              }}
            ></Image>
          </View>
        </ScrollView>
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
  messagesContainer: {
    width: wp("90"),
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: hp("1"),
    paddingTop: wp("1"),
    flexWrap: "nowrap"
  },
  messageContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  avatarImg: {
    width: 66,
    height: 66,
    borderRadius: 33,
    margin: 10
  },
  messageInfo: { paddingTop: wp("6") },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  messageFrom: {
    color: "#a3a3a3",
    fontSize: 18,
    lineHeight: 19,
    fontFamily: "poppins-regular"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  headerMessage: {
    color: "#747474",
    fontSize: 40,
    fontFamily: "poppins-semibold",
    marginBottom: hp("1"),
    marginTop: hp("1"),
    paddingBottom: 0,
    lineHeight: 42
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(InboxMessages);
