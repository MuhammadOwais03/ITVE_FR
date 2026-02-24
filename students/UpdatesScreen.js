import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import { Svg, RadialGradient, Rect, Defs, Stop, Circle } from "react-native-svg";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const UpdatesScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const userData = {
    userName: "Assadullah", 
    overallProgress: 75,
    coursesCompleted: 3,
    totalCourses: 12,
    sections: [
      {
        id: "ai_eng",
        title: "AI Engineering",
        icon: "brain",
        courses: [
          {
            id: "data_eng",
            name: "Data Engineering",
            status: "In Progress",
            subjects: [
              { 
                id: "math_ai", 
                name: "Math For AI", 
                color: "#FFCC00", 
                assessments: [
                  { type: "A", status: "Done", score: "10/10" },
                  { type: "A", status: "Done", score: "8/10" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "T", status: "Done", score: "45/50" },
                ]
              },
              { 
                id: "py_ai", 
                name: "PYTHON For AI", 
                color: "#4CD964", 
                assessments: [
                  { type: "A", status: "Done", score: "9/10" },
                  { type: "A", status: "Done", score: "10/10" },
                  { type: "A", status: "Done", score: "10/10" },
                  { type: "A", status: "Done", score: "8/10" },
                  { type: "T", status: "Pending", score: "N/A" },
                ]
              }
            ]
          }
        ]
      },
      {
        id: "marketing_sales",
        title: "Marketing/Sales",
        icon: "trending-up",
        courses: [
          {
            id: "mkt_core",
            name: "Marketing",
            status: "In Progress", 
            subjects: [
              { 
                id: "mkt_ai", 
                name: "Marketing For AI", 
                color: "#FFCC00", 
                assessments: [
                  { type: "A", status: "Done", score: "10/10" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "T", status: "Pending", score: "N/A" },
                ]
              },
              { 
                id: "sales_mgmt", 
                name: "Sales Management for AI", 
                color: "#FFCC00", 
                assessments: [
                  { type: "A", status: "Done", score: "15/15" },
                  { type: "A", status: "Done", score: "12/15" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "A", status: "Pending", score: "N/A" },
                  { type: "T", status: "Pending", score: "N/A" },
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const calculateProgress = (assessments) => {
    const doneCount = assessments.filter(a => a.status === "Done").length;
    return (doneCount / assessments.length) * 100;
  };

  const ProgressCircle = ({ percentage }) => {
    const size = 80;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={styles.circleWrapper}>
        <Svg width={size} height={size}>
          <Circle cx={size/2} cy={size/2} r={radius} stroke="rgba(0, 217, 255, 0.1)" strokeWidth={strokeWidth} fill="none" />
          <Circle
            cx={size/2} cy={size/2} r={radius} stroke="#00D9FF" strokeWidth={strokeWidth} fill="none"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}
          />
        </Svg>
        <View style={styles.circleTextContainer}><Text style={styles.circleText}>{percentage}%</Text></View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="35.31%" rx="95.49%" ry="64.69%" fx="50%" fy="35.31%" gradientUnits="userSpaceOnUse">
              <Stop offset="0%" stopColor="#194470" />
              <Stop offset="42.78%" stopColor="#122D46" />
              <Stop offset="100%" stopColor="#101A25" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>

      <Animated.View style={{ opacity: fadeAnim, flex: 1, paddingTop: 60 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hello, {userData.userName}</Text>
          <TouchableOpacity><Ionicons name="notifications-outline" size={24} color="#fff" /></TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.statsCard}>
            <View style={styles.statBox}>
              <ProgressCircle percentage={userData.overallProgress} />
              <View style={styles.statTextGroup}>
                <Text style={styles.statLabel}>Overall Progress</Text>
                <Text style={styles.statValue}>{userData.overallProgress}%</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <View style={styles.statTextGroup}>
                <Text style={styles.statLabel}>Courses</Text>
                <Text style={styles.statValue}>{userData.coursesCompleted}/{userData.totalCourses}</Text>
              </View>
            </View>
          </View>

          {userData.sections.map((section) => (
            <View key={section.id} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name={section.icon} size={22} color="#00D9FF" />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              {section.courses.map((course) => (
                <View key={course.id} style={styles.courseCard}>
                  {/* COURSE */}
                  <View style={styles.courseHeaderRow}>
                    <Text style={styles.courseMainTitle}>{course.name}</Text>
                    <Text style={styles.inProgressBadge}>{course.status}</Text>
                  </View>
                  
                  {course.subjects.map((subject) => {
                    const progress = calculateProgress(subject.assessments);
                    return (
                      <View key={subject.id} style={styles.subjectItem}>
                        <View style={styles.rowBetween}>
                          <Text style={styles.subjectName}>{subject.name}</Text>
                          <Text style={styles.progressLabelText}>{Math.round(progress)}%</Text>
                        </View>

                        <View style={styles.progressBarBg}>
                          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: subject.color }]} />
                        </View>

                        <View style={styles.assessmentRow}>
                          {subject.assessments.map((item, idx) => (
                            <TouchableOpacity 
                              key={idx}
                              activeOpacity={0.7}
                              onPress={() => Alert.alert(
                                item.type === 'T' ? 'Final Test' : `Assignment ${idx + 1}`,
                                `Status: ${item.status}\nResult: ${item.score}`
                              )}
                              style={[
                                styles.box, 
                                item.status === "Done" ? {borderColor: subject.color, backgroundColor: `${subject.color}20`} : styles.boxPending,
                                item.type === "T" && styles.testBoxMove
                              ]}
                            >
                              <Text style={[styles.boxText, item.status === "Done" && {color: subject.color}]}>
                                {item.type}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          ))}
          <View style={{height: 100}} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    marginBottom: 25 
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: "600", 
    color: "#fff",
    flex: 1 
  },
  scrollContent: { paddingHorizontal: 20 },
  statsCard: { backgroundColor: "rgba(255, 255, 255, 0.06)", borderRadius: 24, padding: 16, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", marginBottom: 30 },
  statBox: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  statTextGroup: { marginLeft: 10 },
  statLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  statValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  divider: { width: 1, height: '70%', backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 10 },
  circleWrapper: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  circleText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  circleTextContainer: { position: 'absolute' },
  sectionContainer: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 8 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  courseCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 18, marginBottom: 15 },
  courseHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  courseMainTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  inProgressBadge: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '500' },
  subjectItem: { marginBottom: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectName: { color: '#fff', fontSize: 14 },
  progressLabelText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  progressBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 8, marginBottom: 12 },
  progressFill: { height: '100%', borderRadius: 2 },
  assessmentRow: { flexDirection: 'row', gap: 10 },
  box: { width: 38, height: 38, borderRadius: 8, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  boxPending: { borderColor: 'rgba(255,255,255,0.15)' },
  boxText: { fontSize: 14, fontWeight: 'bold', color: 'rgba(255,255,255,0.2)' },
  testBoxMove: { marginLeft: 'auto' }
});

export default UpdatesScreen;