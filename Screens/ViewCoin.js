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
    Dimensions
  } from "react-native";
import Axios from 'axios'
import base_url from './base_url'
import { LineChart } from "react-native-svg-charts";


const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
export default class ViewCoin extends React.Component {
     state = {
     coin:{},
     show:false,
    }

    componentDidMount(){
        console.log(this.props.route.params.coin_name.substring(1))
        Axios.get(`https://cloud.iexapis.com/stable/stock/${this.props.route.params.coin_name.substring(1)}/quote?token=pk_0db8d87dbdde49c5b215cd4ec559ed13&format=json`)
    .then(res=>{
         if(res.status != 404){
            this.setState({coin:res.data,show:true})
           

         }else{
             this.setState({coin:null,show:false})
         }
         console.log(res.data)
      
    })
    .catch(err=>{
        console.log(err)
    })
    }

    render(){
        if(this.state.show){

        return (
            <View style={styles.container}>
            <TouchableOpacity style={{borderColor:'gray',width:Dimensions.get('window').width,borderWidth:.5,marginTop:20,padding:30,borderRadius:3,height:'47%'}}>
            <View style={{flexDirection: 'row'}}>
            
            <View style={{borderColor:'gray',borderWidth:1,backgroundColor:'gray',borderRadius:200,justifyContent:'center',alignItems: 'center',padding:8,width:60,height:60}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>{this.state.coin.symbol?this.state.coin.symbol.substring(0, 1):null}</Text>

            </View>
            
            <Text style={{color:'white',fontSize:20,left:10,top:10}}>{this.state.coin.symbol?this.state.coin.symbol:null}/USDT</Text>

            </View>
            <LineChart
           data={data}
           style={styles.chart}
           svg={{ stroke: '#FF00FF', strokeWidth: 3 }}
         />
            <View style={{flexDirection: 'row',marginTop:16,justifyContent: 'space-between'}}>
            <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>{this.state.coin.changePercent?this.state.coin.changePercent:0}%</Text>

            <Text style={{color:'white',fontSize:16,color:'#FF00FF'}}>${this.state.coin.latestPrice}</Text>
            </View>

            </TouchableOpacity>
            </View>
        )
    }else{
        return <View style={[styles.container,{justifyContent:'center',alignItems: 'center'}]}>
          <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>We couldn't Found Any Coin by the name of {this.props.route.params.coin_name}</Text>
        </View>
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