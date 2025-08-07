"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EnhancedUploadWizard from '@/components/upload/EnhancedUploadWizard';
import PricingPlans from '@/components/PricingPlans';
import PaymentSuccess from '@/components/payment/PaymentSuccess';
import EnhancedPaymentModal from '@/components/payment/EnhancedPaymentModal';

interface UploadedFile {
  file: File;
  wordCount: number;
  preflightChecks: {
    format: boolean;
    size: boolean;
    readability: boolean;
  };
}

interface ManuscriptDetails {
  authorName: string;
  manuscriptTitle: string;
  genre: string;
  wordCount: number;
  publicationStatus: string;
  targetAudience: string;
  synopsis: string;
  email: string;
}
export default function UploadPage() {
  const router = useRouter();
  const [uploadData, setUploadData] = useState<{ file: UploadedFile; details: ManuscriptDetails; selectedPlan: string } | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'upload' | 'payment' | 'success'>('upload');
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleUploadComplete = (data: { file: UploadedFile; details: ManuscriptDetails; selectedPlan: string }) => {
    setUploadData(data);
    
    // If free plan selected, go directly to success
    if (data.selectedPlan === 'free') {
      const mockPaymentData = {
        transactionId: 'free_' + Date.now(),
        plan: { id: 'free', name: 'Free Analysis', price: 0, period: 'one-time' },
        amount: 0,
        period: 'one-time',
        paymentMethod: 'free',
        last4: '****',
        timestamp: new Date().toISOString()
      };
      setPaymentData(mockPaymentData);
      setCurrentView('success');
    } else {
      // For paid plans, open payment modal
      const plans = [
        { id: 'pro', name: 'Pro Analysis', price: 24, period: 'month', yearlyPrice: 240 },
        { id: 'premium', name: 'Premium Workshop', price: 49, period: 'month', yearlyPrice: 490 }
      ];
      
      const selectedPlan = plans.find(p => p.id === data.selectedPlan);
      if (selectedPlan) {
        setSelectedPlanForPayment(selectedPlan);
        setIsPaymentModalOpen(true);
      }
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };


  const handlePaymentSuccess = (payment: any) => {
    setPaymentData(payment);
    setIsPaymentModalOpen(false);
    setCurrentView('success');
  };

  const handleContinueToAnalysis = () => {
    // Mock: In real implementation, this would redirect to analysis processing
    router.push('/analysis/processing');
  };

  if (currentView === 'success' && paymentData) {
    return (
      <PaymentSuccess 
        paymentData={paymentData}
        onContinueToAnalysis={handleContinueToAnalysis}
      />
    );
  }


  return (
    <>
      <EnhancedUploadWizard
        onComplete={handleUploadComplete}
        onBack={handleBackToHome}
      />
      
      <EnhancedPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlanForPayment}
        onPaymentSuccess={handlePaymentSuccess}
        userEmail={uploadData?.details.email || ''}
      />
    </>
  );
}