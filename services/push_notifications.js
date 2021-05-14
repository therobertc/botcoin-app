import React from 'react'
import Axios from 'axios';
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import base_url from '../Screens/base_url'
import AsyncStorage from '@react-native-community/async-storage'

const TASK_NAME = 'Push_Notifications'

export default class PushNotifications extends React.Component {
    state = {
        notifications:[]
    }
    registerPush = ()=>{
        console.log('Registered')
        return BackgroundFetch.registerTaskAsync(TASK_NAME,{
            minimumInterval:5,
            stopOnTerminate:false
        })
    }


    seen_all_notifications = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
    
        Axios.get(base_url+'seen_all_notifications?my_id='+parse.user_id)
        .then(res=>{
          console.log(res.data.msg)
        })
      }
    
    
      sendNotification = async(token,to_name,body)=>{
       
    
        const message = {
          to: token,
          sound:'default',
          
          title:'Botcoin',
          body:to_name+' '+body,
          data:{data:'goese'}
        }
    
        await fetch('https://exp.host/--/api/v2/push/send',{
          method:'POST',
          headers:{
            Accept: 'application/json',
            'Accept-encoding':'gzip,deflate',
            'Content-Type':'application/json',
          },
          body: JSON.stringify(message)
        });
      }
    
    
      

      componentDidMount(){

         
          TaskManager.defineTask(TASK_NAME,()=>{
              try{

          const recievedNewData = async ()=>{
                const user= await AsyncStorage.getItem('user')
                 const parse = JSON.parse(user)
                Axios.get(base_url+'get_notifications?my_id='+parse.user_id)
                .then(res=>{
                  
                 this.setState({notifications:res.data.notifications})
                 this.state.notifications.map(data=>{
                  if(data.reciever == parse.user_id && data.seen == 0){
                      console.log(parse.user_name)
                    this.sendNotification(parse.token,data.user_name,data.notification_txt)
                    this.seen_all_notifications()
                    
                   }
                 })
                })
              }
        
              
              return recievedNewData()? BackgroundFetch.Result.NewData:BackgroundFetch.Result.NewData
            }catch(err){
                return BackgroundFetch.Result.Failed
            }

          })


          this.registerPush()
          .then(()=>{
              console.log('Push Registered')
          })
      }



   
     

    render(){
        return null
    }
}