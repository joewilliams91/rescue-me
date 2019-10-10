import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Firebase, { db } from "../../config/Firebase";
const messagesCollection = db.collection("messages");

class FooterSwipe extends Component {
  superLike = () => {
    const { dog } = this.props;
    this.createMessage(dog.centreId, dog.centreName, dog.name, dog.id)
  };

  createMessage = (centreId, centreName, dogName, dogId) => {
    const { id } = this.props;
    
    const name = this.props.name;
    console.log("DATA", centreId, centreName, dogName, dogId, id, name);

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
               this.props.navigate(newMessage.id, id, name);
              
            });
        } else {
          dataM.forEach(doc => {
            this.props.navigate(doc.id, id, name);
          });
        }
      });
    } catch (e) {
      alert(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.swipeLeft()}>
          <Image
            source={require("./swipeLeftButton.png")}
            style={{
              width: 50,
              height: 50,
              alignSelf: "center",
              margin: 10
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.superLike()}>
          <Image
            source={require("./superLike.png")}
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
              paddingTop: 4,
              textAlign: "center",
              margin: 10
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.swipeRight()}>
          <Image
            source={require("./swipeRightButton.png")}
            style={{
              width: 50,
              height: 50,
              alignSelf: "center",
              textAlign: "center",
              margin: 10
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    width: wp("80")
  }
});

export default FooterSwipe;
