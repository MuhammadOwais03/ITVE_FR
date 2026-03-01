

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
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // alignItems: 'center',
  },

  // This solid dark layer sits BEHIND the BlurView to give it
  // the dark glass appearance instead of seeing through to the screen
  solidBase: {
    position: 'absolute',
    width: '100%',
    height: 75,
    borderRadius: 40,
    backgroundColor: 'rgba(20, 20, 20, 0.92)',
  },

  container: {
    flexDirection: 'row',
    width: '92%',
    height: 75,
    borderRadius: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,

    // Semi-transparent dark tint layered on top of the blur
    backgroundColor: 'rgba(15, 15, 15, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',

    overflow: 'hidden',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeGlow: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    opacity: 0.95,

    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default Navbar;
