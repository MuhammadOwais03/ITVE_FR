
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";

const SelectionScreen = ({ navigation }) => {
  const options = [
    {
      title: "Student",
      icon: <FontAwesome5 name="graduation-cap" size={20} color="#00ADEF" />,
      route: "StudentSignup",
    },
    {
      title: "Donors",
      icon: <FontAwesome5 name="heart" size={20} color="#A259FF" />,
      route: "DonorSignup",
    },
    {
      title: "School/College",
      icon: <FontAwesome5 name="school" size={20} color="#02B290" />,
      route: "SchoolSignup",
    },
    {
      title: "Promoters",
      icon: <FontAwesome5 name="bullhorn" size={20} color="#FF5252" />,
      route: "PromoSignUp",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* 🔙 Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          zIndex: 10,
        }}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Sign Up
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 16,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Let's help you to meet up your task
      </Text>

      {/* Selection Buttons */}
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => navigation.navigate(item.route)}
          style={{
            marginVertical: 10,
          }}
        >
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.15)",
              "rgba(255, 255, 255, 0.05)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 340,
              height: 70,
              borderRadius: 100,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 25,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.25)",
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            {/* Left icon */}
            {item.icon}

            {/* Center text */}
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
                flex: 1,
              }}
            >
              {item.title}
            </Text>

            {/* Right arrow */}
            <FontAwesome name="angle-right" size={22} color="white" />
          </LinearGradient>
        </TouchableOpacity>       
      ))}
    </View>
  );
};

export default SelectionScreen;

