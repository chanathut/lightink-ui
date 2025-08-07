"use client";

import { motion } from 'framer-motion';
import { Calendar, FileText, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScholarlyInsight } from '@/components/ui/scholarly-language';
import ManuscriptActions from './ManuscriptActions';
import type { Manuscript } from './ManuscriptList';
import { getStatusConfig, formatManuscriptDate, generateManuscriptExcerpt } from '@/lib/bookshelf-utils';

interface ManuscriptCardProps {
  manuscript: Manuscript;
  onViewDetails?: (manuscript: Manuscript) => void;
  onDelete?: (manuscriptId: string) => void;
}

export default function ManuscriptCard({ manuscript, onViewDetails, onDelete }: ManuscriptCardProps) {

  const statusConfig = getStatusConfig(manuscript.status);
  const excerpt = generateManuscriptExcerpt(manuscript);

  return (
    <TooltipProvider>
      <Card className="neo-brutal-card h-full flex flex-col hover:scale-[1.02] transition-transform duration-200">
        <CardHeader className="pb-4">
          {/* Title and Status */}
          <div className="flex items-start justify-between mb-3">
            <CardTitle className="text-xl font-museo text-charcoal leading-tight flex-1 mr-2">
              Folio: {manuscript.title}
            </CardTitle>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{statusConfig.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Metadata */}
          <div className="space-y-2 text-sm text-payne">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Author: {manuscript.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Word Count: {manuscript.wordCount.toLocaleString()} words</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>
                {manuscript.lastAnalyzed 
                  ? `Last Analyzed: ${formatManuscriptDate(manuscript.lastAnalyzed)}`
                  : `Uploaded: ${formatManuscriptDate(manuscript.uploadedAt)}`
                }
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <Separator className="mb-4" />

          {/* Key Insights/Summary */}
          <div className="mb-6 flex-1">
            {manuscript.keyInsights && (
              <div className="flex items-center space-x-2 mb-3">
                <h4 className="font-semibold text-charcoal text-sm">Scholarly Insights:</h4>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-payne cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      These insights represent key findings from your manuscript's analysis, 
                      presented as evidence for your revision strategy.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            
            {manuscript.keyInsights ? (
              <ScholarlyInsight
                type="evidence"
                title="Analysis Evidence"
                content={manuscript.keyInsights}
                className="mb-4"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-payne italic">{excerpt}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <ManuscriptActions
            manuscript={manuscript}
            onDelete={onDelete}
          />
          
          {/* View Details Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 border-2 border-charcoal hover:bg-charcoal hover:text-white"
            onClick={() => onViewDetails?.(manuscript)}
          >
            View Complete Details
          </Button>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}