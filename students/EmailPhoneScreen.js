import React, { useState, useEffect } from 'react'; 
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import StudentSettingsWrapper from './StudentSettingsWrapper'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Added AsyncStorage

export default function EmailPhoneManagement() {
  const navigation = useNavigation(); 
  
  //DYNAMIC STATES
  const [email, setEmail] = useState('student.name@school.edu');
  const [phone, setPhone] = useState('+92 333 3333333');
  const [isUpdating, setIsUpdating] = useState(false);

  // Load data when the screen opens
  useEffect(() => {
    const loadContactData = async () => {
      try {
        const savedContact = await AsyncStorage.getItem('@user_contact_info');
        if (savedContact) {
          const parsed = JSON.parse(savedContact);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.phone) setPhone(parsed.phone);
        }
      } catch (error) {
        console.log("Error loading contact data:", error);
      }
    };
    loadContactData();
  }, []);

  // Save data to storage
  const saveContactData = async () => {
    try {
      const dataToSave = { email, phone };
      await AsyncStorage.setItem('@user_contact_info', JSON.stringify(dataToSave));
    } catch (error) {
      console.log("Error saving contact data:", error);
    }
  };

  //DYNAMIC HANDLERS
  const handleUpdate = () => {
    // Simple Validation
    if (!email.includes('@')) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (phone.length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid phone number.");
      return;
    }

    setIsUpdating(true);

    // Simulate API Call and Save locally
    setTimeout(async () => {
      await saveContactData(); 
      setIsUpdating(false);
      Alert.alert(
        "Success", 
        "Your contact information has been updated.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  return (
    <StudentSettingsWrapper>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonSimple}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Email / Phone Management</Text>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputContainer}>
            
            {/* EMAIL SECTION */}
            <View style={styles.fieldGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.glassInput}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#3B82F6" style={styles.leftIcon} />
                <TextInput 
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <MaterialCommunityIcons name="pencil" size={20} color="#3B82F6" />
              </View>
            </View>

            {/* PHONE SECTION */}
            <View style={styles.fieldGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.glassInput}>
                <Ionicons name="call-outline" size={20} color="#3B82F6" style={styles.leftIcon} />
                <TextInput 
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <MaterialCommunityIcons name="pencil" size={20} color="#3B82F6" />
              </View>
            </View>

          </View>
        </ScrollView>

        {/* FIXED BOTTOM BUTTON */}
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={[styles.updateButton, isUpdating && { opacity: 0.7 }]} 
            activeOpacity={0.8}
            onPress={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.updateButtonText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </StudentSettingsWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 40,
    paddingBottom: 100 
  },
  
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 72, 
    paddingTop: 30, 
    paddingHorizontal: 16,
    width: '100%',
  },

  backButtonSimple: { 
    width: 24, 
    height: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute', 
    left: 16,
    zIndex: 10,
    top: 35, 
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 18, 
    textAlign: 'center',
    letterSpacing: -0.27,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Space Grotesk'
  },

  inputContainer: { 
    width: '100%', 
    gap: 24 
  }, 
  
  fieldGroup: { 
    height: 90, 
    justifyContent: 'space-between', 
    gap: 8 
  }, 
  
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 4,
  },

  glassInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 58, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 24,
    paddingHorizontal: 16,
  },

  leftIcon: { 
    marginRight: 12 
  },
  
  textInput: {
    flex: 1,
    color: '#FFFFFF', 
    fontSize: 16,
  },

  footerContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },

  updateButton: {
    backgroundColor: 'rgba(19, 128, 236, 0.8)', 
    height: 56,
    width: '100%',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', 
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    })
  },
  
  updateButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700', 
    letterSpacing: 0.24,
  },
});