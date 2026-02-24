import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  TextInput, StatusBar, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { BACKEND_URL } from '@env'; 
import StudentSettingsWrapper from './StudentSettingsWrapper'; 

const API_BASE_URL = `${BACKEND_URL}/api/v1/students`;

export default function DeactivateAccount() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('deactivate');
  const [reason, setReason] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason.trim()) {
      Alert.alert("Reason Required", "Please provide a reason before confirming.");
      return;
    }

    Alert.alert(
      "Confirm Action",
      `Are you sure you want to ${selectedOption} your account? You will be logged out.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes, I'm sure", 
          style: "destructive",
          onPress: executeStatusUpdate 
        }
      ]
    );
  };

  const executeStatusUpdate = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      // Map the UI selection to the backend Literal
      const targetStatus = selectedOption === 'deactivate' ? 'inactive' : 'deleted';

      const payload = {
        status: targetStatus,
        reason: reason.trim()
      };

      const response = await fetch(`${API_BASE_URL}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to update account status.");
      }

      // Success! Clear local user data
      await AsyncStorage.multiRemove(['userToken', '@user_profile']);

      Alert.alert(
        "Account Updated",
        `Your account has been successfully ${selectedOption}d.`,
        [
          { 
            text: "OK", 
            onPress: () => {
              // Reset navigation stack and send user back to Login
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Make sure 'Login' matches your login route name
              });
            }
          }
        ]
      );

    } catch (error) {
      console.error("Status Update Error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentSettingsWrapper>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Delete or deactivate account</Text>
        </View>
        
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Choose an option</Text>

        <View style={styles.body}>
          {/* DEACTIVATE OPTION CARD */}
          <TouchableOpacity 
            style={[styles.optionCard, selectedOption === 'deactivate' && styles.selectedCard]} 
            onPress={() => setSelectedOption('deactivate')}
            activeOpacity={0.8}
          >
            <View style={styles.radioRow}>
               <View style={[styles.radioOuter, selectedOption === 'deactivate' && styles.radioOuterSelected]}>
                  {selectedOption === 'deactivate' && <View style={styles.radioInner} />}
               </View>
               <View style={styles.textColumn}>
                  <Text style={styles.optionHeading}>Deactivate account</Text>
                  <Text style={styles.optionSubtext}>
                    This will temporarily disable your account. You can reactivate it anytime by logging back in.
                  </Text>
               </View>
            </View>
          </TouchableOpacity>

          {/* DELETE OPTION CARD */}
          <TouchableOpacity 
            style={[styles.optionCard, selectedOption === 'delete' && styles.selectedCard]} 
            onPress={() => setSelectedOption('delete')}
            activeOpacity={0.8}
          >
            <View style={styles.radioRow}>
               <View style={[styles.radioOuter, selectedOption === 'delete' && styles.radioOuterSelected]}>
                  {selectedOption === 'delete' && <View style={styles.radioInner} />}
               </View>
               <View style={styles.textColumn}>
                  <Text style={styles.optionHeading}>Delete account</Text>
                  <Text style={styles.optionSubtext}>
                    This will permanently remove your account and all associated data. This action cannot be undone.
                  </Text>
               </View>
            </View>
          </TouchableOpacity>

          {/* REASON INPUT BOX */}
          <View style={styles.reasonContainer}>
            <TextInput
              style={styles.reasonInput}
              value={reason}
              onChangeText={setReason} 
              placeholder={`Why do you want to ${selectedOption}?`}
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* CONFIRM BUTTON */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={[styles.confirmButton, isLoading && { opacity: 0.7 }]} 
            activeOpacity={0.9}
            onPress={handleConfirm} 
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </StudentSettingsWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 100, 
    alignItems: 'center', 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    height: 72, 
    left: 0,
    top: Platform.OS === 'ios' ? 0 : 10,
    zIndex: 10,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  headerTitleContainer: { flex: 1, alignItems: 'center' },
  headerTitle: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 18, 
    textAlign: 'center'
  },
  sectionTitle: { 
    width: '100%', 
    color: '#FFFFFF', 
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 23, 
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  body: { width: '100%', gap: 16 },
  optionCard: {
    width: '100%', 
    minHeight: 116,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedCard: {
    borderColor: '#084C8B', 
    backgroundColor: 'rgba(19, 128, 236, 0.1)', 
  },
  radioRow: { flexDirection: 'row', gap: 16 },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  radioOuterSelected: { borderColor: '#147FEB' },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#147FEB',
  },
  textColumn: { flex: 1 },
  optionHeading: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 14
  },
  optionSubtext: { 
    color: 'rgba(255, 255, 255, 0.5)', 
    fontWeight: '400', 
    fontSize: 14, 
    marginTop: 6,
    lineHeight: 18 
  },
  reasonContainer: {
    width: '100%',
    height: 144,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#14324F',
    padding: 12,
    marginTop: 8
  },
  reasonInput: { 
    flex: 1, 
    color: '#FFFFFF', 
    fontWeight: '400', 
    fontSize: 14 
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 48, 
    backgroundColor: '#146CC7',
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 16 
  }
});