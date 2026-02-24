import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
// Removed useRouter import
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import MapView from "react-native-maps"; // Uncomment if using react-native-maps

export default function EditProfileScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [school, setSchool] = useState("");
  const [gender, setGender] = useState(null);
  const [openGender, setOpenGender] = useState(false);
  const [dob, setDob] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  // Removed router reference
  const genderItems = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={["#001F3F", "#003366", "#001A33"]}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
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
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={require("../assets/user.png")} // Fixed to use an existing image
            style={styles.profileImage}
          />
          <Text style={styles.changeText}>Tap to change</Text>
        </TouchableOpacity>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder=""
            placeholderTextColor="#fff8"
          />
        </View>

        {/* Bio */}
        <Text style={styles.label}>Bio</Text>
        <View style={[styles.inputBox, { height: 90 }]}>
          <TextInput
            style={[styles.input, { height: 90 }]}
            value={bio}
            onChangeText={setBio}
            placeholder=""
            placeholderTextColor="#fff8"
            multiline
          />
        </View>

        {/* School */}
        <Text style={styles.label}>School</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
            placeholder=""
            placeholderTextColor="#fff8"
          />
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.inputBox}>
          <DropDownPicker
            open={openGender}
            value={gender}
            items={genderItems}
            setOpen={setOpenGender}
            setValue={setGender}
            setItems={() => {}}
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              minHeight: 40,
            }}
            textStyle={{
              color: "#fff",
              fontFamily: "Poppins_700Bold",
              fontSize: 16,
            }}
            dropDownContainerStyle={{
              backgroundColor: "rgba(0, 31, 63, 0.9)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
              borderRadius: 8,
            }}
            listItemContainerStyle={{
              backgroundColor: "rgba(0, 31, 63, 0.9)",
            }}
            listItemLabelStyle={{
              color: "#fff",
              fontFamily: "Poppins_700Bold",
            }}
            selectedItemContainerStyle={{
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            selectedItemLabelStyle={{
              color: "#fff",
              fontFamily: "Poppins_700Bold",
            }}
            placeholder="Select Gender"
            placeholderStyle={{ color: "#fff8", fontFamily: "Poppins_700Bold" }}
            zIndex={1000}
          />
        </View>

        {/* Date of Birth */}
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowDate(true)}
        >
          <Text style={[styles.input, { color: dob ? "#fff" : "#fff8" }]}>
            {dob || "Select Date"}
          </Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={dob ? new Date(dob) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDate(false);
              if (selectedDate)
                setDob(selectedDate.toISOString().split("T")[0]);
            }}
          />
        )}

        {/* Google Map */}
        <View style={styles.mapBox}>
          {/* Uncomment below if using react-native-maps */}
          {/* <MapView
            style={{ flex: 1, borderRadius: 8 }}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
          <Image
            source={require("../assets/post.png")} // Replace with your map image path
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>

        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              const regex = /^[a-zA-Z0-9_]{3,16}$/;
              setUsernameError(
                regex.test(text) ? "" : "3-16 chars, letters, numbers, _",
              );
            }}
            placeholder=""
            placeholderTextColor="#fff8"
            autoCapitalize="none"
          />
        </View>
        {usernameError ? (
          <Text
            style={{
              color: "red",
              marginLeft: 16,
              marginBottom: 8,
              fontFamily: "SpaceGrotesk",
            }}
          >
            {usernameError}
          </Text>
        ) : null}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 0,
    alignItems: "center",
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "SpaceGrotesk",
  },
  saveText: {
    color: "#B6FFB6",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "SpaceGrotesk",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#fff",
  },
  changeText: {
    color: "#fff8",
    fontSize: 16,
    marginTop: 8,
    fontFamily: "SpaceGrotesk",
  },
  label: {
    width: 358,
    height: 24,
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 16,
  },
  inputBox: {
    width: 355,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Reverted to transparent background
    borderRadius: 30,
    marginBottom: 8,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // Removed shadow properties
  },
  input: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SpaceGrotesk",
    fontWeight: "400",
    width: "100%",
  },
  mapBox: {
    width: 358,
    height: 201,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Reverted to transparent background
    marginVertical: 16,
    alignSelf: "center",
    // Removed shadow properties
  },
});
