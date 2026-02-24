import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


import StatusBar from './StatusBar';
import BottomNavigation from './components/BottomNavigation';
import ChatScreen from './ChatScreen';

const mockContacts = [
  { id: 'ali-akbar', name: 'Ali Akbar', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: true, verifiedType: 'blue' },
  { id: 'talha-nawaz', name: 'Talha Nawaz', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: true, verifiedType: 'red' },
  { id: 'ayaan-hassan', name: 'Ayaan Hassan', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'blue' },
  { id: 'danish-aslam', name: 'Danish Aslam', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'blue' },
  { id: 'rayyan-hussain', name: 'Rayyan Hussain', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'green' },
  { id: 'ibrahim-khan', name: 'Ibrahim Khan', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'red' },
  { id: 'maryam-nawaz', name: 'Maryam Nawaz', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'blue' },
  { id: 'umer-haider', name: 'Umer Haider', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'green' },
  { id: 'rohail-niazi', name: 'Rohail Niazi', lastMessage: 'Hello world', time: '3:15 pm', isOnline: false, hasUnread: false, verifiedType: 'green' },
];

const MessagesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.headerSection}>
        <Text style={styles.title}>Chats</Text>
        <View style={styles.searchBox}>
          <View style={styles.searchIconWrap}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
              <Path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 96 }}>
        {filteredContacts.map((contact) => (
          <ChatScreen key={contact.id} contact={contact} />
        ))}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerSection: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 30, fontWeight: '700', marginBottom: 16 },
  searchBox: { position: 'relative' },
  searchIconWrap: { position: 'absolute', left: 12, top: 12, zIndex: 1 },
  searchInput: { width: '100%', paddingLeft: 40, paddingRight: 16, paddingVertical: 12, borderRadius: 8, color: '#FFFFFF', fontSize: 14, backgroundColor: 'rgba(0,0,0,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  list: { flex: 1 },
});

export default MessagesScreen;
