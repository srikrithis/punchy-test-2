import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';
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
const SPACING_AROUND_EXPANDED = 14; // 14px space above and below expanded card

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
  expandedCardTargetY: number;
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
  expandedCardTargetY,
  onPress, 
  onSecondPress 
}: AnimatedCardProps) {
  const translateYDelta = useSharedValue(0);
  const translateX = useSharedValue(initialHorizontalOffset);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(initialRotation);
  const zIndex = useSharedValue(totalCards - index);
  
  const isExpanded = expandedCardIndex === index;
  const isBeforeExpanded = expandedCardIndex !== null && index < expandedCardIndex;
  const isAfterExpanded = expandedCardIndex !== null && index > expandedCardIndex;
  
  useEffect(() => {
    if (isExpanded) {
      // Expanded card: move to target position, center horizontally, bring to front
      const targetYDelta = expandedCardTargetY - initialStackPosition;
      translateYDelta.value = withSpring(targetYDelta, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(0, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1.05, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(0, { damping: 30, stiffness: 90 }); // Straighten the expanded card
      zIndex.value = withTiming(1000, { duration: 50 });
    } else if (isBeforeExpanded && expandedCardIndex !== null) {
      // Cards before expanded: shift up to create 14px space above expanded card
      const expandedCardTop = expandedCardTargetY;
      const lastCardBeforeExpandedBottom = expandedCardTop - SPACING_AROUND_EXPANDED;
      
      // Calculate how much this card needs to move up
      const currentCardBottom = initialStackPosition + CARD_HEIGHT;
      const targetYDelta = lastCardBeforeExpandedBottom - currentCardBottom;
      
      translateYDelta.value = withSpring(targetYDelta, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(initialHorizontalOffset, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(initialRotation, { damping: 30, stiffness: 90 });
      zIndex.value = withTiming(totalCards - index, { duration: 50 });
    } else if (isAfterExpanded && expandedCardIndex !== null) {
      // Cards after expanded: shift down to create 14px space below expanded card
      const expandedCardBottom = expandedCardTargetY + CARD_HEIGHT;
      const firstCardAfterExpandedTop = expandedCardBottom + SPACING_AROUND_EXPANDED;
      
      // Calculate how much this card needs to move down
      const targetYDelta = firstCardAfterExpandedTop - initialStackPosition;
      
      translateYDelta.value = withSpring(targetYDelta, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(initialHorizontalOffset, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(initialRotation, { damping: 30, stiffness: 90 });
      zIndex.value = withTiming(totalCards - index, { duration: 50 });
    } else {
      // Normal stack position
      translateYDelta.value = withSpring(0, { damping: 30, stiffness: 90 });
      translateX.value = withSpring(initialHorizontalOffset, { damping: 30, stiffness: 90 });
      scale.value = withSpring(1, { damping: 30, stiffness: 90 });
      rotate.value = withSpring(initialRotation, { damping: 30, stiffness: 90 });
      zIndex.value = withTiming(totalCards - index, { duration: 50 });
    }
  }, [isExpanded, isBeforeExpanded, isAfterExpanded, expandedCardIndex, expandedCardTargetY, initialStackPosition, initialHorizontalOffset, initialRotation, totalCards, index]);

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
  const scrollViewRef = useRef<ScrollView>(null);

  // Pre-calculate all card positions and properties
  const cardPositions = useMemo(() => {
    return mockCards.map((_, index) => {
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
  }, []);

  const expandedCardIndex = useMemo(() => {
    if (!expandedCardId) return null;
    return mockCards.findIndex(card => card.id === expandedCardId);
  }, [expandedCardId]);

  // Calculate the target Y position for the expanded card (centered in viewport)
  const expandedCardTargetY = useMemo(() => {
    const visibleHeight = screenHeight - HEADER_HEIGHT - TAB_BAR_HEIGHT;
    return (visibleHeight / 2) - (CARD_HEIGHT / 2);
  }, []);

  // Handle scroll to center expanded card
  useEffect(() => {
    if (expandedCardIndex !== null && scrollViewRef.current) {
      const targetScrollY = Math.max(0, expandedCardTargetY);
      
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
  }, [expandedCardIndex, expandedCardTargetY]);

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

  // Calculate total height needed for all cards (including expansion space)
  const totalStackHeight = useMemo(() => {
    let totalHeight = CARD_HEIGHT;
    for (let i = 0; i < mockCards.length; i++) {
      totalHeight += getRandomOffset(i);
    }
    // Add extra space for card expansion and spacing
    if (expandedCardIndex !== null) {
      totalHeight += (SPACING_AROUND_EXPANDED * 2) + CARD_HEIGHT;
    }
    return totalHeight + 300; // Extra padding for scrolling
  }, [expandedCardIndex]);

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
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={[styles.stackContainer, { height: totalStackHeight }]}>
              {mockCards.map((card, index) => (
                <AnimatedCard
                  key={card.id}
                  card={card}
                  index={index}
                  totalCards={mockCards.length}
                  expandedCardIndex={expandedCardIndex}
                  initialStackPosition={cardPositions[index].initialStackPosition}
                  initialRotation={cardPositions[index].initialRotation}
                  initialHorizontalOffset={cardPositions[index].initialHorizontalOffset}
                  expandedCardTargetY={expandedCardTargetY}
                  onPress={() => handleCardPress(card.id)}
                  onSecondPress={() => handleCardSecondPress(card.id)}
                />
              ))}
            </View>
          </TouchableWithoutFeedback>
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
});