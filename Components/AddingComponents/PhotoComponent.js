import React from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import * as firebase from "firebase/app";
import "firebase/storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class PhotoComponent extends React.Component {
  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    flashMode: Camera.Constants.FlashMode.off,
    uploading: false,
    recording: false
  };

  async componentDidMount() {

    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };

      xhr.responseType = "blob";

      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  uploadToFirebase = (blob, type) => {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();

      function uuid() {
        const chars = "0123456789abcdef".split("");
        let uuid = [],
          rnd = Math.random,
          r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        for (let i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (rnd() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r & 0xf];
          }
        }
        return uuid.join("");
      }

      const name = uuid();
      const folder = this.props.navigation.state.params.user;
      const file = type === "images" ? "jpg" : "mp4";
      console.log(file)
      const contentType = type === "images" ? "image/jpg" : "video/mp4";
      // console.log(contentType)
      const imageRef = firebase
        .storage()
        .ref(`${folder}`)
        .child(`${type}/${name}.${file}`);

      imageRef
        .put(blob, {
          contentType
        })
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then(url => {
          // console.log(url)
          blob.close();
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  handleCaptureIn() {
    this.setState({ capturing: true });
  }

  handleCaptureOut() {
    if (this.state.capturing) {
      this.camera.stopRecording();
      this.setState({ capturing: false, recording: false });
    }
  }

  async handleShortCapture() {
    const photoData = await this.camera
      .takePictureAsync()
      .then(photo => {
        this.setState({ uploading: true })
        const { height, width, type, uri } = photo;
        return this.uriToBlob(uri);
      })
      .then(blob => {
        return this.uploadToFirebase(blob, "images");
      })
      .then(url => {
        this.props.navigation.state.params.addToPhotoArray(url);
      })
      .then(() => {
        this.setState({ uploading: false })
        Alert.alert(
          'Photo uploaded',
          'Click OK to go back',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() }
          ]
        )
      })
      .catch(error => {
        throw error;
      });
  }

  async handleLongCapture() {
    this.setState({ recording: true })
    const options = {
      quality: Camera.Constants.VideoQuality["480p"]
    };
    const videoData = await this.camera
      .recordAsync(options)
      .then(photo => {
        this.setState({ uploading: true })
        const { height, width, type, uri } = photo;
        return this.uriToBlob(uri);
      })
      .then(blob => {
        return this.uploadToFirebase(blob, "videos");
      })
      .then(url => {
        this.props.navigation.state.params.addToVideoArray(url);
        console.log(url);
        console.log("File uploaded");
      })
      .then(() => {
        this.setState({ uploading: false })
        Alert.alert(
          'Video uploaded',
          'Click OK to go back',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() }
          ]
        )
      })
      .catch(error => {
        throw error;
      });
  }

  render() {
    const { hasCameraPermission, capturing, recording } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {this.state.uploading &&
            <View
              style={{ position: 'absolute', top: SCREEN_HEIGHT / 2 - 30, left: SCREEN_WIDTH / 2 - 10, zIndex: 1000 }}>
              <ActivityIndicator
                color="white"
                style={{ zIndex: 2000 }}
                size="large" />
            </View>
          }
          <Camera
            style={{ flex: 4 }}
            ref={ref => {
              this.camera = ref;
            }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 30,
                  left: 20
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Icon
                  size={40}
                  name="md-reverse-camera"
                  type="ionicon"
                  color="white"
                // style={{ alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "absolute", bottom: 25, left: SCREEN_WIDTH / 2 - SCREEN_WIDTH / 13 }}
                onPressIn={this.handleCaptureIn.bind(this)}
                onPressOut={this.handleCaptureOut.bind(this)}
                onLongPress={this.props.navigation.state.params.userType === "centre" ? this.handleLongCapture.bind(this) : () => { }}
                onPress={this.handleShortCapture.bind(this)}
              >
                <View
                style={{ width: 60, borderRadius: 30, height: 60, backgroundColor: recording ? "red": "#c6c6c6", opacity: 0.8, borderWidth: 3, borderColor: "white"}}>
                </View>
               
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
