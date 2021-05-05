import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  LogBox
} from "react-native";
import {
  Container,
  Content,
  Root,
  View,
  Spinner,
  Button,
  Header,
  Left,
  Body,
  Right,
  Title
} from "native-base";
import { Feather } from "@expo/vector-icons";

import Coin from "../charts/Coin";


export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  handleClick = () => {
    if (this.state.color === "green") {
      this.setState({ myColor: "blue" });
    } else {
      this.setState({ myColor: "green" });
    }
  };

  componentDidMount() {
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
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/botcoin.png")}
            style={{ width: 200, height: 40, alignSelf: "center" }}
          />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              textAlign: "center",
              margin: 50,
              color: "#FFF"
            }}
          >
            Accelerating the crypto economy with programmable money.
          </Text>
          <View style={{ justifyContent: "center", alignSelf: "center" }}>
            <Button
              onPress={() => this.props.navigation.navigate("SignUp")}
              style={{
                backgroundColor: "#ed6ac3",
                paddingHorizontal: 30
              }}
            >
             
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  textAlign: "center",
                  color: "#FFF",
                  paddingHorizontal: 10
                }}
              >
                Get Start
              </Text>
            </Button>

           
          </View>
          <TouchableOpacity style={{marginTop:30}} onPress={()=>this.props.navigation.navigate('Signin')}>
           <Text style={{fontSize:20,color:'white',textAlign:'center',fontWeight:'bold'}}>Already Have An Account</Text>
            </TouchableOpacity>
        </View>
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
