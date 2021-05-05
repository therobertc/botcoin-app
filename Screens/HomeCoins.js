import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
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
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import base_url from './base_url'
import Coin from "../charts/Coin";

export default class HomeCoins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      search: "",
      value: "",
      notifications_count:0
    };
  }

  get_notification_count = async()=>{
  const user = await AsyncStorage.getItem('user')
  const parse = JSON.parse(user)

  Axios.get(base_url+'get_notifications?my_id='+parse.user_id)
  .then(res=>{
   this.setState({notifications_count:res.data.notifications_count})
  })
  }

  seen_all_notifications = async()=>{
    const user = await AsyncStorage.getItem('user')
    const parse = JSON.parse(user)

    Axios.get(base_url+'seen_all_notifications?my_id='+parse.user_id)
    .then(res=>{
      console.log(res.data.msg)
    })
  }

  componentDidMount() {
    LogBox.ignoreAllLogs()
    this.get_notification_count()
    this.props.navigation.addListener('focus',()=>{
      this.get_notification_count()
    })
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  renderElement() {
    if (
      this.state.value === "BTC/USDT" ||
      this.state.value === "BTC" ||
      this.state.value === "B"
    )
      return (
        <TouchableOpacity>
          <Coin rank="#1" baseAsset="btc" quoteAsset="usdt" interval="30m" />
        </TouchableOpacity>
      );
    else if (
      this.state.value === "ETH" ||
      this.state.value === "ETS/USDT" ||
      this.state.value === "E"
    )
      return (
        <TouchableOpacity>
          <Coin rank="#2" baseAsset="eth" quoteAsset="usdt" interval="30m" />
        </TouchableOpacity>
      );
    else if (
      this.state.value === "DOGE" ||
      this.state.value === "DOGE/USDT" ||
      this.state.value === "D"
    )
      return (
        <TouchableOpacity>
          <Coin rank="#3" baseAsset="doge" quoteAsset="usdt" interval="30m" />
        </TouchableOpacity>
      );
    else if (
      this.state.value === "LINK" ||
      this.state.value === "LINK/USDT" ||
      this.state.value === "LI"
    )
      return (
        <TouchableOpacity>
          <Coin rank="#4" baseAsset="link" quoteAsset="usdt" interval="30m" />
        </TouchableOpacity>
      );
    else if (
      this.state.value === "LTC" ||
      this.state.value === "LTC/USDT" ||
      this.state.value === "LT"
    )
      return (
        <TouchableOpacity>
          <Coin rank="#5" baseAsset="ltc" quoteAsset="usdt" interval="30m" />
        </TouchableOpacity>
      );

    return null;
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Root>
        <View style={styles.container}>
          <Header style={{ backgroundColor: "#282c34" }}>
            <Left>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting')}>
              <Feather
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                  paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                  fontSize: 30
                }}
                name="settings"
              />
              </TouchableOpacity>
            </Left>
            <Body>
              <Image
                source={require("../assets/botcoin.png")}
                style={{ width: 200, height: 40 }}
              />
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Chat")}
               
              >
                <Feather
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    fontSize: 30
                  }}
                  name="users"
                />
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() =>{ 
                  this.seen_all_notifications()
                  this.props.navigation.navigate("Alerts")
                
                }}
              >
                <Feather
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
                    fontSize: 30
                  }}
                  name="bell"
                />
              </TouchableOpacity>

              {this.state.notifications_count>0?<View style={{borderWidth:1,borderColor:'#ed6ac3',backgroundColor:'#ed6ac3',borderRadius:100,justifyContent:'center',alignItems: 'center',position:'relative',right:15,top:5}}>
              <Text>{this.state.notifications_count}</Text>
              </View>:null}

            </Right>
          </Header>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputStyle}
              placeholderTextColor="grey"
              placeholder="Search crypto"
              // value={email}
              onChangeText={value => this.setState({ value })}
            />
          </View>
          {this.state.value === "" ? (
            <Container style={{ backgroundColor: "#282c34" }}>
              <Content>
                {/* <View>
                <Image
                  source={require("/Users/robjcalderon/react-native-crypto-tracker/assets/botcoin.png")}
                  style={{ width: 200, height: 40 }}
                />
              </View> */}

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Swap")}
                >
                  <Coin
                    rank="#1"
                    baseAsset="btc"
                    quoteAsset="usdt"
                    interval="30m"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Swap")}
                >
                  <Coin
                    rank="#2"
                    baseAsset="eth"
                    quoteAsset="usdt"
                    interval="30m"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Swap")}
                >
                  <Coin
                    rank="#3"
                    baseAsset="doge"
                    quoteAsset="usdt"
                    interval="30m"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Swap")}
                >
                  <Coin
                    rank="#4"
                    baseAsset="link"
                    quoteAsset="usdt"
                    interval="30m"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Swap")}
                >
                  <Coin
                    rank="#5"
                    baseAsset="ltc"
                    quoteAsset="usdt"
                    interval="30m"
                  />
                </TouchableOpacity>
              </Content>
            </Container>
          ) : (
            <View>{this.renderElement()}</View>
          )}
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282c34",
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  inputStyle: {
    width: "100%",
    //marginBottom: 15,
    //paddingBottom: 15,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 20,
    fontSize: 20,
    marginVertical: 10,
    // placeholderTextColor: "#FFF",
    // backgroundColor: "#282c34",
    backgroundColor: "#383c4a",
    color: "#FFF",
    height: 50
  },
  inputView: {
    marginHorizontal: 10
  }
});
