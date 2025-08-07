"use client";

/**
 * Scholarly Language Components
 * Reinforces the "Digital Athenaeum" theme with expert coach tone
 */

import { motion } from 'framer-motion';
import { BookOpen, Scroll, Feather, Crown, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ScholarlyHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function ScholarlyHeader({ title, subtitle, icon: Icon = BookOpen, className }: ScholarlyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("text-center space-y-4", className)}
    >
      <div className="flex items-center justify-center space-x-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-12 h-12 bg-charcoal rounded-xl flex items-center justify-center"
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-museo font-bold text-charcoal">
          {title}
        </h1>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-payne max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

interface ScholarlyInsightProps {
  type: 'discovery' | 'guidance' | 'evidence' | 'strategy';
  title: string;
  content: string;
  className?: string;
}

export function ScholarlyInsight({ type, title, content, className }: ScholarlyInsightProps) {
  const config = {
    discovery: {
      icon: Lightbulb,
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      contentColor: 'text-blue-700'
    },
    guidance: {
      icon: Target,
      bgColor: 'from-green-50 to-teal-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      contentColor: 'text-green-700'
    },
    evidence: {
      icon: Scroll,
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      contentColor: 'text-purple-700'
    },
    strategy: {
      icon: Crown,
      bgColor: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      contentColor: 'text-orange-700'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, contentColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(`bg-gradient-to-r ${bgColor} rounded-xl p-4 border ${borderColor}`, className)}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${textColor} mt-0.5 flex-shrink-0`} />
        <div>
          <h4 className={`font-semibold ${textColor} mb-1 text-sm`}>{title}</h4>
          <p className={`${contentColor} text-sm leading-relaxed`}>{content}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface ScholarlyQuoteProps {
  quote: string;
  attribution?: string;
  className?: string;
}

export function ScholarlyQuote({ quote, attribution, className }: ScholarlyQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("relative", className)}
    >
      <Card className="neo-brutal-card bg-gradient-to-r from-vanilla to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Feather className="h-6 w-6 text-tangerine mt-1 flex-shrink-0" />
            <div>
              <blockquote className="text-charcoal italic text-lg leading-relaxed mb-3">
                "{quote}"
              </blockquote>
              {attribution && (
                <cite className="text-payne text-sm font-medium">
                  — {attribution}
                </cite>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ScholarlyProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  className?: string;
}

export function ScholarlyProgress({ currentStep, totalSteps, stepLabels, className }: ScholarlyProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-charcoal">Scholarly Progress</h3>
        <Badge variant="outline" className="text-xs">
          Volume {currentStep} of {totalSteps}
        </Badge>
      </div>
      
      <div className="flex items-center space-x-2">
        {stepLabels.map((label, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: index < currentStep ? 1.1 : index === currentStep ? 1 : 0.8,
                opacity: index <= currentStep ? 1 : 0.5
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                index < currentStep 
                  ? "bg-green-100 border-green-600 text-green-800"
                  : index === currentStep
                  ? "bg-tangerine border-charcoal text-white"
                  : "bg-gray-100 border-gray-300 text-gray-500"
              )}
            >
              {index < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </motion.div>
            {index < stepLabels.length - 1 && (
              <div className={cn(
                "w-8 h-0.5 mx-2",
                index < currentStep ? "bg-green-600" : "bg-gray-300"
              )} />
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-payne">
          Current Phase: <span className="font-medium text-charcoal">{stepLabels[currentStep - 1]}</span>
        </p>
      </div>
    </motion.div>
  );
}