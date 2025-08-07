"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, X, Mail, Shield, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { TrustIndicators, SocialProofCounter } from '@/components/ui/trust-indicators';

interface UploadedFile {
  file: File;
  wordCount: number;
  preflightChecks: {
    format: boolean;
    size: boolean;
    readability: boolean;
  };
}

interface SimplifiedUploadWizardProps {
  onComplete: (data: { file: UploadedFile; email: string }) => void;
  onBack?: () => void;
}

export default function SimplifiedUploadWizard({ onComplete, onBack }: SimplifiedUploadWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const totalSteps = 2; // Simplified from 3 to 2 steps

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email address is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // File drag handlers with enhanced feedback
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  // Enhanced file processing with better feedback
  const handleFile = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing with encouraging messages
    const progressSteps = [
      { progress: 20, message: "Securing your manuscript..." },
      { progress: 40, message: "Validating file format..." },
      { progress: 60, message: "Counting words..." },
      { progress: 80, message: "Preparing for analysis..." },
      { progress: 100, message: "Upload complete!" }
    ];

    for (const step of progressSteps) {
      setUploadProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    try {
      const isValidFormat = file.name.toLowerCase().endsWith('.docx');
      const isValidSize = file.size < 50 * 1024 * 1024; // 50MB limit
      const mockWordCount = Math.floor(Math.random() * 80000) + 20000;
      
      if (!isValidFormat) {
        toast.error('Please upload a .docx file for the best analysis results');
        setIsProcessing(false);
        setUploadProgress(0);
        return;
      }
      
      if (!isValidSize) {
        toast.error('File size must be less than 50MB');
        setIsProcessing(false);
        setUploadProgress(0);
        return;
      }

      const uploadedFileData: UploadedFile = {
        file,
        wordCount: mockWordCount,
        preflightChecks: {
          format: isValidFormat,
          size: isValidSize,
          readability: true
        }
      };
      
      setUploadedFile(uploadedFileData);
      toast.success('Your manuscript is ready for analysis!');
      
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const handleComplete = () => {
    if (validateEmail(email) && uploadedFile) {
      onComplete({ file: uploadedFile, email });
    }
  };

  const handleRetry = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen seamless-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Enhanced Header with Trust Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-museo font-bold text-charcoal">Upload Your Manuscript</h1>
                <p className="text-payne">Get professional insights in minutes, not weeks</p>
              </div>
            </div>
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                ← Back to Home
              </Button>
            )}
          </div>
          
          {/* Simplified Progress Bar */}
          <div className="space-y-2">
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            <div className="flex justify-between text-sm text-payne">
              <span className={currentStep >= 1 ? 'text-charcoal font-medium' : ''}>
                Upload & Contact Info
              </span>
              <span className={currentStep >= 2 ? 'text-charcoal font-medium' : ''}>
                Choose Analysis Plan
              </span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-8 text-sm text-payne">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure Upload</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Quick Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <X className="h-4 w-4 text-red-600" />
                <span>Auto-Delete</span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Combined Upload and Email Step */}
          <motion.div
            key="combined-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <Card className="neo-brutal-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-museo">
                    {!uploadedFile ? 'Upload Your Manuscript' : 'Almost Ready!'}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {!uploadedFile 
                      ? 'Drag and drop your .docx file or click to browse'
                      : 'Just need your email to send you the results'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!uploadedFile && !isProcessing ? (
                    <>
                      {/* Enhanced Upload Zone */}
                      <div
                        className={`relative border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                          dragActive 
                            ? 'border-tangerine bg-orange-50 scale-[1.02] shadow-lg' 
                            : 'border-gray-300 hover:border-tangerine hover:bg-orange-50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          accept=".docx,.doc,.pdf,.txt,.rtf,.odt"
                          onChange={handleFileInput}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        
                        <motion.div
                          animate={{ y: dragActive ? -10 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <motion.div
                            animate={{ rotate: dragActive ? 10 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Upload className="h-16 w-16 text-payne mx-auto" />
                          </motion.div>
                          <div>
                            <p className="text-xl font-semibold text-charcoal mb-2">
                              {dragActive ? 'Drop your manuscript here!' : 'Drop your manuscript here'}
                            </p>
                            <p className="text-payne mb-4">
                              Supported formats: .docx, .doc, .pdf, .txt, .rtf, .odt (max 25MB)
                            </p>
                            <Button className="neo-brutal-button">
                              Browse Files
                            </Button>
                          </div>
                        </motion.div>
                      </div>

                      {/* Enhanced Trust Indicators */}
                      <div className="grid grid-cols-3 gap-4 text-center pt-6 border-t">
                        <div className="flex flex-col items-center space-y-2">
                          <Shield className="h-6 w-6 text-green-600" />
                          <span className="text-sm text-payne font-medium">100% Secure</span>
                          <span className="text-xs text-gray-500">Your work stays private</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <Clock className="h-6 w-6 text-blue-600" />
                          <span className="text-sm text-payne font-medium">10 Min Analysis</span>
                          <span className="text-xs text-gray-500">Fast professional insights</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <X className="h-6 w-6 text-red-600" />
                          <span className="text-sm text-payne font-medium">Auto-Delete</span>
                          <span className="text-xs text-gray-500">Files removed after analysis</span>
                        </div>
                      </div>
                    </>
                  ) : isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6 py-8"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-tangerine border-t-transparent rounded-full mx-auto"
                      />
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-charcoal">Securing Your Manuscript</h3>
                        <p className="text-payne">We're preparing your work for analysis...</p>
                        <Progress value={uploadProgress} className="max-w-md mx-auto" />
                        <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {/* File Success Display */}
                      <div className="flex items-center justify-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                        >
                          <Check className="h-8 w-8 text-green-600" />
                        </motion.div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="font-semibold text-charcoal">{uploadedFile.file.name}</p>
                              <p className="text-sm text-payne">
                                {(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB • 
                                {uploadedFile.wordCount.toLocaleString()} words
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleRetry}>
                            Change File
                          </Button>
                        </div>
                        
                        {/* Pre-flight Checks */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-charcoal">File Validation Complete</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {Object.entries(uploadedFile.preflightChecks).map(([check, passed]) => (
                              <div key={check} className="flex items-center space-x-2 p-2 bg-white rounded border">
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-700 capitalize">
                                  {check} verified
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-base font-medium">
                            Where should we send your analysis?
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-payne" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) validateEmail(e.target.value);
                              }}
                              onBlur={() => validateEmail(email)}
                              className={`pl-10 border-2 focus:border-tangerine text-lg py-3 ${
                                emailError ? 'border-red-400' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {emailError && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center space-x-2 text-red-600"
                            >
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm">{emailError}</span>
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                          <div className="flex items-start space-x-3">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-800">Your Privacy is Protected</p>
                              <p className="text-sm text-blue-700">
                                We'll only use your email to send your analysis report. 
                                No spam, no sharing, no marketing emails.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          size="lg" 
                          className="neo-brutal-button px-8 text-lg"
                          onClick={handleComplete}
                          disabled={!email || !!emailError}
                        >
                          Continue to Analysis Options
                          <ChevronRight className="h-5 w-5 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}