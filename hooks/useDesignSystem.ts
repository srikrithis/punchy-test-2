import { useMemo } from 'react';
import { colors, typography, spacing, motion, borderRadius, shadows, iconSizes } from '@/constants/design-tokens';

export function useDesignSystem() {
  const theme = useMemo(() => ({
    colors,
    typography,
    spacing,
    motion,
    borderRadius,
    shadows,
    iconSizes,
  }), []);

  // Utility functions for common design system operations
  const utils = useMemo(() => ({
    // Get color with opacity
    getColorWithOpacity: (color: string, opacity: number) => {
      // Convert hex to rgba
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    },

    // Get responsive spacing
    getResponsiveSpacing: (base: keyof typeof spacing, multiplier: number = 1) => {
      return spacing[base] * multiplier;
    },

    // Get text style by variant
    getTextStyle: (variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption') => {
      const variantStyles = {
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
      };
      return variantStyles[variant];
    },

    // Get shadow by elevation
    getShadow: (elevation: keyof typeof shadows) => shadows[elevation],

    // Get border radius by size
    getBorderRadius: (size: keyof typeof borderRadius) => borderRadius[size],
  }), []);

  return {
    theme,
    utils,
  };
}