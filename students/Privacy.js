import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  StatusBar, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import StudentSettingsWrapper from './StudentSettingsWrapper';

export default function PrivacySettings() {
  const navigation = useNavigation();

  const [privacyMode, setPrivacyMode] = useState('public'); 
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        "Privacy Updated", 
        `Your profile is now ${privacyMode}.`,
        [{ text: "Done", onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  return (
    <StudentSettingsWrapper>
      <StatusBar barStyle="light-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.webCenterWrapper}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Privacy</Text>
            <View style={{ width: 40 }} /> 
          </View>

          {/* SECTION TITLE */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Who can see your content?</Text>
          </View>

          {/* OPTION LIST */}
          <View style={styles.optionsContainer}>
            
            <PrivacyOption 
              label="Public"
              description="Anyone can see your profile, posts, and stories."
              value="public"
              currentValue={privacyMode}
              onSelect={setPrivacyMode}
            />

            <PrivacyOption 
              label="Friends Only"
              description="Only your approved friends can see your activity."
              value="friends only"
              currentValue={privacyMode}
              onSelect={setPrivacyMode}
            />

          </View>

          <View style={styles.footerFlexSpacer} />

          {/* SAVE BUTTON */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.saveButton, isSaving && { opacity: 0.7 }]} 
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </StudentSettingsWrapper>
  );
}

// REUSABLE OPTION COMPONENT
function PrivacyOption({ label, description, value, currentValue, onSelect }) {
  const isSelected = currentValue === value;
  
  return (
    <TouchableOpacity 
      style={[styles.optionRow, isSelected && styles.selectedBorder]} 
      onPress={() => onSelect(value)}
      activeOpacity={0.8}
    >
      <View style={styles.textStack}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Text style={styles.optionSubtext}>{description}</Text>
      </View>
      
      <View style={[styles.radioButton, isSelected && styles.radioActive]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    flexGrow: 1, 
    paddingBottom: 40 
  },
  webCenterWrapper: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    flex: 1,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 72, 
    marginTop: Platform.OS === 'android' ? 10 : 0,
    paddingHorizontal: 16,
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 18, 
    textAlign: 'center',
    flex: 1,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  sectionHeader: {
    height: 47,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  optionsContainer: {
    padding: 16,
    gap: 12,
  },
  optionRow: {
    width: '100%',
    minHeight: 95,
    borderWidth: 1,
    borderColor: 'rgba(49, 106, 161, 0.3)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  selectedBorder: {
    borderColor: '#146CC7',
    backgroundColor: 'rgba(19, 128, 236, 0.08)',
  },
  textStack: {
    flex: 1,
    paddingRight: 10,
  },
  optionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionSubtext: {
    color: '#75A5D0',
    fontSize: 13,
    lineHeight: 18,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(49, 106, 161, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#146CC7',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#146CC7',
  },
  footerFlexSpacer: { 
    flex: 1, 
    minHeight: 100 
  },
  buttonContainer: { 
    width: '100%', 
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  saveButton: {
    width: '100%',
    maxWidth: 358,
    height: 52,
    backgroundColor: '#146CC7',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', 
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});