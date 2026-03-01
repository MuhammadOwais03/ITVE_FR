import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, 
  Dimensions, SafeAreaView, Modal, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; 
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomNavBar from './components/BottomNavBar'; 

const { width } = Dimensions.get('window');

const ProfileWatcherSchool = ({ navigation }) => {
  // STATES 
  const [facilities, setFacilities] = useState(['Sports', 'AC classes']);
  const [labs, setLabs] = useState(['Chemistry', 'Computer']);
  const [locationName, setLocationName] = useState('Karachi, Pakistan');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editType, setEditType] = useState(''); 
  const [inputValue, setInputValue] = useState('');

  // DATA PERSISTENCE 
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedFacilities = await AsyncStorage.getItem('@facilities');
      const savedLabs = await AsyncStorage.getItem('@labs');
      const savedLoc = await AsyncStorage.getItem('@location');

      if (savedFacilities) setFacilities(JSON.parse(savedFacilities));
      if (savedLabs) setLabs(JSON.parse(savedLabs));
      if (savedLoc) setLocationName(savedLoc);
    } catch (e) { console.error("Load Error", e); }
  };

  const saveData = async (key, value) => {
    try {
      const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) { console.error("Save Error", e); }
  };

  // HANDLERS 
  const handleGPS = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission denied");
        setLoadingLocation(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      let reverse = await Location.reverseGeocodeAsync(loc.coords);
      if (reverse.length > 0) {
        const newLoc = `${reverse[0].city}, ${reverse[0].country}`;
        setLocationName(newLoc);
        saveData('@location', newLoc);
        setModalVisible(false);
      }
    } catch (e) { Alert.alert("Error", "GPS Failed"); }
    setLoadingLocation(false);
  };

  const handleSave = () => {
    if (inputValue.trim() === '') { setModalVisible(false); return; }

    if (editType === 'facilities') {
      const updated = [...facilities, inputValue];
      setFacilities(updated);
      saveData('@facilities', updated);
    } else if (editType === 'labs') {
      const updated = [...labs, inputValue];
      setLabs(updated);
      saveData('@labs', updated);
    } else if (editType === 'location') {
      setLocationName(inputValue);
      saveData('@location', inputValue);}
    setModalVisible(false);
    setInputValue('');
  };

  const openEditModal = (type) => {
    setEditType(type);
    if (type === 'location') {
      setInputValue(locationName);
    } else if (type === 'experience') {
      setInputValue(experience);
    } else {
      setInputValue('');
    }
    setModalVisible(true);
  };

  const DetailRow = ({ label, value }) => (
    <View style={styles.detailRowContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.detailValueCapsule}>
        <Text style={styles.detailValueText}>{value}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#135821', '#094014', '#052401']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerUsername}>sahil_xoxo</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Settings Pressed")}>
              <Ionicons name="settings-outline" size={28} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://i.pravatar.cc/300' }} style={styles.avatar} />
            <View style={styles.verifyBadge}>
              <MaterialCommunityIcons name="check-decagram" size={26} color="#00FF37" />
            </View>
          </View>

          {/* Name and Tagline */}
          <Text style={styles.schoolNameText}>White House Grammar{"\n"}School (Airport)</Text>

          {/* Stats Box */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}><Text style={styles.statNum}>1.2K</Text><Text style={styles.statLabel}>Followers</Text></View>
            <View style={styles.statItem}><Text style={styles.statNum}>800</Text><Text style={styles.statLabel}>Students</Text></View>
            <View style={styles.statItem}><Text style={styles.statNum}>8</Text><Text style={styles.statLabel}>Followings</Text></View>
          </View>

          {/* Rank/Principal Rows */}
          <View style={styles.rowsList}>
            <DetailRow label="Rank 🏆" value="31" />
            <DetailRow label="Principal" value="Sahil Kumar" />
            <DetailRow label="Total Students Enrolled" value="999" />
            <DetailRow label="Alumni's" value="1000" />
          </View>

          {/* Achievements Row  */}
          <BlurView intensity={15} tint="dark" style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>Achievements</Text>
            <View style={styles.achievementStack}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.trophyCircle}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/color/100/trophy.png' }}
                    style={styles.stackedTrophy} 
                  />
                </View>
              ))}
            </View>
          </BlurView>

          {/* Facilities Section */}
          <BlurView intensity={15} tint="dark" style={styles.sectionCard}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.sectionTitle}>Facilities</Text>
              <TouchableOpacity onPress={() => openEditModal('facilities')}><MaterialCommunityIcons name="pencil" size={18} color="white" /></TouchableOpacity>
            </View>
            <View style={styles.tagRow}>
              {facilities.map((item, index) => (
                <View key={index} style={styles.blueTag}><Text style={styles.tagText}>{item}</Text></View>
              ))}
            </View>
          </BlurView>

          {/* Labs Section */}
          <BlurView intensity={15} tint="dark" style={styles.sectionCard}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.sectionTitle}>Labs</Text>
              <TouchableOpacity onPress={() => openEditModal('labs')}><MaterialCommunityIcons name="pencil" size={18} color="white" /></TouchableOpacity>
            </View>
            <View style={styles.tagRow}>
              {labs.map((item, index) => (
                <View key={index} style={styles.blueTag}><Text style={styles.tagText}>{item}</Text></View>
              ))}
            </View>
          </BlurView>

          {/* Location Section */}
          <BlurView intensity={15} tint="dark" style={styles.sectionCard}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.sectionTitle}>Location</Text>
              <TouchableOpacity onPress={() => openEditModal('location')}><MaterialCommunityIcons name="pencil" size={18} color="white" /></TouchableOpacity>
            </View>
            <View style={styles.locationContainer}>
              <View style={styles.locBox}><Ionicons name="location" size={20} color="#00FF37" /></View>
              <Text style={styles.locationLabel}>{locationName}</Text>
            </View>
          </BlurView>
        </ScrollView>
        <BottomNavBar />

        {/* Edit Modal */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContent}>
              <Text style={styles.modalHeader}>
                {editType === 'location' ? 'Update Location' : editType === 'experience' ? 'Update Experience' : `Add ${editType}`}
              </Text>
              {editType === 'location' && (
                <>
                  <TouchableOpacity style={styles.gpsButton} onPress={handleGPS} disabled={loadingLocation}>
                    {loadingLocation ? <ActivityIndicator color="#00FF37" /> : <Text style={styles.gpsButtonText}>Use Current Location</Text>}
                  </TouchableOpacity>
                  <Text style={styles.orText}>— OR —</Text>
                </>
              )}
              <TextInput style={styles.modalInput} placeholder="Type here..." placeholderTextColor="#aaa" value={inputValue} onChangeText={setInputValue} />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}><Text style={styles.btnTextSmall}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}><Text style={styles.btnTextSmall}>Save</Text></TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </BlurView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 26, 
    paddingTop: Platform.OS === 'ios' ? 50 : 60, 
    paddingBottom: 10 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerUsername: { 
    color: 'white', 
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  backCircle: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 8, borderRadius: 50 },
  avatarContainer: { alignSelf: 'center', marginTop: 15 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: 'white' },
  verifyBadge: { position: 'absolute', right: 5, bottom: 5, backgroundColor: 'white', borderRadius: 50, padding: 2 },
  schoolNameText: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  taglineText: { 
    width: 224, 
    alignSelf: 'center', 
    textAlign: 'center', 
    fontSize: 14, 
    fontWeight: '400', 
    lineHeight: 21, 
    color: '#FFFFFF', 
    marginTop: 8, 
    opacity: 0.8 
  },
  statsContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: 354, 
    height: 86, 
    alignSelf: 'center', 
    marginTop: 24,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(30, 41, 59, 0.2)', 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 24,
  },
  statItem: { alignItems: 'center' },
  statNum: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 12 },
  rowsList: { paddingHorizontal: 20, marginTop: 20, gap: 10 },
  detailRowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailLabel: { color: 'white', fontSize: 15, fontWeight: '600' },
  detailValueCapsule: { backgroundColor: '#00FF37', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  detailValueText: { color: 'white', fontWeight: 'bold' },
  achievementCard: {
    width: 349,
    height: 126,
    alignSelf: 'center',
    marginTop: 20,
    padding: 17,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
    overflow: 'hidden',
  },
  achievementTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  achievementStack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#00BFFF',
    backgroundColor: '#FFF',
    marginLeft: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stackedTrophy: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  sectionCard: { marginHorizontal: 20, marginTop: 15, padding: 18, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  blueTag: { backgroundColor: 'rgba(19, 164, 236, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { color: 'white', fontSize: 12 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  locBox: { backgroundColor: '#246025', padding: 8, borderRadius: 12 },
  locationLabel: { color: 'white', fontSize: 14 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.85, backgroundColor: 'rgba(30, 41, 59, 0.95)', padding: 25, borderRadius: 30 },
  modalHeader: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  modalInput: { backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', padding: 12, borderRadius: 10, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveBtn: { backgroundColor: '#00FF37', padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
  cancelBtn: { padding: 10, width: '45%', alignItems: 'center' },
  btnTextSmall: { color: 'white', fontWeight: 'bold' },
  gpsButton: { backgroundColor: 'rgba(0, 255, 55, 0.1)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#00FF37', marginBottom: 10, alignItems: 'center' },
  gpsButtonText: { color: '#00FF37', fontWeight: 'bold' },
  orText: { color: 'white', textAlign: 'center', marginBottom: 10, fontSize: 12, opacity: 0.5 }
});

export default ProfileWatcherSchool;