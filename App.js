import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ==========================================
// 1. AUTH & COMMON SCREENS
// ==========================================
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SelectionScreen from './screens/SelectionScreen';
import ForgotPassword from './screens/ForgotPassword';
import SignUpScreen from './screens/StudentSignupScreen';

// ==========================================
// 2. STUDENT PORTAL SCREENS
// ==========================================
import StudentTab from './students/StudentTab';
import NotificationsScreen from './students/NotificationsScreen';
import SettingsScreen from './students/SettingsScreen';
import EditProfile from './students/EditProfile';
import EmailPhoneScreen from './students/EmailPhoneScreen';
import ChangePassword from './students/ChangePassword';
import LinkedAccounts from './students/LinkedAccounts';
import DeactivateAccount from './students/DeactivateAccount';
import Privacy from './students/Privacy';
import BlockedAccount from './students/BlockedAccounts';
import Scholarship from './students/Scholarship';
import MessagePermission from './students/MessagePermissions';
import PrivacyPolicy from './students/PrivacyPolicy';
import TermsOfServices from './students/TermsOfServices';
import Search from './students/Search';
import Comments from './students/Comments';
import ChatDetail from './students/ChatDetail';
import HelpCenterScreen from './students/HelpCenterScreen';
import ReportProblem from './students/ReportProblemScreen';
import FAQs from './students/FAQs';
import Troubleshooting from './students/Troubleshooting';
import ProfileWatcher from './students/ProfileWatcher';
import ProfileScreen from './students/ProfileScreen';

// ==========================================
// 3. PROMOTER PORTAL SCREENS
// ==========================================
import PromoSignup from './promoters/PromoSignUp';
import PromoTab from './promoters/PromoTab';
import PromoterHome from './promoters/PromoterHome';
import SearchScreen from './promoters/SearchScreen';
import EditProfileScreen from './promoters/EditProfileScreen';
import EmailPhoneManagementScreen from './promoters/EmailPhoneManagementScreen';
import ChangePasswordDonorScreen from './promoters/ChangePasswordDonorScreen';
import LinkedAccountScreen from './promoters/LinkedAccountScreen';
import DeleteAccountDonorScreen from './promoters/DeleteAccountDonorScreen';
import BlockedAccountsScreen from './promoters/BlockedAccountsScreen';
import MessageSettingDonor from './promoters/MessageSettingDonor';
import UpdatesScreenPromo from './promoters/UpdatesScreenPromo';
import PrivacyPolicyPromo from './promoters/PrivacyPolicyPromo';
import TermsOfServiceScreen from './promoters/TermsOfServiceScreen';
import ReportProblemScreen from './promoters/ReportProblemScreen';

// ==========================================
// 4. SCHOOL PORTAL SCREENS
// ==========================================
import SchoolSignUp from './school/SchoolSignUp';
import SignUpSchoolTwo from './school/SignUpSchool_2';
import HomeScreenSchool from './school/HomeScreenSchool';
import ProfileWatcherSchool from './school/ProfileWatcherSchool';
import ProfileScreenSchool from './school/ProfileScreenSchool';
import SchoolComments from './school/SchoolComments';
import SchoolUpdatesScreen from './school/SchoolUpdatesScreen';
import SchoolMessagesScreen from './school/SchoolMessagesScreen';
import SchoolNotificationsScreen from './school/SchoolNotificationsScreen';
import SchoolSearch from './school/SchoolSearch';
import SchoolChatDetail from './school/SchoolChatDetail';
import StudentsScreen from './school/StudentsScreen';

// ==========================================
// 5. ADMIN PORTAL SCREENS
// ==========================================
import CoursesScreen from './admin/CoursesScreen';
import AddCampus from './admin/AddCampus';
import EditCourse from './admin/EditCourse';
import LaunchCourse from './admin/LaunchCourse';
import NewCourse from './admin/NewCourse';
import GenerateTeacherAccount from './admin/GenerateTeacherAccount';
import Navbar from './admin/components/NavBar';

const Stack = createNativeStackNavigator();
const Placeholder = () => <View style={{ flex: 1, backgroundColor: 'black' }} />;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#000' } // Keeps background consistent
          }}
        >
          {/* --- AUTH / COMMON --- */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Selection" component={SelectionScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="StudentSignup" component={SignUpScreen} />

          {/* --- STUDENT PORTAL --- */}
          <Stack.Screen name="StudentTabs" component={StudentTab} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ChatDetail" component={ChatDetail} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="EmailPhone" component={EmailPhoneScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="LinkedAccounts" component={LinkedAccounts} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="DeactivateAccount" component={DeactivateAccount} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="BlockedAccount" component={BlockedAccount} />
          <Stack.Screen name="Scholarship" component={Scholarship} />
          <Stack.Screen name="MessagePermission" component={MessagePermission} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="TermsOfServices" component={TermsOfServices} />
          <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
          <Stack.Screen name="ReportProblemScreen" component={ReportProblem} />
          <Stack.Screen name="Troubleshooting" component={Troubleshooting} />
          <Stack.Screen name="ProfileWatcher" component={ProfileWatcher} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="FAQs" component={FAQs} />

          {/* --- PROMOTER PORTAL --- */}
          <Stack.Screen name="PromoSignUp" component={PromoSignup} />
          <Stack.Screen name="PromoTab" component={PromoTab} />
          <Stack.Screen name="PromoterHome" component={PromoterHome} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="EditProfilePr" component={EditProfileScreen} />
          <Stack.Screen name="EmailChangePr" component={EmailPhoneManagementScreen} />
          <Stack.Screen name="ChangePasswordPr" component={ChangePasswordDonorScreen} />
          <Stack.Screen name="LinkedAccountPr" component={LinkedAccountScreen} />
          <Stack.Screen name="DeleteAccountPr" component={DeleteAccountDonorScreen} />
          <Stack.Screen name="BlockedAccountsPr" component={BlockedAccountsScreen} />
          <Stack.Screen name="MessageSettingPr" component={MessageSettingDonor} />
          <Stack.Screen name="HelpCenterPr" component={HelpCenterScreen} />
          <Stack.Screen name="ReportProblemPr" component={ReportProblemScreen} />
          <Stack.Screen name="PrivacyPolicyPr" component={PrivacyPolicyPromo} />
          <Stack.Screen name="TermsOfServicePr" component={TermsOfServiceScreen} />
          <Stack.Screen name="UpdatesPr" component={UpdatesScreenPromo} />

          {/* --- SCHOOL PORTAL --- */}
          <Stack.Screen name="SchoolSignup" component={SchoolSignUp} />
          <Stack.Screen name="SignUpTwo" component={SignUpSchoolTwo} />
          <Stack.Screen name="HomeScreenSchool" component={HomeScreenSchool} />
          <Stack.Screen name="ProfileWatcherSchool" component={ProfileWatcherSchool} />
          <Stack.Screen name="ProfileScreenSchool" component={ProfileScreenSchool} />
          <Stack.Screen name="SchoolComments" component={SchoolComments} />
          <Stack.Screen name="SchoolUpdatesScreen" component={SchoolUpdatesScreen} />
          <Stack.Screen name="SchoolMessagesScreen" component={SchoolMessagesScreen} />
          <Stack.Screen name="SchoolNotificationsScreen" component={SchoolNotificationsScreen} />
          <Stack.Screen name="SchoolSearch" component={SchoolSearch} />
          <Stack.Screen name="SchoolChatDetail" component={SchoolChatDetail} />
          <Stack.Screen name="StudentsScreen" component={StudentsScreen} />

          {/* --- ADMIN PORTAL --- */}
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="AddCampus" component={AddCampus} />
          <Stack.Screen name="EditCourse" component={EditCourse} />
          <Stack.Screen name="LaunchCourse" component={LaunchCourse} />
          <Stack.Screen name="NewCourse" component={NewCourse} />
          <Stack.Screen name="GenerateTeacherAccount" component={GenerateTeacherAccount} />
          
          {/* Admin Nav Placeholders */}
          <Stack.Screen name="GrowthScreen" component={Placeholder} />
          <Stack.Screen name="ReportsScreen" component={Placeholder} />
          <Stack.Screen name="AdminScreen" component={Placeholder} />
        </Stack.Navigator>


      </NavigationContainer>
    </SafeAreaProvider>
  );
}
