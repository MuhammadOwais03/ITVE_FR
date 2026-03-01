import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MessageSettingDonor({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });
  const [selected, setSelected] = useState("everyone");
  // Removed router declaration
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
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Message Settings</Text>
          </View>

          {/* Option 1 */}
          <TouchableOpacity
            style={[
              styles.optionBox,
              selected === "everyone" && styles.optionBoxSelected,
            ]}
            onPress={() => setSelected("everyone")}
            activeOpacity={0.8}
          >
            <View style={styles.radioRow}>
              <View style={styles.radioOuter}>
                {selected === "everyone" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.optionTitle}>Everyone</Text>
            </View>
            <Text style={styles.optionDesc}>Anyone can send you messages.</Text>
          </TouchableOpacity>

          {/* Option 2 */}
          <TouchableOpacity
            style={[
              styles.optionBox,
              selected === "friends" && styles.optionBoxSelected,
            ]}
            onPress={() => setSelected("friends")}
            activeOpacity={0.8}
          >
            <View style={styles.radioRow}>
              <View style={styles.radioOuter}>
                {selected === "friends" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.optionTitle}>Friends Only</Text>
            </View>
            <Text style={styles.optionDesc}>
              Only people you follow can send you messages.
            </Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
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
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
    marginLeft: 14,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    marginLeft: 12,
  },
  optionBox: {
    width: 362,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#7C4DFF",
    padding: 18,
    marginLeft: 14,
    marginBottom: 18,
    backgroundColor: "transparent",
  },
  optionBoxSelected: {
    backgroundColor: "rgba(124,77,255,0.08)",
    borderColor: "#7C4DFF",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#7C4DFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7C4DFF",
  },
  optionTitle: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    fontWeight: "700",
  },
  optionDesc: {
    color: "#fff8",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    fontWeight: "400",
    marginLeft: 36,
    marginTop: -8,
  },
  saveBtn: {
    width: 362,
    height: 48,
    backgroundColor: "#7C4DFF",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 32,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
  },
});
