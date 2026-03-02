import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Modal, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock growth data - replace with API later
const mockGrowthData = {
  stats: [
    { label: 'Current Enrolled Student', value: '35,000' },
    { label: 'Total Admitted Student', value: '60,000' },
    { label: 'Total Promoters (Counselor)', value: '1,000' },
    { label: 'Total Promoters (Influencer)', value: '35' },
    { label: 'Total School Registration', value: '4,000' },
    { label: 'Total College Registration', value: '1,000' },
    { label: 'Home School Registration', value: '3,700' },
    { label: 'Total Subscriber For Promoters', value: '600,000' },
    { label: 'User Subscriber For Promoters', value: '50,000' },
  ],
  financials: [
    { label: 'Revenue', value: '320,000,000' },
    { label: 'Revenue (Monthly Fees)', value: '300,000,000' },
    { label: 'Profit (EBDITA)', value: '112,500,000' },
    { label: 'Expenses', value: '187,500,000' },
    { label: 'Expenses (Campus Rent)', value: '90,000,000' },
    { label: 'Expenses (Running Cost)', value: '45,000,000' },
    { label: 'Expenses (Direction)', value: '30,000,000' },
    { label: 'Expenses (Research & Development)', value: '22,500,000' },
    { label: 'Revenue (Admission Fees)', value: '20,000,000' },
    { label: 'Expenses (Promoter Incentives)', value: '7,000,000' },
    { label: 'Expenses (School & College Incentives)', value: '6,000,000' },
  ],
};

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const years = ['2023', '2024', '2025', '2026'];

export default function GrowthScreen() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showData, setShowData] = useState(false);
  const [isLifetime, setIsLifetime] = useState(false);

  // Dropdown states
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleGenerate = () => {
    if (!startDate || !endDate) {
      return;
    }
    setIsLifetime(false);
    setShowData(true);
  };

  const handleLifetime = () => {
    setIsLifetime(true);
    setShowData(true);
  };

  const handleReset = () => {
    setShowData(false);
    setStartDate('');
    setEndDate('');
    setStartMonth('');
    setStartYear('');
    setEndMonth('');
    setEndYear('');
  };

  const DatePickerModal = ({ visible, onClose, onSelect, selectedMonth, selectedYear, setMonth, setYear }) => (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>Select Date</Text>

          {/* Month picker */}
          <Text style={styles.pickerLabel}>Month</Text>
          <View style={styles.optionsGrid}>
            {months.map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.optionBtn,
                  selectedMonth === m && styles.optionBtnActive,
                ]}
                onPress={() => setMonth(m)}
              >
                <Text style={[
                  styles.optionText,
                  selectedMonth === m && styles.optionTextActive,
                ]}>
                  {m.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Year picker */}
          <Text style={styles.pickerLabel}>Year</Text>
          <View style={styles.optionsGrid}>
            {years.map((y) => (
              <TouchableOpacity
                key={y}
                style={[
                  styles.optionBtn,
                  selectedYear === y && styles.optionBtnActive,
                ]}
                onPress={() => setYear(y)}
              >
                <Text style={[
                  styles.optionText,
                  selectedYear === y && styles.optionTextActive,
                ]}>
                  {y}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              if (selectedMonth && selectedYear) {
                onSelect(`${selectedMonth} ${selectedYear}`);
                onClose();
              }
            }}
          >
            <Text style={styles.confirmBtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {showData && (
          <TouchableOpacity onPress={handleReset} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Growth Data</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>

        {/* FORM VIEW */}
        {!showData && (
          <View>
            {/* Start Date */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={[styles.dropdownText, startDate ? styles.dropdownTextFilled : null]}>
                {startDate || 'Start Date'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* End Date */}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={[styles.dropdownText, endDate ? styles.dropdownTextFilled : null]}>
                {endDate || 'End Date'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Generate Growth Data Button */}
            <TouchableOpacity
              style={[styles.generateBtn, (!startDate || !endDate) && styles.generateBtnDisabled]}
              onPress={handleGenerate}
            >
              <Text style={styles.generateBtnText}>Generate Growth Data</Text>
            </TouchableOpacity>

            {/* Generate Lifetime Data Button */}
            <TouchableOpacity
              style={styles.lifetimeBtn}
              onPress={handleLifetime}
            >
              <Text style={styles.lifetimeBtnText}>Generate Lifetime Data</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* DATA VIEW */}
        {showData && (
          <View>
            {/* Stats Section */}
            {mockGrowthData.stats.map((item, index) => (
              <View key={index} style={[
                styles.dataCard,
                index === 0 && styles.dataCardHighlight,
              ]}>
                <Text style={styles.dataLabel}>{item.label}</Text>
                <Text style={styles.dataValue}>{item.value}</Text>
              </View>
            ))}

            {/* Financial Section */}
            {mockGrowthData.financials.map((item, index) => (
              <View key={index} style={[
                styles.dataCard,
                index === 0 && styles.dataCardHighlight,
              ]}>
                <Text style={styles.dataLabel}>{item.label}</Text>
                <Text style={styles.dataValue}>{item.value}</Text>
              </View>
            ))}

            {/* Action Buttons */}
            <TouchableOpacity style={styles.excelBtn}>
              <Text style={styles.excelBtnText}>Generate Excel File</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reportBtn}>
              <Text style={styles.reportBtnText}>Student Graduation in PC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reportBtn}>
              <Text style={styles.reportBtnText}>Promoter Report</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Start Date Picker Modal */}
      <DatePickerModal
        visible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onSelect={setStartDate}
        selectedMonth={startMonth}
        selectedYear={startYear}
        setMonth={setStartMonth}
        setYear={setStartYear}
      />

      {/* End Date Picker Modal */}
      <DatePickerModal
        visible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onSelect={setEndDate}
        selectedMonth={endMonth}
        selectedYear={endYear}
        setMonth={setEndMonth}
        setYear={setEndYear}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 25,
    padding: 16,
    marginBottom: 15,
  },
  dropdownText: {
    color: '#666',
    fontSize: 15,
  },
  dropdownTextFilled: {
    color: 'white',
  },
  generateBtn: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  generateBtnDisabled: {
    opacity: 0.5,
  },
  generateBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  lifetimeBtn: {
    backgroundColor: '#c0392b',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  lifetimeBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dataCard: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  dataCardHighlight: {
    borderColor: '#c0392b',
  },
  dataLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  dataValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  excelBtn: {
    backgroundColor: '#c0392b',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  excelBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reportBtn: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  reportBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    borderWidth: 1,
    borderColor: '#333',
  },
  pickerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  pickerLabel: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
    marginTop: 5,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  optionBtnActive: {
    backgroundColor: '#c0392b',
    borderColor: '#c0392b',
  },
  optionText: {
    color: '#888',
    fontSize: 13,
  },
  optionTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmBtn: {
    backgroundColor: '#c0392b',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});