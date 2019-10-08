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
import Firebase, { db } from "../config/Firebase";
const usersCollection = db.collection("users");
const messagesCollection = db.collection("messages");

class LikedDogsList extends Component {
  state = {
    likedDogs: "",
    isLoading: true,
    id: ""
  };

  createMessage = (centreId, centreName, dogName, dogId) => {
    const { id } = this.state;
    const { name } = this.props.user;
    const newMessage = messagesCollection.doc()
    newMessage.set({
      centreId: centreId,
      centreName: centreName,
      dogName: dogName,
      dogId: dogId,
      user: id,
      userName: name
    }).then(() => {
      this.props.navigation.navigate("MessageThread", {
        messageId: newMessage
      })
    })
  };

  componentDidMount() {
    const { id } = this.props.user;
    console.log(this.props.user.id, "---userId")
    usersCollection
      .doc(id)
      .get()
      .then(user => {
        const {likedDogs} = user.data();
        console.log(likedDogs, "----")
        this.setState({
          id: id,
          likedDogs: likedDogs,
          isLoading: false
        });
      });
  }

  render() {
    const { likedDogs, isLoading } = this.state;
    const { navigate } = this.props.navigation;

    const entry = likedDogs
    let likedDogsList = [];
    
    for(let dog in likedDogs){
      const list = {}
      list.dogId = dog.id.replace(/ /g, "");
      list.centreId = dog.centreId;
      list.image = dog.image[0];
      list.name = dog.name;
      list.centreName = dog.centreName;

      likedDogsList.push(list)
    }

    console.log(likedDogsList)

    // const likedDogsList = dogs.map(dog => {
    //   const list = {};
    //   list.dogId = dog[0].replace(/ /g, "");
    //   list.centreId = dog[1].centreId;
    //   list.image = dog[1].image[0];
    //   list.name = dog[1].name;
    //   list.centreName = dog[1].centreName;
    //   return list;
    // });

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          {likedDogsList.map(dog => {
            return (
              <View style={styles.row}>
                <View style={styles.column}>
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
                        width: 160,
                        height: 160,
                        margin: 10,
                        padding: 10,
                        borderRadius: 10
                      }}
                    />
                  </TouchableOpacity>
                  <Text key={dog.dogId}> {dog.name}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.createMessage(
                        dog.centreId,
                        dog.centreName,
                        dog.dogName,
                        dog.dogId
                      );
                    }}
                  >
                    <Text>Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10
  },
  row: {
    flexDirection: "row",
    width: 190,
    alignItems: "center"
  },
  column: {
    flexDirection: "column"
  },
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

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(LikedDogsList);
