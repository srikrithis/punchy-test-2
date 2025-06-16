import React from 'react';
import { Text, TextStyle } from 'react-native';
import { colors, typography } from '@/constants/design-tokens';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: keyof typeof colors.neutral | 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
}

export default function Typography({
  children,
  variant = 'body1',
  color = '900',
  align = 'left',
  style,
}: TypographyProps) {
  const getTextStyles = (): TextStyle => {
    const variantStyles: Record<string, TextStyle> = {
      h1: {
        fontFamily: typography.fontFamily.dela,
        fontSize: typography.fontSize['5xl'],
        lineHeight: typography.lineHeight['5xl'],
      },
      h2: {
        fontFamily: typography.fontFamily.dela,
        fontSize: typography.fontSize['4xl'],
        lineHeight: typography.lineHeight['4xl'],
      },
      h3: {
        fontFamily: typography.fontFamily.sansBold,
        fontSize: typography.fontSize['3xl'],
        lineHeight: typography.lineHeight['3xl'],
      },
      h4: {
        fontFamily: typography.fontFamily.sansBold,
        fontSize: typography.fontSize['2xl'],
        lineHeight: typography.lineHeight['2xl'],
      },
      h5: {
        fontFamily: typography.fontFamily.sansBold,
        fontSize: typography.fontSize.xl,
        lineHeight: typography.lineHeight.xl,
      },
      h6: {
        fontFamily: typography.fontFamily.sansBold,
        fontSize: typography.fontSize.lg,
        lineHeight: typography.lineHeight.lg,
      },
      body1: {
        fontFamily: typography.fontFamily.sans,
        fontSize: typography.fontSize.base,
        lineHeight: typography.lineHeight.base,
      },
      body2: {
        fontFamily: typography.fontFamily.sans,
        fontSize: typography.fontSize.sm,
        lineHeight: typography.lineHeight.sm,
      },
      caption: {
        fontFamily: typography.fontFamily.sans,
        fontSize: typography.fontSize.xs,
        lineHeight: typography.lineHeight.xs,
      },
      overline: {
        fontFamily: typography.fontFamily.sansMedium,
        fontSize: typography.fontSize.xs,
        lineHeight: typography.lineHeight.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
    };

    // Color mapping
    const getColor = () => {
      switch (color) {
        case 'primary':
          return colors.primary.DEFAULT;
        case 'secondary':
          return colors.secondary.DEFAULT;
        case 'error':
          return colors.error.DEFAULT;
        case 'success':
          return colors.success.DEFAULT;
        case 'warning':
          return colors.warning.DEFAULT;
        default:
          return colors.neutral[color as keyof typeof colors.neutral] || colors.neutral[900];
      }
    };

    return {
      ...variantStyles[variant],
      color: getColor(),
      textAlign: align,
    };
  };

  return (
    <Text style={[getTextStyles(), style]}>
      {children}
    </Text>
  );
}