import React, { useState } from 'react';
import StatusBar from 'react-native';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, SafeAreaView, Image, Modal, Pressable, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');

export default function LaunchCourse() {
  const navigation = useNavigation();
  const [isPreview, setIsPreview] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showFullIntroduction, setShowFullIntroduction] = useState(false);
  
  // Dropdown visibility states
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    mainDomain: '',
    mainCourse: '',
    subCourse: '',
    supervisorName: '',
    checkerName: '',
    campus: '',
    advertiseDate: '',
    batchStartDate: '',
    batchEndDate: '',
    advertisingRadius: '',
    totalSeats: '',
    pricePerMonth: '',
    timeDay1: '',
    timeDay2: ''
  });

  // Dropdown options
  const mainDomainOptions = ['AI & Machine Learning', 'Web Development', 'Mobile App Development', 'Data Science', 'Cyber Security'];
  const mainCourseOptions = ['Python Programming', 'JavaScript', 'React Native', 'Node.js', 'Database Management'];
  const subCourseOptions = ['Beginner Level', 'Intermediate Level', 'Advanced Level', 'Professional Track'];
  const campusOptions = ['NED University (Main Campus)', 'Karachi University', 'Suffa University', 'Online Campus'];
  const advertisingRadiusOptions = ['5 km', '10 km', '15 km', '20 km', '25 km', '30 km'];

  const handleLaunch = () => {
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

  const showDropdown = (dropdownName, event) => {
    // Get the layout position of the pressed element
    event.target.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPosition({
        top: pageY + height + 5,
        left: pageX,
        width: width,
      });
      setActiveDropdown(dropdownName);
    });
  };

  const showDatePickerModal = (field) => {
    setActiveDateField(field);
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      switch(activeDateField) {
        case 'advertiseDate':
          setFormData({...formData, advertiseDate: formattedDate});
          break;
        case 'batchStartDate':
          setFormData({...formData, batchStartDate: formattedDate});
          break;
        case 'batchEndDate':
          setFormData({...formData, batchEndDate: formattedDate});
          break;
      }
    }
  };

  const DropdownInput = ({ label, value, onPress }) => (
    <TouchableOpacity 
      style={styles.pillInput} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.inputText, value && { color: 'white' }]}>
        {value || label}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={24} color="white" />
    </TouchableOpacity>
  );

  const DateInput = ({ label, value, onPress }) => (
    <TouchableOpacity 
      style={styles.pillInput} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.inputText, value && { color: 'white' }]}>
        {value || label}
      </Text>
      <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
    </TouchableOpacity>
  );

  const StandardInput = ({ placeholder, value, onChangeText, keyboardType }) => (
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

  const DropdownMenu = ({ visible, options, onSelect, onClose }) => {
    if (!visible) return null;
    
    return (
      <>
        <Pressable style={styles.dropdownOverlay} onPress={onClose} />
        <View style={[styles.dropdownMenu, {
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
        }]}>
          <ScrollView 
            style={styles.dropdownScroll} 
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    );
  };

  // Scholarship Modal Component
  const ScholarshipModal = ({ visible, onClose }) => {
    const [scholarshipExpandedSections, setScholarshipExpandedSections] = useState({});
    const [showFullScholarshipIntro, setShowFullScholarshipIntro] = useState(false);
    
    const toggleScholarshipSection = (section) => {
      setScholarshipExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };

    const completionPercentage = 40;
    
    const scholarshipLectures = [
      {
        title: "Module 1: Eligibility Criteria",
        subtopics: ["1.1 Academic Requirements", "1.2 Financial Need Assessment", "1.3 Merit-Based Criteria", "1.4 Application Checklist"],
        duration: "30 min"
      },
      {
        title: "Module 2: Application Process",
        subtopics: ["2.1 Online Application", "2.2 Required Documents", "2.3 Submission Guidelines", "2.4 Important Deadlines"],
        duration: "45 min"
      },
      {
        title: "Module 3: Selection Procedure",
        subtopics: ["3.1 Review Process", "3.2 Interview Preparation", "3.3 Selection Timeline", "3.4 Award Acceptance"],
        duration: "35 min"
      }
    ];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            activeOpacity={1}
            onPress={onClose}
          />
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialCommunityIcons name="close-circle" size={30} color="#fff" />
            </TouchableOpacity>

            <Image 
              source={{ uri: 'https://img.freepik.com/free-vector/scholarship-concept-illustration_114360-7895.jpg' }} 
              style={styles.modalImage} 
            />

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.modalDetails}>
                <Text style={styles.modalTitle}>Scholarship Program 2026</Text>

                <View style={styles.categoryRow}>
                  <View style={styles.categoryBadge}>
                    <MaterialCommunityIcons name="school-outline" size={14} color="#50c2ff" />
                    <Text style={styles.modalCategory}>Financial Aid</Text>
                  </View>
                  <View style={styles.levelBadge}>
                    <MaterialCommunityIcons name="signal" size={14} color="#A9CBEA" />
                    <Text style={styles.levelText}>Merit Based</Text>
                  </View>
                  <View style={styles.priceBadge}>
                    <Text style={styles.modalPrice}>50-100%</Text>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar-outline" size={16} color="#A9CBEA" />
                    <Text style={styles.modalText}>Duration: Full Course Coverage</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#A9CBEA" />
                    <Text style={styles.modalText}>Deadline: 15th March 2026</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={16} color="#A9CBEA" />
                    <Text style={styles.modalText}>All Partner Universities</Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.ringGraph}>
                    <View style={styles.ringSvg}>
                      <View style={[styles.ring, styles.ringBackground]} />
                      <View style={[styles.ring, styles.scholarshipRingProgress]} />
                    </View>
                    <View style={styles.percentageText}>
                      <Text style={styles.percentageValue}>{completionPercentage}%</Text>
                      <Text style={styles.percentageLabel}>Complete</Text>
                    </View>
                  </View>
                  <View style={styles.courseStats}>
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="file-document-outline" size={18} color="#A9CBEA" />
                      <Text style={styles.statValue}>4</Text>
                      <Text style={styles.statLabel}>Steps</Text>
                    </View>
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="clipboard-text-outline" size={18} color="#A9CBEA" />
                      <Text style={styles.statValue}>6</Text>
                      <Text style={styles.statLabel}>Docs</Text>
                    </View>
                    <View style={styles.statItem}>
                      <MaterialCommunityIcons name="trophy-outline" size={18} color="#A9CBEA" />
                      <Text style={styles.statValue}>20</Text>
                      <Text style={styles.statLabel}>Awards</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.instructorCard}>
                  <View style={styles.instructorAvatar}>
                    <MaterialCommunityIcons name="account-tie" size={50} color="#50c2ff" />
                  </View>
                  <View style={styles.instructorInfo}>
                    <Text style={styles.instructorName}>Scholarship Committee</Text>
                    <Text style={styles.instructorTitle}>Financial Aid Office</Text>
                    <View style={styles.instructorExp}>
                      <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.instructorExpText}> 4.8 • 10+ years</Text>
                    </View>
                    <Text style={styles.instructorExpText}>500+ students awarded</Text>
                  </View>
                </View>

                <Text style={styles.modalSubheading}>Program Overview:</Text>
                <View style={styles.introductionContainer}>
                  <Text style={styles.modalParagraph} numberOfLines={showFullScholarshipIntro ? 0 : 2}>
                    {showFullScholarshipIntro 
                      ? "This comprehensive scholarship program is designed to support talented students who demonstrate exceptional academic potential and financial need. We offer partial to full tuition coverage for various courses including AI Engineering, Data Science, Web Development, and more. The program includes mentorship opportunities, networking events, and career guidance from industry experts. Selected scholars will also get access to exclusive workshops and internship opportunities with our partner organizations."
                      : "This comprehensive scholarship program is designed to support talented students who demonstrate exceptional academic potential and financial need."}
                  </Text>
                  <TouchableOpacity onPress={() => setShowFullScholarshipIntro(!showFullScholarshipIntro)}>
                    <Text style={styles.readMoreText}>
                      {showFullScholarshipIntro ? "Read Less" : "Read More"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalSubheading}>Eligibility Criteria:</Text>
                <View style={styles.modulesList}>
                  {[
                    "Minimum 60% in previous degree",
                    "Household income below threshold",
                    "Active participation in extracurriculars",
                    "Strong recommendation letters"
                  ].map((item, index) => (
                    <View key={index} style={styles.moduleItem}>
                      <MaterialCommunityIcons name="check-circle" size={16} color="#4CD964" />
                      <Text style={styles.moduleText}>{item}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.modalSubheading}>Required Documents:</Text>
                <View style={styles.featuresList}>
                  {[
                    "Academic transcripts",
                    "Income certificate",
                    "Recommendation letters (2)",
                    "Statement of purpose"
                  ].map((item, index) => (
                    <View key={index} style={styles.featureItem}>
                      <MaterialCommunityIcons name="file-document-outline" size={16} color="#4CD964" />
                      <Text style={styles.featureText}>{item}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.modalSubheading}>Application Process:</Text>
                <View style={styles.contentSection}>
                  {scholarshipLectures.map((lecture, index) => (
                    <View key={index} style={styles.lectureContainer}>
                      <TouchableOpacity 
                        style={styles.lectureHeader}
                        onPress={() => toggleScholarshipSection(index)}
                      >
                        <View style={styles.lectureTitleContainer}>
                          <MaterialCommunityIcons 
                            name={scholarshipExpandedSections[index] ? "chevron-down" : "chevron-right"} 
                            size={16} 
                            color="#50c2ff" 
                          />
                          <Text style={styles.lectureTitle}>{lecture.title}</Text>
                        </View>
                        <Text style={styles.lectureDuration}>{lecture.duration}</Text>
                      </TouchableOpacity>
                      
                      {scholarshipExpandedSections[index] && (
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
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.modalButton, styles.scholarshipButton]}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="close" size={18} color="#fff" />
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.payButton]}
                activeOpacity={0.8}
                onPress={() => {
                  onClose();
                  // Navigate to application form
                }}
              >
                <MaterialCommunityIcons name="file-document-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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
              {/* Scholarship button removed as per design; only launch action remains */}
              <TouchableOpacity 
                style={[styles.previewActionBtn, styles.launchBtn]}
                onPress={handleLaunch}
              >
                <MaterialCommunityIcons name="rocket-launch-outline" size={18} color="#fff" />
                <Text style={styles.previewActionBtnText}>Launch Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button only */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Launch New Courses</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <DropdownInput 
            label="Main Domain" 
            value={formData.mainDomain}
            onPress={(event) => showDropdown('mainDomain', event)} 
          />
          
          <DropdownInput 
            label="Main Course" 
            value={formData.mainCourse}
            onPress={(event) => showDropdown('mainCourse', event)} 
          />

          <DropdownInput 
            label="Sub-Course" 
            value={formData.subCourse}
            onPress={(event) => showDropdown('subCourse', event)} 
          />

          <StandardInput 
            placeholder="Supervisor Name" 
            value={formData.supervisorName}
            onChangeText={(text) => setFormData({...formData, supervisorName: text})}
          />
          <StandardInput 
            placeholder="Checker Name" 
            value={formData.checkerName}
            onChangeText={(text) => setFormData({...formData, checkerName: text})}
          />

          <DropdownInput 
            label="Campus" 
            value={formData.campus}
            onPress={(event) => showDropdown('campus', event)} 
          />

          {/* Date inputs with calendar */}
          <DateInput 
            label="Advertise Date" 
            value={formData.advertiseDate}
            onPress={() => showDatePickerModal('advertiseDate')} 
          />

          <DateInput 
            label="Batch Start Date" 
            value={formData.batchStartDate}
            onPress={() => showDatePickerModal('batchStartDate')} 
          />

          <DateInput 
            label="Batch End Date" 
            value={formData.batchEndDate}
            onPress={() => showDatePickerModal('batchEndDate')} 
          />

          <DropdownInput 
            label="Advertising Radius" 
            value={formData.advertisingRadius}
            onPress={(event) => showDropdown('advertisingRadius', event)} 
          />

          <StandardInput 
            placeholder="Total Seats" 
            value={formData.totalSeats}
            onChangeText={(text) => setFormData({...formData, totalSeats: text})}
            keyboardType="numeric"
          />
          <StandardInput 
            placeholder="Price per Month" 
            value={formData.pricePerMonth}
            onChangeText={(text) => setFormData({...formData, pricePerMonth: text})}
            keyboardType="numeric"
          />

          <View style={styles.daysContainer}>
            <Text style={styles.daysLabel}>Days</Text>
            <Text style={styles.daysText}>M T W T F S S</Text>
          </View>

          <StandardInput 
            placeholder="Time for Day 1" 
            value={formData.timeDay1}
            onChangeText={(text) => setFormData({...formData, timeDay1: text})}
          />
          <StandardInput 
            placeholder="Time for Day 2" 
            value={formData.timeDay2}
            onChangeText={(text) => setFormData({...formData, timeDay2: text})}
          />

          <TouchableOpacity style={styles.previewBtn} onPress={() => setIsPreview(true)}>
            <Text style={styles.previewBtnText}>Preview</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Dropdown Menus */}
      <DropdownMenu 
        visible={activeDropdown === 'mainDomain'}
        options={mainDomainOptions}
        onSelect={(value) => setFormData({...formData, mainDomain: value})}
        onClose={() => setActiveDropdown(null)}
      />

      <DropdownMenu 
        visible={activeDropdown === 'mainCourse'}
        options={mainCourseOptions}
        onSelect={(value) => setFormData({...formData, mainCourse: value})}
        onClose={() => setActiveDropdown(null)}
      />

      <DropdownMenu 
        visible={activeDropdown === 'subCourse'}
        options={subCourseOptions}
        onSelect={(value) => setFormData({...formData, subCourse: value})}
        onClose={() => setActiveDropdown(null)}
      />

      <DropdownMenu 
        visible={activeDropdown === 'campus'}
        options={campusOptions}
        onSelect={(value) => setFormData({...formData, campus: value})}
        onClose={() => setActiveDropdown(null)}
      />

      <DropdownMenu 
        visible={activeDropdown === 'advertisingRadius'}
        options={advertisingRadiusOptions}
        onSelect={(value) => setFormData({...formData, advertisingRadius: value})}
        onClose={() => setActiveDropdown(null)}
      />

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}
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
  inputText: { 
    color: 'rgba(255,255,255,0.6)', 
    fontSize: 16 
  },
  textInputStyle: { 
    color: 'white', 
    flex: 1, 
    fontSize: 16 
  },
  daysContainer: { 
    paddingHorizontal: 20, 
    marginBottom: 15 
  },
  daysLabel: { 
    color: 'rgba(255,255,255,0.5)', 
    fontSize: 14 
  },
  daysText: { 
    color: 'white', 
    fontSize: 18, 
    letterSpacing: 10, 
    marginTop: 5 
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
  
  // Dropdown Menu Styles
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: '#1f3b57',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    maxHeight: 200,
    zIndex: 1001,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
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
  modalContainer: {
    width: width * 0.9,
    maxWidth: 340,
    backgroundColor: '#1f3b57',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    maxHeight: height * 0.8,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalImage: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    marginBottom: 15,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  modalDetails: {
    width: '100%',
    paddingHorizontal: 5,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
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
  scholarshipRingProgress: {
    borderColor: '#FFA500',
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
  modalSubheading: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
  },
  introductionContainer: {
    marginBottom: 15,
  },
  modalParagraph: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 18,
  },
  readMoreText: {
    color: '#50c2ff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  modulesList: {
    marginBottom: 15,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  moduleText: {
    color: '#ccc',
    fontSize: 13,
    flex: 1,
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    gap: 10,
  },
  modalButton: {
    flex: 0.48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  scholarshipButton: {
    backgroundColor: '#FFA500',
  },
  payButton: {
    backgroundColor: '#2979ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },

  // Preview Section Styles
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
  launchBtn: {
    backgroundColor: '#B20000',
  },
  previewActionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  
  // Success Modal Styles
  successModalContent: {
    width: width * 0.8,
    maxWidth: 340,
    backgroundColor: '#1f3b57',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  successIcon: {
    marginBottom: 15,
  },
  successTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successMessage: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  successButton: {
    backgroundColor: '#4CD964',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});