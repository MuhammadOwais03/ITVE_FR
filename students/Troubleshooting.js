import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Troubleshooting = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  
  // Responsive calculations
  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  const basicSteps = [
    {
      id: 1,
      title: 'Check Internet Connection',
      description: 'Ensure you have a stable internet connection. Try switching between Wi-Fi and mobile data.',
      icon: 'wifi-outline'
    },
    {
      id: 2,
      title: 'Restart the App',
      description: 'Close the app completely and reopen it. This can resolve many temporary issues.',
      icon: 'refresh-outline'
    },
    {
      id: 3,
      title: 'Update the App',
      description: 'Make sure you\'re using the latest version from the App Store or Google Play Store.',
      icon: 'download-outline'
    },
    {
      id: 4,
      title: 'Clear App Cache',
      description: 'Clear the app cache from your device settings. This can resolve loading and performance issues.',
      icon: 'trash-outline'
    },
    {
      id: 5,
      title: 'Restart Your Device',
      description: 'Sometimes a simple device restart can resolve underlying system issues.',
      icon: 'power-outline'
    },
    {
      id: 6,
      title: 'Check Device Storage',
      description: 'Ensure you have sufficient storage space on your device (at least 500MB free).',
      icon: 'hardware-chip-outline'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={[
        styles.header,
        {
          paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
          paddingHorizontal: isMobile ? 20 : 30,
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Troubleshooting</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: isMobile ? 20 : 30,
            paddingBottom: 100,
            maxWidth: isDesktop ? 800 : '100%',
            alignSelf: 'center',
            width: '100%',
          }
        ]}
        showsVerticalScrollIndicator={!isMobile}
      >
        <Text style={[
          styles.mainTitle,
          { fontSize: isMobile ? 22 : 24 }
        ]}>
          Troubleshooting Guide
        </Text>

        <Text style={[
          styles.introText,
          { 
            fontSize: isMobile ? 14 : 15,
            lineHeight: isMobile ? 20 : 22,
            marginBottom: 30
          }
        ]}>
          Follow these basic troubleshooting steps to resolve common technical issues. 
          If the problem persists, use the "Report Problem" button at the bottom.
        </Text>

        {/* Basic Steps Section */}
        <Text style={[
          styles.sectionTitle,
          { fontSize: isMobile ? 18 : 20 }
        ]}>
          Basic Troubleshooting Steps
        </Text>

        <View style={styles.stepsContainer}>
          {basicSteps.map((step) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepIconContainer}>
                  <Ionicons name={step.icon} size={22} color="#00CCFF" />
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          ))}
        </View>

        {/* Report Problem Section */}
        <View style={styles.reportSection}>
          <View style={styles.reportCard}>
            <Ionicons name="help-circle-outline" size={50} color="#00CCFF" />
            <Text style={styles.reportTitle}>Still Having Issues?</Text>
            <Text style={styles.reportText}>
              If you've tried all the steps above and are still experiencing problems, 
              please report the issue to our support team.
            </Text>
            
            <TouchableOpacity 
              style={styles.reportButton}
              onPress={() => navigation.navigate('ReportProblemScreen')}
            >
              <Ionicons name="bug-outline" size={20} color="#FFFFFF" />
              <Text style={styles.reportButtonText}>Report Problem</Text>
            </TouchableOpacity>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Support Information:</Text>
              <Text style={styles.contactDetail}>Email: support@itve.com</Text>
              <Text style={styles.contactDetail}>Response Time: 24-48 hours</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 20,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  introText: {
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 18,
  },
  stepsContainer: {
    marginBottom: 40,
  },
  stepCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 204, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  stepDescription: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20,
  },
  reportSection: {
    marginTop: 20,
  },
  reportCard: {
    backgroundColor: 'rgba(0, 204, 255, 0.1)',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.2)',
  },
  reportTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  reportText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
  },
  reportButton: {
    backgroundColor: '#00CCFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  contactInfo: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 15,
  },
  contactTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  contactDetail: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    marginBottom: 5,
  },
});

export default Troubleshooting;
