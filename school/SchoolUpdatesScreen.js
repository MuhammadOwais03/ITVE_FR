import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import BottomNavbar from "./components/BottomNavBar";

const { width } = Dimensions.get('window');

const SchoolUpdatesScreen = ({ navigation }) => {
  const [postText, setPostText] = useState("");
  const [updates, setUpdates] = useState([
    {
      id: '1',
      author: 'WHGS School',
      campus: '(Airport Campus)',
      date: '24/1/2026',
      time: '3:30 pm',
      content: 'School will be closed on the date of 30 January 2026. Thank you for your attention.',
      likes: 200,
      liked: false,
      shares: 200,
      views: '2.9K',
      hasImage: false,
      isVerified: true,
    },
    {
      id: '2',
      author: 'WHGS School',
      campus: '(Airport Campus)',
      date: '21/2/2026',
      time: '10:15 am',
      content: 'Join us for the Annual Sports Gala starting next Monday! 🏆 Registration for track and field events is now open.',
      // High-quality working URL
      image: 'https://images.unsplash.com/photo-1544422500-575889671952?auto=format&fit=crop&q=80&w=1000',
      likes: 150,
      liked: true,
      shares: 12,
      views: '1.2K',
      hasImage: true,
      isVerified: true,
    },
  ]);

  // --- IMPROVED CAMERA LOGIC ---
  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You need to allow camera access to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7, // Reduced quality slightly for faster loading
    });

    if (!result.canceled) {
      const photoUri = result.assets[0].uri;
      const now = new Date();
      
      // Create a new post immediately with the captured photo
      const photoPost = {
        id: Date.now().toString(),
        author: 'You',
        campus: '(Student)',
        date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        content: "New update from camera! 📸",
        image: photoUri, // The camera URI works with the image renderer below
        likes: 0,
        liked: false,
        shares: 0,
        views: '0',
        hasImage: true,
        isVerified: false,
      };
      
      setUpdates([photoPost, ...updates]);
      Alert.alert("Success", "Photo posted to the feed!");
    }
  };

  // --- LIKE LOGIC ---
  const toggleLike = (postId) => {
    setUpdates(prevUpdates => prevUpdates.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // --- SHARE LOGIC ---
  const handleShare = async (content) => {
    try {
      await Share.share({
        message: content || "Check out this update from WHGS School!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddPost = () => {
    if (postText.trim().length > 0) {
      const now = new Date();
      const newPost = {
        id: Date.now().toString(),
        author: 'You',
        campus: '(Student)',
        date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        content: postText,
        likes: 0,
        liked: false,
        shares: 0,
        views: '0',
        hasImage: false,
        isVerified: false,
      };
      setUpdates([newPost, ...updates]);
      setPostText("");
    }
  };

  const renderPost = (item) => (
    <View key={item.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarBorder}>
            <Image source={require("../assets/ethan-student-avatar.png")} style={styles.avatar} />
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.authorRow}>
              <Text style={styles.authorName}>{item.author}</Text>
              <Text style={styles.campusName}> {item.campus}</Text>
              {item.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={{ marginLeft: 4 }} />
              )}
            </View>
            <Text style={styles.postDate}>{item.date}   {item.time}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentArea}>
        {item.content ? <Text style={styles.contentText}>{item.content}</Text> : null}
        {item.hasImage && (
          <Image 
            // This logic handles Web URLs, Camera URIs, and Local assets
            source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
            style={styles.postImage} 
            resizeMode="cover" 
          />
        )}
      </View>

      <View style={styles.postFooter}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionItem} onPress={() => toggleLike(item.id)}>
            <Ionicons 
              name={item.liked ? "heart" : "heart-outline"} 
              size={20} 
              color={item.liked ? "#FF4B4B" : "#88AA88"} 
            />
            <Text style={[styles.actionText, item.liked && {color: "#FF4B4B"}]}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={() => handleShare(item.content)}>
            <Ionicons name="paper-plane-outline" size={18} color="#88AA88" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewCount}>
          <Text style={styles.actionText}>{item.views}</Text>
          <Ionicons name="eye-outline" size={18} color="#88AA88" style={{ marginLeft: 4 }} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#052401', '#094014']} style={styles.container}>
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>Updates</Text>

          <View style={styles.inputBarWrapper}>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={handleAddPhoto} style={styles.cameraIconBtn}>
                <Ionicons name="camera" size={22} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
              
              <TextInput
                placeholder="Write here"
                placeholderTextColor="rgba(255,255,255,0.4)"
                style={styles.input}
                value={postText}
                onChangeText={setPostText}
                selectionColor="#4CAF50"
              />

              {postText.length > 0 && (
                <TouchableOpacity onPress={handleAddPost} style={styles.postArrowBtn}>
                  <LinearGradient colors={['#135821', '#4CAF50']} style={styles.arrowCircle}>
                    <Ionicons name="arrow-up" size={20} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {updates.map((post) => renderPost(post))}
          </ScrollView>

        </SafeAreaView>
        <BottomNavbar navigation={navigation} activeTab="Post" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  inputBarWrapper: { paddingHorizontal: 15, marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: 30, paddingHorizontal: 15, height: 52, borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.2)' },
  input: { flex: 1, color: '#fff', fontSize: 15, marginHorizontal: 10 },
  cameraIconBtn: { padding: 5 },
  postArrowBtn: { paddingLeft: 5 },
  arrowCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 15, paddingBottom: 110 },
  postCard: { backgroundColor: 'rgba(19, 88, 33, 0.25)', borderRadius: 22, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.15)' },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarBorder: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#00CCFF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#052401' },
  authorName: { color: '#fff', fontWeight: '700', fontSize: 15 },
  campusName: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  postDate: { color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 2 },
  contentArea: { paddingHorizontal: 15, paddingBottom: 12 },
  contentText: { color: '#EEE', fontSize: 14, lineHeight: 20 },
  postImage: { width: '100%', height: 220, borderRadius: 15, marginTop: 5 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.05)' },
  leftActions: { flexDirection: 'row', gap: 18 },
  actionItem: { flexDirection: 'row', alignItems: 'center' },
  actionText: { color: '#88AA88', fontSize: 12, marginLeft: 6 },
  viewCount: { flexDirection: 'row', alignItems: 'center' }
});

export default SchoolUpdatesScreen;