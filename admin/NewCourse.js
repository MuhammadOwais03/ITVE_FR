import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, Image, Modal, Pressable, Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function NewCourse() {
  const navigation = useNavigation();
  const [isPreview, setIsPreview] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showFullIntroduction, setShowFullIntroduction] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    mainDomain: '',
    mainCourse: '',
    subCourse: '',
    percentage: '',
    duration: '',
    totalLessons: '',
    totalQuizzes: '',
    totalTests: '',
    campus: '',
    courseLevel: '',
    modules: '',
    perWeekHours: '',
    advertisingRadius: '',
    introduction: ''
  });

  const handleAddCourse = () => {
    navigation.navigate('Courses');
  };

  const navigateToCourses = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Courses');
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleIntroduction = () => {
    setShowFullIntroduction(!showFullIntroduction);
  };

  // Reusable Dropdown Input
  const DropdownInput = ({ label, value, onPress }) => (
    <TouchableOpacity style={styles.pillInput} onPress={onPress}>
      <Text style={[styles.inputText, value && { color: 'white' }]}>
        {value || label}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={24} color="white" />
    </TouchableOpacity>
  );

  // Reusable Text Input
  const TextInputField = ({ placeholder, value, onChangeText, keyboardType }) => (
    <View style={styles.pillInput}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.4)"
        style={styles.textInputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

  // Reusable Lesson Block
  const LessonBlock = ({ number }) => (
    <View style={styles.lessonContainer}>
      <View style={styles.largePill}>
        <TextInput 
          placeholder={`Lesson No ${number} Description`} 
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={styles.textInputStyle}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.uploadPill}>
        <Text style={styles.inputText}>Upload Content</Text>
        <MaterialCommunityIcons name="chevron-up" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  if (isPreview) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.previewHeader}>
          <TouchableOpacity onPress={() => setIsPreview(false)} style={styles.backCircle}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.previewTitle}>Python for AI</Text>
        </View>

        <ScrollView 
          style={styles.previewScrollView}
          contentContainerStyle={styles.previewScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.previewContent}>
            <Image 
              source={{ uri: 'https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-hand-human-hand-touching-point-concept-design_1150-40162.jpg' }} 
              style={styles.courseImage} 
            />
            
            <View style={styles.categoryRow}>
              <View style={styles.categoryBadge}>
                <MaterialCommunityIcons name="bookmark-outline" size={14} color="#50c2ff" />
                <Text style={styles.modalCategory}>AI Engineering</Text>
              </View>
              <View style={styles.levelBadge}>
                <MaterialCommunityIcons name="signal" size={14} color="#A9CBEA" />
                <Text style={styles.levelText}>Beginner Level</Text>
              </View>
              <View style={styles.priceBadge}>
                <Text style={styles.modalPrice}>Rs 5000/month</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="calendar-outline" size={16} color="#A9CBEA" />
                <Text style={styles.modalText}>Duration: 2 Months (8 Weeks)</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#A9CBEA" />
                <Text style={styles.modalText}>Sat 9:30-11:30 • Sun 9:30-12:30</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="map-marker-outline" size={16} color="#A9CBEA" />
                <Text style={styles.modalText}>NED University (Main Campus)</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.ringGraph}>
                <View style={styles.ringSvg}>
                  <View style={[styles.ring, styles.ringBackground]} />
                  <View style={[styles.ring, styles.ringProgress]} />
                </View>
                <View style={styles.percentageText}>
                  <Text style={styles.percentageValue}>65%</Text>
                  <Text style={styles.percentageLabel}>Complete</Text>
                </View>
              </View>
              <View style={styles.courseStats}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="book-open-variant" size={18} color="#A9CBEA" />
                  <Text style={styles.statValue}>8</Text>
                  <Text style={styles.statLabel}>Lessons</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="file-question-outline" size={18} color="#A9CBEA" />
                  <Text style={styles.statValue}>6</Text>
                  <Text style={styles.statLabel}>Quizzes</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="clipboard-text-outline" size={18} color="#A9CBEA" />
                  <Text style={styles.statValue}>2</Text>
                  <Text style={styles.statLabel}>Tests</Text>
                </View>
              </View>
            </View>

            <View style={styles.instructorCard}>
              <View style={styles.instructorAvatar}>
                <MaterialCommunityIcons name="account-circle" size={50} color="#50c2ff" />
              </View>
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>Dr. Sarah Ahmed</Text>
                <Text style={styles.instructorTitle}>Senior Technical Instructor</Text>
                <View style={styles.instructorExp}>
                  <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                  <Text style={styles.instructorExpText}> 4.9 • 8+ years exp</Text>
                </View>
                <Text style={styles.instructorExpText}>3,500+ students</Text>
              </View>
            </View>

            <Text style={styles.sectionHeader}>Course Introduction</Text>
            <View style={styles.introductionContainer}>
              <Text style={styles.bodyText} numberOfLines={showFullIntroduction ? 0 : 2}>
                {showFullIntroduction 
                  ? "This comprehensive Python for AI course is designed to take you from beginner to proficient. You'll master essential concepts through hands-on projects and real-world applications. Perfect for students looking to build a strong foundation in AI Engineering with expert guidance and industry-relevant curriculum. The course includes interactive sessions, practical assignments, and real-world case studies to ensure you gain practical experience alongside theoretical knowledge. Our expert instructors will guide you through every step, providing personalized feedback and support throughout your learning journey."
                  : "This comprehensive Python for AI course is designed to take you from beginner to proficient. You'll master essential concepts through hands-on projects and real-world applications."}
              </Text>
              <TouchableOpacity onPress={toggleIntroduction}>
                <Text style={styles.readMoreText}>
                  {showFullIntroduction ? "Read Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionHeader}>What You'll Learn</Text>
            <View style={styles.featuresList}>
              {[
                "Core fundamentals & theory",
                "Hands-on practical projects",
                "Industry-relevant skills",
                "Certificate of completion"
              ].map((item, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialCommunityIcons name="check-circle" size={16} color="#4CD964" />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionHeader}>Course Content</Text>
            <View style={styles.contentSection}>
              {[
                { title: "Module 1: Python Basics", duration: "45 min", subtopics: ["1.1 Introduction to Python", "1.2 Variables & Data Types", "1.3 Control Flow", "1.4 Functions"] },
                { title: "Module 2: AI Fundamentals", duration: "60 min", subtopics: ["2.1 Introduction to AI", "2.2 Machine Learning Basics", "2.3 Neural Networks", "2.4 Hands-on Project"] },
                { title: "Module 3: Advanced Topics", duration: "55 min", subtopics: ["3.1 Deep Learning", "3.2 NLP Basics", "3.3 Computer Vision", "3.4 Final Assessment"] }
              ].map((lecture, index) => (
                <View key={index} style={styles.lectureContainer}>
                  <TouchableOpacity 
                    style={styles.lectureHeader}
                    onPress={() => toggleSection(index)}
                  >
                    <View style={styles.lectureTitleContainer}>
                      <MaterialCommunityIcons 
                        name={expandedSections[index] ? "chevron-down" : "chevron-right"} 
                        size={16} 
                        color="#50c2ff" 
                      />
                      <Text style={styles.lectureTitle}>{lecture.title}</Text>
                    </View>
                    <Text style={styles.lectureDuration}>{lecture.duration}</Text>
                  </TouchableOpacity>
                  
                  {expandedSections[index] && (
                    <View style={styles.subtopicsContainer}>
                      {lecture.subtopics.map((subtopic, subIndex) => (
                        <View key={subIndex} style={styles.subtopicItem}>
                          <MaterialCommunityIcons name="play-circle-outline" size={14} color="#50c2ff" />
                          <Text style={styles.subtopicText}>{subtopic}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.previewButtons}>
              {/* Scholarship button removed; only Add Course remains */}
              <TouchableOpacity 
                style={[styles.previewActionBtn, styles.addCourseBtn]}
                onPress={handleAddCourse}
              >
                <MaterialCommunityIcons name="plus-circle-outline" size={18} color="#fff" />
                <Text style={styles.previewActionBtnText}>Add Course</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add New Course</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <DropdownInput 
            label="Main Domain Name" 
            value={formData.mainDomain}
            onPress={() => {}} 
          />
          
          <DropdownInput 
            label="Main Course Name" 
            value={formData.mainCourse}
            onPress={() => {}} 
          />

          <DropdownInput 
            label="Sub-Course Name" 
            value={formData.subCourse}
            onPress={() => {}} 
          />

          <TextInputField 
            placeholder="% of Main Course" 
            value={formData.percentage}
            onChangeText={(text) => setFormData({...formData, percentage: text})}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.pillInput}>
            <Text style={styles.inputText}>Upload Picture</Text>
            <MaterialCommunityIcons name="chevron-up" size={24} color="white" />
          </TouchableOpacity>

          <TextInputField 
            placeholder="Duration (e.g., 2 Months)" 
            value={formData.duration}
            onChangeText={(text) => setFormData({...formData, duration: text})}
          />
          <TextInputField 
            placeholder="Total Lessons" 
            value={formData.totalLessons}
            onChangeText={(text) => setFormData({...formData, totalLessons: text})}
            keyboardType="numeric"
          />
          <TextInputField 
            placeholder="Total Quizzes" 
            value={formData.totalQuizzes}
            onChangeText={(text) => setFormData({...formData, totalQuizzes: text})}
            keyboardType="numeric"
          />
          <TextInputField 
            placeholder="Total Tests" 
            value={formData.totalTests}
            onChangeText={(text) => setFormData({...formData, totalTests: text})}
            keyboardType="numeric"
          />
          <DropdownInput 
            label="Campus" 
            value={formData.campus}
            onPress={() => {}} 
          />
          <DropdownInput 
            label="Course Level" 
            value={formData.courseLevel}
            onPress={() => {}} 
          />
          <TextInputField 
            placeholder="Modules" 
            value={formData.modules}
            onChangeText={(text) => setFormData({...formData, modules: text})}
          />
          <TextInputField 
            placeholder="Per Week Hours" 
            value={formData.perWeekHours}
            onChangeText={(text) => setFormData({...formData, perWeekHours: text})}
          />
          <DropdownInput 
            label="Advertising Radius" 
            value={formData.advertisingRadius}
            onPress={() => {}} 
          />

          <Text style={styles.label}>Introduction:</Text>
          <View style={styles.introBox}>
            <TextInput 
              multiline 
              style={styles.textInputStyle} 
              placeholder="Type here..." 
              placeholderTextColor="#444"
              value={formData.introduction}
              onChangeText={(text) => setFormData({...formData, introduction: text})}
            />
          </View>

          {/* Lessons Section */}
          <LessonBlock number="1" />
          <LessonBlock number="2" />
          <LessonBlock number="3" />

          {/* Preview Button */}
          <TouchableOpacity style={styles.previewBtn} onPress={() => setIsPreview(true)}>
            <Text style={styles.previewBtnText}>Preview Course</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    marginTop: 55,
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  formContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  pillInput: {
    width: '100%', 
    height: 60, 
    borderRadius: 30, 
    borderWidth: 1, 
    borderColor: '#333',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    marginBottom: 15, 
    backgroundColor: '#000'
  },
  largePill: {
    width: '100%', 
    height: 100, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#333',
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    marginBottom: 10, 
    backgroundColor: '#000'
  },
  uploadPill: {
    width: '100%', 
    height: 50, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#333',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    marginBottom: 20, 
    backgroundColor: '#000'
  },
  inputText: { 
    color: 'rgba(255,255,255,0.6)', 
    fontSize: 16 
  },
  textInputStyle: { 
    color: 'white', 
    fontSize: 16, 
    textAlignVertical: 'top', 
    flex: 1 
  },
  label: { 
    color: 'white', 
    fontSize: 18, 
    marginBottom: 10, 
    marginTop: 10 
  },
  introBox: {
    width: '100%', 
    height: 120, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: '#333',
    padding: 15, 
    marginBottom: 20, 
    backgroundColor: '#000'
  },
  lessonContainer: { 
    marginBottom: 10 
  },
  previewBtn: {
    backgroundColor: '#E0E0E0', 
    height: 65, 
    borderRadius: 35,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 100,
  },
  previewBtnText: { 
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  
  // Preview Styles
  previewHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20,
    paddingTop: 10,
  },
  backCircle: { 
    backgroundColor: '#333', 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  previewTitle: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginLeft: 20 
  },
  previewScrollView: {
    flex: 1,
  },
  previewScrollContent: {
    paddingBottom: 30,
  },
  previewContent: { 
    paddingHorizontal: 20 
  },
  courseImage: { 
    width: '100%', 
    height: 180, 
    borderRadius: 20, 
    marginBottom: 20 
  },

  // Modal Styles (from your CoursesScreen)
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(80, 194, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  modalCategory: {
    color: '#50c2ff',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 5,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169, 203, 234, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    gap: 4,
  },
  levelText: {
    color: '#A9CBEA',
    fontSize: 12,
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  modalPrice: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: 'rgba(36, 78, 120, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 12,
    backgroundColor: 'rgba(36, 78, 120, 0.2)',
    borderRadius: 15,
  },
  ringGraph: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringSvg: {
    width: 70,
    height: 70,
    position: 'absolute',
  },
  ring: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    position: 'absolute',
  },
  ringBackground: {
    borderColor: '#2c4a6e',
  },
  ringProgress: {
    borderColor: '#4CD964',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  percentageText: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentageValue: {
    color: '#4CD964',
    fontSize: 14,
    fontWeight: '700',
  },
  percentageLabel: {
    color: '#A9CBEA',
    fontSize: 8,
  },
  courseStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  statLabel: {
    color: '#A9CBEA',
    fontSize: 9,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 78, 120, 0.3)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(80, 194, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructorTitle: {
    color: '#50c2ff',
    fontSize: 13,
    marginBottom: 4,
  },
  instructorExp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  instructorExpText: {
    color: '#A9CBEA',
    fontSize: 12,
  },
  sectionHeader: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10 
  },
  bodyText: { 
    color: 'rgba(255,255,255,0.7)', 
    lineHeight: 22 
  },
  introductionContainer: {
    marginBottom: 15,
  },
  readMoreText: {
    color: '#50c2ff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  featuresList: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 8,
  },
  contentSection: {
    marginBottom: 15,
  },
  lectureContainer: {
    backgroundColor: 'rgba(36, 78, 120, 0.15)',
    borderRadius: 12,
    marginBottom: 6,
    overflow: 'hidden',
  },
  lectureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(80, 194, 255, 0.05)',
  },
  lectureTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  lectureTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  lectureDuration: {
    color: '#A9CBEA',
    fontSize: 10,
  },
  subtopicsContainer: {
    padding: 8,
  },
  subtopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 8,
  },
  subtopicText: {
    color: '#ccc',
    fontSize: 11,
    flex: 1,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 120,
    gap: 10,
  },
  previewActionBtn: {
    width: 200,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  addCourseBtn: {
    backgroundColor: '#B20000',
  },
  previewActionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});