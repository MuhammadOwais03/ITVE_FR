import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal, TextInput, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from './components/Navbar';

const { width } = Dimensions.get('window');

const ProfileWatcher = ({ navigation }) => {
  // --- STATE DATA ---
  const [work] = useState({ name: 'AYA Software & Co', role: 'Marketing Manager', img: require('../assets/company.png') });
  const [edu] = useState({ name: 'NED university', role: 'Civil Engineering', img: require('../assets/company.png') });
  const [interests] = useState(['Coding', 'Gaming', 'Reading', 'Hiking', 'Music']);
  const [skills] = useState(['Problem Solving', 'Teamwork', 'Communication', 'Leadership']);
  const [progLangs] = useState(['Python', 'Java', 'C++', 'JavaScript', 'HTML/CSS']);
  const [langs] = useState(['English', 'Urdu', 'Sindhi']);
  const [locationName] = useState('Karachi, Pakistan');

  const GlassCard = ({ children, style }) => <View style={[styles.glassBase, style]}>{children}</View>;

  const renderTagList = (title, data) => (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}><Text style={styles.cardTitle}>{title}</Text></View>
      <View style={styles.tagsContainer}>{data.map((s, i) => (<View key={i} style={styles.tag}><Text style={styles.tagText}>{s}</Text></View>))}</View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#194470', '#122D46', '#101A25']} style={StyleSheet.absoluteFill} />
      
      {/* HEADER WITH BACK AND MENU */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color="#fff" /></TouchableOpacity>
        <Text style={styles.username}>sahil_xoxo</Text>
        <TouchableOpacity><Ionicons name="ellipsis-horizontal" size={28} color="#fff" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150, alignItems: 'center' }}>
        <View style={styles.avatarContainer}><View style={styles.avatarBorder}><Image source={require('../assets/user.png')} style={styles.avatar} /><View style={styles.verifiedBadge}><MaterialCommunityIcons name="check-decagram" size={24} color="#00BFFF" /></View></View></View>
        <Text style={styles.name}>Sahil Kumar</Text>
        <Text style={styles.bio}>Hey I'm Sahil. I love Football.{"\n"}And you?</Text>

        {/* FOLLOW & MESSAGE BUTTONS */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.btnText}>Follow </Text>
            <MaterialCommunityIcons name="account-plus" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBtn}>
            <Text style={styles.btnText}>Message </Text>
            <MaterialCommunityIcons name="chat-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.statsContainer}>
          <View style={styles.statBox}><Text style={styles.statNumber}>12</Text><Text style={styles.statLabel}>Mentees</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>35</Text><Text style={styles.statLabel}>Friends</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>8</Text><Text style={styles.statLabel}>Mentors</Text></View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Achievements</Text></View>
          <View style={styles.achievementsRow}>{[1, 2, 3, 4, 5].map((i) => (<View key={i} style={styles.achievementCircle}><Image source={require('../assets/company.png')} style={styles.badgeIcon} /></View>))}</View>
        </GlassCard>

        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Working</Text></View>
          <View style={styles.workRow}><Image source={work.img} style={styles.companyLogo} /><View><Text style={styles.companyName}>{work.name}</Text><Text style={styles.role}>{work.role}</Text></View></View>
        </GlassCard>

        <GlassCard style={styles.educationCard}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Education</Text></View>
          <View style={styles.workRow}><Image source={edu.img} style={styles.companyLogo} /><View><Text style={styles.companyName}>{edu.name}</Text><Text style={styles.role}>{edu.role}</Text></View></View>
        </GlassCard>

        {renderTagList("Interests", interests)}
        {renderTagList("Skills", skills)}
        {renderTagList("Programming Languages", progLangs)}
        {renderTagList("Languages", langs)}

        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Location</Text></View>
          <View style={styles.locationRow}><View style={styles.locationIconWrapper}><Ionicons name="location" size={20} color="#00BFFF" /></View><Text style={styles.locationText}>{locationName}</Text></View>
        </GlassCard>
      </ScrollView>

      <Navbar activeTab="Profile" navigation={navigation} />
    </View>
  );
};

export default ProfileWatcher;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 50 },
  username: { color: '#fff', fontSize: 18, fontWeight: '500' },
  avatarContainer: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  avatarBorder: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#FFE4C4', justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  verifiedBadge: { position: 'absolute', bottom: 10, right: 5, backgroundColor: '#101A25', borderRadius: 15 },
  name: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center' },
  bio: { color: '#fff', fontSize: 14, textAlign: 'center', marginTop: 8, opacity: 0.8 },
  actionButtonsRow: { flexDirection: 'row', gap: 15, marginTop: 20, width: 340, justifyContent: 'center' },
  followBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  messageBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  glassBase: { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(18, 45, 70, 0.4)', overflow: 'hidden' },
  statsContainer: { width: 340, height: 86, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 25 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  card: { width: 340, padding: 20, marginTop: 20 },
  educationCard: { width: 340, padding: 20, marginTop: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardTitle: { color: '#fff', fontWeight: '600', fontSize: 18 },
  achievementsRow: { flexDirection: 'row', justifyContent: 'center' },
  achievementCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#fff', marginHorizontal: -5, borderWidth: 2, borderColor: '#00BFFF', justifyContent: 'center', alignItems: 'center' },
  badgeIcon: { width: 25, height: 25 },
  workRow: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: 50, height: 50, borderRadius: 12, marginRight: 15 },
  companyName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  role: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: 'rgba(0, 191, 255, 0.15)', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 6 },
  tagText: { color: '#fff', fontSize: 13 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationIconWrapper: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(0, 191, 255, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  locationText: { color: '#fff', fontSize: 15 }
});