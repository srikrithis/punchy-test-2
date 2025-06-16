import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows, motion } from '@/constants/design-tokens';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...shadows.sm,
    };

    // Size variants
    const sizeStyles: Record<string, ViewStyle> = {
      sm: {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        minHeight: 36,
      },
      md: {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        minHeight: 44,
      },
      lg: {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[4],
        minHeight: 52,
      },
    };

    // Color variants
    const colorStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? colors.neutral[300] : colors.primary.DEFAULT,
      },
      secondary: {
        backgroundColor: disabled ? colors.neutral[300] : colors.secondary.DEFAULT,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: disabled ? colors.neutral[300] : colors.primary.DEFAULT,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      error: {
        backgroundColor: disabled ? colors.neutral[300] : colors.error.DEFAULT,
      },
      success: {
        backgroundColor: disabled ? colors.neutral[300] : colors.success.DEFAULT,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...colorStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && { opacity: 0.6 }),
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontFamily: typography.fontFamily.sansBold,
      textAlign: 'center',
    };

    // Size variants
    const sizeStyles: Record<string, TextStyle> = {
      sm: {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.sm,
      },
      md: {
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.base,
      },
      lg: {
        fontSize: typography.fontSize.lg,
        lineHeight: typography.lineHeight.lg,
      },
    };

    // Color variants
    const colorStyles: Record<string, TextStyle> = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: '#FFFFFF',
      },
      outline: {
        color: disabled ? colors.neutral[400] : colors.primary.DEFAULT,
      },
      ghost: {
        color: disabled ? colors.neutral[400] : colors.primary.DEFAULT,
      },
      error: {
        color: '#FFFFFF',
      },
      success: {
        color: '#FFFFFF',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...colorStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary.DEFAULT : '#FFFFFF'}
          style={{ marginRight: spacing[2] }}
        />
      )}
      <Text style={[getTextStyles(), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}