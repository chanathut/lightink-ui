/**
 * Bookshelf Type Definitions
 * Centralized type definitions for the manuscript management system
 */

export interface Manuscript {
  id: string;
  title: string;
  author: string;
  wordCount: number;
  status: 'insights-unveiled' | 'under-scrutiny' | 'awaiting-wisdom';
  lastAnalyzed: string | null;
  analysisId: string | null;
  keyInsights: string | null;
  uploadedAt: string;
  fileSize: number;
  fileFormat: string;
  preflightChecks?: {
    format: boolean;
    size: boolean;
    readability: boolean;
  };
}

export interface ManuscriptAnalysis {
  id: string;
  manuscriptId: string;
  overallScore: number;
  pacingScore: number;
  characterScore: number;
  dialogueScore: number;
  themeScore: number;
  strengths: string[];
  improvements: string[];
  revisionRoadmap: RevisionItem[];
  completedAt: string;
  processingTime: number;
}

export interface RevisionItem {
  priority: number;
  category: string;
  issue: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  suggestions: string[];
}

export interface BookshelfState {
  manuscripts: Manuscript[];
  searchTerm: string;
  sortBy: string;
  isLoading: boolean;
  error: string | null;
}

export type SortOption = 
  | 'recently-analyzed'
  | 'title-az'
  | 'word-count-high'
  | 'status'
  | 'upload-date';

export interface BookshelfFilters {
  searchTerm: string;
  sortBy: SortOption;
  statusFilter?: Manuscript['status'];
}