/**
 * Studio Constants
 * Centralized constants for consistent behavior across the studio interface
 */

// Navigation items for the studio sidebar
export const STUDIO_NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'High-level manuscript insights and summary',
    icon: 'BarChart3',
  },
  {
    id: 'pacing',
    label: 'Pacing',
    description: 'Narrative rhythm and tension analysis',
    icon: 'TrendingUp',
  },
  {
    id: 'characters',
    label: 'Characters',
    description: 'Character development and interaction patterns',
    icon: 'Users',
  },
  {
    id: 'dialogue',
    label: 'Dialogue & Prose',
    description: 'Voice analysis and writing style insights',
    icon: 'MessageCircle',
  },
  {
    id: 'themes',
    label: 'Themes',
    description: 'Thematic resonance and consistency',
    icon: 'BookOpen',
  },
  {
    id: 'roadmap',
    label: 'Revision Roadmap',
    description: 'Prioritized action plan for improvement',
    icon: 'Target',
  },
] as const;

// Analysis status types
export const ANALYSIS_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Analysis tier types
export const ANALYSIS_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  PREMIUM: 'premium',
} as const;

// Chart color schemes for data visualization
export const CHART_COLORS = {
  primary: ['#ED8936', '#F6AD55', '#FBD38D', '#FEEBC8'],
  secondary: ['#4A5568', '#718096', '#A0AEC0', '#CBD5E0'],
  success: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  warning: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
  error: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
  info: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
  neutral: ['#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'],
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1536,
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
} as const;

// Z-index layers for consistent stacking
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1800,
} as const;

// Error messages for consistent user feedback
export const ERROR_MESSAGES = {
  INVALID_TOKEN: 'This report link is invalid or has expired. Please check your email for the correct link.',
  NETWORK_ERROR: 'Unable to connect to our servers. Please check your internet connection and try again.',
  LOADING_ERROR: 'Failed to load your analysis report. Please refresh the page or try again later.',
  PDF_GENERATION_ERROR: 'Failed to generate PDF report. Please try again in a few moments.',
  GENERIC_ERROR: 'Something went wrong. Our team has been notified and we\'re working to fix this issue.',
} as const;

// Success messages for positive user feedback
export const SUCCESS_MESSAGES = {
  PDF_GENERATED: 'Your PDF report has been generated successfully!',
  REPORT_SHARED: 'Report link copied to clipboard successfully!',
  ANALYSIS_COMPLETE: 'Your manuscript analysis is complete and ready to view.',
} as const;

// Loading messages for different states
export const LOADING_MESSAGES = {
  FETCHING_REPORT: 'Loading your analysis report...',
  GENERATING_PDF: 'Generating your PDF report...',
  PROCESSING_DATA: 'Processing your manuscript data...',
  SAVING_CHANGES: 'Saving your changes...',
} as const;

// Empathetic microcopy for the studio interface
export const MICROCOPY = {
  // Encouraging language for analysis results
  STRENGTHS_TITLE: 'What\'s Working Well',
  OPPORTUNITIES_TITLE: 'Areas for Growth',
  INSIGHTS_TITLE: 'Key Insights',
  SUGGESTIONS_TITLE: 'Recommendations',
  
  // Non-judgmental analysis descriptions
  PACING_DESCRIPTION: 'Discover the rhythm and flow of your narrative',
  CHARACTER_DESCRIPTION: 'Explore your character relationships and development',
  DIALOGUE_DESCRIPTION: 'Enhance the voices and conversations in your story',
  THEME_DESCRIPTION: 'Strengthen the deeper meanings in your work',
  ROADMAP_DESCRIPTION: 'Your personalized path to manuscript improvement',
  
  // Supportive action prompts
  EXPORT_PDF_TOOLTIP: 'Download a professional PDF of your complete analysis',
  SHARE_REPORT_TOOLTIP: 'Share this report with trusted readers or editors',
  BACK_TO_HOME_TOOLTIP: 'Return to the main Lightink dashboard',
  
  // Privacy and security reassurance
  PRIVACY_NOTICE: 'Your manuscript and analysis are completely private and secure',
  AUTO_DELETE_NOTICE: 'Your files are automatically deleted after analysis completion',
  SECURE_LINK_NOTICE: 'This is a secure, time-limited link to your analysis',
} as const;

// Accessibility labels and descriptions
export const A11Y_LABELS = {
  // Navigation
  MAIN_NAV: 'Main studio navigation',
  SKIP_TO_CONTENT: 'Skip to main content',
  BACK_TO_HOME: 'Return to Lightink homepage',
  
  // Charts and visualizations
  PACING_CHART: 'Interactive pacing analysis chart showing narrative rhythm across chapters',
  CHARACTER_NETWORK: 'Character relationship network diagram',
  THEME_CHART: 'Thematic analysis bar chart',
  
  // Actions
  EXPORT_PDF: 'Export analysis report as PDF document',
  SHARE_REPORT: 'Copy report link to clipboard',
  EXPAND_SECTION: 'Expand section for more details',
  COLLAPSE_SECTION: 'Collapse section',
  
  // Status indicators
  ANALYSIS_COMPLETE: 'Analysis status: Complete',
  ANALYSIS_PROCESSING: 'Analysis status: Processing',
  LOADING_CONTENT: 'Loading content, please wait',
} as const;

// Feature flags for progressive enhancement
export const FEATURE_FLAGS = {
  ENABLE_ADVANCED_CHARTS: true,
  ENABLE_REAL_TIME_UPDATES: false,
  ENABLE_COLLABORATIVE_FEATURES: false,
  ENABLE_EXPORT_OPTIONS: true,
  ENABLE_ACCESSIBILITY_ENHANCEMENTS: true,
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  CHART_RENDER_TIMEOUT: 5000, // 5 seconds
  PDF_GENERATION_TIMEOUT: 30000, // 30 seconds
  API_REQUEST_TIMEOUT: 10000, // 10 seconds
  ANIMATION_FRAME_BUDGET: 16, // 16ms for 60fps
} as const;

export type StudioNavItem = typeof STUDIO_NAV_ITEMS[number];
export type AnalysisStatus = typeof ANALYSIS_STATUS[keyof typeof ANALYSIS_STATUS];
export type AnalysisTier = typeof ANALYSIS_TIERS[keyof typeof ANALYSIS_TIERS];
export type ChartColorScheme = keyof typeof CHART_COLORS;