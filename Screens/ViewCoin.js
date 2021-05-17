import React from 'react'
import {
    View,
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
  ActivityIndicator

  } from "react-native";
import Axios from 'axios'
import base_url from './base_url'
import { LineChart } from "react-native-svg-charts";


export default class ViewCoin extends React.Component {
     state = {
     coin:[],
     is_loading:true,
     filtered_coin:null
    }


    get_all_coins = async()=>{
      await Axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=60c07164-25a2-4fe5-ac38-685e07d675b7&sort=market_cap&start=1&limit=100&cryptocurrency_type=tokens&convert=USD')
        .then(res=>{
          const data = res.data.data
         this.setState({coin:data})
          
        })
        .catch(err=>{
          console.log(err)
        })
      }
   

  async  componentDidMount(){
    
    await this.get_all_coins()
    .then(()=>{
      this.state.coin.filter(coin=>{
        if(coin.symbol == this.props.route.params.symbol){
          console.log(coin)

          const data = coin
          this.setState({filtered_coin:data})
        }
      })
      this.setState({is_loading:false})
    })
    
    }
    render(){
     
        if(!this.state.is_loading){

        if(this.state.filtered_coin){



        return (
            <View style={styles.container}>
            <View style={{width:Dimensions.get('window').width,marginTop:20,padding:30,height:'47%'}}>
            <View style={{flexDirection: 'row'}}>
            
            <View style={{borderColor:'gray',borderWidth:1,backgroundColor:'gray',borderRadius:200,justifyContent:'center',alignItems: 'center',padding:8,width:60,height:60}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{this.state.filtered_coin.symbol?this.state.filtered_coin.symbol.substring(0,1):null}</Text>

            </View>
            
            <Text style={{color:'white',fontSize:20,left:10,top:10}}>{this.state.filtered_coin.symbol}/USD</Text>
            <Text style={{ fontSize: 23,color:'white',left:'90%',top:5}}>rank # {this.state.filtered_coin.cmc_rank}</Text>
            
            </View>
            <LineChart
           data={[this.state.filtered_coin.quote.USD.percent_change_90d,this.state.filtered_coin.quote.USD.percent_change_60d,this.state.filtered_coin.quote.USD.percent_change_30d,this.state.filtered_coin.quote.USD.percent_change_7d,this.state.filtered_coin.quote.USD.percent_change_24h,this.state.filtered_coin.quote.USD.percent_change_1h]}
           style={styles.chart}
           svg={{ stroke: '#FF00FF', strokeWidth: 3 }}
         />
            <View style={{flexDirection: 'row',marginTop:16,justifyContent: 'space-between'}}>
            <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>{this.state.filtered_coin.quote.USD.percent_change_24h}%</Text>

            <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>${this.state.filtered_coin.quote.USD.price}</Text>
            </View>

            </View>
            </View>
        )
      }else{
        return <View style={{backgroundColor:'#282c34',flex:1,justifyContent:'center',alignItems: 'center'}}>
        <Text style={{color:'red',fontSize:20}}>Sorry,Could'nt Found Any Coin</Text>
        </View>
      }
      

    }else{
      return(
        <View style={{alignItems: 'center',backgroundColor:"#282c34",flex:1}}>
      <ActivityIndicator color='#FF00FF' size='large' style={{marginTop:50}} />
        </View>
      )
    }

    


    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#282c34",
      flex: 1,
   
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