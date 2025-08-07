"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import LinkExpiryHandler from '@/components/ui/link-expiry-handler';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Loader2 } from 'lucide-react';

// Mock data for demonstration - replace with actual API calls
const mockReportData = {
  'demo-token-123': {
    id: 'analysis-001',
    manuscript: {
      title: 'The Digital Athenaeum',
      wordCount: 75000,
      author: 'Elena Rodriguez',
      uploadedAt: '2024-01-14T09:15:00Z'
    },
    plan: 'pro',
    email: 'elena@example.com',
    completedAt: '2024-01-15T10:38:00Z',
    status: 'completed',
    linkExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    analysisData: {
      overallScore: 82,
      pacingScore: 78,
      characterScore: 85,
      dialogueScore: 73,
      themeScore: 80,
      strengths: [
        'Strong protagonist development',
        'Excellent opening hook',
        'Consistent thematic elements',
        'Engaging climax sequence'
      ],
      improvements: [
        'Mid-story pacing lag (Chapter 4)',
        'Supporting character depth',
        'Dialogue differentiation',
        'Subplot resolution pacing'
      ]
    }
  },
  'expired-token-456': {
    id: 'analysis-002',
    linkExpiry: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Expired yesterday
    status: 'expired'
  }
};

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = mockReportData[token as keyof typeof mockReportData];
        
        if (!data) {
          setError('Invalid or expired report link');
          return;
        }
        
        // Check if link is expired
        const now = new Date().getTime();
        const expiry = new Date(data.linkExpiry).getTime();
        
        if (now > expiry) {
          setError('expired');
          return;
        }
        
        setReportData(data);
      } catch (err) {
        setError('Failed to load report');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchReport();
    }
  }, [token]);

  const handleRegenerateLink = async () => {
    // Mock API call to regenerate link
    console.log('Regenerating link for token:', token);
    // In real implementation, this would call your backend API
  };

  const handleNavigateToBookshelf = () => {
    router.push('/bookshelf');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen seamless-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 text-tangerine animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-museo font-bold text-charcoal mb-2">
            Loading Your Analysis Report
          </h2>
          <p className="text-payne">
            Retrieving your manuscript insights...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error === 'expired') {
    return (
      <LinkExpiryHandler
        token={token}
        expiryDate={mockReportData[token as keyof typeof mockReportData]?.linkExpiry || ''}
        onRegenerateLink={handleRegenerateLink}
        onNavigateToBookshelf={handleNavigateToBookshelf}
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen seamless-bg flex items-center justify-center p-4">
        <Card className="neo-brutal-card max-w-2xl w-full">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </motion.div>
            
            <CardTitle className="text-2xl font-museo font-bold text-charcoal">
              Report Not Found
            </CardTitle>
            <CardDescription className="text-lg text-payne">
              This report link is invalid or has expired
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-sm">
                Report links are secure and time-limited for your privacy. 
                If you need access to your analysis, please check your email for the latest link 
                or visit your bookshelf.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                onClick={handleNavigateToBookshelf}
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to My Bookshelf
              </Button>
              
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="border-2 border-charcoal hover:bg-charcoal hover:text-white"
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!reportData) {
    return null;
  }

  return (
    <div>
      {/* Link Expiry Warning (if applicable) */}
      <LinkExpiryHandler
        token={token}
        expiryDate={reportData.linkExpiry}
        onRegenerateLink={handleRegenerateLink}
        onNavigateToBookshelf={handleNavigateToBookshelf}
      />
      
      {/* Main Analysis Dashboard */}
      <AnalysisDashboard data={reportData} />
    </div>
  );
}