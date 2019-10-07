import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class PhotoComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
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

  uploadToFirebase = blob => {
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
      const imageRef = firebase.storage().ref(`${folder}`).child(`images/${name}.jpg`);

      imageRef.put(blob, {
          contentType: "image/jpeg"
        })
        .then(() => {
          return imageRef.getDownloadURL()
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

  async snapPhoto() {
    console.log("Button Pressed");
    if (this.camera) {
      console.log("Taking photo");
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true
      };
      await this.camera
        .takePictureAsync(options)
        .then(photo => {
          const { height, width, type, uri } = photo;
          return this.uriToBlob(uri);
        })
        .then(blob => {
          return this.uploadToFirebase(blob);
        })
        .then(url => {
          this.props.addToPhotoArray(url)
        })
        .catch(error => {
          throw error;
        });
    }
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
            style={{ flex: 1 }}
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
              <TouchableOpacity onPress={this.snapPhoto.bind(this)}>
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
