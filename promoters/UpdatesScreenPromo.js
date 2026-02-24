import { Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const posts = [
  {
    id: 1,
    name: "Bilawal Bhutto Zardari",
    date: "24/1/2026",
    time: "3:30 pm",
    avatar: require("../assets/user.png"),
    text: "School will be closed on the date of 30 January 2025. Thank you for your attention.",
    image: null,
  },
  {
    id: 2,
    name: "Bilawal Bhutto Zardari",
    date: "24/1/2026",
    time: "3:30 pm",
    avatar: require("../assets/user.png"),
    text: "School will be closed on the date of 30 January 2025. Thank you for your attention.",
    image: require("../assets/post.png"),
  },
  {
    id: 3,
    name: "Bilawal Bhutto Zardari",
    date: "24/1/2026",
    time: "3:30 pm",
    avatar: require("../assets/user.png"),
    text: "School will be closed on the date of 30 January 2025. Thank you for your attention.",
    image: null,
  },
];

export default function UpdatesScreenPromo() {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });
  const [input, setInput] = useState("");
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
        <Text style={styles.header}>Updates</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Write here"
            placeholderTextColor="#fff8"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.inputIcon}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {posts.map((post) => (
          <View style={styles.postContainer} key={post.id}>
            <View style={styles.userRow}>
              <Image source={post.avatar} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{post.name}</Text>
                <Text style={styles.userDate}>{post.date}</Text>
              </View>
              <Text style={styles.time}>{post.time}</Text>
              <TouchableOpacity>
                <Icon name="dots-horizontal" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            {post.image && (
              <Image source={post.image} style={styles.postImage} />
            )}
            <View style={styles.commentRow}>
              <View style={styles.iconWithText}>
                <Icon name="heart-outline" size={20} color="#fff" />
                <Text style={styles.iconText}>200</Text>
              </View>
              <View style={styles.iconWithText}>
                <Icon name="comment-outline" size={20} color="#fff" />
                <Text style={styles.iconText}>200</Text>
              </View>
              <View style={styles.iconWithText}>
                <Icon name="play-outline" size={20} color="#fff" />
                <Text style={styles.iconText}>200</Text>
              </View>
              <View style={styles.iconWithText}>
                <Text style={styles.iconText}>2.9K</Text>
                <Icon name="eye-outline" size={20} color="#fff" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  header: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 32,
    marginLeft: 18,
    marginBottom: 12,
  },
  inputBox: {
    width: 360,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginLeft: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#fff2",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    fontWeight: "400",
  },
  inputIcon: {
    marginLeft: 8,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 20,
    padding: 6,
  },
  postContainer: {
    width: 362,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 16,
    marginLeft: 14,
    marginBottom: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#fff2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#7C4DFF",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontWeight: "700",
    fontSize: 16,
  },
  userDate: {
    color: "#fff8",
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    fontWeight: "400",
  },
  time: {
    color: "#fff8",
    fontSize: 12,
    marginRight: 8,
  },
  postText: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 8,
    marginLeft: 4,
  },
  postImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 330,
    height: 38,
    borderRadius: 10,
    marginTop: 8,
    marginLeft: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "#fff2",
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "Poppins_700Bold",
  },
});
