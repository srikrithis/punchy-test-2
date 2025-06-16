import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-tokens';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  size = 'md',
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: borderRadius.lg,
      borderWidth: 2,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.base[50],
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
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[4],
        minHeight: 52,
      },
    };

    // State styles
    let borderColor = colors.neutral[300];
    if (error) {
      borderColor = colors.error.DEFAULT;
    } else if (isFocused) {
      borderColor = colors.primary.DEFAULT;
    }

    return {
      ...baseStyles,
      ...sizeStyles[size],
      borderColor,
    };
  };

  const getInputStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      flex: 1,
      fontFamily: typography.fontFamily.sans,
      color: colors.neutral[900],
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

    return {
      ...baseStyles,
      ...sizeStyles[size],
    };
  };

  const getLabelStyles = (): TextStyle => ({
    fontFamily: typography.fontFamily.sansMedium,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    color: colors.neutral[700],
    marginBottom: spacing[1.5],
  });

  const getHelperTextStyles = (): TextStyle => ({
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.xs,
    color: error ? colors.error.DEFAULT : colors.neutral[600],
    marginTop: spacing[1],
  });

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[getLabelStyles(), labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={getContainerStyles()}>
        {leftIcon && (
          <View style={{ marginRight: spacing[2] }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[getInputStyles(), inputStyle]}
          placeholderTextColor={colors.neutral[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {rightIcon && (
          <View style={{ marginLeft: spacing[2] }}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={getHelperTextStyles()}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
}