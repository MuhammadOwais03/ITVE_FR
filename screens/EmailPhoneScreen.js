import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors.js";
import { useNavigation } from "@react-navigation/native";

export default function EmailPhoneScreen() {
  const theme = COLORS.studentPortal;
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={theme.gradient.colors}
      start={theme.gradient.start}
      end={theme.gradient.end}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Email / Phone Management</Text>
      </View>

      {/* Email Field */}
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="student.name@school.edu"
          placeholderTextColor="#C3D1E1"
          style={styles.input}
        />
        <Ionicons name="pencil-outline" size={18} color="#00CCFF" style={styles.editIcon} />
      </View>

      {/* Phone Field */}
      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name="call-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="+92 333 3333333"
          placeholderTextColor="#C3D1E1"
          style={styles.input}
        />
        <Ionicons name="pencil-outline" size={18} color="#00CCFF" style={styles.editIcon} />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.studentPortal.fieldBackground,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  editIcon: {
    marginLeft: "auto",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  updateButton: {
    backgroundColor: COLORS.studentPortal.primary,
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 10,
  },
  updateText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
