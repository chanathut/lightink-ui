"use client";

import AnalysisDashboard from '@/components/AnalysisDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Enhanced mock data for the sample report
const sampleAnalysisData = {
  id: 'sample-analysis-demo',
  manuscript: {
    title: 'The Digital Athenaeum (Sample)',
    wordCount: 75000,
    author: 'Demo Author',
    uploadedAt: '2024-01-15T10:30:00Z'
  },
  plan: 'pro',
  email: 'demo@example.com',
  completedAt: '2024-01-15T10:38:00Z',
  status: 'completed',
  analysisData: {
    overallScore: 82,
    pacingScore: 78,
    characterScore: 85,
    dialogueScore: 73,
    themeScore: 80,
    strengths: [
      'Strong protagonist development with clear goals',
      'Excellent opening hook that draws readers in',
      'Consistent thematic elements throughout',
      'Engaging climax sequence with high tension'
    ],
    improvements: [
      'Mid-story pacing lag in Chapter 4 needs attention',
      'Supporting character depth could be enhanced',
      'Dialogue differentiation between characters',
      'Subplot resolution pacing requires refinement'
    ]
  }
};

export default function SampleReportPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-azure to-vanilla">
      {/* Sample Report Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-4 border-charcoal">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/')}
                className="border-2 border-charcoal hover:bg-charcoal hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <div>
                <h1 className="text-2xl font-museo font-bold text-charcoal">
                  Sample Analysis Report
                </h1>
                <p className="text-payne">
                  Explore what your manuscript analysis could look like
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 border-2 border-blue-600 rounded-xl px-4 py-2 flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Demo Report</span>
              </div>
              
              <Button 
                variant="default"
                onClick={() => router.push('/upload')}
                className=""
              >
                Analyze Your Manuscript
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sample Analysis Dashboard */}
      <AnalysisDashboard data={sampleAnalysisData} />
    </div>
  );
}