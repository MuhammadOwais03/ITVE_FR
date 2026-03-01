import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, Dimensions, KeyboardAvoidingView, Platform,
  ActivityIndicator, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

const SignUpSchool = ({ navigation }) => {
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: '',
    name: '',
    phone: '+92',
    cnic: '',
    gender: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    locationName: '' 
  });

  const handleGPS = async () => {
    setLoadingLoc(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required.');
      setLoadingLoc(false);
      return;
    }
    
    try {
      let loc = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
      if (reverseGeocode.length > 0) {
        let address = reverseGeocode[0];
        let displayAddress = `${address.city || address.district}, ${address.country}`;
        setFormData({ ...formData, locationName: displayAddress });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location.');
    }
    setLoadingLoc(false);
  };

  return (
    <LinearGradient colors={['#20651B', '#094014', '#052401']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* Header Lowered */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate("Selection")}>
                <Ionicons name="chevron-back" size={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>Sign Up</Text>
              <View style={{ width: 30 }} /> 
            </View>

            {/* Input Form */}
            <View style={styles.formContainer}>
              {[
                { label: 'Enter your institute name', key: 'instituteName' },
                { label: 'Enter your name', key: 'name' },
                { label: '+92', key: 'phone', type: 'phone-pad' },
                { label: 'Enter your CNIC', key: 'cnic', type: 'numeric' },
              ].map((item) => (
                <View key={item.key} style={styles.glassRow}>
                  <TextInput
                    style={styles.input}
                    placeholder={item.label}
                    placeholderTextColor="rgba(255, 255, 255, 0.45)"
                    keyboardType={item.type || 'default'}
                    onChangeText={(txt) => setFormData({ ...formData, [item.key]: txt })}
                  />
                </View>
              ))}

              {/* Gender Dropdown Row */}
              <View>
                <TouchableOpacity 
                  style={styles.glassRow} 
                  onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                >
                  <View style={styles.dropdownInner}>
                    <Text style={{ color: formData.gender ? 'white' : 'rgba(255, 255, 255, 0.45)', fontSize: 18 }}>
                      {formData.gender || "Gender"}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="rgba(255,255,255,0.5)" />
                  </View>
                </TouchableOpacity>
                {showGenderDropdown && (
                  <View style={styles.inlineDropdown}>
                    {['Male', 'Female', 'Other'].map((g) => (
                      <TouchableOpacity key={g} style={styles.dropItem} onPress={() => { setFormData({...formData, gender: g}); setShowGenderDropdown(false); }}>
                        <Text style={styles.dropText}>{g}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {[
                { label: 'Enter your username', key: 'username' },
                { label: 'Enter your email', key: 'email', type: 'email-address' },
                { label: 'Enter your password', key: 'password', secure: true },
                { label: 'Confirm your password', key: 'confirmPassword', secure: true },
              ].map((item) => (
                <View key={item.key} style={styles.glassRow}>
                  <TextInput
                    style={styles.input}
                    placeholder={item.label}
                    placeholderTextColor="rgba(255, 255, 255, 0.45)"
                    secureTextEntry={item.secure}
                    keyboardType={item.type || 'default'}
                    onChangeText={(txt) => setFormData({ ...formData, [item.key]: txt })}
                  />
                </View>
              ))}
            </View>

            {/* Location Section */}
            <View style={styles.locationSection}>
              <View style={styles.locationHeaderRow}>
                <Text style={styles.locationLabel}>LOCATION:</Text>
                <TouchableOpacity style={styles.gpsButton} onPress={handleGPS}>
                  {loadingLoc ? <ActivityIndicator size="small" color="#00FF09" /> : (
                    <>
                      <MaterialCommunityIcons name="crosshairs-gps" size={18} color="rgba(255, 255, 255, 0.45)" />
                      <Text style={styles.gpsText}>Update GPS</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.blankMapContainer}>
                {formData.locationName ? (
                  <Text style={styles.bottomLeftLoc}>{formData.locationName}</Text>
                ) : (
                  <Text style={styles.placeholderText}>No location captured</Text>
                )}
              </View>
            </View>

            {/* Next Button */}
               <TouchableOpacity 
           style={styles.nextButton} 
           onPress={() => navigation.navigate('SignUpTwo')}>
           <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 60, alignItems: 'center' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '90%', 
    marginTop: 65, 
    marginBottom: 10 
  },
  title: { fontFamily: 'Poppins', fontWeight: '700', fontSize: 32, color: '#FFFFFF' },
  
  formContainer: { width: 335, marginTop: 10, gap: 24 },
  
  glassRow: {
    width: '100%',
    height: 70,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.1)', 
    borderTopColor: 'rgba(255, 255, 255, 0.5)', 
    borderLeftColor: 'rgba(255, 255, 255, 0.4)', 
    borderRightColor: 'rgba(255, 255, 255, 0.3)', 
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  input: {
    flex: 1,
    paddingHorizontal: 30,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins',
  },
  dropdownInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  inlineDropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dropItem: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.1)' },
  dropText: { color: 'white', fontSize: 16, textAlign: 'left' },

  locationSection: { width: 335, marginTop: 40 },
  locationHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  locationLabel: { fontSize: 20, color: '#FFFFFF', fontWeight: '600' },
  gpsButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.45)' },
  gpsText: { color: 'rgba(255, 255, 255, 0.45)', fontSize: 13, fontWeight: '600' },

  blankMapContainer: {
    width: '100%',
    height: 160,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bottomLeftLoc: { color: '#00FF09', fontFamily: 'Poppins', fontSize: 16, fontWeight: '700' },
  placeholderText: { color: 'rgba(255, 255, 255, 0.15)', textAlign: 'center', marginBottom: 50 },

  nextButton: {
    width: 335,
    height: 70,
    backgroundColor: '#00FF09',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderWidth: 1,
    borderColor: '#04FF00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  nextText: { fontWeight: '700', fontSize: 24, color: '#FFFFFF' },
});

export default SignUpSchool;