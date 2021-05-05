import React from 'react'
import {View,Text, Alert,ActivityIndicator,StyleSheet,StatusBar,TouchableOpacity,Dimensions, Image,Button,ScrollView} from 'react-native'
import base_url from './base_url'
import Axios from 'axios'
import { TextInput } from 'react-native-gesture-handler'


export default class MuteUsers extends React.Component {
    state = {
        all_users:[],
        is_muted:false,
        search_bar:'',
        
        
    }
    get_all_users = ()=>{
     Axios.get(base_url+'get_all_users?want_to_search=false')
     .then(res=>{
         this.setState({all_users:res.data.all_users,check_mutation:res.data.muted_users})
         console.log(res.data.all_users)
     })
     .catch(error=>{
         Alert.alert('Something Went Wrong')
     })
    }

    mute_user = (user_id)=>{
     Axios.get(base_url+'mute_user?user_id='+user_id)
     .then(res=>{
        this.get_all_users()
         Alert.alert(res.data.msg)
     })
     .catch(err=>{
         Alert.alert('Something Went Wrong')
     })
    }

    componentDidMount(){
        this.get_all_users()
    }

    render(){
        return(
            <View style={styles.container}>
                 
                   
                   <TextInput placeholder='Search User' placeholderTextColor='white' style={{width:Dimensions.get('window').width*2/2.5,height:30,padding:6,borderWidth:1,borderColor:'#ed6ac3',color:'white',borderRadius:5,marginTop:80,alignSelf: "center" }}
                   onChangeText={(val)=>{
                       
                       if(val.length>0){
                        Axios.get(base_url+'get_all_users?want_to_search=true&&searched_user='+val)
                        .then(res=>{
                            this.setState({all_users:res.data.all_users,is_loading:false})
                            console.log(res.data.all_users)
                        })
                        .catch(error=>{
                            Alert.alert('Something Went Wrong')
                        })
                       }else{
                        Axios.get(base_url+'get_all_users?want_to_search=false')
                        .then(res=>{
                            this.setState({all_users:res.data.all_users,is_loading:false})
                            console.log(res.data.all_users)
                        })
                        .catch(error=>{
                            Alert.alert('Something Went Wrong')
                        })
                       }
                   }}
                   />
                <ScrollView style={{marginTop:20}}>
                    {this.state.all_users.map(data=>(
                       
                        
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserInfo',{id:data.user_id})} style={{borderWidth:1,borderColor:'#ed6ac3',backgroundColor:'#ed6ac3',borderRadius:5,alignItems: 'center', marginLeft:20,padding:5,width:Dimensions.get('window').width*2/2.5,flexDirection:'row',marginTop:20}}>
                            
                          <Image source={{uri:base_url+'static/profile_pics/'+data.profile_pic}} style={{borderRadius:30,height:30,width:30,marginLeft:20}}/>  
                        <Text style={{color:'white',fontWeight:'bold',left:10}}>{data.user_name}</Text>

                        
                            <TouchableOpacity onPress={() =>{
                                this.mute_user(data.user_id)
                               
                                
                                
                                
                                }} style={{backgroundColor:'pink',borderColor:'pink',padding:5,justifyContent:'center',alignItems: 'center',borderRadius:5,left:'100%'}}>
                                    <Text style={{color:'white',}}>{data.is_muted >0 ?'UnMute':'Mute'}</Text>

                                    </TouchableOpacity>
                        
                      
                        </TouchableOpacity>
                   
                    ))
                    
                    }
                   
                    </ScrollView>
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