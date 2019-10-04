import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import { ActivityIndicator, View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";
import * as Font from "expo-font";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default class App extends React.Component {
  state = {
    fontsLoaded: false
  };

  componentDidMount() {
    Font.loadAsync({
      "poppins-black": require("./assets/fonts/Poppins-Black.ttf"),
      "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf")
    }).then(() => {
      this.setState({ fontsLoaded: true });
    });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View>
          <ActivityIndicator size="large" color="#e64664" />
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <StackNavigator />
        </Provider>
      );
    }
  }
}
