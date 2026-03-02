import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const initialReports = [
  {
    id: '1',
    username: 'sahil.xoxo',
    date: '24/1/2026',
    time: '3:30 pm',
    avatar: 'https://i.pravatar.cc/150?img=11',
    complaint: 'someone is posting my picture from this account\ncan you look into it',
    attachments: ['1x JPG'],
    status: 'resolved',
    handledBy: 'Admin.5',
    isPinned: false,
  },
  {
    id: '2',
    username: 'sahil.xoxo',
    date: '24/1/2026',
    time: '3:30 pm',
    avatar: 'https://i.pravatar.cc/150?img=11',
    complaint: 'someone is posting my picture from this account\ncan you look into it',
    attachments: ['1x JPG'],
    status: 'bogus',
    handledBy: 'Admin.3',
    isPinned: false,
  },
  {
    id: '3',
    username: 'sahil.xoxo',
    date: '24/1/2026',
    time: '3:30 pm',
    avatar: 'https://i.pravatar.cc/150?img=11',
    complaint: 'someone is posting my picture from this account\ncan you look into it',
    attachments: ['1x JPG'],
    status: 'pending',
    handledBy: null,
    isPinned: false,
  },
  {
    id: '4',
    username: 'alex.jones',
    date: '23/1/2026',
    time: '2:15 pm',
    avatar: 'https://i.pravatar.cc/150?img=45',
    complaint: 'Received hateful comments from another user\nPlease take action',
    attachments: ['2x PNG'],
    status: 'resolved',
    handledBy: 'Admin.1',
    isPinned: true,
  },
  {
    id: '5',
    username: 'emma.tech',
    date: '23/1/2026',
    time: '1:45 pm',
    avatar: 'https://i.pravatar.cc/150?img=22',
    complaint: 'My account was hacked, someone changed my password\nI cannot login anymore',
    attachments: [],
    status: 'pending',
    handledBy: null,
    isPinned: false,
  },
  {
    id: '6',
    username: 'mike.dev',
    date: '22/1/2026',
    time: '4:20 pm',
    avatar: 'https://i.pravatar.cc/150?img=33',
    complaint: 'Inappropriate content posted in comments',
    attachments: ['1x JPG', '1x PNG'],
    status: 'bogus',
    handledBy: 'Admin.7',
    isPinned: false,
  },
  {
    id: '7',
    username: 'sarah.khan',
    date: '22/1/2026',
    time: '11:30 am',
    avatar: 'https://i.pravatar.cc/150?img=18',
    complaint: 'Spam messages from multiple accounts\nBeing harassed constantly',
    attachments: [],
    status: 'pending',
    handledBy: null,
    isPinned: false,
  },
  {
    id: '8',
    username: 'john.smith',
    date: '21/1/2026',
    time: '9:00 am',
    avatar: 'https://i.pravatar.cc/150?img=50',
    complaint: 'Copyright infringement - my work is being stolen',
    attachments: ['3x JPG'],
    status: 'resolved',
    handledBy: 'Admin.2',
    isPinned: false,
  },
  {
    id: '9',
    username: 'lisa.art',
    date: '21/1/2026',
    time: '5:45 pm',
    avatar: 'https://i.pravatar.cc/150?img=65',
    complaint: 'False accusations against me in comments\nPlease remove defamatory content',
    attachments: [],
    status: 'pending',
    handledBy: null,
    isPinned: false,
  },
  {
    id: '10',
    username: 'david.code',
    date: '20/1/2026',
    time: '2:30 pm',
    avatar: 'https://i.pravatar.cc/150?img=72',
    complaint: 'Phishing attempt - suspicious links in messages',
    attachments: ['1x PNG'],
    status: 'resolved',
    handledBy: 'Admin.4',
    isPinned: false,
  }
];

export default function App() {
  const [reports, setReports] = useState(initialReports);
  const [activeReport, setActiveReport] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [isHistoryView, setIsHistoryView] = useState(false); // Toggles main feed vs history

  // --- Data Filtering & Sorting ---
  const displayData = useMemo(() => {
    if (isHistoryView) {
      // Show ONLY resolved or bogus reports
      return reports.filter(r => r.status !== 'pending');
    } else {
      // Show ONLY pending reports, and sort pinned to the top
      return reports
        .filter(r => r.status === 'pending')
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        });
    }
  }, [reports, isHistoryView]);

  // --- Handlers ---
  const handleThreeDotsClick = (report) => {
    setActiveReport(report);
    setShowActionSheet(true);
  };

  const handleStatusChange = (newStatus, adminName) => {
    setReports(prev => prev.map(report => 
      report.id === activeReport?.id 
        ? { ...report, status: newStatus, handledBy: adminName } 
        : report
    ));
    setShowActionSheet(false);
  };

  const handleReviewAgain = () => {
    setReports(prev => prev.map(report => 
      report.id === activeReport?.id 
        ? { ...report, status: 'pending', handledBy: null } 
        : report
    ));
    setShowActionSheet(false);
  };

  const handleTogglePin = () => {
    setReports(prev => prev.map(report => 
      report.id === activeReport?.id 
        ? { ...report, isPinned: !report.isPinned } 
        : report
    ));
    setShowActionSheet(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} /> {/* Spacer for centering */}
        <Text style={styles.headerTitle}>Reports</Text>
        
        {/* The Cloud Button - Changes style when history is active */}
        <TouchableOpacity 
          style={[styles.cloudBtn, isHistoryView && styles.cloudBtnActive]} 
          onPress={() => setIsHistoryView(!isHistoryView)}
        >
          <Ionicons 
            name="cloud-upload" 
            size={22} 
            color={isHistoryView ? '#000' : '#fff'} 
          />
        </TouchableOpacity>
      </View>

      {/* Main Feed List */}
      <FlatList
        data={displayData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isHistoryView ? "No resolved reports yet." : "No pending reports!"}
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, item.isPinned && styles.pinnedCardBorder]}>
            {item.isPinned && (
              <View style={styles.pinnedLabel}>
                <Ionicons name="pin" size={12} color="#000" />
                <Text style={styles.pinnedLabelText}>Pinned</Text>
              </View>
            )}

            <View style={styles.cardHeader}>
              <View style={styles.userSection}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>
              
              <View style={styles.timeSection}>
                <TouchableOpacity onPress={() => handleThreeDotsClick(item)} style={styles.dotsIcon}>
                   <Text style={styles.dotsText}>•••</Text>
                </TouchableOpacity>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>

            <Text style={styles.complaintText}>{item.complaint}</Text>
            
            {item.attachments.length > 0 && (
              <Text style={styles.attachmentText}>{item.attachments[0]}</Text>
            )}

            <View style={styles.cardFooter}>
              {item.status === 'pending' ? (
                <View style={styles.replyBox}>
                  <TextInput style={styles.replyInput} placeholder="Reply Now" placeholderTextColor="#666" />
                  <TouchableOpacity>
                    <Ionicons name="send" size={20} color="#555" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.statusBadge, item.status === 'bogus' ? styles.badgeRed : styles.badgeLight]}>
                  <Text style={[styles.statusText, item.status === 'bogus' ? styles.textBlack : styles.textBlack]}>
                    {item.status === 'resolved' ? `Has Been Resolved by ${item.handledBy}` : `Report was Bogus by ${item.handledBy}`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      />

      {/* Action Sheet Modal (Shared for both views) */}
      <Modal visible={showActionSheet} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowActionSheet(false)}
        >
          {activeReport && (
            <View style={styles.actionContainer}>
              {activeReport.status === 'pending' ? (
                <>
                  <TouchableOpacity style={styles.btnLight} onPress={() => handleStatusChange('resolved', 'Admin.5')}>
                    <Text style={styles.btnLightText}>Has Been Resolved</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnRed} onPress={() => handleStatusChange('bogus', 'Admin.3')}>
                    <Text style={styles.btnRedText}>Report was Bogus</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.btnLight} onPress={handleTogglePin}>
                    <Text style={styles.btnLightText}>{activeReport.isPinned ? 'Unpin' : 'Pin'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnRed} onPress={handleReviewAgain}>
                    <Text style={styles.btnRedText}>Review Again</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? 40 : 50, // Hardcoded integer to prevent Snack crashes 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  
  // Cloud Button Styles
  cloudBtn: { padding: 8, borderRadius: 25 },
  cloudBtnActive: { backgroundColor: '#E0E0E0' }, // The white circle when history is open

  // Card Styles
  card: { backgroundColor: '#111', marginHorizontal: 15, marginTop: 15, borderRadius: 16, padding: 16 },
  pinnedCardBorder: { borderWidth: 1, borderColor: '#444' },
  pinnedLabel: { position: 'absolute', top: -10, left: 16, backgroundColor: '#E0E0E0', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, zIndex: 10 },
  pinnedLabelText: { fontSize: 10, fontWeight: 'bold', color: '#000', marginLeft: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  userSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
  username: { color: '#E0E0E0', fontSize: 15, fontWeight: '700' },
  dateText: { color: '#777', fontSize: 12, marginTop: 2 },
  timeSection: { alignItems: 'flex-end' },
  dotsIcon: { paddingHorizontal: 4, marginBottom: 2 },
  dotsText: { color: '#888', fontSize: 18, letterSpacing: 1 },
  timeText: { color: '#777', fontSize: 12 },
  complaintText: { color: '#ccc', fontSize: 14, lineHeight: 20, marginBottom: 8 },
  attachmentText: { color: '#666', fontSize: 12, fontWeight: '600', marginBottom: 16 },
  
  // Footer
  cardFooter: { marginTop: 2 },
  replyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E', borderRadius: 25, paddingHorizontal: 16, paddingVertical: 10 },
  replyInput: { flex: 1, color: '#fff', fontSize: 14, paddingVertical: 0 },
  statusBadge: { paddingVertical: 14, borderRadius: 25, alignItems: 'center' },
  badgeLight: { backgroundColor: '#E0E0E0' },
  badgeRed: { backgroundColor: '#8B0000' },
  statusText: { fontWeight: '700', fontSize: 15 },
  textBlack: { color: '#000' },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 50, fontSize: 16 },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  actionContainer: { width: width * 0.85, backgroundColor: '#1C1C1E', borderRadius: 20, padding: 20, alignItems: 'center' },
  btnLight: { width: '100%', backgroundColor: '#E0E0E0', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 12 },
  btnLightText: { color: '#000', fontWeight: '700', fontSize: 15 },
  btnRed: { width: '100%', backgroundColor: '#8B0000', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  btnRedText: { color: '#000', fontWeight: '700', fontSize: 15 },
});