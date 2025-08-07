"use client";

import { Shield, Clock, Users, Award, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrustIndicatorsProps {
  variant?: 'header' | 'payment' | 'footer';
  className?: string;
}

export function TrustIndicators({ variant = 'header', className = '' }: TrustIndicatorsProps) {
  const indicators = {
    header: [
      { icon: Shield, text: '256-bit SSL', subtext: 'Bank-level security' },
      { icon: Users, text: '10,000+', subtext: 'Authors trust us' },
      { icon: Clock, text: '10 min', subtext: 'Average analysis time' }
    ],
    payment: [
      { icon: Lock, text: 'PCI Compliant', subtext: 'Secure payments' },
      { icon: Shield, text: 'SOC 2 Certified', subtext: 'Enterprise security' },
      { icon: CheckCircle, text: '30-day guarantee', subtext: 'Money back promise' }
    ],
    footer: [
      { icon: Award, text: 'Industry Leading', subtext: 'AI analysis' },
      { icon: Users, text: '99.8%', subtext: 'Customer satisfaction' },
      { icon: Shield, text: 'GDPR Compliant', subtext: 'Privacy protected' }
    ]
  };

  const currentIndicators = indicators[variant];

  return (
    <div className={`flex items-center justify-center space-x-6 ${className}`}>
      {currentIndicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-2 text-sm"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Icon className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-charcoal">{indicator.text}</p>
              <p className="text-xs text-payne">{indicator.subtext}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function SocialProofCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200"
    >
      <div className="flex items-center justify-center space-x-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-700">2,847</p>
          <p className="text-sm text-green-600">Manuscripts analyzed this month</p>
        </div>
        <div className="w-px h-12 bg-green-200"></div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-700">$4,500</p>
          <p className="text-sm text-blue-600">Average savings vs. traditional editing</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ValueComparison() {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
      <h4 className="font-semibold text-charcoal mb-4 text-center">
        Why Choose Lightink?
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-center">
          <h5 className="font-medium text-red-700 mb-2">Traditional Editing</h5>
          <ul className="space-y-1 text-sm text-red-600">
            <li>$3,000 - $5,000 cost</li>
            <li>6-8 weeks wait time</li>
            <li>Subjective feedback</li>
            <li>Limited revisions</li>
          </ul>
        </div>
        <div className="text-center">
          <h5 className="font-medium text-green-700 mb-2">Lightink Analysis</h5>
          <ul className="space-y-1 text-sm text-green-600">
            <li>$24 - $49 per month</li>
            <li>10 minutes analysis</li>
            <li>Objective, data-driven</li>
            <li>Unlimited revisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}