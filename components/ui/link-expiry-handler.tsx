"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface LinkExpiryHandlerProps {
  token: string;
  expiryDate: string;
  onRegenerateLink?: () => void;
  onNavigateToBookshelf?: () => void;
}

export default function LinkExpiryHandler({ 
  token, 
  expiryDate, 
  onRegenerateLink, 
  onNavigateToBookshelf 
}: LinkExpiryHandlerProps) {
  const [isExpired, setIsExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    const checkExpiry = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryDate).getTime();
      const isLinkExpired = now > expiry;
      
      setIsExpired(isLinkExpired);
      
      if (!isLinkExpired) {
        const timeDiff = expiry - now;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
          setTimeRemaining(`${days} day${days > 1 ? 's' : ''} remaining`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours} hour${hours > 1 ? 's' : ''} remaining`);
        } else {
          setTimeRemaining('Less than 1 hour remaining');
        }
      }
    };

    checkExpiry();
    const interval = setInterval(checkExpiry, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [expiryDate]);

  const handleRegenerateLink = async () => {
    setIsRegenerating(true);
    try {
      await onRegenerateLink?.();
      toast.success('New secure link has been sent to your email');
    } catch (error) {
      toast.error('Failed to regenerate link. Please try again.');
    } finally {
      setIsRegenerating(false);
    }
  };

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen seamless-bg flex items-center justify-center p-4"
      >
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
              Report Link Has Expired
            </CardTitle>
            <CardDescription className="text-lg text-payne">
              This secure link is no longer valid for security reasons
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">What happened?</h4>
              <p className="text-blue-700 text-sm">
                For your security and privacy, analysis report links automatically expire after 7 days. 
                This ensures your manuscript insights remain protected.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-charcoal">Access Your Report:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={onNavigateToBookshelf}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Go to My Bookshelf
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-2 border-charcoal hover:bg-charcoal hover:text-white"
                  onClick={handleRegenerateLink}
                  disabled={isRegenerating}
                >
                  {isRegenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Email New Link
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@lightink.com" className="text-tangerine hover:underline">
                  support@lightink.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Show expiry warning if less than 24 hours remaining
  const showWarning = timeRemaining.includes('hour') || timeRemaining === 'Less than 1 hour remaining';

  return showWarning ? (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"
    >
      <div className="flex items-center space-x-3">
        <Clock className="h-5 w-5 text-yellow-600" />
        <div>
          <p className="text-yellow-800 font-medium">Report Access Expiring Soon</p>
          <p className="text-yellow-700 text-sm">
            This report link expires in {timeRemaining}. Save or bookmark your insights now.
          </p>
        </div>
      </div>
    </motion.div>
  ) : null;
}