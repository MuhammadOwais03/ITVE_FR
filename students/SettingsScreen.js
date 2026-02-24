// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Switch,
//   StyleSheet,
//   useWindowDimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS } from "../constants/colors"; // adjust path to your COLORS file

// export default function SettingsScreen() {
//   const navigation = useNavigation();
//   const [mentions, setMentions] = useState(true);
//   const [classUpdates, setClassUpdates] = useState(false);
//   const [studyReminders, setStudyReminders] = useState(true);
//   const [seminarInvites, setSeminarInvites] = useState(false);
//   const { width } = useWindowDimensions();

//   const isTablet = width > 768; // Responsive scaling for tablets

//   return (
//     <LinearGradient
//       colors={COLORS.studentPortal.gradient.colors}
//       start={COLORS.studentPortal.gradient.start}
//       end={COLORS.studentPortal.gradient.end}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={{
//           paddingHorizontal: isTablet ? 60 : 20,
//           paddingTop: isTablet ? 70 : 50,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Settings</Text>
//         </View>

//         {/* Search */}
//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={18} color="#ccc" />
//           <TextInput
//             placeholder="Search settings"
//             placeholderTextColor="#ccc"
//             style={styles.searchInput}
//           />
//           <Ionicons name="bookmark-outline" size={20} color="#ccc" />
//         </View>

//         {/* ACCOUNT */}
//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="person-outline"
//             label="Edit Profile"
//             onPress={() => navigation.navigate("EditProfileScreen")}
//           />
//           <SettingItem
//             icon="mail-outline"
//             label="Email & Phone"
//             onPress={() => navigation.navigate("EmailPhoneScreen")}
//           />
//           <SettingItem
//             icon="lock-closed-outline"
//             label="Change Password"
//             onPress={() => navigation.navigate("ChangePasswordScreen")}
//           />
//           <SettingItem
//             icon="link-outline"
//             label="Linked Accounts"
//             onPress={() => navigation.navigate("LinkedAccountsScreen")}
//           />
//           <SettingItem
//             icon="trash-outline"
//             label="Deactivate / Delete Account"
//             labelColor="red"
//             onPress={() => navigation.navigate("DeleteAccountScreen")}
//           />
//         </View>

//         {/* PRIVACY */}
//         <Text style={styles.sectionTitle}>Privacy</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="eye-outline"
//             label="Profile Visibility"
//             onPress={() => navigation.navigate("ProfileVisibilityScreen")}
//           />
//           <SettingItem
//             icon="chatbubble-ellipses-outline"
//             label="Who Can Message Me"
//             onPress={() => navigation.navigate("MessageControlScreen")}
//           />
//           <SettingItem
//             icon="ban-outline"
//             label="Blocked Users"
//             onPress={() => navigation.navigate("BlockedUsersScreen")}
//           />
//         </View>

//         {/* NOTIFICATIONS */}
//         <Text style={styles.sectionTitle}>Notifications</Text>
//         <View style={styles.card}>
//           <SwitchItem
//             icon="notifications-outline"
//             label="Mentions & Comments"
//             value={mentions}
//             onValueChange={setMentions}
//           />
//           <SwitchItem
//             icon="newspaper-outline"
//             label="Class Updates"
//             value={classUpdates}
//             onValueChange={setClassUpdates}
//           />
//           <SwitchItem
//             icon="alarm-outline"
//             label="Study Reminders"
//             value={studyReminders}
//             onValueChange={setStudyReminders}
//           />
//           <SwitchItem
//             icon="calendar-outline"
//             label="Seminar Invites"
//             value={seminarInvites}
//             onValueChange={setSeminarInvites}
//           />
//         </View>

//         {/* EDUCATION */}
//         <Text style={styles.sectionTitle}>Education</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="school-outline"
//             label="Linked School / Class"
//             rightText="Read-only"
//           />
//           <View style={styles.promoRow}>
//             <MaterialIcons name="confirmation-number" size={18} color="#fff" />
//             <TextInput
//               placeholder="Promo Code"
//               placeholderTextColor="#ccc"
//               style={styles.promoInput}
//             />
//             <TouchableOpacity style={styles.confirmButton}>
//               <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* SUPPORT */}
//         <Text style={styles.sectionTitle}>Support & Legal</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="help-circle-outline"
//             label="Help Center"
//             onPress={() => navigation.navigate("HelpCenterScreen")}
//           />
//           <SettingItem
//             icon="bug-outline"
//             label="Report a Problem"
//             onPress={() => navigation.navigate("ReportProblemScreen")}
//           />
//           <SettingItem
//             icon="document-text-outline"
//             label="Privacy Policy"
//             onPress={() => navigation.navigate("PrivacyPolicyScreen")}
//           />
//           <SettingItem
//             icon="document-outline"
//             label="Terms of Service"
//             onPress={() => navigation.navigate("TermsScreen")}
//           />
//         </View>

//         <Text style={styles.versionText}>App Version: v1.0.0</Text>

//         {/* LOG OUT */}
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => navigation.navigate("LoginScreen")}
//         >
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// // =============================
// // COMPONENTS
// // =============================
// const SettingItem = ({ icon, label, labelColor = "#fff", rightText, onPress }) => (
//   <TouchableOpacity style={styles.item} onPress={onPress}>
//     <View style={{ flexDirection: "row", alignItems: "center" }}>
//       <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 10 }} />
//       <Text style={[styles.itemText, { color: labelColor }]}>{label}</Text>
//     </View>
//     {rightText ? (
//       <Text style={styles.rightText}>{rightText}</Text>
//     ) : (
//       <Ionicons name="chevron-forward" size={18} color="#ccc" />
//     )}
//   </TouchableOpacity>
// );

// const SwitchItem = ({ icon, label, value, onValueChange }) => (
//   <View style={styles.item}>
//     <View style={{ flexDirection: "row", alignItems: "center" }}>
//       <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 10 }} />
//       <Text style={styles.itemText}>{label}</Text>
//     </View>
//     <Switch
//       value={value}
//       onValueChange={onValueChange}
//       thumbColor={value ? COLORS.studentPortal.primary : "#666"}
//       trackColor={{ true: "#1A6E8C", false: "#333" }}
//     />
//   </View>
// );

// // =============================
// // STYLES
// // =============================
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
//   searchContainer: {
//     backgroundColor: COLORS.studentPortal.fieldBackground,
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   sectionTitle: {
//     color: "#fff",
//     fontWeight: "600",
//     marginBottom: 8,
//     marginTop: 10,
//   },
//   card: {
//     backgroundColor: COLORS.studentPortal.fieldBackground,
//     borderRadius: 10,
//     paddingVertical: 8,
//     marginBottom: 18,
//   },
//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderBottomWidth: 0.3,
//     borderColor: "#2C5A80",
//   },
//   itemText: {
//     fontSize: 14,
//     color: "#fff",
//   },
//   rightText: {
//     color: "#ccc",
//     fontSize: 12,
//   },
//   promoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   promoInput: {
//     flex: 1,
//     backgroundColor: "#122D46",
//     borderRadius: 8,
//     marginLeft: 10,
//     color: "#fff",
//     paddingHorizontal: 10,
//     height: 35,
//   },
//   confirmButton: {
//     backgroundColor: COLORS.studentPortal.primary,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginLeft: 10,
//   },
//   versionText: {
//     textAlign: "center",
//     color: "#ccc",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   logoutButton: {
//     backgroundColor: "#922B2B",
//     borderRadius: 10,
//     paddingVertical: 12,
//     marginBottom: 30,
//   },
//   logoutText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Switch,
//   StyleSheet,
//   useWindowDimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { COLORS } from "../constants/colors";

// export default function SettingsScreen() {
//   const navigation = useNavigation();
//   const [mentions, setMentions] = useState(true);
//   const [classUpdates, setClassUpdates] = useState(false);
//   const [studyReminders, setStudyReminders] = useState(true);
//   const [seminarInvites, setSeminarInvites] = useState(false);
//   const { width } = useWindowDimensions();
//   const isTablet = width > 768;

//   return (
//     <LinearGradient
//       colors={["#101A25", "#122D46", "#0A1620"]}
//       start={{ x: 0.5, y: 0 }}
//       end={{ x: 0.5, y: 1 }}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={{
//           paddingHorizontal: isTablet ? 60 : 20,
//           paddingTop: isTablet ? 70 : 50,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Settings</Text>
//         </View>

//         {/* Search */}
//         <LinearGradient
//           colors={["rgba(25,68,112,0.6)", "rgba(16,26,37,0.8)"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.searchContainer}
//         >
//           <Ionicons name="search" size={18} color="#ccc" />
//           <TextInput
//             placeholder="Search settings"
//             placeholderTextColor="#ccc"
//             style={styles.searchInput}
//           />
//           <Ionicons name="bookmark-outline" size={20} color="#ccc" />
//         </LinearGradient>

//         {/* ACCOUNT */}
//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="person-outline"
//             label="Edit Profile"
//             onPress={() => navigation.navigate("Profile")}
//           />
//           <SettingItem
//             icon="mail-outline"
//             label="Email & Phone"
//             onPress={() => navigation.navigate("EmailPhone")}
//           />
//           <SettingItem
//             icon="lock-closed-outline"
//             label="Change Password"
//             onPress={() => navigation.navigate("ChangePasswordScreen")}
//           />
//           <SettingItem
//             icon="link-outline"
//             label="Linked Accounts"
//             onPress={() => navigation.navigate("LinkedAccountsScreen")}
//           />
//           <SettingItem
//             icon="trash-outline"
//             label="Deactivate / Delete Account"
//             labelColor="red"
//             onPress={() => navigation.navigate("DeleteAccountScreen")}
//           />
//         </View>

//         {/* PRIVACY */}
//         <Text style={styles.sectionTitle}>Privacy</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="eye-outline"
//             label="Profile Visibility"
//             onPress={() => navigation.navigate("ProfileVisibilityScreen")}
//           />
//           <SettingItem
//             icon="chatbubble-ellipses-outline"
//             label="Who Can Message Me"
//             onPress={() => navigation.navigate("MessageControlScreen")}
//           />
//           <SettingItem
//             icon="ban-outline"
//             label="Blocked Users"
//             onPress={() => navigation.navigate("BlockedUsersScreen")}
//           />
//         </View>

//         {/* NOTIFICATIONS */}
//         <Text style={styles.sectionTitle}>Notifications</Text>
//         <View style={styles.card}>
//           <SwitchItem
//             icon="notifications-outline"
//             label="Mentions & Comments"
//             value={mentions}
//             onValueChange={setMentions}
//           />
//           <SwitchItem
//             icon="newspaper-outline"
//             label="Class Updates"
//             value={classUpdates}
//             onValueChange={setClassUpdates}
//           />
//           <SwitchItem
//             icon="alarm-outline"
//             label="Study Reminders"
//             value={studyReminders}
//             onValueChange={setStudyReminders}
//           />
//           <SwitchItem
//             icon="calendar-outline"
//             label="Seminar Invites"
//             value={seminarInvites}
//             onValueChange={setSeminarInvites}
//           />
//         </View>

//         {/* EDUCATION */}
//         <Text style={styles.sectionTitle}>Education</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="school-outline"
//             label="Linked School / Class"
//             rightText="Read-only"
//           />
//           <View style={styles.promoRow}>
//             <MaterialIcons name="confirmation-number" size={18} color="#fff" />
//             <TextInput
//               placeholder="Promo Code"
//               placeholderTextColor="#ccc"
//               style={styles.promoInput}
//             />
//             <TouchableOpacity style={styles.confirmButton}>
//               <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* SUPPORT */}
//         <Text style={styles.sectionTitle}>Support & Legal</Text>
//         <View style={styles.card}>
//           <SettingItem
//             icon="help-circle-outline"
//             label="Help Center"
//             onPress={() => navigation.navigate("HelpCenterScreen")}
//           />
//           <SettingItem
//             icon="bug-outline"
//             label="Report a Problem"
//             onPress={() => navigation.navigate("ReportProblemScreen")}
//           />
//           <SettingItem
//             icon="document-text-outline"
//             label="Privacy Policy"
//             onPress={() => navigation.navigate("PrivacyPolicyScreen")}
//           />
//           <SettingItem
//             icon="document-outline"
//             label="Terms of Service"
//             onPress={() => navigation.navigate("TermsScreen")}
//           />
//         </View>

//         <Text style={styles.versionText}>App Version: v1.0.0</Text>

//         {/* LOG OUT */}
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => navigation.navigate("Login")}
//         >
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// // =============================
// // COMPONENTS
// // =============================
// const SettingItem = ({ icon, label, labelColor = "#fff", rightText, onPress }) => (
//   <TouchableOpacity style={styles.item} onPress={onPress}>
//     <View style={{ flexDirection: "row", alignItems: "center" }}>
//       <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 10 }} />
//       <Text style={[styles.itemText, { color: labelColor }]}>{label}</Text>
//     </View>
//     {rightText ? (
//       <Text style={styles.rightText}>{rightText}</Text>
//     ) : (
//       <Ionicons name="chevron-forward" size={18} color="#ccc" />
//     )}
//   </TouchableOpacity>
// );

// const SwitchItem = ({ icon, label, value, onValueChange }) => (
//   <View style={styles.item}>
//     <View style={{ flexDirection: "row", alignItems: "center" }}>
//       <Ionicons name={icon} size={20} color="#fff" style={{ marginRight: 10 }} />
//       <Text style={styles.itemText}>{label}</Text>
//     </View>
//     <Switch
//       value={value}
//       onValueChange={onValueChange}
//       thumbColor={value ? COLORS.studentPortal.primary : "#666"}
//       trackColor={{ true: "#1A6E8C", false: "#333" }}
//     />
//   </View>
// );

// // =============================
// // STYLES
// // =============================
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//   },
//   searchInput: {
//     flex: 1,
//     color: "#fff",
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   sectionTitle: {
//     color: "#fff",
//     fontWeight: "600",
//     marginBottom: 8,
//     marginTop: 10,
//   },
//   card: {
//     backgroundColor: "rgba(25,68,112,0.35)",
//     borderRadius: 15,
//     paddingVertical: 8,
//     marginBottom: 18,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.05)",
//   },
//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderBottomWidth: 0.3,
//     borderColor: "#2C5A80",
//   },
//   itemText: {
//     fontSize: 14,
//     color: "#fff",
//   },
//   rightText: {
//     color: "#ccc",
//     fontSize: 12,
//   },
//   promoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   promoInput: {
//     flex: 1,
//     backgroundColor: "rgba(16,26,37,0.9)",
//     borderRadius: 20,
//     marginLeft: 10,
//     color: "#fff",
//     paddingHorizontal: 12,
//     height: 35,
//   },
//   confirmButton: {
//     backgroundColor: COLORS.studentPortal.primary,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginLeft: 10,
//   },
//   versionText: {
//     textAlign: "center",
//     color: "#ccc",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   logoutButton: {
//   backgroundColor: "rgba(146, 43, 43, 0.3)", // red tone with blackish transparency
//   borderRadius: 10,
//   paddingVertical: 12,
//   marginBottom: 30,
//   borderWidth: 1,
//   borderColor: "#922B2B", // subtle red outline
// },

// logoutText: {
//   color: "#FF4C4C", // bright red text
//   textAlign: "center",
//   fontWeight: "700",
// },

// });





import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import StudentSettingsWrapper from './StudentSettingsWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSwitch = ({ value, onValueChange }) => {
  const moveAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onValueChange(!value)}>
      <View style={[
        styles.switchTrack,
        { backgroundColor: value ? '#137FEC' : '#3e3e3e' }
      ]}>
        <Animated.View style={[
          styles.switchThumb,
          { transform: [{ translateX }] }
        ]} />
      </View>
    </TouchableOpacity>
  );
};

export default function BlueSettings() {
  const navigation = useNavigation();
  const [mentions, setMentions] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [classUpdates, setClassUpdates] = useState(false);
  const [seminarInvites, setSeminarInvites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isVisible = (text) => text.toLowerCase().includes(searchQuery.toLowerCase());
  const isSearching = searchQuery.length > 0;

  const hasResults =
    isVisible("Edit Profile") || isVisible("Email & Phone") || isVisible("Change Password") ||
    isVisible("Linked Accounts") || isVisible("Deactivate") || isVisible("Profile Visibility") ||
    isVisible("Who Can Message Me") || isVisible("Blocked Users") || isVisible("Mentions & Comments") ||
    isVisible("Class Updates") || isVisible("Study Reminders") || isVisible("Seminar Invites") ||
    isVisible("Linked School") || isVisible("Promo Code") || isVisible("Help Center") ||
    isVisible("Report a Problem") || isVisible("Privacy Policy") || isVisible("Terms of Service");

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userType', 'userId']);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    
    } catch (error) {
        console.error("Error clearing app data.", error);
        navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <StudentSettingsWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9DABB9" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search settings"
            placeholderTextColor="#9DABB9"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {isSearching && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#9DABB9" />
            </TouchableOpacity>
          )}
        </View>

        {isSearching && !hasResults && (
          <View style={styles.noResultsContainer}>
            <MaterialCommunityIcons name="magnify-close" size={50} color="rgba(255,255,255,0.2)" />
            <Text style={styles.noResultsText}>No match found</Text>
          </View>
        )}

        {(isVisible("Edit Profile") || isVisible("Email & Phone") || isVisible("Change Password") || isVisible("Linked Accounts") || isVisible("Deactivate")) && (
          <>
            <Text style={styles.sectionLabel}>Account</Text>
            <View style={styles.glassContainer}>
              {isVisible("Edit Profile") && <BlueRow title="Edit Profile" icon="person-outline" lib="Ionicons" onPress={() => navigation.navigate('EditProfile')} />}
              {isVisible("Email & Phone") && <BlueRow title="Email & Phone" icon="email-outline" lib="MaterialCommunityIcons" onPress={() => navigation.navigate('EmailPhone')} />}
              {isVisible("Change Password") && <BlueRow title="Change Password" icon="lock-outline" lib="MaterialCommunityIcons" onPress={() => navigation.navigate('ChangePassword')} />}
              {isVisible("Linked Accounts") && <BlueRow title="Linked Accounts" icon="link-variant" lib="MaterialCommunityIcons" onPress={() => navigation.navigate('LinkedAccounts')} />}
              {isVisible("Deactivate / Delete Account") && <BlueRow
                title="Deactivate / Delete Account"
                icon="trash-can-outline"
                lib="MaterialCommunityIcons"
                color="#FFFFFF"
                textColor="#EF4444"
                isLast
                onPress={() => navigation.navigate('DeactivateAccount')} />}
            </View>
          </>
        )}

        {(isVisible("Profile Visibility") || isVisible("Who Can Message Me") || isVisible("Blocked Users")) && (
          <>
            <Text style={styles.sectionLabel}>Privacy</Text>
            <View style={styles.glassContainer}>
              {isVisible("Profile Visibility") && <BlueRow title="Profile Visibility" icon="eye" lib="Feather" onPress={() => navigation.navigate('Privacy')} />}
              {isVisible("Who Can Message Me") && <BlueRow title="Who Can Message Me" icon="message-square" lib="Feather" onPress={() => navigation.navigate('MessagePermission')} />}
              {isVisible("Blocked Users") && <BlueRow title="Blocked Users" icon="slash" lib="Feather" isLast onPress={() => navigation.navigate('BlockedAccount')} />}
            </View>
          </>
        )}

        {(isVisible("Mentions & Comments") || isVisible("Class Updates") || isVisible("Study Reminders") || isVisible("Seminar Invites")) && (
          <>
            <Text style={styles.sectionLabel}>Notifications</Text>
            <View style={styles.glassContainer}>
              {isVisible("Mentions & Comments") && <SwitchRow title="Mentions & Comments" icon="at" value={mentions} onValueChange={setMentions} />}
              {isVisible("Class Updates") && <SwitchRow title="Class Updates" icon="book-open" value={classUpdates} onValueChange={setClassUpdates} />}
              {isVisible("Study Reminders") && <SwitchRow title="Study Reminders" icon="clock" value={studyReminders} onValueChange={setStudyReminders} />}
              {isVisible("Seminar Invites") && <SwitchRow title="Seminar Invites" icon="calendar" value={seminarInvites} onValueChange={setSeminarInvites} isLast />}
            </View>
          </>
        )}

        {(isVisible("Linked School") || isVisible("Promo Code")) && (
          <>
            <Text style={styles.sectionLabel}>Education</Text>
            <View style={styles.glassContainer}>
              {isVisible("Linked School / Class") && <BlueRow title="Linked School / Class" icon="school-outline" lib="Ionicons" rightText="Read-only" hideChevron isLast={!isVisible("Promo Code")} />}
              {isVisible("Enter Promo Code") && (
                <View style={styles.promoContainer}>
                  <View style={styles.promoLabelRow}>
                    <Feather name="tag" size={20} color="#FFFFFF" style={{ marginRight: 3 }} />
                    <Text style={styles.rowText}>Enter Promo Code</Text>
                  </View>
                  <View style={styles.promoActionRow}>
                    <TextInput placeholder="Promo Code" placeholderTextColor="#9DABB9" style={styles.promoInput} />
                    <TouchableOpacity style={styles.promoButton}>
                      <Text style={styles.promoButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        )}

        {(isVisible("Help Center") || isVisible("Report a Problem") || isVisible("Privacy Policy") || isVisible("Terms of Service")) && (
          <>
            <Text style={styles.sectionLabel}>Support & Legal</Text>
            <View style={styles.glassContainer}>
             {isVisible("Help Center") && <BlueRow title="Help Center" icon="help-circle-outline" lib="Ionicons" onPress={() => navigation.navigate('HelpCenterScreen')} />}
{isVisible("Report a Problem") && <BlueRow title="Report a Problem" icon="alert-octagon-outline" lib="MaterialCommunityIcons" onPress={() => navigation.navigate('ReportProblemScreen')} />}
              {isVisible("Privacy Policy") && <BlueRow title="Privacy Policy" icon="shield-account-outline" lib="MaterialCommunityIcons" onPress={() => navigation.navigate('PrivacyPolicy')} />}
              {isVisible("Terms of Service") && <BlueRow title="Terms of Service" icon="gavel" lib="MaterialCommunityIcons" isLast onPress={() => navigation.navigate('TermsOfServices')} />}
            </View>
          </>
        )}

        {!isSearching && (
          <>
            <Text style={styles.versionText}>App Version: v1.0.0</Text>
            <TouchableOpacity 
             style={styles.logoutButton}
             onPress={handleLogout}> 
            <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </StudentSettingsWrapper>
  );
}

function BlueRow({ title, icon, lib, color = "#FFFFFF", textColor, isLast, rightText, onPress, hideChevron }) {
  const IconLib = lib === "Feather" ? Feather : lib === "Ionicons" ? Ionicons : MaterialCommunityIcons;
  return (
    <TouchableOpacity style={[styles.row, !isLast && styles.borderBottom]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <IconLib name={icon} size={22} color={color} />
        <Text style={[styles.rowText, { color: textColor || color }]}>{title}</Text>
      </View>
      <View style={styles.rowRight}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {!hideChevron && <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />}
      </View>
    </TouchableOpacity>
  );
}

function SwitchRow({ title, icon, value, onValueChange, isLast }) {
  return (
    <View style={[styles.row, !isLast && styles.borderBottom]}>
      <View style={styles.rowLeft}>
        <MaterialCommunityIcons name={icon} size={20} color="#FFFFFF" />
        <Text style={styles.rowText}>{title}</Text>
      </View>
      <CustomSwitch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 19,
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    height: 23,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Space Grotesk',
    fontWeight: '700',
    fontSize: 18,
    color: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  searchBar: {
    height: 48,
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'Space Grotesk',
    fontSize: 16,
  },
  sectionLabel: {
    marginTop: 28,
    marginBottom: 12,
    fontWeight: '700',
    fontSize: 18,
    color: '#FFFFFF',
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  row: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontFamily: 'Space Grotesk',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    color: 'rgba(255,255,255,0.3)',
    marginRight: 8,
    fontSize: 14,
    fontFamily: 'Space Grotesk',
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 9999,
    justifyContent: 'center',
    padding: 2,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  versionText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 30,
    fontFamily: 'Space Grotesk',
  },
  logoutButton: {
    height: 48,
    marginTop: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '700',
    fontFamily: 'Space Grotesk',
  },
  promoContainer: {
    paddingBottom: 10,
  },
  promoLabelRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  promoActionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    color: '#FFFFFF',
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  promoButton: {
    backgroundColor: '#137FEC',
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Space Grotesk',
  },
  noResultsContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Space Grotesk',
    fontSize: 18,
    marginTop: 10,
  },
});
