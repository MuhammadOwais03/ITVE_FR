import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, StatusBar, Platform, Modal, Image, ScrollView,
  Dimensions, Animated, Easing, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Responsive utility
const isSmallDevice = width < 375;

const ReportProblem = () => {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [checkmarkAnim] = useState(new Animated.Value(0));

  const startAnimations = () => {
    scaleAnim.setValue(0);
    checkmarkAnim.setValue(0);
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(checkmarkAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowModal(true);
      startAnimations();
    }
  };

  const validateForm = () => {
    return subject.trim() !== '' && 
           description.trim() !== '' && 
           name.trim() !== '' && 
           email.trim() !== '' && 
           validateEmail(email);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleModalClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowModal(false);
      setSubject('');
      setDescription('');
      setName('');
      setEmail('');
      setImages([]);
    });
  };

  const checkmarkScale = checkmarkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const isSubmitEnabled = validateForm();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report a problem</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.instructionText}>
            Please fill in all required fields below. Our support team will get back to you as soon as possible.
          </Text>

          {/* Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Name <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter your full name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.inputField}
              placeholder="your.email@example.com"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.length > 0 && !validateEmail(email) && (
              <Text style={styles.errorText}>Please enter a valid email address</Text>
            )}
          </View>

          {/* Subject Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Subject <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.inputField}
              placeholder="Brief description of the issue"
              placeholderTextColor="#666"
              value={subject}
              onChangeText={setSubject}
              maxLength={100}
            />
            <Text style={styles.charCount}>{subject.length}/100</Text>
          </View>

          {/* Description Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Detailed Description <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={[styles.inputField, styles.textArea]}
              multiline
              placeholder="Describe the problem in detail..."
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          <Text style={styles.sectionTitle}>Attach files</Text>

          <TouchableOpacity 
            style={styles.uploadBox} 
            onPress={pickImage}
            activeOpacity={0.8}
          >
            <View style={styles.uploadIconContainer}>
              <Ionicons name="cloud-upload-outline" size={isSmallDevice ? 28 : 32} color="#888" />
            </View>
            <Text style={styles.uploadTitle}>Tap to upload files</Text>
            
            {images.length > 0 && (
              <View style={styles.imagesContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageScrollView}
                >
                  <View style={styles.imagePreviewRow}>
                    {images.map((uri, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.previewImage} />
                        <TouchableOpacity 
                          style={styles.removeBadge} 
                          onPress={() => removeImage(index)}
                        >
                          <Ionicons name="close-circle" size={20} color="#FF4757" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            <View style={styles.uploadButton}>
              <Ionicons name="attach" size={18} color="white" style={styles.attachIcon} />
              <Text style={styles.uploadButtonText}>Choose Files</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.footerSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            isSubmitEnabled ? styles.submitButtonEnabled : styles.submitButtonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={!isSubmitEnabled}
          activeOpacity={0.9}
        >
          <Text style={styles.submitButtonText}>Submit Report</Text>
          <Ionicons name="paper-plane-outline" size={20} color="white" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: scaleAnim }],
                opacity: scaleAnim,
              },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <View style={styles.successIconContainer}>
                    <Animated.View style={[styles.successIconCircle, { transform: [{ scale: checkmarkScale }] }]}>
                      <Ionicons name="checkmark" size={40} color="white" />
                    </Animated.View>
                    <View style={styles.pulseRing1} />
                  </View>
                </View>

                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>Report Submitted!</Text>
                  <View style={styles.successDivider} />
                  <Text style={styles.modalSubtitle}>
                    Thank you, {name}. Your report has been received and our team will review it within 24-48 hours.
                  </Text>

                  <View style={styles.detailsBox}>
                    <Text style={styles.detailsTitle}>Submission Details:</Text>
                    <View style={styles.detailRow}>
                      <Ionicons name="document-text-outline" size={16} color="#00CCFF" />
                      <Text numberOfLines={1} style={styles.detailText}><Text style={styles.detailLabel}>Subject:</Text> {subject}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="mail-outline" size={16} color="#00CCFF" />
                      <Text numberOfLines={1} style={styles.detailText}><Text style={styles.detailLabel}>Sent to:</Text> {email}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleModalClose}>
                    <Text style={styles.modalPrimaryText}>Return to App</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  keyboardAvoidView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
  scrollContent: { padding: 20, paddingBottom: 120 },
  instructionText: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 25 },
  inputContainer: { marginBottom: 20 },
  inputLabel: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  requiredStar: { color: '#FF4757' },
  inputField: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  textArea: { height: 120 },
  charCount: { color: '#888', fontSize: 12, textAlign: 'right', marginTop: 5 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginTop: 10 },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#444',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  uploadTitle: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 15 },
  imagesContainer: { width: '100%', marginBottom: 15 },
  imageScrollView: { maxHeight: 80 },
  imagePreviewRow: { flexDirection: 'row' },
  imageWrapper: { marginRight: 10, position: 'relative' },
  previewImage: { width: 60, height: 60, borderRadius: 8 },
  removeBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#121212', borderRadius: 10 },
  uploadButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButtonText: { color: 'white', fontWeight: 'bold' },
  attachIcon: { marginRight: 8 },
  footer: {
    position: 'absolute',
    bottom: 0, width: '100%',
    backgroundColor: '#121212',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonEnabled: { backgroundColor: '#00CCFF' },
  submitButtonDisabled: { backgroundColor: '#2A2A2A' },
  submitButtonText: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  submitIcon: { marginLeft: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: { width: '90%', maxWidth: 400 },
  modalScroll: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40 },
  modalCard: {
    backgroundColor: '#194470',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 20,
  },
  modalHeader: { paddingVertical: 30, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' },
  successIconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#00CCFF', justifyContent: 'center', alignItems: 'center', zIndex: 2
  },
  pulseRing1: {
    position: 'absolute', width: 100, height: 100,
    borderRadius: 50, borderWidth: 2, borderColor: 'rgba(0,204,255,0.3)'
  },
  modalBody: { padding: 25 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  successDivider: { width: 50, height: 4, backgroundColor: '#00CCFF', alignSelf: 'center', marginVertical: 15, borderRadius: 2 },
  modalSubtitle: { color: 'white', textAlign: 'center', marginBottom: 20, opacity: 0.9 },
  detailsBox: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 15, marginBottom: 20 },
  detailsTitle: { color: 'white', fontWeight: 'bold', marginBottom: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  detailText: { color: 'white', marginLeft: 10, fontSize: 13 },
  detailLabel: { color: '#00CCFF', fontWeight: '600' },
  modalPrimaryButton: { backgroundColor: '#00CCFF', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  modalPrimaryText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  footerSpacer: { height: 40 },
  errorText: { color: '#FF4757', fontSize: 12, marginTop: 4 }
});

export default ReportProblem;
