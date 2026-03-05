/**
 * AdminScreen.jsx  — Expo compatible
 * Install: npx expo install expo-image-picker
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StatusBar,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/* ─── Gallery-only image picker ─── */
const pickImage = async (onSuccess) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Please allow access to your photo library.');
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.85,
    allowsEditing: true,
  });
  if (!result.canceled && result.assets?.[0]) {
    onSuccess({
      uri: result.assets[0].uri,
      fileName: result.assets[0].fileName ?? 'photo.jpg',
    });
  }
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function AdminScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  /* Admin profile */
  const [adminProfile, setAdminProfile] = useState({
    username: 'sahil_xoxo',
    fullName: 'Sahil Kumar',
    bio: "Hey I'm Sahil, I love football. And you?",
    email: 'sahil@example.com',
    password: '',
    phone: '+1 555 000 0000',
    avatar: null,
  });

  /* Workers */
  const [workers, setWorkers] = useState({
    reports:  [{ name: 'bilal.akbar', id: '3729nd43639', avatar: null }, { name: 'ali.akbar',   id: '3729nd43640', avatar: null }],
    courses:  [{ name: 'bilal.akbar', id: '3729nd43641', avatar: null }, { name: 'sahil.khan',  id: '3729nd43642', avatar: null }],
    teachers: [{ name: 'bilal.akbar', id: '3729nd43643', avatar: null }, { name: 'sahil.khan',  id: '3729nd43644', avatar: null }],
  });

  /* Modal visibility */
  const [addWorkerModal, setAddWorkerModal] = useState(false);
  const [deleteModal,    setDeleteModal]    = useState(false);
  const [settingsModal,  setSettingsModal]  = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  /* Settings editing */
  const [editingField, setEditingField] = useState(null);
  const [tempValue,    setTempValue]    = useState('');

  /* Add worker form */
  const [newWorker, setNewWorker] = useState({
    name: '', cnic: '', jobType: 'reports', username: '',
    picture: null, cnicImage: null,
  });

  /* ── Settings fields config ── */
  const settingsFields = [
    { key: 'username', label: 'Username',  icon: 'at',              secure: false, keyboard: 'default' },
    { key: 'fullName', label: 'Full Name', icon: 'account-outline', secure: false, keyboard: 'default' },
    { key: 'email',    label: 'Email',     icon: 'email-outline',   secure: false, keyboard: 'email-address' },
    { key: 'password', label: 'Password',  icon: 'lock-outline',    secure: true,  keyboard: 'default' },
    { key: 'phone',    label: 'Phone',     icon: 'phone-outline',   secure: false, keyboard: 'phone-pad' },
    { key: 'bio',      label: 'Bio',       icon: 'text-account',    secure: false, keyboard: 'default' },
  ];

  const currentField = settingsFields.find(f => f.key === editingField);

  const openEdit = (key) => { setTempValue(adminProfile[key]); setEditingField(key); };

  const saveEdit = () => {
    if (!tempValue.trim() && editingField !== 'password') {
      Alert.alert('Validation', 'Field cannot be empty.'); return;
    }
    setAdminProfile(prev => ({ ...prev, [editingField]: tempValue.trim() }));
    setEditingField(null);
    Alert.alert('Saved', 'Your changes have been saved.');
  };

  const displayValue = (key, val) => {
    if (key === 'password') return val ? '••••••••' : 'Not set';
    return val || '—';
  };

  /* ── Worker handlers ── */
  const addWorker = () => {
    if (!newWorker.name.trim() || !newWorker.cnic.trim()) {
      Alert.alert('Validation', 'Name and CNIC are required.'); return;
    }
    setWorkers(prev => ({
      ...prev,
      [newWorker.jobType]: [
        ...prev[newWorker.jobType],
        { name: newWorker.name.trim(), id: newWorker.cnic.trim(), avatar: newWorker.picture?.uri ?? null },
      ],
    }));
    setNewWorker({ name: '', cnic: '', jobType: 'reports', username: '', picture: null, cnicImage: null });
    setAddWorkerModal(false);
    Alert.alert('Success', 'Worker added successfully!');
  };

  const confirmDelete = () => {
    setWorkers(prev => ({
      ...prev,
      [selectedWorker.section]: prev[selectedWorker.section].filter(w => w.id !== selectedWorker.id),
    }));
    setDeleteModal(false);
    setSelectedWorker(null);
  };

  /* ══════════════ RENDER ══════════════ */
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <Text style={styles.username}>{adminProfile.username}</Text>
          <TouchableOpacity style={styles.cogBtn} onPress={() => setSettingsModal(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Icon name="cog-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ── Profile Header ── */}
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => pickImage(asset => setAdminProfile(p => ({ ...p, avatar: asset.uri })))}
            activeOpacity={0.8}>
            <View style={styles.avatarWrap}>
              <Image
                source={adminProfile.avatar
                  ? { uri: adminProfile.avatar }
                  : { uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.profilePic}
              />
              <View style={styles.avatarEditBadge}>
                <Icon name="camera-outline" size={12} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.fullName}>{adminProfile.fullName}</Text>
          <Text style={styles.bio}>{adminProfile.bio}</Text>
          <View style={styles.stats}>
            {[['263', 'Teachers'], ['240', 'Reports'], ['15', 'Workers']].map(([n, l]) => (
              <View key={l} style={styles.statBox}>
                <Text style={styles.statNumber}>{n}</Text>
                <Text style={styles.statLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Worker Management ── */}
        <Text style={styles.sectionMainTitle}>Worker Management</Text>
        <TouchableOpacity style={styles.addWorkerBtn} onPress={() => setAddWorkerModal(true)}>
          <Icon name="account-plus-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addWorkerText}>Add Worker</Text>
        </TouchableOpacity>

        {['reports', 'courses', 'teachers'].map(section => (
          <View key={section} style={styles.workerSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>{section.charAt(0).toUpperCase() + section.slice(1)}</Text>
              <Text style={styles.sectionCount}>{workers[section].length}</Text>
            </View>
            {workers[section].map(worker => (
              <View key={worker.id} style={styles.workerCard}>
                <View style={styles.workerLeft}>
                  <Image
                    source={worker.avatar
                      ? { uri: worker.avatar }
                      : { uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.workerPic}
                  />
                  <View>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <Text style={styles.workerId}>{worker.id}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteIconBtn}
                  onPress={() => { setSelectedWorker({ ...worker, section }); setDeleteModal(true); }}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Icon name="trash-can-outline" size={20} color="#c0392b" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* ══════════════════════════════════════
           SETTINGS BOTTOM SHEET
         ══════════════════════════════════════ */}
      <Modal visible={settingsModal} animationType="slide" transparent statusBarTranslucent
        onRequestClose={() => { setEditingField(null); setSettingsModal(false); }}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayDismiss} activeOpacity={1}
            onPress={() => { setEditingField(null); setSettingsModal(false); }} />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.sheetHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {editingField && (
                  <TouchableOpacity onPress={() => setEditingField(null)} style={{ marginRight: 10 }}>
                    <Icon name="arrow-left" size={20} color="#aaa" />
                  </TouchableOpacity>
                )}
                <Text style={styles.sheetTitle}>
                  {editingField ? currentField?.label : 'Account Settings'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => { setEditingField(null); setSettingsModal(false); }}>
                <Icon name="close" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

              {/* Avatar row — only in list mode */}
              {!editingField && (
                <TouchableOpacity style={styles.settingsAvatarRow}
                  onPress={() => pickImage(asset => setAdminProfile(p => ({ ...p, avatar: asset.uri })))}
                  activeOpacity={0.8}>
                  <Image
                    source={adminProfile.avatar
                      ? { uri: adminProfile.avatar }
                      : { uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.settingsAvatar}
                  />
                  <View style={styles.settingsAvatarInfo}>
                    <Text style={styles.settingsAvatarName}>{adminProfile.fullName}</Text>
                    <Text style={styles.settingsAvatarSub}>Tap to change profile photo</Text>
                  </View>
                  <Icon name="camera-outline" size={20} color="#8b0000" />
                </TouchableOpacity>
              )}

              {editingField ? (
                /* ── Edit field ── */
                <View style={styles.editBlock}>
                  <Text style={styles.editHint}>
                    Update your {currentField?.label.toLowerCase()} below.
                  </Text>
                  <View style={styles.editInputWrap}>
                    <Icon name={currentField?.icon} size={20} color="#8b0000" style={{ marginRight: 10 }} />
                    <TextInput
                      style={styles.editTextInput}
                      value={tempValue}
                      onChangeText={setTempValue}
                      secureTextEntry={currentField?.secure}
                      keyboardType={currentField?.keyboard}
                      autoFocus
                      autoCapitalize="none"
                      placeholder={`Enter ${currentField?.label}`}
                      placeholderTextColor="#444"
                      selectionColor="#8b0000"
                    />
                  </View>
                  <View style={styles.editBtns}>
                    <TouchableOpacity style={styles.btnCancel} onPress={() => setEditingField(null)}>
                      <Text style={styles.btnCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSave} onPress={saveEdit}>
                      <Icon name="check" size={16} color="#fff" style={{ marginRight: 6 }} />
                      <Text style={styles.btnSaveText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                /* ── Field list ── */
                <>
                  <Text style={styles.sheetSubtitle}>Tap any field to edit</Text>
                  <View style={styles.fieldList}>
                    {settingsFields.map((f, idx) => (
                      <TouchableOpacity key={f.key}
                        style={[styles.fieldRow, idx < settingsFields.length - 1 && styles.fieldRowBorder]}
                        onPress={() => openEdit(f.key)} activeOpacity={0.6}>
                        <View style={styles.fieldIconBox}>
                          <Icon name={f.icon} size={17} color="#8b0000" />
                        </View>
                        <View style={styles.fieldMeta}>
                          <Text style={styles.fieldLabel}>{f.label}</Text>
                          <Text style={styles.fieldValue} numberOfLines={1}>
                            {displayValue(f.key, adminProfile[f.key])}
                          </Text>
                        </View>
                        <Icon name="chevron-right" size={18} color="#444" />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TouchableOpacity style={styles.logoutRow}
                    onPress={() => Alert.alert('Log Out', 'Are you sure?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Log Out', style: 'destructive', onPress: () => navigation?.goBack() },
                    ])}>
                    <Icon name="logout" size={18} color="#c0392b" />
                    <Text style={styles.logoutText}>Log Out</Text>
                  </TouchableOpacity>
                  <View style={{ height: 30 }} />
                </>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* ══════════════════════════════════════
           ADD WORKER MODAL
         ══════════════════════════════════════ */}
      <Modal visible={addWorkerModal} animationType="slide" transparent statusBarTranslucent>
        <View style={styles.fullOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.fullSheet}>

            <View style={styles.fullSheetHeader}>
              <TouchableOpacity style={styles.backCircle} onPress={() => setAddWorkerModal(false)}>
                <Icon name="arrow-left" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.fullSheetTitle}>Add Worker</Text>
              <View style={{ width: 38 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name of Worker</Text>
                <View style={styles.modalInputWrap}>
                  <Icon name="account-outline" size={18} color="#555" style={{ marginRight: 10 }} />
                  <TextInput
                    placeholder="Full name" placeholderTextColor="#444" style={styles.modalInput}
                    value={newWorker.name} onChangeText={t => setNewWorker(p => ({ ...p, name: t }))} />
                </View>
              </View>

              {/* CNIC number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CNIC Number</Text>
                <View style={styles.modalInputWrap}>
                  <Icon name="card-account-details-outline" size={18} color="#555" style={{ marginRight: 10 }} />
                  <TextInput
                    placeholder="e.g. 42201-1234567-1" placeholderTextColor="#444"
                    style={styles.modalInput} keyboardType="numeric"
                    value={newWorker.cnic} onChangeText={t => setNewWorker(p => ({ ...p, cnic: t }))} />
                </View>
              </View>

              {/* Upload CNIC image */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Upload CNIC</Text>
                <TouchableOpacity
                  style={[styles.uploadCard, newWorker.cnicImage && styles.uploadCardDone]}
                  onPress={() => pickImage(asset => setNewWorker(p => ({ ...p, cnicImage: asset })))}
                  activeOpacity={0.8}>
                  {newWorker.cnicImage ? (
                    <View style={styles.uploadedRow}>
                      <Image source={{ uri: newWorker.cnicImage.uri }} style={styles.cnicThumb} />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.uploadedName} numberOfLines={1}>
                          {newWorker.cnicImage.fileName ?? 'cnic_image.jpg'}
                        </Text>
                        <Text style={styles.uploadedSub}>Tap to change</Text>
                      </View>
                      <Icon name="check-circle" size={22} color="#2ecc71" />
                    </View>
                  ) : (
                    <View style={styles.uploadPlaceholder}>
                      <Icon name="card-account-details-outline" size={30} color="#444" />
                      <Text style={styles.uploadPlaceholderText}>Tap to upload CNIC photo</Text>
                      <Text style={styles.uploadPlaceholderSub}>Opens your media library</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Upload Worker picture */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Upload Picture</Text>
                <TouchableOpacity
                  style={[styles.uploadCard, newWorker.picture && styles.uploadCardDone]}
                  onPress={() => pickImage(asset => setNewWorker(p => ({ ...p, picture: asset })))}
                  activeOpacity={0.8}>
                  {newWorker.picture ? (
                    <View style={styles.uploadedRow}>
                      <Image source={{ uri: newWorker.picture.uri }} style={styles.cnicThumb} />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.uploadedName} numberOfLines={1}>
                          {newWorker.picture.fileName ?? 'worker_photo.jpg'}
                        </Text>
                        <Text style={styles.uploadedSub}>Tap to change</Text>
                      </View>
                      <Icon name="check-circle" size={22} color="#2ecc71" />
                    </View>
                  ) : (
                    <View style={styles.uploadPlaceholder}>
                      <Icon name="image-plus" size={30} color="#444" />
                      <Text style={styles.uploadPlaceholderText}>Tap to upload worker photo</Text>
                      <Text style={styles.uploadPlaceholderSub}>Opens your media library</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Job Type chips */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Job Type</Text>
                <View style={styles.jobTypeRow}>
                  {['reports', 'courses'].map(type => {
                    const active = newWorker.jobType === type;
                    return (
                      <TouchableOpacity key={type}
                        style={[styles.jobChip, active && styles.jobChipActive]}
                        onPress={() => setNewWorker(p => ({ ...p, jobType: type }))}
                        activeOpacity={0.7}>
                        <Text style={[styles.jobChipText, active && styles.jobChipTextActive]}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Username */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Username</Text>
                <View style={styles.modalInputWrap}>
                  <Icon name="at" size={18} color="#555" style={{ marginRight: 10 }} />
                  <TextInput
                    placeholder="username" placeholderTextColor="#444"
                    style={styles.modalInput} autoCapitalize="none"
                    value={newWorker.username} onChangeText={t => setNewWorker(p => ({ ...p, username: t }))} />
                </View>
              </View>

              {/* Submit */}
              <TouchableOpacity style={styles.submitBtn} onPress={addWorker} activeOpacity={0.85}>
                <Icon name="account-plus" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.submitBtnText}>Add Worker</Text>
              </TouchableOpacity>
              <View style={{ height: 50 }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* ── Delete Confirmation ── */}
      <Modal visible={deleteModal} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.deleteOverlay}>
          <View style={styles.deleteBox}>
            <Icon name="alert-circle-outline" size={44} color="#c0392b" style={{ marginBottom: 12 }} />
            <Text style={styles.deleteTitle}>Remove Worker?</Text>
            <Text style={styles.deleteBody}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>{selectedWorker?.name}</Text>
              {' '}will be removed from the{' '}
              <Text style={{ color: '#8b0000', fontWeight: '700' }}>{selectedWorker?.section}</Text> list.
            </Text>
            <View style={styles.deleteBtns}>
              <TouchableOpacity style={styles.deleteCancelBtn} onPress={() => setDeleteModal(false)}>
                <Text style={styles.deleteCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteConfirmBtn} onPress={confirmDelete}>
                <Text style={styles.deleteConfirmText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

/* ════════════════════════════════
   STYLES
════════════════════════════════ */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scrollContent: { paddingBottom: 50 },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#1a1a1a',
  },
  username: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cogBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#111', justifyContent: 'center', alignItems: 'center',
  },

  profileHeader: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 20 },
  avatarWrap: { position: 'relative', marginBottom: 12 },
  profilePic: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: '#8b0000' },
  avatarEditBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#8b0000',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#000',
  },
  fullName: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  bio: { color: '#666', fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  stats: { flexDirection: 'row' },
  statBox: { alignItems: 'center', marginHorizontal: 22 },
  statNumber: { color: '#fff', fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#555', fontSize: 12, marginTop: 2 },

  sectionMainTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 20, marginTop: 8, marginBottom: 14 },
  addWorkerBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8b0000', marginHorizontal: 20, height: 52, borderRadius: 26, marginBottom: 20,
  },
  addWorkerText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  workerSection: { marginHorizontal: 20, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#8b0000', marginRight: 8 },
  sectionTitle: { color: '#fff', fontSize: 14, fontWeight: '700', flex: 1, textTransform: 'capitalize' },
  sectionCount: {
    backgroundColor: '#1a1a1a', color: '#666',
    fontSize: 11, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10,
  },
  workerCard: {
    backgroundColor: '#0f0f0f', borderWidth: StyleSheet.hairlineWidth, borderColor: '#1e1e1e',
    padding: 12, borderRadius: 18, marginBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  workerLeft: { flexDirection: 'row', alignItems: 'center' },
  workerPic: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  workerName: { color: '#fff', fontWeight: '600', fontSize: 14 },
  workerId: { color: '#555', fontSize: 11, marginTop: 2 },
  deleteIconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#1a0000', justifyContent: 'center', alignItems: 'center',
  },

  /* Settings sheet */
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.72)' },
  overlayDismiss: { flex: 1 },
  sheet: {
    backgroundColor: '#0f0f0f', borderTopLeftRadius: 22, borderTopRightRadius: 22,
    paddingHorizontal: 16, maxHeight: SCREEN_HEIGHT * 0.85,
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#222', borderBottomWidth: 0,
  },
  handle: {
    width: 36, height: 4, backgroundColor: '#2e2e2e',
    borderRadius: 2, alignSelf: 'center', marginTop: 10, marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#1a1a1a', marginBottom: 4,
  },
  sheetTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  sheetSubtitle: { color: '#444', fontSize: 13, marginTop: 8, marginBottom: 14 },

  settingsAvatarRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#161616',
    borderRadius: 16, padding: 14, marginBottom: 14,
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#222',
  },
  settingsAvatar: { width: 52, height: 52, borderRadius: 26, marginRight: 14 },
  settingsAvatarInfo: { flex: 1 },
  settingsAvatarName: { color: '#fff', fontWeight: '700', fontSize: 15 },
  settingsAvatarSub: { color: '#555', fontSize: 12, marginTop: 2 },

  fieldList: {
    backgroundColor: '#161616', borderRadius: 16, overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#222',
  },
  fieldRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  fieldRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#1f1f1f' },
  fieldIconBox: {
    width: 34, height: 34, borderRadius: 9, backgroundColor: '#1a0000',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  fieldMeta: { flex: 1 },
  fieldLabel: { color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2 },
  fieldValue: { color: '#ddd', fontSize: 15, fontWeight: '500' },

  editBlock: { paddingTop: 16, paddingBottom: 20 },
  editHint: { color: '#555', fontSize: 13, marginBottom: 18 },
  editInputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#161616',
    borderWidth: 1.5, borderColor: '#8b0000', borderRadius: 14, paddingHorizontal: 14, height: 56,
  },
  editTextInput: { flex: 1, color: '#fff', fontSize: 16, height: '100%' },
  editBtns: { flexDirection: 'row', marginTop: 16, gap: 10 },
  btnCancel: {
    flex: 1, height: 50, borderRadius: 13, borderWidth: 1,
    borderColor: '#2a2a2a', backgroundColor: '#161616', justifyContent: 'center', alignItems: 'center',
  },
  btnCancelText: { color: '#888', fontSize: 15, fontWeight: '600' },
  btnSave: {
    flex: 2, height: 50, borderRadius: 13, backgroundColor: '#8b0000',
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  },
  btnSaveText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  logoutRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 16, paddingVertical: 15, borderRadius: 14,
    borderWidth: 1, borderColor: '#2a0a0a', backgroundColor: '#100505', gap: 8,
  },
  logoutText: { color: '#c0392b', fontSize: 15, fontWeight: '700', marginLeft: 6 },

  /* Add Worker full sheet */
  fullOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.94)' },
  fullSheet: {
    flex: 1, backgroundColor: '#0a0a0a',
    marginTop: 56, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 18,
  },
  fullSheetHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1a1a1a', marginBottom: 10,
  },
  backCircle: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#181818', justifyContent: 'center', alignItems: 'center',
  },
  fullSheetTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  inputGroup: { marginBottom: 16 },
  inputLabel: {
    color: '#555', fontSize: 11, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginLeft: 4,
  },
  modalInputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#141414',
    borderWidth: StyleSheet.hairlineWidth, borderColor: '#252525', borderRadius: 14, paddingHorizontal: 16, height: 54,
  },
  modalInput: { flex: 1, color: '#fff', fontSize: 15, height: '100%' },

  uploadCard: {
    backgroundColor: '#141414', borderWidth: 1, borderColor: '#252525',
    borderStyle: 'dashed', borderRadius: 16, overflow: 'hidden',
  },
  uploadCardDone: { borderStyle: 'solid', borderColor: '#1a3a1a', backgroundColor: '#0a140a' },
  uploadPlaceholder: { alignItems: 'center', justifyContent: 'center', paddingVertical: 26 },
  uploadPlaceholderText: { color: '#555', fontSize: 14, marginTop: 8, fontWeight: '600' },
  uploadPlaceholderSub: { color: '#333', fontSize: 12, marginTop: 3 },
  uploadedRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  cnicThumb: { width: 60, height: 40, borderRadius: 6 },
  uploadedName: { color: '#ccc', fontSize: 13, fontWeight: '600' },
  uploadedSub: { color: '#555', fontSize: 11, marginTop: 2 },

  jobTypeRow: { flexDirection: 'row', gap: 10 },
  jobChip: {
    flex: 1, height: 44, borderRadius: 22, backgroundColor: '#141414',
    borderWidth: 1, borderColor: '#252525', justifyContent: 'center', alignItems: 'center',
  },
  jobChipActive: { backgroundColor: '#8b0000', borderColor: '#8b0000' },
  jobChipText: { color: '#555', fontSize: 13, fontWeight: '600', textTransform: 'capitalize' },
  jobChipTextActive: { color: '#fff' },

  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#8b0000', height: 54, borderRadius: 27, marginTop: 6,
  },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  deleteOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.78)' },
  deleteBox: {
    backgroundColor: '#141414', marginHorizontal: 28, borderRadius: 22, padding: 24,
    alignItems: 'center', borderWidth: StyleSheet.hairlineWidth, borderColor: '#2a0a0a',
  },
  deleteTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  deleteBody: { color: '#666', fontSize: 14, textAlign: 'center', lineHeight: 21, marginBottom: 22 },
  deleteBtns: { flexDirection: 'row', width: '100%', gap: 12 },
  deleteCancelBtn: {
    flex: 1, height: 48, borderRadius: 24, backgroundColor: '#1e1e1e',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333',
  },
  deleteCancelText: { color: '#888', fontWeight: '600', fontSize: 15 },
  deleteConfirmBtn: { flex: 1, height: 48, borderRadius: 24, backgroundColor: '#8b0000', justifyContent: 'center', alignItems: 'center' },
  deleteConfirmText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});