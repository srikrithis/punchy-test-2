import React, { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS
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
const CARD_WIDTH = 360;
const TOP_THRESHOLD = 180; // Cards above this need to scroll down
const BOTTOM_THRESHOLD = 51; // Cards below this need to scroll up
const SCROLL_OFFSET = 20; // Extra padding when scrolling

// Helper function to generate random offset between 42-48px
const getRandomOffset = (index: number) => {
  // Use index as seed for consistent random values
  const seed = index * 1234567;
  const random = (seed % 7) / 6; // Normalize to 0-1
  return 42 + (random * 6); // 42-48px range
};

interface AnimatedCardProps {
  card: typeof mockCards[0];
  index: number;
  totalCards: number;
  selectedCardId: string | null;
  onPress: (cardId: string, cardRef: React.RefObject<View>) => void;
  onSecondPress: (cardId: string) => void;
}

function AnimatedCard({ card, index, totalCards, selectedCardId, onPress, onSecondPress }: AnimatedCardProps) {
  const cardRef = useRef<View>(null);
  const zIndex = useSharedValue(totalCards - index);
  
  // Calculate cumulative offset for this card's position in stack
  const stackPosition = React.useMemo(() => {
    let cumulativeOffset = 0;
    for (let i = 0; i < index; i++) {
      cumulativeOffset += getRandomOffset(i);
    }
    return cumulativeOffset;
  }, [index]);
  
  const isSelected = selectedCardId === card.id;
  
  React.useEffect(() => {
    if (isSelected) {
      zIndex.value = withSpring(1000, {
        damping: 30,
        stiffness: 90,
      });
    } else {
      zIndex.value = withSpring(totalCards - index, {
        damping: 30,
        stiffness: 90,
      });
    }
  }, [isSelected, totalCards, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
  }));

  const handlePress = () => {
    if (isSelected) {
      onSecondPress(card.id);
    } else {
      onPress(card.id, cardRef);
    }
  };

  return (
    <Animated.View 
      ref={cardRef}
      style={[
        styles.cardContainer,
        {
          top: stackPosition,
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
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const containerRef = useRef<View>(null);

  const measureCardPosition = useCallback((cardRef: React.RefObject<View>) => {
    return new Promise<{ top: number; bottom: number }>((resolve) => {
      if (cardRef.current && containerRef.current) {
        cardRef.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            resolve({
              top: y,
              bottom: y + height,
            });
          },
          () => {
            // Fallback if measure fails
            resolve({ top: 0, bottom: CARD_HEIGHT });
          }
        );
      } else {
        resolve({ top: 0, bottom: CARD_HEIGHT });
      }
    });
  }, []);

  const scrollToCard = useCallback(async (cardPosition: { top: number; bottom: number }) => {
    if (!scrollViewRef.current) return;

    const { top, bottom } = cardPosition;
    const availableHeight = screenHeight - 200; // Account for header and tab bar
    
    let scrollToY = 0;
    let shouldScroll = false;

    // Check if card's top is above threshold
    if (top < TOP_THRESHOLD) {
      scrollToY = Math.max(0, top - SCROLL_OFFSET);
      shouldScroll = true;
    }
    // Check if card's bottom is below threshold
    else if (bottom > availableHeight - BOTTOM_THRESHOLD) {
      scrollToY = bottom - (availableHeight - BOTTOM_THRESHOLD) + SCROLL_OFFSET;
      shouldScroll = true;
    }

    if (shouldScroll) {
      scrollViewRef.current.scrollTo({
        y: scrollToY,
        animated: true,
      });
    }
  }, []);

  const handleCardPress = useCallback(async (cardId: string, cardRef: React.RefObject<View>) => {
    setSelectedCardId(cardId);
    
    // Measure card position and scroll if needed
    const cardPosition = await measureCardPosition(cardRef);
    await scrollToCard(cardPosition);
  }, [measureCardPosition, scrollToCard]);

  const handleCardSecondPress = useCallback((cardId: string) => {
    // Navigate to punch card detail
    router.push(`/punch-card/${cardId}`);
  }, []);

  const handleOutsidePress = useCallback(() => {
    if (selectedCardId) {
      setSelectedCardId(null);
    }
  }, [selectedCardId]);

  // Calculate total height needed for all cards
  const totalStackHeight = React.useMemo(() => {
    let totalHeight = CARD_HEIGHT;
    for (let i = 0; i < mockCards.length; i++) {
      totalHeight += getRandomOffset(i);
    }
    return totalHeight + 200; // Extra padding
  }, []);

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
          scrollEventThrottle={16}
        >
          <Pressable onPress={handleOutsidePress}>
            <View 
              ref={containerRef}
              style={[styles.stackContainer, { height: totalStackHeight }]}
            >
              {mockCards.map((card, index) => (
                <AnimatedCard
                  key={card.id}
                  card={card}
                  index={index}
                  totalCards={mockCards.length}
                  selectedCardId={selectedCardId}
                  onPress={handleCardPress}
                  onSecondPress={handleCardSecondPress}
                />
              ))}
            </View>
          </Pressable>
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