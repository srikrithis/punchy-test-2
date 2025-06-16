import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/constants/design-tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof spacing;
  style?: ViewStyle;
}

export default function Card({
  children,
  variant = 'default',
  padding = 4,
  style,
}: CardProps) {
  const getCardStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: borderRadius.xl,
      padding: spacing[padding],
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: colors.base[50],
        ...shadows.sm,
      },
      elevated: {
        backgroundColor: colors.base[50],
        ...shadows.lg,
      },
      outlined: {
        backgroundColor: colors.base[50],
        borderWidth: 1,
        borderColor: colors.neutral[200],
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
    };
  };

  return (
    <View style={[getCardStyles(), style]}>
      {children}
    </View>
  );
}