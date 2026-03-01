import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import StatusBar from './StatusBar';
import dollarIcon from '../assets/dollar-icon.png';
import BottomNavigation from './components/BottomNavigation';

const institutesData = [
  { id: 'abc-school', name: 'ABC School', code: 'abcs', classes: [{ name: 'Class 10', code: 'abcs10' }, { name: 'Class 9', code: 'abcs09' }, { name: 'Class 8', code: 'abcs08' }] },
  { id: 'abc-college', name: 'ABC College', code: 'abcc', classes: [{ name: 'Pre Engineering 12', code: 'abcceng2' }, { name: 'Pre Medical 12', code: 'abccmed2' }, { name: 'Commerce 12', code: 'abcccom2' }] },
];

const InstitutesScreen = () => {
  const [expandedInstitutes, setExpandedInstitutes] = useState(['abc-school', 'abc-college']);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleInstitute = (id) => {
    setExpandedInstitutes(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>PROMOTION</Text>
          <TouchableOpacity onPress={() => setShowAddModal(true)}>
            <Image source={{ uri: dollarIcon }} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.generateBtn} activeOpacity={0.8}>
          <Text style={styles.generateText}>Generate Promo</Text>
          <View style={styles.plusCircle}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </Svg>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 96, paddingHorizontal: 16 }}>
        {institutesData.map((institute) => {
          const isExpanded = expandedInstitutes.includes(institute.id);
          return (
            <View key={institute.id} style={styles.instituteBlock}>
              <TouchableOpacity onPress={() => toggleInstitute(institute.id)} style={styles.instituteHeader} activeOpacity={0.7}>
                <Text style={styles.instituteName}>{institute.name}</Text>
                <View style={styles.codeRow}>
                  <Text style={styles.codeText}>{institute.code}</Text>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}>
                    <Path d="M5 12.5L10 7.5L15 12.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </View>
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.classesContainer}>
                  {institute.classes.map((classItem, index) => (
                    <View key={index} style={[styles.classItem, index < institute.classes.length - 1 && styles.classBorder]}>
                      <Text style={styles.className}>{classItem.name}</Text>
                      <Text style={styles.classCode}>{classItem.code}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <BottomNavigation />
      {/* <AddInstituteModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} /> */} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerSection: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', letterSpacing: 0.5 },
  generateBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  generateText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16, letterSpacing: 0.5 },
  plusCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center' },
  list: { flex: 1 },
  instituteBlock: { marginBottom: 8 },
  instituteHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16 },
  instituteName: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  codeText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  classesContainer: {},
  classItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  classBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  className: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  classCode: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
});

export default InstitutesScreen;
