import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';


const promoterTheme = COLORS.promotersPortal;
const ACTIVE_COLOR = promoterTheme.gradient.colors[0];

const PromoNavbar = ({ state, navigation }) => {
  if (!state || !navigation) return null;

  const tabs = [
    { name: 'PromoHome', icon: 'home-outline', label: 'Home' },
    { name: 'PromoMessages', icon: 'chatbubble-outline', label: 'Messages' },
    { name: 'Institutes', icon: 'business-outline' },
    { name: 'Mentees', icon: 'people-outline' },
    { name: 'PromoProfile', icon: 'person-outline', label: 'Profile' },
  ];

  return (
    <View style={[styles.wrapper, { shadowColor: ACTIVE_COLOR }]}>
      <BlurView intensity={100} tint="dark" style={styles.container}>
        <LinearGradient
          colors={promoterTheme.gradient.colors.map(c => `${c}CC`)}
          start={promoterTheme.gradient.start}
          end={promoterTheme.gradient.end}
          style={StyleSheet.absoluteFill}
        />

        {tabs.map((tab, index) => {
          const isActive = state.index === index;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => navigation.navigate(tab.name)}
              activeOpacity={0.8}
            >
              {/* 🔥 Active Glow */}
              {isActive && <View style={styles.glow} />}

              <Ionicons
                name={isActive ? tab.icon.replace('-outline', '') : tab.icon}
                size={24}
                color={isActive ? ACTIVE_COLOR : 'rgba(255,255,255,0.6)'}
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isActive
                      ? ACTIVE_COLOR
                      : 'rgba(255,255,255,0.6)',
                  },
                ]}
              >
                {tab.label || tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

export default PromoNavbar;


const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 40,
    overflow: 'hidden',

    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  glow: {
    position: 'absolute',
    top: 2,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: ACTIVE_COLOR,
    opacity: 0.25,

    // Android glow
    elevation: 8,

    // iOS glow
    shadowColor: ACTIVE_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
