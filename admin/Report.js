import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const initialReports = [
  {
    id: '1',
    username: 'sahil.xoxo',
    date: '24/1/2026',
    time: '3:30 pm',
    avatar: 'https://i.pravatar.cc/150?img=11',
    complaint: 'someone is posting my picture from this account\ncan you look into it',
    attachments: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    ],
    status: 'pending',
    handledBy: null,
  },
  {
    id: '2',
    username: 'dev_guru99',
    date: '27/2/2026',
    time: '10:15 am',
    avatar: 'https://i.pravatar.cc/150?img=33',
    complaint:
      'This user is spamming my inbox with fake gig requests and asking for free source code for a React Native app. Here are screenshots of the chat history.',
    attachments: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521931961826-fe48677230a5?q=80&w=600&auto=format&fit=crop',
    ],
    status: 'pending',
    handledBy: null,
  },
  {
    id: '3',
    username: 'ui_phantom',
    date: '26/2/2026',
    time: '8:45 pm',
    avatar: 'https://i.pravatar.cc/150?img=68',
    complaint:
      'They completely cloned my freelance portfolio website design and are using it to steal clients. Please take their URL down immediately.',
    attachments: [],
    status: 'resolved',
    handledBy: 'Admin.2',
  },
];

const SendIcon   = () => <Text style={s.sendText}>➤</Text>;
const UploadIcon = () => <Text style={s.uploadText}>⬆</Text>;

const NAV_ITEMS = [
  { label: 'Delete',  icon: '✕' },
  { label: 'Growth',  icon: '↗' },
  { label: 'Reports', icon: '◎', active: true },
  { label: 'Courses', icon: '▣' },
  { label: 'Admin',   icon: '⊙' },
];

export default function Report() {
  const [reports, setReports]                 = useState(initialReports);
  const [activeReport, setActiveReport]       = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [replyMap, setReplyMap]               = useState({});

  // { reportId: string, url: string } | null
  const [expandedImage, setExpandedImage] = useState(null);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const handleStatusChange = (newStatus, adminName) => {
    setReports(prev =>
      prev.map(r =>
        r.id === activeReport.id
          ? { ...r, status: newStatus, handledBy: adminName }
          : r
      )
    );
    setShowActionSheet(false);
    setActiveReport(null);
  };

  const openActionMenu = report => {
    setActiveReport(report);
    setShowActionSheet(true);
  };

  const closeActionSheet = () => {
    setShowActionSheet(false);
    setActiveReport(null);
  };

  const handleThumbPress = (reportId, url) => {
    if (expandedImage?.reportId === reportId && expandedImage?.url === url) {
      setExpandedImage(null); // collapse if tapping same image again
    } else {
      setExpandedImage({ reportId, url });
    }
  };

  // ── Action Modal ───────────────────────────────────────────────────────────
  const ActionModal = () => {
    if (!activeReport) return null;
    const isPending = activeReport.status === 'pending';
    return (
      <Modal visible={showActionSheet} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={closeActionSheet}>
          <View style={s.overlay}>
            <TouchableWithoutFeedback>
              <View style={s.actionBox}>
                {isPending ? (
                  <>
                    <TouchableOpacity
                      style={s.btnLight}
                      onPress={() => handleStatusChange('resolved', 'Admin.5')}
                    >
                      <Text style={s.btnLightTxt}>Has Been Resolved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[s.btnRed, { marginTop: 12 }]}
                      onPress={() => handleStatusChange('bogus', 'Admin.3')}
                    >
                      <Text style={s.btnRedTxt}>Report was Bogus</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity style={s.btnLight} onPress={closeActionSheet}>
                      <Text style={s.btnLightTxt}>Pin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[s.btnRed, { marginTop: 12 }]}
                      onPress={() => handleStatusChange('pending', null)}
                    >
                      <Text style={s.btnRedTxt}>Review Again</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  // ── Report Card ────────────────────────────────────────────────────────────
  const renderCard = ({ item }) => {
    const imgExpanded =
      expandedImage?.reportId === item.id ? expandedImage.url : null;

    return (
      <View style={s.card}>

        {/* ── Header (always shown) ── */}
        <View style={s.topSection}>
          <View style={s.cardHeader}>
            <View style={s.userRow}>
              <Image source={{ uri: item.avatar }} style={s.avatar} />
              <View>
                <Text style={s.username}>{item.username}</Text>
                <Text style={s.dateText}>{item.date}</Text>
              </View>
            </View>
            <View style={s.timeCol}>
              <TouchableOpacity style={s.dotsBtn} onPress={() => openActionMenu(item)}>
                <Text style={s.dotsText}>•••</Text>
              </TouchableOpacity>
              <Text style={s.timeText}>{item.time}</Text>
            </View>
          </View>

          {/* Complaint: hide while image is expanded so card looks like screenshot */}
          {!imgExpanded && (
            <Text style={s.complaint}>{item.complaint}</Text>
          )}
        </View>

        {/* ── Expanded full-width image ── */}
        {imgExpanded ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setExpandedImage(null)}
            style={s.expandedWrap}
          >
            <Image
              source={{ uri: imgExpanded }}
              style={s.expandedImg}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          /* ── Thumbnail strip ── */
          item.attachments.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.galleryContent}
              style={s.gallery}
            >
              {item.attachments.map((url, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleThumbPress(item.id, url)}
                >
                  <Image source={{ uri: url }} style={s.thumb} />
                  <Text style={s.thumbLabel}>{i + 1}x JPG</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        )}

        {/* ── Footer ── */}
        <View style={s.cardFooter}>
          {item.status === 'pending' ? (
            <View style={s.replyBox}>
              <TextInput
                style={s.replyInput}
                placeholder="Reply Now"
                placeholderTextColor="#555"
                value={replyMap[item.id] || ''}
                onChangeText={t => setReplyMap(p => ({ ...p, [item.id]: t }))}
              />
              <TouchableOpacity>
                <SendIcon />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                s.statusBadge,
                item.status === 'bogus' ? s.badgeRed : s.badgeLight,
              ]}
              onPress={() => openActionMenu(item)}
            >
              <Text style={s.statusTxt}>
                {item.status === 'resolved'
                  ? `Has Been Resolved by ${item.handledBy}`
                  : `Report was Bogus by ${item.handledBy}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ── Root ───────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={s.header}>
        <View style={{ width: 28 }} />
        <Text style={s.headerTitle}>Reports</Text>
        <UploadIcon />
      </View>

      <FlatList
        data={reports}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      />

      

      <ActionModal />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  uploadText:  { color: '#fff', fontSize: 18 },

  // Card
  card: {
    backgroundColor: '#111',
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1c1c1c',
  },
  topSection: { padding: 15, paddingBottom: 0 },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userRow:  { flexDirection: 'row', alignItems: 'center' },
  avatar:   { width: 40, height: 40, borderRadius: 20, marginRight: 11 },
  username: { color: '#e0e0e0', fontSize: 14, fontWeight: '600' },
  dateText: { color: '#666', fontSize: 11, marginTop: 2 },
  timeCol:  { alignItems: 'flex-end' },
  dotsBtn: {
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 4,
  },
  dotsText: { color: '#888', fontSize: 12, letterSpacing: 2 },
  timeText: { color: '#666', fontSize: 11 },

  complaint: {
    color: '#bbb',
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 14,
  },

  // Expanded full-width image (edge-to-edge inside card)
  expandedWrap: {
    width: '100%',
    height: height * 0.38,
  },
  expandedImg: {
    width: '100%',
    height: '100%',
  },

  // Thumbnail strip
  gallery:        { marginBottom: 2 },
  galleryContent: { paddingHorizontal: 15, paddingBottom: 14 },
  thumb:          { width: 60, height: 60, borderRadius: 8, marginRight: 10, backgroundColor: '#222' },
  thumbLabel:     { color: '#555', fontSize: 10, fontWeight: '600', marginTop: 3 },

  // Footer
  cardFooter: { padding: 15, paddingTop: 12 },
  replyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  replyInput: { flex: 1, color: '#fff', fontSize: 13 },
  sendText:   { color: '#666', fontSize: 18 },

  statusBadge: { paddingVertical: 13, borderRadius: 25, alignItems: 'center' },
  badgeLight:  { backgroundColor: '#e0e0e0' },
  badgeRed:    { backgroundColor: '#6b0000' },
  statusTxt:   { color: '#000', fontWeight: '700', fontSize: 13 },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBox: {
    width: width * 0.85,
    backgroundColor: '#1c1c1e',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
  },
  btnLight: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  btnLightTxt: { color: '#000', fontWeight: '700', fontSize: 14 },
  btnRed: {
    width: '100%',
    backgroundColor: '#6b0000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  btnRedTxt: { color: '#000', fontWeight: '700', fontSize: 14 },

  // Bottom nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#090909',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingTop: 10,
    paddingBottom: 26,
  },
  navItem:           { alignItems: 'center' },
  navIconWrap:       { width: 34, height: 34, justifyContent: 'center', alignItems: 'center', borderRadius: 17, marginBottom: 4 },
  navIconActive:     { backgroundColor: '#fff', width: 44, height: 44, borderRadius: 22 },
  navIcon:           { color: '#555', fontSize: 16 },
  navIconTextActive: { color: '#000' },
  navLabel:          { color: '#555', fontSize: 10, fontWeight: '500' },
  navLabelActive:    { color: '#fff' },
});