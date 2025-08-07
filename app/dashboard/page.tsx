"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Upload, 
  BarChart3, 
  Calendar, 
  FileText, 
  Star,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// Mock user data - in real implementation, this would come from your backend
const mockUserData = {
  name: 'Elena Rodriguez',
  email: 'elena@example.com',
  joinedDate: '2024-01-10T00:00:00Z',
  totalManuscripts: 3,
  completedAnalyses: 2,
  currentPlan: 'pro',
  nextBillingDate: '2024-02-15T00:00:00Z'
};

const mockRecentAnalyses = [
  {
    id: 'analysis-001',
    manuscriptTitle: 'The Digital Athenaeum',
    completedAt: '2024-01-15T10:38:00Z',
    overallScore: 82,
    status: 'completed',
    plan: 'pro'
  },
  {
    id: 'analysis-002',
    manuscriptTitle: 'Shadows of Tomorrow',
    completedAt: '2024-01-12T14:22:00Z',
    overallScore: 76,
    status: 'completed',
    plan: 'free'
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToBookshelf = () => {
    router.push('/bookshelf');
  };

  const handleNavigateToUpload = () => {
    router.push('/upload');
  };

  const handleViewAnalysis = (analysisId: string) => {
    router.push(`/studio/${analysisId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen seamless-bg flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-tangerine border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen seamless-bg">
      {/* Header */}
      <header className="bg-white border-b-4 border-charcoal shadow-lg">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-charcoal rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-museo font-bold text-charcoal">
                  Welcome back, {mockUserData.name}
                </h1>
                <p className="text-payne">
                  Your literary analysis dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-tangerine text-white px-3 py-1 capitalize">
                {mockUserData.currentPlan} Plan
              </Badge>
              <Button 
                variant="default"
                onClick={handleNavigateToUpload}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Account Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Account Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-800">{mockUserData.totalManuscripts}</p>
                      <p className="text-sm text-blue-600">Total Manuscripts</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-800">{mockUserData.completedAnalyses}</p>
                      <p className="text-sm text-green-600">Completed Analyses</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-payne">Member since:</span>
                      <span className="font-medium text-charcoal">
                        {new Date(mockUserData.joinedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                    {mockUserData.currentPlan !== 'free' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-payne">Next billing:</span>
                        <span className="font-medium text-charcoal">
                          {new Date(mockUserData.nextBillingDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="default"
                    className="w-full justify-start"
                    onClick={handleNavigateToUpload}
                  >
                    <Upload className="h-4 w-4 mr-3" />
                    Upload New Manuscript
                  </Button>
                  
                  <Button 
                    variant="neutral"
                    className="w-full justify-start"
                    onClick={handleNavigateToBookshelf}
                  >
                    <BookOpen className="h-4 w-4 mr-3" />
                    View All Manuscripts
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/sample-report')}
                  >
                    <Star className="h-4 w-4 mr-3" />
                    Explore Sample Analysis
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan Information */}
            {mockUserData.currentPlan === 'free' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="neo-brutal-card bg-gradient-to-r from-orange-50 to-yellow-50 border-tangerine">
                  <CardHeader>
                    <CardTitle className="text-tangerine">Upgrade Your Analysis</CardTitle>
                    <CardDescription>
                      Unlock advanced features with Pro or Premium plans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-orange-700 mb-4">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>100,000+ word limit</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Interactive visualizations</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Comprehensive roadmap</span>
                      </li>
                    </ul>
                    <Button 
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => router.push('/#pricing')}
                    >
                      View Plans
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - Recent Analyses */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-museo">Recent Analyses</CardTitle>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleNavigateToBookshelf}
                    >
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <CardDescription>
                    Your latest manuscript insights and reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockRecentAnalyses.length > 0 ? (
                    <div className="space-y-4">
                      {mockRecentAnalyses.map((analysis, index) => (
                        <motion.div
                          key={analysis.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-tangerine transition-colors cursor-pointer"
                          onClick={() => handleViewAnalysis(analysis.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-charcoal mb-1">
                                {analysis.manuscriptTitle}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-payne">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {new Date(analysis.completedAt).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <BarChart3 className="h-3 w-3" />
                                  <span>Score: {analysis.overallScore}/100</span>
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs capitalize"
                                >
                                  {analysis.plan}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-green-600 font-medium">Complete</span>
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-payne" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-charcoal mb-2">
                        No Analyses Yet
                      </h3>
                      <p className="text-payne mb-6">
                        Upload your first manuscript to begin your analysis journey
                      </p>
                      <Button 
                        variant="default"
                        onClick={handleNavigateToUpload}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Your First Manuscript
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Writing Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Your Writing Journey</span>
                  </CardTitle>
                  <CardDescription>
                    Track your progress and celebrate your achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-charcoal">
                        {mockUserData.totalManuscripts}
                      </p>
                      <p className="text-sm text-payne">Manuscripts Uploaded</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-charcoal">
                        {mockUserData.completedAnalyses}
                      </p>
                      <p className="text-sm text-payne">Analyses Completed</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-charcoal">
                        {Math.round((mockUserData.completedAnalyses / Math.max(mockUserData.totalManuscripts, 1)) * 100)}%
                      </p>
                      <p className="text-sm text-payne">Analysis Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="neo-brutal-card bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Expert Writing Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    "The best time to analyze your manuscript is after you've completed a full draft 
                    but before you begin major revisions. This gives you objective insights while 
                    your creative energy is still high."
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-blue-600">— Lightink AI Coach</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push('/sample-report')}
                    >
                      See Example
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}