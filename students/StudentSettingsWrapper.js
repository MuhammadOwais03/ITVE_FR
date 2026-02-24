import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export default function StudentSettingsWrapper({ children }) {
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" />

      {/* Background Radial Gradient */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="35.31%"
              rx="95.49%"
              ry="64.69%"
              fx="50%"
              fy="35.31%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#194470" stopOpacity="1" />
              <Stop offset="42.78%" stopColor="#122D46" stopOpacity="1" />
              <Stop offset="100%" stopColor="#101A25" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.webWrapper}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  safeArea: { 
    flex: 1 
  },
  webWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 450 : '100%', 
    alignSelf: 'center',
    overflow: 'hidden',
  }
});