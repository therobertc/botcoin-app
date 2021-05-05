import React from 'react'
import {View,Text,TouchableOpacity,Dimensions,StyleSheet,Image, Alert} from 'react-native'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import base_url from './base_url'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 

export default class Alerts extends React.Component {

  state = {
    notifications:[],
    can_i_do_chat:true
  }
  get_notifications = async ()=>{
    const user= await AsyncStorage.getItem('user')
    const parse = JSON.parse(user)
    Axios.get(base_url+'get_notifications?my_id='+parse.user_id)
    .then(res=>{
     this.setState({notifications:res.data.notifications})
    })
  }

  check_group_mutation = async()=>{
    const user = await AsyncStorage.getItem('user')
    const parse = JSON.parse(user)
    this.setState({user_id:parse.user_id})
    this.setState({my_info:parse})
    Axios.get(base_url+'check_group_mutation?user_id='+parse.user_id)
    .then(res=>{
        if(res.data.msg == 'Sorry you are muted you cannot chat with the group'){
            this.setState({can_i_do_chat:false})
            Alert.alert(res.data.msg)
        }else{
            this.setState({can_i_do_chat:true})
        }
    })
    }

    delete_notification = (id)=>{
      Axios.get(base_url+'delete_notification?id='+id).then(res=>{
        this.get_notifications()
      })
      .catch(res=>{
        Alert.alert('Something Went Wrong')
      })
    }

  componentDidMount(){
    this.get_notifications()
    this.props.navigation.addListener('focus',()=>{
    this.get_notifications()

    })
  }
render(){
  if(this.state.can_i_do_chat){
  
  return(
    <View style={styles.container}>
        <ScrollView style={{width:'100%'}}>
       {this.state.notifications.length>0?this.state.notifications.map(data=>(
            <View style={{flexDirection:'row',alignSelf:'center'}}>
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('Chat')
            this.delete_notification(data.notification_id)
            }} style={{marginTop:20,borderColor:'#323232',backgroundColor:'#323232',borderWidth:1,borderRadius:5,width:Dimensions.get('window').width*2/2.5,padding:10,flexDirection:'row'}}>
              
         <Image source={{uri:base_url+'static/profile_pics/'+data.profile_pic}} style={{width:30,height:30,borderRadius:100}}/>
         <Text style={{color:'white',fontWeight:'bold',fontSize:12,marginTop:5}}>{data.user_name}</Text>

      <Text style={{color:'white',fontSize:13,marginLeft:10}}>{data.notification_txt}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{marginTop:30,marginLeft:10}} onPress={() =>this.delete_notification(data.notification_id)}>
      <AntDesign name="delete" size={24} color="red"  />
      </TouchableOpacity>
      </View>
     
      ))
    :
    <View style={[styles.container,{justifyContent:'center'}]}>
    <Text style={{color:'white',fontWeight:'bold',fontSize:20,marginTop:150}}>You have No Notification Yet</Text>
   </View> 
    }   
     </ScrollView>
    </View>
  )
}else{
  return(
    <View style={[styles.container,{justifyContent:'center'}]}>
         <Text style={{color:'white',fontWeight:'bold',fontSize:20,marginTop:150}}>You have No Notification Yet</Text>
    </View> 
  )
}

}
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    
    alignItems: "center",
    flex: 1,
    
    
  }
});