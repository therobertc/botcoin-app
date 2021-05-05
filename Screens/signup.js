import React from 'react'
import {View,Text,StyleSheet,StatusBar,TouchableOpacity, Image, Dimensions, Alert,Platform} from 'react-native'
import Axios from 'axios'
import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';
import base_url from './base_url'


export default class Signup extends React.Component {

    state = {
        profile_pic:'',
        profile_pic_name:'',

        username:'',
        password:'',

        //errors Startes

        profile_pic_error_state:'',
        password_error_state:'',
        username_error_state:''
    }
    validate = ()=>{
        let username_error = ''
        let profile_pic_error = ''
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

    if(!this.state.profile_pic){
        profile_pic_error = 'You Must Pick your Profile Pic'
    }
    if(username_error || password_error || profile_pic_error){
        this.setState({username_error_state:username_error,password_error_state:password_error,profile_pic_error_state:profile_pic_error})
        return false
    }
  
    return true


    }

    Permissions = async()=>{
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
    }

     pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({profile_pic:result})
          this.setState({profile_pic_name:result.uri.split('/').pop()})
         
        }
     
      }

    register = ()=>{
    let isvalidate = this.validate()
    if(isvalidate){
        let formData = new FormData();
        let match = /\.(\w+)$/.exec(this.state.profile_pic_name);
        let type = match ? `image/${match[1]}` : `image`;

        formData.append('profile_pic', {
            name: this.state.profile_pic_name,
            type: type,
            uri: Platform.OS === 'ios' ? this.state.profile_pic.uri.replace('file://', '') : this.state.profile_pic.uri,
        })
        formData.append('user_name',this.state.username)
        formData.append('password',this.state.password)
        Axios.post(base_url+'register_user',formData)
        .then(res=>{
            if(res.data.msg == 'You are Successfully Registered'){
                Alert.alert(res.data.msg)
                this.props.navigation.navigate('Signin')
            }else{
                Alert.alert(res.data.msg)
            }
            
        })
        .catch(err=>{
            Alert.alert('Something Went Wrong')
        })
        this.setState({username_error_state:'',password_error_state:'',profile_pic_error_state:''})
        
    }
    }

    componentDidMount() {
        this.Permissions()
    }

    render(){
     return(
         <View style={styles.container}>
             <TouchableOpacity style={{width:80,height:80,borderRadius:100,marginTop:100}} onPress={this.pickImage}>
               <Image source={this.state.profile_pic?{uri:this.state.profile_pic.uri}:require('../assets/pick_account_image.png')} style={{width:80,height:80,borderRadius:80}}/>
             </TouchableOpacity>
             <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.profile_pic_error_state}</Text>

            <TextInput placeholder="Username" style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:this.state.username_error_state?'red':'white',backgroundColor:this.state.username_error_state?'red':'white',borderRadius:5,padding:10,marginTop:50,}} onChangeText={(val)=>{
                this.setState({username:val})
            }}/>

         <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.username_error_state}</Text>

            <TextInput secureTextEntry placeholder="Password" style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:this.state.password_error_state?'red':'white',backgroundColor:this.state.password_error_state?'red':'white',borderRadius:5,padding:10,marginTop:35,}} onChangeText={(val)=>{
                this.setState({password:val})
            }}/>
            
            <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>{this.state.password_error_state}</Text>

            <TouchableOpacity onPress={this.register} style={{width:Dimensions.get('window').width*2/3,height:40,borderWidth:1,borderColor:'#ed6ac3',backgroundColor:'#ed6ac3',borderRadius:5,marginTop:35,justifyContent:'center',alignItems: 'center'}}>
            <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
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
  