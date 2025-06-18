import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, Pressable, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import PunchCard from '@/components/PunchCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mockCards = [
  {
    id: '1',
    businessName: 'Mr. Boba',
    punches: 7,
    maxPunches: 10,
    backgroundColor: ['#2D5016', '#4A7C23'],
    pattern: '🧋',
  },
  {
    id: '2',
    businessName: 'Hungry Ghost Donuts',
    punches: 3,
    maxPunches: 8,
    backgroundColor: ['#4A90E2', '#357ABD'],
  },
  {
    id: '3',
    businessName: 'Temple Coffee',
    punches: 5,
    maxPunches: 12,
    backgroundColor: ['#2C2C2E', '#1C1C1E'],
  },
  {
    id: '4',
    businessName: 'Chispitas',
    punches: 2,
    maxPunches: 6,
    backgroundColor: ['#FF6B6B', '#E55656'],
  },
  {
    id: '5',
    businessName: 'Sweetgreen',
    punches: 8,
    maxPunches: 10,
    backgroundColor: ['#6AB04C', '#4CAF50'],
  },
  {
    id: '6',
    businessName: 'Yoloberry',
    punches: 4,
    maxPunches: 8,
    backgroundColor: ['#F39C12', '#E67E22'],
  },
  {
    id: '7',
    businessName: 'Jamba',
    punches: 1,
    maxPunches: 5,
    backgroundColor: ['#16A085', '#138D75'],
  },
  {
    id: '8',
    businessName: "Dunkin' Donuts",
    punches: 6,
    maxPunches: 9,
    backgroundColor: ['#FF8C00', '#FF7518'],
  },
  {
    id: '9',
    businessName: 'Starbucks',
    punches: 9,
    maxPunches: 12,
    backgroundColor: ['#00704A', '#228B22'],
  },
  {
    id: '10',
    businessName: 'Peet\'s Coffee',
    punches: 4,
    maxPunches: 7,
    backgroundColor: ['#8B4513', '#A0522D'],
  },
  {
    id: '11',
    businessName: 'Blue Bottle Coffee',
    punches: 2,
    maxPunches: 8,
    backgroundColor: ['#4169E1', '#1E90FF'],
  },
  {
    id: '12',
    businessName: 'Philz Coffee',
    punches: 7,
    maxPunches: 10,
    backgroundColor: ['#DC143C', '#B22222'],
  },
  {
    id: '13',
    businessName: 'Pressed Juicery',
    punches: 5,
    maxPunches: 8,
    backgroundColor: ['#6AB04C', '#4CAF50'],
  },
  {
    id: '14',
    businessName: 'The Halal Guys',
    punches: 3,
    maxPunches: 7,
    backgroundColor: ['#F39C12', '#E67E22'],
  },
  {
    id: '15',
    businessName: 'Chipotle',
    punches: 8,
    maxPunches: 12,
    backgroundColor: ['#8B4513', '#A0522D'],
  },
];

const CARD_HEIGHT = 226;
const CARD_WIDTH = screenWidth - 32; // 16px margin on each side
const HEADER_HEIGHT = 120; // Approximate header height
const TAB_BAR_HEIGHT = 100; // Approximate tab bar height
const SEARCH_BAR_HEIGHT = 80; // Height of search bar container

// Helper function to generate random vertical offset between 60-66px
const getRandomOffset = (index: number) => {
  const seed = index * 1234567;
  const random = (seed % 5) / 4; // Normalize to 0-1
  return 60 + (random * 6); // 60-66px range
};

// Helper function to generate rotation between -2 to 2 degrees
const getRandomRotation = (index: number) => {
  const seed = index * 987654321;
  const random = ((seed % 100) / 100) * 2 - 1; // -1 to 1
  return random * 2; // -2 to 2 degrees
};

// Helper function to generate horizontal offset between -8 to 8px
const getRandomHorizontalOffset = (index: number) => {
  const seed = index * 456789123;
  const random = ((seed % 100) / 100) * 2 - 1; // -1 to 1
  return random * 8; // -8 to 8px
};

interface AnimatedCardProps {
  card: typeof mockCards[0];
  index: number;
  totalCards: number;
  expandedCardIndex: number | null;
  initialStackPosition: number;
  initialRotation: number;
  initialHorizontalOffset: number;
  onPress: () => void;
  onSecondPress: () => void;
}

function AnimatedCard({ 
  card, 
  index, 
  totalCards, 
  expandedCardIndex, 
  initialStackPosition,
  initialRotation,
  initialHorizontalOffset,
  onPress, 
  onSecondPress 
}: AnimatedCardProps) {
  const translateYDelta = useSharedValue(0);
  const translateX = useSharedValue(initialHorizontalOffset);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(initialRotation);
  const zIndex = useSharedValue(totalCards - index + 100); // Ensure cards are above search bar
  
  const isExpanded = expandedCardIndex === index;
  const isAfterExpanded = expandedCardIndex !== null && index > expandedCardIndex;
  
  useEffect(() => {
    if (isExpanded) {
      // Expanded card: center horizontally, keep rotation, bring to front
      translateYDelta.value = withSpring(0, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(0, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1.05, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(initialRotation, { damping: 30, stiffness: 90 });
      zIndex.value = withTiming(1000, { duration: 50 });
    } else if (isAfterExpanded && expandedCardIndex !== null) {
      // Cards after expanded: push down by card height
      translateYDelta.value = withSpring(CARD_HEIGHT, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(initialHorizontalOffset, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(initialRotation, { damping: 30, stiffness: 90 });
      zIndex.value = withTiming(totalCards - index + 100, { duration: 50 });
    } else {
      // Normal stack position
      translateYDelta.value = withSpring(0, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(initialHorizontalOffset, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(initialRotation, { damping: 30, stiffness: 90 });
      zIndex.value = withTiming(totalCards - index + 100, { duration: 50 });
    }
  }, [isExpanded, isAfterExpanded, expandedCardIndex, initialHorizontalOffset, initialRotation, totalCards, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateYDelta.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    zIndex: zIndex.value,
  }));

  const handlePress = () => {
    if (isExpanded) {
      onSecondPress();
    } else {
      onPress();
    }
  };

  return (
    <Animated.View 
      style={[
        styles.cardContainer,
        {
          top: initialStackPosition,
        },
        animatedStyle,
      ]}
    >
      <Pressable onPress={handlePress} style={styles.cardPressable}>
        <PunchCard
          key={card.id}
          id={card.id}
          businessName={card.businessName}
          punches={card.punches}
          maxPunches={card.maxPunches}
          backgroundColor={card.backgroundColor}
          pattern={card.pattern}
          onPress={() => {}} // Handled by parent Pressable
        />
      </Pressable>
    </Animated.View>
  );
}

export default function WalletScreen() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Scroll animation values
  const scrollY = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const searchBarTranslateY = useSharedValue(-SEARCH_BAR_HEIGHT);

  // Filter cards based on search query
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockCards;
    }
    return mockCards.filter(card =>
      card.businessName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pre-calculate all card positions and properties for filtered cards
  const cardPositions = useMemo(() => {
    return filteredCards.map((_, index) => {
      let cumulativeOffset = 0;
      for (let i = 0; i < index; i++) {
        cumulativeOffset += getRandomOffset(i);
      }
      return {
        initialStackPosition: cumulativeOffset,
        initialRotation: getRandomRotation(index),
        initialHorizontalOffset: getRandomHorizontalOffset(index),
      };
    });
  }, [filteredCards]);

  const expandedCardIndex = useMemo(() => {
    if (!expandedCardId) return null;
    return filteredCards.findIndex(card => card.id === expandedCardId);
  }, [expandedCardId, filteredCards]);

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - lastScrollY.value;
      
      scrollY.value = currentScrollY;
      
      // Show search bar when scrolling up, hide when scrolling down
      if (diff < -10 && currentScrollY > 50) {
        // Scrolling up - show search bar
        searchBarTranslateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      } else if (diff > 10) {
        // Scrolling down - hide search bar
        searchBarTranslateY.value = withSpring(-SEARCH_BAR_HEIGHT, { damping: 20, stiffness: 90 });
      }
      
      lastScrollY.value = currentScrollY;
    },
  });

  // Animated style for search bar
  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: searchBarTranslateY.value }],
  }));

  // Handle scroll to center expanded card
  useEffect(() => {
    if (expandedCardIndex !== null && scrollViewRef.current) {
      const expandedCardPosition = cardPositions[expandedCardIndex].initialStackPosition;
      const visibleHeight = screenHeight - HEADER_HEIGHT - TAB_BAR_HEIGHT;
      const targetScrollY = Math.max(0, expandedCardPosition - (visibleHeight / 2) + (CARD_HEIGHT / 2));
      
      scrollViewRef.current.scrollTo({ 
        y: targetScrollY, 
        animated: true 
      });
    } else if (expandedCardIndex === null && scrollViewRef.current) {
      // Return to top when no card is expanded
      scrollViewRef.current.scrollTo({ 
        y: 0, 
        animated: true 
      });
    }
  }, [expandedCardIndex, cardPositions]);

  const handleCardPress = (cardId: string) => {
    setExpandedCardId(cardId);
  };

  const handleCardSecondPress = (cardId: string) => {
    // Navigate to punch card detail
    router.push(`/punch-card/${cardId}`);
  };

  const handleOutsidePress = () => {
    if (expandedCardId) {
      setExpandedCardId(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setExpandedCardId(null);
  };

  // Calculate total height needed for all cards (including expansion space)
  const totalStackHeight = useMemo(() => {
    let totalHeight = CARD_HEIGHT;
    for (let i = 0; i < filteredCards.length; i++) {
      totalHeight += getRandomOffset(i);
    }
    // Add extra space for card expansion
    if (expandedCardIndex !== null) {
      totalHeight += CARD_HEIGHT;
    }
    return totalHeight + 200; // Extra padding
  }, [expandedCardIndex, filteredCards.length]);

  return (
    <LinearGradient colors={['#f1eee6', '#faefea']} locations={[0.7, 1]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Wallet</Text>
            <Text style={styles.subtitle}>Your loyalty cards</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Floating Search Bar - Behind Cards */}
        <Animated.View style={[styles.floatingSearchContainer, searchBarAnimatedStyle]}>
          <View style={styles.searchBar}>
            <Search color="#6B7280" size={20} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your cards..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={clearSearch} style={styles.clearButton}>
                <X color="#6B7280" size={20} strokeWidth={2} />
              </Pressable>
            )}
          </View>
        </Animated.View>
        
        <Animated.ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {filteredCards.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No cards found</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery.trim() 
                  ? `No cards match "${searchQuery}"`
                  : "You don't have any loyalty cards yet"
                }
              </Text>
            </View>
          ) : (
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
              <View style={[styles.stackContainer, { height: totalStackHeight }]}>
                {filteredCards.map((card, index) => (
                  <AnimatedCard
                    key={card.id}
                    card={card}
                    index={index}
                    totalCards={filteredCards.length}
                    expandedCardIndex={expandedCardIndex}
                    initialStackPosition={cardPositions[index].initialStackPosition}
                    initialRotation={cardPositions[index].initialRotation}
                    initialHorizontalOffset={cardPositions[index].initialHorizontalOffset}
                    onPress={() => handleCardPress(card.id)}
                    onSecondPress={() => handleCardSecondPress(card.id)}
                  />
                ))}
              </View>
            </TouchableWithoutFeedback>
          )}
        </Animated.ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
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
  profileContainer: {
    marginLeft: 16,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  floatingSearchContainer: {
    position: 'absolute',
    top: HEADER_HEIGHT + 40, // Position below header
    left: 0,
    right: 0,
    zIndex: 50, // Lower z-index so cards appear above it
    paddingHorizontal: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08, // Reduced shadow for subtlety
    shadowRadius: 8,
    elevation: 4,
    backdropFilter: 'blur(10px)', // Add blur effect
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for tab bar
  },
  stackContainer: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 0,
    marginHorizontal: 16, // 16px margin on both sides
  },
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardPressable: {
    width: '100%',
    height: '100%',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontFamily: 'DelaGothicOne-Regular',
    color: '#2D1B69',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});