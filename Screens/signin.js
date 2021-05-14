import React from 'react';
import {View,Text,StyleSheet,StatusBar,TouchableOpacity, Image, Dimensions, Alert} from 'react-native'
import Axios from 'axios'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';
import base_url from './base_url'




export default class Signin extends React.Component {

    
    state = {
       
        username:'',
        password:'',

        //errors Startes

       
        password_error_state:'',
        username_error_state:''
    }


    validate = ()=>{
        let username_error = ''
        // let profile_pic_error = ''
        let password_error = ''

        if(this.state.username.length<3){
            username_error = 'Username Must Be at least 8 characters'
        }else if(this.state.username.length>15){
            username_error = 'Username Must Be Max 15 characters'
        }

        
    if(this.state.password.length<7){
        password_error = 'Password Must Be at least 8 characters'
    }else if(this.state.password.length>15){
        password_error = 'Password Must Be Max 15 characters'
    }

    if(username_error || password_error){
        this.setState({username_error_state:username_error,password_error_state:password_error})
        return false
    }
  
    return true


    }


    
    

    login = async()=>{
        let isvalidate = this.validate()
        if(isvalidate){
            let formData = new FormData()
            formData.append('user_name',this.state.username)
            formData.append('password',this.state.password)
            

           await Axios.post(base_url+'login_user',formData)
            .then(res=>{
                if(res.data.msg == 'You are Successfully Logged In'){
                    AsyncStorage.setItem('user',JSON.stringify(res.data.user))
                    Alert.alert(res.data.msg)
                 
                    this.props.navigation.reset({
                        index:0,
                        routes:[{name:'HomeCoins'}],
                       
                    });
                }else{
                    Alert.alert(res.data.msg)
                }
            })
            this.setState({username_error_state:'',password_error_state:''})
            
        }else{
            Alert.alert('Sorry')
        }
    }
    render(){
        return(
             <View style={styles.container}>
            

            <TextInput placeholder="Username" style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:this.state.username_error_state?'red':'white',backgroundColor:this.state.username_error_state?'red':'white',borderRadius:5,padding:10,marginTop:150,}} onChangeText={(val)=>{
                this.setState({username:val})
            }}/>

         <Text style={{color:'red',fontSize:13,fontWeight:'bold'}}>{this.state.username_error_state}</Text>

            <TextInput secureTextEntry placeholder="Password" style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:this.state.password_error_state?'red':'white',backgroundColor:this.state.password_error_state?'red':'white',borderRadius:5,padding:10,marginTop:35,}} onChangeText={(val)=>{
                this.setState({password:val})
            }}/>
            
            <Text style={{color:'red',fontSize:13,fontWeight:'bold'}}>{this.state.password_error_state}</Text>

            <TouchableOpacity onPress={this.login} style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:'#ed6ac3',backgroundColor:'#ed6ac3',borderRadius:5,marginTop:35,justifyContent:'center',alignItems: 'center'}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Sign in</Text>
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
      ...Platform.select({
        android: {
          marginTop: StatusBar.currentHeight
        }
      })
    }
  });