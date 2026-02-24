import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import StudentSettingsWrapper from "./StudentSettingsWrapper"; 
import Navbar from "./components/Navbar"; 

// Avatar imports
import sophiaAvatar from "../assets/sophia-avatar.png";
import ethanAvatar from "../assets/ethan-avatar.png";
import avaAvatar from "../assets/ava-avatar.png";
import oliverAvatar from "../assets/oliver-avatar.png";
import sophiaStudentAvatar from "../assets/sophia-student-avatar.png";
import liamAvatar from "../assets/liam-avatar.png";
import ethanStudentAvatar from "../assets/ethan-student-avatar.png";
import avaStudentAvatar from "../assets/ava-student-avatar.png";
import oliverStudentAvatar from "../assets/oliver-student-avatar.png";

const socialNotificationsToday = [
  { id: '1', user: 'Sophia', action: 'liked your post', time: '1h', avatar: sophiaAvatar },
  { id: '2', user: 'Ethan', action: 'commented on your post', time: '3h', avatar: ethanAvatar },
  { id: '3', user: 'Ava', action: 'followed you', time: '4h', avatar: avaAvatar },
  { id: '4', user: 'Oliver', action: 'accepted your request', time: '5h', avatar: oliverAvatar },
];

const achievementNotifications = [
  { id: '1', icon: 'trophy', message: 'Congratulations! Your School has Achieved 2nd rank in Top School.', time: '2d' },
  { id: '2', icon: 'trophy', message: "Congratulations! You've received a partial scholarship", time: '3d' },
  { id: '3', icon: 'star', message: 'You have unlocked Top Performer Achievement.', time: '5d' },
  { id: '4', icon: 'trophy', message: "You've reached second position in the", time: '6d' },
];

const studentNotificationsToday = [
  { id: '1', user: 'Sophia', action: 'secured ABC Scholarship', time: '1h', avatar: sophiaStudentAvatar },
  { id: '2', user: 'Liam', action: 'started AI Diploma Journey', time: '2h', avatar: liamAvatar },
  { id: '3', user: 'Ethan', action: 'secured job at AYASC pvt ltd', time: '3h', avatar: ethanStudentAvatar },
  { id: '4', user: 'Ava', action: 'completed her AI Diploma', time: '4h', avatar: avaStudentAvatar },
  { id: '5', user: 'Oliver', action: 'achieved 2nd position in AI Diploma', time: '5h', avatar: oliverStudentAvatar },
];

const NotificationsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('social');

  const renderSocialTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Today</Text>
      {socialNotificationsToday.map((item) => (
        <View key={item.id} style={styles.notificationRow}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.notificationText}>
              <Text style={{ fontWeight: '700' }}>{item.user}</Text> {item.action}
            </Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
      ))}

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>This Week</Text>
      {achievementNotifications.map((item) => (
        <View key={item.id} style={styles.notificationRow}>
          <View style={styles.achievementIconBox}>
             <Text style={{fontSize: 18}}>{item.icon === 'trophy' ? '🏆' : '⭐'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.notificationText}>
              {item.message.includes("Top Performer") ? (
                <>
                  {item.message.split("Top Performer")[0]}
                  <Text style={{ color: '#007FFF' }}>Top Performer</Text>
                  {item.message.split("Top Performer")[1]}
                </>
              ) : (
                item.message
              )}
            </Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderStudentTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Today</Text>
      {studentNotificationsToday.map((item) => (
        <View key={item.id} style={styles.notificationRow}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.notificationText}>
              {item.id === '1' ? (
                <Text style={{ color: '#FFFFFF' }}>
                  Hurray! <Text style={{ fontWeight: '400' }}>{item.user} {item.action}</Text>
                </Text>
              ) : (
                <Text>{item.user} {item.action}</Text>
              )}
            </Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <StudentSettingsWrapper>
      <View style={{ flex: 1 }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* HEADER SECTION */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.header}>Notifications</Text>
            <View style={{ width: 24 }} /> 
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'social' && styles.activeTab]}
              onPress={() => setActiveTab('social')}
            >
              <Text style={styles.tabText}>Social</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'school' && styles.activeTab]}
              onPress={() => setActiveTab('school')}
            >
              <Text style={styles.tabText}>School</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            {activeTab === 'social' ? renderSocialTab() : renderStudentTab()}
          </View>
        </ScrollView>

        {/* <Navbar navigation={navigation} activeTab="Home" /> */}
      </View>
    </StudentSettingsWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  backArrow: {
    padding: 5,
  },
  header: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontFamily: 'Plus Jakarta Sans', 
    fontWeight: '700', 
    textAlign: 'center' 
  },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 24 },
  tabButton: { width: 100, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  activeTab: { backgroundColor: '#0072DD' },
  tabText: { color: '#FFFFFF', fontFamily: 'Poppins', fontWeight: '700', fontSize: 16 },
  sectionTitle: { color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 18, marginBottom: 16 },
  notificationRow: { flexDirection: 'row', alignItems: 'center', minHeight: 72, paddingVertical: 8, gap: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  achievementIconBox: { width: 48, height: 48, backgroundColor: '#0054A4', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  textContainer: { flex: 1, justifyContent: 'center' },
  notificationText: { color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans', fontSize: 16, fontWeight: '500', lineHeight: 24 },
  notificationTime: { color: '#9CBAA8', fontFamily: 'Plus Jakarta Sans', fontSize: 14, marginTop: 2 },
});

export default NotificationsScreen;