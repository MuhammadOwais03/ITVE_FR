import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import StatusBar from './StatusBar';
import { AttachmentIcon, BackArrowIcon, CameraIcon, CheckIcon, MoreIcon, SendIcon } from './Icons';
import { useNavigation, useRoute } from '@react-navigation/native';


const mockMessages = [
  { id: '1', text: 'Hello world', isSent: false, time: '3:15 pm' },
  { id: '2', text: 'Hello world', isSent: true, time: '3:15 pm' },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { chatId } = route.params;
  const [messageText, setMessageText] = useState('');

  const nameMap = {
    'ali-akbar': 'Ali Akbar', 'talha-nawaz': 'Talha Nawaz', 'ayaan-hassan': 'Ayaan Hassan',
    'danish-aslam': 'Danish Aslam', 'rayyan-hussain': 'Rayyan Hussain', 'ibrahim-khan': 'Ibrahim Khan',
    'maryam-nawaz': 'Maryam Nawaz', 'umer-haider': 'Umer Haider', 'rohail-niazi': 'Rohail Niazi',
  };
  const contactName = nameMap[chatId] || 'Unknown';

  const handleSend = () => { if (messageText.trim()) setMessageText(''); };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()
        } style={styles.backBtn}>
          <BackArrowIcon size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.avatarSmall} />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.contactName}>{contactName}</Text>
            <View style={styles.blueBadge}><CheckIcon size={10} color="white" /></View>
          </View>
          <Text style={styles.onlineText}>Online</Text>
        </View>
        <TouchableOpacity><MoreIcon size={24} color="white" /></TouchableOpacity>
      </View>

      <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
        <View style={styles.dateLabel}><Text style={styles.dateLabelText}>Today</Text></View>
        {mockMessages.map((msg) => (
          <View key={msg.id} style={[styles.msgRow, msg.isSent ? styles.msgRight : styles.msgLeft]}>
            <View style={[styles.bubble, msg.isSent ? styles.bubbleSent : styles.bubbleReceived]}>
              <Text style={styles.bubbleText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TouchableOpacity><CameraIcon size={22} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={messageText}
          onChangeText={setMessageText}
          onSubmitEditing={handleSend}
          style={styles.chatInput}
        />
        <TouchableOpacity><AttachmentIcon size={22} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
        <TouchableOpacity onPress={handleSend}><SendIcon size={22} color="rgba(255,255,255,0.6)" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: 'rgba(0,0,0,0.15)' },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  avatarSmall: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF' },
  headerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  contactName: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  blueBadge: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
  onlineText: { color: '#4ADE80', fontSize: 14 },
  messages: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  messagesContent: { gap: 16 },
  dateLabel: { alignItems: 'center', marginBottom: 16 },
  dateLabelText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  msgRow: { flexDirection: 'row' },
  msgRight: { justifyContent: 'flex-end' },
  msgLeft: { justifyContent: 'flex-start' },
  bubble: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, maxWidth: '75%' },
  bubbleSent: { backgroundColor: 'rgba(255,255,255,0.15)', borderTopRightRadius: 4 },
  bubbleReceived: { backgroundColor: 'rgba(0,0,0,0.3)', borderTopLeftRadius: 4 },
  bubbleText: { color: '#FFFFFF', fontSize: 14 },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  chatInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 9999, color: '#FFFFFF', backgroundColor: 'rgba(0,0,0,0.25)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
});

export default ChatScreen;
