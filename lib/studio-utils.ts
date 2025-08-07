/**
 * Studio Utility Functions
 * Helper functions for consistent styling and behavior across the studio interface
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { colors, animations } from './design-tokens';

/**
 * Utility function to merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate consistent neo-brutal styling for cards
 */
export function neoBrutalCard(variant: 'default' | 'hover' | 'active' = 'default') {
  const baseClasses = 'bg-white border-4 border-charcoal rounded-2xl transition-all duration-200 ease-out';
  
  switch (variant) {
    case 'hover':
      return cn(baseClasses, 'shadow-[12px_12px_0px_0px_theme(colors.charcoal)] translate-x-[-2px] translate-y-[-2px]');
    case 'active':
      return cn(baseClasses, 'shadow-[2px_2px_0px_0px_theme(colors.charcoal)] translate-x-[2px] translate-y-[2px]');
    default:
      return cn(baseClasses, 'shadow-[8px_8px_0px_0px_theme(colors.charcoal)]');
  }
}

/**
 * Generate consistent neo-brutal styling for buttons
 */
export function neoBrutalButton(variant: 'primary' | 'secondary' | 'outline' = 'primary') {
  const baseClasses = 'border-4 border-charcoal rounded-xl font-semibold transition-all duration-200 ease-out';
  
  switch (variant) {
    case 'primary':
      return cn(
        baseClasses,
        'bg-tangerine text-white',
        'shadow-[4px_4px_0px_0px_theme(colors.charcoal)]',
        'hover:shadow-[6px_6px_0px_0px_theme(colors.charcoal)] hover:translate-x-[-1px] hover:translate-y-[-1px]',
        'active:shadow-[2px_2px_0px_0px_theme(colors.charcoal)] active:translate-x-[2px] active:translate-y-[2px]'
      );
    case 'secondary':
      return cn(
        baseClasses,
        'bg-vanilla text-charcoal',
        'shadow-[4px_4px_0px_0px_theme(colors.charcoal)]',
        'hover:shadow-[6px_6px_0px_0px_theme(colors.charcoal)] hover:translate-x-[-1px] hover:translate-y-[-1px]',
        'active:shadow-[2px_2px_0px_0px_theme(colors.charcoal)] active:translate-x-[2px] active:translate-y-[2px]'
      );
    case 'outline':
      return cn(
        baseClasses,
        'bg-white text-charcoal',
        'shadow-[4px_4px_0px_0px_theme(colors.charcoal)]',
        'hover:bg-charcoal hover:text-white hover:shadow-[6px_6px_0px_0px_theme(colors.charcoal)] hover:translate-x-[-1px] hover:translate-y-[-1px]',
        'active:shadow-[2px_2px_0px_0px_theme(colors.charcoal)] active:translate-x-[2px] active:translate-y-[2px]'
      );
    default:
      return baseClasses;
  }
}

/**
 * Generate consistent badge styling
 */
export function studioBadge(variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral') {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2';
  
  switch (variant) {
    case 'success':
      return cn(baseClasses, 'bg-green-100 text-green-800 border-green-600');
    case 'warning':
      return cn(baseClasses, 'bg-yellow-100 text-yellow-800 border-yellow-600');
    case 'error':
      return cn(baseClasses, 'bg-red-100 text-red-800 border-red-600');
    case 'info':
      return cn(baseClasses, 'bg-blue-100 text-blue-800 border-blue-600');
    case 'neutral':
      return cn(baseClasses, 'bg-gray-100 text-gray-800 border-gray-600');
    default:
      return baseClasses;
  }
}

/**
 * Generate consistent text styling based on hierarchy
 */
export function studioText(variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label' = 'body') {
  switch (variant) {
    case 'h1':
      return 'text-4xl md:text-5xl font-serif font-bold text-charcoal leading-tight';
    case 'h2':
      return 'text-3xl md:text-4xl font-serif font-bold text-charcoal leading-tight';
    case 'h3':
      return 'text-2xl md:text-3xl font-serif font-bold text-charcoal leading-snug';
    case 'h4':
      return 'text-xl md:text-2xl font-serif font-semibold text-charcoal leading-snug';
    case 'body':
      return 'text-base text-payne leading-relaxed';
    case 'caption':
      return 'text-sm text-gray-600 leading-normal';
    case 'label':
      return 'text-sm font-medium text-charcoal leading-normal';
    default:
      return 'text-base text-payne leading-relaxed';
  }
}

/**
 * Generate consistent spacing utilities
 */
export const studioSpacing = {
  section: 'py-16 md:py-20',
  container: 'container mx-auto px-4',
  cardPadding: 'p-6 md:p-8',
  buttonPadding: 'px-6 py-3',
  inputPadding: 'px-4 py-3',
} as const;

/**
 * Animation utilities for consistent motion
 */
export const studioAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }
} as const;

/**
 * Responsive breakpoint utilities
 */
export const studioBreakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  largeDesktop: '(min-width: 1280px)',
} as const;

/**
 * Color utilities for data visualization
 */
export const studioColors = {
  // Chart color palette for data visualization
  chartPalette: [
    colors.chart.primary,    // Tangerine
    colors.chart.secondary,  // Payne
    colors.chart.accent,     // Charcoal
    colors.chart.info,       // Blue
    colors.chart.success,    // Green
    colors.chart.warning,    // Amber
    colors.chart.error,      // Red
  ],
  
  // Gradient utilities
  gradients: {
    primary: 'linear-gradient(135deg, #ED8936 0%, #F6AD55 100%)',
    secondary: 'linear-gradient(135deg, #4A5568 0%, #718096 100%)',
    accent: 'linear-gradient(135deg, #FFF4AF 0%, #FEFCBF 100%)',
    neutral: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)',
  },
  
  // Semantic color mappings
  semantic: {
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    info: colors.semantic.info,
    neutral: colors.semantic.neutral,
  }
} as const;

/**
 * Accessibility utilities
 */
export const studioA11y = {
  // Focus ring styles
  focusRing: 'focus:outline-none focus:ring-4 focus:ring-tangerine focus:ring-opacity-50',
  
  // Skip link styles
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-charcoal text-white px-4 py-2 rounded-md z-50',
  
  // Screen reader only text
  srOnly: 'sr-only',
  
  // High contrast mode support
  highContrast: 'contrast-more:border-black contrast-more:text-black',
} as const;

/**
 * Layout utilities for consistent spacing and structure
 */
export const studioLayout = {
  // Common layout patterns
  centerContent: 'flex items-center justify-center',
  spaceBetween: 'flex items-center justify-between',
  stackVertical: 'flex flex-col space-y-4',
  stackHorizontal: 'flex items-center space-x-4',
  
  // Grid patterns
  gridAuto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  gridFixed: 'grid grid-cols-12 gap-6',
  
  // Container sizes
  containerSm: 'max-w-2xl mx-auto',
  containerMd: 'max-w-4xl mx-auto',
  containerLg: 'max-w-6xl mx-auto',
  containerXl: 'max-w-7xl mx-auto',
} as const;

/**
 * Validation utilities for form consistency
 */
export const studioValidation = {
  // Input states
  inputDefault: 'border-2 border-gray-300 focus:border-tangerine',
  inputError: 'border-2 border-red-400 focus:border-red-500',
  inputSuccess: 'border-2 border-green-400 focus:border-green-500',
  
  // Error message styling
  errorMessage: 'text-sm text-red-600 mt-1 flex items-center',
  successMessage: 'text-sm text-green-600 mt-1 flex items-center',
} as const;