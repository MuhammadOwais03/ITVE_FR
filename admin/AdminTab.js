import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import DeleteScreen from './DeleteScreen';
import GrowthScreen from './GrowthScreen';
import Report from './Report';
import CoursesStack from './CourseStack';
import AdminScreen from './AdminScreen';
import Navbar from './components/NavBar';

const Tab = createBottomTabNavigator();

export default function AdminTab() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <Navbar
          {...props}
          activeTab={props.state.routes[props.state.index].name}
        />
      )}
    >
      <Tab.Screen name="Delete" component={DeleteScreen} />
      <Tab.Screen name="GrowthScreen" component={GrowthScreen} />
      <Tab.Screen name="ReportsScreen" component={Report} />
      <Tab.Screen name="Courses" component={CoursesStack} />
      <Tab.Screen name="AdminScreen" component={AdminScreen} />
    </Tab.Navigator>
  );
}