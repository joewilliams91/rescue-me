import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class PhotoComponent extends React.Component {
  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
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

      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function() {
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
      const folder = this.props.user;
      const file = type === "images" ? "jpg" : "mp4";
      const contentType = type === "images" ? "image/jpg" : "video/mp4";
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
      this.setState({ capturing: false });
    }
  }

  async handleShortCapture() {
    const photoData = await this.camera
      .takePictureAsync()
      .then(photo => {
        const { height, width, type, uri } = photo;
        return this.uriToBlob(uri);
      })
      .then(blob => {
        return this.uploadToFirebase(blob, "images");
      })
      .then(url => {
        this.props.addToPhotoArray(url);
        console.log(url);
        console.log("File uploaded");
      })
      .catch(error => {
        throw error;
      });
  }

  async handleLongCapture() {
    const options = {
      quality: Camera.Constants.VideoQuality["480p"]
    };
    const videoData = await this.camera
      .recordAsync(options)
      .then(photo => {
        const { height, width, type, uri } = photo;
        return this.uriToBlob(uri);
      })
      .then(blob => {
        return this.uploadToFirebase(blob, "videos");
      })
      .then(url => {
        this.props.addToVideoArray(url);
        console.log(url);
        console.log("File uploaded");
      })
      .catch(error => {
        throw error;
      });
    }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 4, width: 350, height: 450, marginBottom: 80 }}
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
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
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
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPressIn={this.handleCaptureIn.bind(this)}
                onPressOut={this.handleCaptureOut.bind(this)}
                onLongPress={this.handleLongCapture.bind(this)}
                onPress={this.handleShortCapture.bind(this)}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Snap{" "}
                </Text>
              </TouchableOpacity>
             </View>
          </Camera>
        </View>
      );
    }
  }
}
