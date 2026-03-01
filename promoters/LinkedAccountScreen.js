import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LinkedAccountScreen({ navigation }) {
  const [googleConnected, setGoogleConnected] = useState(true);
  const [appleConnected, setAppleConnected] = useState(false);
  const [institutionalConnected, setInstitutionalConnected] = useState(false);

  return (
    <LinearGradient
      colors={["#001F3F", "#003366", "#001A33"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <View style={[styles.container, { paddingHorizontal: 16 }]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Linked Accounts</Text>
        </View>
        {/* Account Cards */}
        <AccountCard
          icon={<Icon name="google" size={24} color="#fff" />}
          name="Google"
          connected={googleConnected}
          details={
            googleConnected
              ? "Connected as\nstudent@gmail.com"
              : "Not connected"
          }
          onToggle={() => setGoogleConnected(!googleConnected)}
        />
        <AccountCard
          icon={<Icon name="apple" size={24} color="#fff" />}
          name="Apple"
          connected={appleConnected}
          details={appleConnected ? "Connected" : "Not connected"}
          onToggle={() => setAppleConnected(!appleConnected)}
        />
        <AccountCard
          icon={<Icon name="school-outline" size={24} color="#fff" />}
          name="Institutional Login"
          connected={institutionalConnected}
          details={institutionalConnected ? "Connected" : "Not connected"}
          onToggle={() => setInstitutionalConnected(!institutionalConnected)}
        />
        {/* Add Account Button */}
        <TouchableOpacity style={styles.addAccountBtn}>
          <Text style={styles.addAccountBtnText}>Add Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function AccountCard({
  icon,
  name,
  connected,
  details,
  onToggle,
}) {
  return (
    <View style={styles.accountCard}>
      <View style={styles.accountIconBox}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.accountName}>{name}</Text>
        <Text style={styles.accountDetails}>{details}</Text>
      </View>
      <Switch
        value={connected}
        onValueChange={onToggle}
        trackColor={{ false: "#432727", true: "#FF0000" }}
        thumbColor={connected ? "#fff" : "#fff"}
        style={styles.accountSwitch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff1",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#34485A",
    marginBottom: 20,
    padding: 16,
  },
  accountIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#2222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  accountIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  accountName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    marginBottom: 2,
  },
  accountDetails: {
    color: "#fff8",
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
  },
  accountSwitch: {
    width: 51,
    height: 31,
    marginLeft: 16,
    opacity: 1,
  },
  addAccountBtn: {
    backgroundColor: "#6827C4",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 32,
  },
  addAccountBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
