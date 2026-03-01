import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, Modal, Pressable, Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function EditCourse() {
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Form state - Clean (No pre-filled data)
  const [formData, setFormData] = useState({
    mainDomain: '',
    mainCourse: '',
    subCourse: '',
    percentage: '',
    duration: '',
    totalLessons: '',
    totalQuizzes: '',
    totalTests: '',
    campus: '',
    courseLevel: '',
    modules: '',
    perWeekHours: '',
    advertisingRadius: '',
    introduction: ''
  });

  // Navigation Logic
  const handleSaveAndGoBack = () => {
    // Navigate back to your Courses screen
    navigation.navigate('Courses'); 
  };

  const handleDeleteAndGoBack = () => {
    setDeleteModalVisible(false);
    navigation.navigate('Courses');
  };

  // Reusable Dropdown Input
  const DropdownInput = ({ label, value, onPress }) => (
    <TouchableOpacity style={styles.pillInput} onPress={onPress}>
      <Text style={[styles.inputText, value && { color: 'white' }]}>
        {value || label}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={24} color="white" />
    </TouchableOpacity>
  );

  // Reusable Text Input
  const TextInputField = ({ placeholder, value, onChangeText, keyboardType }) => (
    <View style={styles.pillInput}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.4)"
        style={styles.textInputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

  // Reusable Lesson Block
  const LessonBlock = ({ number }) => (
    <View style={styles.lessonContainer}>
      <View style={styles.largePill}>
        <TextInput 
          placeholder={`Lesson No ${number} Description`} 
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={styles.textInputStyle}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.uploadPill}>
        <Text style={styles.inputText}>Update Content</Text>
        <MaterialCommunityIcons name="chevron-up" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back and Delete Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Edit Course</Text>
        
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.backBtn}>
          <MaterialCommunityIcons name="trash-can-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Fields */}
        <DropdownInput 
          label="Main Domain Name" 
          value={formData.mainDomain}
          onPress={() => {}} 
        />
        <DropdownInput 
          label="Main Course Name" 
          value={formData.mainCourse}
          onPress={() => {}} 
        />
        <DropdownInput 
          label="Sub-Course Name" 
          value={formData.subCourse}
          onPress={() => {}} 
        />
        <TextInputField 
          placeholder="% of Main Course" 
          value={formData.percentage}
          onChangeText={(text) => setFormData({...formData, percentage: text})}
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.pillInput}>
          <Text style={styles.inputText}>Change Picture</Text>
          <MaterialCommunityIcons name="chevron-up" size={24} color="white" />
        </TouchableOpacity>

        <TextInputField 
          placeholder="Duration (e.g., 2 Months)" 
          value={formData.duration}
          onChangeText={(text) => setFormData({...formData, duration: text})}
        />
        <TextInputField 
          placeholder="Total Lessons" 
          value={formData.totalLessons}
          onChangeText={(text) => setFormData({...formData, totalLessons: text})}
          keyboardType="numeric"
        />
        <TextInputField 
          placeholder="Total Quizzes" 
          value={formData.totalQuizzes}
          onChangeText={(text) => setFormData({...formData, totalQuizzes: text})}
          keyboardType="numeric"
        />
        <TextInputField 
          placeholder="Total Tests" 
          value={formData.totalTests}
          onChangeText={(text) => setFormData({...formData, totalTests: text})}
          keyboardType="numeric"
        />
        <DropdownInput 
          label="Campus" 
          value={formData.campus}
          onPress={() => {}} 
        />
        <DropdownInput 
          label="Course Level" 
          value={formData.courseLevel}
          onPress={() => {}} 
        />
        <TextInputField 
          placeholder="Modules" 
          value={formData.modules}
          onChangeText={(text) => setFormData({...formData, modules: text})}
        />
        <TextInputField 
          placeholder="Per Week Hours" 
          value={formData.perWeekHours}
          onChangeText={(text) => setFormData({...formData, perWeekHours: text})}
        />
        <DropdownInput 
          label="Advertising Radius" 
          value={formData.advertisingRadius}
          onPress={() => {}} 
        />

        <Text style={styles.label}>Introduction:</Text>
        <View style={styles.introBox}>
          <TextInput 
            multiline 
            style={styles.textInputStyle} 
            placeholder="Type here..." 
            placeholderTextColor="#444"
            value={formData.introduction}
            onChangeText={(text) => setFormData({...formData, introduction: text})}
          />
        </View>

        {/* Lessons Section */}
        <LessonBlock number="1" />
        <LessonBlock number="2" />

        {/* Save Button - Lifted higher with less bottom padding */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndGoBack}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setDeleteModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons name="alert-circle-outline" size={50} color="#FF4444" />
            </View>
            <Text style={styles.modalTitle}>Delete this course?</Text>
            <Text style={styles.modalMessage}>
              This action cannot be undone. The course will be permanently removed.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelBtn]}
                onPress={handleDeleteAndGoBack}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteBtn]}
                onPress={handleDeleteAndGoBack}
              >
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    marginTop: 55,
    marginBottom: 10,
  },
  backBtn: { 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerText: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  content: { 
    paddingHorizontal: 20, 
    paddingBottom: 20, // Reduced from 40 to 20 to lift button higher
  },
  pillInput: {
    width: '100%', 
    height: 60, 
    borderRadius: 30, 
    borderWidth: 1, 
    borderColor: '#333',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    marginBottom: 15, 
    backgroundColor: '#000'
  },
  largePill: {
    width: '100%', 
    height: 100, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#333',
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    marginBottom: 10, 
    backgroundColor: '#000'
  },
  uploadPill: {
    width: '100%', 
    height: 50, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#333',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    marginBottom: 15, // Reduced from 20 to 15
    backgroundColor: '#000'
  },
  inputText: { 
    color: 'rgba(255,255,255,0.6)', 
    fontSize: 16 
  },
  textInputStyle: { 
    color: 'white', 
    fontSize: 16, 
    textAlignVertical: 'top', 
    flex: 1 
  },
  label: { 
    color: 'white', 
    fontSize: 18, 
    marginBottom: 10, 
    marginTop: 10 
  },
  introBox: {
    width: '100%', 
    height: 120, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#333',
    padding: 15, 
    marginBottom: 15, // Reduced from 20 to 15
    backgroundColor: '#000'
  },
  lessonContainer: { 
    marginBottom: 10 
  },
  saveBtn: {
    backgroundColor: '#B20000', 
    height: 65, 
    borderRadius: 35,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 15,
    marginBottom: 100,
  },
  saveBtnText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  
  // Modal Styles
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.8)' 
  },
  modalContent: {
    width: width * 0.85, // Responsive width
    maxWidth: 340,
    backgroundColor: '#1f3b57', 
    borderRadius: 30, 
    padding: 25, 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalIcon: { 
    marginBottom: 15 
  },
  modalTitle: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  modalMessage: { 
    color: '#ccc', 
    fontSize: 14, 
    textAlign: 'center', 
    marginBottom: 20, 
    lineHeight: 20 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    gap: 10 
  },
  modalButton: { 
    flex: 0.48, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cancelBtn: { 
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: 'white' 
  },
  cancelBtnText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  deleteBtn: { 
    backgroundColor: '#FF4444' 
  },
  deleteBtnText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});