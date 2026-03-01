import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView, 
  Image, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert // Added for a better user experience
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  

 return (
  <SafeAreaView style={styles.container}>
    <View style={styles.center}>
      <MaterialCommunityIcons name="shield-account" size={80} color="#8b0000" />
      
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.subtitle}>
        This is a placeholder Admin page.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { flexGrow: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 55,
    marginBottom: 40,
  },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  content: { paddingHorizontal: 25 },
  input: {
    backgroundColor: '#000',
    borderWidth: 1.5,
    borderColor: '#333',
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 25,
    color: 'white',
    fontSize: 18,
    marginBottom: 25,
  },
  locationLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  mapImage: { width: '100%', height: '100%' },
  addCampusBtn: {
    backgroundColor: '#8b0000',
    height: 70,
    borderRadius: 35,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
  },
  addCampusBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});