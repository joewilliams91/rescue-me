import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
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
    headerTransparent: true,
    headerTintColor: "#6f6f6f",
    headerRight: <HeaderMessagesInbox />,
    headerTitle: <HeaderLikedList />
  };

  createMessage = (centreId, centreName, dogName, dogId, avatar) => {
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
              avatar: avatar,
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
      .doc(id) 
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
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
          <Text>Loading...</Text>
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
              marginTop: hp("12"),
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
                  color: "black",
                  fontSize: 30,
                  fontFamily: "poppins-black",
                  textAlign: "center"
                }}
              >
                Dogs you've liked
              </Text>
              <View>
                <Text
                  style={{
                    color: "#c6c6c6",
                    fontSize: 12,
                    fontFamily: "poppins-black",
                    textAlign: "center"
                  }}
                >
                  Here's a list of all the dogs you're interested in. {"\n"}{" "}
                  Have a look through, think carefully about about which pupper
                  would suit best, {"\n"}when you're ready, make your approach!
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              {likedDogs.map(dog => {
                return (
                  <View
                    key={dog.dogId}
                    style={{
                      alignItems: "center"
                    }}
                  >
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
                          width: 155,
                          height: 180,
                          margin: 10,
                          padding: 10,
                          borderRadius: 10
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        alignItems: "center"
                      }}
                      
                      key={dog.dogId}
                    >
                      {" "}
                      {dog.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.createMessage(
                          dog.centreId,
                          dog.centreName,
                          dog.name,
                          dog.dogId,
                          dog.image
                        );
                      }}
                    >
                      <Image
                        source={require("../assets/images/envelope.png")}
                        style={{ width: 35, height: 30, marginTop: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
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
    paddingTop: 8
  }
});

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(LikedDogsList);
