import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../students/HomeScreen';
import MessagesScreen from '../students/MessagesScreen';
import UpdatesScreen from '../students/UpdatesScreen';
import CoursesScreen from '../students/CoursesScreen';
import ProfileScreen from '../students/ProfileScreen';


import Navbar from '../students/components/Navbar';

const Tab = createBottomTabNavigator();

export default function StudentTab() {
  return (
   
 <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Navbar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MessagesScreen" component={MessagesScreen} />
      <Tab.Screen name="Updates" component={UpdatesScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator> 
    
  );
}
