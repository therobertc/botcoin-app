import React from 'react';
import {View,Text, Alert,ActivityIndicator,StyleSheet,StatusBar,TouchableOpacity,Dimensions, Image,Button, TextInput} from 'react-native'
import Axios from 'axios'
import base_url from './base_url'
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo  } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Item } from 'native-base';


const emojis = [{
    id:1,

    name:'clap.png',
},{
    id:2,
    name:'emotion_anger.png',
   

},{
    id:3,

    name:'fearful.png',

},
,{
    id:4,

    name:'fire.png',

},{
    id:5,
    name:'hand.png',
    

},{
    id:6,
    name:'heart.png',
    

},{
    id:7,
    name:'laugh_tear.png',

},{
    name:'meaning.png',
    id:8

},{
    id:9,
    name:'poo.png',
    
},{
    id:11,

    name:'sleep.png',

}
,{
    id:12,

    name:'smiley.png',

}
,{
    id:13,

    name:'sun_glasses.png',

}

,{
    id:14,

    name:'super_angry.png',

}
,{
    id:15,

    name:'surprise.png',

}
,{
    id:16,

    name:'think.png',

},{
    id:17,

    name:'tongue_out.png',

},{
    id:18,

    name:'wholemouth_surprise.png',

}

]


let coins_list = ['btc','am','hello']

export default class GroupChatting extends React.Component {
   
    constructor(props) {
        super(props);
        this.sheetRef  = React.createRef(null);
      }
    state = {
        can_i_do_chat:true,
        my_info:[],
        msg:'',
        image:'',
        emoji:'',
        msgs:[],
        msgs_error:'',
        user_id:'',

        
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



    get_msgs = ()=>{
        Axios.get(base_url+'get_msgs')
        .then(res=>{
            this.setState({msgs:res.data.msgs})
           
        })
        .catch(err=>{
            this.setState({msgs_error:'Something Went Wrong'})
            console.log(err)
        })
    }

    componentDidMount(){
    this.check_group_mutation()
    this.sheetRef.current.snapTo(2)
    this.get_msgs()

    this.props.navigation.addListener('focus',()=>{
    
    this.check_group_mutation()

    this.get_msgs()

    setInterval(()=>{
    this.get_msgs()
    },3000)
    

    })
    
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
          this.setState({image:result})
       
         
        }
     
      }


     

      send_msg = async()=>{
      const user = await AsyncStorage.getItem('user')
      const parse = JSON.parse(user)

      
      
      let formData = new FormData()
      if(this.state.image.uri){
        let match = /\.(\w+)$/.exec(this.state.image.uri.split('/').pop());
        let type = match ? `image/${match[1]}` : `image`;

        formData.append('image',{
            name: this.state.image.uri.split('/').pop(),
            type: type,
            uri: Platform.OS === 'ios' ? this.state.image.uri.replace('file://', '') : this.state.image.uri,
        })
      }

      

      if(this.state.msg){
          formData.append('msg',this.state.msg)
      }

      if(this.state.emoji){
          formData.append('emoji',this.state.emoji)
      }
      
      if(this.state.msg.length>0 || this.state.image.uri || this.state.emoji){
          formData.append('inserted_by',parse.user_id)
          Axios.post(base_url+'insert_msg',formData)
          .then(res=>{
              this.get_msgs()
              
            this.inser_notification('Added message to group')
              

              this.setState({msg:'',image:'',emoji:''})
              
              console.log(res.data.msg)
          })
          .catch(err=>{
              Alert.alert('Something Went Wrong')
          })
      }else{
          return null
      }

      }

      inser_notification = async(notification)=>{
          const user = await AsyncStorage.getItem('user')
          const parse = JSON.parse(user)
          let formData = new FormData()
          formData.append('notification_txt',notification)
          formData.append('created_by',parse.user_id)
          Axios.post(base_url+'insert_notifications',formData)
          .then(res=>{
              console.log(res.data.msg)
          })
          .catch(err=>{
              return null
          })

          
      }


      checkingForTag = (tag)=>{
        coins_list.map(data=>{
          
            if(data == tag){
                
                return true
            }
            return false
        })
      }

     renderContent = () => (
        <View
          style={{
            backgroundColor: '#323232',
            padding:10,
            height: 550,
          }}
        >
          <Text style={{textAlign: 'center'}}>Swipe down to close</Text>
          <Text style={{textAlign: 'center',color:'white',fontWeight:'bold'}}>Press and hold on emoji to send</Text>

          
         
          <View style={{left:50, width:'100%',marginTop:30,padding:5,flexDirection:'row',flexWrap:'wrap',bottom:30}}>
          
          {emojis.map(data=>(
             
         <TouchableOpacity style={{marginRight:30,marginTop:16}} key={data.id} onPress={()=>{
             this.setState({emoji: data.name})
             this.send_msg()
         }}>
         <Image source={{uri:base_url+'static/emojis/'+data.name}}  style={{width:60,height:60}} />
         </TouchableOpacity>
              
          ))}
           
        </View>

        
          </View>
         

       
      );
    render(){
            if(this.state.can_i_do_chat){

            return(
                <View style={styles.container}>
                    <ScrollView style={{width:'100%'}}>
                    {this.state.my_info.is_admin == 1?
                    <TouchableOpacity style={{marginTop:20,marginLeft:Dimensions.get('window').width*2/3,}} onPress={()=>this.props.navigation.navigate('Mute Users')}>
                    <Text style={{color:'white',fontWeight:'bold'}}>Mute Users</Text>
                    </TouchableOpacity>
                    
                    :null}
                    <View style={{marginTop:50,borderWidth:1,borderColor:'gray',borderRadius:8,padding:10,width:'45%',alignSelf: 'center'}}>
                    <Image source={require('../assets/icon.png')} style={{width:160,height:160}}/>

                    </View>
                    
                    <View style={{marginTop:30,padding:10}}>

                    {this.state.msgs.map(msg=>{
                      
                      if(msg.muted <1 && !msg.emoji){
                          return(
                              <View  key={msg.message_id} >
                                {msg.sended_by != this.state.my_info.user_id?
                                <TouchableOpacity style={{marginTop:5}} onPress={()=>this.props.navigation.navigate('UserInfo',{id:msg.user_id})}>
                                    <View style={{flexDirection: 'row'}}>
                                <Image source={{uri:base_url+'static/profile_pics/'+msg.profile_pic}} style={{width:25,height:25,borderRadius:30,}}/>
                                <Text style={{color:'white',}}>{msg.user_name}</Text>
                                

                                </View>

                                </TouchableOpacity>
                                :null}
                              <View  style={{backgroundColor:msg.sended_by == this.state.user_id?'#0DAAAA':'#323232',marginTop:msg.sended_by == this.state.my_info.user_id?20:0,width:'50%',borderRadius:10,padding:msg.image?8:5,left:msg.sended_by == this.state.user_id?Dimensions.get('window').width*2/4.5:20,}}>

                               <View style={{flexDirection: 'row',flexWrap:'wrap'}}>
                                {msg.message_txt?msg.message_txt.split(' ').map(data=>{
                                
                                if(data[0] == '$' && data.length>1){
                                   
                                  return <TouchableOpacity onPress={()=>this.props.navigation.navigate('Coin',{coin_name:data})}>
                                   <Text style={{color:'blue',textDecoration:'underline'}}> {data} </Text>
                                   </TouchableOpacity>

                                }else{
                                    return  <Text style={{color:'white'}}> {data} </Text>

                                }
                                }):null}
                               </View>
                                {msg.image?
                                
                              <Image source={{uri:base_url+'static/msg_images/'+msg.image}} style={{borderRadius:10,width:'100%',height:200,top:5,}}/>
                                
                                :null}
                              </View>
                             
                             

                              </View>
                          )
                      }else if(msg.muted <1 && msg.emoji){
                          return(
                            <View  style={{marginTop:10,left:msg.sended_by == this.state.user_id?Dimensions.get('window').width*2/3:0}}>
                            {msg.sended_by != this.state.my_info.user_id?
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserInfo',{id:msg.user_id})}>
                            <Image source={{uri:base_url+'static/profile_pics/'+msg.profile_pic}} style={{width:25,height:25,borderRadius:30,top:15}}/>
                            </TouchableOpacity>
                            :null}
                          <Image source={{uri:base_url+'static/emojis/'+msg.emoji}} style={{width:80,height:80,marginLeft:msg.sended_by != this.state.user_id?20:0}}/>
                              
                          </View>
                          )
                      }
                    }
                    
                    )
                    }
                    </View>

                    </ScrollView>
                    
                    <View style={{width:Dimensions.get('window').width,height:30,flexDirection:'row'}}>
                        {this.state.image.uri?<Image source={{uri:this.state.image.uri}} style={{width:18,height:18,borderRadius:20,position:'absolute'}}/>:null}
                        <TouchableOpacity style={{left:10}} onPress={this.pickImage}>
                        <Entypo name="attachment" size={20} color="#F5FFFA" />

                        </TouchableOpacity>

                        <TouchableOpacity style={{left:20}} onPress={()=>this.sheetRef.current.snapTo(0)}>
                        <Entypo name="emoji-happy" size={20} color="#F5FFFA" />

                        </TouchableOpacity>

                        <View style={{borderWidth:.5,borderColor:'#F5FFFA',position:'relative',padding:5,borderRadius:20,width:Dimensions.get('window').width*2/2.8,marginLeft:25}}>
                        <TextInput placeholder="BroadCast" placeholderTextColor='#7f7f7f' style={{color:'white',}} multiline={true}
                        textStyle={{ minHeight: 128 }}
                        numberOfLines={5}
                        onChangeText={(val)=>this.setState({msg:val})}
                        value={this.state.msg}
                        />

                        </View>
                      
                        <TouchableOpacity style={{left:5}} onPress={this.send_msg}>
                        <AntDesign name="right" size={24} color="#F5FFFA" />

                        </TouchableOpacity>

                        </View>

                        <BottomSheet
                        ref={this.sheetRef}
                        snapPoints={[400, 350, 0]}
                        borderRadius={10}
                        
                        scrollable

                        renderContent={this.renderContent}
                    />


                </View>
            )
        }else{
            return(
                <View style={[styles.container,{justifyContent:'center'}]}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Sorry you are muted . You cant chat</Text>
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
