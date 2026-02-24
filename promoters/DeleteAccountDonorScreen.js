import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function DeleteAccountDonorScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });
  const [selected, setSelected] = useState("deactivate");
  const [reason, setReason] = useState("");
  // Removed router reference

  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={["#001F3F", "#003366", "#001A33"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Delete or Deactivate Account</Text>
          </View>

          <Text style={styles.chooseOption}>Choose an option</Text>

          {/* Deactivate Option */}
          <TouchableOpacity
            style={[
              styles.optionBox,
              selected === "deactivate" && styles.selectedOption,
            ]}
            onPress={() => setSelected("deactivate")}
          >
            <View style={styles.optionRow}>
              <View
                style={[
                  styles.radio,
                  selected === "deactivate" && styles.radioSelected,
                ]}
              >
                {selected === "deactivate" && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Deactivate account</Text>
                <Text style={styles.optionDesc}>
                  Your account will be temporarily disabled. You can reactivate
                  it anytime by logging in.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Delete Option */}
          <TouchableOpacity
            style={[
              styles.optionBox,
              selected === "delete" && styles.selectedOption,
            ]}
            onPress={() => setSelected("delete")}
          >
            <View style={styles.optionRow}>
              <View
                style={[
                  styles.radio,
                  selected === "delete" && styles.radioSelected,
                ]}
              >
                {selected === "delete" && <View style={styles.radioInner} />}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Delete account</Text>
                <Text style={styles.optionDesc}>
                  Your account and all associated data will be permanently
                  deleted. This action cannot be undone.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Reason Input */}
          <View style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>
              Tell us why you&apos;re{" "}
              {selected === "deactivate" ? "deactivating" : "deleting"} your
              account (optional)
            </Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="Your feedback helps us improve"
              placeholderTextColor="#fff8"
              value={reason}
              onChangeText={setReason}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>
              {selected === "deactivate"
                ? "Deactivate Account"
                : "Delete Account"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    marginLeft: 12,
    flex: 1,
  },
  chooseOption: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    marginBottom: 24,
  },
  optionBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  selectedOption: {
    backgroundColor: "rgba(138,43,226,0.2)",
    borderColor: "#8A2BE2",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 16,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: "#8A2BE2",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8A2BE2",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    marginBottom: 8,
  },
  optionDesc: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    fontWeight: "400",
    opacity: 0.8,
    lineHeight: 20,
  },
  reasonSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  reasonLabel: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    fontWeight: "600",
    marginBottom: 12,
  },
  reasonInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    fontWeight: "400",
    minHeight: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  actionBtn: {
    backgroundColor: "#8A2BE2",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
  },
});
