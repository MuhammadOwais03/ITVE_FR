import React, { useState, useMemo } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import alexAvatar from '../assets/alex-avatar.png';
import sophiaClarkAvatar from '../assets/sophia-clark-avatar.png';
import liamEvansAvatar from '../assets/liam-evans-avatar.png';
import oliviaAvatar from '../assets/olivia-avatar.png';
import noahAvatar from '../assets/noah-avatar.png';
import { useNavigation } from '@react-navigation/native';
import StatusBar from './StatusBar';
import { BackArrowIcon } from './Icons';
import BottomNavigation from './components/BottomNavigation';
import Svg, { Circle, Path } from 'react-native-svg';

const suggestions = [
  { id: '1', name: 'Alex Anderson', username: '@alex.anderson', avatar: alexAvatar },
  { id: '2', name: 'Sophia Clark', username: '@sophia.clark', avatar: sophiaClarkAvatar },
  { id: '3', name: 'Liam Evans', username: '@liam.evans', avatar: liamEvansAvatar },
  { id: '4', name: 'Olivia Foster', username: '@olivia.foster', avatar: oliviaAvatar },
  { id: '5', name: 'Noah Garcia', username: '@noah.garcia', avatar: noahAvatar },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return suggestions;
    const query = searchQuery.toLowerCase();
    return suggestions.filter(s => s.name.toLowerCase().includes(query) || s.username.toLowerCase().includes(query));
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowIcon size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <View style={styles.searchIconWrap}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <Circle cx="11" cy="11" r="7"/><Path d="M16 16L20 20" strokeLinecap="round"/>
            </Svg>
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
            <View style={styles.clearCircle}>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                <Path d="M2 2L8 8M8 2L2 8" strokeLinecap="round"/>
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 96, paddingHorizontal: 16 }}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <View style={styles.suggestionsList}>
          {filteredSuggestions.map((s) => (
            <View key={s.id} style={styles.suggestionRow}>
              <View style={styles.suggestionAvatar}>
                <Image source={{ uri: s.avatar }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              </View>
              <View>
                <Text style={styles.suggestionName}>{s.name}</Text>
                <Text style={styles.suggestionUsername}>{s.username}</Text>
              </View>
            </View>
          ))}
          {filteredSuggestions.length === 0 && <Text style={styles.noResults}>No results found</Text>}
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  topTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '600', flex: 1, textAlign: 'center' },
  searchSection: { paddingHorizontal: 16, marginBottom: 24 },
  searchBox: { position: 'relative' },
  searchIconWrap: { position: 'absolute', left: 16, top: 12, zIndex: 1 },
  searchInput: { width: '100%', backgroundColor: '#5A1A1A', borderRadius: 9999, paddingVertical: 12, paddingLeft: 48, paddingRight: 48, color: '#FFFFFF', fontSize: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  clearBtn: { position: 'absolute', right: 16, top: 12 },
  clearCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
  list: { flex: 1 },
  sectionTitle: { color: '#FFFFFF', fontWeight: '600', fontSize: 18, marginBottom: 16 },
  suggestionsList: { gap: 16 },
  suggestionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  suggestionAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', overflow: 'hidden' },
  suggestionName: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  suggestionUsername: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  noResults: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
});

export default SearchScreen;
