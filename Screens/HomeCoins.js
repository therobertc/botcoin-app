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
  Dimensions,
  FlatList,
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


import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import base_url from './base_url'
import Coin from "../charts/Coin";



export default class HomeCoins extends React.Component {
  

  state = {
    loading: true,
    
    search_bar: "",
    notifications_count:0,
    notifications:[],
    all_coins:[],
    search_coins:[]
   
   
  };



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


  
get_all_coins = async()=>{
await Axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=60c07164-25a2-4fe5-ac38-685e07d675b7&sort=market_cap&start=1&limit=100&cryptocurrency_type=tokens&convert=USD')
  .then(res=>{
    const data= res.data.data
   this.setState({all_coins:data})
   this.setState({search_coins:this.state.all_coins})
    
  })
  .catch(err=>{
    console.log(err)
  })
}



  async componentDidMount() {
    LogBox.ignoreAllLogs()
    
    await this.get_all_coins()

    
    
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
              onChangeText={value => {
              
               
                  
                 this.setState({search_coins:
                this.state.all_coins.filter(i=>i.symbol.toLowerCase().includes(value.toLowerCase()))
                })
                
              
             
            
            }
            }
            />
          </View>
          
            <Container style={{ backgroundColor: "#282c34" }}>
              <Content>
              
                
                 {this.state.search_coins.map(item=>{

                  return(
                  <TouchableOpacity
                  key={item.id}
                  onPress={() => this.props.navigation.navigate("Coin",{symbol:item.symbol})}
                >
                  <Coin
                    rank={item.cmc_rank}
                   price={item.quote.USD.price}
                   symbol={item.symbol}
                   changePercent={item.quote.USD.percent_change_24h}
                   change_percentage_of_24hr = {item.quote.USD.percent_change_24h}
                   change_percentage_of_1hr = {item.quote.USD.percent_change_1h}
                   change_percentage_of_7days = {item.quote.USD.percent_change_7d}
                   change_percentage_of_30days = {item.quote.USD.percent_change_30d}
                   change_percentage_of_60days = {item.quote.USD.percent_change_60d}
                   change_percentage_of_90days = {item.quote.USD.percent_change_90d}


                    

                  />
                </TouchableOpacity>
                  )
                })} 


                
                

               
              </Content>
            </Container>
         
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
