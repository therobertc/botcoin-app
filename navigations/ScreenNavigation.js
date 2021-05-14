/* eslint-disable prettier/prettier */
import React,{useState} from "react";
import {View,Text, Dimensions} from 'react-native'
import Axios from 'axios'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeCoins from "../Screens/HomeCoins";
import { TabNavigator } from "./TabNavigator";
import Auth from "../Screens/Auth";
import Alerts from "../Screens/Alerts";
import Swap from "../Screens/Swap";
import LoadingScreen from "../Screens/LoadingScreen";
import Signin from "../Screens/signin";
import Signup from "../Screens/signup";
import GroupChatting from '../Screens/group_chatting'
import UserInfo from '../Screens/user_info'
import MuteUsers from '../Screens/mute_users'
import Settings from '../Screens/setting'
import base_url from '../Screens/base_url'
import ViewCoin from '../Screens/ViewCoin'

const Stack = createStackNavigator();






export const ScreenNavigator = () => {
  const [subscribers,setSubscribers] = useState()

  Axios.get(base_url+'get_subscribers')
  .then(res=>{
    setSubscribers(res.data.subscribers)
  })
  const header_right = ()=>(
    <View style={{right:Dimensions.get('window').width*2/6}}>
      <Text style={{color: 'white',fontSize:15,fontWeight:'bold',marginTop:15}}>Botcoin Holders</Text>
      <Text style={{textAlign:'center',color:'#7f7f7f'}}>{subscribers} subscribers</Text>
    </View>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerTransparent:true,headerTintColor:'#ed6ac3',headerStyle:{backgroundColor:'#2E7588'}}}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{headerTransparent:true,headerTintColor:'#ed6ac3',headerStyle:{backgroundColor:'#282c34'}}}
        />

        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeCoins"
          component={HomeCoins}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Setting"
          component={Settings}
          options={{headerTransparent:true,headerTintColor:'#ed6ac3',headerStyle:{backgroundColor:'#282c34'}}}
        />

        <Stack.Screen
          name="Chat"
          component={GroupChatting}
          options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#323232'},headerRight:()=>header_right()}}

        />

        <Stack.Screen
          name="Mute Users"
          component={MuteUsers}
          options={{headerTransparent:true,headerTintColor:'#ed6ac3'}}
        />

        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{headerTransparent:true,headerTintColor:'#ed6ac3'}}
        />

        <Stack.Screen
          name="Alerts"
          component={Alerts}
          options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#323232'}}}

        />

        <Stack.Screen
          name="Coin"
          component={ViewCoin}
          options={{headerTransparent:false,headerTintColor:'white',headerStyle:{backgroundColor:'#323232'}}}

        />
        <Stack.Screen
          name="Swap"
          component={Swap}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
