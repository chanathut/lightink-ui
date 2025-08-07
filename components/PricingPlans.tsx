"use client";

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PaymentModal from './payment/PaymentModal';
import PlanComparison from './payment/PlanComparison';
import { useState } from 'react';

interface PricingPlansProps {
  onPlanSelect?: (planId: string) => void;
  selectedPlan?: string;
  showComparison?: boolean;
  showPaymentModal?: boolean;
}

const plans = [
  {
    id: 'free',
    name: 'Free Analysis',
    price: 0,
    period: 'one-time',
    icon: Star,
    description: 'Perfect for getting started',
    wordLimit: '10,000 words',
    features: [
      'Basic plot structure review',
      'Simple character assessment', 
      'General pacing overview',
      'Limited revision suggestions',
      'Basic PDF report',
      '3-day access to results',
      'Community support'
    ],
    limitations: ['Limited word count', 'Basic insights only'],
    buttonText: 'Start Free Analysis',
    popular: false,
    color: 'from-gray-400 to-gray-500'
  },
  {
    id: 'pro',
    name: 'Pro Analysis',
    price: 24,
    period: 'month',
    yearlyPrice: 240,
    icon: Zap,
    description: 'For serious writers',
    wordLimit: '100,000 words',
    features: [
      'Complete structural analysis',
      'Advanced plot analysis with hole detection',
      'Character relationship mapping',
      'Pacing heatmap visualization',
      'Dialogue quality assessment',
      'Prose style analysis',
      'Thematic resonance review',
      'Comprehensive revision roadmap',
      'Interactive dashboard access',
      '30-day access to results',
      'Email support'
    ],
    buttonText: 'Choose Pro',
    popular: true,
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'premium',
    name: 'Premium Workshop',
    price: 49,
    period: 'month',
    yearlyPrice: 490,
    icon: Crown,
    description: 'For professional authors',
    wordLimit: 'Unlimited words',
    features: [
      'Everything in Pro, plus:',
      'Unlimited word count analysis',
      'Multiple manuscript comparison',
      'Advanced thematic analysis',
      'Genre-specific insights',
      'Market readiness assessment',
      'Publishing recommendations',
      'Revision tracking & progress monitoring',
      'Priority AI processing',
      '90-day access to results',
      'Priority email support',
      'Free re-analysis (unlimited revisions)',
      'Advanced export options'
    ],
    buttonText: 'Choose Premium',
    popular: false,
    color: 'from-purple-400 to-indigo-500'
  }
];

export default function PricingPlans({ onPlanSelect, selectedPlan, showComparison = false, showPaymentModal = false }: PricingPlansProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<any>(null);

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan && showPaymentModal) {
      setSelectedPlanForPayment(plan);
      setIsPaymentModalOpen(true);
    } else {
      onPlanSelect?.(planId);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    setIsPaymentModalOpen(false);
    console.log('Payment successful:', paymentData);
    // In real implementation, this would redirect to analysis processing
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="accent-sticker bg-tangerine text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`neo-brutal-card h-full ${isSelected ? 'ring-4 ring-tangerine' : ''} ${plan.popular ? 'scale-105' : ''}`}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  
                  <div className="py-4">
                    {plan.price === 0 ? (
                      <div className="text-4xl font-bold text-charcoal">Free</div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-4xl font-bold text-charcoal">
                          ${plan.price}
                          <span className="text-lg font-normal text-payne">/{plan.period}</span>
                        </div>
                         {plan.yearlyPrice && (
                          <div className="text-sm text-payne">
                            or ${plan.yearlyPrice}/year (save 17%)
                          </div>
                         )}
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">
                    {plan.wordLimit}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-payne">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                        <div className="h-4 w-4 mt-0.5 flex-shrink-0">⚠️</div>
                        <span className="text-xs text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className={`w-full ${isSelected ? 'bg-tangerine border-tangerine' : ''}`}
                    variant={plan.popular ? 'default' : 'neutral'}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {isSelected ? 'Selected' : plan.buttonText}
                    {isSelected && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                  
                  {plan.id === 'free' && (
                    <p className="text-xs text-center text-gray-500">
                      No credit card required
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {showComparison && (
        <PlanComparison onPlanSelect={handlePlanSelect} selectedPlan={selectedPlan} />
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        selectedPlan={selectedPlanForPayment}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}