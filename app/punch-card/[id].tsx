import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, Clock, Phone, Star } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Mock data for demonstration - expanded to match all cards
const mockBusinessDetails = {
  '1': {
    name: 'Mr. Boba',
    category: 'Bubble Tea',
    address: '123 Main St, San Francisco, CA',
    phone: '(555) 123-4567',
    hours: 'Mon-Sun: 10AM - 10PM',
    rating: 4.8,
    description: 'Premium bubble tea with fresh ingredients and authentic Taiwanese flavors.',
    backgroundColor: ['#2D5016', '#4A7C23'],
    pattern: '🧋',
    punches: 7,
    maxPunches: 10,
  },
  '2': {
    name: 'Hungry Ghost Donuts',
    category: 'Bakery',
    address: '456 Oak Ave, San Francisco, CA',
    phone: '(555) 234-5678',
    hours: 'Mon-Sun: 6AM - 8PM',
    rating: 4.6,
    description: 'Artisanal donuts made fresh daily with unique flavors and premium ingredients.',
    backgroundColor: ['#4A90E2', '#357ABD'],
    punches: 3,
    maxPunches: 8,
  },
  '3': {
    name: 'Temple Coffee',
    category: 'Coffee Shop',
    address: '789 Pine St, San Francisco, CA',
    phone: '(555) 345-6789',
    hours: 'Mon-Fri: 6AM - 6PM, Sat-Sun: 7AM - 5PM',
    rating: 4.7,
    description: 'Specialty coffee roasters with ethically sourced beans and expert brewing.',
    backgroundColor: ['#2C2C2E', '#1C1C1E'],
    punches: 5,
    maxPunches: 12,
  },
  '4': {
    name: 'Chispitas',
    category: 'Mexican Food',
    address: '321 Mission St, San Francisco, CA',
    phone: '(555) 456-7890',
    hours: 'Mon-Sun: 11AM - 9PM',
    rating: 4.5,
    description: 'Authentic Mexican street food with bold flavors and fresh ingredients.',
    backgroundColor: ['#FF6B6B', '#E55656'],
    punches: 2,
    maxPunches: 6,
  },
  '5': {
    name: 'Sweetgreen',
    category: 'Healthy Food',
    address: '654 Market St, San Francisco, CA',
    phone: '(555) 567-8901',
    hours: 'Mon-Sun: 10:30AM - 9PM',
    rating: 4.4,
    description: 'Farm-to-table salads and bowls made with locally sourced ingredients.',
    backgroundColor: ['#6AB04C', '#4CAF50'],
    punches: 8,
    maxPunches: 10,
  },
  '6': {
    name: 'Yoloberry',
    category: 'Frozen Yogurt',
    address: '987 Valencia St, San Francisco, CA',
    phone: '(555) 678-9012',
    hours: 'Mon-Sun: 11AM - 10PM',
    rating: 4.3,
    description: 'Self-serve frozen yogurt with endless toppings and fresh fruit options.',
    backgroundColor: ['#F39C12', '#E67E22'],
    punches: 4,
    maxPunches: 8,
  },
  '7': {
    name: 'Jamba',
    category: 'Smoothies',
    address: '147 Castro St, San Francisco, CA',
    phone: '(555) 789-0123',
    hours: 'Mon-Sun: 7AM - 9PM',
    rating: 4.2,
    description: 'Fresh fruit smoothies and healthy snacks to fuel your day.',
    backgroundColor: ['#16A085', '#138D75'],
    punches: 1,
    maxPunches: 5,
  },
  '8': {
    name: "Dunkin' Donuts",
    category: 'Coffee & Donuts',
    address: '258 Geary St, San Francisco, CA',
    phone: '(555) 890-1234',
    hours: 'Mon-Sun: 5AM - 10PM',
    rating: 4.1,
    description: 'America runs on Dunkin with fresh coffee and delicious donuts all day.',
    backgroundColor: ['#FF8C00', '#FF7518'],
    punches: 6,
    maxPunches: 9,
  },
  '9': {
    name: 'Starbucks',
    category: 'Coffee Shop',
    address: '369 Union Square, San Francisco, CA',
    phone: '(555) 901-2345',
    hours: 'Mon-Sun: 5:30AM - 10PM',
    rating: 4.0,
    description: 'Your favorite coffee drinks, pastries, and light bites in a welcoming atmosphere.',
    backgroundColor: ['#00704A', '#228B22'],
    punches: 9,
    maxPunches: 12,
  },
  '10': {
    name: 'Peet\'s Coffee',
    category: 'Coffee Shop',
    address: '741 Fillmore St, San Francisco, CA',
    phone: '(555) 012-3456',
    hours: 'Mon-Sun: 5:30AM - 8PM',
    rating: 4.6,
    description: 'Hand-roasted coffee with deep, rich flavors and artisanal brewing methods.',
    backgroundColor: ['#8B4513', '#A0522D'],
    punches: 4,
    maxPunches: 7,
  },
  '11': {
    name: 'Blue Bottle Coffee',
    category: 'Coffee Shop',
    address: '852 Divisadero St, San Francisco, CA',
    phone: '(555) 123-4567',
    hours: 'Mon-Sun: 6AM - 7PM',
    rating: 4.8,
    description: 'Artisanal coffee roasters committed to freshness and quality in every cup.',
    backgroundColor: ['#4169E1', '#1E90FF'],
    punches: 2,
    maxPunches: 8,
  },
  '12': {
    name: 'Philz Coffee',
    category: 'Coffee Shop',
    address: '963 Folsom St, San Francisco, CA',
    phone: '(555) 234-5678',
    hours: 'Mon-Sun: 6AM - 8PM',
    rating: 4.7,
    description: 'Custom-blended coffee experience with unique flavor profiles and personal service.',
    backgroundColor: ['#DC143C', '#B22222'],
    punches: 7,
    maxPunches: 10,
  },
  '13': {
    name: 'Pressed Juicery',
    category: 'Juice Bar',
    address: '159 Hayes St, San Francisco, CA',
    phone: '(555) 345-6789',
    hours: 'Mon-Sun: 7AM - 8PM',
    rating: 4.4,
    description: 'Cold-pressed juices and wellness shots made from organic produce.',
    backgroundColor: ['#6AB04C', '#4CAF50'],
    punches: 5,
    maxPunches: 8,
  },
  '14': {
    name: 'The Halal Guys',
    category: 'Mediterranean',
    address: '357 Powell St, San Francisco, CA',
    phone: '(555) 456-7890',
    hours: 'Mon-Sun: 11AM - 11PM',
    rating: 4.3,
    description: 'Authentic Mediterranean street food with bold flavors and generous portions.',
    backgroundColor: ['#F39C12', '#E67E22'],
    punches: 3,
    maxPunches: 7,
  },
  '15': {
    name: 'Chipotle',
    category: 'Mexican Food',
    address: '468 3rd St, San Francisco, CA',
    phone: '(555) 567-8901',
    hours: 'Mon-Sun: 10:45AM - 10PM',
    rating: 4.2,
    description: 'Fresh, customizable Mexican food made with responsibly sourced ingredients.',
    backgroundColor: ['#8B4513', '#A0522D'],
    punches: 8,
    maxPunches: 12,
  },
};

export default function PunchCardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const business = mockBusinessDetails[id as keyof typeof mockBusinessDetails];

  if (!business) {
    return (
      <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft color="#2D1B69" size={24} strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Card Details</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Business not found</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const progressPercentage = (business.punches / business.maxPunches) * 100;

  return (
    <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#2D1B69" size={24} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Card Details</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Punch Card Display */}
          <View style={styles.cardSection}>
            <LinearGradient colors={business.backgroundColor} style={styles.detailCard}>
              {business.pattern && (
                <View style={styles.patternContainer}>
                  <Text style={styles.patternText}>{business.pattern}</Text>
                </View>
              )}
              
              <View style={styles.cardContent}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Text style={styles.businessCategory}>{business.category}</Text>
                
                <View style={styles.progressSection}>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${progressPercentage}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {business.punches}/{business.maxPunches}
                    </Text>
                  </View>
                  
                  <Text style={styles.progressLabel}>
                    {business.maxPunches - business.punches} more {business.maxPunches - business.punches === 1 ? 'visit' : 'visits'} to reward
                  </Text>
                </View>
                
                <View style={styles.punchesContainer}>
                  {Array.from({ length: business.maxPunches }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.punchCircle,
                        {
                          backgroundColor: index < business.punches ? '#FFFFFF' : 'transparent',
                          borderColor: '#FFFFFF',
                          opacity: index < business.punches ? 1 : 0.4,
                        },
                      ]}
                    >
                      {index < business.punches && (
                        <View style={[styles.punchDot, { backgroundColor: business.backgroundColor[0] }]} />
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Business Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Business Information</Text>
            
            <View style={styles.infoCard}>
              <Text style={styles.description}>{business.description}</Text>
              
              <View style={styles.infoItem}>
                <MapPin color="#6B7280" size={20} strokeWidth={2} />
                <Text style={styles.infoText}>{business.address}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Phone color="#6B7280" size={20} strokeWidth={2} />
                <Text style={styles.infoText}>{business.phone}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Clock color="#6B7280" size={20} strokeWidth={2} />
                <Text style={styles.infoText}>{business.hours}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Star color="#FFD700" size={20} strokeWidth={2} fill="#FFD700" />
                <Text style={styles.infoText}>{business.rating} rating</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Visit Store</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Share Card</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#2D1B69',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  cardSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  detailCard: {
    borderRadius: 20,
    padding: 24,
    minHeight: 200,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternText: {
    fontSize: 80,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
    zIndex: 1,
  },
  businessName: {
    fontSize: 28,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginRight: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#FFFFFF',
    minWidth: 40,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  punchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  punchCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  punchDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  infoSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#2D1B69',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  actionSection: {
    paddingHorizontal: 24,
    paddingBottom: 120, // Space for tab bar
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2D1B69',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#2D1B69',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D1B69',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#2D1B69',
  },
});