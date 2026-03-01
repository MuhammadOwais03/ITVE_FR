import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DOBField = ({ gradientColors, textColor = 'white', onDateChange }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const glassColors =
    gradientColors || [
      'rgba(255, 255, 255, 0.15)',
      'rgba(255, 255, 255, 0.05)',
    ];

  useEffect(() => {
    if (year.length === 4 && month.length > 0 && day.length > 0) {
      const formattedMonth = month.padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      onDateChange(`${year}-${formattedMonth}-${formattedDay}`);
    } else {
      onDateChange('');
    }
  }, [day, month, year]);

  const boxStyle = {
    width: 55,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  };

  return (
    <View
      style={{
        width: 340,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight: '500',
        }}
      >
        Date of Birth:
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 5,
        }}
      >
        {/* Day */}
        <LinearGradient colors={glassColors} style={boxStyle}>
          <TextInput
            style={{ color: textColor, fontSize: 15, textAlign: 'center', width: '100%' }}
            placeholder="DD"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="numeric"
            maxLength={2}
            value={day}
            onChangeText={setDay}
          />
        </LinearGradient>

        {/* Month */}
        <LinearGradient colors={glassColors} style={boxStyle}>
          <TextInput
            style={{ color: textColor, fontSize: 15, textAlign: 'center', width: '100%' }}
            placeholder="MM"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="numeric"
            maxLength={2}
            value={month}
            onChangeText={setMonth}
          />
        </LinearGradient>

        {/* Year */}
        <LinearGradient colors={glassColors} style={{ ...boxStyle, width: 70 }}>
          <TextInput
            style={{ color: textColor, fontSize: 15, textAlign: 'center', width: '100%' }}
            placeholder="YYYY"
            placeholderTextColor="rgba(255,255,255,0.5)"
            keyboardType="numeric"
            maxLength={4}
            value={year}
            onChangeText={setYear}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default DOBField;