"use client";

import { motion } from 'framer-motion';
import { Upload, BookOpen, Shield, Clock, Star, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustIndicators } from '@/components/ui/trust-indicators';
import ContextualHelp from '@/components/ui/contextual-help';
import { ScholarlyHeader } from '@/components/ui/scholarly-language';
import { useRouter } from 'next/navigation';

export default function BookshelfHeader() {
  const router = useRouter();

  const handleNewManuscript = () => {
    router.push('/upload');
  };

  const handleSampleReport = () => {
    router.push('/sample-report');
  };
  return (
    <header className="bg-white border-b-4 border-charcoal shadow-lg">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <ScholarlyHeader
            title="Your Literary Athenaeum"
            subtitle="Curate, analyze, and refine your literary collection with the wisdom of AI-powered insights."
            icon={BookOpen}
            className="text-left flex-1"
          />
          
          <div className="flex items-center space-x-2">
            <ContextualHelp topic="bookshelf" />
          </div>
        </div>

        <div className="text-center space-y-6">
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg"
              variant="default"
              className="text-lg px-8 py-4"
              onClick={handleNewManuscript}
            >
              <Upload className="mr-3 h-5 w-5" />
              Curate a New Volume
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-2 border-charcoal hover:bg-charcoal hover:text-white"
              onClick={handleSampleReport}
            >
              <Star className="mr-3 h-5 w-5" />
              Explore Sample Analysis
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <TrustIndicators variant="header" className="justify-center" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}