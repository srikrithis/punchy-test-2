import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Search, MapPin, Star, Plus, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Business {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  description: string;
  backgroundColor: string[];
  hasCard: boolean;
  image: string;
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Blue Bottle Coffee',
    category: 'Coffee Shop',
    distance: '0.3 miles',
    rating: 4.8,
    description: 'Artisanal coffee roasters with specialty drinks and fresh pastries',
    backgroundColor: ['#4A90E2', '#357ABD'],
    hasCard: false,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
  },
  {
    id: '2',
    name: 'Philz Coffee',
    category: 'Coffee Shop',
    distance: '0.5 miles',
    rating: 4.6,
    description: 'Custom-blended coffee experience with unique flavor profiles',
    backgroundColor: ['#8B4513', '#A0522D'],
    hasCard: false,
    image: 'https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
  },
  {
    id: '3',
    name: 'Ikes Love & Sandwiches',
    category: 'Sandwich Shop',
    distance: '0.7 miles',
    rating: 4.7,
    description: 'Gourmet sandwiches with creative combinations and fresh ingredients',
    backgroundColor: ['#FF6B6B', '#E55656'],
    hasCard: false,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
  },
  {
    id: '4',
    name: 'Pressed Juicery',
    category: 'Juice Bar',
    distance: '0.8 miles',
    rating: 4.5,
    description: 'Cold-pressed juices and wellness shots made from organic produce',
    backgroundColor: ['#6AB04C', '#4CAF50'],
    hasCard: false,
    image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
  },
  {
    id: '5',
    name: 'The Halal Guys',
    category: 'Mediterranean',
    distance: '1.2 miles',
    rating: 4.4,
    description: 'Authentic Mediterranean street food with bold flavors',
    backgroundColor: ['#F39C12', '#E67E22'],
    hasCard: false,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState(mockBusinesses);

  const handleAddCard = (businessId: string) => {
    setBusinesses(prev =>
      prev.map(business =>
        business.id === businessId
          ? { ...business, hasCard: true }
          : business
      )
    );
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>Find new places to earn rewards</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#6B7280" size={20} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search businesses"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionTitle}>Nearby Businesses</Text>
          
          {filteredBusinesses.map((business) => (
            <TouchableOpacity key={business.id} style={styles.businessCard} activeOpacity={0.95}>
              <View style={styles.businessImageContainer}>
                <Image source={{ uri: business.image }} style={styles.businessImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.imageOverlay}
                />
                <View style={styles.businessHeader}>
                  <View style={styles.businessInfo}>
                    <Text style={styles.businessName}>{business.name}</Text>
                    <Text style={styles.businessCategory}>{business.category}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      business.hasCard && styles.addButtonAdded
                    ]}
                    onPress={() => handleAddCard(business.id)}
                    disabled={business.hasCard}
                  >
                    {business.hasCard ? (
                      <Check color="#FFFFFF" size={20} strokeWidth={2} />
                    ) : (
                      <Plus color="#FFFFFF" size={20} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.businessDetails}>
                <Text style={styles.businessDescription}>{business.description}</Text>
                
                <View style={styles.businessMeta}>
                  <View style={styles.ratingContainer}>
                    <Star color="#FFD700" size={16} strokeWidth={2} fill="#FFD700" />
                    <Text style={styles.rating}>{business.rating}</Text>
                  </View>
                  
                  <View style={styles.distanceContainer}>
                    <MapPin color="#6B7280" size={16} strokeWidth={2} />
                    <Text style={styles.distance}>{business.distance}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 42,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#2D1B69',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#2D1B69',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  businessCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  businessImageContainer: {
    position: 'relative',
    height: 180,
  },
  businessImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  businessHeader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 20,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  addButton: {
    backgroundColor: 'rgba(45, 27, 105, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonAdded: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
  },
  businessDetails: {
    padding: 20,
  },
  businessDescription: {
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 22,
  },
  businessMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 6,
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    color: '#1F2937',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 6,
    fontSize: 15,
    fontFamily: 'DMSans-Medium',
    color: '#6B7280',
  },
});