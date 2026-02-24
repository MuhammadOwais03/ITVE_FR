import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar, 
  Platform, 
  Animated, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import StudentSettingsWrapper from './StudentSettingsWrapper'; 

// CUSTOM SWITCH
const CustomSwitch = ({ value, onValueChange, disabled }) => {
  const moveAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], 
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
    >
      <View style={[
        styles.switchTrack, 
        { backgroundColor: value ? '#1380EC' : '#3e3e3e' },
        disabled && { opacity: 0.5 }
      ]}>
        <Animated.View style={[
          styles.switchThumb, 
          { transform: [{ translateX }] }
        ]} />
      </View>
    </TouchableOpacity>
  );
};

export default function LinkedAccountsPage() {
  const navigation = useNavigation(); 
  
  //ACCOUNT STATES
  const [accounts, setAccounts] = useState({
    google: { connected: true, email: 'student.name@gmail.com', loading: false },
    apple: { connected: false, email: null, loading: false },
    institutional: { connected: false, email: null, loading: false }
  });


  const toggleAccount = (key, providerName) => {
    const isConnecting = !accounts[key].connected;

    if (isConnecting) {

      setAccounts(prev => ({ ...prev, [key]: { ...prev[key], loading: true } }));
      
      setTimeout(() => {
        setAccounts(prev => ({
          ...prev,
          [key]: { connected: true, email: `linked.${key}@school.edu`, loading: false }
        }));
        Alert.alert("Success", `${providerName} account connected successfully!`);
      }, 2000);
    } else {
      // Disconnect Confirmation
      Alert.alert(
        "Disconnect",
        `Are you sure you want to disconnect your ${providerName} account?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Disconnect", 
            style: "destructive", 
            onPress: () => {
              setAccounts(prev => ({
                ...prev,
                [key]: { connected: false, email: null, loading: false }
              }));
            }
          }
        ]
      );
    }
  };

  return (
    <StudentSettingsWrapper>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Linked Accounts</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <AccountCard 
          title="Google" 
          subtitle={accounts.google.connected ? accounts.google.email : "Not connected"}
          icon="google"
          lib="MaterialCommunityIcons"
          isEnabled={accounts.google.connected}
          isLoading={accounts.google.loading}
          onToggle={() => toggleAccount('google', 'Google')}
        />

        <AccountCard 
          title="Apple" 
          subtitle={accounts.apple.connected ? "Connected with Apple ID" : "Not connected"}
          icon="apple"
          lib="MaterialCommunityIcons"
          isEnabled={accounts.apple.connected}
          isLoading={accounts.apple.loading}
          onToggle={() => toggleAccount('apple', 'Apple')}
        />

        <AccountCard 
          title="Institutional Login" 
          subtitle={accounts.institutional.connected ? "University Portal Linked" : "Not connected"}
          icon="school-outline"
          lib="Ionicons"
          isEnabled={accounts.institutional.connected}
          isLoading={accounts.institutional.loading}
          onToggle={() => toggleAccount('institutional', 'University')}
        />

      </ScrollView>

      {/* FIXED BOTTOM BUTTON */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          activeOpacity={0.8}
          
        >
          <Text style={styles.addButtonText}>Add Other Account</Text>
        </TouchableOpacity>
      </View>
    </StudentSettingsWrapper>
  );
}

//CARD COMPONENT
function AccountCard({ title, subtitle, icon, lib, isEnabled, onToggle, isLoading }) {
  const IconComponent = lib === "Ionicons" ? Ionicons : MaterialCommunityIcons;

  return (
    <View style={[styles.card, isEnabled && styles.cardActive]}>
      <View style={styles.cardContent}>
        <View style={[styles.iconBox, isEnabled && styles.iconBoxActive]}>
          <IconComponent name={icon} size={24} color={isEnabled ? "#FFFFFF" : "rgba(255,255,255,0.4)"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={[styles.cardSubtitle, isEnabled && { color: '#9CBAA8' }]} numberOfLines={1}>
            {isLoading ? "Connecting..." : subtitle}
          </Text>
        </View>
      </View>
      
      {isLoading ? (
        <ActivityIndicator size="small" color="#1380EC" style={{ marginRight: 10 }} />
      ) : (
        <CustomSwitch value={isEnabled} onValueChange={onToggle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { 
    paddingHorizontal: 18, 
    paddingTop: 20, 
    paddingBottom: 150 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 72, 
    paddingHorizontal: 16 
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 18, 
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  card: {
    height: 100, 
    backgroundColor: 'rgba(31, 61, 90, 0.4)', 
    borderRadius: 24,           
    borderWidth: 1,             
    borderColor: 'rgba(255, 255, 255, 0.05)',   
    padding: 17,                
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,           
  },
  cardActive: {
    backgroundColor: '#1F3D5A',
    borderColor: 'rgba(19, 128, 236, 0.1)',
  },
  cardContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16, 
  },
  iconBoxActive: {
    backgroundColor: '#1380EC',
  },
  textContainer: { flex: 1 },
  cardTitle: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '600', 
  },
  cardSubtitle: { 
    color: 'rgba(255, 255, 255, 0.4)', 
    fontSize: 13, 
    marginTop: 2, 
  },
  footerContainer: {
    position: 'absolute',
    bottom: 30, 
    left: 17,   
    right: 17,  
  },
  addButton: {
    backgroundColor: 'rgba(19, 128, 236, 0.8)', 
    height: 56,                
    borderRadius: 28,          
    justifyContent: 'center',   
    alignItems: 'center',
    borderWidth: 1,          
    borderColor: 'rgba(255, 255, 255, 0.3)', 
  },
  addButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700', 
  },
  switchTrack: {
    width: 51,              
    height: 31,             
    borderRadius: 16,     
    padding: 2,             
    justifyContent: 'center',
  },
  switchThumb: {
    width: 27,              
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
});