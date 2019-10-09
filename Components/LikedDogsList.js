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

    const  name  = this.props.user.name || this.props.user.d.firstName

    try {
      const query = messagesCollection
        .where("centreId", "==", `${centreId}`)
        .where("user", "==", `${id}`);

      let querySnapshot =  query.get().then(dataM => {
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
         
      
    } catch(e) {
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
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>

          
          {likedDogs.map(dog => {
            

            return (
              <View style={styles.row} key={dog.dogId}>
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
                        dog.name,
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
