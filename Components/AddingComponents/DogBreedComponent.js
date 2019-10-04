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

const DogBreedComponent = props => {
  const { breed, updateDetails } = props;
  return (
    <View>
      <TextInput
        placeholder="Your dog's breed:"
        maxLength={20}
        onChangeText={text => updateDetails("breed", text)}
        value={breed}
      />
    </View>
  );
};

export default DogBreedComponent;