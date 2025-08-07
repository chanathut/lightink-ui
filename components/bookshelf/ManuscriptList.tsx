"use client";

import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ManuscriptCard from './ManuscriptCard';
// FIX: Changed the named import 'BookshelfUpgradePrompt' to the correct default import 'UpgradePrompt'.
import UpgradePrompt from '@/components/ui/upgrade-prompts';

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
}

interface ManuscriptListProps {
  manuscripts: Manuscript[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onViewDetails?: (manuscript: Manuscript) => void;
  onDeleteManuscript?: (manuscriptId: string) => void;
}

export default function ManuscriptList({
  manuscripts,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  onViewDetails,
  onDeleteManuscript
}: ManuscriptListProps) {
  // Mock current plan - in real implementation, get from user context
  const currentPlan = 'free'; // This would come from user authentication/context

  return (
    <div className="space-y-8">
      {/* Upgrade Prompt for Free/Pro Users */}
      {(currentPlan === 'free' || currentPlan === 'pro') && (
        // FIX: Changed the component name to match the corrected import.
        <UpgradePrompt 
          currentPlan={currentPlan} 
          context="bookshelf" 
          manuscriptCount={manuscripts.length} 
        />
      )}

      {/* Organization Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl border-4 border-charcoal shadow-neo-brutal p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="h-5 w-5 text-charcoal" />
          <h2 className="text-xl font-museo font-bold text-charcoal">
            Organize Your Folios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sort-select" className="text-sm font-medium text-charcoal">
              Sort by:
            </Label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger id="sort-select" className="border-2 border-gray-300 focus:border-tangerine">
                <SelectValue placeholder="Choose sorting method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recently-analyzed">Recently Analyzed</SelectItem>
                <SelectItem value="title-az">Title (A-Z)</SelectItem>
                <SelectItem value="word-count-high">Word Count (High-Low)</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search-input" className="text-sm font-medium text-charcoal">
              Search by Title/Author:
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-paynes-gray" />
              <Input
                id="search-input"
                type="text"
                placeholder="Find your literary works..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 border-2 border-gray-300 focus:border-tangerine"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Manuscripts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {manuscripts.map((manuscript, index) => (
          <motion.div
            key={manuscript.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ManuscriptCard 
              manuscript={manuscript}
              onViewDetails={onViewDetails}
              onDelete={onDeleteManuscript}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Results Summary */}
      {manuscripts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-paynes-gray"
        >
          <p className="text-sm">
            Displaying {manuscripts.length} volume{manuscripts.length !== 1 ? 's' : ''} in your collection
          </p>
        </motion.div>
      )}
    </div>
  );
}
