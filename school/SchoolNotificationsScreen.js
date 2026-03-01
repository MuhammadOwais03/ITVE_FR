import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Platform,
  StatusBar 
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import SchoolSettingsWrapper from "./SchoolSettingsWrapper"; 
import BottomNavbar from "./components/BottomNavBar";

const { width } = Dimensions.get('window');

// Import your assets (kept as is)
import sophiaAvatar from "../assets/sophia-avatar.png";
import ethanAvatar from "../assets/ethan-avatar.png";
import avaAvatar from "../assets/ava-avatar.png";
import oliverAvatar from "../assets/oliver-avatar.png";
import liamAvatar from "../assets/liam-avatar.png";

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
];

const NotificationsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('social');

  // Logic remains the same, styling updated to green palette
  const renderNotification = (item, isAchievement = false) => (
    <View key={item.id} style={styles.notificationRow}>
      {isAchievement ? (
        <View style={styles.achievementIconBox}>
          <Text style={{ fontSize: 20 }}>{item.icon === 'trophy' ? '🏆' : '⭐'}</Text>
        </View>
      ) : (
        <Image source={item.avatar} style={styles.avatar} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{item.user}</Text> {item.action || item.message}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    < SchoolSettingsWrapper>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContainer}>
        
        {/* HEADER */}
        <View style={styles.topHeader}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 44 }} /> 
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Tabs - Green Theme */}
          <View style={styles.tabsContainer}>
            {['social', 'school'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.contentPadding}>
            <Text style={styles.sectionTitle}>Today</Text>
            {activeTab === 'social' 
              ? socialNotificationsToday.map((item) => renderNotification(item))
              : <Text style={styles.emptyText}>No school updates today.</Text>
            }

            <Text style={[styles.sectionTitle, { marginTop: 30 }]}>This Week</Text>
            {achievementNotifications.map((item) => renderNotification(item, true))}
          </View>
        </ScrollView>

        <BottomNavbar navigation={navigation} activeTab="SchoolNotificationsScreen" />
      </View>
    </SchoolSettingsWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#052401' // Deep Forest Green
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    paddingBottom: 10,
    backgroundColor: '#135821', // Lighter Green Header
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContent: { 
    paddingBottom: 120, 
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  activeTab: {
    backgroundColor: '#4CAF50', // Vibrant Green for Active Tab
    borderColor: '#4CAF50',
  },
  tabText: {
    color: '#88AA88',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  contentPadding: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#88AA88',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 15,
    letterSpacing: 1,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 88, 33, 0.3)', // Subdued green tint
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.1)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#094014',
  },
  achievementIconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#135821', // Mid green
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
  },
  userName: {
    fontWeight: '700',
    color: '#4CAF50', // Highlight user names with primary green
  },
  notificationTime: {
    color: 'rgba(136, 170, 136, 0.6)',
    fontSize: 11,
    marginTop: 4,
  },
  emptyText: {
    color: '#88AA88',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.6
  }
});

export default NotificationsScreen;