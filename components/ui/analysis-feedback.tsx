"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquare, Send, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AnalysisFeedbackProps {
  analysisId: string;
  analysisType?: 'overview' | 'pacing' | 'characters' | 'dialogue' | 'themes' | 'roadmap';
  className?: string;
}

export default function AnalysisFeedback({ 
  analysisId, 
  analysisType = 'overview', 
  className 
}: AnalysisFeedbackProps) {
  const [feedbackStep, setFeedbackStep] = useState<'rating' | 'comment' | 'submitted'>('rating');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    
    // If rating is 4 or 5, auto-submit without comment
    if (selectedRating >= 4) {
      handleSubmitFeedback(selectedRating, '');
    } else {
      // For lower ratings, ask for comment
      setFeedbackStep('comment');
    }
  };

  const handleSubmitFeedback = async (feedbackRating: number, feedbackComment: string) => {
    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const feedbackData = {
        analysisId,
        analysisType,
        rating: feedbackRating,
        comment: feedbackComment,
        timestamp: new Date().toISOString()
      };
      
      console.log('Feedback submitted:', feedbackData);
      
      setFeedbackStep('submitted');
      toast.success('Thank you for your feedback!');
      
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentSubmit = () => {
    if (rating !== null) {
      handleSubmitFeedback(rating, comment);
    }
  };

  return (
    <Card className={`neo-brutal-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-museo flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <span>How helpful was this analysis?</span>
        </CardTitle>
        <CardDescription>
          Your feedback helps us improve our AI insights
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {/* Rating Step */}
          {feedbackStep === 'rating' && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRatingSelect(star)}
                    className={`p-2 rounded-full transition-colors ${
                      rating && rating >= star 
                        ? 'text-yellow-500' 
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </motion.button>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRatingSelect(2)}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Not Helpful
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRatingSelect(5)}
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Very Helpful
                </Button>
              </div>
            </motion.div>
          )}

          {/* Comment Step */}
          {feedbackStep === 'comment' && (
            <motion.div
              key="comment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${
                        rating && rating >= star ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-blue-700">Thank you for rating!</span>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-blue-800">
                  How can we improve this analysis? (Optional)
                </label>
                <Textarea
                  placeholder="Share your thoughts on how we can make this analysis more helpful..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400 min-h-[80px]"
                  maxLength={500}
                />
                <p className="text-xs text-blue-600">{comment.length}/500 characters</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmitFeedback(rating!, '')}
                  className="flex-1"
                >
                  Skip Comment
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCommentSubmit}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Submitted Step */}
          {feedbackStep === 'submitted' && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              >
                <Check className="h-6 w-6 text-green-600" />
              </motion.div>
              
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Feedback Received!</h4>
                <p className="text-sm text-green-700">
                  Thank you for helping us improve Lightink's analysis quality.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

// Contextual upgrade prompts for different scenarios
export function BookshelfUpgradePrompt({ currentPlan, manuscriptCount }: { 
  currentPlan: 'free' | 'pro'; 
  manuscriptCount: number;
}) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <UpgradePrompt
      currentPlan={currentPlan}
      context="bookshelf"
      manuscriptCount={manuscriptCount}
      onDismiss={() => setIsDismissed(true)}
      className="mb-6"
    />
  );
}

export function StudioUpgradePrompt({ currentPlan }: { currentPlan: 'free' | 'pro' }) {
  return (
    <UpgradePrompt
      currentPlan={currentPlan}
      context="studio"
      className="mb-6"
    />
  );
}

export function DashboardUpgradePrompt({ currentPlan }: { currentPlan: 'free' | 'pro' }) {
  return (
    <UpgradePrompt
      currentPlan={currentPlan}
      context="dashboard"
      className="mb-6"
    />
  );
}