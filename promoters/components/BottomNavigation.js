import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import navPromo from '../../assets/nav-promo.png';
import profileIcon from '../../assets/profile-icon.png';

import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeIcon, MenteesIcon, MessagesIcon } from '../Icons';

const ProfileIconComponent = ({ size = 24 }) => (
  <Image source={profileIcon} style={{ width: size, height: size }} />
);

const PromoIconComponent = ({ size = 24 }) => (
  <Image source={navPromo} style={{ width: size, height: size }} />
);

const BottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navItems = [
    { id: 'Home', label: 'Home', icon: HomeIcon },
    { id: 'Messages', label: 'Messages', icon: MessagesIcon },
    { id: 'Institutes', label: 'Institutes', icon: PromoIconComponent },
    { id: 'Mentees', label: 'Mentees', icon: MenteesIcon },
    { id: 'Profile', label: 'Profile', icon: ProfileIconComponent },
  ];

  return (
    <View style={styles.nav}>
      {navItems.map((item) => {
        const isActive = route.name === item.id;
        const IconComponent = item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate(item.id)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <View style={isActive && styles.iconWrapperActive}>
              <IconComponent size={22} />
            </View>

            <Text
              style={[
                styles.navText,
                isActive && styles.navTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000000',
  },

  navItem: {
    alignItems: 'center',
  },

  iconWrapperActive: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },

  navTextActive: {
    color: '#FFFFFF',
  },
});

export default BottomNavigation;