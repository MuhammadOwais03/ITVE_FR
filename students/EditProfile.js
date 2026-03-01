import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import StudentSettingsWrapper from './StudentSettingsWrapper';
import * as Location from 'expo-location'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { BACKEND_URL } from '@env';

const API_BASE_URL = `${BACKEND_URL}/api/v1/students`;

const DEFAULT_AVATAR = 'https://i.pravatar.cc/300';

let MapView, Marker;
try {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
} catch (e) {
  MapView = ({ style }) => (
    <View style={[style, styles.mapFallback]}>
      <MaterialCommunityIcons name="map-marker-off" size={40} color="rgba(255,255,255,0.3)" />
      <Text style={styles.mapFallbackText}>Map Module Not Loaded</Text>
    </View>
  );
  Marker = () => null;
}

export default function EditProfile() {
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoadingGPS, setIsLoadingGPS] = useState(false); 
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    school: '',
    gender: '',
    dob: '', 
    username: ''
  });

  const [location, setLocation] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    locationName: 'Karachi, Pakistan'
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          school: data.school || '',
          gender: data.gender || '',
          dob: data.date_of_birth || '',
          username: data.username || ''
        });

        if (data.location) {
          setLocation(prev => ({ ...prev, locationName: data.location }));
        }

        if (data.profile_image) {
          setProfileImage(`${BACKEND_URL}/uploads/${data.profile_image}`);
        } else {
          setProfileImage(DEFAULT_AVATAR);
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      Alert.alert("Error", "Could not load profile data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      let formattedGender = formData.gender?.toLowerCase().trim();
      if (formattedGender !== 'male' && formattedGender !== 'female') {
        formattedGender = undefined; 
      }

      const payload = {};
      
      if (formData.name?.trim()) payload.name = formData.name.trim();
      if (formData.bio?.trim()) payload.bio = formData.bio.trim();
      if (formData.school?.trim()) payload.school = formData.school.trim();
      if (formattedGender) payload.gender = formattedGender;
      if (formData.dob?.trim()) payload.date_of_birth = formData.dob.trim();
      if (formData.username?.trim()) payload.username = formData.username.trim();
      if (location?.locationName?.trim()) payload.location = location.locationName.trim();

      const response = await fetch(`${API_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Backend validation error:", JSON.stringify(errData, null, 2)); 
        const errorMessage = Array.isArray(errData.detail) 
          ? errData.detail[0].msg 
          : (errData.detail || "Update failed");
          
        throw new Error(errorMessage);
      }

      Alert.alert(
        "Success", 
        "Profile updated successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Validation Error", error.message || "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permissions are required to change photo.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const localUri = asset.uri;
      
      setProfileImage(localUri);

      let filename = asset.fileName || localUri.split('/').pop();
      if (!filename.includes('.')) filename = `${filename}.jpg`; 
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? `image/${match[1]}` : `image/jpeg`;

      const formDataObj = new FormData();
      
      if (Platform.OS === 'web') {
        const res = await fetch(localUri);
        const blob = await res.blob();
        formDataObj.append('file', blob, filename);
      } else {
        formDataObj.append('file', { uri: localUri, name: filename, type: ext });
      }

      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_BASE_URL}/upload_profile`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          body: formDataObj,
        });

        if (!response.ok) throw new Error("Server rejected image");
        
        const resData = await response.json();
        setProfileImage(`${BACKEND_URL}/uploads/${resData.filename}`);
        
      } catch (err) {
        console.error("Image upload failed", err);
        Alert.alert("Error", "Could not upload image to server.");
      }
    }
  };

  const handleRemoveImage = async () => {
    Alert.alert(
      "Remove Photo",
      "Are you sure you want to remove your profile picture?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const response = await fetch(`${API_BASE_URL}/remove_profile_image`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
              });

              if (!response.ok) throw new Error("Failed to remove image");
              
              setProfileImage(DEFAULT_AVATAR);
              Alert.alert("Success", "Profile picture removed.");
            } catch (err) {
              console.error(err);
              Alert.alert("Error", "Could not remove profile picture.");
            }
          }
        }
      ]
    );
  };

  const getCurrentLocation = async () => {
    setIsLoadingGPS(true);
    try {
      let enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert('GPS Disabled', 'Please turn on location services.');
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access needed.');
        return;
      }

      let currentPos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = currentPos.coords;
      let reverseResult = await Location.reverseGeocodeAsync({ latitude, longitude });

      let readableAddress = "Location Found";
      if (reverseResult.length > 0) {
        let addr = reverseResult[0];
        readableAddress = `${addr.district || addr.name || ''}, ${addr.city || ''}`.trim();
        if (readableAddress.startsWith(',')) readableAddress = readableAddress.substring(1).trim();
      }
      
      setLocation({ latitude, longitude, locationName: readableAddress });
    } catch (error) {
      Alert.alert("Error", "Could not fetch GPS data.");
    } finally {
      setIsLoadingGPS(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      updateField('dob', formattedDate);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <View style={[styles.mapFallback, { flex: 1 }]}>
        <ActivityIndicator size="large" color="#9CBAA8" />
      </View>
    );
  }

  return (
    <StudentSettingsWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={isSaving}>
          {isSaving ? <ActivityIndicator color="#9CBAA8" /> : <Text style={styles.saveText}>Save</Text>}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.photoContainer}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </View>
          
          <View style={styles.photoActionRow}>
            <TouchableOpacity onPress={pickImage} style={styles.photoActionBtn}>
              <MaterialCommunityIcons name="camera-plus" size={18} color="#9CBAA8" />
              <Text style={styles.tapToChange}>Change</Text>
            </TouchableOpacity>

            {profileImage !== DEFAULT_AVATAR && (
              <TouchableOpacity onPress={handleRemoveImage} style={styles.photoActionBtn}>
                <MaterialCommunityIcons name="trash-can-outline" size={18} color="#FF6B6B" />
                <Text style={[styles.tapToChange, { color: '#FF6B6B' }]}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.formContainer}>
          <InputGroup label="Name" value={formData.name} onChangeText={(t) => updateField('name', t)} />
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <LinearGradient colors={['rgba(0,0,0,0.15)', 'rgba(255,255,255,0.05)']} style={[styles.glassInput, styles.bioInput]}>
              <TextInput 
                multiline 
                style={styles.actualInput} 
                value={formData.bio} 
                placeholderTextColor="rgba(255,255,255,0.2)"
                onChangeText={(t) => updateField('bio', t)}
              />
            </LinearGradient>
          </View>

          <InputGroup label="School" value={formData.school} onChangeText={(t) => updateField('school', t)} />
          <InputGroup label="Gender" placeholder="male or female" value={formData.gender} onChangeText={(t) => updateField('gender', t)} />
          <InputGroup label="Date of Birth" placeholder={'YYYY-MM-DD'} value={formData.dob} onChangeText={(t) => updateField('dob', t)} icon="calendar-month-outline" onIconPress={() => setShowDatePicker(true)} />

          {showDatePicker && (
            <DateTimePicker value={new Date()} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onChangeDate} />
          )}

          <View style={styles.inputGroup}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.label}>Location</Text>
              
              <TouchableOpacity style={styles.gpsButton} onPress={getCurrentLocation} disabled={isLoadingGPS}>
                {isLoadingGPS ? (
                  <ActivityIndicator size="small" color="#9CBAA8" />
                ) : (
                  <>
                    <MaterialCommunityIcons name="crosshairs-gps" size={14} color="#9CBAA8" />
                    <Text style={styles.gpsButtonText}>Auto-detect GPS</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(255,255,255,0.08)']} style={styles.glassInput}>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.actualInput} 
                  value={location.locationName} 
                  onChangeText={(text) => setLocation(prev => ({ ...prev, locationName: text }))} 
                  placeholder="Enter Area, City, Country" 
                  placeholderTextColor="rgba(255,255,255,0.2)" 
                />
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="map-marker-outline" size={22} color="#9CBAA8" />
                </View>
              </View>
            </LinearGradient>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.mapStyle}
                region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker coordinate={location} pinColor="#00CCFF" />
              </MapView>
              
              <View style={styles.locationLabelOverlay}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#9CBAA8" />
                <Text style={styles.locationLabelText}>
                  {location.locationName || "Location not set"}
                </Text>
              </View>
            </View>
          </View>

          <InputGroup label="Username" value={formData.username} onChangeText={(t) => updateField('username', t)} />
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </StudentSettingsWrapper>
  );
}

function InputGroup({ label, value, onChangeText, icon, onIconPress, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(255,255,255,0.08)']} style={styles.glassInput}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.actualInput} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="rgba(255,255,255,0.2)" />
          {icon && (
            <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
              <MaterialCommunityIcons name={icon} size={22} color="#9CBAA8" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 72, paddingHorizontal: 16, marginTop: Platform.OS === 'ios' ? 0 : 10 },
  headerTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  saveText: { color: '#9CBAA8', fontSize: 16, fontWeight: '700' },
  photoContainer: { alignItems: 'center', marginVertical: 10, gap: 8 },
  imageWrapper: { width: 128, height: 128, borderRadius: 64, backgroundColor: '#1F3D5A', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  profileImage: { width: '100%', height: '100%' },
  photoActionRow: { flexDirection: 'row', gap: 20, marginTop: 5 },
  photoActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  tapToChange: { color: '#9CBAA8', fontSize: 14, fontWeight: '600' },
  
  formContainer: { width: '100%', gap: 18 },
  inputGroup: { gap: 8 },
  label: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 8 },
  gpsButton: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(156, 186, 168, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#9CBAA8' },
  gpsButtonText: { color: '#9CBAA8', fontSize: 12, fontWeight: '600' },
  glassInput: { height: 70, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  actualInput: { flex: 1, paddingHorizontal: 25, color: '#FFFFFF', fontSize: 16 },
  iconContainer: { paddingRight: 25 },
  bioInput: { height: 144, borderRadius: 30, paddingVertical: 15 },
  mapContainer: { width: '100%', height: 201, borderRadius: 24, overflow: 'hidden', marginVertical: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  mapStyle: { width: '100%', height: '100%' },
  mapFallback: { backgroundColor: '#1F3D5A', justifyContent: 'center', alignItems: 'center' },
  mapFallbackText: { color: 'rgba(255,255,255,0.5)', marginTop: 8 },
  locationLabelOverlay: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(31, 61, 90, 0.8)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationLabelText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' }
});