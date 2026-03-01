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
import { useNavigation } from '@react-navigation/native';

const FAQItem = ({ question, answer, isExpanded, onPress }) => (
  <TouchableOpacity 
    activeOpacity={0.7} 
    style={styles.faqItem}
    onPress={onPress}
  >
    <View style={styles.faqHeader}>
      <Text style={styles.faqQuestion}>{question}</Text>
      <Ionicons 
        name={isExpanded ? "chevron-up" : "chevron-down"} 
        size={20} 
        color="#FFFFFF" 
      />
    </View>
    {isExpanded && (
      <View style={styles.faqAnswerContainer}>
        <Text style={styles.faqAnswer}>{answer}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const FAQs = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});

  // Responsive calculations
  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  const faqCategories = [
    {
      id: 'account',
      title: 'Account',
      icon: 'person-outline',
      faqs: [
        {
          id: 'acc1',
          question: 'How do I create an account?',
          answer: 'Go to the Sign Up page from the login screen. Enter your email, create a password, and follow the verification steps to complete your account setup.'
        },
        {
          id: 'acc2',
          question: 'How do I reset my password?',
          answer: 'On the login screen, tap "Forgot Password". Enter your email address and follow the instructions sent to your inbox to reset your password.'
        },
        {
          id: 'acc3',
          question: 'Can I change my email address?',
          answer: 'Yes, go to Settings → Account → Email & Phone. You can update your email address after verifying the new email.'
        },
        {
          id: 'acc4',
          question: 'How do I delete my account?',
          answer: 'Navigate to Settings → Account → Deactivate/Delete Account. Follow the prompts to permanently delete your account. This action cannot be undone.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Issues',
      icon: 'construct-outline',
      faqs: [
        {
          id: 'tech1',
          question: 'The app keeps crashing, what should I do?',
          answer: 'Try these steps: 1) Close and restart the app, 2) Update to the latest version, 3) Clear app cache, 4) Reinstall the app if issues persist.'
        },
        {
          id: 'tech2',
          question: 'Why is the app loading slowly?',
          answer: 'Slow loading can be due to: poor internet connection, server maintenance, or device performance issues. Check your connection and try again.'
        },
        {
          id: 'tech3',
          question: 'I cannot upload files/images, what is wrong?',
          answer: 'Check: 1) File size (max 10MB), 2) File format (JPG, PNG, PDF), 3) Internet connection, 4) App permissions for storage access.'
        },
        {
          id: 'tech4',
          question: 'Notifications are not working, how to fix?',
          answer: 'Go to Settings → Notifications and ensure notifications are enabled. Also check your device notification settings for the app.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'shield-checkmark-outline',
      faqs: [
        {
          id: 'priv1',
          question: 'How is my data protected?',
          answer: 'We use industry-standard encryption and security measures to protect your data. Your information is stored securely and never shared with third parties without consent.'
        },
        {
          id: 'priv2',
          question: 'Can I control what information is visible?',
          answer: 'Yes, go to Settings → Privacy to control your profile visibility and what information other users can see.'
        },
        {
          id: 'priv3',
          question: 'How do I report inappropriate content?',
          answer: 'Tap the three dots on any content and select "Report". Our moderation team will review the report within 24 hours.'
        },
        {
          id: 'priv4',
          question: 'Is my payment information safe?',
          answer: 'Yes, we use secure payment gateways and never store your complete payment details on our servers.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Usage',
      icon: 'apps-outline',
      faqs: [
        {
          id: 'feat1',
          question: 'How do I customize my profile?',
          answer: 'Go to Profile → Edit Profile. You can update your profile picture, bio, and personal information from there.'
        },
        {
          id: 'feat2',
          question: 'Can I use the app on multiple devices?',
          answer: 'Yes, you can log in from multiple devices. For security, we recommend logging out from public or shared devices.'
        },
        {
          id: 'feat3',
          question: 'How do I change notification settings?',
          answer: 'Navigate to Settings → Notifications to customize which notifications you receive and how they are delivered.'
        },
        {
          id: 'feat4',
          question: 'Is there a desktop version?',
          answer: 'Yes, you can access the platform through our website. Your account syncs across all devices.'
        }
      ]
    }
  ];

  const handleFAQPress = (categoryId, faqId) => {
    const key = `${categoryId}-${faqId}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = searchQuery.trim() === '' 
    ? faqCategories 
    : faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={[
        styles.header,
        {
          paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
          paddingHorizontal: isMobile ? 20 : isDesktop ? 40 : 30,
        }
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: isMobile ? 20 : isDesktop ? 40 : 30,
            paddingBottom: 100,
            maxWidth: isDesktop ? 800 : '100%',
            alignSelf: 'center',
            width: '100%',
          }
        ]}
        showsVerticalScrollIndicator={!isMobile}
      >
        {/* Search Bar */}
        <View style={[
          styles.searchBar,
          { marginTop: isMobile ? 15 : 20 }
        ]}>
          <Ionicons name="search-outline" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
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

        {searchQuery.trim() !== '' && filteredCategories.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={50} color="rgba(255,255,255,0.2)" />
            <Text style={styles.noResultsText}>No FAQs found for "{searchQuery}"</Text>
            <TouchableOpacity 
              style={styles.clearSearchButton}
              onPress={() => setSearchQuery('')}
            >
              <Text style={styles.clearSearchText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[
              styles.mainTitle,
              { fontSize: isMobile ? 22 : 24 }
            ]}>
              Frequently Asked Questions
            </Text>

            <Text style={[
              styles.introText,
              { 
                fontSize: isMobile ? 14 : 15,
                lineHeight: isMobile ? 20 : 22,
                marginBottom: 30
              }
            ]}>
              Find answers to common questions about using the ITVE platform. 
              If you can't find what you're looking for, contact our support team.
            </Text>

            {filteredCategories.map((category) => (
              <View key={category.id} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryIconContainer}>
                    <Ionicons name={category.icon} size={22} color="#FFFFFF" />
                  </View>
                  <Text style={[
                    styles.categoryTitle,
                    { fontSize: isMobile ? 18 : 20 }
                  ]}>
                    {category.title}
                  </Text>
                </View>

                <View style={styles.categoryFAQs}>
                  {category.faqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      isExpanded={expandedItems[`${category.id}-${faq.id}`]}
                      onPress={() => handleFAQPress(category.id, faq.id)}
                    />
                  ))}
                </View>
              </View>
            ))}

            <View style={styles.supportCard}>
              <Ionicons name="help-circle-outline" size={40} color="#00CCFF" />
              <Text style={styles.supportTitle}>Still Need Help?</Text>
              <Text style={styles.supportText}>
                Can't find the answer you're looking for? Our support team is here to help.
              </Text>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => navigation.navigate('ReportProblemScreen')}
              >
                <Text style={styles.contactButtonText}>Contact Support</Text>
                <Ionicons name="chatbubble-outline" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  mainTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  introText: {
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 30,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  categoryFAQs: {
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  faqAnswerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  faqAnswer: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20,
  },
  supportCard: {
    backgroundColor: 'rgba(0, 204, 255, 0.1)',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 255, 0.2)',
    marginTop: 30,
  },
  supportTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  supportText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#00CCFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
  },
  clearSearchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  clearSearchText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default FAQs;
