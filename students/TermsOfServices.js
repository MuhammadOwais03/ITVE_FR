import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const TermsOfService = () => {
  const navigation = useNavigation();
  const sections = [
    { id: 1, title: "1. Access to the Service", content: "Any individual may interact with the Service unless otherwise restricted by technical, procedural, or discretionary considerations. No assurances regarding uninterrupted access, eligibility criteria, or continuity of service are expressed or implied." },
    { id: 2, title: "2. User Conduct (General Expectation Without Enforcement Obligation)", content: "Users are generally expected to refrain from activities that may impede the Service. However, the Entity retains full discretion in determining compliance, response, or consequences, with no duty to act in any specific manner." },
    { id: 3, title: "3. Courses, Sessions, and Instructional Activities", content: "The availability, structure, scheduling, duration, and nature of any course or instructional engagement remain subject to change, reinterpretation, or cancellation without obligation of explanation. Nothing in this document shall be construed as a guarantee of instruction, outcome, certification, skill acquisition, employment placement, or continuity of educational services." },
    { id: 4, title: "4. Payments and Financial Interactions", content: "Fees, contributions, or charges associated with any offering may apply depending on evolving operational factors. Such payments, once made, may or may not be eligible for reconsideration or refund, subject solely to internal determination." },
    { id: 5, title: "5. Job Placement and Outcomes (Explicit Non-Guarantee)", content: "Any references to assistance, support, or potential employment are purely indicative and do not constitute a promise, assurance, or obligation. No employment outcome of any kind is guaranteed." },
    { id: 6, title: "6. Intellectual Property", content: "Content accessible through the Service may fall under various proprietary protections. Redistribution is not permitted unless explicitly allowed, though exceptions may arise based on future policy variations." },
    { id: 7, title: "7. Suspension or Termination", content: "Accounts may be limited, modified, or terminated at any time, for reasons determined solely by the Entity, with no requirement for explanation, notice, or justification." },
    { id: 8, title: "8. Liability Limitation", content: "The Entity assumes no responsibility for losses, interruptions, inaccuracies, or damages, whether direct, indirect, incidental, consequential, or otherwise. Usage is undertaken entirely at the user’s discretion and risk." },
    { id: 9, title: "9. Governing Principles", content: "Interpretation and enforceability (if any) shall align generally with prevailing legal norms in Pakistan, though the Entity reserves the right to apply alternative interpretations should circumstances suggest such adaptation." },
    { id: 10, title: "10. Modifications", content: "These Terms may be altered, expanded, or replaced without prior notice. Continued use of the Service constitutes acceptance of the operative version." },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Title Section */}
        <Text style={styles.mainTitle}>ITVE APP TERMS OF SERVICE</Text>
        <Text style={styles.lastUpdated}>Last Updated: 2024-05-16</Text>

        {/* Sections Mapping */}
        {sections.map((item) => (
          <View key={item.id} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.bodyText}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', 
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans', 
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 23,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  mainTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  lastUpdated: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    lineHeight: 21,
    color: '#ADADAD',
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF',
  },
});

export default TermsOfService;