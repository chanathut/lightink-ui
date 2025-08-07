"use client";

import { useParams } from 'next/navigation';
import AnalysisDashboard from '@/components/AnalysisDashboard';

// Mock data mapping - in real implementation, this would fetch from your backend
const mockAnalysisData = {
  'analysis-001': {
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
  }
};

export async function generateStaticParams() {
  return [
    { manuscriptId: 'analysis-001' }
  ];
}

export default function StudioPage() {
  const params = useParams();
  const manuscriptId = params.manuscriptId as string;

  // In real implementation, you would fetch data based on manuscriptId
  const analysisData = mockAnalysisData[manuscriptId as keyof typeof mockAnalysisData];

  if (!analysisData) {
    return (
      <div className="min-h-screen seamless-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-museo font-bold text-charcoal mb-4">
            Analysis Not Found
          </h1>
          <p className="text-payne">
            The requested manuscript analysis could not be found or may have expired.
          </p>
        </div>
      </div>
    );
  }

  return <AnalysisDashboard data={analysisData} />;
}