import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, TextInput, Modal, FlatList, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignUpSchoolTwo = ({ navigation }) => {
  const [experience, setExperience] = useState('16 years');
  const [showExpModal, setShowExpModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Rating states (0 to 1 scale)
  const [ratings, setRatings] = useState({
    tech: 0.1, leadership: 0.1, comms: 0.1, mgmt: 0.1, motivation: 0.1, teaching: 0.1
  });

  const expOptions = ['5 years', '10 years', '16 years', '20 years', '25+ years'];

  const RatingSlider = ({ label, stateKey, topPos }) => (
    <View style={[styles.ratingGroup, { top: topPos }]}>
      <View style={styles.ellipseDot} />
      <Text style={styles.skillLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.componentTrack}
        onPress={(e) => {
          const newRate = e.nativeEvent.locationX / 154;
          setRatings({ ...ratings, [stateKey]: Math.max(0, Math.min(1, newRate)) });
        }}
      >
        <View style={styles.rect330} />
        <View style={[styles.rect331, { width: `${ratings[stateKey] * 100}%` }]} />
        <View style={[styles.ellipse7, { left: `${ratings[stateKey] * 90}%` }]} />
      </TouchableOpacity>
    </View>
  );

  const DateInputGroup = ({ topPos }) => (
    <View style={[styles.dateRow, { top: topPos }]}>
      <View style={[styles.menuComp, { width: 46 }]}>
        <TextInput
          placeholder="DD"
          style={styles.dateInput}
          placeholderTextColor="rgba(255,255,255,0.55)"
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
      <View style={styles.lineVertical} />
      <View style={[styles.menuComp, { width: 46 }]}>
        <TextInput
          placeholder="MM"
          style={styles.dateInput}
          placeholderTextColor="rgba(255,255,255,0.55)"
          keyboardType="numeric"
          maxLength={2}
        />
      </View>
      <View style={styles.lineVertical} />
      <View style={[styles.menuComp, { width: 65 }]}>
        <TextInput
          placeholder="YYYY"
          style={styles.dateInput}
          placeholderTextColor="rgba(255,255,255,0.55)"
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#20651B', '#094014', '#052401']}
      style={styles.container}
      start={{ x: 0.5, y: 0.42 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ height: 980 }} showsVerticalScrollIndicator={false}>

            {/* Header Title */}
            <Text style={styles.signUpTitle}>Sign Up</Text>

            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#94A3B8" />
            </TouchableOpacity>

            {/* Date of Birth Section */}
            <Text style={styles.dobLabel}>Date of Birth:</Text>
            <DateInputGroup topPos={139} />

            {/* Institute Age Section */}
            <Text style={[styles.dobLabel, { top: 236, width: 130 }]}>Institute Age:</Text>
            <DateInputGroup topPos={231} />

            {/* Experience Section */}
            <Text style={styles.expLabel}>Experience:</Text>
            <TouchableOpacity style={styles.expDropdown} onPress={() => setShowExpModal(true)}>
              <Text style={styles.expValueText}>{experience}</Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </TouchableOpacity>

            {/* Rate Your Self Section */}
            <Text style={styles.rateTitle}>Rate your self:</Text>
            <View style={styles.frame4}>
              <RatingSlider label="Technology Awareness:" stateKey="tech" topPos={0} />
              <RatingSlider label="Leadership:" stateKey="leadership" topPos={28} />
              <RatingSlider label="Communication:" stateKey="comms" topPos={56} />
              <RatingSlider label="Management:" stateKey="mgmt" topPos={87} />
              <RatingSlider label="Motivation:" stateKey="motivation" topPos={116} />
              <RatingSlider label="Teaching Skills:" stateKey="teaching" topPos={144} />
            </View>

            {/* Promo Code Section */}
            <Text style={styles.promoLabel}>PROMO CODE:</Text>
            <View style={styles.promoMenuComp}>
              <TextInput
                value={promoCode}
                onChangeText={setPromoCode}
                style={styles.promoTextInput}
                placeholder="CODE"
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
            </View>
         {/* Sign Up Button */}
           <TouchableOpacity 
               style={styles.group209} 
               onPress={() => {
                  // 1. Show the success message
               Alert.alert(
                     "Success!",
                     "Your account has been successfully created.",
                   [
                      { 
                   text: "OK", 
                        onPress: () => {
              // 2. Navigate only after they click OK
               console.log("Navigating to Home...");
               navigation.navigate('HomeScreenSchool'); 
            } 
           }
          ],
      { cancelable: false } 
    );
  }}>
  <View style={styles.rect257} />
  <Text style={styles.signUpBtnText}>Sign Up</Text>
    </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Dropdown Modal */}
      <Modal visible={showExpModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowExpModal(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={expOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => { setExperience(item); setShowExpModal(false); }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  signUpTitle: {
    position: 'absolute', width: 306, height: 48, left: 43, top: 48,
    fontFamily: 'Poppins', fontWeight: '700', fontSize: 32, textAlign: 'center', color: '#FFFFFF'
  },
  backButton: {
    position: 'absolute', width: 40, height: 40, left: 20, top: 52,
    borderRadius: 9999, justifyContent: 'center', alignItems: 'center'
  },
  dobLabel: {
    position: 'absolute', width: 127, height: 30, left: 31, top: 144,
    fontFamily: 'Poppins', fontSize: 20, color: '#FFFFFF'
  },
  dateRow: {
    position: 'absolute', flexDirection: 'row', alignItems: 'center', left: 177, width: 182, height: 39
  },
  menuComp: {
    height: 39,
    backgroundColor: 'rgba(0, 0, 0, 0.004)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  dateInput: {
    width: '100%',
    height: '100%',
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 0
  },
  lineVertical: {
    width: 1, height: 30, backgroundColor: 'rgba(255, 255, 255, 0.55)', marginHorizontal: 4
  },
  expLabel: {
    position: 'absolute', width: 113, height: 30, left: 31, top: 323,
    fontFamily: 'Poppins', fontSize: 20, color: '#FFFFFF'
  },
  expDropdown: {
    position: 'absolute', width: 134, height: 70, left: 223, top: 304,
    backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 100,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5
  },
  expValueText: { fontFamily: 'Poppins', fontSize: 18, color: 'rgba(255, 255, 255, 255)' },
  rateTitle: {
    position: 'absolute', width: 139, height: 30, left: 31, top: 408,
    fontFamily: 'Poppins', fontSize: 20, color: '#FFFFFF'
  },
  frame4: { position: 'absolute', width: 356, height: 165, left: 21, top: 449 },
  ratingGroup: { position: 'absolute', width: 348, height: 19, flexDirection: 'row', alignItems: 'center' },
  ellipseDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFFFFF', position: 'absolute', left: 0 },
  skillLabel: { position: 'absolute', left: 10, fontFamily: 'Poppins', fontSize: 14, color: '#FFFFFF' },
  componentTrack: { position: 'absolute', width: 154, height: 19, left: 194 },
  rect330: { position: 'absolute', width: '100%', height: 5, top: 7, backgroundColor: '#AFABAB', borderRadius: 16 },
  rect331: { position: 'absolute', height: 5, top: 7, backgroundColor: '#00FF04', borderRadius: 16 },
  ellipse7: { position: 'absolute', width: 14, height: 14, borderRadius: 7, backgroundColor: '#11AF13', top: 2.5 },
  promoLabel: {
    position: 'absolute', width: 138, height: 30, left: 31, top: 667,
    fontFamily: 'Poppins', fontSize: 20, color: '#FFFFFF'
  },
  promoMenuComp: {
    position: 'absolute', width: 161, height: 70, left: 196, top: 648,
    backgroundColor: 'rgba(0, 0, 0, 0.004)', borderRadius: 100,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center'
  },
  promoTextInput: { textAlign: 'center', color: 'white', fontFamily: 'Poppins', fontSize: 18, padding: 0 },
  group209: {
    position: 'absolute', width: 359, height: 70, left: 19, top: 772,
    justifyContent: 'center', alignItems: 'center'
  },
  rect257: {
    position: 'absolute', width: '100%', height: '100%', backgroundColor: '#00FF09',
    borderRadius: 100, borderWidth: 1, borderColor: '#04FF00'
  },
  signUpBtnText: {
    fontFamily: 'Poppins', fontWeight: '700', fontSize: 24, color: '#FFFFFF'
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 220, backgroundColor: '#094014', borderRadius: 15, padding: 10, borderWidth: 1, borderColor: 'white' },
  modalItem: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.1)' },
  modalItemText: { color: 'white', textAlign: 'center', fontSize: 18 }
});

export default SignUpSchoolTwo;