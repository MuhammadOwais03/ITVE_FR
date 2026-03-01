import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CourseModal = ({ visible, onClose, course }) => {
  if (!course) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBackground} />
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{course.title}</Text>
          <Image source={{ uri: course.image }} style={styles.modalImage} />

          <View style={styles.modalDetails}>
            <Text style={styles.modalCategory}>{course.category}</Text>
            <Text style={styles.modalText}>Duration: 2 Months</Text>
            <Text style={styles.modalText}>Fee: Rs 5000/month</Text>

            <Text style={styles.modalSubheading}>Introduction:</Text>
            <Text style={styles.modalParagraph}>
              Very good course for beginners to get started with {course.title}.
            </Text>

            <Text style={styles.modalSubheading}>Venue:</Text>
            <Text style={styles.modalParagraph}>
              NED University of Eng & Tech.
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#3498db" }]}
            >
              <Text style={styles.buttonText}>Scholarship</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#2979ff" }]}
            >
              <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    position: "absolute",
    width: 390,
    height: 648,
    top: -24,
    left: -6,
    opacity: 0.5,
    backgroundColor: "#163654",
    borderRadius: 50,
  },
  modalContainer: {
    width: 363,
    height: 596,
    backgroundColor: "#1f3b57",
    borderRadius: 53,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  modalImage: {
    width: 340,
    height: 171,
    borderRadius: 32,
    marginVertical: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  modalCategory: {
    color: "#50c2ff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  modalText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  modalSubheading: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 8,
  },
  modalParagraph: {
    color: "#ccc",
    fontSize: 13,
    textAlign: "left",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    width: 150,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default CourseModal;
