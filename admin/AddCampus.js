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

export default function AddCampus() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const localMapImage = require('../assets/map.jpeg');

  // Logic to handle saving and navigation
  const handleAddCampus = () => {
    if (name.trim() === '' || location.trim() === '') {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // You would typically put your API call or state update here
    console.log("Campus Added:", { name, location });

    // This takes the user back to the previous screen (Courses)
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Add New Campus</Text>
            <View style={{ width: 32 }} /> 
          </View>

          <View style={styles.content}>
            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Name of Campus"
              placeholderTextColor="#777"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Location of Campus"
              placeholderTextColor="#777"
              value={location}
              onChangeText={setLocation}
            />

            {/* Location Section */}
            <Text style={styles.locationLabel}>LOCATION:</Text>
            
            <View style={styles.mapContainer}>
              <Image 
                source={localMapImage} 
                style={styles.mapImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Button with onPress logic */}
          <TouchableOpacity 
            style={styles.addCampusBtn} 
            onPress={handleAddCampus}
            activeOpacity={0.7}
          >
            <Text style={styles.addCampusBtnText}>Add Campus</Text>
          </TouchableOpacity>

          {/* Spacer to lift the button above the bottom nav bar */}
          <View style={{ height: 110 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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