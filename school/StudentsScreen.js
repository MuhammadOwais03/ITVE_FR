import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Svg, RadialGradient, Rect, Defs, Stop } from "react-native-svg";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import BottomNavBar from "./components/BottomNavBar";

const { width } = Dimensions.get("window");

const StudentsScreen = ({ navigation }) => {
  const [expandedClass, setExpandedClass] = useState("Class 10");

  const classes = [
    { id: "Class 10", code: "abcs10" },
    { id: "Class 9", code: "abcs09" },
    { id: "Class 8", code: "abcs08" },
    { id: "Class 7", code: "abcs07" },
    { id: "Class 6", code: "abcs06" },
    { id: "Class 5", code: "abcs05" },
    { id: "Class 4", code: "abcs04" },
    { id: "Class 3", code: "abcs03" },
    { id: "Class 2", code: "abcs02" },
    { id: "Class 1", code: "abcs01" },
    { id: "Kinder Garden 3", code: "abcs003" },
    { id: "Kinder Garden 2", code: "abcs002" },
    { id: "Kinder Garden 1", code: "abcs001" },
  ];

  const alumni = [
    { year: "2021", code: "abcs2021" },
    { year: "2020", code: "abcs2020" },
    { year: "2019", code: "abcs2019" },
    { year: "2018", code: "abcs2018" },
  ];

  const students = Array(10).fill({ name: "Ali", verified: true });

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="27.69%" rx="134.35%" ry="72.31%" gradientUnits="userSpaceOnUse">
              <Stop offset="0%" stopColor="#135821" />
              <Stop offset="38.94%" stopColor="#094014" />
              <Stop offset="100%" stopColor="#052401" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Students</Text>
          <TouchableOpacity style={styles.greenCircle}>
             <FontAwesome name="usd" size={24} color="black"  />
          </TouchableOpacity>
        </View>

        <View style={styles.newStudentsBox}>
          <Text style={styles.newStudentsText}>New Students</Text>
          <TouchableOpacity onPress={() => console.log("Add Pressed")}>
             <Ionicons name="add-circle" size={55} color="#00FF37" />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {classes.map((item) => (
            <View key={item.id} style={styles.classWrapper}>
              <TouchableOpacity 
                style={styles.classHeader} 
                onPress={() => setExpandedClass(expandedClass === item.id ? null : item.id)}
              >
                <Text style={styles.classTitle}>{item.id}</Text>
                <View style={styles.classRight}>
                    <Text style={styles.classCode}>{item.code}</Text>
                    <Ionicons 
                        name={expandedClass === item.id ? "chevron-up" : "chevron-down"} 
                        size={18} color="#94A3B8" 
                    />
                </View>
              </TouchableOpacity>

              {expandedClass === item.id && (
                <View style={styles.studentList}>
                  {students.map((st, index) => (
                    <View key={index} style={styles.studentRow}>
                      <View style={styles.studentLeft}>
                        <Image source={{ uri: 'https://i.pravatar.cc/150?u=ali' }} style={styles.avatar} />
                        <Text style={[styles.studentName, index < 4 && { color: '#04FF00' }]}>{st.name}</Text>
                        {st.verified && <MaterialCommunityIcons name="check-decagram" size={16} color="#1DA1F2" style={{marginLeft: 5}} />}
                      </View>
                      {index < 4 && <Ionicons name="star" size={16} color="#04FF00" />}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.alumniHeader}>Alumni</Text>
        <View style={styles.listContainer}>
          {alumni.map((item) => (
            <TouchableOpacity key={item.year} style={[styles.classHeader, {marginBottom: 10}]}>
              <Text style={styles.classTitle}>{item.year}</Text>
              <View style={styles.classRight}>
                <Text style={styles.classCode}>{item.code}</Text>
                <Ionicons name="chevron-down" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerTitle: { color: '#fff', fontSize: 32, fontWeight: '700' },
  newStudentsBox: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 30, 
    paddingLeft: 25,
    paddingRight: 10,
    height: 72,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  newStudentsText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  listContainer: { width: '100%' },
  classWrapper: { marginBottom: 10 },
  classHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    height: 40 
  },
  greenCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00FF37', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00FF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  classTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  classRight: { flexDirection: 'row', alignItems: 'center' },
  classCode: { color: '#fff', fontSize: 13, marginRight: 10, opacity: 0.6 },
  studentList: { backgroundColor: 'rgba(255,255,255,0.04)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingVertical: 10 },
  studentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8 },
  studentLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 38, height: 38, borderRadius: 19, marginRight: 15, backgroundColor: '#333' },
  studentName: { color: '#fff', fontSize: 20 },
  alumniHeader: { color: '#fff', fontSize: 32, fontWeight: '700', marginTop: 30, marginBottom: 15 },
});

export default StudentsScreen;