import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "./components/BottomNavBar";
import Comments from "./SchoolComments";

const HomeScreen = ({ navigation }) => {
  // --- Dynamic Like State ---
  const [likedPosts, setLikedPosts] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Current user data
  const currentUser = {
    id: 'current_user_1',
    name: 'Your Name',
    avatar: null
  };

  // Sample post data with comments
  const posts = [
    {
      id: 'post1',
      username: 'wanderlust_anna',
      verified: true,
      time: '2h ago',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800',
      likes: 1204,
      caption: 'Woke up to this incredible view. Feeling so grateful. ✨',
      commentCount: 88,
      comments: [
        { 
          id: '1', 
          user: { id: 'user2', name: 'Amna', avatar: null },
          text: 'This view is absolutely breathtaking! Where is this?', 
          timestamp: Date.now() - 120000,
          likes: 12,
          likedBy: ['user3', 'user4', 'user5'],
          replies: [
            { 
              id: '1-1', 
              user: { id: 'user3', name: 'Ali', avatar: null },
              text: 'I think this is Switzerland!', 
              timestamp: Date.now() - 60000,
              likes: 3,
              likedBy: ['user2']
            }
          ]
        },
        { 
          id: '2', 
          user: { id: 'user4', name: 'Zain', avatar: null },
          text: 'The colors in this photo are amazing!', 
          timestamp: Date.now() - 300000,
          likes: 8,
          likedBy: ['user1', 'user3', 'user5'],
          replies: []
        },
      ]
    },
    {
      id: 'post2',
      username: 'Anna',
      verified: true,
      time: '3h ago',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800',
      likes: 950,
      caption: 'The aesthetic of these flowers is everything. 🌸',
      commentCount: 12,
      comments: [
        { 
          id: '3', 
          user: { id: 'user5', name: 'Sarah', avatar: null },
          text: 'These flowers are so beautiful! What camera did you use?', 
          timestamp: Date.now() - 900000,
          likes: 5,
          likedBy: ['user2'],
          replies: [
            { 
              id: '3-1', 
              user: { id: 'user6', name: 'Developer', avatar: null },
              text: 'Looks like professional photography!', 
              timestamp: Date.now() - 600000,
              likes: 2,
              likedBy: ['user5']
            }
          ]
        },
      ]
    },
    {
      id: 'post3',
      username: 'itx_Hamna',
      verified: true,
      time: '5h ago',
      image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800',
      likes: 3000,
      caption: 'Nature therapy is the best therapy. 🍃',
      commentCount: 150,
      comments: [
        { 
          id: '4', 
          user: { id: 'user7', name: 'Mike', avatar: null },
          text: 'This is my dream vacation spot!', 
          timestamp: Date.now() - 1200000,
          likes: 15,
          likedBy: ['user8', 'user9'],
          replies: []
        },
      ]
    },
  ];

  const stories = [
    { id: "your", name: "Your Story", image: require("../assets/story1.png") },
    { id: "1", name: "friend_1", image: require("../assets/story1.png") },
    { id: "2", name: "friend_2", image: require("../assets/story1.png") },
    { id: "3", name: "friend_3", image: require("../assets/story1.png") },
    { id: "4", name: "friend_4", image: require("../assets/story1.png") },
  ];

  const openComments = (postId) => {
    setCurrentPostId(postId);
    setShowComments(true);
  };

  const closeComments = () => {
    setShowComments(false);
    setCurrentPostId(null);
  };

  const getCurrentPost = () => posts.find(post => post.id === currentPostId);

  const handleAddComment = (newComment) => {
    console.log('New comment added:', newComment);
  };

  const handleLikeComment = (commentId, isReply, parentCommentId) => {
    console.log('Comment liked:', { commentId, isReply, parentCommentId });
  };

  const handleReplyToComment = (commentId, reply) => {
    console.log('Reply added:', { commentId, reply });
  };

  const renderPost = (post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={require("../assets/story1.png")} style={styles.profilePic} />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>
            {post.username} {post.verified && <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />}
          </Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={18} color="#88AA88" />
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => toggleLike(post.id)}>
          <Ionicons 
            name={likedPosts[post.id] ? "heart" : "heart-outline"} 
            size={26} 
            color={likedPosts[post.id] ? "#FF3B30" : "white"} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openComments(post.id)}>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
        <Ionicons name="paper-plane-outline" size={24} color="white" />
      </View>

      <Text style={styles.likes}>
        {(likedPosts[post.id] ? post.likes + 1 : post.likes).toLocaleString()} likes
      </Text>
      
      <Text style={styles.caption}>
        <Text style={styles.username}>{post.username} </Text>
        {post.caption}
      </Text>
      
      <TouchableOpacity onPress={() => openComments(post.id)}>
        <Text style={styles.comments}>View all {post.commentCount} comments</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#135821', '#094014', '#052401']} style={styles.container}>
      
      {/* 🔹 Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Image source={require("../assets/logo1.png")} style={styles.logo} />
          <Text style={styles.logoText}>ITVE</Text>
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate("SchoolSearch")} activeOpacity={0.7}>
            <Ionicons name="search" size={22} color="white" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SchoolMessagesScreen")} activeOpacity={0.7}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SchoolNotificationsScreen")} style={{ position: "relative" }} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={22} color="white" style={styles.icon} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔹 Stories Section */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map((story) => (
              <View key={story.id} style={styles.storyWrapper}>
                <LinearGradient colors={["#4CAF50", "#135821", "#88AA88"]} style={styles.storyRing}>
                  <Image source={story.image} style={styles.storyImage} />
                </LinearGradient>
                <Text style={styles.storyName}>{story.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 🔹 Render Posts */}
        {posts.map(renderPost)}

      </ScrollView>

      {/* 🔹 Dynamic Comments Modal (Already green themed) */}
      <Comments
        visible={showComments}
        onClose={closeComments}
        postId={currentPostId}
        initialComments={getCurrentPost()?.comments || []}
        currentUser={currentUser}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        onReplyToComment={handleReplyToComment}
      />

      <Navbar navigation={navigation} activeTab="Home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 55 : 40,
    paddingBottom: 10,
    backgroundColor: '#135821', // Match top gradient
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: { width: 50, height: 50, resizeMode: "contain" },
  logoText: { color: "white", fontSize: 22, fontWeight: "bold" },
  iconRow: { flexDirection: "row", alignItems: "center" },
  icon: { marginLeft: 18 },
  storiesContainer: { marginTop: 10, paddingHorizontal: 10 },
  storyWrapper: { alignItems: "center", marginRight: 15 },
  storyRing: { width: 68, height: 68, borderRadius: 34, alignItems: "center", justifyContent: "center", padding: 3 },
  storyImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: "#052401" },
  storyName: { color: "white", fontSize: 11, marginTop: 5 },
  postCard: { 
    marginTop: 15, 
    backgroundColor: "rgba(19, 88, 33, 0.3)", // Transparent forest green
    borderRadius: 15, 
    overflow: "hidden", 
    marginHorizontal: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)', // Soft green border
  },
  postHeader: { flexDirection: "row", alignItems: "center", padding: 12 },
  profilePic: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
  username: { color: "white", fontWeight: "700" },
  postTime: { color: "#88AA88", fontSize: 11 },
  postImage: { width: "100%", height: 350, resizeMode: "cover" },
  actionsRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 10, gap: 18 },
  likes: { color: "white", fontWeight: "600", paddingHorizontal: 12 },
  caption: { color: "#E0FFE0", paddingHorizontal: 12, paddingTop: 5, lineHeight: 18 },
  comments: { color: "#88AA88", fontSize: 13, paddingHorizontal: 12, paddingVertical: 10 },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
  },
});

export default HomeScreen;