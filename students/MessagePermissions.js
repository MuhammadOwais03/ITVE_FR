import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  StatusBar, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import StudentSettingsWrapper from './StudentSettingsWrapper'; 

export default function MessagePermissions() {
  const navigation = useNavigation();
  
  const [permission, setPermission] = useState('everyone');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Settings Saved",
        "Your message permissions have been updated.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }, 1500);
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
            <Text style={styles.headerTitle}>Who can send you messages?</Text>
            <View style={{ width: 40 }} /> 
          </View>

          {/* OPTIONS LIST */}
          <View style={styles.optionsContainer}>
            
            <PermissionOption 
              label="Everyone"
              description="Anyone can send you messages."
              value="everyone"
              currentValue={permission}
              onSelect={setPermission}
            />

            <PermissionOption 
              label="Friends Only"
              description="Only people you follow can send you messages."
              value="friends"
              currentValue={permission}
              onSelect={setPermission}
            />


          </View>

          <View style={styles.footerFlexSpacer} />

          {/* SAVE BUTTON */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.saveButton, isLoading && { opacity: 0.7 }]} 
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </StudentSettingsWrapper>
  );
}

// REUSABLE COMPONENT FOR OPTIONS
function PermissionOption({ label, description, value, currentValue, onSelect }) {
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
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
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
    flex: 1,
    paddingLeft: 16,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  optionsContainer: {
    padding: 16,
    gap: 12,
    marginTop: 10,
  },
  optionRow: {
    width: '100%',
    maxWidth: 358,
    minHeight: 80, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(49, 106, 161, 0.3)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  selectedBorder: {
    borderColor: '#146CC7',
    backgroundColor: 'rgba(19, 128, 236, 0.1)',
  },
  textStack: { flex: 1, paddingRight: 10 },
  optionLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  optionSubtext: {
    color: '#75A5D0',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#316AA1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: { borderColor: '#146CC7' },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#146CC7',
  },
  footerFlexSpacer: { flex: 1, minHeight: 100 },
  buttonContainer: { width: '100%', alignItems: 'center', paddingBottom: 20 },
  saveButton: {
    width: 358, 
    height: 52,
    backgroundColor: '#146CC7',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});