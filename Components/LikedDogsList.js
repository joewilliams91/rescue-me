import React, { Component } from "react";
// import {getUsers} from 'axios';
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const firestore = firebase.firestore();
const usersCollection = firestore.collection("users");

class LikedDogsList extends Component {
  state = {
    likedDogs: "",
    isLoading: true
  };

  render() {
    const { likedDogs, isLoading } = this.state;
    const { navigate } = this.props.navigation;

    const entry = likedDogs;
    const dogs = Object.entries(entry);

    const likedDogsList = dogs.map(dog => {
      const list = {};
      list.dogId = dog[0].replace(/ /g, "")
      list.centreId = dog[1].centreId;
      list.image = dog[1].image[0];
      list.name = dog[1].name;
      return list;
    });

    console.log(likedDogsList);

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View>
          {likedDogsList.map(dog => {
            return (
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text key={dog.dogId}> {dog.name}</Text>

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Apply"
                    onPress={() => {
                     this.props.navigation.navigate(
                       "DogProfile",
                       {
                         id: dog.dogId
                       },
                       console.log("DOGID>>>>>>>>>>",dog.dogId)
                     );
                    }}
                  >
                    <Image
                      source={{ uri: dog.image }}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  }

  componentDidMount() {
    usersCollection
      .doc("ohvb6aJhckdBNLCnCljIAsRmYDR2")
      .get()
      .then(user => {
        const userData = user.data();
        this.setState({ likedDogs: userData.likedDogs, isLoading: false });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column"
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 150
  },
  column: {
    flexDirection: "column",
    flexBasis: 150,
    flex: 1
  }
});

export default LikedDogsList;
