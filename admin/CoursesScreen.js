import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Modal,
  Pressable
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // navigation for editing courses and modal

// Sample data to match your screenshot
const COURSE_DATA = [
  { id: '1', title: 'Basic in AI', uni: 'NED University', prof: 'Sir Asadullah', date: '29 Jan 26 – 29 Feb 26' },
  { id: '2', title: 'Graphic Designing', uni: 'Suffa University', prof: 'Sir Asadullah', date: '29 Jan 26 – 29 Feb 26' },
  { id: '3', title: 'Machine Learning', uni: 'Karachi University', prof: 'Sir Bilal', date: '29 Jan 26 – 29 Feb 26' },
  { id: '4', title: 'Python for Basic', uni: 'NED University', prof: 'Sir Asadullah', date: '29 Jan 26 – 29 Feb 26' },
  { id: '5', title: 'Sales and Marketing', uni: 'NED University', prof: 'Sir Asadullah', date: '29 Jan 26 – 29 Feb 26' },
];

const CourseItem = ({ item, onEdit }) => (
  <View style={styles.courseCard}>
    <Image
      source={require('../assets/anna-avatar.png')}
      style={styles.avatar}
    />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseUni}>{item.uni}</Text>
      <Text style={styles.courseProf}>{item.prof}({item.date})</Text>
    </View>
    <TouchableOpacity onPress={() => onEdit(item)}>
      <MaterialCommunityIcons name="pencil" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export default function CoursesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Helper to close modal and navigate
  const navigateFromModal = (screen) => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Centered Header */}
        <View style={styles.header}>
          <View style={{ width: 28 }} /> 
          <Text style={styles.headerText}>Courses Managment</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GenerateTeacherAccount')}>
            <MaterialCommunityIcons name="plus-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Add Courses Button - Triggers Modal */}
        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addBtnText}>Add Courses</Text>
          <View style={styles.addIconCircle}>
             <MaterialCommunityIcons name="plus" size={24} color="#555" />
          </View>
        </TouchableOpacity>

        {/* Sections */}
        <SectionHeader title="Current Courses" />
        {COURSE_DATA.map(item => (
          <CourseItem 
            key={item.id} 
            item={item} 
            onEdit={() => navigation.navigate('EditCourse', { courseId: item.id })} 
          />
        ))}

        <SectionHeader title="Next Courses" />
        {COURSE_DATA.slice(0, 2).map(item => (
          <CourseItem 
            key={`next-${item.id}`} 
            item={item} 
            onEdit={() => navigation.navigate('EditCourse', { courseId: item.id })}
          />
        ))}

        <SectionHeader title="Finished Courses" />
        {COURSE_DATA.slice(0, 2).map(item => (
          <CourseItem 
            key={`fin-${item.id}`} 
            item={item} 
            onEdit={() => navigation.navigate('EditCourse', { courseId: item.id })}
          />
        ))}
        
        {/* Padding for Navbar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Styled Modal for Adding Courses */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={() => navigateFromModal('AddCampus')}
            >
              <Text style={styles.modalOptionText}>Add New Campus</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => navigateFromModal('LaunchCourse')}
            >
              <Text style={styles.modalOptionText}>Launch New Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.modalOption, styles.redOption]}
              onPress={() => navigateFromModal('NewCourse')}
            >
              <Text style={[styles.modalOptionText, styles.whiteText]}>Add New Courses</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
    paddingTop: 20, // separate the header from the top of the screen
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  addBtn: {
    backgroundColor: '#666',
    height: 80,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  addBtnText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addIconCircle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFCC99', 
  },
  courseInfo: {
    flex: 1,
    marginLeft: 15,
  },
  courseTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseUni: {
    color: '#CCC',
    fontSize: 14,
  },
  courseProf: {
    color: '#AAA',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2A2A2A',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    width: '100%',
    backgroundColor: '#D1D1D1',
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  redOption: {
    backgroundColor: '#8B0000', 
  },
  modalOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  whiteText: {
    color: '#FFF',
  },
});