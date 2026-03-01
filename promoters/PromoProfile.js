import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import sahilAvatar from '../assets/sahil-avatar.png';
import nedLogo from '../assets/ned-logo.png';
import pencilIcon from '../assets/pencil-icon.png';
import verifiedBadge from '../assets/verified-badge-red.png';
import achievement1 from '../assets/achievement-1.png';
import achievement2 from '../assets/achievement-2.png';
import achievement3 from '../assets/achievement-3.png';
import achievement4 from '../assets/achievement-4.png';
import achievement5 from '../assets/achievement-5.png';
import StatusBar from './StatusBar';
import BottomNavigation from './components/BottomNavigation';

const achievementImages = [achievement1, achievement2, achievement3, achievement4, achievement5];

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Username & Settings */}
        <View style={styles.headerRow}>
          <Text style={styles.username}>sahil_xoxo</Text>
          <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2">
            <Path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
            <Circle cx="12" cy="12" r="3"/>
          </Svg>
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Image source={{ uri: sahilAvatar }} style={styles.avatarImg} resizeMode="cover" />
            </View>
            <Image source={{ uri: verifiedBadge }} style={styles.verifiedBadge} />
          </View>
          <Text style={styles.name}>Sahil Kumar</Text>
          <Text style={styles.bio}>{"Hey I'm Sahil. I love Football.\nAnd you?"}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsBox}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Mentees</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>35</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>8</Text>
            <Text style={styles.statLabel}>Institutes</Text>
          </View>
        </View>

        {/* Info rows */}
        <View style={styles.infoSection}>
          {[
            { label: 'Students in Mentorship', value: '1490' },
            { label: 'School Ambassador', value: '10' },
            { label: 'College Ambassador', value: '10' },
          ].map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <View style={styles.infoBadge}>
                <Text style={styles.infoBadgeText}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={[styles.card, styles.achievementsCard]}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsRow}>
            {achievementImages.map((img, i) => (
              <View
                key={i}
                style={[styles.achievementCircle, {
                  marginLeft: i === 0 ? 0 : -12,
                  zIndex: achievementImages.length - i,
                }]}
              >
                <Image source={{ uri: img }} style={styles.achievementImg} resizeMode="cover" />
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.card}>
          <Image source={{ uri: pencilIcon }} style={styles.pencilIcon} />
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.eduRow}>
            <View style={styles.eduLogoBox}>
              <Image source={{ uri: nedLogo }} style={styles.eduLogo} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.eduName}>NED university</Text>
              <Text style={styles.eduDept}>Civil Engineering</Text>
            </View>
          </View>
        </View>

        {/* Languages */}
        <View style={styles.card}>
          <Image source={{ uri: pencilIcon }} style={styles.pencilIcon} />
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.langRow}>
            {['English', 'Urdu', 'Sindhi'].map((lang) => (
              <View key={lang} style={styles.langTag}>
                <Text style={styles.langText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={[styles.card, { marginBottom: 24 }]}>
          <Image source={{ uri: pencilIcon }} style={styles.pencilIcon} />
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locRow}>
            <View style={styles.locIcon}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="#EF4444">
                <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </Svg>
            </View>
            <Text style={styles.locText}>Karachi, Pakistan</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  avatarSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: '#e8d5c4',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  bio: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 40,
  },
  statsBox: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNum: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  infoBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: '#DC2626',
  },
  infoBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  achievementsCard: {
    marginTop: 24,
    backgroundColor: 'rgba(80,20,20,0.5)',
    overflow: 'hidden',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  achievementCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#00BFFF',
  },
  achievementImg: {
    width: '100%',
    height: '100%',
  },
  pencilIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 16,
    height: 16,
    opacity: 0.7,
  },
  eduRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eduLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eduLogo: {
    width: 40,
    height: 40,
  },
  eduName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  eduDept: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  langRow: {
    flexDirection: 'row',
    gap: 8,
  },
  langTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  langText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239,68,68,0.15)',
  },
  locText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});

export default ProfileScreen;
