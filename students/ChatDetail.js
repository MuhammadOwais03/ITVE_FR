import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;

// Helper function to format date headers (Today, Yesterday, Monday, etc.)
const formatDateHeader = (date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const msgDate = new Date(date);
  
  if (msgDate.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (msgDate.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    // Return day name (Monday, Tuesday, etc.)
    return msgDate.toLocaleDateString('en-US', { weekday: 'long' });
  }
};

const ChatDetail = ({ route, navigation }) => {
  const { 
    name, 
    badgeColor, 
    id, 
    onUserBlocked, 
    onUserDeleted, 
    onUserUnblocked, 
    onUserMuted,
    onNewMessage, 
    onUpdateChatHistory, // New callback to sync chat history
    isBlocked: initialBlocked,
    isMuted: initialMuted,
    existingChatHistory // Receive existing chat history if any
  } = route.params || {};
  
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(initialBlocked || false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [unblockModalVisible, setUnblockModalVisible] = useState(false);
  const [deleteChatModalVisible, setDeleteChatModalVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted || false);
  
  // Chat history - use existing history from params or initialize
  const [chatHistory, setChatHistory] = useState(() => {
    if (existingChatHistory && existingChatHistory.length > 0) {
      return existingChatHistory;
    }
    // Default initial messages
    return [
      { 
        id: '1', 
        text: "Hey! Did you check the new assignment?", 
        sent: false, 
        time: "3:15 pm", 
        status: "seen",
        timestamp: new Date('2026-02-11T15:15:00'), // Wednesday
        isForwarded: false
      },
      { 
        id: '2', 
        text: "Hello world", 
        sent: true, 
        time: "3:16 pm", 
        status: "delivered",
        timestamp: new Date('2026-02-11T15:16:00'), // Wednesday
        isForwarded: false
      },
      { 
        id: '3', 
        text: "Registrations are now OPEN! 🚨", 
        sent: false, 
        time: "6:29 pm", 
        status: "seen",
        timestamp: new Date(), // Today
        isForwarded: true
      },
    ];
  });

  // Sync chat history with parent screen whenever it changes
  useEffect(() => {
    if (onUpdateChatHistory) {
      onUpdateChatHistory(id, chatHistory);
    }
  }, [chatHistory, id, onUpdateChatHistory]);

  // Handle mute toggle
  const handleMuteToggle = () => {
    const newMuteStatus = !isMuted;
    setIsMuted(newMuteStatus);
    if (onUserMuted) onUserMuted(id, newMuteStatus);
  };

  // Handle send message
  const handleSend = () => {
    if (message.trim().length > 0) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
      
      const newMsg = { 
        id: Date.now(), 
        text: message, 
        sent: true, 
        time: timeString,
        status: "sent",
        timestamp: now,
        isForwarded: false
      };
      
      // Update chat history with new message
      setChatHistory(prev => [...prev, newMsg]);
      
      // Update last message in MessagesScreen
      if (onNewMessage) onNewMessage(id, message, timeString);
      
      // Clear input
      setMessage("");
      
      // Simulate message status updates
      setTimeout(() => {
        setChatHistory(prev => prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg
        ));
      }, 1000);
      
      setTimeout(() => {
        setChatHistory(prev => prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: "seen" } : msg
        ));
      }, 2000);
    }
  };

  // Get status icon based on message status
  const getStatusIcon = (status) => {
    switch(status) {
      case "sent": return <Ionicons name="checkmark" size={12} color="#A9CBEA" />;
      case "delivered": return <Ionicons name="checkmark-done" size={12} color="#A9CBEA" />;
      case "seen": return <Ionicons name="checkmark-done" size={12} color="#4CD964" />;
      default: return null;
    }
  };

  // Handle block user
  const handleBlockAction = () => {
    setIsBlocked(true);
    setBlockModalVisible(false);
    if (onUserBlocked) onUserBlocked(id);
  };

  // Handle unblock user
  const handleUnblockAction = () => {
    setIsBlocked(false);
    setUnblockModalVisible(false);
    if (onUserUnblocked) onUserUnblocked(id);
  };

  // Handle delete chat
  const handleDeleteChat = () => {
    if (onUserDeleted) onUserDeleted(id);
    setDeleteChatModalVisible(false);
    navigation.goBack();
  };

  // Open delete chat modal
  const handleDeleteAction = () => {
    setDeleteChatModalVisible(true);
  };

  // Group messages by date for day separators
  const groupedMessages = chatHistory.reduce((acc, msg) => {
    if (!msg.timestamp) return acc;
    
    const dateKey = new Date(msg.timestamp).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: new Date(msg.timestamp),
        messages: []
      };
    }
    acc[dateKey].messages.push(msg);
    return acc;
  }, {});

  // Convert grouped messages to array and sort by date
  const sortedGroups = Object.values(groupedMessages).sort((a, b) => a.date - b.date);

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      <LinearGradient colors={COLORS.studentPortal.gradient.colors} style={styles.container}>
        
        {/* Header */}
        <SafeAreaView edges={['top']} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color="#fff" size={scale(28)} />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Image source={require("../assets/user.png")} style={styles.smallAvatar} />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.headerName}>{name}</Text>
                {!isBlocked && (
                  <Ionicons name="checkmark-circle" size={14} color={badgeColor} style={{ marginLeft: 4 }} />
                )}
                {isMuted && !isBlocked && (
                  <Ionicons name="notifications-off" size={14} color="#FF3B30" style={{ marginLeft: 4 }} />
                )}
              </View>
              <Text style={[styles.onlineStatus, isBlocked && { color: '#FF3B30' }]}>
                {isBlocked ? "Blocked" : "Online"}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.muteBtn} onPress={handleMuteToggle}>
              <Ionicons 
                name={isMuted ? "notifications-off" : "notifications-outline"} 
                color={isMuted ? "#FF3B30" : "#fff"} 
                size={22} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreBtn} onPress={() => setBlockModalVisible(true)}>
              <Ionicons name="ellipsis-horizontal" color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Chat Area with Day Separators */}
        <ScrollView 
          contentContainerStyle={styles.chatArea} 
          showsVerticalScrollIndicator={false}
          ref={scrollView => {
            // Scroll to bottom when new message is added
            setTimeout(() => {
              scrollView?.scrollToEnd({ animated: true });
            }, 100);
          }}
        >
          {sortedGroups.map((group, groupIndex) => (
            <View key={groupIndex}>
              {/* Day Separator Header */}
              <View style={styles.daySeparator}>
                <Text style={styles.dateLabel}>
                  {formatDateHeader(group.date)}
                </Text>
              </View>
              
              {/* Messages for this day */}
              {group.messages.map((item) => (
                <View 
                  key={item.id} 
                  style={[styles.messageWrapper, item.sent ? styles.sentWrapper : styles.receivedWrapper]}
                >
                  <View style={[
                    styles.bubble, 
                    item.sent ? styles.sentBubble : styles.receivedBubble, 
                    isBlocked && {opacity: 0.5}
                  ]}>
                    {/* Forwarded indicator */}
                    {item.isForwarded && (
                      <View style={styles.forwardContainer}>
                        <Ionicons name="arrow-redo" size={12} color="#A9CBEA" />
                        <Text style={styles.forwardText}>Forwarded</Text>
                      </View>
                    )}
                    <Text style={styles.bubbleText}>{item.text}</Text>
                    <View style={styles.messageMeta}>
                      <Text style={styles.messageTime}>{item.time}</Text>
                      {item.sent && getStatusIcon(item.status)}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Bottom Input Section */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {!isBlocked ? (
            <View style={styles.inputBar}>
              <TouchableOpacity>
                <Ionicons name="camera-outline" color="#A9CBEA" size={24} />
              </TouchableOpacity>
              <TextInput 
                placeholder="Type a message.." 
                placeholderTextColor="#A9CBEA" 
                style={styles.inputField}
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity onPress={handleSend}>
                <LinearGradient colors={['#00CCFF', '#007AFF']} style={styles.sendGradient}>
                  <Ionicons name="send" color="#fff" size={18} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.blockedDashboard}>
              <Text style={styles.blockedTitle}>You blocked {name}</Text>
              <Text style={styles.blockedSubText}>You can't send messages to this account unless you unblock them.</Text>
              <View style={styles.blockedActionRow}>
                <TouchableOpacity onPress={() => setUnblockModalVisible(true)}>
                  <Text style={styles.unblockText}>Unblock</Text>
                </TouchableOpacity>
                <View style={styles.verticalDivider} />
                <TouchableOpacity onPress={handleDeleteAction}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>

        {/* Block Modal */}
        <Modal animationType="fade" transparent visible={blockModalVisible} onRequestClose={() => setBlockModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Do you want to block {name}?</Text>
              <View style={styles.modalDivider} />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.modalButton, styles.yesButton]} onPress={handleBlockAction}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.noButton]} onPress={() => setBlockModalVisible(false)}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Unblock Confirmation Modal */}
        <Modal animationType="fade" transparent visible={unblockModalVisible} onRequestClose={() => setUnblockModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Unblock {name}?</Text>
              <Text style={styles.modalDescription}>The person will now be able to send you messages and won't be notified that you unblocked them.</Text>
              <View style={styles.modalDivider} />
              <TouchableOpacity style={styles.fullWidthAction} onPress={handleUnblockAction}>
                <Text style={styles.fullWidthTextUnblock}>Unblock</Text>
              </TouchableOpacity>
              <View style={styles.modalDivider} />
              <TouchableOpacity style={styles.fullWidthAction} onPress={() => setUnblockModalVisible(false)}>
                <Text style={styles.fullWidthTextCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Delete Chat Confirmation Modal */}
        <Modal animationType="fade" transparent visible={deleteChatModalVisible} onRequestClose={() => setDeleteChatModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Close Icon */}
              <TouchableOpacity 
                style={styles.closeIcon} 
                onPress={() => setDeleteChatModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              
              <Text style={styles.modalTitle}>Delete Chat?</Text>
              <Text style={styles.modalDescription}>Are you sure you want to delete this chat? This action cannot be undone.</Text>
              <View style={styles.modalDivider} />
              <TouchableOpacity style={styles.fullWidthAction} onPress={handleDeleteChat}>
                <Text style={[styles.fullWidthText, { color: '#FF3B30' }]}>Delete Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderBottomWidth: 0.5, 
    borderBottomColor: 'rgba(43, 74, 106, 0.5)' 
  },
  headerInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 5, 
    flex: 1 
  },
  nameContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  smallAvatar: { 
    width: scale(40), 
    height: scale(40), 
    borderRadius: 20, 
    marginRight: 10, 
    backgroundColor: '#1A1A1A' 
  },
  headerName: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: scale(16) 
  },
  onlineStatus: { 
    color: '#4CD964', 
    fontSize: 11 
  },
  headerActions: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  muteBtn: { 
    marginRight: 10, 
    padding: 5 
  },
  moreBtn: { 
    padding: 5 
  },
  chatArea: { 
    padding: 15, 
    paddingBottom: 30 
  },
  daySeparator: {
    alignSelf: 'center',
    backgroundColor: 'rgba(18, 45, 70, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginVertical: 16,
  },
  dateLabel: { 
    color: '#A9CBEA', 
    fontSize: 12, 
    fontWeight: '600',
    textAlign: 'center',
  },
  messageWrapper: { 
    marginBottom: 12, 
    maxWidth: width * 0.75 
  },
  sentWrapper: { 
    alignSelf: 'flex-end' 
  },
  receivedWrapper: { 
    alignSelf: 'flex-start' 
  },
  bubble: { 
    padding: 12, 
    borderRadius: 20 
  },
  receivedBubble: { 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderBottomLeftRadius: 2 
  },
  sentBubble: { 
    backgroundColor: '#007AFF', 
    borderBottomRightRadius: 2 
  },
  bubbleText: { 
    color: '#fff', 
    fontSize: 15 
  },
  forwardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  forwardText: {
    color: '#A9CBEA',
    fontSize: 11,
    fontStyle: 'italic',
    marginLeft: 4,
  },
  messageMeta: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    marginTop: 4, 
    marginRight: 4 
  },
  messageTime: { 
    color: '#A9CBEA', 
    fontSize: 10, 
    marginRight: 4 
  },
  inputBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    marginHorizontal: 15, 
    marginBottom: 20, 
    paddingHorizontal: 15, 
    height: 50, 
    borderRadius: 25 
  },
  inputField: { 
    flex: 1, 
    color: '#fff', 
    marginHorizontal: 10 
  },
  sendGradient: { 
    width: 35, 
    height: 35, 
    borderRadius: 17.5, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  blockedDashboard: { 
    backgroundColor: 'rgba(18, 45, 70, 0.95)', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25, 
    alignItems: 'center' 
  },
  blockedTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 8 
  },
  blockedSubText: { 
    color: '#A9CBEA', 
    fontSize: 13, 
    textAlign: 'center', 
    marginBottom: 20 
  },
  blockedActionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-evenly', 
    width: '100%' 
  },
  unblockText: { 
    color: '#00CCFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  deleteText: { 
    color: '#FF3B30', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  verticalDivider: { 
    width: 1, 
    height: 25, 
    backgroundColor: 'rgba(169, 203, 234, 0.2)' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalContent: { 
    width: width * 0.8, 
    backgroundColor: '#122D46', 
    borderRadius: 25, 
    paddingVertical: 25, 
    alignItems: 'center',
    position: 'relative'
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  modalTitle: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  modalDescription: { 
    color: '#A9CBEA', 
    fontSize: 13, 
    textAlign: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalDivider: { 
    height: 1, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    width: '100%', 
    marginVertical: 10 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 10 
  },
  modalButton: { 
    width: '40%', 
    height: 45, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  yesButton: { 
    backgroundColor: '#007AFF' 
  },
  noButton: { 
    backgroundColor: '#194470' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  fullWidthAction: { 
    width: '100%', 
    paddingVertical: 12, 
    alignItems: 'center' 
  },
  fullWidthText: { 
    fontWeight: 'bold', 
    fontSize: 17 
  },
  fullWidthTextUnblock: { 
    color: '#00CCFF', 
    fontWeight: 'bold', 
    fontSize: 17 
  },
  fullWidthTextCancel: { 
    color: '#fff' 
  },
});

export default ChatDetail;
