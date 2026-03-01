import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Field = ({
  placeholder,
  center = false,
  gradientColors = null,
  style = {},
  textColor = "rgba(255,255,255,0.9)",
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  onSelect,
  isLocationField = false,
  onLocationPress,
  fetchingGPS = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const isGenderField = placeholder.toLowerCase() === "gender";
  const genderOptions = ["male", "female", "Other"];

  const handleSelect = (option) => {
    setSelected(option);
    setShowDropdown(false);
    if (onSelect) onSelect(option);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => isGenderField && setShowDropdown(!showDropdown)}
      >
        <LinearGradient
          colors={
            gradientColors || [
              "rgba(255, 255, 255, 0.15)",
              "rgba(255, 255, 255, 0.05)",
            ]
          }
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
            marginVertical: 10,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.25)",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            backgroundColor: "rgba(255,255,255,0.1)",
            ...style,
          }}
        >
          {isGenderField ? (
            <Text
              style={{
                color: selected ? textColor : "rgba(255,255,255,0.6)",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              {selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : placeholder}
            </Text>
          ) : (
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={{
                color: "white",
                fontSize: 18,
                flex: 1,
                paddingRight: (secureTextEntry || isLocationField) ? 10 : 0, // Add padding so text doesn't overlap icons
              }}
              secureTextEntry={secureTextEntry && !showPassword}
              value={value}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
            />
          )}

          {/* 👁️ Eye icon for password fields */}
          {secureTextEntry && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="white"
              />
            </TouchableOpacity>
          )}

          {/* ⬇️ Chevron for gender dropdown */}
          {isGenderField && (
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={22}
              color="white"
            />
          )}

          {/* 📍 GPS Icon for Location Field */}
          {isLocationField && (
            <TouchableOpacity onPress={onLocationPress} disabled={fetchingGPS} style={{ padding: 5 }}>
              {fetchingGPS ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="location-outline" size={24} color="white" />
              )}
            </TouchableOpacity>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isGenderField && showDropdown && (
        <View
          style={{
            width: 340,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)",
            marginTop: -5,
            overflow: "hidden",
          }}
        >
          {genderOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => handleSelect(option)}
            >
              <LinearGradient
                colors={gradientColors}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default Field;