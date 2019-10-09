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
import Firebase, { db } from "../config/Firebase.js";
const { GeoFirestore } = require("geofirestore");
const geofirestore = new GeoFirestore(db);
const dogsCollection = geofirestore.collection("dogs");
import UpdatePhotoComponent from "./UpdatingComponents/UpdatePhotoComponent";
import ViewDescriptionComponent from "./UpdatingComponents/ViewDescriptionComponent";
import DetailsComponent from "./UpdatingComponents/DetailsComponent";

export default class RescueCentreDogProfile extends React.Component {
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
    const { id } = this.props.navigation.state.params;
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
          videos
        } = dog.data();

        this.setState({
          id,
          isLoading: false,
          photos,
          videos,
          description,
          goodWithChildren,
          goodWithOtherDogs,
          exerciseLevel
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
            console.log("Update successful");
          })
          .catch(console.log("Update unsuccessful"));
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
            console.log("Update successful");
          })
          .catch(console.log("Update unsuccessful"));
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
    const {id} = this.state
    this.setState({ [type]: updateDetail });
    const dogToUpdate = dogsCollection.doc(id);
    dogToUpdate
      .update({
        [type]: updateDetail
      })
      .then(() => {
        console.log("Update successful");
      })
      .catch(console.log("Update unsuccessful"));
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
      videos
    } = this.state;
    {
      return (
        <ScrollView>
          <UpdatePhotoComponent
            addToPhotoArray={this.addToPhotoArray}
            addToVideoArray={this.addToVideoArray}
            photos={photos}
            videos={videos}
          />
          <ViewDescriptionComponent
            changeDescription={this.changeDescription}
            description={description}
            editDescription={editDescription}
            toggleEdit={this.toggleEdit}
            updateDescription={this.updateDescription}
          />

          <DetailsComponent
            updateDetails={this.updateDetails}
            goodWithChildren={goodWithChildren}
            goodWithOtherDogs={goodWithOtherDogs}
            exerciseLevel={exerciseLevel}
            goodWithOptions={goodWithOptions}
            exerciseOptions={exerciseOptions}
          />
        </ScrollView>
      );
    }
  }
}