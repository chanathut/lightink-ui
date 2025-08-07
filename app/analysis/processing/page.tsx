"use client";

import React, { useState, useEffect } from 'react'; // FIX: Added the missing React import
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  BarChart3, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Target,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const analysisSteps = [
  { 
    id: 1, 
    name: 'Parsing manuscript structure', 
    icon: FileText, 
    duration: 1500,
    description: 'Reading your manuscript and identifying key structural elements'
  },
  { 
    id: 2, 
    name: 'Analyzing narrative pacing', 
    icon: BarChart3, 
    duration: 2000,
    description: 'Mapping tension curves and identifying pacing patterns'
  },
  { 
    id: 3, 
    name: 'Mapping character relationships', 
    icon: Users, 
    duration: 1800,
    description: 'Discovering character interactions and development arcs'
  },
  { 
    id: 4, 
    name: 'Evaluating dialogue quality', 
    icon: MessageCircle, 
    duration: 1600,
    description: 'Assessing voice distinctiveness and conversation flow'
  },
  { 
    id: 5, 
    name: 'Identifying thematic elements', 
    icon: BookOpen, 
    duration: 1400,
    description: 'Uncovering deeper meanings and thematic consistency'
  },
  { 
    id: 6, 
    name: 'Generating revision roadmap', 
    icon: Target, 
    duration: 2200,
    description: 'Creating your personalized strategic improvement plan'
  }
];

export default function AnalysisProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let stepIndex = 0;
    let totalProgress = 0;

    const processSteps = async () => {
      for (const step of analysisSteps) {
        setCurrentStep(stepIndex);
        
        // Simulate step processing with gradual progress
        const stepProgress = (stepIndex / analysisSteps.length) * 100;
        const nextStepProgress = ((stepIndex + 1) / analysisSteps.length) * 100;
        
        // Animate progress for this step
        const progressInterval = setInterval(() => {
          totalProgress += 1;
          if (totalProgress >= nextStepProgress) {
            clearInterval(progressInterval);
          }
          setProgress(Math.min(totalProgress, nextStepProgress));
        }, step.duration / (nextStepProgress - stepProgress));

        await new Promise(resolve => setTimeout(resolve, step.duration));
        stepIndex++;
      }

      setIsComplete(true);
      setProgress(100);

      // Redirect to bookshelf after completion
      setTimeout(() => {
        router.push('/bookshelf?analysis=complete');
      }, 2000);
    };

    processSteps();
  }, [router]);

  return (
    <div className="min-h-screen seamless-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="neo-brutal-card">
            <CardHeader className="text-center pb-6">
              <motion.div
                animate={{ 
                  rotate: isComplete ? 0 : 360,
                  scale: isComplete ? 1.1 : 1
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: isComplete ? 0 : Infinity, ease: "linear" },
                  scale: { duration: 0.3 }
                }}
                className="w-20 h-20 mx-auto mb-6 relative"
              >
                {isComplete ? (
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                ) : (
                  <div className="w-20 h-20 border-4 border-tangerine border-t-transparent rounded-full" />
                )}
                
                {!isComplete && (
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
                )}
              </motion.div>

              <CardTitle className="text-3xl font-museo font-bold text-charcoal mb-4">
                {isComplete ? 'Analysis Complete!' : 'Analyzing Your Manuscript'}
              </CardTitle>
              <CardDescription className="text-lg text-paynes-gray">
                {isComplete 
                  ? 'Your comprehensive analysis is ready. Redirecting to your bookshelf...'
                  : 'Our AI is examining your work with professional-grade depth'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal">Analysis Progress</span>
                  <span className="text-sm text-paynes-gray">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Current Step Display */}
              {!isComplete && currentStep < analysisSteps.length && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      {React.createElement(analysisSteps[currentStep].icon, {
                        className: "h-6 w-6 text-white"
                      })}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-800 capitalize">
                        {analysisSteps[currentStep].name}
                      </h3>
                      <p className="text-sm text-blue-700">
                        {analysisSteps[currentStep].description}
                      </p>
                    </div>
                    <Badge className="bg-blue-600 text-white">
                      Step {currentStep + 1}
                    </Badge>
                  </div>
                </motion.div>
              )}

              {/* Completed Steps */}
              <div className="space-y-3">
                <h4 className="font-semibold text-charcoal">Analysis Progress</h4>
                <div className="space-y-2">
                  {analysisSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < currentStep || isComplete;
                    const isCurrent = index === currentStep && !isComplete;
                    
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isCompleted 
                            ? 'bg-green-50 border border-green-200' 
                            : isCurrent 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-600' 
                            : isCurrent 
                            ? 'bg-blue-600' 
                            : 'bg-gray-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <Icon className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className={`text-sm font-medium capitalize ${
                          isCompleted 
                            ? 'text-green-800' 
                            : isCurrent 
                            ? 'text-blue-800' 
                            : 'text-gray-600'
                        }`}>
                          {step.name}
                        </span>
                        {isCurrent && (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-auto"
                          >
                            <Clock className="h-4 w-4 text-blue-600" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Completion Message */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 text-center"
                >
                  <h3 className="font-semibold text-green-800 mb-2">
                    Your Analysis is Complete!
                  </h3>
                  <p className="text-green-700 text-sm mb-4">
                    Your comprehensive manuscript analysis and revision roadmap are now ready. 
                    You'll be redirected to your bookshelf momentarily.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">Redirecting to your literary collection...</span>
                  </div>
                </motion.div>
              )}

              {/* Educational Content During Wait */}
              {!isComplete && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3">
                    Did You Know?
                  </h4>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Our AI analyzes over 50 different aspects of your manuscript to provide 
                    comprehensive feedback that would normally take weeks to get from human editors. 
                    This includes narrative structure, character development, dialogue patterns, 
                    and thematic consistency.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
