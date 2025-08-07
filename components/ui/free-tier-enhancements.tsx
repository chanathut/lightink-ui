"use client";

import { motion } from 'framer-motion';
import { Lock, Star, ArrowRight, Zap, BarChart3, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

interface FreeTierLimitationProps {
  feature: string;
  description: string;
  upgradeMessage: string;
  className?: string;
}

export function FreeTierLimitation({ 
  feature, 
  description, 
  upgradeMessage, 
  className 
}: FreeTierLimitationProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-4 relative ${className}`}
    >
      {/* Lock Overlay */}
      <div className="absolute top-2 right-2">
        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
          <Lock className="h-3 w-3 text-white" />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-600 mb-1">{feature}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 mb-2">{upgradeMessage}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/#pricing')}
            className="border-tangerine text-tangerine hover:bg-tangerine hover:text-white"
          >
            <Star className="mr-2 h-3 w-3" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface FreeTierValueProps {
  analysisData: any;
  className?: string;
}

export function FreeTierValue({ analysisData, className }: FreeTierValueProps) {
  const router = useRouter();

  return (
    <Card className={`neo-brutal-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-800">
          <Star className="h-5 w-5" />
          <span>Your Free Analysis Results</span>
        </CardTitle>
        <CardDescription className="text-green-700">
          Here's what we discovered about your manuscript
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Insights */}
        <div className="space-y-3">
          <h4 className="font-semibold text-green-800">Key Insights:</h4>
          <div className="bg-white p-4 rounded-xl border border-green-200">
            <p className="text-green-700 text-sm leading-relaxed">
              Your manuscript shows strong potential with a compelling opening and clear character voice. 
              The narrative structure follows traditional storytelling patterns effectively.
            </p>
          </div>
        </div>

        {/* Limited Roadmap */}
        <div className="space-y-3">
          <h4 className="font-semibold text-green-800">Priority Recommendations:</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-sm text-green-700">
                Focus on strengthening character motivations in the middle chapters
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm text-green-700">
                Consider adding more conflict to maintain reader engagement
              </span>
            </div>
          </div>
        </div>

        {/* Upgrade Teaser */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border-2 border-orange-200">
          <div className="flex items-start space-x-3">
            <Zap className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h5 className="font-semibold text-orange-800 mb-2">Unlock the Complete Picture</h5>
              <p className="text-orange-700 text-sm mb-3">
                This free analysis shows just 20% of what we discovered. Pro Analysis reveals:
              </p>
              <ul className="space-y-1 text-sm text-orange-700 mb-4">
                <li>• Interactive pacing heatmap with scene-by-scene breakdown</li>
                <li>• Character relationship network and development tracking</li>
                <li>• Detailed dialogue analysis and voice coaching</li>
                <li>• Complete 10-point revision roadmap</li>
              </ul>
              <Button
                variant="default"
                size="sm"
                onClick={() => router.push('/#pricing')}
                className="w-full"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                See Full Analysis - $24/month
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Word count limitation component for free tier
export function WordCountLimitation({ 
  currentWordCount, 
  limit = 10000 
}: { 
  currentWordCount: number; 
  limit?: number; 
}) {
  const router = useRouter();
  const percentage = Math.min((currentWordCount / limit) * 100, 100);
  const isOverLimit = currentWordCount > limit;

  if (currentWordCount <= limit) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl"
    >
      <div className="flex items-start space-x-3">
        <Lock className="h-5 w-5 text-yellow-600 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-yellow-800 mb-2">Word Count Limit Reached</h4>
          <p className="text-yellow-700 text-sm mb-3">
            Your manuscript has {currentWordCount.toLocaleString()} words, but the Free Analysis 
            is limited to {limit.toLocaleString()} words. We'll analyze the first {limit.toLocaleString()} words.
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-700">Analysis Coverage:</span>
              <span className="font-medium text-yellow-800">
                {Math.round((limit / currentWordCount) * 100)}%
              </span>
            </div>
            <Progress value={(limit / currentWordCount) * 100} className="h-2" />
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={() => router.push('/#pricing')}
            className="w-full"
          >
            <Zap className="mr-2 h-4 w-4" />
            Upgrade for Full Analysis
          </Button>
        </div>
      </div>
    </motion.div>
  );
}