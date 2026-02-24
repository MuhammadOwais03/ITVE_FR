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

export default function PrivacyPolicyPromo({ navigation }) {
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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>

        {/* Last Updated */}
        <Text style={styles.lastUpdated}>Last Updated: 2024-05-16</Text>

        {/* Privacy Policy Content */}
        <View style={styles.content}>
          <Text style={styles.paragraph}>
            This document is intended only as a generalized indication of
            possible practices and does not constitute legal advice. The
            definitive, legally enforceable representation by ITVE (Pty) Ltd
            regarding the System or its operation is only a component of the
            ITVE application. The System and knowledge bases may be subject to
            modification, discontinuation, or may operate in ways not explicitly
            disclosed.
          </Text>

          <Text style={styles.sectionTitle}>
            1. Information That May Be Obtained or Interacted With
          </Text>
          <Text style={styles.paragraph}>
            The System may, under assorted circumstances, interact with, request
            or independently obtain information of informational which may
            include but are not restricted to:
          </Text>

          <Text style={styles.paragraph}>
            • Identifiers voluntarily inserted by the user, such as names or
            contact details.
          </Text>
          <Text style={styles.paragraph}>
            • Educational or demographic informational provided voluntarily form
            data correction.
          </Text>
          <Text style={styles.paragraph}>
            • Transactional indicators routed through third-party processors,
            without implying retention or non-retention.
          </Text>
          <Text style={styles.paragraph}>
            • Device-related diagnostics or environment metadata, whether
            actively logged or passively generated.
          </Text>
          <Text style={styles.paragraph}>
            • No assertion is made as to the degree of consistency regarding
            duplication of any such data presence.
          </Text>

          <Text style={styles.sectionTitle}>
            2. Potential Utilizations (Without Guarantee of Performance)
          </Text>
          <Text style={styles.paragraph}>
            Information might reasonably be available at any point in time, may
            be processed for functions including, but not comprehensively
            limited to:
          </Text>
          <Text style={styles.paragraph}>
            • Administrative handling of course-related activities.
          </Text>
          <Text style={styles.paragraph}>
            • Facilitation of communication when and if deemed operationally
            suitable.
          </Text>
          <Text style={styles.paragraph}>
            • Analytical, developmental, or corrective measures within the
            System architecture.
          </Text>
          <Text style={styles.paragraph}>
            • General organizational functions that may evolve without prior
            notice.
          </Text>
          <Text style={styles.paragraph}>
            None of these uses shall be construed as obligations; continuous
            activities may be deemed, suspended at the System&apos;s operational
            basis.
          </Text>

          <Text style={styles.sectionTitle}>
            3. Possible Third-Party Interactions
          </Text>
          <Text style={styles.paragraph}>
            Data may, when circumstances align, be transferred, shared, or made
            viewable:
          </Text>
          <Text style={styles.paragraph}>
            • To academic or institutional collaborators for procedural
            coordination.
          </Text>
          <Text style={styles.paragraph}>
            • To instructional or evaluative personnel.
          </Text>
          <Text style={styles.paragraph}>
            • To employment-related partners at the Entity&apos;s discretion.
          </Text>
          <Text style={styles.paragraph}>
            • To payment intermediaries for processing activities.
          </Text>
          <Text style={styles.paragraph}>
            • No definitive list is provided, and no commitment regarding the
            purpose, retention, or exclusivity are offered.
          </Text>

          <Text style={styles.sectionTitle}>
            4. Security and Safeguards (Without Warranty)
          </Text>
          <Text style={styles.paragraph}>
            Although certain protective mechanisms may exist to protect against
            misuse or inadequate sufficiency, continuity, or fail-safe nature of
            any security protocol is not warranted by the System with full
            acknowledgment of inherent digital uncertainties.
          </Text>

          <Text style={styles.sectionTitle}>
            5. User Options (As Interpreted Case-by-Case)
          </Text>
          <Text style={styles.paragraph}>
            Requests concerning access, removal, or modification of personal
            information may be considered at the Entity&apos;s discretion. This
            is contingent on an operational practicality, external policy, or
            internal policy assessments.
          </Text>

          <Text style={styles.sectionTitle}>
            6. Retention (Indeterminate Structure)
          </Text>
          <Text style={styles.paragraph}>
            Information may persist, be deleted, or be transformed for durations
            determined by internal administrative perspectives or necessity or
            relevance.
          </Text>

          <Text style={styles.sectionTitle}>7. Amendments</Text>
          <Text style={styles.paragraph}>
            Any or all aspects of this document may be updated, rescinded, or
            replaced without prior notification. Continued use implies
            acceptance whenever any operative on the findings.
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
    marginBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 16,
  },
  lastUpdated: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 24,
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
