import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

//FUNCTION FOR DYNAMIC TIME 
const getRelativeTime = (timestamp) => {
  if (!timestamp || typeof timestamp !== 'number') return "now";
  
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  if (diffInSeconds < 60) return "now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w`;
};

const CommentsScreen = ({ visible, onClose, postImage, postId }) => {
  const [comment, setComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); 
  const [expandedComments, setExpandedComments] = useState({}); 
  const [allComments, setAllComments] = useState({});

  // 1. LOAD COMMENTS FROM STORAGE
  useEffect(() => {
    const loadComments = async () => {
      try {
        const saved = await AsyncStorage.getItem('@post_comments');
        if (saved) {
          setAllComments(JSON.parse(saved));
        }
      } catch (e) {
        console.log("Error loading comments", e);
      }
    };
    if (visible) loadComments();
  }, [visible]);

  // 2. SAVE COMMENTS TO STORAGE
  const saveToStorage = async (updatedData) => {
    try {
      await AsyncStorage.setItem('@post_comments', JSON.stringify(updatedData));
    } catch (e) {
      console.log("Error saving comments", e);
    }
  };

  const currentPostComments = allComments[postId] || [];

  const toggleLike = (commentId, replyId = null) => {
    const updatedAll = { ...allComments };
    const postComments = [...(updatedAll[postId] || [])];

    const updatedComments = postComments.map(c => {
      if (replyId && c.id === commentId) {
        return {
          ...c,
          replies: c.replies.map(r => 
            r.id === replyId ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
          )
        };
      } else if (!replyId && c.id === commentId) {
        return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
      }
      return c;
    });

    updatedAll[postId] = updatedComments;
    setAllComments(updatedAll);
    saveToStorage(updatedAll);
  };

  const handlePost = () => {
    if (!comment.trim() || !postId) return;
    
    const newComment = {
      id: Date.now(),
      username: "You",
      text: comment,
      avatar: null,
      time: Date.now(), // Store as timestamp number
      likes: 0,
      liked: false,
      replies: []
    };

    const updatedAll = {
      ...allComments,
      [postId]: [newComment, ...(allComments[postId] || [])]
    };

    setAllComments(updatedAll);
    saveToStorage(updatedAll);
    setComment("");
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !replyingTo || !postId) return;
    
    const updatedAll = { ...allComments };
    const postComments = (updatedAll[postId] || []).map(c => {
      if (c.id === replyingTo.id) {
        return {
          ...c,
          replies: [...c.replies, {
            id: Date.now(),
            username: "You",
            text: replyText,
            avatar: null,
            time: Date.now(), // Store as timestamp number
            likes: 0,
            liked: false
          }]
        };
      }
      return c;
    });

    updatedAll[postId] = postComments;
    setAllComments(updatedAll);
    saveToStorage(updatedAll);
    
    setExpandedComments(prev => ({ ...prev, [replyingTo.id]: true }));
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleRepliesVisibility = (id) => {
    setExpandedComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const CommentItem = ({ item, isReply = false, parentId = null }) => (
    <View style={[styles.commentItem, isReply && styles.replyItem]}>
      <Image 
        source={item.avatar || require("../assets/anna-avatar.png")} 
        style={[styles.avatarImage, isReply && { width: 24, height: 24, borderRadius: 12 }]} 
      />
      <View style={styles.commentContent}>
        <Text style={styles.usernameText}>{item.username}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
        
        <View style={styles.commentFooter}>
          <Text style={styles.footerText}>
            {getRelativeTime(item.time)}  •  {item.likes} likes  •  
          </Text>
          <TouchableOpacity onPress={() => {
            setReplyingTo(parentId ? {id: parentId, username: item.username} : item);
            setReplyText(`@${item.username} `);
          }}>
            <Text style={[styles.footerText, { fontWeight: '700' }]}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleLike(parentId || item.id, isReply ? item.id : null)}>
        <Ionicons 
          name={item.liked ? "heart" : "heart-outline"} 
          size={14} 
          color={item.liked ? "#FF3B30" : "#B3B3B3"} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainBackground}>
        <View style={styles.imageSection}>
          <Image 
            source={postImage ? { uri: postImage } : require('../assets/businessman.jpg')} 
            style={styles.mainImage} 
            resizeMode="cover" 
          />
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.commentContainer}>
          <View style={styles.dragHandle} />
          
          <View style={styles.ownerCommentSection}>
            <Image source={require("../assets/anna-avatar.png")} style={styles.inputProfilePicImage} />
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.textInput} 
                placeholder="Add a comment" 
                placeholderTextColor="#B3B3B3" 
                value={comment} 
                onChangeText={setComment} 
                multiline 
              />
            </View>
          </View>

          <View style={styles.emojiBar}>
            {['🙂', '😭', '👏', '👍'].map((e, i) => (
              <TouchableOpacity key={i} onPress={() => setComment(prev => prev + e)}>
                <Text style={{fontSize: 20}}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>Post</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <FlatList
            data={currentPostComments}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <CommentItem item={item} />
                {item.replies && item.replies.length > 0 && (
                  <TouchableOpacity style={styles.viewMoreBtn} onPress={() => toggleRepliesVisibility(item.id)}>
                    <View style={styles.viewMoreLine} />
                    <Text style={styles.viewMoreText}>
                      {expandedComments[item.id] ? "Hide replies" : `View ${item.replies.length} more replies`}
                    </Text>
                  </TouchableOpacity>
                )}
                {expandedComments[item.id] && item.replies && item.replies.map(r => (
                  <CommentItem key={r.id} item={r} isReply parentId={item.id} />
                ))}
              </View>
            )}
          />
        </View>

        {replyingTo && (
          <View style={styles.replyBarContainer}>
            <View style={styles.replyBarInfo}>
                <Text style={styles.replyingToText}>Replying to {replyingTo.username}</Text>
                <TouchableOpacity onPress={() => setReplyingTo(null)}><Ionicons name="close" size={16} color="white" /></TouchableOpacity>
            </View>
            <View style={styles.replyInputRow}>
                <TextInput style={styles.replyTextInput} value={replyText} onChangeText={setReplyText} autoFocus color="white" />
                <TouchableOpacity onPress={handleSendReply}>
                    <Ionicons name="paper-plane" size={22} color="#0095f6" />
                </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainBackground: { flex: 1, backgroundColor: "#000" },
  imageSection: { width: width, height: 288 },
  mainImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 50, left: 20 },
  commentContainer: { flex: 1, backgroundColor: "#262626", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -38 },
  dragHandle: { width: 40, height: 4, backgroundColor: '#B3B3B3', borderRadius: 2, alignSelf: 'center', marginTop: 12 },
  ownerCommentSection: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 30 },
  avatarImage: { width: 30, height: 30, borderRadius: 15 },
  inputProfilePicImage: { width: 44, height: 44, borderRadius: 22 },
  inputWrapper: { flex: 1, marginLeft: 13, minHeight: 100, borderWidth: 1, borderColor: '#656D94', borderRadius: 20, padding: 12 },
  textInput: { color: '#FFFFFF', fontSize: 14 },
  emojiBar: { flexDirection: 'row', backgroundColor: '#1E1E1E', borderRadius: 20, width: 200, height: 37, alignSelf: 'flex-end', marginRight: 20, marginTop: -120, justifyContent: 'space-around', alignItems: 'center', zIndex: 10 },
  postBtn: { backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 5, marginHorizontal: 33, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 90 },
  postBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#1E1E1E', marginVertical: 20 },
  commentItem: { flexDirection: 'row', alignItems: 'flex-start' },
  replyItem: { marginLeft: 45, marginTop: 15 },
  commentContent: { flex: 1, marginLeft: 10 },
  usernameText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  commentText: { color: '#fff', fontSize: 13, marginTop: 2 },
  commentFooter: { flexDirection: 'row', marginTop: 6 },
  footerText: { color: '#B3B3B3', fontSize: 11 },
  viewMoreBtn: { flexDirection: 'row', alignItems: 'center', marginLeft: 45, marginTop: 10 },
  viewMoreLine: { width: 20, height: 1, backgroundColor: '#555', marginRight: 10 },
  viewMoreText: { color: '#B3B3B3', fontSize: 12, fontWeight: '700' },
  replyBarContainer: { position: 'absolute', bottom: 0, width: width, backgroundColor: '#1a1a1a', padding: 15, borderTopWidth: 1, borderTopColor: '#333' },
  replyBarInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  replyingToText: { color: '#B3B3B3', fontSize: 12 },
  replyInputRow: { flexDirection: 'row', alignItems: 'center' },
  replyTextInput: { flex: 1, color: 'white', fontSize: 14 },
});

export default CommentsScreen;