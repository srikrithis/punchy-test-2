import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PunchCardProps {
  id: string;
  businessName: string;
  punches: number;
  maxPunches: number;
  backgroundColor: string[];
  textColor?: string;
  pattern?: string;
  onPress?: () => void;
}

export default function PunchCard({
  businessName,
  punches,
  maxPunches,
  backgroundColor,
  textColor = '#FFFFFF',
  pattern,
  onPress,
}: PunchCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={backgroundColor} style={styles.card}>
        {pattern && (
          <View style={styles.patternContainer}>
            <Text style={styles.patternText}>{pattern}</Text>
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.businessNamePill}>
            <Text style={styles.businessName}>
              {businessName}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 0,
    padding: 24,
    width: 360,
    height: 226,
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
    borderRadius: 0,
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
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  businessNamePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 25,
    alignSelf: 'flex-start',
    backdropFilter: 'blur(10px)',
  },
  businessName: {
    fontSize: 20,
    fontFamily: 'DMSans-Medium',
    color: '#FFFFFF',
    textAlign: 'left',
  },
});