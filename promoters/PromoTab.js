import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import PromoNavbar from './components/PromoNavbar';
import PromoterHome from './PromoterHome';
import PromoMessages from './PromoMessages';
import Institutes from './InstitutesScreen';

import PromoProfile from './PromoProfile';
import MenteesScreen from './MenteesScreen';



const Tab = createBottomTabNavigator();

export default function PromoTab() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <PromoNavbar {...props} />}
    >
      <Tab.Screen name="PromoHome" component={PromoterHome} />
      <Tab.Screen name="PromoMessages" component={PromoMessages} />
      <Tab.Screen name="Institutes" component={Institutes} />
      <Tab.Screen name="Mentees" component={MenteesScreen} />
      <Tab.Screen name="PromoProfile" component={PromoProfile} />
    </Tab.Navigator>
  );
}
