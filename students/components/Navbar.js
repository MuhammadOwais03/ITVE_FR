

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const Navbar = ({ navigation, activeTab }) => {
  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home', route: 'Home' },
    { name: 'Messages', icon: 'chatbubble-outline', activeIcon: 'chatbubble', route: 'MessagesScreen' },
    { name: 'Updates', icon: 'notifications-outline', activeIcon: 'notifications', route: 'Updates' },
    { name: 'Courses', icon: 'monitor-screenshot', activeIcon: 'monitor-screenshot', route: 'Courses', isMCI: true },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person', route: 'Profile' },
  ];

  return (
    <BlurView intensity={30} tint="dark" style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7} 
          >
          
            {isActive && (
              <View style={styles.activeIndicatorContainer}>
                <View style={styles.glow} />
              </View>
            )}

            {tab.isMCI ? (
              <MaterialCommunityIcons
                name={tab.icon}
                size={26}
                color={isActive ? '#FFFFFF' : '#00CCFF'}
              />
            ) : (
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? '#FFFFFF' : '#00CCFF'}
              />
            )}
            
            <Text
              style={[
                styles.label,
                { 
                  color: isActive ? '#FFFFFF' : '#00CCFF',
                  fontWeight: isActive ? '700' : '500' 
                },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 40,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    backgroundColor: 'rgba(16, 26, 37, 0.4)', 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 55,
  },
  activeIndicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  glow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 204, 255, 0.5)',
    shadowColor: '#00CCFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Navbar;
