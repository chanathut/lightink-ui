/**
 * Manuscript Details Modal
 * Displays comprehensive information about a manuscript
 */

"use client";

import { motion } from 'framer-motion';
import { 
  FileText, 
  User, 
  Calendar, 
  BarChart3, 
  Clock, 
  HardDrive,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Manuscript } from '@/lib/bookshelf-types';
import { 
  formatFileSize, 
  formatWordCount, 
  formatManuscriptDate, 
  calculateReadingTime,
  getManuscriptHealthScore,
  getStatusConfig 
} from '@/lib/bookshelf-utils';

interface ManuscriptDetailsModalProps {
  manuscript: Manuscript | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ManuscriptDetailsModal({ 
  manuscript, 
  isOpen, 
  onClose 
}: ManuscriptDetailsModalProps) {
  if (!manuscript) return null;

  const statusConfig = getStatusConfig(manuscript.status);
  const healthScore = getManuscriptHealthScore(manuscript);
  const readingTime = calculateReadingTime(manuscript.wordCount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-4">
              <DialogTitle className="text-2xl font-museo text-charcoal mb-2">
                Folio Details: {manuscript.title}
              </DialogTitle>
              <DialogDescription className="text-base text-payne">
                Comprehensive manuscript information and analysis status
              </DialogDescription>
            </div>
            <Badge className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-payne" />
                <div>
                  <p className="text-sm text-payne">Author</p>
                  <p className="font-semibold text-charcoal">{manuscript.author}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-payne" />
                <div>
                  <p className="text-sm text-payne">Word Count</p>
                  <p className="font-semibold text-charcoal">
                    {formatWordCount(manuscript.wordCount)} words
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-payne" />
                <div>
                  <p className="text-sm text-payne">Reading Time</p>
                  <p className="font-semibold text-charcoal">{readingTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <HardDrive className="h-5 w-5 text-payne" />
                <div>
                  <p className="text-sm text-payne">File Size</p>
                  <p className="font-semibold text-charcoal">
                    {formatFileSize(manuscript.fileSize)} ({manuscript.fileFormat})
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-payne" />
                <div>
                  <p className="text-sm text-payne">Uploaded</p>
                  <p className="font-semibold text-charcoal">
                    {formatManuscriptDate(manuscript.uploadedAt)}
                  </p>
                </div>
              </div>
              
              {manuscript.lastAnalyzed && (
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-payne" />
                  <div>
                    <p className="text-sm text-payne">Last Analyzed</p>
                    <p className="font-semibold text-charcoal">
                      {formatManuscriptDate(manuscript.lastAnalyzed)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <Separator />

          {/* Health Score */}
          {manuscript.status === 'insights-unveiled' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-charcoal flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Manuscript Health Score
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Progress value={healthScore.score} className="h-3" />
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${healthScore.color}`}>
                    {healthScore.score}/100
                  </p>
                  <p className={`text-sm ${healthScore.color}`}>
                    {healthScore.label}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pre-flight Checks */}
          {manuscript.preflightChecks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-charcoal">Pre-flight Validation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(manuscript.preflightChecks).map(([check, passed]) => (
                  <div 
                    key={check} 
                    className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border"
                  >
                    {passed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm capitalize ${
                      passed ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {check} {passed ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Insights Preview */}
          {manuscript.keyInsights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-charcoal">Key Insights Preview</h3>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-blue-800 italic">"{manuscript.keyInsights}"</p>
              </div>
            </motion.div>
          )}

          {/* Status Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-charcoal">Current Status</h3>
            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{statusConfig.icon}</span>
                <div>
                  <p className="font-semibold text-charcoal">{statusConfig.label}</p>
                  <p className="text-sm text-payne">{statusConfig.tooltip}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {manuscript.analysisId && (
            <Button 
              className="neo-brutal-button"
              onClick={() => {
                onClose();
                window.open(`/studio/${manuscript.analysisId}`, '_blank');
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Open in Studio
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}