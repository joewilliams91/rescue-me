import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { withNavigation} from 'react-navigation';
import { View, Image, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase/app';
import "firebase/storage"

export default class UploadComponent extends React.Component {
    state = {
        image: null
    }

    render() {
        let { image } = this.state;
        return (
            <View>
                <Icon
                    size={50}
                    name="upload"
                    type="antdesign"
                    color="white"
                    onPress={this.pickImage} />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

        )
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Permission required to upload photo')
            }
        }
    }

    pickImage =  () => {
        return ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).then((result) => {
            if (!result.cancelled) {
                const uri = result.uri
                return this.uriToBlob(uri)
            }
        })
            .then(blob => {
                return this.uploadToFirebase(blob, "images")
            })
            .then(url => {
                this.props.addToPhotoArray(url);
                console.log(url);
                console.log("File uploaded")
            })
            .then(()=> {
                Alert.alert(
                  'Photo uploaded',
                  'Click OK to go back',
                  [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()}
                  ]
                )
              })
            .catch(error => {
                throw error;
            })
    };

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
            const file = "jpg";
            const contentType = "image/jpg";

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