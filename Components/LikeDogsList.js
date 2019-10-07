import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
​
const firestore = firebase.firestore();
const usersCollection = firestore.collection("users");
​
class LikedDogsList extends Component {
  state = {
    likedDogs: "",
    isLoading: true
  };
​
  render() {
    const { likedDogs, isLoading } = this.state;
    const { navigate } = this.props.navigation;
​
    const entry = likedDogs;
    const dogs = Object.entries(entry);
​
    const likedDogsList = dogs.map(dog => {
      const list = {};
      list.dogId = dog[0].replace(/ /g, "");
      list.centreId = dog[1].centreId;
      list.image = dog[1].image[0];
      list.name = dog[1].name;
      return list;
    });
​
    console.log(likedDogsList);
​
    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
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
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  }
​
  componentDidMount() {
    // Database User Id <<<<<<<<
    usersCollection
      .doc("ohvb6aJhckdBNLCnCljIAsRmYDR2")
      .get()
      .then(user => {
        const userData = user.data();
        this.setState({ likedDogs: userData.likedDogs, isLoading: false });
      });
  }
}
​
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
  }
});
​
export default LikedDogsList;