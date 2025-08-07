"use client";

import { motion } from 'framer-motion';
import { Sparkles, Search, Clock, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ManuscriptStatusGuideProps {
  className?: string;
}

const statusGuide = [
  {
    status: 'insights-unveiled',
    label: 'Insights Unveiled',
    icon: Sparkles,
    color: 'bg-green-100 text-green-800 border-2 border-green-600',
    description: 'Your manuscript\'s analysis is complete and ready for exploration.',
    guidance: 'Click "Open in Studio" to explore your comprehensive Revision Roadmap and data-driven insights. Your literary work has been transformed into actionable intelligence.',
    nextSteps: [
      'Review your personalized Revision Roadmap',
      'Explore interactive visualizations',
      'Download your professional PDF report',
      'Begin implementing priority improvements'
    ]
  },
  {
    status: 'under-scrutiny',
    label: 'Under Scrutiny',
    icon: Search,
    color: 'bg-blue-100 text-blue-800 border-2 border-blue-600',
    description: 'Our AI scholars are conducting rigorous analysis of your manuscript.',
    guidance: 'Your work is receiving the attention it deserves. Our analysis engine is examining structure, pacing, character development, and thematic elements with professional precision.',
    nextSteps: [
      'Analysis typically completes within 5-10 minutes',
      'You\'ll receive an email notification when ready',
      'Check back here for real-time status updates',
      'Prepare to discover your story\'s hidden potential'
    ]
  },
  {
    status: 'awaiting-wisdom',
    label: 'Awaiting Your Wisdom',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800 border-2 border-yellow-600',
    description: 'Your manuscript is catalogued and ready for scholarly analysis.',
    guidance: 'This folio awaits your decision to begin its transformation. Select an analysis tier that matches your manuscript\'s needs and your revision goals.',
    nextSteps: [
      'Choose your preferred analysis tier',
      'Complete secure payment processing',
      'Begin the analysis journey',
      'Receive insights within minutes'
    ]
  }
];

export default function ManuscriptStatusGuide({ className }: ManuscriptStatusGuideProps) {
  return (
    <div className={className}>
      <Card className="neo-brutal-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-museo text-charcoal flex items-center justify-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span>Manuscript Status Guide</span>
          </CardTitle>
          <CardDescription className="text-base">
            Understanding your manuscript's journey through the analysis process
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {statusGuide.map((guide, index) => {
            const Icon = guide.icon;
            
            return (
              <motion.div
                key={guide.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-full border-2 border-charcoal flex items-center justify-center">
                      <Icon className="h-6 w-6 text-charcoal" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <Badge className={guide.color}>
                        {guide.label}
                      </Badge>
                      <h3 className="font-semibold text-charcoal mt-2 mb-1">
                        {guide.description}
                      </h3>
                      <p className="text-payne text-sm leading-relaxed">
                        {guide.guidance}
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-charcoal text-sm mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        What to expect:
                      </h4>
                      <ul className="space-y-1">
                        {guide.nextSteps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-xs text-payne flex items-start">
                            <span className="w-1.5 h-1.5 bg-tangerine rounded-full mt-2 mr-2 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-orange-800 font-medium text-sm mb-1">Privacy & Security</p>
                <p className="text-orange-700 text-xs leading-relaxed">
                  Your manuscripts are encrypted and secure throughout the analysis process. 
                  Files are automatically deleted after analysis completion, ensuring your intellectual property remains protected.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}