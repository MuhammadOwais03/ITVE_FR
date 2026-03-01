import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import menteeAvatar from '../assets/mentee-avatar.png';
import dollarIcon from '../assets/dollar-icon.png';
import verifiedBadge from '../assets/verified-badge-blue.png';
import StatusBar from './StatusBar';
import BottomNavigation from './components/BottomNavigation';

const classesData = [
  { id: 'class-10', name: 'Class 10', code: 'abcs10', students: [
    { name: 'Ali', isVerified: true, hasRedStar: true }, { name: 'Ali', isVerified: true, hasRedStar: true },
    { name: 'Ali', isVerified: true, hasRedStar: true }, { name: 'Ali', isVerified: true, hasRedStar: true },
    { name: 'Ali', isVerified: true, hasRedStar: false }, { name: 'Ali', isVerified: true, hasRedStar: false },
    { name: 'Ali', isVerified: true, hasRedStar: false }, { name: 'Ali', isVerified: true, hasRedStar: false },
    { name: 'Ali', isVerified: false, hasRedStar: false },
  ]},
  { id: 'class-9', name: 'Class 9', code: 'abcs09', students: [] },
  { id: 'class-8', name: 'Class 8', code: 'abcs08', students: [] },
  { id: 'class-6', name: 'Class 6', code: 'abcs06', students: [] },
  { id: 'class-5', name: 'Class 5', code: 'abcs05', students: [] },
  { id: 'class-4', name: 'Class 4', code: 'abcs04', students: [] },
  { id: 'class-3', name: 'Class 3', code: 'abcs03', students: [] },
  { id: 'class-2', name: 'Class 2', code: 'abcs02', students: [] },
  { id: 'class-1', name: 'Class 1', code: 'abcs01', students: [] },
  { id: 'kg-3', name: 'Kinder Garden 3', code: 'abcs003', students: [] },
  { id: 'kg-2', name: 'Kinder Garden 2', code: 'abcs002', students: [] },
  { id: 'kg-1', name: 'Kinder Garden 1', code: 'abcs001', students: [] },
];

const MenteesScreen = () => {
  const [expandedClasses, setExpandedClasses] = useState(['class-10']);
  const toggleClass = (id) => {
    setExpandedClasses(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>MENTEES</Text>
          <Image source={{ uri: dollarIcon }} style={{ width: 40, height: 40 }} />
        </View>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 96 }}>
        {classesData.map((classItem) => {
          const isExpanded = expandedClasses.includes(classItem.id);
          return (
            <View key={classItem.id}>
              <TouchableOpacity onPress={() => toggleClass(classItem.id)} style={styles.classHeader} activeOpacity={0.7}>
                <Text style={styles.className}>{classItem.name}</Text>
                <View style={styles.codeRow}>
                  <Text style={styles.codeText}>{classItem.code}</Text>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}>
                    <Path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </View>
              </TouchableOpacity>
              {isExpanded && classItem.students.length > 0 && (
                <View style={styles.studentsContainer}>
                  {classItem.students.map((student, index) => (
                    <View key={index} style={[styles.studentRow, index < classItem.students.length - 1 && styles.studentBorder]}>
                      <View style={styles.studentInfo}>
                        <View style={styles.studentAvatar}>
                          <Image source={{ uri: menteeAvatar }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                        </View>
                        <View style={styles.studentNameRow}>
                          <Text style={[styles.studentName, index < 4 && { color: '#EF4444' }]}>{student.name}</Text>
                          {student.isVerified && <Image source={{ uri: verifiedBadge }} style={{ width: 20, height: 20 }} />}
                        </View>
                      </View>
                      {student.hasRedStar && (
                        <Svg width="16" height="16" viewBox="0 0 16 16" fill="#EF4444">
                          <Path d="M8 0L10.2 5.1L16 5.8L12 9.9L13 16L8 13.1L3 16L4 9.9L0 5.8L5.8 5.1L8 0Z"/>
                        </Svg>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerSection: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', letterSpacing: 0.5 },
  list: { flex: 1 },
  classHeader: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  className: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  codeText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  studentsContainer: {},
  studentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  studentBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  studentAvatar: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden' },
  studentNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  studentName: { fontWeight: '500', fontSize: 16, color: '#FFFFFF' },
});

export default MenteesScreen;
