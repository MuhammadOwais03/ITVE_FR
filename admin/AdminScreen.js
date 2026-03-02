import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminScreen() {
  const [workers, setWorkers] = useState({
    reports: [
      { name: 'bilal.akbar', id: '3729nd43639' },
      { name: 'ali.akbar', id: '3729nd43639' },
    ],
    courses: [
      { name: 'bilal.akbar', id: '3729nd43639' },
      { name: 'sahil.khan', id: '3729nd43639' },
    ],
    teachers: [
      { name: 'bilal.akbar', id: '3729nd43639' },
      { name: 'sahil.khan', id: '3729nd43639' },
    ],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [newWorker, setNewWorker] = useState({
    name: '',
    cnic: '',
    jobType: 'reports',
    username: '',
  });

  const addWorker = () => {
    setWorkers(prev => ({
      ...prev,
      [newWorker.jobType]: [
        ...prev[newWorker.jobType],
        { name: newWorker.name, id: newWorker.cnic },
      ],
    }));
    setModalVisible(false);
  };

  const confirmDelete = () => {
    setWorkers(prev => ({
      ...prev,
      [selectedWorker.section]: prev[selectedWorker.section].filter(
        w => w.id !== selectedWorker.id
      ),
    }));
    setDeleteModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View style={styles.headerTop}>
          <Text style={styles.username}>sahil_xoxo</Text>
          <MaterialCommunityIcons name="cog" size={24} color="white" />
        </View>

        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.profilePic}
          />
          <Text style={styles.fullName}>Sahil Kumar</Text>
          <Text style={styles.bio}>Hey I’m Sahil, I love football. And you?</Text>

          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>263</Text>
              <Text style={styles.statLabel}>Teachers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>240</Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Workers</Text>
            </View>
          </View>
        </View>

        {/* Worker Management */}
        <Text style={styles.sectionMainTitle}>Worker Management</Text>

        <TouchableOpacity
          style={styles.addWorkerBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addWorkerText}>Add Workers</Text>
        </TouchableOpacity>

        {['reports', 'courses', 'teachers'].map(section => (
          <View key={section} style={styles.workerSection}>
            <Text style={styles.sectionTitle}>
              Worker - {section}
            </Text>

            {workers[section].map(worker => (
              <View key={worker.id} style={styles.workerCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                    style={styles.workerPic}
                  />
                  <View>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <Text style={styles.workerId}>{worker.id}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedWorker({ ...worker, section });
                    setDeleteModal(true);
                  }}
                >
                  <MaterialCommunityIcons name="delete" size={22} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

    {/* Add Worker Modal */}
<Modal visible={modalVisible} animationType="slide" transparent>
  <View style={styles.modalOverlay}>
    <View style={styles.newModalContent}>

      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.newModalTitle}>Add Workers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <TextInput
          placeholder="Name of Worker"
          placeholderTextColor="#aaa"
          style={styles.newInput}
          onChangeText={text => setNewWorker({ ...newWorker, name: text })}
        />

        <TextInput
          placeholder="CNIC"
          placeholderTextColor="#aaa"
          style={styles.newInput}
          onChangeText={text => setNewWorker({ ...newWorker, cnic: text })}
        />

        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Upload CNIC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Upload Picture</Text>
        </TouchableOpacity>

        <View style={styles.jobTypeBox}>
          <Text style={styles.jobTitle}>Job Type</Text>

          <View style={styles.radioRowBlue}>
            {['reports', 'courses'].map(type => (
              <TouchableOpacity
                key={type}
                style={styles.radioContainerBlue}
                onPress={() =>
                  setNewWorker({ ...newWorker, jobType: type })
                }
              >
                <View style={styles.radioOuterBlue}>
                  {newWorker.jobType === type && (
                    <View style={styles.radioInnerBlue} />
                  )}
                </View>
                <Text style={styles.radioText}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#aaa"
          style={styles.newInput}
          onChangeText={text =>
            setNewWorker({ ...newWorker, username: text })
          }
        />

        <TouchableOpacity style={styles.redButton} onPress={addWorker}>
          <Text style={styles.redButtonText}>Add Worker</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  </View>
</Modal>

                  
                
      {/* Delete Modal */}
      <Modal visible={deleteModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.deleteBox}>
            <Text style={styles.modalTitle}>Delete Worker?</Text>

            <View style={styles.deleteButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModal(false)}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={confirmDelete}
              >
                <Text style={{ color: 'white' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  username: { color: 'white', fontSize: 16 },

  profileHeader: { alignItems: 'center', marginVertical: 20 },

  profilePic: { width: 100, height: 100, borderRadius: 50 },

  fullName: { color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 10 },

  bio: { color: 'gray', marginTop: 5, textAlign: 'center' },

  stats: { flexDirection: 'row', marginTop: 20 },

  statBox: { alignItems: 'center', marginHorizontal: 20 },

  statNumber: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  statLabel: { color: 'gray', fontSize: 14 },

  sectionMainTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
  },

  addWorkerBtn: {
    backgroundColor: '#8b0000',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
  },

  addWorkerText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  workerSection: { marginHorizontal: 20, marginTop: 10 },

  sectionTitle: { color: 'white', fontSize: 16, marginBottom: 10 },

  workerCard: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  workerPic: { width: 45, height: 45, borderRadius: 25, marginRight: 10 },

  workerName: { color: 'white', fontWeight: 'bold' },

  workerId: { color: 'gray', fontSize: 12 },

  /* ===== NEW MODAL STYLES ===== */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
  },

  newModalContent: {
    margin: 15,
    backgroundColor: '#111',
    borderRadius: 30,
    padding: 20,
    maxHeight: '90%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  newModalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  newInput: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 55,
    marginBottom: 15,
    color: 'white',
  },

  uploadBtn: {
    backgroundColor: '#000',
    borderRadius: 30,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  uploadText: {
    color: '#aaa',
  },

  jobTypeBox: {
    backgroundColor: '#140000',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
  },

  jobTitle: {
    color: 'white',
    marginBottom: 10,
  },

  radioRowBlue: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  radioContainerBlue: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioOuterBlue: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#00aaff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },

  radioInnerBlue: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00aaff',
  },

  radioText: {
    color: 'white',
  },

  redButton: {
    backgroundColor: '#e00000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  redButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* DELETE MODAL */

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  deleteBox: {
    backgroundColor: '#222',
    margin: 40,
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  deleteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  cancelBtn: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 20,
    width: '45%',
    alignItems: 'center',
  },

  deleteBtn: {
    backgroundColor: '#8b0000',
    padding: 10,
    borderRadius: 20,
    width: '45%',
    alignItems: 'center',
  },
});