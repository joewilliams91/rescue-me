import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { View, Image, Alert, ActivityIndicator } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase/app';
import "firebase/storage"

export default class UploadComponent extends React.Component {
    state = {
        hasUploadPermission: false,
        uploading: false
    }

    render() {
        return (
            <View
                style={{ flexDirection: "row" }}>
                {this.state.uploading &&
                    <View
                    style={{ position: 'absolute', zIndex: 1000 }}>
                        <ActivityIndicator
                        color="black"
                        style={{ zIndex: 2000 }}
                        size="large" />
                        </View>
                }
                <View
                    style={{ margin: 15 }}>
                    <Icon
                        style={{ flex: 1 }}
                        size={50}
                        name="file-picture-o"
                        type="font-awesome"
                        color="white"
                        onPress={() => this.pickMedia("images")} />
                </View>

                {this.props.userType === 'centre' &&
                    <View
                        style={{ margin: 15 }}>
                        <Icon
                            style={{ flex: 1 }}
                            size={50}
                            name="folder-video"
                            type="entypo"
                            color="white"
                            onPress={() => this.pickMedia("videos")} /></View>

                }

            </View>

        )
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === 'granted') {
                this.setState({ hasUploadPermission: true })
            } else {
                alert('Permission required to upload photo')
            }
        }
    }


    pickMedia = mediaType => {
        if (Constants.platform.ios && !this.state.hasUploadPermission) {
            this.getPermissionAsync();
        }
        else {
            return ImagePicker.launchImageLibraryAsync({
                mediaTypes: mediaType === "images" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos
            }).then((result) => {
                if (!result.cancelled) {
                    this.setState({ uploading: true })
                    const uri = result.uri
                    return this.uriToBlob(uri)
                }
            })
                .then(blob => {
                    return this.uploadToFirebase(blob, `${mediaType}`)
                })
                .then(url => {
                    mediaType === "images" ?
                        this.props.addToPhotoArray(url) : this.props.addToVideoArray(url)
                    console.log(url);
                    console.log("File uploaded")
                })
                .then(() => {
                    this.setState({ uploading: false })
                    Alert.alert(
                        `${mediaType.slice(0, mediaType.length - 1)} uploaded`,
                        'Click OK to go back',
                        [
                            { text: 'OK', onPress: () => { } }
                        ]
                    )
                })
                .catch(error => {
                    throw error;
                })
        }
       
    };

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
                    // console.log(url)
                    blob.close();
                    resolve(url);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}