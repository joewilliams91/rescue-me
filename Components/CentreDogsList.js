import React, { Component } from "react";
import firebase from "firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import HeaderMessagesInbox from "../Components/HeaderComponents/HeaderMessagesInbox";

const firestore = firebase.firestore();
const centresCollection = firestore.collection("centres");

class CentreDogsList extends Component {
  state = {
    availableDogs: "",
    isLoading: true
  };

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#f5f5f5",
      borderBottomWidth: 0,
      height: hp("10")
    },
    headerTintColor: "#6f6f6f",
    headerRight: <HeaderMessagesInbox />
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={[
            {
              height: hp("100"),
              width: wp("100"),
              backgroundColor: "#f5f5f5"
            }
          ]}
        >
          <View>
            <Text
              style={{
                color: "#747474",
                fontSize: 40,
                fontFamily: "poppins-semibold",
                marginBottom: hp("1"),
                marginTop: hp("1"),
                paddingBottom: 0,
                lineHeight: 42
              }}
            >
              Dashboard
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#747474",
                fontSize: 30,
                fontFamily: "poppins-semibold",
                textAlign: "center"
              }}
            >
              All {availableDogs.length} Dogs
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#00c066",
                marginTop: 20,
                marginBottom: 10,
                borderRadius: 15,
                overflow: "hidden",
                padding: 9,
                textAlign: "center",
                width: 280
              }}
              onPress={() => {
                this.props.navigation.navigate("AddDog");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 17,
                  fontFamily: "poppins-semibold"
                }}
              >
                Add Dog
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dogListContainer}>
            {availableDogs.map(dog => {
              return (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    this.props.navigation.navigate("RescueCentreDogProfile", {
                      id: dog.dogId
                    });
                  }}
                >
                  <Image source={{ uri: dog.image }} style={styles.image} />

                  <View style={{ width: wp("50") }}>
                    <Text
                      style={{
                        color: "#a3a3a3",
                        fontSize: 18,
                        lineHeight: 19,
                        fontFamily: "poppins-regular"
                      }}
                    >
                      {dog.name}
                    </Text>
                    <Text
                      style={{
                        color: "#a3a3a3",
                        fontSize: 18,
                        lineHeight: 19,
                        fontFamily: "poppins-regular"
                      }}
                    >
                      See Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <Image
              source={require("../assets/images/logo/rescueMeLogoSmol.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                margin: 10
              }}
            ></Image>
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
  dogListContainer: {
    width: wp("85"),
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: hp("2"),
    marginBottom: hp("1"),
    paddingTop: wp("1"),
    flexWrap: "nowrap"
  },
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
    padding: 10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});

export default CentreDogsList;
