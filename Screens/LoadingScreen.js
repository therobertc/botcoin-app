import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  LogBox
} from "react-native";


import AsyncStorage from '@react-native-community/async-storage'


export default class LoadingScreen extends React.Component {
 

  checkIfLoggedIn = async() => {
    const user = await AsyncStorage.getItem('user')
    const parse = JSON.parse(user)
     if (parse != null) {
       console.log('logged In')
       this.props.navigation.navigate('HomeCoins')
       
     } else {
      console.log('need to login')

       this.props.navigation.navigate('Auth')
     }
  
 };

  componentDidMount() {
    LogBox.ignoreAllLogs()
    
    this.checkIfLoggedIn();
  }

  

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282c34",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});
