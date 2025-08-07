"use client";

import { motion } from 'framer-motion';
import { Check, X, Star, Zap, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PlanComparisonProps {
  onPlanSelect?: (planId: string) => void;
  selectedPlan?: string;
}

const comparisonFeatures = [
  {
    category: 'Analysis Features',
    features: [
      {
        name: 'Word Count Limit',
        free: '10,000 words',
        pro: '100,000 words',
        premium: 'Unlimited'
      },
      {
        name: 'Plot Structure Analysis',
        free: 'Basic overview',
        pro: 'Advanced analysis',
        premium: 'Expert-level insights'
      },
      {
        name: 'Character Development Review',
        free: 'Simple assessment',
        pro: 'Detailed character mapping',
        premium: 'Complete character arcs'
      },
      {
        name: 'Pacing Analysis',
        free: 'General overview',
        pro: 'Chapter-by-chapter heatmap',
        premium: 'Scene-level precision'
      },
      {
        name: 'Dialogue Quality Assessment',
        free: false,
        pro: 'Voice analysis',
        premium: 'Advanced dialogue coaching'
      },
      {
        name: 'Thematic Resonance Review',
        free: false,
        pro: 'Theme identification',
        premium: 'Deep thematic analysis'
      },
      {
        name: 'Genre-Specific Insights',
        free: false,
        pro: false,
        premium: 'Tailored recommendations'
      },
      {
        name: 'Market Readiness Assessment',
        free: false,
        pro: false,
        premium: 'Publishing insights'
      }
    ]
  },
  {
    category: 'Reports & Visualization',
    features: [
      {
        name: 'Interactive Dashboard',
        free: 'Basic view',
        pro: 'Full interactive dashboard',
        premium: 'Advanced visualizations'
      },
      {
        name: 'Pacing Heatmap',
        free: false,
        pro: 'Standard heatmap',
        premium: 'Enhanced with annotations'
      },
      {
        name: 'Character Relationship Web',
        free: false,
        pro: 'Interactive network',
        premium: 'Advanced relationship mapping'
      },
      {
        name: 'PDF Export',
        free: 'Basic report',
        pro: 'Comprehensive PDF',
        premium: 'Professional formatting'
      },
      {
        name: 'Revision Roadmap',
        free: 'Limited suggestions',
        pro: 'Detailed action plan',
        premium: 'Prioritized strategy'
      },
      {
        name: 'Progress Tracking',
        free: false,
        pro: false,
        premium: 'Revision monitoring'
      }
    ]
  },
  {
    category: 'Support & Access',
    features: [
      {
        name: 'Report Access Duration',
        free: '3 days',
        pro: '30 days',
        premium: '90 days'
      },
      {
        name: 'Re-analysis Allowance',
        free: false,
        pro: '1 revision',
        premium: 'Unlimited revisions'
      },
      {
        name: 'Customer Support',
        free: 'Community forum',
        pro: 'Email support',
        premium: 'Priority support'
      },
      {
        name: 'Processing Priority',
        free: 'Standard queue',
        pro: 'Standard queue',
        premium: 'Priority processing'
      },
      {
        name: 'Multiple Manuscripts',
        free: false,
        pro: false,
        premium: 'Compare up to 3'
      }
    ]
  }
];

const plans = [
  {
    id: 'free',
    name: 'Free Analysis',
    icon: Star,
    color: 'from-gray-400 to-gray-500'
  },
  {
    id: 'pro',
    name: 'Pro Analysis',
    icon: Zap,
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'premium',
    name: 'Premium Workshop',
    icon: Crown,
    color: 'from-purple-400 to-indigo-500'
  }
];

export default function PlanComparison({ onPlanSelect, selectedPlan }: PlanComparisonProps) {
  const renderFeatureValue = (value: string | boolean, planId: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-green-600 mx-auto" />
      ) : (
        <X className="h-4 w-4 text-gray-400 mx-auto" />
      );
    }
    
    return (
      <span className={`text-sm ${planId === 'premium' ? 'font-medium text-purple-700' : planId === 'pro' ? 'font-medium text-orange-700' : 'text-gray-600'}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-museo font-bold text-charcoal mb-4">
          Compare All Plans
        </h3>
        <p className="text-lg text-payne max-w-2xl mx-auto">
          Choose the perfect analysis level for your manuscript. Every plan includes our core AI analysis engine.
        </p>
      </div>

      {/* Mobile-First Comparison Cards */}
      <div className="block lg:hidden space-y-6">
        {plans.map((plan, planIndex) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: planIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="neo-brutal-card">
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-museo">{plan.name}</CardTitle>
                  {plan.id === 'pro' && (
                    <Badge className="bg-tangerine text-white mx-auto">Most Popular</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {comparisonFeatures.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-semibold text-charcoal mb-3 border-b border-gray-200 pb-2">
                        {category.category}
                      </h4>
                      <div className="space-y-3">
                        {category.features.map((feature) => (
                          <div key={feature.name} className="flex items-center justify-between">
                            <span className="text-sm text-payne">{feature.name}</span>
                            <div className="text-right">
                              {renderFeatureValue(feature[plan.id as keyof typeof feature], plan.id)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    className={`w-full ${plan.id === 'pro' ? 'neo-brutal-button' : 'border-2 border-charcoal hover:bg-charcoal hover:text-white'}`}
                    variant={plan.id === 'pro' ? 'default' : 'outline'}
                    onClick={() => onPlanSelect?.(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : `Choose ${plan.name}`}
                    {selectedPlan === plan.id && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden lg:block">
        <Card className="neo-brutal-card overflow-hidden">
          <CardContent className="p-0">
            {/* Header Row */}
            <div className="grid grid-cols-4 border-b-2 border-gray-200">
              <div className="p-6 bg-gray-50">
                <h4 className="font-semibold text-charcoal">Features</h4>
              </div>
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div key={plan.id} className="p-6 text-center bg-gray-50 border-l border-gray-200">
                    <div className={`w-10 h-10 mx-auto rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mb-2`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-charcoal">{plan.name}</h4>
                    {plan.id === 'pro' && (
                      <Badge className="bg-tangerine text-white mt-2">Most Popular</Badge>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Feature Rows */}
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="grid grid-cols-4 bg-blue-50 border-b border-gray-200">
                  <div className="p-4 col-span-4">
                    <h5 className="font-semibold text-blue-800">{category.category}</h5>
                  </div>
                </div>
                
                {/* Feature Rows */}
                {category.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (featureIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="grid grid-cols-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-4">
                      <span className="text-sm font-medium text-charcoal">{feature.name}</span>
                    </div>
                    <div className="p-4 text-center border-l border-gray-100">
                      {renderFeatureValue(feature.free, 'free')}
                    </div>
                    <div className="p-4 text-center border-l border-gray-100">
                      {renderFeatureValue(feature.pro, 'pro')}
                    </div>
                    <div className="p-4 text-center border-l border-gray-100">
                      {renderFeatureValue(feature.premium, 'premium')}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Action Row */}
            <div className="grid grid-cols-4 bg-gray-50 p-6">
              <div></div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center border-l border-gray-200 pl-6">
                  <Button
                    className={`w-full ${plan.id === 'pro' ? 'neo-brutal-button' : 'border-2 border-charcoal hover:bg-charcoal hover:text-white'}`}
                    variant={plan.id === 'pro' ? 'default' : 'outline'}
                    onClick={() => onPlanSelect?.(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : `Choose ${plan.name}`}
                    {selectedPlan === plan.id && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200"
      >
        <h4 className="text-xl font-museo font-bold text-charcoal mb-6 text-center">
          Frequently Asked Questions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-charcoal mb-2">Can I upgrade my plan later?</h5>
            <p className="text-sm text-payne">
              Yes! You can upgrade to a higher tier at any time. We'll apply the difference in cost 
              and extend your analysis with additional features.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-charcoal mb-2">What if I'm not satisfied?</h5>
            <p className="text-sm text-payne">
              We offer a 30-day money-back guarantee. If you're not completely satisfied with 
              your analysis, we'll refund your payment in full.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-charcoal mb-2">How long does analysis take?</h5>
            <p className="text-sm text-payne">
              Most analyses complete within 5-10 minutes. Premium users get priority processing 
              for even faster results.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-charcoal mb-2">Is my manuscript secure?</h5>
            <p className="text-sm text-payne">
              Absolutely. We use enterprise-grade encryption and automatically delete your 
              manuscript after analysis. Your work is never stored or shared.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}