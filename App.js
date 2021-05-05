import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  LogBox
} from "react-native";
import {
  Container,
  Content,
  Root,
  View,
  Spinner,
  Header,
  Left,
  Body,
  Right,
  Title
} from "native-base";

import { ScreenNavigator } from "./navigations/ScreenNavigation";
import { firebaseConfig } from "./config";

import * as firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidlMount() {
    LogBox.ignoreAllLogs()
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    // const { loading } = this.state;

    // if (loading) {
    //   return <Spinner />;
    // }

    return (
      <Root>
        <View style={styles.container}>
          <ScreenNavigator />
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        // marginTop: StatusBar.currentHeight
      }
    })
  }
});
