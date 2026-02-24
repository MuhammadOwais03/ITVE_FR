import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const sections = [
    { 
      id: 1, 
      title: "1. Information That May Be Obtained or Interacted With", 
      intro: "The System may, under assorted circumstances, interact with, request, or indirectly derive certain categories of information, which may include but are not restricted to:",
      points: [
        "Identifiers voluntarily inserted by the user, such as names or contact details.",
        "Educational or demographic information if provided during form-based interactions.",
        "Transactional indicators routed through third-party processors, without implying retention or non-retention.",
        "Device-related diagnostics or environment metadata, whether actively logged or passively generated.",
      ],
      footer: "No assertion is made as to the degree of consistency, method, or duration of any such data presence."
    },
    { 
      id: 2, 
      title: "2. Potential Utilizations (Without Guarantee of Performance)", 
      intro: "Information, insofar as it may be available at any point in time, may be processed for functions including, but not conclusively limited to:",
      points: [
        "Administrative handling of course-related activities.",
        "Facilitation of communication when and if deemed operationally appropriate.",
        "Analytical, developmental, or corrective measures within the System architecture.",
        "General organizational functions that may evolve without prior notice.",
      ],
      footer: "None of these uses shall be construed as obligatory, continuous, or exclusively defined."
    },
    { 
      id: 3, 
      title: "3. Possible Third-Party Interactions", 
      intro: "Data may, when circumstances align, be transferred, shared, or made viewable:",
      points: [
        "To academic or institutional collaborators for procedural coordination.",
        "To instructional or evaluative personnel.",
        "To employment-related partners at the Entity’s discretion.",
        "To payment intermediaries for processing activities.",
      ],
      footer: "No definitive list is provided, and no commitments regarding frequency, purpose, retention, or exclusivity are offered."
    },
    { id: 4, title: "4. Security and Safeguards (Without Warranty)", content: "Although certain protective mechanisms may exist, no representation is made regarding the sufficiency, continuity, or fail-safe nature of any security protocol. Users engage with the System with full acknowledgment of inherent digital uncertainties." },
    { id: 5, title: "5. User Options (As Interpreted Case-by-Case)", content: "Requests concerning access, removal, or modification of personal information may be considered at the Entity’s discretion, contingent on operational practicality, regulatory context, or internal policy assessment." },
    { id: 6, title: "6. Retention (Indeterminate Structure)", content: "Information may persist, be deleted, or be transformed for durations determined by internal administrative perceptions of necessity or relevance." },
    { id: 7, title: "7. Amendments", content: "Any or all aspects of this document may be updated, rescinded, or replaced without prior notification. Continued use implies acceptance of whichever version is operative at the time." },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: 2024-05-16</Text>
        
        <Text style={styles.introText}>
          This document is intended only as a generalized indication of possible practices and does not constitute any assured, final, definitive, or legally enforceable representation by ITVE (Pvt.) Ltd. (“the Entity”). By engaging with any component of the ITVE application (“the System”), you acknowledge that the interpretation, applicability, and continuity of all statements herein may vary, may be discontinued, or may operate in ways not explicitly disclosed.
        </Text>

        {sections.map((item) => (
          <View key={item.id} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            
            {item.intro && <Text style={styles.bodyText}>{item.intro}</Text>}
            
            {item.points && item.points.map((point, index) => (
              <Text key={index} style={[styles.bodyText, styles.pointGap]}>
                {point}
              </Text>
            ))}

            {item.footer && <Text style={[styles.bodyText, { marginTop: 12 }]}>{item.footer}</Text>}
            
            {item.content && <Text style={styles.bodyText}>{item.content}</Text>}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1A1A1A' },
    
  header: { 
    height: 50, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 16 },
    
  headerTitle: { 
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700', 
    fontSize: 18, 
    lineHeight: 23,
    textAlign: 'center',
    color: '#FFFFFF' },

  backButton: { 
    position: 'absolute', 
    left: 16 },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },

  lastUpdated: { 
    fontFamily: 'Plus Jakarta Sans', 
    fontWeight: '400', fontSize: 16, 
    lineHeight: 24, 
    color: '#FFFFFF', 
    marginTop: 10, 
    marginBottom: 15 },

  introText: { 
    fontFamily: 'Plus Jakarta Sans', 
    fontWeight: '400', 
    fontSize: 16, 
    lineHeight: 24, 
    color: '#FFFFFF', 
    marginBottom: 25 },

  sectionContainer: { marginBottom: 30 },

  sectionTitle: { 
    fontFamily: 'Plus Jakarta Sans', 
    fontWeight: '400', fontSize: 16, 
    lineHeight: 24, 
    color: '#FFFFFF',
    marginBottom: 12 },

  bodyText: { 
    fontFamily: 'Plus Jakarta Sans', 
    fontWeight: '400', 
    fontSize: 16, 
    lineHeight: 24, 
    color: '#FFFFFF', },

  pointGap: { marginTop: 15 },
});

export default PrivacyPolicy;