/**
 * Bookshelf Utility Functions
 * Helper functions for manuscript management and data processing
 */

import { Manuscript } from './bookshelf-types';

/**
 * Format file size for display
 */
export function formatFileSize(sizeInMB: number): string {
  if (sizeInMB < 1) {
    return `${Math.round(sizeInMB * 1024)} KB`;
  }
  return `${sizeInMB.toFixed(1)} MB`;
}

/**
 * Format word count with proper thousands separators
 */
export function formatWordCount(count: number): string {
  return count.toLocaleString();
}

/**
 * Format date for manuscript display
 */
export function formatManuscriptDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get status configuration for badges and tooltips
 */
export function getStatusConfig(status: Manuscript['status']) {
  switch (status) {
    case 'insights-unveiled':
      return {
        label: 'Insights Unveiled',
        variant: 'default' as const,
        className: 'bg-green-100 text-green-800 border-2 border-green-600',
        tooltip: 'This manuscript\'s analysis is complete. Click to explore its comprehensive Revision Roadmap and data-driven insights.',
        icon: '✨'
      };
    case 'under-scrutiny':
      return {
        label: 'Under Scrutiny',
        variant: 'secondary' as const,
        className: 'bg-blue-100 text-blue-800 border-2 border-blue-600',
        tooltip: 'Your manuscript is currently undergoing rigorous AI analysis. We\'ll notify you once its insights are ready to be unveiled.',
        icon: '🔍'
      };
    case 'awaiting-wisdom':
      return {
        label: 'Awaiting Your Wisdom',
        variant: 'outline' as const,
        className: 'bg-yellow-100 text-yellow-800 border-2 border-yellow-600',
        tooltip: 'This manuscript is ready for analysis. Select a plan to begin its transformation into a Revision Roadmap.',
        icon: '⏳'
      };
    default:
      return {
        label: 'Unknown Status',
        variant: 'outline' as const,
        className: 'bg-gray-100 text-gray-800 border-2 border-gray-600',
        tooltip: 'Status information is not available.',
        icon: '❓'
      };
  }
}

/**
 * Generate manuscript excerpt for preview
 */
export function generateManuscriptExcerpt(manuscript: Manuscript): string {
  if (manuscript.keyInsights) {
    return manuscript.keyInsights;
  }
  
  switch (manuscript.status) {
    case 'under-scrutiny':
      return 'Analysis in progress. Your insights will appear here once complete.';
    case 'awaiting-wisdom':
      return 'Ready for analysis. Begin your manuscript\'s transformation journey.';
    default:
      return 'Manuscript details will be available after processing.';
  }
}

/**
 * Calculate estimated reading time
 */
export function calculateReadingTime(wordCount: number): string {
  const wordsPerMinute = 250; // Average reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes < 60) {
    return `${minutes} min read`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr read`;
  }
  
  return `${hours}h ${remainingMinutes}m read`;
}

/**
 * Get manuscript health score based on analysis
 */
export function getManuscriptHealthScore(manuscript: Manuscript): {
  score: number;
  label: string;
  color: string;
} {
  if (manuscript.status !== 'insights-unveiled') {
    return { score: 0, label: 'Pending Analysis', color: 'text-gray-500' };
  }
  
  // Mock scoring logic - replace with actual analysis data
  const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
  
  if (mockScore >= 90) {
    return { score: mockScore, label: 'Excellent', color: 'text-green-600' };
  } else if (mockScore >= 80) {
    return { score: mockScore, label: 'Strong', color: 'text-blue-600' };
  } else if (mockScore >= 70) {
    return { score: mockScore, label: 'Good', color: 'text-yellow-600' };
  } else {
    return { score: mockScore, label: 'Needs Work', color: 'text-orange-600' };
  }
}

/**
 * Sort options for the manuscript list
 */
export const sortOptions = [
  { value: 'recently-analyzed', label: 'Recently Analyzed' },
  { value: 'title-az', label: 'Title (A-Z)' },
  { value: 'word-count-high', label: 'Word Count (High-Low)' },
  { value: 'status', label: 'Status' },
  { value: 'upload-date', label: 'Upload Date' }
];

/**
 * Validate manuscript file before upload
 */
export function validateManuscriptFile(file: File): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const maxSize = 25 * 1024 * 1024; // 25MB
  const allowedTypes = ['.docx', '.doc', '.pdf', '.txt', '.rtf', '.odt'];
  
  // Check file size
  if (file.size > maxSize) {
    errors.push('File size must be less than 25MB');
  }
  
  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    errors.push('Supported formats: .docx, .doc, .pdf, .txt, .rtf, .odt');
  }
  
  // Check file name
  if (file.name.length > 100) {
    errors.push('File name must be less than 100 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}