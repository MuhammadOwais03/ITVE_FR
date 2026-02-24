import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Field from '../students/components/Field';
import { COLORS } from '../constants/colors';
import DOBField from '../students/components/DOBField';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location'; 
import { BACKEND_URL } from '@env';

const { width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
    const theme = COLORS.studentPortal;
    const fieldWidth = width * 0.95;
    const buttonWidth = width * 0.9;
    
    const API_URL = `${BACKEND_URL}/api/v1/students`

    const fieldGradient = [
        `${theme.fieldBackground}AA`, 
        `${theme.fieldBackground}55`, 
    ];

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [promoCode, setPromoCode] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [fetchingGPS, setFetchingGPS] = useState(false); 

    const handleFetchLocation = async () => {
        setFetchingGPS(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission Denied", "Please grant location access in your device settings.");
                setFetchingGPS(false);
                return;
            }

            let currentPosition = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            
            const [address] = await Location.reverseGeocodeAsync({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            });

            if (address) {
               
                const area = address.district || address.subregion || address.street;
                const city = address.city || address.region;
                const country = address.country;

                const locationParts = [area, city, country].filter(Boolean);
                const fullLocationString = locationParts.join(', ');

                if (fullLocationString) {
                    setLocation(fullLocationString);
                } else {
                    Alert.alert("Notice", "Could not pinpoint your exact location. Please enter it manually.");
                }
            } else {
                Alert.alert("Notice", "Could not fetch address details.");
            }
        } catch (error) {
            console.error("Location Error:", error);
            Alert.alert("Error", "Failed to fetch location. Check your GPS settings.");
        } finally {
            setFetchingGPS(false);
        }
    };

    const handleSignup = async () => {
        if (!name || !username || !email || !password || !phone || !dob || !gender || !location) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        const cleanPhone = phone.replace('+92', '').replace(/^0+/, '').replace(/\s/g, ''); 
        const formattedPhone = `+92 ${cleanPhone}`;

        const payload = {
            name: name,
            gender: gender.toLowerCase(),
            date_of_birth: dob,
            location: location,
            username: username,
            phone: formattedPhone,
            email: email,
            password: password,
            promo_code: promoCode || null
        };

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                navigation.navigate('Login');
                setTimeout(() => {
                    Alert.alert("Success", "Account created successfully!");
                }, 500);
            } else {
                const errorMessage = typeof data.detail === 'string' 
                    ? data.detail 
                    : JSON.stringify(data.detail);
                Alert.alert("Signup Failed", errorMessage);
            }

        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={theme.gradient.colors}
            start={theme.gradient.start}
            end={theme.gradient.end}
            style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}
        >         
          <TouchableOpacity
                onPress={() => navigation.navigate('Selection')}
                style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
            >
                <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>   
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 60, width: '100%' }}
            >
                <Text style={{ color: 'white', fontSize: 29, fontWeight: 'bold', marginBottom: 20 }}>
                    Sign Up
                </Text>

                <View style={{ width: fieldWidth, alignItems: 'center' }}>
                    <Field 
                        placeholder="Enter your name" 
                        gradientColors={fieldGradient} 
                        value={name} 
                        onChangeText={setName} 
                    />
                    
                    <Field 
                        placeholder="Phone (e.g. 3001234567)" 
                        gradientColors={fieldGradient} 
                        keyboardType="numeric"
                        value={phone} 
                        onChangeText={setPhone} 
                    />
                    
                    <DOBField 
                        gradientColors={fieldGradient} 
                        onDateChange={setDob}
                    />
                    
                    <Field 
                        placeholder="Gender" 
                        gradientColors={fieldGradient} 
                        onSelect={setGender}
                    />
                    
                    <Field 
                        placeholder="Enter your username" 
                        gradientColors={fieldGradient} 
                        value={username}
                        onChangeText={setUsername}
                    />
                    
                    <Field 
                        placeholder="Enter your email" 
                        gradientColors={fieldGradient} 
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    
                    <Field 
                        placeholder="Enter your password" 
                        gradientColors={fieldGradient} 
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    
                    <Field 
                        placeholder="Confirm your password" 
                        gradientColors={fieldGradient} 
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <Field 
                        placeholder="Promo Code (Optional)" 
                        gradientColors={fieldGradient} 
                        value={promoCode}
                        onChangeText={setPromoCode}
                    />

                    {/* 🔹 Location Field updated with new placeholder */}
                    <Field 
                        placeholder="Location (Area, City, Country)" 
                        gradientColors={fieldGradient} 
                        value={location}
                        onChangeText={setLocation}
                        isLocationField={true}
                        onLocationPress={handleFetchLocation}
                        fetchingGPS={fetchingGPS}
                    />
                </View>

                {/* 🔹 Sign Up Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        width: buttonWidth,
                        height: 60,
                        backgroundColor: theme.primary,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                        opacity: loading ? 0.7 : 1
                    }}
                    onPress={handleSignup} 
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }}>
                            Sign Up
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

export default SignUpScreen;