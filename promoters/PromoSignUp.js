import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import karachiMap from '../assets/karachi-map.png';
import Svg, { Path } from 'react-native-svg';

const PromoSignUp = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '+92',
    dobDD: '',
    dobMM: '',
    dobYYYY: '',
    gender: '',
    cnic: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    activationPin: '',
  });

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Svg width={28} height={28} viewBox="0 0 24 24">
              <Path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </TouchableOpacity>

          <Text style={styles.title}>Sign Up</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.name}
            onChangeText={v => handleChange('name', v)}
            style={styles.input}
          />

          <TextInput
            placeholder="+92"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.phone}
            onChangeText={v => handleChange('phone', v)}
            keyboardType="phone-pad"
            style={styles.input}
          />

          {/* DOB */}
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.dobRow}>
            <TextInput
              placeholder="DD"
              placeholderTextColor="rgba(255,255,255,0.4)"
              maxLength={2}
              value={form.dobDD}
              onChangeText={v => handleChange('dobDD', v)}
              style={[styles.input, styles.dobInput]}
            />
            <TextInput
              placeholder="MM"
              placeholderTextColor="rgba(255,255,255,0.4)"
              maxLength={2}
              value={form.dobMM}
              onChangeText={v => handleChange('dobMM', v)}
              style={[styles.input, styles.dobInput]}
            />
            <TextInput
              placeholder="YYYY"
              placeholderTextColor="rgba(255,255,255,0.4)"
              maxLength={4}
              value={form.dobYYYY}
              onChangeText={v => handleChange('dobYYYY', v)}
              style={[styles.input, styles.dobInputLarge]}
            />
          </View>

          <TextInput
            placeholder="Gender"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.gender}
            onChangeText={v => handleChange('gender', v)}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter your CNIC"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.cnic}
            onChangeText={v => handleChange('cnic', v)}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter your username"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.username}
            onChangeText={v => handleChange('username', v)}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.email}
            onChangeText={v => handleChange('email', v)}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.password}
            onChangeText={v => handleChange('password', v)}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={form.confirmPassword}
            onChangeText={v => handleChange('confirmPassword', v)}
            secureTextEntry
            style={styles.input}
          />

          {/* Activation Pin */}
          <Text style={styles.label}>Activation Pin</Text>
          <TextInput
            value={form.activationPin}
            onChangeText={v => handleChange('activationPin', v)}
            style={styles.input}
          />

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <View style={styles.mapContainer}>
            <Image
              source={karachiMap}
              style={styles.map}
              resizeMode="cover"
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('PromoterHome')}
            style={styles.signUpBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromoSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  formSection: {
    paddingHorizontal: 24,
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 16,
  },

  label: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },

  dobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  dobInput: {
    width: '25%',
    textAlign: 'center',
  },

  dobInputLarge: {
    width: '40%',
    textAlign: 'center',
  },

  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 160,
    marginBottom: 24,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  signUpBtn: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  signUpText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
