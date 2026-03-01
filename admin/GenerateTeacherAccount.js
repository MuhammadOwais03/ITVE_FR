import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Pressable, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DATA = [
  { label: 'Computer Science', value: '1' },
  { label: 'Mathematics', value: '2' },
  { label: 'Physics', value: '3' },
];

export default function GenerateTeacherAccount({ navigation }) {
  const [course, setCourse] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Dropdown visibility states
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const handleGenerate = () => {
    // Logic for generating account
    navigation.goBack(); // Return to previous screen
  };

  const showDropdown = (dropdownName, event) => {
    // Get the layout position of the pressed element
    event.target.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition({
        top: pageY + height + 5,
        left: pageX,
        width: width,
      });
      setActiveDropdown(dropdownName);
    });
  };

  const DropdownInput = ({ label, value, onPress }) => (
    <TouchableOpacity 
      style={styles.pillInput} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.inputText, value && { color: 'white' }]}>
        {value || label}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={24} color="#777" />
    </TouchableOpacity>
  );

  const DropdownMenu = ({ visible, options, onSelect, onClose }) => {
    if (!visible) return null;
    
    return (
      <>
        <Pressable style={styles.dropdownOverlay} onPress={onClose} />
        <View style={[styles.dropdownMenu, {
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
        }]}>
          <ScrollView 
            style={styles.dropdownScroll} 
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={styles.dropdownItemText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header - Fixed with proper status bar spacing */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Generate Teacher Account</Text>
          <View style={{ width: 32 }} /> 
        </View>

        <View style={styles.formContainer}>
          {/* Dropdown styled like Launch Course */}
          <DropdownInput 
            label="Select Course" 
            value={course ? DATA.find(d => d.value === course)?.label : null}
            onPress={(event) => showDropdown('course', event)} 
          />

          <TextInput
            style={styles.pillInput}
            placeholder="Username"
            placeholderTextColor="#777"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.pillInput}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Lifted Button - No absolute positioning */}
          <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
            <Text style={styles.btnText}>Generate Credentials</Text>
          </TouchableOpacity>
          
          {/* Bottom spacing to lift the button up */}
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>

      {/* Dropdown Menu */}
      <DropdownMenu 
        visible={activeDropdown === 'course'}
        options={DATA}
        onSelect={(item) => setCourse(item.value)}
        onClose={() => setActiveDropdown(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  scrollContent: { 
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 10 : 20,
    marginBottom: 30,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  formContainer: { 
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pillInput: {
    width: '100%', 
    height: 70, 
    borderRadius: 35, 
    borderWidth: 1.5, 
    borderColor: '#333',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 25, 
    marginBottom: 25, 
    backgroundColor: '#0a0a0a',
    color: 'white',
    fontSize: 16,
  },
  inputText: { 
    color: 'rgba(255,255,255,0.6)', 
    fontSize: 16 
  },
  generateBtn: {
    backgroundColor: '#8b0000',
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#8b0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  btnText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  
  // Dropdown Menu 
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#1f3b57',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    maxHeight: 200,
    zIndex: 1001,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
  },
});