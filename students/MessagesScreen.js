import React, { useState, useEffect } from "react";
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
import { COLORS } from "../constants/colors";
import Navbar from "./components/Navbar";

const { width } = Dimensions.get("window");

const MessagesScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  
  // Store all chats with their full message history
  const [chats, setChats] = useState([
    { 
      id: "1", 
      name: "Ali Akbar", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "blue", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: [] // Will store full message history
    },
    { 
      id: "2", 
      name: "Talha Nawaz", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "red", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: []
    },
    { 
      id: "3", 
      name: "Ayaan Hassan", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "blue", 
      isBlocked: false, 
      isMuted: true,
      chatHistory: []
    },
    { 
      id: "4", 
      name: "Danish Aslam", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "purple", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: []
    },
    { 
      id: "5", 
      name: "Rayyan Hussain", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "green", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: []
    },
    { 
      id: "6", 
      name: "Ibrahim Khan", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "red", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: []
    },
    { 
      id: "7", 
      name: "Maryam Nawaz", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "purple", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: []
    },
    { 
      id: "8", 
      name: "Umer Haider", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "green", 
      isBlocked: false, 
      isMuted: false,
      chatHistory: []
    },
    { 
      id: "9", 
      name: "Rohail Niazi", 
      message: "Hello world", 
      time: "3:15 pm", 
      badge: "green", 
      isBlocked: false, 
      isMuted: true,
      chatHistory: []
    },
  ]);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "blue": return "#00CCFF";
      case "red": return "#FF3B30";
      case "green": return "#4CD964";
      case "purple": return "#AF52DE";
      default: return "#00CCFF";
    }
  };

  // Sync mute status from ChatDetail
  const handleUserMuted = (userId, status) => {
    setChats(prev => prev.map(c => 
      c.id === userId ? { ...c, isMuted: status } : c
    ));
  };

  // Sync block status from ChatDetail
  const handleUserBlocked = (userId) => {
    setChats(prev => prev.map(c => 
      c.id === userId ? { ...c, isBlocked: true } : c
    ));
  };

  // Sync unblock status from ChatDetail
  const handleUserUnblocked = (userId) => {
    setChats(prev => prev.map(c => 
      c.id === userId ? { ...c, isBlocked: false } : c
    ));
  };

  // Handle chat deletion
  const handleUserDeleted = (userId) => {
    setChats(prev => prev.filter(c => c.id !== userId));
  };

  // Update full chat history when messages change in ChatDetail
  const handleUpdateChatHistory = (userId, chatHistory) => {
    setChats(prev => prev.map(c => 
      c.id === userId ? { ...c, chatHistory: chatHistory } : c
    ));
  };

  // Update last message and time when new message is sent
  const handleNewMessage = (userId, lastMsg, timeString) => {
    setChats(prev => prev.map(c => 
      c.id === userId ? { ...c, message: lastMsg, time: timeString } : c
    ));
  };

  // Filter chats based on search
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={COLORS.studentPortal.gradient.colors}
        start={COLORS.studentPortal.gradient.start}
        end={COLORS.studentPortal.gradient.end}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
        </View>

        {/* Prominent Search Bar with Border */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={width * 0.045} color="#A9CBEA" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#A9CBEA"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {filteredChats.map((chat) => (
            <TouchableOpacity 
              key={chat.id} 
              style={styles.chatRow}
              onPress={() => navigation.navigate("ChatDetail", { 
                  name: chat.name,
                  badgeColor: getBadgeColor(chat.badge),
                  id: chat.id,
                  isBlocked: chat.isBlocked,
                  isMuted: chat.isMuted,
                  existingChatHistory: chat.chatHistory, // Pass full chat history
                  onUserBlocked: handleUserBlocked,
                  onUserDeleted: handleUserDeleted,
                  onUserUnblocked: handleUserUnblocked,
                  onUserMuted: handleUserMuted,
                  onNewMessage: handleNewMessage,
                  onUpdateChatHistory: handleUpdateChatHistory // New callback
              })}
            >
              <View style={styles.leftSection}>
                <Image source={require("../assets/user.png")} style={styles.userImage} />
                <View style={styles.textSection}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{chat.name}</Text>
                    {chat.isBlocked ? (
                      <Ionicons name="ban" size={14} color="#FF6B6B" style={{ marginLeft: 5 }} />
                    ) : (
                      <Ionicons name="checkmark-circle" size={14} color={getBadgeColor(chat.badge)} style={{ marginLeft: 5 }} />
                    )}
                  </View>
                  <View style={styles.messageRow}>
                    <Text 
                      style={[
                        styles.message, 
                        chat.isBlocked && styles.blockedMessage
                      ]} 
                      numberOfLines={1}
                    >
                      {chat.isBlocked ? "You blocked this user" : chat.message}
                    </Text>
                    {chat.isMuted && !chat.isBlocked && (
                      <Ionicons 
                        name="notifications-off" 
                        size={12} 
                        color="#FF3B30" 
                        style={{ marginLeft: 6 }} 
                      />
                    )}
                  </View>
                </View>
              </View>
              <Text style={styles.time}>{chat.time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
      <Navbar navigation={navigation} active="Messages" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#000" },
  container: { 
    flex: 1, 
    paddingTop: Platform.OS === "ios" ? 60 : 40, 
    paddingHorizontal: width * 0.05 
  },
  header: { marginBottom: 15 },
  title: { 
    color: "#fff", 
    fontSize: width * 0.06, 
    fontWeight: "700" 
  },
  // Prominent search bar with border - exactly as requested
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "rgba(255, 255, 255, 0.05)", 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    height: 48, 
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "rgba(169, 203, 234, 0.4)"
  },
  searchIcon: { marginRight: 10 },
  searchInput: { 
    flex: 1, 
    color: "#fff", 
    fontSize: 15 
  },
  scrollContent: { paddingBottom: 100 },
  chatRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingVertical: 12, 
    borderBottomWidth: 0.5, 
    borderBottomColor: "rgba(43, 74, 106, 0.5)" 
  },
  leftSection: { 
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1 
  },
  userImage: { 
    width: width * 0.12, 
    height: width * 0.12, 
    borderRadius: (width * 0.12) / 2, 
    marginRight: 12, 
    backgroundColor: '#1A1A1A' 
  },
  textSection: { 
    flex: 1, 
    justifyContent: "center" 
  },
  nameRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 2 
  },
  name: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 16 
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: { 
    color: "#A9CBEA", 
    fontSize: 13,
    flex: 1,
  },
  blockedMessage: { 
    color: "#FF6B6B", 
    fontStyle: "italic" 
  },
  time: { 
    color: "#A9CBEA", 
    fontSize: 12 
  }
});

export default MessagesScreen;
