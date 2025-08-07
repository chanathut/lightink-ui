"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, Search, BookOpen, Upload, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Main 404 Page Component
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-azure to-vanilla overflow-hidden relative flex items-center justify-center">
      {/* Animated Background Elements */}
      <FloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <MessageDisplay />
      </div>
      
      {/* Animated Particles */}
      <ParticleAnimation />
    </div>
  );
}

// Message Display Component with Lightink Branding
function MessageDisplay() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSearch = () => {
    router.push('/#how-it-works');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <Card className="neo-brutal-card max-w-2xl mx-auto">
        <CardContent className="p-12 space-y-8">
          {/* Animated 404 Illustration */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Animated Book Icon */}
            <motion.div
              animate={{ 
                rotate: [0, -5, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-tangerine to-orange-600 rounded-full flex items-center justify-center relative"
            >
              <BookOpen className="h-16 w-16 text-white" />
              
              {/* Floating question marks */}
              <motion.div
                animate={{ 
                  y: [-10, -20, -10],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 text-2xl"
              >
                ❓
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [-15, -25, -15],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-2 -left-6 text-xl"
              >
                ❓
              </motion.div>
            </motion.div>

            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
              className="text-8xl md:text-9xl font-museo font-bold text-charcoal mb-4"
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
            <h1 className="text-3xl md:text-4xl font-museo font-bold text-charcoal">
              This Page Has Gone Missing
            </h1>
            <p className="text-lg text-payne max-w-md mx-auto leading-relaxed">
              It seems this page has wandered off from our Digital Athenaeum. 
              Don't worry—your literary journey can continue from here.
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGoHome}
                className="neo-brutal-button text-lg px-6 py-3"
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Athenaeum
              </Button>
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-2 border-charcoal hover:bg-charcoal hover:text-white text-lg px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => router.push('/upload')}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-tangerine hover:bg-orange-50 p-4 h-auto flex flex-col items-center space-y-2"
                >
                  <Upload className="h-6 w-6 text-tangerine" />
                  <span className="text-sm font-medium">Upload Manuscript</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => router.push('/bookshelf')}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-tangerine hover:bg-orange-50 p-4 h-auto flex flex-col items-center space-y-2"
                >
                  <BookOpen className="h-6 w-6 text-tangerine" />
                  <span className="text-sm font-medium">Your Bookshelf</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSearch}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-tangerine hover:bg-orange-50 p-4 h-auto flex flex-col items-center space-y-2"
                >
                  <Search className="h-6 w-6 text-tangerine" />
                  <span className="text-sm font-medium">How It Works</span>
                </Button>
              </motion.div>
            </div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-payne mb-3">
                Still can't find what you're looking for?
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:support@lightink.com'}
                variant="ghost"
                className="text-tangerine hover:text-orange-600 hover:bg-orange-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Our Literary Support Team
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Floating Background Elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Books */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360 + 360,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <div className="w-8 h-8 bg-tangerine/20 rounded-lg flex items-center justify-center">
            📚
          </div>
        </motion.div>
      ))}

      {/* Floating Pages */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`page-${i}`}
          className="absolute"
          initial={{ 
            x: -50,
            y: Math.random() * window.innerHeight,
            rotate: 0
          }}
          animate={{
            x: window.innerWidth + 50,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15
          }}
          style={{
            top: `${Math.random() * 100}%`,
          }}
        >
          <div className="w-6 h-6 bg-payne/10 rounded flex items-center justify-center">
            📄
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Particle Animation Component
function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(237, 137, 54, ${particle.opacity})`; // Tangerine color
        context.fill();
      });
      
      requestIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
}