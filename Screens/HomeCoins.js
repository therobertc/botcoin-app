import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  LogBox,
  Alert,
  Dimensions
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
  CardItem,
  Right,
  Title
} from "native-base";
import { LineChart } from "react-native-svg-charts";

import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import base_url from './base_url'
import Coin from "../charts/Coin";

let all_notifications = []

export default class HomeCoins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      search: "",
      value: "",
      notifications_count:0,
      notifications:[],
      searched_data:{}
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


  


 

  search_coin = (value)=>{
    Axios.get(`https://cloud.iexapis.com/stable/stock/${value}/quote?token=pk_0db8d87dbdde49c5b215cd4ec559ed13&format=json`)
    .then(res=>{
       
         this.setState({searched_data:res.data})
         console.log(res.data)
      
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
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
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
              onChangeText={value => {
                this.setState({ value })
                this.search_coin(value)
              
              }}
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
                    want_to_search={false}

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
                    want_to_search={false}

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
                    want_to_search={false}

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
                    want_to_search={false}

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
                    want_to_search={false}
                  />
                </TouchableOpacity>
              </Content>
            </Container>
          ) : this.state.searched_data?(
           <TouchableOpacity style={{borderColor:'gray',width:Dimensions.get('window').width,borderWidth:.5,marginTop:20,padding:30,borderRadius:3,height:'47%'}}>
             <View style={{flexDirection: 'row'}}>
             
             <View style={{borderColor:'gray',borderWidth:1,backgroundColor:'gray',borderRadius:200,justifyContent:'center',alignItems: 'center',padding:8,width:60,height:60}}>
             <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{this.state.searched_data.symbol?this.state.searched_data.symbol.substring(0, 1):null}</Text>

             </View>
             
             <Text style={{color:'white',fontSize:20,left:10,top:10}}>{this.state.searched_data.symbol?this.state.searched_data.symbol:null}/USDT</Text>

             </View>
             <LineChart
            data={data}
            style={styles.chart}
            svg={{ stroke: '#FF00FF', strokeWidth: 3 }}
          />
             <View style={{flexDirection: 'row',marginTop:16,justifyContent: 'space-between'}}>
             <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>{this.state.searched_data.changePercent?this.state.searched_data.changePercent:0}%</Text>

             <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>${this.state.searched_data.latestPrice}</Text>
             </View>

             </TouchableOpacity>
          ):null}
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
  chart: {
    height: 75,
    marginTop:20,
    backgroundColor: "#282c34"
  },
  inputView: {
    marginHorizontal: 10
  }
});
