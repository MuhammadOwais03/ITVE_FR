import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Domain() {
  const navigation = useNavigation();
  const [domain, setDomain] = useState('');

  const handleAddDomain = () => {
    if (domain.trim() === '') {
      Alert.alert("Error", "Please enter domain name");
      return;
    }

    // Here you would typically save to your backend/state
    // Then navigate back to courses screen
    navigation.navigate('Courses');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Add Domain</Text>
            <View style={{ width: 32 }} /> 
          </View>

          <View style={styles.content}>
            {/* Domain Input - Only one input field */}
            <TextInput
              style={styles.input}
              placeholder="Enter Domain Name"
              placeholderTextColor="#777"
              value={domain}
              onChangeText={setDomain}
            />
          </View>

          {/* Add Button */}
          <TouchableOpacity 
            style={styles.addBtn} 
            onPress={handleAddDomain}
            activeOpacity={0.7}
          >
            <Text style={styles.addBtnText}>Add Domain</Text>
          </TouchableOpacity>

          <View style={{ height: 110 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { flexGrow: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 55,
    marginBottom: 40,
  },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  content: { paddingHorizontal: 25 },
  input: {
    backgroundColor: '#000',
    borderWidth: 1.5,
    borderColor: '#333',
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 25,
    color: 'white',
    fontSize: 18,
    marginBottom: 25,
  },
  addBtn: {
    backgroundColor: '#1565C0',
    height: 70,
    borderRadius: 35,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});