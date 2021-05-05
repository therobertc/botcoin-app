import React from 'react'
import {View,Text,Button,StyleSheet, Image,Dimensions,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import base_url from './base_url'
export default class Settings extends React.Component {
    state = {
        my_info:[]
    }
    log_out = async()=>{
        await AsyncStorage.removeItem('user')
        this.props.navigation.reset({
            index:0,
            routes:[{name:'Auth'}],
           
        });
    }

    get_my_info = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        this.setState({my_info:parse})

    }

    componentDidMount(){
        this.get_my_info()

    }
    render(){
        console.log(this.state.my_info)
        return(
            <View style={styles.container}>
                
               <Image source={{uri:base_url+'static/profile_pics/'+this.state.my_info.profile_pic}} style={{width:100,height:100,borderRadius:100,marginTop:100}}/>
               <Text style={{marginTop:30,fontSize:20,fontWeight:'bold',color:'white'}}>{this.state.my_info.user_name}</Text>
         <Text style={{height:0,width:Dimensions.get('window').width*2/2.5,borderColor:'white',borderWidth:.5,marginTop:10,color:'white'}}> </Text>

         <TouchableOpacity onPress={this.log_out} style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:'#ed6ac3',backgroundColor:'#ed6ac3',borderRadius:5,marginTop:35,justifyContent:'center',alignItems: 'center'}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Logout</Text>
            </TouchableOpacity>
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
