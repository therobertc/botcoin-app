import React from 'react'
import {View,Text,Image,TouchableOpacity, Alert, Dimensions,StyleSheet} from 'react-native'
import Axios from 'axios'
import base_url from './base_url'
import AsyncStorage from '@react-native-community/async-storage'
export default class UserInfo extends React.Component {

    state= {
        user_info:[],
        my_info:[]
    }
    get_user_info = ()=>{
        Axios.get(base_url+'get_user_info?user_id='+this.props.route.params.id)
        .then(res=>{
          this.setState({user_info:res.data.user})
          console.log(res.data.user)
        })
        .catch(err=>{
            Alert.alert('Something Went Wrong')
        })
    }

   

    componentDidMount(){
        this.get_user_info()
    }
    render(){
        return(
        <View style={styles.container}>
        <View style={{marginTop:100,justifyContent:'center',alignItems: 'center'}}>
           
         <Image source={{uri:base_url+'static/profile_pics/'+this.state.user_info.profile_pic}} style={{width:90,height:90,borderRadius:100}}/>
         <Text style={{fontSize:20,fontWeight:'bold',color:'white',marginTop:15}}>{this.state.user_info.user_name}</Text>


         <Text style={{height:0,width:Dimensions.get('window').width*2/2.5,borderColor:'white',borderWidth:.5,marginTop:10,color:'white'}}> </Text>

    
        </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#282c34",
      
      alignItems: "center",
      flex: 1,
      
      
    }
  });
