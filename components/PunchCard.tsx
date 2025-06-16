import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  const progressPercentage = (punches / maxPunches) * 100;
  const isNearCompletion = punches >= maxPunches - 2;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <LinearGradient colors={backgroundColor} style={styles.card}>
        {pattern && (
          <View style={styles.patternContainer}>
            <Text style={styles.patternText}>{pattern}</Text>
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={[styles.businessName, { color: textColor }]}>
              {businessName}
            </Text>
            {isNearCompletion && (
              <View style={styles.nearCompletionBadge}>
                <Text style={styles.nearCompletionText}>Almost there!</Text>
              </View>
            )}
          </View>
          
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
              <Text style={[styles.progressText, { color: textColor }]}>
                {punches}/{maxPunches}
              </Text>
            </View>
            
            <Text style={[styles.progressLabel, { color: textColor }]}>
              {maxPunches - punches} more {maxPunches - punches === 1 ? 'visit' : 'visits'} to reward
            </Text>
          </View>
          
          <View style={styles.punchesContainer}>
            {Array.from({ length: maxPunches }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.punchCircle,
                  {
                    backgroundColor: index < punches ? textColor : 'transparent',
                    borderColor: textColor,
                    opacity: index < punches ? 1 : 0.4,
                  },
                ]}
              >
                {index < punches && (
                  <View style={[styles.punchDot, { backgroundColor: backgroundColor[0] }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginVertical: 10,
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
    zIndex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  businessName: {
    fontSize: 24,
    fontFamily: 'DelaGothicOne-Regular',
    flex: 1,
    marginRight: 12,
  },
  nearCompletionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  nearCompletionText: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
    color: '#FFFFFF',
  },
  progressSection: {
    marginBottom: 20,
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
    minWidth: 40,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    opacity: 0.9,
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
});