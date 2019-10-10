import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Firebase, { db } from "../config/Firebase.js";
import { connect } from "react-redux";
const { GeoFirestore } = require("geofirestore");
const geofirestore = new GeoFirestore(db);
const dogsCollection = geofirestore.collection("dogs");
const centreCollection = geofirestore.collection("centre");
import UpdatePhotoComponent from "./UpdatingComponents/UpdatePhotoComponent";
import ViewDescriptionComponent from "./UpdatingComponents/ViewDescriptionComponent";
import DetailsComponent from "./UpdatingComponents/DetailsComponent";

class RescueCentreDogProfile extends React.Component {
  state = {
    isLoading: true,
    id: "",
    photos: [],
    videos: [],
    description: "",
    goodWithChildren: "",
    exerciseLevel: "",
    goodWithOtherDogs: "",
    goodWithOptions: [
      { key: true, text: "True" },
      { key: false, text: "False" }
    ],
    exerciseOptions: [
      { key: 1, text: "1" },
      { key: 2, text: "2" },
      { key: 3, text: "3" },
      { key: 4, text: "4" },
      { key: 5, text: "5" }
    ]
  };

  componentDidMount() {
    // const { id } = this.props.navigation.state.params;
    const id = "DUS2SbN2Vd9SN5pxGxg2";

    dogsCollection
      .doc(id)
      .get()
      .then(dog => {
        const {
          photos,
          description,
          goodWithChildren,
          goodWithOtherDogs,
          exerciseLevel,
          videos,
          name
        } = dog.data();

        this.setState({
          id,
          isLoading: false,
          photos,
          videos,
          description,
          goodWithChildren,
          goodWithOtherDogs,
          exerciseLevel,
          name
        });
      });
  }

  addToPhotoArray = url => {
    this.setState(
      currentState => {
        const newPhotos = [...currentState.photos, url];
        const newState = { ...currentState, photos: newPhotos };
        return newState;
      },
      () => {
        const { photos, id } = this.state;

        const dogToUpdate = dogsCollection
          .doc(id)
          .update({
            photos: photos
          })
          .then(() => {
            alert("Update successful");
          })
          .catch(alert("Update unsuccessful"));
      }
    );
  };

  addToVideoArray = url => {
    this.setState(
      currentState => {
        const newVideos = [...currentState.videos, url];
        const newState = { ...currentState, videos: newVideos };
        return newState;
      },
      () => {
        const { videos, id } = this.state;

        const dogToUpdate = dogsCollection
          .doc(id)
          .update({
            videos: videos
          })
          .then(() => {
            alert("Update successful");
          })
          .catch(alert("Update unsuccessful"));
      }
    );
  };

  toggleEdit = () => {
    this.setState(currentState => {
      const newEditDescription = !currentState.editDescription;
      return { ...currentState, editDescription: newEditDescription };
    });
  };

  changeDescription = description => {
    this.setState({ description });
  };

  updateDescription = () => {
    const { description } = this.state;
    this.toggleEdit();
    this.updateDetails("description", description);
  };

  updateDetails = (type, updateDetail) => {
    const { id } = this.state;
    this.setState({ [type]: updateDetail });
    const dogToUpdate = dogsCollection.doc(id);
    dogToUpdate
      .update({
        [type]: updateDetail
      })
      .then(() => {
        alert("Update successful");
      })
      .catch(alert("Update unsuccessful"));
  };

  deleteDog = () => {
    const { id } = this.state;
    const centreId = this.props.user.id || this.props.user.d.id;
    const dogDelete = dogsCollection.doc(id).delete();

    const centre = centreCollection
      .doc(centreId)
      .get()
      .then(data => {
        const availableDogs = data.availableDogs;
        delete availableDogs[id];

        const centreToUpdate = centreCollection
          .doc(centreId)
          .update({
            availableDogs: availableDogs
          })
          .then(() => {
            alert("Delete successful");
            this.props.navigation.navigate("CentreDogsList");
          })
          .catch(alert("Delete unsuccessful"));
      });
  };

  render() {
    const {
      photos,
      description,
      goodWithChildren,
      goodWithOtherDogs,
      exerciseLevel,
      exerciseOptions,
      goodWithOptions,
      editDescription,
      videos,
      name
    } = this.state;
    {
      return (
        <ScrollView>
          <LinearGradient
            colors={["#f8789a", "#845efd"]}
            start={[0.1, 1.5]}
            end={[1.2, 0.1]}
            style={styles.gradient}
          >
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={this.deleteDog}
            >
              <Text style={styles.signMeUpbuttonText}>
                I have found a home !
              </Text>
            </TouchableOpacity>
            <Text style={styles.guideMessage}>{name} </Text>
            <UpdatePhotoComponent
              addToPhotoArray={this.addToPhotoArray}
              addToVideoArray={this.addToVideoArray}
              photos={photos}
              videos={videos}
              centreId={this.props.user.id}
            />
            <Text style={styles.guideMessage}>Description: </Text>
            <ViewDescriptionComponent
              changeDescription={this.changeDescription}
              description={description}
              editDescription={editDescription}
              toggleEdit={this.toggleEdit}
              updateDescription={this.updateDescription}
            />
            <Text style={styles.guideMessage}>Update details: </Text>
            <DetailsComponent
              updateDetails={this.updateDetails}
              goodWithChildren={goodWithChildren}
              goodWithOtherDogs={goodWithOtherDogs}
              exerciseLevel={exerciseLevel}
              goodWithOptions={goodWithOptions}
              exerciseOptions={exerciseOptions}
            />
          </LinearGradient>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
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
  },
  gradient: {
    flex: 1,
    zIndex: -1000,
    alignSelf: "stretch",
    alignItems: "center"
  },
  heroMessage: {
    color: "white",
    fontSize: 30,
    fontFamily: "poppins-bold"
  },
  guideMessage: {
    padding: 20,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "poppins-regular"
  },
  deleteButton: {
    backgroundColor: "white",
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 25,
    overflow: "hidden",
    padding: 9,
    textAlign: "center",
    width: 280
  },
  signMeUpbutton: {
    backgroundColor: "white",
    marginBottom: 100,
    borderRadius: 25,
    overflow: "hidden",
    padding: 9,
    textAlign: "center",
    width: 280
  },
  signMeUpbuttonText: {
    color: "#f8789a",
    textAlign: "center",
    fontSize: 17,
    fontFamily: "poppins-semibold"
  }
});
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(RescueCentreDogProfile);
