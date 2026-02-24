// @ts-nocheck
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, Image, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import StudentSettingsWrapper from './StudentSettingsWrapper';

const INITIAL_BLOCKED_USERS = [
  { id: '1', name: 'Jessica Miller', username: '@jessica.miller', image: 'https://i.pravatar.cc/150?u=jessica' },
  { id: '2', name: 'David Wilson', username: '@david.wilson', image: 'https://i.pravatar.cc/150?u=david' },
  { id: '3', name: 'Emily Clark', username: '@emily.clark', image: 'https://i.pravatar.cc/150?u=emily' },
  { id: '4', name: 'Robert Evans', username: '@robert.evans', image: 'https://i.pravatar.cc/150?u=robert' },
];

export default function BlockedAccounts() {
  const navigation = useNavigation();
  
  const [blockedUsers, setBlockedUsers] = useState(INITIAL_BLOCKED_USERS);
  const [unblockingId, setUnblockingId] = useState(null); 

  const handleUnblockPress = (user) => {
    Alert.alert(
      "Unblock User",
      `Are you sure you want to unblock ${user.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Unblock", 
          style: "destructive",
          onPress: () => performUnblock(user.id) 
        }
      ]
    );
  };

  const performUnblock = (userId) => {
    setUnblockingId(userId); 
    
    setTimeout(() => {
      setBlockedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setUnblockingId(null); 
    }, 1000);
  };

  return (
    <StudentSettingsWrapper>
      <StatusBar barStyle="light-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.webCenterWrapper}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Blocked accounts</Text>
            <View style={{ width: 40 }} /> 
          </View>

          {/* BLOCKED LIST */}
          <View style={styles.listContainer}>
            {blockedUsers.length > 0 ? (
              blockedUsers.map((user) => (
                <View key={user.id} style={styles.userRow}>
                  <View style={styles.userInfo}>
                    <Image source={{ uri: user.image }} style={styles.avatar} />
                    <View style={styles.textContainer}>
                      <Text style={styles.nameText}>{user.name}</Text>
                      <Text style={styles.usernameText}>{user.username}</Text>
                    </View>
                  </View>

                  {/* DYNAMIC UNBLOCK BUTTON */}
                  <TouchableOpacity 
                    style={[
                      styles.unblockButton,
                      unblockingId === user.id && { opacity: 0.8 }
                    ]} 
                    activeOpacity={0.7}
                    onPress={() => handleUnblockPress(user)}
                    disabled={unblockingId !== null}
                  >
                    {unblockingId === user.id ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.unblockText}>Unblock</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              /* EMPTY STATE */
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="account-off-outline" size={60} color="rgba(255,255,255,0.2)" />
                <Text style={styles.emptyText}>No blocked accounts</Text>
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </StudentSettingsWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  webCenterWrapper: {
    width: '100%',
    maxWidth: 450, 
    alignSelf: 'center',
    flex: 1,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%',
    height: 72, 
    marginTop: Platform.OS === 'android' ? 10 : 0,
    paddingHorizontal: 16,
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 18, 
    fontFamily: 'Plus Jakarta Sans',
    textAlign: 'center',
    flex: 1,
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  listContainer: {
    paddingTop: 10,
  },
  userRow: {
    width: '100%',
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.005)', 
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1D7ED8',
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Plus Jakarta Sans',
  },
  usernameText: {
    color: '#75A5D0',
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans',
  },
  unblockButton: {
    width: 89,
    height: 32,
    backgroundColor: '#146CC7',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unblockText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Plus Jakarta Sans',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'Plus Jakarta Sans',
    marginTop: 10,
    fontSize: 16,
  }
});