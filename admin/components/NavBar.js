import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'; // ✅ Single clean import



const Navbar = ({ navigation, activeTab }) => {
  console.log(navigation, activeTab)
  const tabs = [
    { name: 'Delete',        label: 'Delete',  route: 'Delete',        icon: 'trash-outline',         activeIcon: 'trash' },
    { name: 'GrowthScreen',  label: 'Growth',  route: 'GrowthScreen',  icon: 'bar-chart-outline',     activeIcon: 'bar-chart' },
    { name: 'ReportsScreen', label: 'Reports', route: 'ReportsScreen', icon: 'notifications-outline', activeIcon: 'notifications' },
    { name: 'Courses',       label: 'Courses', route: 'Courses',       icon: 'play-circle-outline',   activeIcon: 'play-circle' },
    { name: 'AdminScreen',   label: 'Admin',   route: 'AdminScreen',   icon: 'person-outline',        activeIcon: 'person' },
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
          
            {isActive && <View style={styles.activeGlow} />}

            {tab.isMCI ? (
              <MaterialCommunityIcons
                name={tab.icon}
                size={26}
                color={isActive ? '#FFFFFF' : '#FFFFFF'}
              />
            ) : (
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? '#FFFFFF' : '#FFFFFF'}
              />
            )}
            
            <Text
              style={[
                styles.label,
                { 
                  color: isActive ? '#FFFFFF' : '#FFFFFF',
                  fontWeight: isActive ? '700' : '500' 
                },
              ]}
            >
              {tab.label}
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
    bottom: 24,
    width: '100%',
    alignItems: 'center',
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
     
    margin: 'auto',
    flexDirection: 'row',
    width: '100%',
    height: 75,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
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

  // activeGlow: {
  //   position: 'absolute',
  //   width: 52,
  //   height: 52,
  //   borderRadius: 26,
  //   backgroundColor: '#FFFFFF',
  //   opacity: 0.95,

  //   shadowColor: '#FFFFFF',
  //   shadowOffset: { width: 0, height: 0 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 10,
  //   zIndex: -2,
  //   elevation: 8,
  // },

  activeGlow: {
    // Matches spec: white ellipse, blur(7.5px), 70x70
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,

    // White bloom — mirrors CSS filter: blur(7.5px)
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default Navbar;