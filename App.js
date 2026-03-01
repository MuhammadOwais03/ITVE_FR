import React, {useEffect} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

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
import AdminTab from './admin/AdminTab';
import CoursesScreen from './admin/CoursesScreen';
import AddCampus from './admin/AddCampus';
import EditCourse from './admin/EditCourse';
import LaunchCourse from './admin/LaunchCourse';
import NewCourse from './admin/NewCourse';
import GenerateTeacherAccount from './admin/GenerateTeacherAccount';
import Navbar from './admin/components/NavBar';
import Report from './admin/Report';

const Stack = createNativeStackNavigator();
const Placeholder = () => <View style={{ flex: 1, backgroundColor: 'black' }} />;

export default function App() {
  useEffect(() => {
  NavigationBar.setVisibilityAsync('hidden');
  NavigationBar.setBehaviorAsync('overlay-swipe');
}, []);
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
         

          {/* --- ADMIN PORTAL --- */}
          <Stack.Screen name="AdminTabs" component={AdminTab} />
          {/* <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="AddCampus" component={AddCampus} />
          <Stack.Screen name="EditCourse" component={EditCourse} />
          <Stack.Screen name="LaunchCourse" component={LaunchCourse} />
          <Stack.Screen name="NewCourse" component={NewCourse} />
          <Stack.Screen name="GenerateTeacherAccount" component={GenerateTeacherAccount} />


          <Stack.Screen name="GrowthScreen" component={Placeholder} />
          <Stack.Screen name="ReportsScreen" component={Report} />
          <Stack.Screen name="AdminScreen" component={Placeholder} /> */}
        </Stack.Navigator>


      </NavigationContainer>
    </SafeAreaProvider>
  );
}
