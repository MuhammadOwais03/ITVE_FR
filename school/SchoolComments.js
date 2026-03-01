import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Modal, FlatList, 
  TextInput, TouchableOpacity, KeyboardAvoidingView, 
  Platform, Image, Alert 
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const SchoolComments = ({ 
  visible, 
  onClose, 
  postId, // Dynamic post ID
  initialComments = [], // Initial comments from post
  currentUser = { id: 'user1', name: 'You', avatar: null }, // Current user
  onAddComment // Callback when comment is added
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState({}); // Track which replies are expanded

  // Toggle show/hide replies
  const toggleReplies = (commentId) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Initial comments with static data
  const initialFakeComments = [
    { 
      id: '1', 
      user: { id: 'user2', name: 'Sarah', avatar: null },
      text: 'These flowers are so beautiful! What camera did you use?', 
      timestamp: Date.now() - 900000, // 15 minutes ago
      likes: 5,
      likedBy: ['user2'],
      replies: [
        { 
          id: '1-1', 
          user: { id: 'user6', name: 'Developer', avatar: null },
          text: 'Looks like professional photography!', 
          timestamp: Date.now() - 600000, // 10 minutes ago
          likes: 2,
          likedBy: ['user5']
        }
      ]
    },
    { 
      id: '2', 
      user: { id: 'user4', name: 'Zain', avatar: null },
      text: 'Loving the dark theme and smooth animations! Can we get more color options?', 
      timestamp: Date.now() - 300000, // 5 minutes ago
      likes: 8,
      likedBy: ['user1', 'user3', 'user5'],
      replies: []
    },
    { 
      id: '3', 
      user: { id: 'user2', name: 'Amna', avatar: null },
      text: 'This UI is fire! 🔥 The gradient looks amazing!', 
      timestamp: Date.now() - 120000, // 2 minutes ago
      likes: 12,
      likedBy: ['user3', 'user4', 'user5'],
      replies: [
        { 
          id: '3-1', 
          user: { id: 'user3', name: 'Ali', avatar: null },
          text: 'Totally agree! The animations are smooth too!', 
          timestamp: Date.now() - 60000, // 1 minute ago
          likes: 3,
          likedBy: ['user2']
        },
        { 
          id: '3-2', 
          user: { id: 'user5', name: 'Sarah', avatar: null },
          text: 'Yes, please add purple theme! That would be awesome!', 
          timestamp: Date.now() - 300000, // 5 minutes ago
          likes: 1,
          likedBy: []
        }
      ]
    },
  ];

  // Initialize comments
  useEffect(() => {
    if (initialComments && initialComments.length > 0) {
      setComments(initialComments);
    } else {
      setComments(initialFakeComments);
    }
  }, [initialComments]);

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  // Check if current user liked the comment/reply
  const isLikedByCurrentUser = (item) => {
    return item.likedBy && item.likedBy.includes(currentUser.id);
  };

  // Handle comment like
  const handleLikeComment = (commentId, isReply = false, parentCommentId = null) => {
    const updatedComments = comments.map(commentItem => {
      if (isReply && parentCommentId) {
        // Handle reply like
        if (commentItem.id === parentCommentId) {
          const updatedReplies = commentItem.replies.map(reply => {
            if (reply.id === commentId) {
              const isLiked = isLikedByCurrentUser(reply);
              const updatedLikes = isLiked ? reply.likes - 1 : reply.likes + 1;
              const updatedLikedBy = isLiked 
                ? reply.likedBy.filter(id => id !== currentUser.id)
                : [...reply.likedBy, currentUser.id];
              
              return {
                ...reply,
                likes: updatedLikes,
                likedBy: updatedLikedBy
              };
            }
            return reply;
          });
          
          return { ...commentItem, replies: updatedReplies };
        }
      } else {
        // Handle comment like
        if (commentItem.id === commentId) {
          const isLiked = isLikedByCurrentUser(commentItem);
          const updatedLikes = isLiked ? commentItem.likes - 1 : commentItem.likes + 1;
          const updatedLikedBy = isLiked 
            ? commentItem.likedBy.filter(id => id !== currentUser.id)
            : [...commentItem.likedBy, currentUser.id];
          
          return {
            ...commentItem,
            likes: updatedLikes,
            likedBy: updatedLikedBy
          };
        }
      }
      return commentItem;
    });
    
    setComments(updatedComments);
  };

  // Add new comment
  const addComment = () => {
    if (comment.trim().length === 0) return;
    
    const newComment = {
      id: `comment_${Date.now()}`,
      user: currentUser,
      text: comment.trim(),
      timestamp: Date.now(),
      likes: 0,
      likedBy: [],
      replies: []
    };
    
    // Add to top
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    setComment("");
    
    // Callback to parent
    if (onAddComment) {
      onAddComment(newComment);
    }
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Render comment item
  const renderComment = (item, isReply = false, parentCommentId = null) => {
    const isLiked = isLikedByCurrentUser(item);
    const replyCount = item.replies?.length || 0;
    const showReplies = expandedReplies[item.id];
    
    return (
      <View style={[styles.commentItem, isReply && styles.replyItem]}>
        <View style={styles.commentHeader}>
          <View style={styles.avatarContainer}>
            {item.user.avatar ? (
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Text style={styles.avatarText}>{item.user.name[0]}</Text>
              </View>
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.commentUser}>{item.user.name}</Text>
            <Text style={styles.time}>{formatTimeAgo(item.timestamp)}</Text>
          </View>
          {/* Like button on right side */}
          <TouchableOpacity 
            style={styles.likeButtonRight}
            onPress={() => handleLikeComment(item.id, isReply, parentCommentId)}
            disabled={loading}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={18} 
              color={isLiked ? "#FF3366" : "#88AA88"} 
            />
            {item.likes > 0 && (
              <Text style={[styles.likeCountRight, isLiked && styles.likedText]}>
                {item.likes}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        
        <Text style={styles.commentText}>{item.text}</Text>
        
        <View style={styles.commentActions}>
          {!isReply && replyCount > 0 && (
            <TouchableOpacity 
              style={styles.showRepliesButton}
              onPress={() => toggleReplies(item.id)}
            >
              <View style={styles.replyLine} />
              <Ionicons 
                name={showReplies ? "chevron-up" : "chevron-down"} 
                size={14} 
                color="#4CAF50" 
                style={styles.chevronIcon}
              />
              <Text style={styles.showRepliesText}>
                {showReplies ? 'Hide' : 'View'} {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
              </Text>
            </TouchableOpacity>
          )}
          
          {/* Static Reply button (non-functional) */}
          {!isReply && (
            <TouchableOpacity style={styles.replyButton}>
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Render replies if expanded */}
        {!isReply && replyCount > 0 && showReplies && (
          <View style={styles.repliesContainer}>
            {item.replies.map(reply => (
              <View key={reply.id}>
                {renderComment(reply, true, item.id)}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal 
      animationType="slide" 
      transparent={true} 
      visible={visible} 
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.modalContainer}
      >
        <View style={styles.modalOverlay}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>Comments</Text>
            </View>
          </View>
          
          {/* Comments List */}
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                {renderComment(item)}
              </View>
            )}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="chatbubble-outline" size={60} color="#345e39" />
                <Text style={styles.emptyText}>No comments yet</Text>
                <Text style={styles.emptySubText}>Be the first to comment!</Text>
              </View>
            }
          />
          
          {/* Main Comment Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              {currentUser.avatar ? (
                <Image source={{ uri: currentUser.avatar }} style={styles.userAvatar} />
              ) : (
                <View style={[styles.userAvatar, styles.avatarFallback]}>
                  <Text style={styles.avatarText}>{currentUser.name[0]}</Text>
                </View>
              )}
              <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                placeholderTextColor="#88AA88"
                value={comment}
                onChangeText={setComment}
                multiline
                maxLength={500}
              />
              <TouchableOpacity 
                onPress={addComment}
                style={[
                  styles.sendButton,
                  (!comment.trim() || loading) && styles.sendButtonDisabled
                ]}
                disabled={!comment.trim() || loading}
              >
                {loading ? (
                  <Ionicons name="ellipsis-horizontal" size={24} color="#88AA88" />
                ) : (
                  <Ionicons 
                    name="send" 
                    size={24} 
                    color={comment.trim() ? "#4CAF50" : "#345e39"} 
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.charCount}>
              {comment.length}/500
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#052401', // Darkest green from your portal
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#135821', // Lighter green for separation
    backgroundColor: '#094014', // Mid-tone green
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  backButton: {
    padding: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubText: {
    color: '#88AA88',
    fontSize: 14,
    marginTop: 5,
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentItem: {
    backgroundColor: '#094014', // Mid-tone green
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  replyItem: {
    backgroundColor: '#052401', // Dark green
    marginBottom: 6,
    padding: 10,
    marginLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#4CAF50', // Vibrant green accent
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarFallback: {
    backgroundColor: '#135821',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF5040',
  },
  avatarText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  commentUser: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  time: {
    color: '#88AA88',
    fontSize: 11,
    marginTop: 2,
  },
  likeButtonRight: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  likeCountRight: {
    color: '#88AA88',
    fontSize: 10,
    marginTop: 2,
  },
  commentText: {
    color: '#E0FFE0',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  showRepliesButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyLine: {
    width: 16,
    height: 1,
    backgroundColor: '#345e39',
    marginRight: 6,
  },
  chevronIcon: {
    marginRight: 4,
  },
  showRepliesText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  replyButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  replyButtonText: {
    color: '#88AA88',
    fontSize: 12,
    fontWeight: '500',
  },
  likedText: {
    color: '#FF3366',
    fontWeight: 'bold',
  },
  repliesContainer: {
    marginTop: 8,
    paddingLeft: 10,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#052401',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#135821',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#094014',
    borderRadius: 18,
    marginRight: 8,
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#4CAF5020',
  },
  sendButton: {
    padding: 8,
    backgroundColor: '#052401',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#135821',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  charCount: {
    color: '#345e39',
    fontSize: 10,
    textAlign: 'right',
    marginRight: 8,
  },
});

export default SchoolComments;