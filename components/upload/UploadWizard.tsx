"use client";

import React from 'react';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, X, Mail, Shield, Clock, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface UploadedFile {
  file: File;
  wordCount: number;
  preflightChecks: {
    format: boolean;
    size: boolean;
    readability: boolean;
  };
}

interface UploadWizardProps {
  onComplete: (data: { file: UploadedFile; email: string }) => void;
  onBack?: () => void;
}

export default function UploadWizard({ onComplete, onBack }: UploadWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const totalSteps = 3;

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

  // File drag handlers
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

  // File processing with mock validation
  const handleFile = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing with progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Mock file validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const allowedExtensions = ['.docx', '.doc', '.pdf', '.txt', '.rtf', '.odt'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidFormat = allowedExtensions.includes(fileExtension);
      const isValidSize = file.size < 25 * 1024 * 1024; // 25MB limit
      const mockWordCount = Math.floor(Math.random() * 80000) + 20000;
      
      if (!isValidFormat) {
        toast.error('Please upload a supported file format (.docx, .doc, .pdf, .txt, .rtf, .odt)');
        setIsProcessing(false);
        setUploadProgress(0);
        return;
      }
      
      if (!isValidSize) {
        toast.error('File size must be less than 25MB');
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
          readability: true // Mock check
        }
      };
      
      setUploadProgress(100);
      setUploadedFile(uploadedFileData);
      toast.success('File uploaded successfully!');
      
      // Auto-advance to next step after success
      setTimeout(() => {
        setCurrentStep(2);
        setIsProcessing(false);
      }, 1000);
      
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const handleEmailSubmit = () => {
    if (validateEmail(email) && uploadedFile) {
      setCurrentStep(3);
    }
  };

  const handleComplete = () => {
    if (uploadedFile && email) {
      onComplete({ file: uploadedFile, email });
    }
  };

  const handleRetry = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsProcessing(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen seamless-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-museo font-bold text-charcoal">Upload Your Manuscript</h1>
                <p className="text-payne">Step {currentStep} of {totalSteps}</p>
              </div>
            </div>
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            <div className="flex justify-between text-sm text-payne">
              <span className={currentStep >= 1 ? 'text-charcoal font-medium' : ''}>Upload File</span>
              <span className={currentStep >= 2 ? 'text-charcoal font-medium' : ''}>Contact Info</span>
              <span className={currentStep >= 3 ? 'text-charcoal font-medium' : ''}>Review</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: File Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-museo">Select Your Manuscript</CardTitle>
                  <CardDescription className="text-lg">
                    Upload your .docx file to begin the analysis process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!uploadedFile && !isProcessing ? (
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
                            {dragActive ? 'Drop your manuscript here!' : 'Drag & drop your manuscript'}
                          </p>
                          <p className="text-payne mb-4">
                            Supported: .docx, .doc, .pdf, .txt, .rtf, .odt (max 25MB)
                          </p>
                          <Button className="neo-brutal-button">
                            Browse Files
                          </Button>
                        </div>
                      </motion.div>
                    </div>
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
                        <h3 className="text-xl font-semibold text-charcoal">Processing Your Manuscript</h3>
                        <p className="text-payne">Validating format and analyzing structure...</p>
                        <Progress value={uploadProgress} className="max-w-md mx-auto" />
                        <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                      </div>
                    </motion.div>
                  ) : uploadedFile ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
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
                          <h4 className="font-semibold text-charcoal">Pre-flight Analysis</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {Object.entries(uploadedFile.preflightChecks).map(([check, passed]) => (
                              <div key={check} className="flex items-center space-x-2 p-2 bg-white rounded border">
                                {passed ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span className={`text-sm capitalize ${passed ? 'text-green-700' : 'text-red-700'}`}>
                                  {check} {passed ? 'valid' : 'invalid'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          size="lg" 
                          className="neo-brutal-button"
                          onClick={() => setCurrentStep(2)}
                        >
                          Continue
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  ) : null}
                  
                  {/* Trust Indicators */}
                  <div className="grid grid-cols-3 gap-4 text-center pt-6 border-t">
                    <div className="flex flex-col items-center space-y-2">
                      <Shield className="h-6 w-6 text-green-600" />
                      <span className="text-sm text-payne">100% Secure</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Clock className="h-6 w-6 text-blue-600" />
                      <span className="text-sm text-payne">10 Min Analysis</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <X className="h-6 w-6 text-red-600" />
                      <span className="text-sm text-payne">Auto-Delete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Email Collection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-museo">Contact Information</CardTitle>
                  <CardDescription className="text-lg">
                    We'll send your analysis report to this email address
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
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
                          className={`pl-10 border-2 focus:border-tangerine ${
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
                          <p className="text-sm font-medium text-blue-800">Privacy Guarantee</p>
                          <p className="text-sm text-blue-700">
                            Your email is only used for sending your analysis report. 
                            We never share your information or send marketing emails.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      size="lg" 
                      className="neo-brutal-button"
                      onClick={handleEmailSubmit}
                      disabled={!email || !!emailError}
                    >
                      Continue
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="neo-brutal-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-museo">Review Your Submission</CardTitle>
                  <CardDescription className="text-lg">
                    Please confirm your details before proceeding to payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {/* File Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                      <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Manuscript Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-payne">Filename:</span>
                          <p className="font-medium">{uploadedFile?.file.name}</p>
                        </div>
                        <div>
                          <span className="text-payne">Word Count:</span>
                          <p className="font-medium">{uploadedFile?.wordCount.toLocaleString()} words</p>
                        </div>
                        <div>
                          <span className="text-payne">File Size:</span>
                          <p className="font-medium">{uploadedFile ? (uploadedFile.file.size / 1024 / 1024).toFixed(1) : 0} MB</p>
                        </div>
                        <div>
                          <span className="text-payne">Format:</span>
                          <p className="font-medium flex items-center">
                            <Check className="h-3 w-3 text-green-600 mr-1" />
                            Valid .docx
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                      <h4 className="font-semibold text-charcoal mb-3 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Information
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{email}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setCurrentStep(2)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-semibold text-charcoal mb-2">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-payne">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-tangerine rounded-full"></div>
                        <span>Choose your analysis tier and complete payment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-tangerine rounded-full"></div>
                        <span>Our AI will analyze your manuscript (typically 5-10 minutes)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-tangerine rounded-full"></div>
                        <span>Receive your detailed report via email with secure access link</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      size="lg" 
                      className="neo-brutal-button"
                      onClick={handleComplete}
                    >
                      Proceed to Payment
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}