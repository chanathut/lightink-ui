/**
 * Bookshelf State Management Hook
 * Manages manuscript collection state and operations
 */

import { useState, useEffect, useMemo } from 'react';
import { Manuscript, BookshelfFilters, SortOption } from '@/lib/bookshelf-types';

// Mock data for development - replace with actual API calls
const mockManuscripts: Manuscript[] = [
  {
    id: 'ms-001',
    title: 'The Digital Athenaeum',
    author: 'Elena Rodriguez',
    wordCount: 75000,
    status: 'insights-unveiled',
    lastAnalyzed: '2024-01-15T10:30:00Z',
    analysisId: 'analysis-001',
    keyInsights: 'Your narrative tension is strong, but character arcs could be deepened for greater emotional impact.',
    uploadedAt: '2024-01-14T09:15:00Z',
    fileSize: 2.4,
    fileFormat: '.docx'
  },
  {
    id: 'ms-002',
    title: 'Shadows of Tomorrow',
    author: 'Marcus Chen',
    wordCount: 92000,
    status: 'under-scrutiny',
    lastAnalyzed: null,
    analysisId: null,
    keyInsights: null,
    uploadedAt: '2024-01-16T14:22:00Z',
    fileSize: 3.1,
    fileFormat: '.docx'
  },
  {
    id: 'ms-003',
    title: 'The Quantum Garden',
    author: 'Sarah Williams',
    wordCount: 68000,
    status: 'awaiting-wisdom',
    lastAnalyzed: null,
    analysisId: null,
    keyInsights: null,
    uploadedAt: '2024-01-17T11:45:00Z',
    fileSize: 2.8,
    fileFormat: '.docx'
  }
];

export function useBookshelf() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BookshelfFilters>({
    searchTerm: '',
    sortBy: 'recently-analyzed'
  });

  // Simulate API loading
  useEffect(() => {
    const loadManuscripts = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setManuscripts(mockManuscripts);
      } catch (err) {
        setError('Failed to load manuscripts');
      } finally {
        setIsLoading(false);
      }
    };

    loadManuscripts();
  }, []);

  // Filter and sort manuscripts
  const filteredManuscripts = useMemo(() => {
    let filtered = manuscripts.filter(manuscript => 
      manuscript.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      manuscript.author.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );

    if (filters.statusFilter) {
      filtered = filtered.filter(manuscript => manuscript.status === filters.statusFilter);
    }

    // Sort manuscripts
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title-az':
          return a.title.localeCompare(b.title);
        case 'word-count-high':
          return b.wordCount - a.wordCount;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'upload-date':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case 'recently-analyzed':
        default:
          // Sort by last analyzed date, then by upload date
          if (a.lastAnalyzed && b.lastAnalyzed) {
            return new Date(b.lastAnalyzed).getTime() - new Date(a.lastAnalyzed).getTime();
          }
          if (a.lastAnalyzed && !b.lastAnalyzed) return -1;
          if (!a.lastAnalyzed && b.lastAnalyzed) return 1;
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
    });

    return filtered;
  }, [manuscripts, filters]);

  // Actions
  const updateFilters = (newFilters: Partial<BookshelfFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const deleteManuscript = async (manuscriptId: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setManuscripts(prev => prev.filter(ms => ms.id !== manuscriptId));
    } catch (err) {
      setError('Failed to delete manuscript');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshManuscripts = async () => {
    try {
      setIsLoading(true);
      // Simulate API refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setManuscripts(mockManuscripts);
    } catch (err) {
      setError('Failed to refresh manuscripts');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    manuscripts: filteredManuscripts,
    isLoading,
    error,
    filters,
    updateFilters,
    deleteManuscript,
    refreshManuscripts,
    totalCount: manuscripts.length,
    filteredCount: filteredManuscripts.length
  };
}