import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StatusBar, 
  Platform, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import StudentSettingsWrapper from './StudentSettingsWrapper'; 

const API_BASE_URL = `${BACKEND_URL}/api/v1/students`;

export default function ChangePassword() {
  const navigation = useNavigation(); 

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Weak Password", "New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Mismatch", "New password and confirmation do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const payload = {
        old_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword
      };

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
        console.error("Password update failed:", JSON.stringify(errData, null, 2)); 
        
        const errorMessage = Array.isArray(errData.detail) 
          ? errData.detail[0].msg 
          : (errData.detail || "Failed to change password.");
          
        throw new Error(errorMessage);
      }

      Alert.alert(
        "Success", 
        "Your password has been changed successfully!", 
        [
          { text: "OK", onPress: () => navigation.goBack() }
        ]
      );
      
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StudentSettingsWrapper>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.webCenterWrapper}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Change password</Text>
            <View style={{ width: 40 }} /> 
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              
              {/* CURRENT PASSWORD */}
              <PasswordField 
                placeholder="Current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrent}
                toggleVisible={() => setShowCurrent(!showCurrent)}
                isVisible={showCurrent}
              />

              {/* NEW PASSWORD */}
              <PasswordField 
                placeholder="New password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                toggleVisible={() => setShowNew(!showNew)}
                isVisible={showNew}
              />

              {/* CONFIRM NEW PASSWORD */}
              <PasswordField 
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                toggleVisible={() => setShowConfirm(!showConfirm)}
                isVisible={showConfirm}
              />

            </View>
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* FOOTER */}
          <View style={styles.footerContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, isLoading && { opacity: 0.7 }]} 
              activeOpacity={0.8}
              onPress={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.actionButtonText}>Change Password</Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </StudentSettingsWrapper>
  );
}

// INPUT COMPONENT
function PasswordField({ placeholder, value, onChangeText, secureTextEntry, toggleVisible, isVisible }) {
  return (
    <View style={styles.rowSize}>
      <TextInput 
        placeholder={placeholder} 
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        secureTextEntry={secureTextEntry}
        style={styles.textInRow}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity onPress={toggleVisible}>
        <MaterialCommunityIcons 
          name={isVisible ? "eye" : "eye-off"} 
          size={20} 
          color="rgba(255, 255, 255, 0.5)" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  webCenterWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 10, 
    alignItems: 'center' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%',
    height: 72, 
    marginTop: Platform.OS === 'android' ? 20 : 10, 
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
  formContainer: { 
    width: '100%', 
    gap: 16, 
    marginTop: 20,
    alignItems: 'center'
  },
  rowSize: {
    width: '100%', 
    maxWidth: 358,
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#316AA1',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
  },
  textInRow: { 
    color: '#FFFFFF', 
    fontSize: 14,
    flex: 1,
  },
  footerContainer: {
    paddingBottom: 30,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  actionButton: {
    width: '100%',
    maxWidth: 358,
    height: 48, 
    backgroundColor: '#146CC7', 
    borderRadius: 24, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700', 
  },
});