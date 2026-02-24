import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Modal, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import karachiMap from '../../assets/karachi-map.png';

const AddInstituteModal = ({ isOpen, onClose }) => {
  const [instituteType, setInstituteType] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const instituteTypes = ['School', 'College', 'General Public', 'Donor'];

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View />
      </TouchableOpacity>

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
            <Text style={styles.title}>Add Institute</Text>
          </View>

          <View style={styles.dropdownSection}>
            <TouchableOpacity
              onPress={() => setShowDropdown(!showDropdown)}
              style={styles.dropdownButton}
              activeOpacity={0.7}
            >
              <Text style={instituteType ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder}>
                {instituteType || 'Type of Promocode'}
              </Text>
              <Svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
              style={{ transform: [{ rotate: showDropdown ? '180deg' : '0deg' }] }}
              >
                <Path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                {instituteTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => { setInstituteType(type); setShowDropdown(false); }}
                    style={styles.dropdownItem}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownItemText}>{type}</Text>
                    <View style={[
                      styles.radio,
                      instituteType === type && styles.radioSelected
                    ]}>
                      {instituteType === type && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputSection}>
            <TextInput
              placeholder="Name of Institute"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={instituteName}
              onChangeText={setInstituteName}
              style={styles.input}
            />
          </View>

          <View style={styles.locationSection}>
            <Text style={styles.locationTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <Image source={{ uri: karachiMap }} style={styles.map} resizeMode="cover" />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
            <Text style={styles.submitText}>Add Promocode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  dropdownSection: {
    marginBottom: 16,
  },
  dropdownButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 9999,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dropdownTextPlaceholder: {
    color: 'rgba(255,255,255,0.7)',
  },
  dropdownList: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dropdownItemText: {
    color: '#FFFFFF',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#EF4444',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  inputSection: {
    marginBottom: 24,
  },
  input: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 9999,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  locationSection: {
    marginBottom: 24,
  },
  locationTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 160,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  submitButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 9999,
    backgroundColor: '#DC2626',
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AddInstituteModal;
