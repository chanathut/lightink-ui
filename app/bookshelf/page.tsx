"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookshelfHeader from '@/components/bookshelf/BookshelfHeader';
import ManuscriptList from '@/components/bookshelf/ManuscriptList';
import EmptyBookshelf from '@/components/bookshelf/EmptyBookshelf';
import ManuscriptDetailsModal from '@/components/bookshelf/ManuscriptDetailsModal';
import { useBookshelf } from '@/hooks/useBookshelf';
import { Manuscript } from '@/lib/bookshelf-types';

export default function BookshelfPage() {
  const {
    manuscripts,
    isLoading,
    error,
    filters,
    updateFilters,
    deleteManuscript,
    refreshManuscripts,
    totalCount,
    filteredCount
  } = useBookshelf();
  
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (manuscript: Manuscript) => {
    setSelectedManuscript(manuscript);
    setIsDetailsModalOpen(true);
  };

  const handleSearchChange = (searchTerm: string) => {
    updateFilters({ searchTerm });
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy: sortBy as any });
  };

  return (
    <div className="min-h-screen seamless-bg">
      {/* Header */}
      <BookshelfHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-tangerine border-t-transparent rounded-full"
              />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={refreshManuscripts}
                className="neo-brutal-button px-6 py-3"
              >
                Try Again
              </button>
            </div>
          ) : manuscripts.length === 0 ? (
            <EmptyBookshelf />
          ) : (
            <ManuscriptList
              manuscripts={manuscripts}
              searchTerm={filters.searchTerm}
              onSearchChange={handleSearchChange}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
              onViewDetails={handleViewDetails}
              onDeleteManuscript={deleteManuscript}
            />
          )}
        </motion.div>
      </div>
      
      <ManuscriptDetailsModal
        manuscript={selectedManuscript}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
}