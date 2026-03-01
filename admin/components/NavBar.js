import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = ({ activeTab }) => {
  const navigation = useNavigation();
  
  // Safely try to get route, otherwise fallback to null
  let routeName = '';
  try {
    const route = useRoute();
    routeName = route.name;
  } catch (e) {
    routeName = ''; 
  }

  const tabs = [
    { name: 'Delete', icon: 'trash-can-outline', activeIcon: 'trash-can', route: 'Home' },
    { name: 'Growth', icon: 'chart-line', activeIcon: 'chart-line', route: 'GrowthScreen' },
    { name: 'Reports', icon: 'bell-outline', activeIcon: 'bell', route: 'ReportsScreen' },
    { name: 'Courses', icon: 'play-box-multiple-outline', activeIcon: 'play-box-multiple', route: 'Courses' },
    { name: 'Admin', icon: 'account-outline', activeIcon: 'account', route: 'AdminScreen' },
  ];

  return (
    <View style={styles.outerWrapper}>
      <BlurView intensity={30} tint="dark" style={styles.container}>
        {tabs.map((tab) => {
          // CHECK: Use the prop 'activeTab' as the primary source of truth
          const isActive = activeTab === tab.name || routeName === tab.route;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => navigation.navigate(tab.route)}
              activeOpacity={0.7}
            >
              {isActive && (
                <>
                  <View style={styles.glowOuter} />
                  <View style={styles.glowInner} />
                  <View style={styles.glowCore} />
                </>
              )}
              
              <View style={styles.content}>
                <MaterialCommunityIcons 
                  name={isActive ? tab.activeIcon : tab.icon} 
                  size={24} 
                  color={isActive ? '#000000' : 'rgba(255, 255, 255, 0.7)'} 
                />
                <Text style={[
                  styles.label, 
                  isActive && styles.activeLabel
                ]}>
                  {tab.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

// ... keep your existing styles below ...
const styles = StyleSheet.create({
  outerWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    width: '92%',
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'visible',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  glowOuter: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  glowInner: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  glowCore: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#000000',
    fontWeight: '700',
  },
});

export default Navbar;