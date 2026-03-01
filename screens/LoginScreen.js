import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../students/components/Btn';
import Field from '../students/components/Field';
import { FontAwesome } from '@expo/vector-icons';
import { BACKEND_URL } from '@env';

const API_URL = `${BACKEND_URL}/api/v1/auth`; 

const LoginScreen = (props) => {
  const [isRemembered, setIsRemembered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { width } = Dimensions.get('window');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username/email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username_or_email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.access_token);
        // await AsyncStorage.setItem('userType', data.user_type);
        // await AsyncStorage.setItem('userId', data.id);
        
        if (isRemembered) {
          await AsyncStorage.setItem('savedUsername', username);
        }

        // Alert.alert('Login Success', `Welcome back!`);

        const type = data.user_type;

        if (type === 'Student') {
             props.navigation.replace('StudentTabs');
             
        } else if (type === 'promoter' || type === 'Promoter') {
             props.navigation.replace('PromoTab');
             
        } else if (type === 'school/college' || type === 'School/College') {
             props.navigation.replace('SchoolTab');
             
        } else if (type === 'admin' || type === 'Admin') {
             props.navigation.replace('AdminDashboard'); 
             
        } else {
             Alert.alert("Notice", `Unknown User Type: ${type}`);
             props.navigation.replace('StudentTabs');
        }

      } else {
        Alert.alert('Login Failed', data.detail || 'Invalid credentials');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo */}
      <Image
        source={require('../assets/logo.jpeg')}
        style={{
          width: width * 0.6,
          height: 200,
          marginBottom: 30,
          resizeMode: 'contain',
          top: 80,
        }}
      />

      {/* Fields */}
      <View style={{ width: '100%', alignItems: 'center', marginTop: 80 }}>
        <Field
          placeholder="USERNAME OR EMAIL"
          keyboardType="email-address"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Field
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Remember me + Forgot Password */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', top: 30 }}>
          <Switch
            value={isRemembered}
            onValueChange={(value) => setIsRemembered(value)}
            thumbColor={isRemembered ? '#4CAF50' : 'white'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: 16 }}>
            Remember me?
          </Text>
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 'bold',
              fontSize: 16,
              top: 30,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button with Loading State */}
      <View style={{ marginTop: 20, width: '100%', alignItems: 'center' }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" style={{ marginVertical: 20 }} />
        ) : (
          <Btn textColor="black" bgColor="white" btnLabel="LOG IN" Press={handleLogin} />
        )}
      </View>

      {/* Divider */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 25,
          width: '100%',
          top: 20,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.55)',
            marginHorizontal: 10,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          Or log in with
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
      </View>

      {/* Social Icons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '60%',
          marginBottom: 40,
          top: 20,
        }}
      >
        <TouchableOpacity>
          <FontAwesome name="facebook" size={25} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="google" size={25} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="twitter" size={25} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      {/* Signup */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          top: 30,
        }}
      >
        <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.55)' }}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Selection')}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;