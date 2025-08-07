"use client";

/**
 * Expert Coach Copy Components
 * Reinforces the supportive, strategic guidance tone throughout the interface
 */

import { motion } from 'framer-motion';
import { Target, Lightbulb, CheckCircle, ArrowRight, Star, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CoachingMessageProps {
  type: 'encouragement' | 'strategy' | 'achievement' | 'guidance';
  message: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function CoachingMessage({ type, message, actionText, onAction, className }: CoachingMessageProps) {
  const config = {
    encouragement: {
      icon: Star,
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    strategy: {
      icon: Target,
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    },
    achievement: {
      icon: Trophy,
      bgColor: 'from-green-50 to-teal-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    guidance: {
      icon: Lightbulb,
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      iconColor: 'text-purple-600'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(`bg-gradient-to-r ${bgColor} rounded-xl p-4 border ${borderColor}`, className)}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${iconColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <p className={`${textColor} text-sm leading-relaxed`}>{message}</p>
          {actionText && onAction && (
            <button
              onClick={onAction}
              className={`mt-2 text-xs ${textColor} hover:underline font-medium flex items-center`}
            >
              {actionText}
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface ProgressCelebrationProps {
  milestone: string;
  description: string;
  nextStep?: string;
  className?: string;
}

export function ProgressCelebration({ milestone, description, nextStep, className }: ProgressCelebrationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("text-center space-y-4", className)}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto"
      >
        <Trophy className="h-8 w-8 text-white" />
      </motion.div>
      
      <div>
        <h3 className="text-2xl font-museo font-bold text-charcoal mb-2">
          {milestone}
        </h3>
        <p className="text-payne leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </div>
      
      {nextStep && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 max-w-md mx-auto">
          <p className="text-blue-800 text-sm">
            <strong>Next in your journey:</strong> {nextStep}
          </p>
        </div>
      )}
    </motion.div>
  );
}

interface ExpertTipProps {
  category: 'revision' | 'writing' | 'analysis' | 'productivity';
  tip: string;
  context?: string;
  className?: string;
}

export function ExpertTip({ category, tip, context, className }: ExpertTipProps) {
  const categoryConfig = {
    revision: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    writing: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    analysis: { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    productivity: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' }
  };

  const config = categoryConfig[category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(`${config.bg} rounded-xl p-4 border ${config.border}`, className)}
    >
      <div className="flex items-start space-x-3">
        <Lightbulb className={`h-5 w-5 ${config.color} mt-0.5 flex-shrink-0`} />
        <div>
          <Badge variant="outline" className={`${config.color} text-xs mb-2 capitalize`}>
            Expert {category} Tip
          </Badge>
          <p className={`${config.color} text-sm leading-relaxed font-medium mb-2`}>
            {tip}
          </p>
          {context && (
            <p className={`${config.color} text-xs opacity-80 leading-relaxed`}>
              {context}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Pre-written expert coach messages for different scenarios
export const COACHING_MESSAGES = {
  // Bookshelf messages
  FIRST_UPLOAD: {
    type: 'encouragement' as const,
    message: 'Welcome to your literary journey! Every great author starts with a single manuscript. Your first upload marks the beginning of data-driven revision mastery.',
    actionText: 'Learn about the analysis process'
  },
  
  COLLECTION_GROWING: {
    type: 'achievement' as const,
    message: 'Your athenaeum is expanding beautifully! Each manuscript represents growth in your craft. Compare insights across works to identify your evolving strengths.',
    actionText: 'View collection insights'
  },
  
  ANALYSIS_COMPLETE: {
    type: 'strategy' as const,
    message: 'Your manuscript\'s secrets have been unveiled! The analysis reveals both strengths to celebrate and opportunities to elevate your work even further.',
    actionText: 'Explore your insights'
  },
  
  // Studio messages
  ROADMAP_FOCUS: {
    type: 'guidance' as const,
    message: 'Your Revision Roadmap is your strategic advantage. Focus on Priority 1 items first—they offer the highest impact for your story\'s effectiveness.',
    actionText: 'Start with Priority 1'
  },
  
  PACING_DISCOVERY: {
    type: 'strategy' as const,
    message: 'Pacing is your story\'s heartbeat. Use the heatmap to identify where tension drops and where momentum builds. Every great story has its rhythm.',
    actionText: 'Explore pacing patterns'
  },
  
  CHARACTER_DEVELOPMENT: {
    type: 'guidance' as const,
    message: 'Characters are the soul of your story. The relationship web reveals who drives your narrative and who might need deeper development.',
    actionText: 'Strengthen character arcs'
  },
  
  // Upload messages
  UPLOAD_CONFIDENCE: {
    type: 'encouragement' as const,
    message: 'Your manuscript is in expert hands. Our AI analysis provides the objectivity you need without the emotional weight of harsh criticism.',
    actionText: 'Learn about our process'
  },
  
  PAYMENT_SECURITY: {
    type: 'strategy' as const,
    message: 'Investing in professional analysis is investing in your craft. At a fraction of traditional editing costs, you\'re making a smart strategic decision.',
    actionText: 'See cost comparison'
  }
} as const;