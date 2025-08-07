"use client";

import { motion } from 'framer-motion';
import { Upload, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { CoachingMessage, ExpertTip, COACHING_MESSAGES } from '@/components/ui/expert-coach-copy';

export default function EmptyBookshelf() {
  const router = useRouter();

  const handleFirstUpload = () => {
    router.push('/upload');
  };

  const handleSampleReport = () => {
    router.push('/sample-report');
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="neo-brutal-card text-center">
        <CardHeader className="pb-6">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-tangerine to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 relative"
          >
            <BookOpen className="h-12 w-12 text-white" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </motion.div>

          <CardTitle className="text-3xl font-museo font-bold text-charcoal mb-4">
            Your Athenaeum Awaits New Volumes
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Encouraging Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-payne leading-relaxed max-w-md mx-auto"
          >
            Begin your scholarly journey by adding your first manuscript. Our AI is ready to help you unveil its hidden potential and transform your revision process.
          </motion.p>

          {/* Expert Coaching Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <CoachingMessage
              type={COACHING_MESSAGES.FIRST_UPLOAD.type}
              message={COACHING_MESSAGES.FIRST_UPLOAD.message}
              actionText={COACHING_MESSAGES.FIRST_UPLOAD.actionText}
              className="max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200"
          >
            <h3 className="font-semibold text-blue-800 mb-4">Scholarly Analysis Awaiting Your First Volume:</h3>
            <ul className="space-y-2 text-sm text-blue-700 text-left">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Evidence-based pacing analysis with interactive heatmaps</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Character relationship mapping and development tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Voice distinctiveness analysis and dialogue quality assessment</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>Strategic revision roadmap with prioritized, actionable guidance</span>
              </li>
            </ul>
          </motion.div>

          {/* Expert Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <ExpertTip
              category="analysis"
              tip="Start with your strongest work for your first analysis. This builds confidence and helps you understand how our insights can elevate even good writing to greatness."
              context="Many successful authors use their first analysis as a learning experience to understand our methodology before analyzing works-in-progress."
              className="max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              variant="default"
              className="text-lg px-8 py-4"
              onClick={handleFirstUpload}
            >
              <Upload className="mr-3 h-5 w-5" />
              Curate Your First Volume
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-2 border-charcoal hover:bg-charcoal hover:text-white"
              onClick={handleSampleReport}
            >
              <Star className="mr-3 h-5 w-5" />
              See Sample Analysis
            </Button>
          </motion.div>

          {/* Trust Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-sm text-gray-500"
          >
            Your literary works are protected with scholarly discretion. Bank-level encryption ensures your intellectual property remains secure throughout the analysis process.
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}