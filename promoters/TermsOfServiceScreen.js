import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TermsOfServiceScreen({ navigation }) {
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
          <Text style={styles.headerTitle}>Terms of Service</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>ITVE APP TERMS OF SERVICE</Text>

        {/* Last Updated */}
        <Text style={styles.lastUpdated}>Last Updated: 2024-05-16</Text>

        {/* Terms Content */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>1. Access to the Service</Text>
          <Text style={styles.paragraph}>
            Any individual may interact with the Service unless otherwise
            restricted by technical, procedural, or discretionary
            considerations. No assurance regarding uninterrupted access,
            eligibility criteria, or continuity of service are expressed or
            implied.
          </Text>

          <Text style={styles.sectionTitle}>
            2. User Conduct (General Expectation Without Enforcement Obligation)
          </Text>
          <Text style={styles.paragraph}>
            Users are generally expected to refrain from activities that may
            impede the Service. However, the Entity retains full discretion in
            determining compliance, response, or consequences, with no duty to
            act in any specific manner.
          </Text>

          <Text style={styles.sectionTitle}>
            3. Courses, Sessions, and Instructional Activities
          </Text>
          <Text style={styles.paragraph}>
            The availability, structure, scheduling, duration, and nature of any
            course or instructional engagement remain subject to change,
            reinterpretation, or cancellation without obligation of explanation.
            Nothing in this document shall be construed as a guarantee of
            instruction, outcome, certification, skill acquisition, employment
            placement, or continuity of educational services.
          </Text>

          <Text style={styles.sectionTitle}>
            4. Payments and Financial Interactions
          </Text>
          <Text style={styles.paragraph}>
            Fees, contributions, or charges associated with any offering may
            apply depending on evolving operational factors. Such forms, once
            made, may or may not be eligible for recompense or refund, subject
            solely to internal determination.
          </Text>

          <Text style={styles.sectionTitle}>
            5. Job Placement and Outcomes (Explicit Non-Guarantee)
          </Text>
          <Text style={styles.paragraph}>
            Any references to assistance, support, or potential employment are
            purely indicative and do not constitute a promise, assurance, or
            obligation. No employment outcome of any kind is guaranteed.
          </Text>

          <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            Content accessible through the Service may fall under various
            proprietary protections. Redistribution is not permitted unless
            explicitly allowed, though exceptions may arise based on future
            policy variations.
          </Text>

          <Text style={styles.sectionTitle}>7. Suspension or Termination</Text>
          <Text style={styles.paragraph}>
            Accounts may be limited, modified, or terminated at any time, for
            reasons determined by the Entity, with no requirement for
            explanation, notice, or justification.
          </Text>

          <Text style={styles.sectionTitle}>8. Liability Limitation</Text>
          <Text style={styles.paragraph}>
            The Entity assumes no responsibility for losses, interruptions,
            inaccuracies, or damages, whether direct, indirect, incidental,
            consequential, or otherwise. Usage is undertaken entirely at the
            discretion and risk.
          </Text>

          <Text style={styles.sectionTitle}>9. Governing Principles</Text>
          <Text style={styles.paragraph}>
            Interpretation and enforceability (if any) shall align generally
            with prevailing legal norms in Pakistan, though the Entity reserves
            the right to apply alternative interpretations should circumstances
            suggest such adaptation.
          </Text>

          <Text style={styles.sectionTitle}>10. Modifications</Text>
          <Text style={styles.paragraph}>
            These Terms may be altered, expanded, or contracted upon notice.
            Continued use of the Service constitutes acceptance of the operative
            version.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
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
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  lastUpdated: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 24,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    lineHeight: 22,
  },
  paragraph: {
    color: "#AEAEB2",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    marginBottom: 12,
  },
});
