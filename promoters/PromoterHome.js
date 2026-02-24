import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import itveLogo from '../assets/itve-logo.png';
import annaAvatar from '../assets/anna-avatar.png';
import annaPost from '../assets/anna-post.png';
import ecowearAvatar from '../assets/ecowear-avatar.png';
import ecowearPost from '../assets/ecowear-post.png';
import daveAvatar from '../assets/dave-avatar.png';
import davePost from '../assets/dave-avatar.png';
import notificationIcon from '../assets/notification-icon.png';

import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';
import BottomNavigation from './components/BottomNavigation';
import StatusBar from './StatusBar';

const postsData = [
  {
    id: '1',
    username: 'wanderlust_anna',
    timeAgo: '2h ago',
    isVerified: true,
    verifiedColor: 'green',
    likes: 1204,
    caption:
      'Woke up to this incredible view. Feeling so grateful for moments like these. ✨',
    comments: 88,
    avatar: annaAvatar,
    image: annaPost,
  },
  {
    id: '2',
    username: 'EcoWear',
    isVerified: true,
    verifiedColor: 'red',
    likes: 4512,
    caption:
      'Embrace adventure with our new line of sustainable outdoor gear. Built for nature, by nature.',
    comments: 0,
    isSponsored: true,
    learnMore: true,
    avatar: ecowearAvatar,
    image: ecowearPost,
  },
  {
    id: '3',
    username: 'foodie_dave',
    timeAgo: '8h ago',
    isVerified: true,
    verifiedColor: 'green',
    likes: 634,
    caption:
      'Homemade pasta night was a success! 🍝 Who wants the recipe?',
    comments: 42,
    avatar: daveAvatar,
    image: davePost,
  },
];

const PromoterHome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Image source={itveLogo} style={styles.logo} />
          <Text style={styles.logoText}>ITVE</Text>
        </View>

        <View style={styles.topActions}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
              <Path
                d="M16 16L20 20"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image source={notificationIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FEED */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {postsData.map(post => (
          <View key={post.id} style={styles.postContainer}>
            {/* HEADER */}
            <View style={styles.postHeader}>
              <View style={styles.postUser}>
                <Image source={post.avatar} style={styles.avatar} />

                <View>
                  <View style={styles.usernameRow}>
                    <Text style={styles.username}>
                      {post.username}
                    </Text>

                    {post.isVerified && (
                      <View
                        style={[
                          styles.verifiedDot,
                          {
                            backgroundColor:
                              post.verifiedColor === 'green'
                                ? '#22C55E'
                                : '#EF4444',
                          },
                        ]}>
                        <Svg width={10} height={10} viewBox="0 0 10 10">
                          <Path
                            d="M2 5L4 7L8 3"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </Svg>
                      </View>
                    )}
                  </View>

                  <Text style={styles.time}>
                    {post.isSponsored ? 'Sponsored' : post.timeAgo}
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <Svg width={20} height={20} viewBox="0 0 20 20">
                  <Circle cx="4" cy="10" r="1.5" fill="white" />
                  <Circle cx="10" cy="10" r="1.5" fill="white" />
                  <Circle cx="16" cy="10" r="1.5" fill="white" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* IMAGE */}
            <Image source={post.image} style={styles.postImage} />

            {/* ACTIONS */}
            <View style={styles.actions}>
              <View style={styles.leftActions}>
                <TouchableOpacity>
                  <Svg width={24} height={24} viewBox="0 0 24 24">
                    <Path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </Svg>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Svg width={24} height={24} viewBox="0 0 24 24">
                    <Path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </Svg>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Svg width={24} height={24} viewBox="0 0 24 24">
                    <Path
                      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Svg width={24} height={24} viewBox="0 0 24 24">
                  <Path
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* CAPTION */}
            <View style={styles.captionContainer}>
              <Text style={styles.likes}>
                {post.likes.toLocaleString()} likes
              </Text>

              <Text style={styles.caption}>
                <Text style={styles.captionUsername}>
                  {post.username}{' '}
                </Text>
                {post.caption}
              </Text>

              {post.learnMore && (
                <Text style={styles.learnMore}>Learn More</Text>
              )}

              {post.comments > 0 && (
                <Text style={styles.comments}>
                  View all {post.comments} comments
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* <BottomNavigation /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },

  postContainer: {
    marginBottom: 16,
  },

  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  verifiedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  time: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },

  postImage: {
    width: '100%',
    height: 350,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  leftActions: {
    flexDirection: 'row',
    gap: 18,
  },

  captionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  likes: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },

  caption: {
    color: '#FFFFFF',
  },

  captionUsername: {
    fontWeight: '600',
  },

  learnMore: {
    color: '#F87171',
    marginTop: 4,
  },

  comments: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
});

export default PromoterHome;