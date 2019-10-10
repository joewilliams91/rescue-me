import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const firestore = firebase.firestore();
const centresCollection = firestore.collection("centres");

class CentreDogsList extends Component {
  state = {
    availableDogs: "",
    isLoading: true
  };

  render() {
    const { availableDogs, isLoading } = this.state;

    if (isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{ backgroundColor: "#f5f5f5", flexDirection: "column" }}
        >
          <View>
            <Text
              style={{
                color: "black",
                fontSize: 30,
                fontFamily: "poppins-black",
                textAlign: "center"
              }}
            >
              Dashboard
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("AddDog");
                }}
              >
                <Image
                  style={{ width: 90, height: 61 }}
                  source={require("../assets/images/addDog.png")}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 23,
                  fontFamily: "poppins-black",
                  textAlign: "center"
                }}
              >
                All {availableDogs.length} Dogs
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("InboxMessages");
                }}
              >
                <Image
                  style={{ width: 52, height: 52 }}
                  source={require("../assets/images/chat.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.column}>
            {availableDogs.map(dog => {
              return (
                <View key={dog.dogId} style={styles.row}>
                  <View>
                    <Image source={{ uri: dog.image }} style={styles.image} />
                  </View>

                  <View style={styles.insideFieled}>
                    <Text> {dog.name}</Text>
                  </View>
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      title="Enter the link here"
                      onPress={() => {
                        this.props.navigation.navigate(
                          "RescueCentreDogProfile",
                          {
                            id: dog.dogId
                          }
                        );
                      }}
                    >
                      <Image
                        source={require("../assets/images/settings.png")}
                        style={{ width: 45, height: 45, marginTop: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  }

  componentDidMount() {
    //Database Centre ID
    centresCollection
      .doc("iJvJHm5NBdQdaSMwieRQfZbR9us2") // back to id
      .get()
      .then(centre => {
        const { availableDogs } = centre.data().d;
        let availableDogsList = [];

        for (let dog in availableDogs) {
          const list = {};
          list.dogId = availableDogs[dog].id;
          list.name = availableDogs[dog].name;
          list.image = availableDogs[dog].photos[0];

          availableDogsList.push(list);
        }
        this.setState({
          availableDogs: availableDogsList,
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
    backgroundColor: "white",
    flexDirection: "column",
    flexBasis: 150,
    margin: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.5
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 60
  }
});

export default CentreDogsList;
