/**
 * Lightink Design Tokens
 * Unified visual lexicon for professional consistency across the studio interface
 */

// Color System - Based on Lightink brand palette
export const colors = {
  // Primary Brand Colors
  charcoal: '#2D3748',
  payne: '#4A5568',
  vanilla: '#FFF4AF',
  tangerine: '#ED8936',
  azure: '#F5FFFE',

  // Extended Palette for Data Visualization
  chart: {
    primary: '#ED8936',    // Tangerine
    secondary: '#4A5568',  // Payne
    accent: '#2D3748',     // Charcoal
    success: '#10B981',    // Green
    warning: '#F59E0B',    // Amber
    error: '#EF4444',      // Red
    info: '#3B82F6',       // Blue
  },

  // Semantic Colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    neutral: '#6B7280',
  },

  // Background Variations
  backgrounds: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    accent: '#FFF4AF',     // Vanilla
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Text Colors
  text: {
    primary: '#2D3748',    // Charcoal
    secondary: '#4A5568',  // Payne
    muted: '#6B7280',
    inverse: '#FFFFFF',
    accent: '#ED8936',     // Tangerine
  }
} as const;

// Typography System - Professional hierarchy
export const typography = {
  fontFamilies: {
    serif: ['DM Serif Display', 'serif'],
    sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    mono: ['JetBrains Mono', 'monospace'],
  },

  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },

  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.75',
  },
} as const;

// Spacing System - 8px base grid
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
} as const;

// Shadow System - Neo-brutalism inspired
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Neo-brutalism shadows
  brutal: {
    small: '2px 2px 0px 0px #2D3748',
    medium: '4px 4px 0px 0px #2D3748',
    large: '8px 8px 0px 0px #2D3748',
    xlarge: '12px 12px 0px 0px #2D3748',
  },
} as const;

// Border Radius System
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Animation System - Smooth and purposeful
export const animations = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },

  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Framer Motion variants
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
  },
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index system
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Component-specific design tokens
export const components = {
  button: {
    heights: {
      sm: '2rem',     // 32px
      md: '2.5rem',   // 40px
      lg: '3rem',     // 48px
      xl: '3.5rem',   // 56px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.75rem 1rem',
      lg: '1rem 1.5rem',
      xl: '1.25rem 2rem',
    },
  },

  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
    },
    borderWidth: '2px',
    borderColor: colors.charcoal,
  },

  input: {
    height: '2.5rem', // 40px
    padding: '0.75rem',
    borderWidth: '2px',
    focusBorderColor: colors.tangerine,
  },
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Shadows = typeof shadows;
export type BorderRadius = typeof borderRadius;
export type Animations = typeof animations;
export type Breakpoints = typeof breakpoints;
export type ZIndex = typeof zIndex;
export type Components = typeof components;