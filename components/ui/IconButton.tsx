import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows, iconSizes } from '@/constants/design-tokens';

export interface IconButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  style?: ViewStyle;
}

export default function IconButton({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}: IconButtonProps) {
  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.lg,
    };

    // Size variants
    const sizeStyles: Record<string, ViewStyle> = {
      sm: {
        width: 32,
        height: 32,
        padding: spacing[1.5],
      },
      md: {
        width: 40,
        height: 40,
        padding: spacing[2],
      },
      lg: {
        width: 48,
        height: 48,
        padding: spacing[2.5],
      },
      xl: {
        width: 56,
        height: 56,
        padding: spacing[3],
      },
    };

    // Color variants
    const colorStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? colors.neutral[300] : colors.primary.DEFAULT,
        ...shadows.sm,
      },
      secondary: {
        backgroundColor: disabled ? colors.neutral[300] : colors.secondary.DEFAULT,
        ...shadows.sm,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: disabled ? colors.neutral[300] : colors.primary.DEFAULT,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...colorStyles[variant],
      ...(disabled && { opacity: 0.6 }),
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
}