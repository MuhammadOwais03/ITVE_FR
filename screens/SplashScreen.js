import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to LoginScreen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Image
        source={require('../assets/logo.jpeg')} // your same logo
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});

export default SplashScreen;
