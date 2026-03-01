import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const blockedUsers = [
  {
    name: "Jessica Miller",
    username: "@jessica.miller",
    avatar: require("../assets/user.png"),
  },
  {
    name: "David Wilson",
    username: "@david.wilson",
    avatar: require("../assets/user.png"),
  },
  {
    name: "Emily Clark",
    username: "@emily.clark",
    avatar: require("../assets/user.png"),
  },
  {
    name: "Robert Evans",
    username: "@robert.evans",
    avatar: require("../assets/user.png"),
  },
];

export default function BlockedAccountsScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });
  const [users, setUsers] = useState(blockedUsers);
  // Removed router reference

  if (!fontsLoaded) return null;

  const handleUnblock = (username) => {
    setUsers(users.filter((u) => u.username !== username));
  };

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
            <Text style={styles.headerTitle}>Blocked Accounts</Text>
          </View>

          {/* Blocked Users List */}
          {users.map((user) => (
            <View style={styles.userRow} key={user.username}>
              <Image source={user.avatar} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>{user.username}</Text>
              </View>
              <TouchableOpacity
                style={styles.unblockBtn}
                onPress={() => handleUnblock(user.username)}
              >
                <Text style={styles.unblockBtnText}>Unblock</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    marginBottom: 32, // Increased bottom margin for more space between rows
    paddingTop: 12, // Added top padding
    paddingBottom: 12, // Added bottom padding
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
  },
  username: {
    color: "#fff8",
    fontFamily: "Poppins_700Bold",
    fontWeight: "400",
    fontSize: 14,
  },
  unblockBtn: {
    width: 89,
    height: 32,
    backgroundColor: "#FF0000",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  unblockBtnText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    fontSize: 14,
  },
});
