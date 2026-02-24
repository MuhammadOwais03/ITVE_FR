import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation, useRoute } from '@react-navigation/native'; 

const BottomNavbar = ({ activeTab }) => {
  const navigation = useNavigation();
  const route = useRoute(); // This detects the current active screen

  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home', route: 'HomeScreenSchool' },
    { name: 'Messages', icon: 'chatbubble-outline', activeIcon: 'chatbubble', route: 'SchoolMessagesScreen' },
    { name: 'Post', icon: 'add-circle-outline', activeIcon: 'add-circle', route: 'SchoolUpdatesScreen' },
    { name: 'Students', icon: 'people-outline', activeIcon: 'people', route: 'StudentsScreen' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person', route: 'ProfileScreenSchool' },
  ];

  return (
    <BlurView intensity={50} tint="dark" style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name || route.name === tab.route;
        const neonGreen = '#39FF14';

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => {
              navigation.navigate(tab.route);
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}
          >
            {isActive && (
              <View style={styles.glowWrapper}>
                <View style={styles.outerBloom} />
                <View style={styles.innerBloom} />
              </View>
            )}

            <View style={styles.content}>
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={tab.name === 'Post' ? 28 : 22}
                color={isActive ? '#FFFFFF' : neonGreen}
              />
              <Text style={[styles.label, { color: isActive ? '#FFFFFF' : neonGreen }]}>
                {tab.name}
              </Text>
            </View>
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
    bottom: 30,
    alignSelf: 'center',
    width: '88%',
    borderRadius: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(5, 15, 5, 0.3)',
    overflow: 'visible',
    zIndex: 9999,
    elevation: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  glowWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerBloom: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(57, 255, 20, 0.2)',
    ...Platform.select({
      ios: { shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 30 },
      android: { elevation: 15 },
    }),
  },
  innerBloom: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(57, 255, 20, 0.3)',
    ...Platform.select({
      ios: { shadowColor: '#39FF14', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10 },
      android: { elevation: 8 },
    }),
  },
  content: { alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  label: { fontSize: 9, marginTop: 3, fontWeight: '700' },
});

export default BottomNavbar;