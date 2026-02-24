import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function HelpCenterScreen({ navigation }) {

  return (
    <LinearGradient
      colors={["#001F3F", "#003366", "#001A33"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { paddingHorizontal: 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Icon
            name="magnify"
            size={20}
            color="#8E8E93"
            style={{ marginRight: 12 }}
          />
          <TextInput
            placeholder="Search FAQs"
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
          />
        </View>

        {/* Help Topics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help Topics</Text>
          <Text style={styles.sectionDescription}>
            Welcome to the ITVE Help Center. This section provides generalized
            guidance on how different parts of the ITVE system may operate.
            These descriptions are informational only and do not create any
            commitments or assurances. Users may refer to any of the topics
            below for clarification.
          </Text>
        </View>

        {/* Help Items */}
        <HelpItem
          title="Account"
          description="Users may create an account to access features within the ITVE platform. Information requested during registration can vary depending on operational requirements. Account creation does not imply acceptance into any course or program."
          onPress={() => {}}
        />

        <HelpItem
          title="Privacy"
          description="The platform may collect, store, or process certain information for functional or analytical purposes. Practices may evolve without prior notice."
          onPress={() => {}}
        />

        <HelpItem
          title="Troubleshooting"
          description="This may occur due to connectivity issues, device limitations, temporary server downtime, or system updates. Restarting the app or switching networks may help."
          onPress={() => {}}
        />

        <HelpItem
          title="Community Guidelines"
          description="Users are encouraged to maintain appropriate conduct within the platform. Behaviors considered disruptive or harmful may result in limitations at the discretion of the system administrators."
          onPress={() => {}}
        />

        <HelpItem
          title="Contact Support"
          description="Users may reach out for assistance through available channels such as in-app messaging, email, or designated contact forms. Response timelines may vary based on operational capacity."
          onPress={() => {}}
        />

        {/* Chat with Support Button */}
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat with Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function HelpItem({
  title,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.helpItem} onPress={onPress}>
      <View style={styles.helpItemHeader}>
        <Text style={styles.helpItemTitle}>{title}</Text>
        <Icon name="chevron-right" size={20} color="#8E8E93" />
      </View>
      <Text style={styles.helpItemDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingBottom: 32,
    minHeight: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3A3C",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    fontWeight: "400",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionDescription: {
    color: "#AEAEB2",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  helpItem: {
    backgroundColor: "#001A33",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  helpItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  helpItemTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  helpItemDescription: {
    color: "#AEAEB2",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  chatButton: {
    backgroundColor: "#3A3A3C",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
