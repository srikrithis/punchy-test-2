// Design System Tokens
// Based on Tailwind CSS design principles

export const colors = {
  // Primary brand colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // DEFAULT
    600: '#0284c7',
    700: '#0369a1', // dark
    800: '#075985',
    900: '#0c4a6e',
    DEFAULT: '#0ea5e9',
    light: '#7dd3fc',
    dark: '#0369a1',
  },
  
  // Secondary colors
  secondary: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // DEFAULT
    600: '#d97706',
    700: '#b45309', // dark
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#f59e0b',
    light: '#fcd34d',
    dark: '#b45309',
  },
  
  // Error states
  error: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899', // DEFAULT
    600: '#db2777',
    700: '#be185d', // dark
    800: '#9d174d',
    900: '#831843',
    DEFAULT: '#ec4899',
    light: '#f9a8d4',
    dark: '#be185d',
  },
  
  // Success states
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // DEFAULT
    600: '#059669',
    700: '#047857', // dark
    800: '#065f46',
    900: '#064e3b',
    DEFAULT: '#10b981',
    light: '#6ee7b7',
    dark: '#047857',
  },
  
  // Warning states
  warning: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // DEFAULT
    600: '#ea580c',
    700: '#c2410c', // dark
    800: '#9a3412',
    900: '#7c2d12',
    DEFAULT: '#f97316',
    light: '#fdba74',
    dark: '#c2410c',
  },
  
  // Neutral colors (zinc scale)
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  
  // Base colors for backgrounds and content
  base: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
} as const;

export const typography = {
  fontFamily: {
    dela: 'DelaGothicOne-Regular',
    sans: 'DMSans-Regular',
    sansMedium: 'DMSans-Medium',
    sansBold: 'DMSans-Bold',
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
} as const;

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  4.5: 18,
  5: 20,
  5.5: 22,
  6: 24,
  6.5: 26,
  7: 28,
  7.5: 30,
  8: 32,
  8.5: 34,
  9: 36,
  9.5: 38,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  22: 88,
  24: 96,
  26: 104,
  28: 112,
  30: 120,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

export const motion = {
  duration: {
    fast: 150,
    medium: 300,
    slow: 500,
  },
  
  easing: {
    standard: [0.4, 0.0, 0.2, 1] as const,
    entrance: [0.0, 0.0, 0.2, 1] as const,
    exit: [0.4, 0.0, 1, 1] as const,
  },
} as const;

export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

export const shadows = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 16,
  },
} as const;

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;