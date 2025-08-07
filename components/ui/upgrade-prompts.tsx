"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Zap, 
  Star, 
  ArrowRight, 
  X, 
  Check, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface UpgradePromptProps {
  currentPlan: 'free' | 'pro'; // Removed 'premium' as it has no upgrade path
  context: 'bookshelf' | 'studio' | 'dashboard';
  manuscriptCount?: number;
  onDismiss?: () => void;
  className?: string;
}

// FIX 1: The object is now correctly defined as a constant outside the component.
// It was also renamed from the faulty "StudioUpgradePrompt" function to "upgradeReasons".
const upgradeReasons = {
  free: {
    targetPlan: 'pro',
    icon: Zap,
    color: 'from-orange-400 to-red-500',
    benefits: [
      'Analyze manuscripts up to 100,000 words',
      'Interactive pacing heatmaps and visualizations',
      'Complete character relationship mapping',
      'Comprehensive revision roadmap',
      '30-day access to results (vs 3 days)',
      'Email support'
    ],
    savings: 'Save $4,500+ vs traditional developmental editing',
    cta: 'Upgrade to Pro Analysis'
  },
  pro: {
    targetPlan: 'premium',
    icon: Crown,
    color: 'from-purple-400 to-indigo-500',
    benefits: [
      'Unlimited word count analysis',
      'Compare up to 3 manuscripts',
      'Genre-specific insights and recommendations',
      'Market readiness assessment',
      'Priority AI processing',
      '90-day access to results',
      'Unlimited re-analysis'
    ],
    savings: 'Professional-grade insights for serious authors',
    cta: 'Upgrade to Premium Workshop'
  }
};

const contextualMessages = {
  bookshelf: {
    free: "Your collection is growing! Unlock advanced analysis for all your manuscripts with Pro.",
    pro: "Ready for professional-level insights? Premium offers unlimited analysis and comparison tools."
  },
  studio: {
    free: "This analysis shows just a glimpse of what's possible. Unlock the full picture with Pro.",
    pro: "Take your analysis to the next level with Premium's genre-specific insights and market readiness assessment."
  },
  dashboard: {
    free: "You've experienced the power of AI analysis. Ready for the complete professional experience?",
    pro: "Your writing journey is advancing. Premium features can accelerate your growth even further."
  }
};

export default function UpgradePrompt({ 
  currentPlan, 
  context, 
  manuscriptCount = 0, 
  onDismiss, 
  className 
}: UpgradePromptProps) {
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show upgrade prompt for premium users
  if (currentPlan === 'premium' || isDismissed) {
    return null;
  }

  // FIX 2: This line now works because `upgradeReasons` is a valid, defined constant.
  const upgradeInfo = upgradeReasons[currentPlan];
  const Icon = upgradeInfo.icon;
  const contextMessage = contextualMessages[context][currentPlan];

  const handleUpgrade = () => {
    router.push('/#pricing');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        <Card className="neo-brutal-card bg-gradient-to-r from-orange-50 to-yellow-50 border-tangerine relative overflow-hidden">
          {/* Dismiss Button */}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="absolute top-2 right-2 z-10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Sparkle Animation */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-4 left-4"
          >
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </motion.div>

          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${upgradeInfo.color} flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-museo text-charcoal">
                  {upgradeInfo.cta}
                </CardTitle>
                <CardDescription className="text-orange-700">
                  {contextMessage}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {upgradeInfo.benefits.slice(0, 4).map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-orange-800">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Savings Message */}
            <div className="bg-white/70 p-3 rounded-lg border border-orange-200">
              <p className="text-sm font-medium text-orange-800 text-center">
                {upgradeInfo.savings}
              </p>
            </div>

            {/* CTA Button */}
            <Button
              variant="default"
              className="w-full"
              onClick={handleUpgrade}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              {upgradeInfo.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
