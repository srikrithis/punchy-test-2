import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/design-tokens';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  const getBadgeStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.full,
    };

    // Size variants
    const sizeStyles: Record<string, ViewStyle> = {
      sm: {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        minHeight: 20,
      },
      md: {
        paddingHorizontal: spacing[2.5],
        paddingVertical: spacing[1.5],
        minHeight: 24,
      },
      lg: {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        minHeight: 28,
      },
    };

    // Color variants
    const colorStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary.DEFAULT,
      },
      secondary: {
        backgroundColor: colors.secondary.DEFAULT,
      },
      success: {
        backgroundColor: colors.success.DEFAULT,
      },
      warning: {
        backgroundColor: colors.warning.DEFAULT,
      },
      error: {
        backgroundColor: colors.error.DEFAULT,
      },
      neutral: {
        backgroundColor: colors.neutral[600],
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...colorStyles[variant],
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontFamily: typography.fontFamily.sansMedium,
      color: '#FFFFFF',
      textAlign: 'center',
    };

    // Size variants
    const sizeStyles: Record<string, TextStyle> = {
      sm: {
        fontSize: typography.fontSize.xs,
        lineHeight: typography.lineHeight.xs,
      },
      md: {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.sm,
      },
      lg: {
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.base,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
    };
  };

  return (
    <View style={[getBadgeStyles(), style]}>
      <Text style={[getTextStyles(), textStyle]}>
        {children}
      </Text>
    </View>
  );
}