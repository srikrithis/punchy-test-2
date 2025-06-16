import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
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
];

const CARD_HEIGHT = 226;
const CARD_WIDTH = 360;
const STACK_OFFSET = 25;
const ANIMATION_DURATION = 400;

interface AnimatedCardProps {
  card: typeof mockCards[0];
  index: number;
  totalCards: number;
  isExpanded: boolean;
  onPress: () => void;
  onSecondPress: () => void;
}

function AnimatedCard({ card, index, totalCards, isExpanded, onPress, onSecondPress }: AnimatedCardProps) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(totalCards - index);
  
  // Calculate initial position in stack (from bottom)
  const stackPosition = (totalCards - 1 - index) * STACK_OFFSET;
  
  React.useEffect(() => {
    if (isExpanded) {
      // Animate to center and bring to front
      translateY.value = withSpring(-stackPosition - 50, {
        damping: 20,
        stiffness: 300,
      });
      scale.value = withSpring(1.05, {
        damping: 20,
        stiffness: 300,
      });
      zIndex.value = withTiming(1000, { duration: 50 });
    } else {
      // Return to stack position
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      });
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 300,
      });
      zIndex.value = withTiming(totalCards - index, { duration: 50 });
    }
  }, [isExpanded, stackPosition, totalCards, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
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
          bottom: stackPosition,
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
        
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.stackContainer}>
            {mockCards.map((card, index) => (
              <AnimatedCard
                key={card.id}
                card={card}
                index={index}
                totalCards={mockCards.length}
                isExpanded={expandedCardId === card.id}
                onPress={() => handleCardPress(card.id)}
                onSecondPress={() => handleCardSecondPress(card.id)}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
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
  stackContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 120, // Space for tab bar
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