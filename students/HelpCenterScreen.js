import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HelpTopic = ({ title, description, onPress }) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.topicContainer} onPress={onPress}>
    <View style={styles.topicHeader}>
      <Text style={styles.topicTitle}>{title}</Text>
      <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
    </View>
    <Text style={styles.topicDescription}>{description}</Text>
  </TouchableOpacity>
);

const FAQItem = ({ question, answer, onPress }) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.faqItem} onPress={onPress}>
    <View style={styles.faqHeader}>
      <Text style={styles.faqQuestion}>{question}</Text>
      <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
    </View>
    <Text style={styles.faqAnswer}>{answer}</Text>
  </TouchableOpacity>
);

const HelpCenterContent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Responsive calculations
  const isMobile = width < 768;
  const isSmallScreen = height < 700;
  
  // Help topics data - UPDATED: Troubleshooting links to Troubleshooting.js
  const helpTopics = [
    {
      id: 1,
      title: "Account",
      description: "Users may create an account to access features within the ITVE platform. Information requested during registration can vary depending on operational requirements.",
      screen: "Profile"
    },
    {
      id: 2,
      title: "Privacy",
      description: "The platform may collect, store, or process certain information for functional or analytical purposes.",
      screen: "PrivacyPolicy"
    },
    {
      id: 3,
      title: "Troubleshooting",
      description: "This may occur due to connectivity issues, device limitations, temporary server downtime, or system updates.",
      screen: "Troubleshooting" 
    },
    {
      id: 4,
      title: "Community Guidelines",
      description: "Users are encouraged to maintain appropriate conduct within the platform. Behaviors considered disruptive may result in limitations.",
      screen: "TermsOfServices"
    },
    {
      id: 5,
      title: "Contact Support",
      description: "Users may reach out for assistance through available channels. Response timelines may vary based on operational capacity.",
      screen: "ReportProblemScreen"
    }
  ];

  // FAQ data with navigation links
  const faqData = [
    {
      id: 1,
      question: "Need more FAQs?",
      answer: "Visit our comprehensive FAQ section for answers to more common questions.",
      screen: "FAQs" 
    }
  ];

  // Filter topics and FAQs based on search
  const filterItems = () => {
    if (!searchQuery.trim()) {
      return {
        topics: helpTopics,
        faqs: faqData
      };
    }
    
    const query = searchQuery.toLowerCase();
    
    const filteredTopics = helpTopics.filter(topic => 
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query)
    );
    
    const filteredFAQs = faqData.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
    
    return {
      topics: filteredTopics,
      faqs: filteredFAQs
    };
  };

  const { topics, faqs } = filterItems();
  const hasSearchResults = topics.length > 0 || faqs.length > 0;

  const handleTopicPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const handleFAQPress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: '#121212' }]}>
      <StatusBar barStyle="light-content" />

      {/* Header Section */}
      <View style={[
        styles.header, 
        { 
          paddingTop: Platform.OS === 'ios' ? insets.top : Math.max(StatusBar.currentHeight || 0, 10),
          paddingHorizontal: isMobile ? 15 : 25,
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#2A2A2A',
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: 18 }]}>Help Center</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingBottom: insets.bottom + 100,
            paddingHorizontal: isMobile ? 15 : 25,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={[
          styles.searchBar,
          { 
            height: 50,
            borderRadius: 12,
            paddingHorizontal: 15,
            marginVertical: 15
          }
        ]}>
          <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { fontSize: 16 }]}
            placeholder="Search for help topics or FAQs..."
            placeholderTextColor="#8E8E93"
            selectionColor="#FFFFFF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>

        {searchQuery.trim() !== '' && !hasSearchResults ? (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={50} color="rgba(255,255,255,0.2)" />
            <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
          </View>
        ) : (
          <>
            {/* Help Topics Section */}
            {(searchQuery.trim() === '' || topics.length > 0) && (
              <>
                <Text style={[styles.sectionHeading, { fontSize: 22 }]}>
                  {searchQuery.trim() === '' ? 'Help Topics' : 'Matching Topics'}
                </Text>

                <Text style={[
                  styles.introText,
                  { 
                    fontSize: 15,
                    lineHeight: 22,
                    marginBottom: 25,
                  }
                ]}>
                  Welcome to the ITVE Help Center. This section provides generalized guidance on how
                  different parts of the ITVE system may operate. These descriptions are informational
                  only and do not create any commitments or assurances.
                </Text>

                <View style={styles.topicsList}>
                  {topics.map((topic) => (
                    <HelpTopic
                      key={topic.id}
                      title={topic.title}
                      description={topic.description}
                      onPress={() => handleTopicPress(topic.screen)}
                    />
                  ))}
                </View>
              </>
            )}

            {/* FAQ Section */}
            {(searchQuery.trim() === '' || faqs.length > 0) && (
              <>
                <Text style={[styles.sectionHeading, { 
                  fontSize: 22,
                  marginTop: topics.length > 0 ? 25 : 10
                }]}>
                  {searchQuery.trim() === '' ? 'Frequently Asked Questions' : 'Matching FAQs'}
                </Text>

                <View style={styles.faqList}>
                  {faqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      onPress={() => handleFAQPress(faq.screen)}
                    />
                  ))}
                </View>
              </>
            )}
          </>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>

      {/* Sticky Footer Button */}
      <View style={[
        styles.footer, 
        { 
          paddingBottom: Math.max(insets.bottom, 20),
          paddingHorizontal: isMobile ? 15 : 25
        }
      ]}>
        <TouchableOpacity
          style={[
            styles.supportButton,
            { 
              height: 55,
              borderRadius: 12
            }
          ]}
          onPress={() => navigation.navigate('ReportProblemScreen')}
        >
          <Text style={[styles.supportButtonText, { fontSize: 16 }]}>Chat with Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HelpCenterScreen() {
  return (
    <SafeAreaProvider>
      <HelpCenterContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1,
    backgroundColor: '#121212'
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  backButton: { 
    padding: 10 
  },
  headerTitle: { 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },
  container: { 
    flex: 1 
  },
  scrollContent: { 
    paddingTop: 15 
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#2C2C2E'
  },
  searchIcon: { 
    marginRight: 10 
  },
  searchInput: { 
    flex: 1, 
    color: '#FFFFFF' 
  },
  sectionHeading: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  introText: { 
    color: '#FFFFFF', 
    opacity: 0.8 
  },
  topicsList: { 
    marginBottom: 20 
  },
  topicContainer: { 
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  topicHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  topicTitle: { 
    color: '#FFFFFF', 
    fontSize: 17, 
    fontWeight: '700' 
  },
  topicDescription: { 
    color: '#A0A0A0', 
    fontSize: 14, 
    lineHeight: 20 
  },
  faqList: {
    marginTop: 10,
    marginBottom: 20
  },
  faqItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  faqQuestion: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10
  },
  faqAnswer: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20
  },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    paddingTop: 15, 
    backgroundColor: '#121212', 
    borderTopWidth: 0.5, 
    borderTopColor: '#2C2C2E' 
  },
  supportButton: { 
    backgroundColor: '#3A3A3C', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  supportButtonText: { 
    color: '#FFFFFF', 
    fontWeight: '700' 
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50
  },
  noResultsText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    marginTop: 15
  }
});
