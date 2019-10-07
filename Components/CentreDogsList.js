import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const firestore = firebase.firestore();
const centresCollection = firestore.collection("centres");

class CentreDogsList extends Component {
  state = {
    availableDogs: "",
    isLoading: true
  };

  render() {
    const { availableDogs, isLoading } = this.state;
    const { navigate } = this.props.navigation;
     console.log(">>>>>>>>>>>>",availableDogs,"<<<<<<<");

    const entry = availableDogs;
    const dogs = Object.entries(entry)
    const dogsList = dogs.map(dog => {
      const list = {};
      list.dogId = dog[0].replace(/ /g, "");
      list.name = dog[1].name;
      list.image = dog[1].photos[0];
      return list;
    })

    console.log(dogsList);
    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View>
          {dogsList.map(dog => {
            return (
              <View style={styles.column}>
                <View style={styles.row}>
                  <Image source={{ uri: dog.image }} style={styles.image} />
                  <View style={styles.insideFieled}>
                    <Text key={dog.dogId}> {dog.name}</Text>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      title="Enter the link here"
                      onPress={() => {
                        this.props.navigation.navigate("Enter the link here", {
                          id: dog.dogId
                        });
                      }}
                    >
                      <Text>Insert a settings icon here</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      );
    }
  }

  componentDidMount() {
    //Database Centre ID
    centresCollection
      .doc("iJvJHm5NBdQdaSMwieRQfZbR9us2")
      .get()
      .then(centre => {
        const centreData = centre.data();
        
        this.setState({
          availableDogs: centreData.d.availableDogs,
          isLoading: false
        });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  column: {
    flexDirection: "column",
    flexBasis: 150,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
    width: 150
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  buttonStyle: {
    backgroundColor: "white",
    alignItems: "center",
    width: 250
  }
});


export default CentreDogsList;
