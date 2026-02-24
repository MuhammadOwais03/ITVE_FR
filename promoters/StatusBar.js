import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

const StatusBar = () => {
  const displayTime = '11:39 am';

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{displayTime}</Text>

      <View style={styles.icons}>
        {/* Signal */}
        <Svg width={18} height={12} viewBox="0 0 18 12">
          <Rect x="0" y="8" width="3" height="4" rx="1" fill="white" />
          <Rect x="5" y="5" width="3" height="7" rx="1" fill="white" />
          <Rect x="10" y="2" width="3" height="10" rx="1" fill="white" />
          <Rect x="15" y="0" width="3" height="12" rx="1" fill="white" opacity="0.4" />
        </Svg>

        {/* Wifi */}
        <Svg width={16} height={12} viewBox="0 0 16 12">
          <Path
            d="M8 10C8.55228 10 9 10.4477 9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10Z"
            fill="white"
          />
          <Path
            d="M5 8C5.83333 7.16667 6.83333 6.75 8 6.75C9.16667 6.75 10.1667 7.16667 11 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Path
            d="M2.5 5.5C4.16667 3.83333 6 3 8 3C10 3 11.8333 3.83333 13.5 5.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <Path
            d="M0 3C2.33333 0.666667 5 0 8 0C11 0 13.6667 0.666667 16 3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </Svg>

        {/* Battery */}
        <Svg width={25} height={12} viewBox="0 0 25 12">
          <Rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="2.5"
            stroke="white"
            opacity="0.35"
          />
          <Rect x="2" y="2" width="17" height="8" rx="1.5" fill="white" />
          <Path
            d="M23 4V8C24.1046 8 25 7.10457 25 6C25 4.89543 24.1046 4 23 4Z"
            fill="white"
            opacity="0.4"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});

export default StatusBar;