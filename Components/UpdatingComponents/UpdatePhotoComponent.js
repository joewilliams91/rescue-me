import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  Button
} from "react-native";
import { Video } from "expo-av";
import { Icon } from "react-native-elements";
import UploadComponent from "../AddingComponents/UploadComponent";
import { withNavigation } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
class UpdatePhotoComponent extends React.Component {
  state = {
    edit: false
  };

  toggleEdit = () => {
    this.setState(currentState => {
      const newEdit = !currentState.edit;
      return { ...currentState, edit: newEdit };
    });
  };

  render() {
    const {
      photos,
      videos,
      addToPhotoArray,
      addToVideoArray,
      centreId
    } = this.props;
    const { edit } = this.state;
    return (
      <View
        style={{
          width: wp("85")
        }}
      >
        <Text
          style={{
            color: "#a3a3a3",
            fontSize: 18,
            lineHeight: 19,
            fontFamily: "poppins-semibold",
            paddingLeft: wp("2")
          }}
        >
          Photos:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              width: wp("85"),
              flexDirection: "row",
              borderRadius: 15,
              backgroundColor: "white"
            }}
          >
            <ScrollView horizontal={true}>
              {photos &&
                photos.map(photo => {
                  return (
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        margin: 12
                      }}
                      source={{ uri: photo }}
                    />
                  );
                })}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            width: wp("85"),
            marginTop: hp("5")
          }}
        >
          <Text
            style={{
              color: "#a3a3a3",
              fontSize: 18,
              lineHeight: 19,
              fontFamily: "poppins-semibold",
              paddingLeft: wp("2")
            }}
          >
            Video:
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            <View
              style={{
                width: wp("85"),
                flexDirection: "row",
                borderRadius: 15,
                backgroundColor: "white"
              }}
            >
              <ScrollView horizontal={true}>
                {videos &&
                  videos.map(video => {
                    return (
                      <Video
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        useNativeControls
                        style={{
                          width: 250,
                          height: 160,
                          borderRadius: 15,
                          margin: 12
                        }}
                        source={{ uri: video }}
                      />
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: hp("4")
          }}
        >
          <Text
            style={{
              color: "#a3a3a3",
              fontSize: 18,
              lineHeight: 19,
              fontFamily: "poppins-semibold",
              paddingLeft: wp("2")
            }}
          >
            Upload new pictures or videos here!
          </Text>
          <View>
            <View style={{ margin: 15, flex: 1 }}>
              <TouchableOpacity
                style={{
                  alignSelf: "center"
                }}
                onPress={() =>
                  this.props.navigation.navigate("PhotoComponent", {
                    user: centreId,
                    userType: "centre",
                    addToPhotoArray,
                    addToVideoArray
                  })
                }
              >
                <Image
                  source={require("../../assets/images/takePicture.png")}
                />
              </TouchableOpacity>
              <UploadComponent
                userType="centre"
                addToVideoArray={addToVideoArray}
                addToPhotoArray={addToPhotoArray}
                user={centreId}
                style={{
                  flex: 1,
                  margin: 15,
                  alignSelf: "center"
                }}
              />
            </View>
          </View>
        </View>

        {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* {edit && (
          <PhotoComponent
            addToVideoArray={addToVideoArray}
            addToPhotoArray={addToPhotoArray}
          />
        )} */
        /* <TouchableOpacity
          style={styles.signMeUpbutton}
          onPress={this.toggleEdit}
        >
          <Text style={styles.signMeUpbuttonText}>
            {edit ? "Done" : "Add new media"}
          </Text>
        </TouchableOpacity> </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff"
  },
  value: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "poppins-regular",
    padding: 10,
    textAlign: "center"
  },
  inputText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "poppins-regular",
    flex: 1,
    flexWrap: "wrap",
    textAlignVertical: "top",
    padding: 10,
    textAlign: "center"
  },
  inputContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    width: 250,
    justifyContent: "center"
  },
  question: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "poppins-semibold"
  },
  guideMessage: {
    padding: 20,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontFamily: "poppins-regular"
  }
});

export default withNavigation(UpdatePhotoComponent);
