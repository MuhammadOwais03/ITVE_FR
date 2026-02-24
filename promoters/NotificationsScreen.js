import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';
import StatusBar from './StatusBar';
import BottomNavigation from './components/BottomNavigation';
import sophiaAvatar from '../../assets/sophia-avatar.png';
import ethanAvatar from '../../assets/ethan-avatar.png';
import avaAvatar from '../../assets/ava-avatar.png';
import oliverAvatar from '../../assets/oliver-avatar.png';
import sophiaStudentAvatar from '../../assets/sophia-student-avatar.png';
import liamAvatar from '../../assets/liam-avatar.png';
import ethanStudentAvatar from '../../assets/ethan-student-avatar.png';
import avaStudentAvatar from '../../assets/ava-student-avatar.png';
import oliverStudentAvatar from '../../assets/oliver-student-avatar.png';

const socialToday = [
  { id: '1', user: 'Sophia', action: 'liked your post', time: '1h', avatar: sophiaAvatar },
  { id: '2', user: 'Ethan', action: 'commented on your post', time: '3h', avatar: ethanAvatar },
  { id: '3', user: 'Ava', action: 'followed you', time: '4h', avatar: avaAvatar },
  { id: '4', user: 'Oliver', action: 'accepted your request', time: '5h', avatar: oliverAvatar },
];

const achievements = [
  { id: '1', icon: 'trophy', message: 'Congratulations! Your have Achieved 2nd rank in Top Promoter season 4.', time: '2d' },
  { id: '2', icon: 'trophy', message: "Congratulations! You've received a bonus of 5,000 pkr.", time: '3d' },
  { id: '3', icon: 'star', message: 'You have unlocked', highlight: 'Top Performer Acheivemenet', time: '5d' },
  { id: '4', icon: 'trophy', message: "You've reached second position in the", time: '' },
];

const studentToday = [
  { id: '1', user: 'Sophia', action: 'secured ABC Scholarship', time: '1h', avatar: sophiaStudentAvatar, prefix: 'Hurray! ' },
  { id: '2', user: 'Liam', action: 'started AI Diploma Journey', time: '2h', avatar: liamAvatar },
  { id: '3', user: 'Ethan', action: 'secured job at AYASC pvt ltd', time: '3h', avatar: ethanStudentAvatar },
  { id: '4', user: 'Ava', action: 'completed her AI Diploma', time: '4h', avatar: avaStudentAvatar },
  { id: '5', user: 'Oliver', action: 'achieved 2nd position in AI Diploma', time: '5h', avatar: oliverStudentAvatar },
];

const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState('social');

  const renderNotifItem = (item, showPrefix) => (
    <View key={item.id} style={styles.notifRow}>
      <View style={styles.notifAvatar}>
        <Image source={{ uri: item.avatar }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>
      <View style={styles.notifContent}>
        <Text style={styles.notifText}>
          {showPrefix && <Text>{item.prefix}</Text>}
          <Text style={styles.notifBold}>{item.user}</Text> {item.action}
        </Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.titleRow}><Text style={styles.title}>Notifications</Text></View>

      <View style={styles.tabsRow}>
        {['social', 'student'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.tabActive]} activeOpacity={0.7}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 96, paddingHorizontal: 16 }}>
        {activeTab === 'social' ? (
          <>
            <Text style={styles.sectionLabel}>Today</Text>
            <View style={styles.notifList}>
              {socialToday.map(n => renderNotifItem(n, false))}
            </View>
            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>This Week</Text>
            <View style={styles.notifList}>
              {achievements.map(a => (
                <View key={a.id} style={styles.notifRow}>
                  <View style={styles.achieveIcon}>
                    {a.icon === 'trophy' ? (
                      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <Path d="M6 9H4.5C3.67 9 3 8.33 3 7.5V6C3 5.17 3.67 4.5 4.5 4.5H6" strokeLinecap="round"/>
                        <Path d="M18 9H19.5C20.33 9 21 8.33 21 7.5V6C21 5.17 20.33 4.5 19.5 4.5H18" strokeLinecap="round"/>
                        <Path d="M6 4.5H18V11C18 14.31 15.31 17 12 17C8.69 17 6 14.31 6 11V4.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                        <Path d="M12 17V20" strokeLinecap="round"/><Path d="M8 20H16" strokeLinecap="round"/>
                      </Svg>
                    ) : (
                      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
                      </Svg>
                    )}
                  </View>
                  <View style={styles.notifContent}>
                    <Text style={styles.notifText}>
                      {a.highlight ? <>{a.message} <Text style={styles.highlightText}>{a.highlight}</Text></> : a.message}
                    </Text>
                    {a.time ? <Text style={styles.notifTime}>{a.time}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>Today</Text>
            <View style={styles.notifList}>
              {studentToday.map(n => renderNotifItem(n, !!n.prefix))}
            </View>
            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>This Week</Text>
          </>
        )}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleRow: { alignItems: 'center', paddingVertical: 12 },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '600' },
  tabsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, marginBottom: 24 },
  tab: { paddingHorizontal: 24, paddingVertical: 8, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  tabActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  tabText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500' },
  tabTextActive: { color: '#FFFFFF' },
  list: { flex: 1 },
  sectionLabel: { color: '#FFFFFF', fontWeight: '600', fontSize: 16, marginBottom: 16 },
  notifList: { gap: 16 },
  notifRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notifAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', overflow: 'hidden' },
  notifContent: { flex: 1 },
  notifText: { color: '#FFFFFF', fontSize: 14 },
  notifBold: { fontWeight: '600' },
  notifTime: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  achieveIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  highlightText: { color: '#F87171' },
});

export default NotificationsScreen;
