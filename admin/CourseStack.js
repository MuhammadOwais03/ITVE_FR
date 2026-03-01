import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CoursesScreen from './CoursesScreen';
import NewCourse from './NewCourse';
import EditCourse from './EditCourse';
import LaunchCourse from './LaunchCourse';
import AddCampus from './AddCampus';
import GenerateTeacherAccount from './GenerateTeacherAccount';

const Stack = createNativeStackNavigator();

export default function CoursesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CoursesScreen" component={CoursesScreen} />
      <Stack.Screen name="NewCourse" component={NewCourse} />
      <Stack.Screen name="EditCourse" component={EditCourse} />
      <Stack.Screen name="LaunchCourse" component={LaunchCourse} />
      <Stack.Screen name="AddCampus" component={AddCampus} />
      <Stack.Screen name="GenerateTeacherAccount" component={GenerateTeacherAccount} />
    </Stack.Navigator>
  );
}