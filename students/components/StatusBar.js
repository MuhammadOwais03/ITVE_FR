import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatusBar = () => {
  const displayTime = "11:39 AM";

  return (
    <View style={styles.container}>
      {/* Time */}
      <Text style={styles.time}>{displayTime}</Text>

      {/* Right-side icons */}
      <View style={styles.rightIcons}>
        {/* Signal */}
        <View style={styles.signalContainer}>
          <View style={[styles.signalBar, { height: 4 }]} />
          <View style={[styles.signalBar, { height: 7 }]} />
          <View style={[styles.signalBar, { height: 10 }]} />
          <View style={[styles.signalBar, { height: 12, opacity: 0.4 }]} />
        </View>

        {/* WiFi */}
        <View style={styles.wifiContainer}>
          <View style={styles.wifiArc} />
          <View style={[styles.wifiArc, { width: 10, height: 10, borderRadius: 5 }]} />
        </View>

        {/* Battery */}
        <View style={styles.batteryContainer}>
          <View style={styles.batteryBody}>
            <View style={styles.batteryFill} />
          </View>
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#001F3F",
  },
  time: { color: "white", fontWeight: "bold" },

  rightIcons: { flexDirection: "row", alignItems: "center", gap: 8 },

  signalContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 1,
    marginRight: 4,
  },
  signalBar: {
    width: 3,
    backgroundColor: "white",
    borderRadius: 0.5,
  },

  wifiContainer: {
    width: 16,
    height: 12,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  wifiArc: {
    width: 16,
    height: 8,
    borderBottomWidth: 1.5,
    borderColor: "white",
    borderRadius: 8,
  },

  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryBody: {
    width: 21,
    height: 11,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 2,
    justifyContent: "center",
    marginRight: 2,
  },
  batteryFill: {
    width: 17,
    height: 8,
    backgroundColor: "white",
    borderRadius: 1,
    marginLeft: 1,
  },
  batteryTip: {
    width: 3,
    height: 6,
    backgroundColor: "white",
    borderRadius: 1,
  },
});

export default StatusBar;
