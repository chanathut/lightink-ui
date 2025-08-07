"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Zap, Target, FileText, Users, Star, ArrowRight, Check, Shield, Clock, BarChart3, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Particles } from '@/components/ui/particles';
import FileUploadZone from '@/components/FileUploadZone';
import PricingPlans from '@/components/PricingPlans';
import AnalysisDashboard from '@/components/AnalysisDashboard';
import PainVsClaritySection from '@/components/sections/PainVsClaritySection';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import { TrustIndicators, SocialProofCounter, ValueComparison } from '@/components/ui/trust-indicators';

export default function Home() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'landing' | 'upload' | 'dashboard'>('landing');
  const [analysisData, setAnalysisData] = useState(null);
  
  // Animated words for hero section
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Professional", "Actionable", "Insightful", "Empowering", "Transformative"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleUploadComplete = (data: any) => {
    setAnalysisData(data);
    setActiveView('dashboard');
  };

  const handleGetStarted = () => {
    router.push('/upload');
  };

  if (activeView === 'upload') {
    // Redirect to dedicated upload page
    window.location.href = '/upload';
    return null;
  }

  if (activeView === 'dashboard' && analysisData) {
    return <AnalysisDashboard data={analysisData} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Global Particle Effects */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={150}
        ease={30}
        color="#ED8936"
        size={2}
        staticity={40}
      />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Lightink</h1>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center space-x-6"
        >
          <a href="#how-it-works" className="text-payne hover:text-charcoal transition-colors">
            How It Works
          </a>
          <a href="/bookshelf" className="text-payne hover:text-charcoal transition-colors">
            Bookshelf
          </a>
          <a href="/sample-report" className="text-payne hover:text-charcoal transition-colors">
            Sample Report
          </a>
          <a href="#pricing" className="text-payne hover:text-charcoal transition-colors">
            Pricing
          </a>
          <a href="/dashboard" className="text-payne hover:text-charcoal transition-colors">
            My Reports
          </a>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative">
        {/* Enhanced Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <TrustIndicators variant="header" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-museo font-bold text-charcoal mb-6 leading-tight text-center max-w-4xl tracking-tighter">
            Quick, Professional, Affordable{' '}
            <span className="relative inline-block">
              <span className="relative flex w-full justify-center overflow-hidden text-center min-h-[1.2em] whitespace-nowrap">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold text-tangerine font-museo"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </span>
          </h2>
          <p className="text-xl text-payne mb-8 max-w-2xl mx-auto leading-relaxed">
            Most affordable developmental editor for Professional writer! Our AI-powered analysis gives you objective, 
            actionable insights to elevate your story with confidence. Go from manuscript anxiety to a clear revision roadmap.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              variant="default"
              className="text-lg px-8 py-4"
              onClick={handleGetStarted}
            >
              <Upload className="mr-2 h-5 w-5" />
              Get Your Clear Roadmap
            </Button>
            <Button 
              variant="neutral" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              See Sample Report
            </Button>
          </div>

          {/* Tangled to Clear Path Animation */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-32 flex items-center justify-center"
            >
              {/* Tangled Line */}
              <motion.svg
                width="400"
                height="100"
                viewBox="0 0 400 100"
                className="absolute"
              >
                <motion.path
                  d="M20,50 Q60,20 100,60 Q140,90 180,30 Q220,70 260,40 Q300,10 340,50 Q360,70 380,50"
                  stroke="#9CA3AF"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.svg>
              
              {/* Clear Line */}
              <motion.svg
                width="400"
                height="100"
                viewBox="0 0 400 100"
                className="absolute"
              >
                <motion.path
                  d="M20,50 L380,50"
                  stroke="#ED8936"
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <SocialProofCounter />
        </motion.div>
      </section>

      {/* Pain vs. Clarity Section */}
      <PainVsClaritySection />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 seamless-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-museo font-bold text-charcoal mb-4">
              How Lightink Works
            </h3>
            <p className="text-xl text-payne max-w-2xl mx-auto">
              From upload to insights in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center relative"
            >
              <div className="neo-brutal-card p-8 mb-4">
                <div className="w-16 h-16 bg-tangerine rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-museo font-bold text-charcoal mb-3">1. Upload</h4>
                <p className="text-payne">
                  Securely upload your manuscript (.docx). 
                  Our system instantly analyzes word count and structure.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center relative"
            >
              <div className="neo-brutal-card p-8 mb-4">
                <div className="w-16 h-16 bg-tangerine rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-museo font-bold text-charcoal mb-3">2. Analyze</h4>
                <p className="text-payne">
                  Our AI examines pacing, character development, dialogue, 
                  and thematic elements with professional-grade depth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center relative"
            >
              <div className="neo-brutal-card p-8 mb-4">
                <div className="w-16 h-16 bg-tangerine rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-2xl font-museo font-bold text-charcoal mb-3">3. Discover</h4>
                <p className="text-payne">
                  Receive an interactive dashboard with visualizations, 
                  insights, and a prioritized revision roadmap.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 seamless-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-museo font-bold text-charcoal mb-4">
              Professional Analysis, Accessible Pricing
            </h3>
            <p className="text-xl text-payne max-w-2xl mx-auto">
              Get the depth of a $5,000 developmental edit for a fraction of the cost
            </p>
          </div>

          <Tabs defaultValue="pacing" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8 neo-brutal-card border-4 border-charcoal">
              <TabsTrigger value="pacing" className="font-semibold">Pacing Analysis</TabsTrigger>
              <TabsTrigger value="character" className="font-semibold">Character Web</TabsTrigger>
              <TabsTrigger value="dialogue" className="font-semibold">Dialogue Insights</TabsTrigger>
              <TabsTrigger value="theme" className="font-semibold">Theme Tracking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pacing" className="neo-brutal-card p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h4 className="text-2xl font-museo font-bold text-charcoal mb-4">
                    Pacing Heatmap
                  </h4>
                  <p className="text-payne mb-4">
                    Visualize the rhythm of your story with our advanced pacing analysis. 
                    Identify slow sections, rushed scenes, and perfect your story's flow.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Scene-by-scene pacing breakdown</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Tension curve visualization</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Recommended pacing adjustments</li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-100 to-red-100 h-32 rounded-lg border-4 border-charcoal shadow-neo-brutal p-4 flex items-center justify-center">
                    <span className="text-charcoal font-semibold">Interactive Pacing Visualization</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="character" className="neo-brutal-card p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h4 className="text-2xl font-museo font-bold text-charcoal mb-4">
                    Character Relationship Web
                  </h4>
                  <p className="text-payne mb-4">
                    Understand the complex relationships between your characters. 
                    Identify underdeveloped connections and strengthen your cast.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Character interaction mapping</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Dialogue pattern analysis</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Character development tracking</li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 h-32 rounded-lg border-4 border-charcoal shadow-neo-brutal p-4 flex items-center justify-center">
                    <span className="text-charcoal font-semibold">Interactive Character Network</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dialogue" className="neo-brutal-card p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h4 className="text-2xl font-museo font-bold text-charcoal mb-4">
                    Dialogue Quality Assessment
                  </h4>
                  <p className="text-payne mb-4">
                    Analyze the authenticity and effectiveness of your character voices. 
                    Ensure each character speaks with a distinct, compelling voice.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Voice distinctiveness analysis</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Dialogue tag optimization</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Conversation flow assessment</li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-green-100 to-teal-100 h-32 rounded-lg border-4 border-charcoal shadow-neo-brutal p-4 flex items-center justify-center">
                    <span className="text-charcoal font-semibold">Dialogue Analysis Dashboard</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="theme" className="neo-brutal-card p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h4 className="text-2xl font-museo font-bold text-charcoal mb-4">
                    Thematic Resonance Tracking
                  </h4>
                  <p className="text-payne mb-4">
                    Discover the deeper themes woven throughout your story. 
                    Strengthen thematic consistency and emotional impact.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Theme identification and mapping</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Emotional arc analysis</li>
                    <li className="flex items-center"><Check className="h-4 w-4 text-green-600 mr-2" />Thematic coherence assessment</li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 h-32 rounded-lg border-4 border-charcoal shadow-neo-brutal p-4 flex items-center justify-center">
                    <span className="text-charcoal font-semibold">Theme Visualization</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 seamless-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl font-museo font-bold text-charcoal mb-4"
            >
              Choose Your Analysis Level
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-payne max-w-2xl mx-auto"
            >
              From curious beginners to serious professionals, we have the right plan for your manuscript
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <PricingPlans showComparison={true} />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ED8936 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #ED8936 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl font-museo font-bold mb-4"
            >
              Ready to Transform Your Manuscript?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of authors who've discovered the power of data-driven revision
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              variant="reverse"
              className="text-lg px-8 py-4"
              onClick={handleGetStarted}
            >
              <Upload className="mr-2 h-5 w-5" />
              Start Your Analysis Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">100% Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Results in 10 Minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-sm">Trusted by 10,000+ Authors</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-gray-50 to-white border-t-4 border-charcoal">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-museo font-bold text-charcoal">Lightink</span>
              </div>
              <p className="text-payne mb-6 max-w-md leading-relaxed">
                Transform your manuscript with AI-powered analysis. Get professional insights 
                at a fraction of the cost of traditional developmental editing.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-100 hover:bg-tangerine hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-sm font-bold">f</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-100 hover:bg-tangerine hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-sm font-bold">t</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-100 hover:bg-tangerine hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <span className="text-sm font-bold">in</span>
                </motion.a>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-charcoal mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#how-it-works" className="text-payne hover:text-tangerine transition-colors duration-200">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-payne hover:text-tangerine transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-payne hover:text-tangerine transition-colors duration-200">
                    Sample Report
                  </a>
                </li>
                <li>
                  <a href="#" className="text-payne hover:text-tangerine transition-colors duration-200">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-charcoal mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-payne hover:text-tangerine transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-payne hover:text-tangerine transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-payne hover:text-tangerine transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-payne hover:text-tangerine transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-payne text-center md:text-left mb-4 md:mb-0">
                &copy; 2025 Lightink. All rights reserved. Made with ❤️ for authors everywhere.
              </p>
              <div className="flex items-center space-x-6 text-sm text-payne">
                <span className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>SOC 2 Compliant</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Bank-level Security</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}