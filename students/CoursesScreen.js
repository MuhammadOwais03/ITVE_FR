import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "./components/Navbar";

// CourseModal Component - Only this part is modified, course cards remain untouched
const CourseModal = ({ visible, onClose, course, navigation }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [showFullIntroduction, setShowFullIntroduction] = useState(false);

    if (!course) return null;

    const handleScholarship = () => {
        onClose();
        navigation.navigate("Scholarship");
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

    // Calculate course completion (example: 65% completion)
    const completionPercentage = 65;

    // Course lectures data based on course title
    const getCourseLectures = () => {
        const baseLectures = [
            {
                title: "Module 1: Introduction",
                subtopics: ["1.1 Course Overview", "1.2 Basic Concepts", "1.3 Core Principles", "1.4 First Project"],
                duration: "45 min"
            },
            {
                title: "Module 2: Fundamentals",
                subtopics: ["2.1 Key Techniques", "2.2 Practical Applications", "2.3 Case Studies", "2.4 Hands-on Exercise"],
                duration: "60 min"
            },
            {
                title: "Module 3: Advanced Topics",
                subtopics: ["3.1 Advanced Methods", "3.2 Industry Best Practices", "3.3 Real-world Scenarios", "3.4 Final Assessment"],
                duration: "55 min"
            }
        ];
        return baseLectures;
    };

    const courseLectures = getCourseLectures();
    const courseLevel = course.title.includes("Advanced") ? "Advanced" : "Beginner";

    // Instructor details based on course category
    const getInstructorDetails = () => {
        if (course.category.includes("AI") || course.category.includes("Science")) {
            return {
                name: "Dr. Sarah Ahmed",
                title: "Senior Technical Instructor",
                experience: "8+ years",
                students: "3,500+",
                rating: 4.9
            };
        } else if (course.category.includes("Marketing") || course.category.includes("Sales")) {
            return {
                name: "Mr. Usman Khan",
                title: "Marketing Specialist",
                experience: "7+ years",
                students: "2,800+",
                rating: 4.8
            };
        } else {
            return {
                name: "Prof. Muhammad Ali",
                title: "Senior Course Instructor",
                experience: "6+ years",
                students: "2,200+",
                rating: 4.7
            };
        }
    };

    const instructor = getInstructorDetails();

    // Course introduction with read more/less functionality
    const getFullIntroduction = () => {
        return `This comprehensive ${course.title} course is designed to take you from beginner to proficient. You'll master essential concepts through hands-on projects and real-world applications. Perfect for students looking to build a strong foundation in ${course.category} with expert guidance and industry-relevant curriculum. The course includes interactive sessions, practical assignments, and real-world case studies to ensure you gain practical experience alongside theoretical knowledge. Our expert instructors will guide you through every step, providing personalized feedback and support throughout your learning journey.`;
    };

    const getShortIntroduction = () => {
        return `This comprehensive ${course.title} course is designed to take you from beginner to proficient. You'll master essential concepts through hands-on projects and real-world applications.`;
    };

    // Modules covered
    const getModulesCovered = () => {
        return [
            "Fundamental concepts and theories",
            "Practical hands-on projects",
            "Industry best practices",
            "Real-world applications",
            "Assessment and certification"
        ];
    };

    const modulesCovered = getModulesCovered();
    
    // Extract timing info from course details or use default
   // Force show the timing regardless of course details
const timingInfo = 'Sat 9:30-11:30 • Sun 9:30-12:30';

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
                        <Ionicons name="close-circle" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* Course Image - Fixed at top */}
                    <Image source={{ uri: course.image }} style={styles.modalImage} />

                    {/* Scrollable Content - All text content scrolls */}
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.modalDetails}>
                            {/* Course Title */}
                            <Text style={styles.modalTitle}>{course.title}</Text>

                            {/* Category, Level and Price Badges */}
                            <View style={styles.categoryRow}>
                                <View style={styles.categoryBadge}>
                                    <Ionicons name="bookmark-outline" size={14} color="#50c2ff" />
                                    <Text style={styles.modalCategory}>{course.category}</Text>
                                </View>
                                <View style={styles.levelBadge}>
                                    <Ionicons name="speedometer-outline" size={14} color="#A9CBEA" />
                                    <Text style={styles.levelText}>{courseLevel} Level</Text>
                                </View>
                                <View style={styles.priceBadge}>
                                    <Text style={styles.modalPrice}>{course.price}/month</Text>
                                </View>
                            </View>

                            {/* Time, Duration and Venue Section */}
                            <View style={styles.infoSection}>
                                <View style={styles.infoRow}>
                                    <Ionicons name="calendar-outline" size={16} color="#A9CBEA" />
                                    <Text style={styles.modalText}>Duration: 2 Months (8 Weeks)</Text>
                                </View>
                                
                                <View style={styles.infoRow}>
                                    <Ionicons name="time-outline" size={16} color="#A9CBEA" />
                                    <Text style={styles.modalText}>
                                        {timingInfo}
                                    </Text>
                                </View>
                                
                                <View style={styles.infoRow}>
                                    <Ionicons name="location-outline" size={16} color="#A9CBEA" />
                                    <Text style={styles.modalText}>
                                        {course.details.split('|')[0]?.replace('Venue:', '').trim() || 'NED University of Eng & Tech'}
                                    </Text>
                                </View>
                            </View>

                            {/* Progress Ring and Course Stats - After Time & Venue */}
                            <View style={styles.progressContainer}>
                                <View style={styles.ringGraph}>
                                    <View style={styles.ringSvg}>
                                        <View style={[styles.ring, styles.ringBackground]} />
                                        <View style={[styles.ring, styles.ringProgress]} />
                                    </View>
                                    <View style={styles.percentageText}>
                                        <Text style={styles.percentageValue}>{completionPercentage}%</Text>
                                        <Text style={styles.percentageLabel}>Complete</Text>
                                    </View>
                                </View>
                                <View style={styles.courseStats}>
                                    <View style={styles.statItem}>
                                        <Ionicons name="library-outline" size={18} color="#A9CBEA" />
                                        <Text style={styles.statValue}>8</Text>
                                        <Text style={styles.statLabel}>Lessons</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Ionicons name="document-text-outline" size={18} color="#A9CBEA" />
                                        <Text style={styles.statValue}>6</Text>
                                        <Text style={styles.statLabel}>Quizzes</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Ionicons name="clipboard-outline" size={18} color="#A9CBEA" />
                                        <Text style={styles.statValue}>2</Text>
                                        <Text style={styles.statLabel}>Tests</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Enhanced Instructor Card */}
                            <View style={styles.instructorCard}>
                                <View style={styles.instructorAvatar}>
                                    <Ionicons name="person-circle" size={50} color="#50c2ff" />
                                </View>
                                <View style={styles.instructorInfo}>
                                    <Text style={styles.instructorName}>{instructor.name}</Text>
                                    <Text style={styles.instructorTitle}>{instructor.title}</Text>
                                    <View style={styles.instructorExp}>
                                        <Ionicons name="star" size={14} color="#FFD700" />
                                        <Text style={styles.instructorExpText}> {instructor.rating} • {instructor.experience} exp</Text>
                                    </View>
                                    <Text style={styles.instructorExpText}>{instructor.students} students</Text>
                                </View>
                            </View>

                            {/* Course Introduction with Read More/Less */}
                            <Text style={styles.modalSubheading}>Course Introduction:</Text>
                            <View style={styles.introductionContainer}>
                                <Text style={styles.modalParagraph} numberOfLines={showFullIntroduction ? 0 : 2}>
                                    {showFullIntroduction ? getFullIntroduction() : getShortIntroduction()}
                                </Text>
                                <TouchableOpacity onPress={toggleIntroduction}>
                                    <Text style={styles.readMoreText}>
                                        {showFullIntroduction ? "Read Less" : "Read More"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Modules Covered */}
                            <Text style={styles.modalSubheading}>Modules Covered:</Text>
                            <View style={styles.modulesList}>
                                {modulesCovered.map((module, index) => (
                                    <View key={index} style={styles.moduleItem}>
                                        <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
                                        <Text style={styles.moduleText}>{module}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* What You'll Learn */}
                            <Text style={styles.modalSubheading}>What You'll Learn:</Text>
                            <View style={styles.featuresList}>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
                                    <Text style={styles.featureText}>Core fundamentals & theory</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
                                    <Text style={styles.featureText}>Hands-on practical projects</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
                                    <Text style={styles.featureText}>Industry-relevant skills</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={16} color="#4CD964" />
                                    <Text style={styles.featureText}>Certificate of completion</Text>
                                </View>
                            </View>

                            {/* Course Content with Expandable Sections */}
                            <Text style={styles.modalSubheading}>Course Content:</Text>
                            <View style={styles.contentSection}>
                                {courseLectures.map((lecture, index) => (
                                    <View key={index} style={styles.lectureContainer}>
                                        <TouchableOpacity 
                                            style={styles.lectureHeader}
                                            onPress={() => toggleSection(index)}
                                        >
                                            <View style={styles.lectureTitleContainer}>
                                                <Ionicons 
                                                    name={expandedSections[index] ? "chevron-down" : "chevron-forward"} 
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
                                                        <Ionicons name="play-circle-outline" size={14} color="#50c2ff" />
                                                        <Text style={styles.subtopicText}>{subtopic}</Text>
                                                        <Text style={styles.subtopicDuration}>10 min</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Action Buttons - Fixed at bottom */}
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            onPress={handleScholarship}
                            style={[styles.modalButton, styles.scholarshipButton]}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="trophy-outline" size={18} color="#fff" />
                            <Text style={styles.buttonText}>Scholarship</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.payButton]}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="card-outline" size={18} color="#fff" />
                            <Text style={styles.buttonText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Main CoursesScreen Component - COMPLETELY UNCHANGED
const CoursesScreen = ({ navigation }) => {
    const theme = COLORS.studentPortal;
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Combine all courses into one array for searching
    const allCourses = [
        ...recommendedCourses,
        ...aiCourses,
        ...marketingCourses,
        ...softSkills,
        ...vocationalCourses
    ];

    // Filter courses based on search query
    const filteredCourses = searchQuery.trim() === "" 
        ? null 
        : allCourses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const openCourseModal = (course) => {
        setSelectedCourse(course);
        setModalVisible(true);
    };
    
    const closeCourseModal = () => setModalVisible(false);

    return (
        <View style={[styles.container, { backgroundColor: theme.gradient.colors[2] }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Learning Journey</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#aaa" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Search for courses"
                    placeholderTextColor="#ccc"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={18} color="#aaa" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Show search results when searching */}
                {filteredCourses && (
                    <View style={styles.searchResultsContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                Search Results ({filteredCourses.length})
                            </Text>
                            {filteredCourses.length === 0 && (
                                <Text style={styles.noResults}>No courses found</Text>
                            )}
                        </View>
                        
                        {filteredCourses.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {filteredCourses.map((course, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.8}
                                        onPress={() => openCourseModal(course)}
                                        style={styles.courseCard}
                                    >
                                        <Image source={{ uri: course.image }} style={styles.courseImage} />
                                        <Text style={styles.category}>{course.category}</Text>
                                        <Text style={styles.courseTitle}>{course.title}</Text>
                                        <Text style={styles.details}>{course.details}</Text>
                                        <Text style={styles.price}>{course.price}/month</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}

                {/* Original sections (only show when not searching) - COMPLETELY UNCHANGED */}
                {!filteredCourses && (
                    <>
                        {/* Recommended Courses */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recommended Courses</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>Next Step →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {recommendedCourses.map((course, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    onPress={() => openCourseModal(course)}
                                    style={styles.courseCard}
                                >
                                    <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    <Text style={styles.category}>{course.category}</Text>
                                    <Text style={styles.courseTitle}>{course.title}</Text>
                                    <Text style={styles.details}>{course.details}</Text>
                                    <Text style={styles.price}>{course.price}/month</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* AI Engineering */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>AI Engineering</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>View All →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {aiCourses.map((course, index) => (
                                <TouchableOpacity key={index}
                                    activeOpacity={0.8}
                                    onPress={() => openCourseModal(course)}
                                    style={styles.courseCard}>
                                    <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    <Text style={styles.category}>{course.category}</Text>
                                    <Text style={styles.courseTitle}>{course.title}</Text>
                                    <Text style={styles.details}>{course.details}</Text>
                                    <Text style={styles.price}>{course.price}/month</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Marketing & Sales */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Marketing & Sales</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>View All →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {marketingCourses.map((course, index) => (
                                <TouchableOpacity key={index}
                                    activeOpacity={0.8}
                                    onPress={() => openCourseModal(course)}
                                    style={styles.courseCard}>
                                    <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    <Text style={styles.category}>{course.category}</Text>
                                    <Text style={styles.courseTitle}>{course.title}</Text>
                                    <Text style={styles.details}>{course.details}</Text>
                                    <Text style={styles.price}>{course.price}/month</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Soft Skills */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Soft Skills</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>View All →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {softSkills.map((course, index) => (
                                <TouchableOpacity key={index}
                                    activeOpacity={0.8}
                                    onPress={() => openCourseModal(course)}
                                    style={styles.courseCard}>
                                    <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    <Text style={styles.category}>{course.category}</Text>
                                    <Text style={styles.courseTitle}>{course.title}</Text>
                                    <Text style={styles.details}>{course.details}</Text>
                                    <Text style={styles.price}>{course.price}/month</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Vocational Courses */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Vocational Courses</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>View All →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {vocationalCourses.map((course, index) => (
                                <TouchableOpacity key={index}
                                    activeOpacity={0.8}
                                    onPress={() => openCourseModal(course)}
                                    style={styles.courseCard}>
                                    <Image source={{ uri: course.image }} style={styles.courseImage} />
                                    <Text style={styles.category}>{course.category}</Text>
                                    <Text style={styles.courseTitle}>{course.title}</Text>
                                    <Text style={styles.details}>{course.details}</Text>
                                    <Text style={styles.price}>{course.price}/month</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}
            </ScrollView>

            <CourseModal
                visible={modalVisible}
                onClose={closeCourseModal}
                course={selectedCourse}
                navigation={navigation}
            />

            {/* Bottom Navigation Bar */}
            <Navbar active="Courses" navigation={navigation} />
        </View>
    );
};

export default CoursesScreen;

// Course data arrays - COMPLETELY UNCHANGED (keeping original format)
const recommendedCourses = [
    {
        category: "Science",
        title: "Quantum Physics",
        details: "Venue: NED University of Eng & Tech | 4 hours/week",
        price: "RS 5000",
        image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    },
    {
        category: "Math",
        title: "Advanced Calculus",
        details: "Venue: NED University of Eng & Tech | 3 hours/week",
        price: "RS. 10000",
        image: "https://images.unsplash.com/photo-1509223197845-458d87318791",
    },
];

const aiCourses = [
    {
        category: "AI Engineering",
        title: "Intro to Machine Learning",
        details: "Venue: NED University of Eng & Tech | 3 hours/week",
        price: "RS. 3000",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
        category: "AI Engineering",
        title: "Deep Learning Fundamentals",
        details: "Venue: Online | 4 hours/week",
        price: "RS. 5000",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
];

const marketingCourses = [
    {
        category: "Marketing",
        title: "Digital Marketing Strategy",
        details: "Venue: Online | 4 hours/week",
        price: "RS. 5000",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
        category: "Sales",
        title: "Advanced Sales Techniques",
        details: "Venue: Online | 3 hours/week",
        price: "RS. 3000",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    },
];

const softSkills = [
    {
        category: "Communication",
        title: "Effective Public Speaking",
        details: "Venue: Online | 2 hours/week",
        price: "RS. 2000",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    },
    {
        category: "Leadership",
        title: "Team Leadership Motivation",
        details: "Venue: Online | 3 hours/week",
        price: "RS. 4000",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    },
];

const vocationalCourses = [
    {
        category: "Culinary Arts",
        title: "Professional Cooking Basics",
        details: "Venue: On-site | 4 hours/week",
        price: "RS. 6000",
        image: "https://images.unsplash.com/photo-1512058564366-c9e3c8e0f01b",
    },
    {
        category: "Automotive",
        title: "Automobile Maintenance",
        details: "Venue: On-site | 5 hours/week",
        price: "RS. 4000",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    },
];

// Styles - Only modal-related styles are modified, course card styles remain UNCHANGED
const styles = StyleSheet.create({
    // Main container styles - UNCHANGED
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
    },
    header: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.studentPortal.fieldBackground,
        borderRadius: 16,
        height: 56,
        paddingHorizontal: 12,
        width: "90%",
        marginVertical: 15,
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
    },
    sectionHeader: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    viewAll: {
        color: COLORS.studentPortal.primary,
        fontSize: 14,
    },
    // Course Card Styles - COMPLETELY UNCHANGED
    courseCard: {
        width: 256,
        height: 286,
        backgroundColor: COLORS.studentPortal.fieldBackground,
        borderRadius: 24,
        marginRight: 16,
        padding: 16,
    },
    courseImage: {
        width: 222,
        height: 128,
        borderRadius: 16,
        marginBottom: 12,
    },
    category: {
        color: COLORS.studentPortal.primary,
        fontSize: 13,
    },
    courseTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    details: {
        color: "#ccc",
        fontSize: 12,
        marginTop: 4,
    },
    price: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 6,
    },
    // Search Results Styles - UNCHANGED
    searchResultsContainer: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
    },
    noResults: {
        color: "#ccc",
        fontSize: 14,
    },
    // MODAL STYLES - Modified to add new features while keeping original structure
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContainer: {
        width: 340,
        backgroundColor: "#1f3b57",
        borderRadius: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        maxHeight: 600,
    },
    closeBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    modalImage: {
        width: "100%",
        height: 160,
        borderRadius: 20,
        marginBottom: 15,
    },
    modalDetails: {
        width: "100%",
        paddingHorizontal: 5,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    // Category Row with badges
    categoryRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 15,
    },
    categoryBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(80, 194, 255, 0.15)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    modalCategory: {
        color: "#50c2ff",
        fontWeight: "600",
        fontSize: 13,
        marginLeft: 5,
    },
    levelBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(169, 203, 234, 0.15)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        gap: 4,
    },
    levelText: {
        color: "#A9CBEA",
        fontSize: 12,
        fontWeight: "500",
    },
    priceBadge: {
        backgroundColor: "rgba(255, 215, 0, 0.15)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    modalPrice: {
        color: "#FFD700",
        fontWeight: "bold",
        fontSize: 14,
    },
    // Info Section (Time, Duration, Venue)
    infoSection: {
        backgroundColor: "rgba(36, 78, 120, 0.2)",
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    modalText: {
        color: "#fff",
        fontSize: 14,
        marginLeft: 8,
    },
    // Progress Ring and Stats
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        padding: 12,
        backgroundColor: "rgba(36, 78, 120, 0.2)",
        borderRadius: 15,
    },
    ringGraph: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    ringSvg: {
        width: 70,
        height: 70,
        position: "absolute",
    },
    ring: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 6,
        position: "absolute",
    },
    ringBackground: {
        borderColor: "#2c4a6e",
    },
    ringProgress: {
        borderColor: "#4CD964",
        borderLeftColor: "transparent",
        borderBottomColor: "transparent",
        transform: [{ rotate: "45deg" }],
    },
    percentageText: {
        position: "absolute",
        alignItems: "center",
    },
    percentageValue: {
        color: "#4CD964",
        fontSize: 14,
        fontWeight: "700",
    },
    percentageLabel: {
        color: "#A9CBEA",
        fontSize: 8,
    },
    courseStats: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: 10,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
        marginTop: 2,
    },
    statLabel: {
        color: "#A9CBEA",
        fontSize: 9,
    },
    // Instructor Card
    instructorCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(36, 78, 120, 0.3)",
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
    },
    instructorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(80, 194, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    instructorInfo: {
        flex: 1,
    },
    instructorName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    instructorTitle: {
        color: "#50c2ff",
        fontSize: 13,
        marginBottom: 4,
    },
    instructorExp: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    instructorExpText: {
        color: "#A9CBEA",
        fontSize: 12,
    },
    // Section Headings
    modalSubheading: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
        marginTop: 10,
        marginBottom: 8,
    },
    // Introduction with Read More
    introductionContainer: {
        marginBottom: 15,
    },
    modalParagraph: {
        color: "#ccc",
        fontSize: 13,
        lineHeight: 18,
    },
    readMoreText: {
        color: "#50c2ff",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 5,
    },
    // Modules List
    modulesList: {
        marginBottom: 15,
    },
    moduleItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
        gap: 8,
    },
    moduleText: {
        color: "#ccc",
        fontSize: 13,
        flex: 1,
    },
    // Features List
    featuresList: {
        marginBottom: 15,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    featureText: {
        color: "#ccc",
        fontSize: 13,
        marginLeft: 8,
    },
    // Course Content with Expandable Sections
    contentSection: {
        marginBottom: 15,
    },
    lectureContainer: {
        backgroundColor: "rgba(36, 78, 120, 0.15)",
        borderRadius: 12,
        marginBottom: 6,
        overflow: "hidden",
    },
    lectureHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        backgroundColor: "rgba(80, 194, 255, 0.05)",
    },
    lectureTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        flex: 1,
    },
    lectureTitle: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        flex: 1,
    },
    lectureDuration: {
        color: "#A9CBEA",
        fontSize: 10,
    },
    subtopicsContainer: {
        padding: 8,
    },
    subtopicItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        gap: 8,
    },
    subtopicText: {
        color: "#ccc",
        fontSize: 11,
        flex: 1,
    },
    subtopicDuration: {
        color: "#A9CBEA",
        fontSize: 9,
    },
    // Action Buttons
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 15,
        gap: 10,
    },
    modalButton: {
        flex: 0.48,
        height: 48,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        elevation: 3,
    },
    scholarshipButton: {
        backgroundColor: "#FFA500",
    },
    payButton: {
        backgroundColor: "#2979ff",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
        marginLeft: 6,
    },
});
