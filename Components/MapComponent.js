import {MapView} from "react-native-maps";
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

class MapComponent extends React.Component {
  render() {
    const { setLocation, location } = this.props;
    return (
      <View>
        <MapView
          style={{ alignSelf: "stretch", height: 400 }}
          region={location}
          onRegionChange={() => {
            setLocation([location.latitude, location.longitude]);
          }}
        />        
      </View>
    );
  }
}

export default MapComponent;
