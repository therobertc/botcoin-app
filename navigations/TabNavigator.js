/* eslint-disable no-unused-vars */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h
} from "react-native-responsive-screen";
import HomeCoins from "../Screens/HomeCoins";
import Auth from "../Screens/Auth";
import Alerts from "../Screens/Alerts";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#282c34",
        inactiveTintColor: "#000"
      }}
    >
      <Tab.Screen
        name="HomeCoins"
        component={HomeCoins}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={h("3%")} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Matra Agri',
          tabBarIcon: ({color}) => (
            <Ionicons name="md-leaf-sharp" color={color} size={h('3%')} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="AuthTab"
        component={Alerts}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={h("3%")} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
