import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Firebase, { db } from "../config/Firebase";
import HeaderMessagesInbox from "../Components/HeaderComponents/HeaderMessagesInbox";
import HeaderLikedList from "../Components/HeaderComponents/HeaderLikedList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
const usersCollection = db.collection("users");
const messagesCollection = db.collection("messages");

class LikedDogsList extends Component {
  state = {
    likedDogs: "",
    isLoading: true,
    id: ""
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

  createMessage = (centreId, centreName, dogName, dogId) => {
    const { id } = this.state;

    const name = this.props.user.name || this.props.user.d.firstName;

    try {
      const query = messagesCollection
        .where("centreId", "==", `${centreId}`)
        .where("user", "==", `${id}`);

      let querySnapshot = query.get().then(dataM => {
        if (dataM.empty) {
          const newMessage = messagesCollection.doc();
          newMessage
            .set({
              centreId: centreId,
              centreName: centreName,
              dogName: dogName,
              dogId: dogId,
              user: id,
              userName: name,
              messageId: newMessage.id
            })
            .then(() => {
              this.props.navigation.navigate("MessageThread", {
                messageId: newMessage.id,
                userName: name,
                id: id
              });
            });
        } else {
          dataM.forEach(doc => {
            this.props.navigation.navigate("MessageThread", {
              messageId: doc.id,
              id: id,
              userName: name
            });
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    const { id } = this.props.user;
    usersCollection
      .doc("CNZRmXLaILgwtkWyKu5tbHyV9OF3")
      .get()
      .then(user => {
        const { likedDogs } = user.data().d;
        let likedDogsList = [];

        for (let dog in likedDogs) {
          const list = {};
          list.dogId = likedDogs[dog].id;
          list.centreId = likedDogs[dog].centreId;
          list.image = likedDogs[dog].photos[0];
          list.name = likedDogs[dog].name;
          list.centreName = likedDogs[dog].centreName;

          likedDogsList.push(list);
        }

        this.setState({
          id: id,
          likedDogs: likedDogsList,
          isLoading: false
        });
      });
  }

  render() {
    const { likedDogs, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#f5f5f5"
          }}
        >
          <View
            style={{
              marginTop: hp("2"),
              alignItems: "center"
            }}
          >
            <View
              style={{
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#707070",
                  fontSize: 30,
                  fontFamily: "poppins-bold",
                  textAlign: "center"
                }}
              >
                Dogs you've liked
              </Text>

              <Text
                style={{
                  color: "#a3a3a3",
                  fontSize: 18,
                  lineHeight: 19,
                  fontFamily: "poppins-regular",
                  textAlign: "center",
                  padding: 20
                }}
              >
                Here's a list of all the dogs you're interested in. {"\n"}
                {"\n"}Have a look through, think carefully about about which
                pupper would suit best, when you're ready, make your approach!
              </Text>
            </View>

            <View style={styles.container}>
              {likedDogs.map(dog => {
                return (
                  <View key={dog.dogId}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("DogProfile", {
                          id: dog.dogId
                        });
                      }}
                    >
                      <Image
                        source={{ uri: dog.image }}
                        style={{
                          width: wp("42"),
                          height: hp("28"),
                          margin: wp("1"),
                          marginTop: hp("2"),
                          borderRadius: 10
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 15,
                        left: 10,
                        zIndex: 1000,
                        color: "white",
                        fontSize: 26,
                        fontFamily: "poppins-black"
                      }}
                      key={dog.dogId}
                    >
                      {dog.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.createMessage(
                          dog.centreId,
                          dog.centreName,
                          dog.name,
                          dog.dogId
                        );
                      }}
                    >
                      <Image
                        source={require("../assets/images/LikedMessage.png")}
                        style={{
                          width: 35,
                          height: 35,
                          position: "absolute",
                          bottom: 15,
                          right: 10,
                          zIndex: 1000
                        }}
                      />
                    </TouchableOpacity>
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
                textAlign: "center",
                marginTop: hp("2"),
                marginBottom: hp("3")
              }}
            ></Image>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("96"),
    padding: wp("2")
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(LikedDogsList);
