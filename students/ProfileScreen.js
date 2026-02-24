import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, 
  Dimensions, Modal, TextInput, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg'; 
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from './components/Navbar';
import { BACKEND_URL } from '@env'

const { width } = Dimensions.get('window');

const API_BASE_URL = `${BACKEND_URL}/api/v1/students`; 

const ProfileScreen = ({ navigation }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [savingData, setSavingData] = useState(false);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(require('../assets/user.png'));
  
  const [work, setWork] = useState({ name: '', role: '', img: require('../assets/company.png') });
  const [edu, setEdu] = useState({ name: '', role: '', img: require('../assets/company.png') });
  
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [progLangs, setProgLangs] = useState([]);
  const [langs, setLangs] = useState([]);
  const [locationName, setLocationName] = useState('');
  
  const [newItem, setNewItem] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [manualLocation, setManualLocation] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchProfileFromAPI();
    }, [])
  );

  const fetchProfileFromAPI = async () => {
    setLoadingData(true);
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
        
        if (data.username) setUsername(data.username);
        if (data.name) setName(data.name);
        if (data.bio) setBio(data.bio);
        if (data.location) setLocationName(data.location);
        if (data.interests) setInterests(data.interests);
        if (data.skills) setSkills(data.skills);
        if (data.programming_languages) setProgLangs(data.programming_languages);
        if (data.languages) setLangs(data.languages);

        if (data.profile_image) {
          setProfileImage({ uri: `${BACKEND_URL}/uploads/${data.profile_image}` });
        } else {
          setProfileImage(require('../assets/user.png'));
        }

        if (data.work) {
          const workData = { ...data.work };
          if (workData.img && typeof workData.img === 'string') {
            workData.img = { uri: `${BACKEND_URL}/uploads/${workData.img}` };
          } else {
            workData.img = require('../assets/company.png'); 
          }
          setWork(workData);
        }

        if (data.edu) {
          const eduData = { ...data.edu };
          if (eduData.img && typeof eduData.img === 'string') {
            eduData.img = { uri: `${BACKEND_URL}/uploads/${eduData.img}` };
          } else {
            eduData.img = require('../assets/company.png'); 
          }
          setEdu(eduData);
        }

      }
    } catch (error) {
      console.error("Failed to fetch profile from API", error);
      Alert.alert("Error", "Could not load profile data.");
    } finally {
      setLoadingData(false);
    }
  };

  const saveProfileToAPI = async (updatedFields = {}) => {
    setSavingData(true);
    try {
      const token = await AsyncStorage.getItem('userToken');

      const extractFilename = (imgData) => {
        if (imgData?.uri && typeof imgData.uri === 'string' && imgData.uri.includes('http')) {
          return imgData.uri.split('/').pop();
        }
        return undefined; 
      };

      const payload = {
        name,
        bio,
        location: updatedFields.location !== undefined ? updatedFields.location : locationName,
        work: { 
          name: work.name, 
          role: work.role,
          img: extractFilename(work.img)
        }, 
        edu: { 
          name: edu.name, 
          role: edu.role,
          img: extractFilename(edu.img)
        },
        interests: updatedFields.interests || interests,
        skills: updatedFields.skills || skills,
        programming_languages: updatedFields.programming_languages || progLangs,
        languages: updatedFields.languages || langs
      };

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to update");
    } catch (error) {
      console.error("Failed to update profile to API", error);
      Alert.alert("Error", "Could not save profile changes.");
    } finally {
      setSavingData(false);
    }
  };

  const handleModalClose = (updatedFields = {}) => {
    let finalOverrides = updatedFields?.nativeEvent ? {} : { ...updatedFields };

    if (newItem.trim() && activeModal) {
      const currentList = listStateMap[activeModal].data;
      const updatedList = [...currentList, newItem.trim()];
      
      listStateMap[activeModal].setter(updatedList);
      
      const payloadKeyMap = {
        'prog': 'programming_languages',
        'interests': 'interests',
        'skills': 'skills',
        'langs': 'languages'
      };
      
      const payloadKey = payloadKeyMap[activeModal];
      if (payloadKey) {
        finalOverrides[payloadKey] = updatedList;
      }
      
      setNewItem('');
    }

    setActiveModal(null);
    saveProfileToAPI(finalOverrides);
  };

  const handleGPS = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied", "Allow location access in settings.");
        setLoadingLocation(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({ 
        accuracy: Location.Accuracy.Low, 
        timeInterval: 5000 
      });
      if (loc) {
        let reverse = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        });
        if (reverse.length > 0) {
          const address = reverse[0];
          
          const area = address.district || address.subregion || address.street;
          const city = address.city || address.region;
          const country = address.country;

          const locationParts = [area, city, country].filter(Boolean);
          const newLocation = locationParts.join(', ');
          
          if (newLocation) {
             setLocationName(newLocation);
             handleModalClose({ location: newLocation });
          } else {
             Alert.alert("Notice", "Could not pinpoint location. Please enter manually.");
          }
        }
      }
    } catch (error) {
      Alert.alert("GPS Error", "Could not get location. Ensure GPS and Internet are turned on.");
    } finally {
      setLoadingLocation(false);
    }
  };

  const listStateMap = {
    interests: { data: interests, setter: setInterests },
    skills: { data: skills, setter: setSkills },
    prog: { data: progLangs, setter: setProgLangs },
    langs: { data: langs, setter: setLangs },
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    const current = listStateMap[activeModal];
    if (current) {
      current.setter([...current.data, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    const current = listStateMap[activeModal];
    if (current) {
      current.setter(current.data.filter(item => item !== itemToRemove));
    }
  };

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ['images'], 
      allowsEditing: true, 
      aspect: [1, 1], 
      quality: 1 
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      
      const source = { uri: localUri };
      type === 'work' ? setWork({ ...work, img: source }) : setEdu({ ...edu, img: source });

      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('file', { uri: localUri, name: filename, type: ext });

      try {
        const token = await AsyncStorage.getItem('userToken');
        
        const response = await fetch(`${API_BASE_URL}/upload_experience_image/${type}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed on server");
        }

      } catch (error) {
        console.error("Image upload error:", error);
        Alert.alert("Upload Error", "Could not save the image to the server.");
      }
    }
  };

  const GlassCard = ({ children, style }) => <View style={[styles.glassBase, style]}>{children}</View>;
  
  const SectionHeader = ({ title, onEdit }) => (
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <TouchableOpacity onPress={onEdit}>
        <MaterialCommunityIcons name="pencil" size={18} color="rgba(255,255,255,0.8)" />
      </TouchableOpacity>
    </View>
  );

  const renderTagList = (title, data, type) => (
    <GlassCard style={styles.card}>
      <SectionHeader title={title} onEdit={() => setActiveModal(type)} />
      <View style={styles.tagsContainer}>
        {data.map((s, i) => (
          <View key={i} style={styles.tag}><Text style={styles.tagText}>{s}</Text></View>
        ))}
      </View>
    </GlassCard>
  );

  if (loadingData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#101A25' }]}>
        <ActivityIndicator size="large" color="#00BFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="35.31%" rx="95.49%" ry="64.69%" fx="50%" fy="35.31%" gradientUnits="userSpaceOnUse">
              <Stop offset="0%" stopColor="#194470" stopOpacity="1" />
              <Stop offset="42.78%" stopColor="#122D46" stopOpacity="1" />
              <Stop offset="100%" stopColor="#101A25" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>

      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150, alignItems: 'center' }}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBorder}>
            {/* --- NEW: USE DYNAMIC AVATAR STATE HERE --- */}
            <Image source={profileImage} style={styles.avatar} />
            
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-decagram" size={24} color="#00BFFF" />
            </View>
          </View>
        </View>
        
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>

        <GlassCard style={styles.statsContainer}>
          <View style={styles.statBox}><Text style={styles.statNumber}>12</Text><Text style={styles.statLabel}>Mentees</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>35</Text><Text style={styles.statLabel}>Friends</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>8</Text><Text style={styles.statLabel}>Mentors</Text></View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <SectionHeader title="Working" onEdit={() => setActiveModal('work')} />
          <View style={styles.workRow}>
            <Image 
              source={
                work?.img?.uri 
                  ? { uri: work.img.uri } 
                  : (typeof work?.img === 'number' ? work.img : require('../assets/company.png'))
              } 
              style={styles.companyLogo} 
            />
            <View><Text style={styles.companyName}>{work.name}</Text><Text style={styles.role}>{work.role}</Text></View>
          </View>
        </GlassCard>

        <GlassCard style={styles.educationCard}>
          <SectionHeader title="Education" onEdit={() => setActiveModal('edu')} />
          <View style={styles.workRow}>
            <Image 
              source={
                edu?.img?.uri 
                  ? { uri: edu.img.uri } 
                  : (typeof edu?.img === 'number' ? edu.img : require('../assets/company.png'))
              } 
              style={styles.companyLogo} 
            />
            <View><Text style={styles.companyName}>{edu.name}</Text><Text style={styles.role}>{edu.role}</Text></View>
          </View>
        </GlassCard>

        {renderTagList("Interests", interests, 'interests')}
        {renderTagList("Skills", skills, 'skills')}
        {renderTagList("Programming Languages", progLangs, 'prog')}
        {renderTagList("Languages", langs, 'langs')}

        <GlassCard style={styles.card}>
          <SectionHeader title="Location" onEdit={() => setActiveModal('location')} />
          <View style={styles.locationRow}>
            <View style={styles.locationIconWrapper}><Ionicons name="location" size={20} color="#00BFFF" /></View>
            <Text style={styles.locationText}>{locationName}</Text>
          </View>
        </GlassCard>
      </ScrollView>

      {/* MODAL FOR WORK/EDU */}
      <Modal visible={activeModal === 'work' || activeModal === 'edu'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit {activeModal === 'work' ? 'Experience' : 'Education'}</Text>
            <TouchableOpacity onPress={() => pickImage(activeModal)} style={styles.imageEditBtn}>
              <Text style={{color: '#00BFFF'}}>Tap to Change Image</Text>
            </TouchableOpacity>
            <TextInput 
              style={styles.modalInput} 
              value={activeModal === 'work' ? work.name : edu.name} 
              onChangeText={(t) => activeModal === 'work' ? setWork({...work, name: t}) : setEdu({...edu, name: t})} 
              placeholder="Name" 
              placeholderTextColor="#666" 
            />
            <TextInput 
              style={styles.modalInput} 
              value={activeModal === 'work' ? work.role : edu.role} 
              onChangeText={(t) => activeModal === 'work' ? setWork({...work, role: t}) : setEdu({...edu, role: t})} 
              placeholder="Detail" 
              placeholderTextColor="#666" 
            />
            <TouchableOpacity onPress={handleModalClose} style={styles.saveBtn} disabled={savingData}>
              {savingData ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Done</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL FOR LISTS */}
      <Modal visible={['interests', 'skills', 'prog', 'langs'].includes(activeModal)} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Manage {activeModal}</Text>
            <View style={styles.modalTagsWrap}>
              {activeModal && listStateMap[activeModal]?.data.map((s, i) => (
                <View key={i} style={styles.editTag}>
                  <Text style={{color: '#fff'}}>{s}</Text>
                  <TouchableOpacity onPress={() => handleRemoveItem(s)}>
                    <Ionicons name="close-circle" size={18} color="#FF6B6B" style={{marginLeft: 5}} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addRow}>
              <TextInput style={[styles.modalInput, {flex: 1, marginBottom: 0}]} value={newItem} onChangeText={setNewItem} placeholder="Add new..." placeholderTextColor="#666" />
              <TouchableOpacity onPress={handleAddItem} style={styles.addBtn}><Ionicons name="add" size={24} color="#fff" /></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleModalClose} style={styles.saveBtn} disabled={savingData}>
               {savingData ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Done</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL FOR LOCATION */}
      <Modal visible={activeModal === 'location'} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Update Location</Text>
            <TouchableOpacity onPress={handleGPS} style={styles.gpsBtn} disabled={loadingLocation}>
              {loadingLocation ? <ActivityIndicator color="#fff" /> : (
                <>
                  <Ionicons name="navigate" size={20} color="#fff" />
                  <Text style={{color: '#fff', marginLeft: 10}}>Use Current Location</Text>
                </>
              )}
            </TouchableOpacity>
            <Text style={{color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginVertical: 10}}>— OR —</Text>
            
            <TextInput 
              style={styles.modalInput} 
              placeholder="Enter Area, City, Country" 
              placeholderTextColor="#666"
              value={manualLocation}
              onChangeText={setManualLocation}
            />
            
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity onPress={() => setActiveModal(null)} style={[styles.saveBtn, {flex: 1, backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  if(manualLocation.trim()) {
                    const newLocation = manualLocation.trim();
                    setLocationName(newLocation);
                    setManualLocation('');
                    handleModalClose({ location: newLocation });
                  } else {
                    Alert.alert("Error", "Please enter a location");
                  }
                }} 
                style={[styles.saveBtn, {flex: 1}]}
              >
                {savingData ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Save</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Navbar active="Profile" navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 50 },
  username: { color: '#fff', fontSize: 20 },
  avatarContainer: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  avatarBorder: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FFE4C4', justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  verifiedBadge: { position: 'absolute', bottom: 10, right: 5, backgroundColor: '#101A25', borderRadius: 15 },
  name: { color: '#fff', fontSize: 22, fontWeight: '700', textAlign: 'center' },
  bio: { color: '#fff', fontSize: 14, textAlign: 'center', marginTop: 8, opacity: 0.8 },
  glassBase: { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(18, 45, 70, 0.4)', overflow: 'hidden' },
  statsContainer: { width: 340, height: 86, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 25 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  card: { width: 340, padding: 20, marginTop: 20 },
  educationCard: { width: 340, height: 134, padding: 20, marginTop: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { color: '#fff', fontWeight: '600', fontSize: 18 },
  workRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: 50, height: 50, borderRadius: 12, marginRight: 15 },
  companyName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  role: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: 'rgba(0, 191, 255, 0.15)', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 6 },
  tagText: { color: '#fff', fontSize: 13 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationIconWrapper: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(0, 191, 255, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  locationText: { color: '#fff', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#122D46', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#00BFFF' },
  modalHeader: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalInput: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', padding: 12, borderRadius: 10, marginBottom: 15 },
  imageEditBtn: { padding: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: '#00BFFF', borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  saveBtn: { backgroundColor: '#00BFFF', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  modalTagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
  editTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  addBtn: { backgroundColor: '#00BFFF', width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  gpsBtn: { flexDirection: 'row', backgroundColor: '#194470', padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }
});