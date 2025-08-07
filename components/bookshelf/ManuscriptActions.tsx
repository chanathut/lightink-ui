/**
 * Manuscript Actions Component
 * Handles all actions that can be performed on a manuscript
 */

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Info, 
  MoreHorizontal, 
  Download, 
  Trash2, 
  RefreshCw,
  ExternalLink,
  Copy,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Manuscript } from '@/lib/bookshelf-types';

interface ManuscriptActionsProps {
  manuscript: Manuscript;
  onDelete?: (manuscriptId: string) => void;
  onRefresh?: () => void;
}

export default function ManuscriptActions({ 
  manuscript, 
  onDelete, 
  onRefresh 
}: ManuscriptActionsProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenStudio = () => {
    if (manuscript.analysisId) {
      router.push(`/studio/${manuscript.analysisId}`);
    } else {
      toast.error('Analysis not yet available for this manuscript');
    }
  };

  const handleViewDetails = () => {
    // TODO: Open details modal with comprehensive manuscript information
    toast.info('Manuscript details modal would open here');
  };

  const handleDownload = () => {
    // TODO: Implement file download
    toast.info('Downloading manuscript file...');
  };

  const handleCopyLink = () => {
    if (manuscript.analysisId) {
      const studioUrl = `${window.location.origin}/studio/${manuscript.analysisId}`;
      navigator.clipboard.writeText(studioUrl).then(() => {
        toast.success('Studio link copied to clipboard');
      }).catch(() => {
        toast.error('Failed to copy link');
      });
    } else {
      toast.error('No analysis link available yet');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete?.(manuscript.id);
      toast.success('Manuscript deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete manuscript');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReanalyze = () => {
    // TODO: Implement re-analysis functionality
    toast.info('Re-analysis feature coming soon');
  };

  return (
    <>
      <div className="space-y-3">
        {/* Primary Action Button */}
        {manuscript.status === 'insights-unveiled' && manuscript.analysisId ? (
          <Button 
            className="w-full"
            variant="default"
            onClick={handleOpenStudio}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Open in Studio: Unveil Insights
          </Button>
        ) : manuscript.status === 'awaiting-wisdom' ? (
          <Button 
            className="w-full"
            variant="default"
            onClick={() => router.push('/upload')}
          >
            <Eye className="mr-2 h-4 w-4" />
            Begin Analysis Journey
          </Button>
        ) : (
          <Button 
            className="w-full"
            variant="neutral"
            disabled
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full" />
            </motion.div>
            Analysis in Progress
          </Button>
        )}

        {/* Secondary Actions */}
        <div className="flex space-x-2">
          <Button
            variant="neutral"
            size="sm"
            className="flex-1"
            onClick={handleViewDetails}
          >
            <Info className="mr-2 h-4 w-4" />
            View Details
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="neutral"
                size="sm"
                className=""
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Raw File
              </DropdownMenuItem>
              
              {manuscript.analysisId && (
                <DropdownMenuItem onClick={handleCopyLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Studio Link
                </DropdownMenuItem>
              )}
              
              {manuscript.status === 'insights-unveiled' && (
                <DropdownMenuItem onClick={handleReanalyze}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Re-analyze Manuscript
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Manuscript
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Manuscript</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{manuscript.title}"? This action cannot be undone.
              {manuscript.status === 'insights-unveiled' && (
                <span className="block mt-2 text-amber-600 font-medium">
                  Warning: This will also delete all analysis data and insights.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Manuscript'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}