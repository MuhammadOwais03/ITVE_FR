import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmailPhoneManagementScreen({ navigation }) {
  const [email, setEmail] = useState("student.name@school.edu");
  const [phone, setPhone] = useState("+92 333 3333333");

  return (
    <LinearGradient
      colors={["#001F3F", "#003366", "#001A33"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      {/* Header stays at the top */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Email & Phone Management</Text>
      </View>

      {/* Centered form fields and button */}
      <View style={[styles.formContainer, { paddingHorizontal: 16 }]}>
        {/* Email Address */}
        <View style={styles.labelBox}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputRow}>
            <Icon
              name="email-outline"
              size={24}
              color="#D32F2F"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              editable={true}
              placeholder="Email"
              placeholderTextColor="#fff8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon
              name="pencil"
              size={20}
              color="#D32F2F"
              style={styles.editIcon}
            />
          </View>
        </View>

        {/* Phone Number */}
        <View style={styles.labelBox}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputRow}>
            <Icon
              name="phone-outline"
              size={24}
              color="#D32F2F"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              editable={true}
              placeholder="Phone"
              placeholderTextColor="#fff8"
              keyboardType="phone-pad"
            />
            <Icon
              name="pencil"
              size={20}
              color="#D32F2F"
              style={styles.editIcon}
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateBtn}>
          <Text style={styles.updateBtnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
    fontFamily: "SpaceGrotesk",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  labelBox: {
    marginBottom: 18,
    width: 358,
  },
  label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: "SpaceGrotesk",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF33",
    borderRadius: 24,
    height: 56,
    paddingHorizontal: 16,
    minWidth: 160,
    width: "100%",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    verticalAlign: "middle",
    fontFamily: "SpaceGrotesk",
  },
  editIcon: {
    marginLeft: 8,
  },
  updateBtn: {
    backgroundColor: "#6827C4",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 32,
    width: 358,
    alignSelf: "center",
  },
  updateBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "SpaceGrotesk",
  },
});
