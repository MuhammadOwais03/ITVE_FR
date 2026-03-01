import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SchoolSettingsWrapper({ children }) {
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" />

      {/* Background Gradient - Updated to Forest Green Theme */}
      <LinearGradient
        colors={['#135821', '#094014', '#052401']} // Matches your Home and Notification screens
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }} 
        end={{ x: 0.5, y: 1 }}      
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
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
    maxWidth: Platform.OS === 'web' ? 500 : '100%', 
    alignSelf: 'center',
    overflow: 'hidden',
  }
});