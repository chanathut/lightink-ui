"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, BookOpen, Upload, Mail, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NotFoundPageProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
  onSearch?: () => void;
  showContactSupport?: boolean;
}

// Reusable 404 Component for embedding in other pages
export default function NotFoundPage({ 
  onGoHome,
  onGoBack,
  onSearch,
  showContactSupport = true 
}: NotFoundPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/#how-it-works';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-azure to-vanilla overflow-hidden relative flex items-center justify-center p-4">
      {/* Animated Background */}
      <FloatingBooks />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="neo-brutal-card">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            {/* Animated Illustration */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, -3, 3, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 bg-gradient-to-br from-tangerine to-orange-600 rounded-full flex items-center justify-center relative shadow-neo-brutal"
              >
                <BookOpen className="h-12 w-12 md:h-16 md:w-16 text-white" />
                
                {/* Sparkle Effects */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </motion.div>
              </motion.div>

              {/* 404 Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                className="text-6xl md:text-8xl font-museo font-bold text-charcoal mb-4 squiggly-underline"
              >
                404
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-2xl md:text-3xl font-museo font-bold text-charcoal">
                This Page Has Wandered Off
              </h1>
              <p className="text-base md:text-lg text-payne max-w-md mx-auto leading-relaxed">
                It seems this page has stepped away from our Digital Athenaeum. 
                Your literary journey can continue from any of these paths.
              </p>
            </motion.div>

            {/* Navigation Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleGoHome}
                  className="neo-brutal-button px-6 py-3"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return to Athenaeum
                </Button>
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="border-2 border-charcoal hover:bg-charcoal hover:text-white px-6 py-3"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>

              {/* Quick Navigation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => window.location.href = '/upload'}
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-tangerine hover:bg-orange-50 p-4 h-auto flex flex-col items-center space-y-2 transition-all duration-200"
                  >
                    <Upload className="h-5 w-5 text-tangerine" />
                    <span className="text-sm font-medium">Upload</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => window.location.href = '/bookshelf'}
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-tangerine hover:bg-orange-50 p-4 h-auto flex flex-col items-center space-y-2 transition-all duration-200"
                  >
                    <BookOpen className="h-5 w-5 text-tangerine" />
                    <span className="text-sm font-medium">Bookshelf</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSearch}
                    variant="outline"
                    className="w-full border-2 border-gray-300 hover:border-tangerine hover:bg-orange-50 p-4 h-auto flex flex-col items-center space-y-2 transition-all duration-200"
                  >
                    <Search className="h-5 w-5 text-tangerine" />
                    <span className="text-sm font-medium">Explore</span>
                  </Button>
                </motion.div>
              </div>

              {/* Contact Support */}
              {showContactSupport && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <p className="text-sm text-payne mb-3">
                    Need assistance with your literary journey?
                  </p>
                  <Button
                    onClick={() => window.location.href = 'mailto:support@lightink.com'}
                    variant="ghost"
                    className="text-tangerine hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Our Literary Support Team
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Floating Books Animation
function FloatingBooks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating books */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`book-${i}`}
          className="absolute opacity-10"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
            rotate: Math.random() * 360
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360 + 180,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          <BookOpen className="h-16 w-16 text-tangerine" />
        </motion.div>
      ))}

      {/* Small floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`element-${i}`}
          className="absolute opacity-20"
          initial={{ 
            x: -50,
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: 0.5
          }}
          animate={{
            x: (typeof window !== 'undefined' ? window.innerWidth : 1200) + 50,
            scale: [0.5, 1, 0.5],
            rotate: 360
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15
          }}
        >
          <div className="w-4 h-4 bg-payne rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}