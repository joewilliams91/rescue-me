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
import { Icon } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import Firebase, { db } from "../config/Firebase.js";
import firebase from "firebase";
const { GeoFirestore } = require("geofirestore");
import DogNameComponent from "./AddingComponents/DogNameComponent";
import DogBreedComponent from "./AddingComponents/DogBreedComponent";
import DescriptionComponent from "./AddingComponents/DescriptionComponent";
import DOBComponent from "./AddingComponents/DOBComponent";
import GenderComponent from "./AddingComponents/GenderComponent";
import ExerciseLevelComponent from "./AddingComponents/ExerciseLevelComponent";
import GoodWithDogsComponent from "./AddingComponents/GoodWithDogsComponent";
import GoodWithChildrenComponent from "./AddingComponents/GoodWithChildrenComponent";
import SizeComponent from "./AddingComponents/SizeComponent";
import PhotoComponent from "./AddingComponents/PhotoComponent";
import UploadComponent from "./AddingComponents/UploadComponent";
class AddDog extends React.Component {
  state = {
    centreId: "",
    breed: "",
    name: "",
    description: "",
    dob: "",
    exerciseLevel: "",
    gender: "",
    goodWithChildren: "",
    goodWithOtherDogs: "",
    photos: [],
    videos: [],
    size: "",
    goodWithOptions: [
      { key: true, text: "True" },
      { key: false, text: "False" }
    ],
    genderOptions: [
      { key: "Male", text: "Male" },
      { key: "Female", text: "Female" }
    ],
    sizeOptions: [
      { key: 1, text: "Small" },
      { key: 2, text: "Medium" },
      { key: 3, text: "Large" }
    ],
    exerciseOptions: [
      { key: 1, text: "1" },
      { key: 2, text: "2" },
      { key: 3, text: "3" },
      { key: 4, text: "4" },
      { key: 5, text: "5" }
    ]
  };
  updateDetails = (type, text) => {
    this.setState({ [type]: text });
  };
  addToPhotoArray = url => {
    this.setState(currentState => {
      const newPhotos = [...currentState.photos, url];
      const newState = { ...currentState, photos: newPhotos };
      return newState;
    });
  };
  addToVideoArray = url => {
    this.setState(currentState => {
      const newVideos = [...currentState.videos, url];
      const newState = { ...currentState, videos: newVideos };
      return newState;
    });
  };
  componentDidMount() {
    console.log(this.props.user.type)
    this.setState({
      centreId: this.props.user.id,
      userType: this.props.user.type,
      coordinates: this.props.user.coordinates
    });
  }
  handleAdd = () => {
    const {
      centreId,
      coordinates,
      breed,
      name,
      description,
      dob,
      exerciseLevel,
      gender,
      goodWithChildren,
      goodWithOtherDogs,
      photos,
      videos,
      size
    } = this.state;

    const parts = dob.split("-");
    const newDob = firebase.firestore.Timestamp.fromDate(
      new Date(+parts[2], +parts[1] - 1, +parts[0])
    );
    const geofirestore = new GeoFirestore(db);
    const dogsCollection = geofirestore.collection("dogs");
    const centreDoc = geofirestore.collection("centres").doc(centreId);
    const newDog = dogsCollection.doc();
    const newDogId = newDog.id;
    const centreName = this.props.user.name || this.props.user.d.name;
    centreDoc.update({ ["availableDogs." + newDogId]: { name, photos, id: newDogId } });
    newDog.set({
      coordinates: new firebase.firestore.GeoPoint(
        coordinates[0],
        coordinates[1]
      ),
      name: name,
      centreName: centreName,
      description: description,
      exerciseLevel: exerciseLevel,
      goodWithChildren: goodWithChildren,
      goodWithOtherDogs: goodWithOtherDogs,
      dob: newDob,
      gender: gender,
      centreId: centreId,
      size: size,
      breed: breed,
      photos: photos,
      videos: videos,
      id: newDog.id
    });
  };
  render() {
    const {
      centreId,
      genderOptions,
      name,
      gender,
      dob,
      exerciseLevel,
      breed,
      description,
      goodWithOptions,
      goodWithChildren,
      goodWithOtherDogs,
      sizeOptions,
      exerciseOptions,
      userType,
      size
    } = this.state;
    return (
      <ScrollView>
        <LinearGradient
          colors={["#f8789a", "#845efd"]}
          start={[0.1, 1.5]}
          end={[1.2, 0.1]}
          style={styles.gradient}
        >
          <View>
            <Text>
              Hi there ${centreId}! Please enter some information about your
              dog.
            </Text>
          </View>
          <Text style={styles.guideMessage}>
           Let's add a dog.
          </Text>
          <DogNameComponent name={name} updateDetails={this.updateDetails} />
          <Text style={styles.guideMessage}>
           From Alsatians to Zuchons, we look after all dogs.
          </Text>
          <DogBreedComponent breed={breed} updateDetails={this.updateDetails} />
          <Text style={styles.guideMessage}>
            When was your dog born? Try to be as accurate as possible, but don't worry if you don't know.
          </Text>
          <DOBComponent updateDetails={this.updateDetails} dob={dob} />
          <Text style={styles.guideMessage}>
            How would you describe your dog? Be creative and precise here; a good bio can win hearts.
          </Text>
          <DescriptionComponent
            description={description}
            updateDetails={this.updateDetails}
          />    
          <Text style={styles.guideMessage}>
            Woof woof! We need a pooch portrait please.
          </Text>     
          <View
          style={{ flexDirection: 'row' }}
          >
            <View 
            style={{ margin: 15 }}>
            <Icon 
          size={50}
          style={{ flex: 1 }}
          name="camera"
          type="font-awesome"
          color="white"
          onPress={() => this.props.navigation.navigate("PhotoComponent", {
            user: centreId,
            userType,
            addToPhotoArray: this.addToPhotoArray,
            addToVideoArray: this.addToVideoArray
          })}
          />
            </View>
         
          <UploadComponent
          userType={userType}
          addToVideoArray={this.addToVideoArray}
          addToPhotoArray={this.addToPhotoArray}
          user={centreId}
          style={{ flex: 1, margin: 15 }} />
          </View>
          <Text style={styles.guideMessage}>
            Some users might be looking for a specific gender.
          </Text>
          <GenderComponent
            options={genderOptions}
            gender={gender}
            updateDetails={this.updateDetails}
          />
          <Text style={styles.guideMessage}>
            Dogs come in all shapes and sizes, and some just aren't what our users are looking for.
          </Text>
          <SizeComponent
            options={sizeOptions}
            size={size}
            updateDetails={this.updateDetails}
          />
          <Text style={styles.guideMessage}>
            Some people work full time, while others might enjoy a challenge. Please help us to match users with dogs they can handle.
          </Text>
          <ExerciseLevelComponent
            options={exerciseOptions}
            exerciseLevel={exerciseLevel}
            updateDetails={this.updateDetails}
          />
          <Text style={styles.guideMessage}>
            Not all dogs are equal, some need a bit more patience before they're
            ready to hang out with other dogs.
          </Text>
          <GoodWithDogsComponent
            options={goodWithOptions}
            goodWithOtherDogs={goodWithOtherDogs}
            updateDetails={this.updateDetails}
          />
          <Text style={styles.guideMessage}>
            Some doggo's find kids a bit too much.
          </Text>
          <GoodWithChildrenComponent
            options={goodWithOptions}
            goodWithChildren={goodWithChildren}
            updateDetails={this.updateDetails}
          />
          
          
          <TouchableOpacity style={styles.signMeUpbutton} onPress={this.handleAdd}>
            <Text style={styles.signMeUpbuttonText}>Add dog!</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    );
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
const mapStateToProps = state => ({
  ...state
});
export default connect(mapStateToProps)(AddDog);
