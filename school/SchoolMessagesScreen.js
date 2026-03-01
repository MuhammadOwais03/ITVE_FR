import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "./components/BottomNavBar";
import BottomNavbar from "./components/BottomNavBar";

const { width } = Dimensions.get("window");

const MessagesScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const chats = [
    { name: "Ali Akbar", message: "Hello world", time: "3:15 pm", badge: "green" },
    { name: "Talha Nawaz", message: "Hello world", time: "3:15 pm", badge: "red" },
    { name: "Ayaan Hassan", message: "Hello world", time: "3:15 pm", badge: "green" },
    { name: "Danish Aslam", message: "Hello world", time: "3:15 pm", badge: "yellow" },
    { name: "Rayyan Hussain", message: "Hello world", time: "3:15 pm", badge: "green" },
    { name: "Ibrahim Khan", message: "Hello world", time: "3:15 pm", badge: "red" },
    { name: "Maryam Nawaz", message: "Hello world", time: "3:15 pm", badge: "yellow" },
    { name: "Umer Haider", message: "Hello world", time: "3:15 pm", badge: "green" },
    { name: "Rohail Niazi", message: "Hello world", time: "3:15 pm", badge: "green" },
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "green": return "#4CAF50";
      case "red": return "#FF3B30";
      case "yellow": return "#FFCC00";
      default: return "#4CAF50";
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#135821', '#094014', '#052401']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={width * 0.045} color="#88AA88" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#88AA88"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#88AA88" />
            </TouchableOpacity>
          )}
        </View>

        {/* Chat List */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.chatRow}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("SchoolChatDetail", { 
                    name: chat.name,
                    badgeColor: getBadgeColor(chat.badge)
                })}
              >
                <View style={styles.leftSection}>
                  <Image
                    source={require("../assets/user.png")}
                    style={styles.userImage}
                  />
                  <View style={styles.textSection}>
                    <View style={styles.nameRow}>
                      <Text style={styles.name}>{chat.name}</Text>
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color={getBadgeColor(chat.badge)}
                        style={{ marginLeft: 5 }}
                      />
                    </View>
                    <Text style={styles.message} numberOfLines={1}>
                      {chat.message}
                    </Text>
                  </View>
                </View>
                <Text style={styles.time}>{chat.time}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>No conversations found</Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>

    <BottomNavbar navigation={navigation} activeTab="Messages" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#052401",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingHorizontal: width * 0.05,
  },
  header: {
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(19, 88, 33, 0.4)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  chatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(136, 170, 136, 0.2)",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    marginRight: 12,
    resizeMode: "cover",
    backgroundColor: '#094014'
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  message: {
    color: "#88AA88",
    fontSize: 13,
  },
  time: {
    color: "#88AA88",
    fontSize: 12,
  },
  noResultContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  noResultText: {
    color: "#88AA88",
    fontSize: 14,
    opacity: 0.6
  }
});

export default MessagesScreen;