"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, ArrowLeft, BarChart3, Users, MessageCircle, 
  BookOpen, Target, Star, TrendingUp, AlertCircle, CheckCircle2,
  Calendar, Clock, Share2, Shield, Lock, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import StudioNav from '@/components/studio/StudioNav';
import { PacingHeatmap, CharacterNetwork } from '@/components/studio/visualizations';
import ContextualHelp from '@/components/ui/contextual-help';
import AnalysisFeedback from '@/components/ui/analysis-feedback';
// FIX: Changed the import from `{ StudioUpgradePrompt }` to the default export `UpgradePrompt`.
import UpgradePrompt from '@/components/ui/upgrade-prompts';
import { FreeTierValue, FreeTierLimitation } from '@/components/ui/free-tier-enhancements';

interface AnalysisDashboardProps {
  data: any;
}

// Mock analysis data for demonstration
const mockPacingData = [
  { chapter: 'Ch 1', tension: 65, pacing: 70, engagement: 80 },
  { chapter: 'Ch 2', tension: 45, pacing: 60, engagement: 55 },
  { chapter: 'Ch 3', tension: 80, pacing: 85, engagement: 90 },
  { chapter: 'Ch 4', tension: 30, pacing: 40, engagement: 35 },
  { chapter: 'Ch 5', tension: 90, pacing: 95, engagement: 85 },
  { chapter: 'Ch 6', tension: 75, pacing: 80, engagement: 75 },
  { chapter: 'Ch 7', tension: 85, pacing: 90, engagement: 95 },
];

const mockCharacterData = [
  { character: 'protagonist', interactions: 45, development: 85, dialogue: 75 },
  { character: 'antagonist', interactions: 25, development: 70, dialogue: 80 },
  { character: 'supporting', interactions: 35, development: 60, dialogue: 65 },
  { character: 'minor', interactions: 15, development: 40, dialogue: 45 },
];

const mockThemeData = [
  { theme: 'Love', strength: 85, consistency: 90 },
  { theme: 'Betrayal', strength: 75, consistency: 80 },
  { theme: 'Redemption', strength: 65, consistency: 70 },
  { theme: 'Sacrifice', strength: 55, consistency: 60 },
  { theme: 'Identity', strength: 70, consistency: 75 },
];

const revisionRoadmap = [
  {
    priority: 1,
    category: 'Pacing',
    issue: 'Chapter 4 Pacing Slowdown',
    description: 'Chapter 4 shows a significant drop in narrative tension and reader engagement. Consider adding conflict or cutting exposition.',
    impact: 'High',
    effort: 'Medium',
    suggestions: [
      'Add a subplot conflict to maintain tension',
      'Cut 20-30% of exposition',
      'Introduce a plot twist or revelation'
    ]
  },
  {
    priority: 2,
    category: 'Character Development',
    issue: 'Supporting Character Arc',
    description: 'Supporting characters need stronger individual arcs and more distinctive dialogue patterns.',
    impact: 'Medium',
    effort: 'High',
    suggestions: [
      'Develop unique voice for each supporting character',
      'Add character-specific goals and obstacles',
      'Increase meaningful interactions with protagonist'
    ]
  },
  {
    priority: 3,
    category: 'Theme',
    issue: 'Thematic Consistency',
    description: 'Some themes like "Sacrifice" and "Identity" could be woven more consistently throughout the narrative.',
    impact: 'Medium',
    effort: 'Medium',
    suggestions: [
      'Add subtle thematic callbacks in dialogue',
      'Strengthen symbolic elements',
      'Ensure character actions align with themes'
    ]
  }
];

export default function AnalysisDashboard({ data }: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [completedActions, setCompletedActions] = useState<{[key: string]: boolean}>({});
  const currentPlan = data.plan || 'free';
  
  const handleActionToggle = (roadmapIndex: number, suggestionIndex: number) => {
    const key = `${roadmapIndex}-${suggestionIndex}`;
    setCompletedActions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExportPDF = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('PDF generated successfully!');
        }, 2000);
      }),
      {
        loading: 'Generating your PDF report...',
        success: 'PDF report downloaded successfully!',
        error: 'Failed to generate PDF. Please try again.',
      }
    );
  };

  const handleShare = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Report link copied to clipboard!');
      }).catch(() => {
        toast.error('Failed to copy link. Please try again.');
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Report link copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy link. Please try again.');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-azure-light to-vanilla">
      {/* Header */}
      <header className="bg-white border-b-4 border-charcoal shadow-lg relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Section - Navigation and Title */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.history.back()}
                className="flex-shrink-0 border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              
              <Separator orientation="vertical" className="h-8 bg-gray-300 hidden sm:block" />
              
              <div className="min-w-0 flex-1">
                <h1 className="text-xl lg:text-2xl font-museo font-bold text-charcoal truncate">
                  Analysis Report: {data.manuscript.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                  <div className="flex items-center space-x-2 text-sm text-paynes-gray">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">
                      {data.manuscript.wordCount.toLocaleString()} words
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-4 bg-gray-300 hidden sm:block" />
                  <div className="flex items-center space-x-2 text-sm text-paynes-gray">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>
                      Completed {new Date(data.completedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 flex-shrink-0 text-blue-600" />
                    <span className="text-blue-700 font-medium">
                      Analysis took 8 minutes
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Section - Status and Actions */}
            <div className="flex items-center justify-between lg:justify-end space-x-3 flex-shrink-0">
              {/* Status Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Badge className="bg-green-100 text-green-800 border-2 border-green-600 px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Analysis Complete
                </Badge>
              </motion.div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleShare}
                  className="border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all duration-200"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button 
                  variant="default"
                  className="text-sm px-4 py-2"
                  onClick={handleExportPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 h-1 bg-gradient-to-r from-tangerine to-orange-400 rounded-full"
          />
        </div>
      </header>

      {/* Main Studio Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Navigation Sidebar */}
        <StudioNav 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          className="h-full"
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8">
            {/* Upgrade Prompt for Free/Pro Users */}
            {(currentPlan === 'free' || currentPlan === 'pro') && (
              <UpgradePrompt currentPlan={currentPlan} context="studio" />
            )}

            {/* Mobile Content Header */}
            <div className="lg:hidden mb-6 ml-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl lg:text-2xl font-museo font-bold text-charcoal capitalize">
                    {activeTab === 'roadmap' ? 'Revision Roadmap' : activeTab}
                  </h2>
                  <p className="text-paynes-gray text-sm">
                    {activeTab === 'overview' && 'High-level manuscript insights and summary'}
                    {activeTab === 'pacing' && 'Narrative rhythm and tension analysis'}
                    {activeTab === 'characters' && 'Character development and interaction patterns'}
                    {activeTab === 'dialogue' && 'Voice analysis and writing style insights'}
                    {activeTab === 'themes' && 'Thematic resonance and consistency'}
                    {activeTab === 'roadmap' && 'Prioritized action plan for improvement'}
                  </p>
                </div>
                <ContextualHelp topic={activeTab as any} />
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
              {/* Free Tier Special Display */}
              {currentPlan === 'free' && (
                <FreeTierValue analysisData={data.analysisData} className="mb-8" />
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-paynes-gray italic">Discover the evidence behind your story's foundation</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
              >
                <Card className="neo-brutal-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-1">Overall Score</h3>
                    <p className="text-2xl font-bold text-charcoal">82/100</p>
                    <p className="text-sm text-paynes-gray">Strong Foundation</p>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-1">Pacing</h3>
                    <p className="text-2xl font-bold text-charcoal">78/100</p>
                    <p className="text-sm text-paynes-gray">Good Rhythm</p>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-1">Characters</h3>
                    <p className="text-2xl font-bold text-charcoal">85/100</p>
                    <p className="text-sm text-paynes-gray">Well Developed</p>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-charcoal mb-1">Dialogue</h3>
                    <p className="text-2xl font-bold text-charcoal">73/100</p>
                    <p className="text-sm text-paynes-gray">Room for Growth</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Strengths</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-paynes-gray">Strong protagonist development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-paynes-gray">Excellent opening hook</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-paynes-gray">Consistent thematic elements</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-paynes-gray">Engaging climax sequence</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span>Areas for Improvement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-paynes-gray">Mid-story pacing lag (Chapter 4)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-paynes-gray">Supporting character depth</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-paynes-gray">Dialogue differentiation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-paynes-gray">Subplot resolution pacing</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Feedback */}
              <AnalysisFeedback 
                analysisId={data.id} 
                analysisType="overview"
                className="mt-8"
              />
              </motion.div>
            )}

            {/* Pacing Analysis Tab */}
            {activeTab === 'pacing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
              {/* Free Tier Limitation */}
              {currentPlan === 'free' && (
                <FreeTierLimitation
                  feature="Interactive Pacing Heatmap"
                  description="Free analysis provides basic pacing overview only"
                  upgradeMessage="Unlock scene-by-scene pacing breakdown with interactive heatmap visualization"
                  className="mb-6"
                />
              )}

              {/* Advanced Pacing Heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-paynes-gray italic">Pacing Evidence: Uncover the rhythm and flow of your narrative</p>
              </motion.div>
              {currentPlan !== 'free' ? (
                <PacingHeatmap />
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-gray-300">
                  <p className="text-gray-600">Interactive pacing visualization available in Pro Analysis</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">Pacing Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 lg:space-y-4">
                    <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
                      <h4 className="font-semibold text-red-800 text-sm lg:text-base">Chapter 4 Slowdown</h4>
                      <p className="text-red-700 text-sm">
                        Significant drop in tension and engagement. Consider adding conflict or reducing exposition.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r">
                      <h4 className="font-semibold text-green-800">Strong Climax</h4>
                      <p className="text-green-700 text-sm">
                        Chapters 5-7 maintain excellent tension and pacing through the climax.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                      <h4 className="font-semibold text-blue-800">Opening Hook</h4>
                      <p className="text-blue-700 text-sm">
                        Chapter 1 successfully establishes tension and draws readers in.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle className="text-lg lg:text-xl">Scene Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Opening Scene', 'Inciting Incident', 'First Plot Point', 'Midpoint', 'Climax', 'Resolution'].map((scene, index) => (
                        <div key={scene} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded gap-2">
                          <span className="font-medium text-sm lg:text-base">{scene}</span>
                          <div className="flex items-center space-x-2 justify-end">
                            <Progress value={75 + Math.random() * 20} className="w-16 lg:w-20" />
                            <span className="text-sm text-paynes-gray">{Math.floor(75 + Math.random() * 20)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Feedback */}
              <AnalysisFeedback 
                analysisId={data.id} 
                analysisType="pacing"
                className="mt-8"
              />
              </motion.div>
            )}

            {/* Characters Tab */}
            {activeTab === 'characters' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
              {/* Free Tier Limitation */}
              {currentPlan === 'free' && (
                <FreeTierLimitation
                  feature="Character Relationship Network"
                  description="Free analysis provides basic character assessment only"
                  upgradeMessage="Unlock interactive character network mapping and development tracking"
                  className="mb-6"
                />
              )}

              {/* Advanced Character Network */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-paynes-gray italic">Character Evidence: Explore the relationships that drive your story</p>
              </motion.div>
              {currentPlan !== 'free' ? (
                <CharacterNetwork />
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-gray-300">
                  <p className="text-gray-600">Interactive character network available in Pro Analysis</p>
                </div>
              )}
              
              {/* Additional Character Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle>Character Development Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={mockCharacterData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="character" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar name="Interactions" dataKey="interactions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                          <Radar name="Development" dataKey="development" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                          <Radar name="Dialogue" dataKey="dialogue" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle>Character Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-2">Protagonist Analysis</h4>
                      <p className="text-blue-700 text-sm mb-3">
                        Strong character development with clear goals and compelling internal conflict. 
                        Voice is distinctive and consistent throughout.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-800">85</p>
                          <p className="text-xs text-blue-600">Development</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-800">90</p>
                          <p className="text-xs text-blue-600">Voice</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-800">80</p>
                          <p className="text-xs text-blue-600">Arc</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <h4 className="font-semibold text-yellow-800 mb-2">Supporting Cast</h4>
                      <p className="text-yellow-700 text-sm">
                        Supporting characters need stronger individual arcs. Consider giving each 
                        a specific goal that intersects with the main plot.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Feedback */}
              <AnalysisFeedback 
                analysisId={data.id} 
                analysisType="characters"
                className="mt-8"
              />
              </motion.div>
            )}

            {/* Dialogue Tab */}
            {activeTab === 'dialogue' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
              {/* Free Tier Limitation */}
              {currentPlan === 'free' && (
                <FreeTierLimitation
                  feature="Dialogue Quality Assessment"
                  description="Free analysis provides basic dialogue overview only"
                  upgradeMessage="Unlock voice distinctiveness analysis and conversation flow assessment"
                  className="mb-6"
                />
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-paynes-gray italic">Dialogue Evidence: Discover the voices that bring your characters to life</p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle>Dialogue Quality Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Voice Distinctiveness</span>
                        <span className="text-sm text-paynes-gray">75%</span>
                      </div>
                      <Progress value={75} />
                      <p className="text-xs text-paynes-gray mt-1">Characters have moderately distinct voices</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Natural Flow</span>
                        <span className="text-sm text-paynes-gray">82%</span>
                      </div>
                      <Progress value={82} />
                      <p className="text-xs text-paynes-gray mt-1">Conversations feel authentic and natural</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Purpose & Function</span>
                        <span className="text-sm text-paynes-gray">78%</span>
                      </div>
                      <Progress value={78} />
                      <p className="text-xs text-paynes-gray mt-1">Dialogue serves plot and character development</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Tag Usage</span>
                        <span className="text-sm text-paynes-gray">85%</span>
                      </div>
                      <Progress value={85} />
                      <p className="text-xs text-paynes-gray mt-1">Good balance of tags and action beats</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle>Character Voice Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r">
                      <h5 className="font-semibold text-green-800">Protagonist</h5>
                      <p className="text-green-700 text-sm">
                        Clear, consistent voice with good emotional range. Uses contractions naturally.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                      <h5 className="font-semibold text-yellow-800">Antagonist</h5>
                      <p className="text-yellow-700 text-sm">
                        Distinct from protagonist but could use more unique verbal patterns.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r">
                      <h5 className="font-semibold text-red-800">Supporting Characters</h5>
                      <p className="text-red-700 text-sm">
                        Often sound too similar to each other. Consider unique speech patterns.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Feedback */}
              <AnalysisFeedback 
                analysisId={data.id} 
                analysisType="dialogue"
                className="mt-8"
              />
              </motion.div>
            )}

            {/* Themes Tab */}
            {activeTab === 'themes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
              {/* Free Tier Limitation */}
              {currentPlan === 'free' && (
                <FreeTierLimitation
                  feature="Advanced Thematic Analysis"
                  description="Free analysis provides basic theme overview only"
                  upgradeMessage="Unlock detailed thematic resonance tracking and consistency analysis"
                  className="mb-6"
                />
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-paynes-gray italic">Thematic Evidence: Uncover the deeper meanings woven throughout your story</p>
              </motion.div>

              {currentPlan !== 'free' ? (
                <Card className="neo-brutal-card">
                <CardHeader>
                  <CardTitle>Theme Resonance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockThemeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="theme" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="strength" fill="#8884d8" name="Strength" />
                        <Bar dataKey="consistency" fill="#82ca9d" name="Consistency" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              ) : (
                <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-gray-300">
                  <p className="text-gray-600">Advanced theme visualization available in Pro Analysis</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle>Thematic Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                      <h4 className="font-semibold text-blue-800">Love & Relationships</h4>
                      <p className="text-blue-700 text-sm">
                        Strong thematic presence with consistent development throughout the narrative. 
                        Well-integrated into character arcs and plot progression.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r">
                      <h4 className="font-semibold text-green-800">Betrayal & Trust</h4>
                      <p className="text-green-700 text-sm">
                        Effectively woven through multiple character relationships. Creates compelling 
                        tension and drives key plot points.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                      <h4 className="font-semibold text-yellow-800">Identity & Self-Discovery</h4>
                      <p className="text-yellow-700 text-sm">
                        Present but could be strengthened. Consider adding more symbolic elements 
                        and character moments that reinforce this theme.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neo-brutal-card">
                  <CardHeader>
                    <CardTitle>Thematic Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <h5 className="font-semibold text-purple-800 mb-2">Strengthen Weaker Themes</h5>
                      <p className="text-purple-700 text-sm mb-3">
                        "Sacrifice" and "Identity" themes could benefit from more consistent reinforcement 
                        throughout the narrative.
                      </p>
                      <ul className="text-xs text-purple-600 space-y-1">
                        <li>• Add symbolic objects or settings that reflect these themes</li>
                        <li>• Include dialogue that subtly references thematic concepts</li>
                        <li>• Ensure character actions align with thematic messages</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                      <h5 className="font-semibold text-green-800 mb-2">Thematic Consistency</h5>
                      <p className="text-green-700 text-sm">
                        Your strongest themes (Love, Betrayal) are well-maintained. Use these as 
                        models for developing the weaker thematic elements.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Feedback */}
              <AnalysisFeedback 
                analysisId={data.id} 
                analysisType="themes"
                className="mt-8"
              />
              </motion.div>
            )}

            {/* Revision Roadmap Tab */}
            {activeTab === 'roadmap' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-museo font-bold text-charcoal mb-4">
                  Your Personalized Revision Roadmap
                </h2>
                <p className="text-lg text-paynes-gray max-w-2xl mx-auto">
                  A prioritized action plan to elevate your manuscript, focusing on the highest-impact improvements first.
                </p>
              </div>

              {/* Free Tier Limited Roadmap */}
              {currentPlan === 'free' && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Limited Free Roadmap</span>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    You're seeing 2 of 8 total recommendations. Upgrade to Pro for the complete strategic revision plan.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {revisionRoadmap.slice(0, currentPlan === 'free' ? 2 : revisionRoadmap.length).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="neo-brutal-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-tangerine text-white rounded-full flex items-center justify-center font-bold">
                              {item.priority}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{item.issue}</CardTitle>
                              <CardDescription className="text-base">{item.category}</CardDescription>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge 
                              variant={item.impact === 'High' ? 'destructive' : item.impact === 'Medium' ? 'default' : 'secondary'}
                            >
                              {item.impact} Impact
                            </Badge>
                            <Badge variant="outline">
                              {item.effort} Effort
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-paynes-gray mb-4">{item.description}</p>
                        
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                            <Target className="h-4 w-4 mr-2" />
                            Recommended Actions:
                          </h4>
                          <ul className="space-y-2">
                            {item.suggestions.map((suggestion, suggestionIndex) => (
                              <li key={suggestionIndex} className="flex items-start space-x-3">
                                <Checkbox
                                  id={`action-${index}-${suggestionIndex}`}
                                  checked={completedActions[`${index}-${suggestionIndex}`] || false}
                                  onCheckedChange={() => handleActionToggle(index, suggestionIndex)}
                                  className="mt-0.5 flex-shrink-0"
                                />
                                <label 
                                  htmlFor={`action-${index}-${suggestionIndex}`}
                                  className={`text-sm cursor-pointer ${
                                    completedActions[`${index}-${suggestionIndex}`] 
                                      ? 'text-green-700 line-through opacity-75' 
                                      : 'text-paynes-gray hover:text-charcoal'
                                  }`}
                                >
                                  {suggestion}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Upgrade Teaser for Free Users */}
                {currentPlan === 'free' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-tangerine rounded-full flex items-center justify-center mx-auto">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-800 mb-2">
                          6 More Strategic Recommendations Available
                        </h3>
                        <p className="text-orange-700 text-sm mb-4">
                          Unlock your complete revision roadmap with detailed action items, 
                          effort estimates, and strategic guidance for maximum impact.
                        </p>
                      </div>
                      <Button
                        variant="default"
                        onClick={() => window.open('/#pricing', '_blank')}
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Unlock Complete Roadmap - $24/month
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              <Card className="neo-brutal-card bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Revision Strategy</h4>
                      <ul className="space-y-2 text-sm text-paynes-gray">
                        <li>• Start with Priority 1 items for maximum impact</li>
                        <li>• Focus on one chapter at a time for pacing issues</li>
                        <li>• Develop character worksheets before dialogue revision</li>
                        <li>• Track thematic elements in a separate document</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Estimated Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-paynes-gray">Priority 1 (Pacing):</span>
                          <span className="font-medium">1-2 weeks</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-paynes-gray">Priority 2 (Characters):</span>
                          <span className="font-medium">3-4 weeks</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-paynes-gray">Priority 3 (Themes):</span>
                          <span className="font-medium">2-3 weeks</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Estimated Time:</span>
                          <span>6-9 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Feedback */}
              <AnalysisFeedback 
                analysisId={data.id} 
                analysisType="roadmap"
                className="mt-8"
              />
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Trust and Security Footer */}
      <footer className="bg-white border-t-2 border-gray-200 py-4 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Security Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-paynes-gray">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Your manuscript is secure and private</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-gray-300 hidden sm:block" />
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Files automatically deleted after 7 days</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-gray-300 hidden sm:block" />
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-purple-600" />
                <span>Bank-level encryption</span>
              </div>
            </div>
            
            {/* Compliance and Data Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <Badge variant="outline" className="text-xs">
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                GDPR Compliant
              </Badge>
              <div className="flex items-center space-x-1">
                <span>Last updated:</span>
                <span className="font-medium">
                  {new Date(data.completedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
