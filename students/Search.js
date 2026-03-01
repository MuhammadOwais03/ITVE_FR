import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Dimensions, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from "@expo/vector-icons"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors as T } from '../constants/colors';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768; // Tablet/Laptop breakpoint

export default function Search() {
  const navigation = useNavigation();

  // Safety check for background color
  const bgColor = T && T.gradient && T.gradient.colors ? T.gradient.colors[2] : '#001F3F';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <SafeAreaView edges={['top']} style={{ flex: 1, alignItems: 'center' }}>
        
        {/* RESPONSIVE WRAPPER: Limits width on Laptop/Desktop */}
        <View style={styles.responsiveWrapper}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" color="#fff" size={isLargeScreen ? 32 : 26} />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Search</Text>
            
            {/* Balancing Spacer */}
            <View style={{ width: isLargeScreen ? 50 : 45 }} />
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Ionicons 
                name="search" 
                color={T?.primary || '#00CCFF'} 
                size={isLargeScreen ? 24 : 20} 
                style={styles.icon} 
              />
              <TextInput 
                placeholder="Search ITVE students, posts..." 
                placeholderTextColor="rgba(255, 255, 255, 0.4)" 
                style={styles.input}
                autoFocus 
                selectionColor={T?.primary || '#00CCFF'}
                keyboardAppearance="dark"
                // Web specific: removes focus outline
                {...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {})}
              />
            </View>
          </View>

          {/* RESULTS AREA */}
          <View style={styles.resultsContainer}>
             <Ionicons 
               name="search-outline" 
               size={isLargeScreen ? 100 : 60} 
               color="rgba(255,255,255,0.05)" 
             />
             <Text style={styles.hintText}>Start typing to see results...</Text>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  responsiveWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 800, // Matches your Notifications screen limit
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    paddingVertical: isLargeScreen ? 30 : 15,
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: isLargeScreen ? 28 : 22, 
    fontWeight: 'bold' 
  },
  backButton: { 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 12, 
    padding: 8,
    width: isLargeScreen ? 50 : 44,
    height: isLargeScreen ? 50 : 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchSection: { 
    paddingHorizontal: 20, 
    marginTop: 10 
  },
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15, 
    paddingHorizontal: 15, 
    alignItems: 'center',
    height: isLargeScreen ? 60 : 52,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: { 
    marginRight: 12 
  },
  input: { 
    color: '#fff', 
    flex: 1, 
    fontSize: isLargeScreen ? 18 : 16,
    height: '100%'
  },
  resultsContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingBottom: 100 // Visual balance
  },
  hintText: { 
    color: 'rgba(255,255,255,0.3)', 
    fontSize: isLargeScreen ? 18 : 14,
    marginTop: 15
  }
});