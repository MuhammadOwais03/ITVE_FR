import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  SafeAreaView,
  Platform,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "./components/Navbar";

const { width, height } = Dimensions.get("window");

const ScholarshipScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  const categories = ["All", "Academic", "Need-Based", "Merit", "Sports", "Research"];

  const scholarships = [
    {
      id: 1,
      title: "Merit-Based Scholarship",
      provider: "University Excellence Program",
      deadline: "Dec 15, 2024",
      category: "Academic",
      criteria: "GPA 3.5+, Leadership experience",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
      description: "Awarded to students demonstrating exceptional academic performance and leadership qualities.",
    },
    {
      id: 2,
      title: "Need-Based Financial Aid",
      provider: "Student Support Foundation",
      deadline: "Jan 30, 2025",
      category: "Need-Based",
      criteria: "Income verification required",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
      description: "Financial assistance for students from low-income families.",
    },
    {
      id: 3,
      title: "STEM Research Grant",
      provider: "Tech Innovation Council",
      deadline: "Feb 28, 2025",
      category: "Research",
      criteria: "STEM majors, Research proposal",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
      description: "Support for innovative research projects in STEM fields.",
    },
    {
      id: 4,
      title: "Athletic Scholarship",
      provider: "Sports Excellence Program",
      deadline: "Mar 15, 2025",
      category: "Sports",
      criteria: "Sports achievements, Team participation",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      description: "For students excelling in sports and representing the university.",
    },
    {
      id: 5,
      title: "Community Service Award",
      provider: "Social Impact Foundation",
      deadline: "Apr 10, 2025",
      category: "Merit",
      criteria: "100+ volunteer hours",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      description: "Recognizing students with outstanding community service records.",
    },
    {
      id: 6,
      title: "International Student Grant",
      provider: "Global Education Initiative",
      deadline: "May 20, 2025",
      category: "Academic",
      criteria: "International students, GPA 3.2+",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      description: "Financial support for outstanding international students.",
    },
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = searchQuery === "" || 
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = () => {
    setShowApplicationModal(false);
    // Show success alert with animation
    setShowSuccessAlert(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();

    // Auto-hide after 3 seconds
    setTimeout(() => {
      hideSuccessAlert();
    }, 3000);
  };

  const hideSuccessAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowSuccessAlert(false);
      scaleAnim.setValue(0.8);
    });
  };

  const SuccessAlert = () => {
    if (!showSuccessAlert) return null;

    return (
      <Animated.View 
        style={[
          styles.successAlert,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.successAlertContent}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#4CD964" />
          </View>
          <Text style={styles.successTitle}>Scholarship Applied!</Text>
          <Text style={styles.successMessage}>
            Your application has been submitted successfully. You will be notified via email.
          </Text>
          <TouchableOpacity 
            style={styles.successButton}
            onPress={hideSuccessAlert}
          >
            <Text style={styles.successButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={COLORS.studentPortal.gradient.colors}
        start={COLORS.studentPortal.gradient.start}
        end={COLORS.studentPortal.gradient.end}
        style={styles.gradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scholarships</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#aaa" style={styles.searchIcon} />
            <TextInput
              placeholder="Search scholarships..."
              placeholderTextColor="#ccc"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#aaa" />
              </TouchableOpacity>
            )}
          </View>

          {/* Categories */}
          <View style={{ height: 60 }}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.categoryChipActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Results Count */}
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>
              {filteredScholarships.length} scholarships available
            </Text>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter-outline" size={20} color="#A9CBEA" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>

          {/* Scholarships List */}
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollListContent}
          >
            {filteredScholarships.map((scholarship) => (
              <TouchableOpacity 
                key={scholarship.id}
                style={styles.scholarshipCard}
                onPress={() => handleApply(scholarship)}
              >
                <View style={styles.cardHeader}>
                  <Image source={{ uri: scholarship.image }} style={styles.scholarshipImage} />
                  <View style={styles.cardHeaderContent}>
                    <Text style={styles.scholarshipTitle}>{scholarship.title}</Text>
                    <Text style={styles.scholarshipProvider}>{scholarship.provider}</Text>
                  </View>
                </View>

                <View style={styles.cardDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Ionicons name="calendar-outline" size={16} color="#A9CBEA" />
                      <Text style={styles.detailText}>Deadline: {scholarship.deadline}</Text>
                    </View>
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText}>{scholarship.category}</Text>
                    </View>
                  </View>

                  <View style={styles.criteriaContainer}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#4CD964" />
                    <Text style={styles.criteriaText}>Criteria: {scholarship.criteria}</Text>
                  </View>

                  <Text style={styles.descriptionText} numberOfLines={2}>
                    {scholarship.description}
                  </Text>

                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={() => handleApply(scholarship)}
                  >
                    <Ionicons name="rocket-outline" size={18} color="#fff" />
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

            {filteredScholarships.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color="#A9CBEA" />
                <Text style={styles.emptyStateTitle}>No Scholarships Found</Text>
                <Text style={styles.emptyStateText}>Try adjusting your search</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Application Modal */}
      <Modal
        visible={showApplicationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowApplicationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            activeOpacity={1}
            onPress={() => setShowApplicationModal(false)}
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Ionicons name="trophy-outline" size={24} color="#FFD700" style={styles.modalTitleIcon} />
                <Text style={styles.modalTitle}>Apply for Scholarship</Text>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseBtn}
                onPress={() => setShowApplicationModal(false)}
              >
                <Ionicons name="close-circle" size={28} color="#A9CBEA" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.modalContent}
            >
              {selectedScholarship && (
                <>
                  <View style={styles.modalScholarshipInfo}>
                    <View style={styles.modalScholarshipHeader}>
                      <Text style={styles.modalScholarshipTitle}>{selectedScholarship.title}</Text>

                    </View>
                    <Text style={styles.modalScholarshipProvider}>{selectedScholarship.provider}</Text>
                    
                    <View style={styles.modalInfoRow}>
                      <View style={styles.modalInfoItem}>
                        <Ionicons name="calendar-outline" size={16} color="#A9CBEA" />
                        <Text style={styles.modalInfoText}>Deadline: {selectedScholarship.deadline}</Text>
                      </View>
                      <View style={[
                        styles.categoryBadge,
                        { backgroundColor: 'rgba(41, 121, 255, 0.2)' }
                      ]}>
                        <Text style={styles.categoryBadgeText}>{selectedScholarship.category}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.formSection}>
                    <Text style={styles.formLabel}>
                      <Ionicons name="person-outline" size={18} color="#A9CBEA" /> Personal Information
                    </Text>
                    <View style={styles.formGroup}>
                      <Ionicons name="person-circle-outline" size={20} color="#A9CBEA" style={styles.formIcon} />
                      <TextInput 
                        style={styles.formInput} 
                        placeholder="Full Name" 
                        placeholderTextColor="#888" 
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Ionicons name="id-card-outline" size={20} color="#A9CBEA" style={styles.formIcon} />
                      <TextInput 
                        style={styles.formInput} 
                        placeholder="Student ID" 
                        placeholderTextColor="#888" 
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Ionicons name="mail-outline" size={20} color="#A9CBEA" style={styles.formIcon} />
                      <TextInput 
                        style={styles.formInput} 
                        placeholder="Email Address" 
                        placeholderTextColor="#888" 
                        keyboardType="email-address" 
                      />
                    </View>
                  </View>

                  <View style={styles.formSection}>
                    <Text style={styles.formLabel}>
                      <Ionicons name="school-outline" size={18} color="#A9CBEA" /> Academic Information
                    </Text>
                    <View style={styles.formGroup}>
                      <Ionicons name="stats-chart-outline" size={20} color="#A9CBEA" style={styles.formIcon} />
                      <TextInput 
                        style={styles.formInput} 
                        placeholder="Current GPA" 
                        placeholderTextColor="#888" 
                        keyboardType="numeric" 
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Ionicons name="library-outline" size={20} color="#A9CBEA" style={styles.formIcon} />
                      <TextInput 
                        style={styles.formInput} 
                        placeholder="Major/Program" 
                        placeholderTextColor="#888" 
                      />
                    </View>
                  </View>

                  <View style={styles.formSection}>
                    <Text style={styles.formLabel}>
                      <Ionicons name="document-attach-outline" size={18} color="#A9CBEA" /> Required Documents
                    </Text>
                    <View style={styles.documentsList}>
                      <View style={styles.documentItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CD964" />
                        <Text style={styles.documentText}>Transcript (PDF)</Text>
                      </View>
                      <View style={styles.documentItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CD964" />
                        <Text style={styles.documentText}>Recommendation Letter</Text>
                      </View>
                      <View style={styles.documentItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CD964" />
                        <Text style={styles.documentText}>Personal Statement</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.submitButton} 
                    onPress={handleApplicationSubmit}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="send" size={22} color="#fff" />
                    <Text style={styles.submitButtonText}>Submit Application</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Success Alert */}
      <SuccessAlert />

      <Navbar navigation={navigation} active="Scholarship" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 40 : 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(36, 78, 120, 0.5)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(36, 78, 120, 0.3)",
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(169, 203, 234, 0.2)",
    height: 40,
  },
  categoryChipActive: {
    backgroundColor: "#2979ff",
    borderColor: "#2979ff",
  },
  categoryText: {
    color: "#A9CBEA",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  resultsText: {
    color: "#BFD7EA",
    fontSize: 16,
    fontWeight: "600",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(36, 78, 120, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterText: {
    color: "#A9CBEA",
    marginLeft: 6,
    fontSize: 14,
  },
  scrollListContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  scholarshipCard: {
    backgroundColor: "rgba(36, 78, 120, 0.2)",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(169, 203, 234, 0.15)",
  },
  cardHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(169, 203, 234, 0.1)",
  },
  scholarshipImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  cardHeaderContent: {
    flex: 1,
  },
  scholarshipTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  scholarshipProvider: {
    color: "#A9CBEA",
    fontSize: 14,
    marginBottom: 8,
  },
  cardDetails: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    color: "#BFD7EA",
    fontSize: 14,
    marginLeft: 8,
  },
  categoryBadge: {
    backgroundColor: "rgba(41, 121, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2979ff",
  },
  categoryBadgeText: {
    color: "#2979ff",
    fontSize: 12,
    fontWeight: "600",
  },
  criteriaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  criteriaText: {
    color: "#4CD964",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  descriptionText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2979ff",
    paddingVertical: 14,
    borderRadius: 12,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    color: "#A9CBEA",
    fontSize: 16,
    textAlign: "center",
  },
  // Enhanced Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: "#1f3b57",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#244E78",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(36, 78, 120, 0.3)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(169, 203, 234, 0.1)",
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitleIcon: {
    marginRight: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScrollView: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
    paddingBottom: 40,
  },
  modalScholarshipInfo: {
    backgroundColor: "rgba(36, 78, 120, 0.2)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  modalScholarshipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  modalScholarshipTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
  },
  modalScholarshipProvider: {
    color: "#A9CBEA",
    fontSize: 15,
    marginBottom: 12,
  },
  modalInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalInfoText: {
    color: "#BFD7EA",
    fontSize: 14,
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(36, 78, 120, 0.3)",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(169, 203, 234, 0.2)",
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 14,
  },
  documentsList: {
    backgroundColor: "rgba(36, 78, 120, 0.2)",
    borderRadius: 12,
    padding: 16,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  documentText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 12,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CD964",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  // Success Alert Styles
  successAlert: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  successAlertContent: {
    width: width * 0.85,
    backgroundColor: "#1f3b57",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(76, 217, 100, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(76, 217, 100, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  successTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  successMessage: {
    color: "#A9CBEA",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
  },
  successButton: {
    backgroundColor: "#2979ff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  successButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ScholarshipScreen;
