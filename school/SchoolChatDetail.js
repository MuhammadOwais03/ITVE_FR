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

const { width } = Dimensions.get('window');

const formatDateHeader = (date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const msgDate = new Date(date);
  if (msgDate.toDateString() === today.toDateString()) return 'Today';
  if (msgDate.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return msgDate.toLocaleDateString('en-US', { weekday: 'long' });
};

const ChatDetail = ({ route, navigation }) => {
  // Keeping all your original props/params
  const { 
    name, badgeColor, id, onUserBlocked, onUserDeleted, onUserUnblocked, 
    onUserMuted, onNewMessage, onUpdateChatHistory, 
    isBlocked: initialBlocked, isMuted: initialMuted, existingChatHistory 
  } = route.params || {};
  
  // Keeping all your original state
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(initialBlocked || false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [unblockModalVisible, setUnblockModalVisible] = useState(false);
  const [deleteChatModalVisible, setDeleteChatModalVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted || false);

  // Updated Theme Colors
  const portalGradient = {
    colors: ['#135821', '#094014', '#052401'],
    start: { x: 0.5, y: 0.35 },
    end: { x: 0.5, y: 1 },
  };

  const [chatHistory, setChatHistory] = useState(existingChatHistory || [
    { id: '1', text: "Did you check the new assignment?", sent: false, time: "3:15 pm", status: "seen", timestamp: new Date() },
    { id: '2', text: "Just about to start it!", sent: true, time: "3:16 pm", status: "seen", timestamp: new Date() },
  ]);

  // Keeping your original useEffect
  useEffect(() => {
    if (onUpdateChatHistory) onUpdateChatHistory(id, chatHistory);
  }, [chatHistory]);

  // Keeping your original handleSend
  const handleSend = () => {
    if (message.trim().length > 0) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      const newMsg = { id: Date.now(), text: message, sent: true, time: timeString, status: "sent", timestamp: now };
      setChatHistory(prev => [...prev, newMsg]);
      if (onNewMessage) onNewMessage(id, message, timeString);
      setMessage("");
    }
  };

  // Keeping your original status icon logic
  const getStatusIcon = (status) => {
    switch(status) {
      case "sent": return <Ionicons name="checkmark" size={12} color="#88AA88" />;
      case "delivered": return <Ionicons name="checkmark-done" size={12} color="#88AA88" />;
      case "seen": return <Ionicons name="checkmark-done" size={12} color="#4CAF50" />;
      default: return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#052401' }}>
      <LinearGradient colors={portalGradient.colors} style={styles.container}>
        
        {/* Portal Header */}
        <SafeAreaView edges={['top']} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color="#fff" size={28} />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.avatarCircle}>
                <Ionicons name="person" size={20} color="white" />
            </View>
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.headerName}>{name}</Text>
                {!isBlocked && <Ionicons name="checkmark-circle" size={14} color={badgeColor || "#4CAF50"} style={{ marginLeft: 4 }} />}
              </View>
              <Text style={styles.onlineStatus}>{isBlocked ? "Restricted" : "Online"}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => setIsMuted(!isMuted)} style={{ marginRight: 15 }}>
              <Ionicons name={isMuted ? "notifications-off" : "notifications-outline"} color={isMuted ? "#FF6B6B" : "#fff"} size={22} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBlockModalVisible(true)}>
              <Ionicons name="ellipsis-vertical" color="#fff" size={22} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Chat History */}
        <ScrollView 
          contentContainerStyle={styles.chatArea} 
          showsVerticalScrollIndicator={false}
          ref={ref => ref?.scrollToEnd({ animated: true })}
        >
          <View style={styles.daySeparator}>
            <Text style={styles.dateLabel}>Portal History</Text>
          </View>
          
          {chatHistory.map((item) => (
            <View key={item.id} style={[styles.messageWrapper, item.sent ? styles.sentWrapper : styles.receivedWrapper]}>
              <View style={[styles.bubble, item.sent ? styles.sentBubble : styles.receivedBubble]}>
                <Text style={styles.bubbleText}>{item.text}</Text>
                <View style={styles.messageMeta}>
                  <Text style={styles.messageTime}>{item.time}</Text>
                  {item.sent && getStatusIcon(item.status)}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input Section */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {!isBlocked ? (
            <View style={styles.inputBar}>
              <TextInput 
                placeholder="Type a portal message..." 
                placeholderTextColor="rgba(136, 170, 136, 0.5)" 
                style={styles.inputField}
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity onPress={handleSend}>
                <LinearGradient colors={['#135821', '#4CAF50']} style={styles.sendBtn}>
                  <Ionicons name="send" color="#fff" size={18} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.blockedBar} onPress={() => { setIsBlocked(false); if(onUserUnblocked) onUserUnblocked(id); }}>
              <Text style={styles.unblockText}>You blocked this student. Tap to Unblock.</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>

        {/* Simplified Block Modal */}
        <Modal transparent visible={blockModalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Manage Access</Text>
              <TouchableOpacity style={styles.modalOption} onPress={() => { setIsBlocked(true); if(onUserBlocked) onUserBlocked(id); setBlockModalVisible(false); }}>
                <Text style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Block Student</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => setBlockModalVisible(false)}>
                <Text style={{ color: '#fff' }}>Cancel</Text>
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
    backgroundColor: '#135821' 
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#094014', justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.3)' },
  headerName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  onlineStatus: { color: '#4CAF50', fontSize: 11, fontWeight: '600' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  chatArea: { padding: 15, paddingBottom: 30 },
  daySeparator: { alignSelf: 'center', backgroundColor: 'rgba(19, 88, 33, 0.4)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, marginVertical: 10, borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.2)' },
  dateLabel: { color: '#88AA88', fontSize: 12, fontWeight: '600' },
  messageWrapper: { marginBottom: 15, maxWidth: '80%' },
  sentWrapper: { alignSelf: 'flex-end' },
  receivedWrapper: { alignSelf: 'flex-start' },
  bubble: { padding: 12, borderRadius: 18 },
  receivedBubble: { backgroundColor: 'rgba(19, 88, 33, 0.5)', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.1)' },
  sentBubble: { backgroundColor: '#135821', borderBottomRightRadius: 2, borderWidth: 1, borderColor: '#4CAF50' },
  bubbleText: { color: '#fff', fontSize: 15 },
  messageMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4 },
  messageTime: { color: 'rgba(136, 170, 136, 0.7)', fontSize: 10, marginRight: 5 },
  inputBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(9, 64, 20, 0.9)', margin: 15, paddingHorizontal: 15, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(76, 175, 80, 0.3)' },
  inputField: { flex: 1, color: '#fff' },
  sendBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  blockedBar: { backgroundColor: '#8B0000', padding: 15, alignItems: 'center' },
  unblockText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#094014', borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#135821' },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  modalOption: { paddingVertical: 15, width: '100%', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.05)' },
});

export default ChatDetail;