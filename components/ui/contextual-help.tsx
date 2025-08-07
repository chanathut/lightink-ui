"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  X, 
  BookOpen, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Target,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Topic data mapping with icons and help content
const HELP_TOPICS = {
  bookshelf: {
    title: 'Your Literary Athenaeum',
    icon: BookOpen,
    description: 'Your manuscript collection and analysis hub',
    content: [
      {
        section: 'Managing Your Collection',
        points: [
          'Upload new manuscripts using "Curate a New Volume"',
          'Track analysis status for each manuscript',
          'Access completed analyses through "Open in Studio"',
          'Organize manuscripts with search and sorting tools'
        ]
      },
      {
        section: 'Manuscript Status Guide',
        points: [
          '✨ Insights Unveiled: Analysis complete, ready to explore',
          '🔍 Under Scrutiny: Analysis in progress, results coming soon',
          '⏳ Awaiting Wisdom: Ready for analysis, select a plan to begin'
        ]
      }
    ]
  },
  overview: {
    title: 'Manuscript Overview',
    icon: BarChart3,
    description: 'High-level insights and summary scores',
    content: [
      {
        section: 'Understanding Your Scores',
        points: [
          'Overall Score: Comprehensive assessment of your manuscript',
          'Individual metrics: Pacing, Characters, Dialogue, Themes',
          'Strengths: What\'s working well in your story',
          'Improvements: Strategic opportunities for enhancement'
        ]
      },
      {
        section: 'Using Overview Data',
        points: [
          'Start with the highest-impact improvement areas',
          'Celebrate your strengths and build upon them',
          'Use scores to track progress across revisions'
        ]
      }
    ]
  },
  pacing: {
    title: 'Pacing Analysis',
    icon: TrendingUp,
    description: 'Narrative rhythm and tension analysis',
    content: [
      {
        section: 'Reading the Heatmap',
        points: [
          'Red areas: High tension and fast pacing',
          'Blue areas: Slower pacing, character development',
          'Green areas: Balanced engagement levels',
          'Click sections for detailed chapter insights'
        ]
      },
      {
        section: 'Strategic Application',
        points: [
          'Identify chapters that may drag or feel rushed',
          'Balance action scenes with quieter moments',
          'Ensure your climax maintains peak engagement',
          'Use pacing to control reader emotional journey'
        ]
      }
    ]
  },
  characters: {
    title: 'Character Analysis',
    icon: Users,
    description: 'Character development and interaction patterns',
    content: [
      {
        section: 'Character Network',
        points: [
          'Node size indicates character importance',
          'Connection lines show relationship strength',
          'Colors represent relationship types (conflict, alliance, romance)',
          'Click characters for detailed development scores'
        ]
      },
      {
        section: 'Development Insights',
        points: [
          'Strengthen weak character connections',
          'Develop clear arcs for supporting characters',
          'Ensure dialogue reflects character personality',
          'Balance screen time across your cast'
        ]
      }
    ]
  },
  dialogue: {
    title: 'Dialogue & Prose',
    icon: MessageCircle,
    description: 'Voice analysis and writing style insights',
    content: [
      {
        section: 'Voice Analysis',
        points: [
          'Voice Distinctiveness: How unique each character sounds',
          'Natural Flow: How authentic conversations feel',
          'Purpose & Function: How dialogue serves plot/character',
          'Tag Usage: Balance of dialogue tags and action beats'
        ]
      },
      {
        section: 'Improvement Strategies',
        points: [
          'Give each character unique speech patterns',
          'Read dialogue aloud to test naturalness',
          'Ensure every line serves a purpose',
          'Vary sentence structure and rhythm'
        ]
      }
    ]
  },
  themes: {
    title: 'Thematic Analysis',
    icon: BookOpen,
    description: 'Thematic resonance and consistency',
    content: [
      {
        section: 'Theme Strength',
        points: [
          'Strength: How powerfully themes are expressed',
          'Consistency: How well themes are maintained',
          'Integration: How themes connect to plot and character',
          'Resonance: How themes impact reader experience'
        ]
      },
      {
        section: 'Strengthening Themes',
        points: [
          'Weave themes through character actions',
          'Use symbolic elements and settings',
          'Reinforce themes in dialogue and internal thoughts',
          'Ensure plot events reflect thematic messages'
        ]
      }
    ]
  },
  roadmap: {
    title: 'Revision Roadmap',
    icon: Target,
    description: 'Prioritized action plan for improvement',
    content: [
      {
        section: 'Priority System',
        points: [
          'Priority 1: Highest impact, focus here first',
          'Priority 2: Significant improvements, tackle next',
          'Priority 3: Polish and refinement items',
          'Impact vs Effort: Strategic guidance for time investment'
        ]
      },
      {
        section: 'Implementation Strategy',
        points: [
          'Work on one priority level at a time',
          'Check off completed actions to track progress',
          'Focus on structural issues before line editing',
          'Use roadmap as your revision compass'
        ]
      }
    ]
  }
} as const;

interface ContextualHelpProps {
  topic: keyof typeof HELP_TOPICS;
  className?: string;
}

export default function ContextualHelp({ topic, className }: ContextualHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get topic data with fallback
  const topicData = HELP_TOPICS[topic];
  
  if (!topicData) {
    // Graceful fallback for unknown topics
    console.warn(`ContextualHelp: Unknown topic "${topic}"`);
    return null;
  }

  const Icon = topicData.icon;

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-payne hover:text-charcoal transition-colors"
        aria-label={`Get help about ${topicData.title}`}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Help Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
            >
              <Card className="neo-brutal-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-museo">{topicData.title}</CardTitle>
                        <CardDescription>{topicData.description}</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-payne hover:text-charcoal"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {topicData.content.map((section, index) => (
                    <motion.div
                      key={section.section}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-blue-600" />
                        {section.section}
                      </h4>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-tangerine rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-payne leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 italic">
                      💡 <strong>Expert Tip:</strong> Use these insights as evidence for your revision strategy. 
                      Every data point is designed to help you make informed decisions about your manuscript.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}