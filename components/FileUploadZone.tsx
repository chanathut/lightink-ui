"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, X, CreditCard, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import PricingPlans from './PricingPlans';

interface FileUploadZoneProps {
  onUploadComplete: (data: any) => void;
}

interface UploadedFile {
  file: File;
  wordCount: number;
  preflightChecks: {
    format: boolean;
    size: boolean;
    readability: boolean;
  };
}

export default function FileUploadZone({ onUploadComplete }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'payment' | 'processing'>('upload');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState('');

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

  const handleFile = async (file: File) => {
    // Simulate file processing and word count analysis
    const allowedExtensions = ['.docx', '.doc', '.pdf', '.txt', '.rtf', '.odt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidFormat = allowedExtensions.includes(fileExtension);
    const isValidSize = file.size < 25 * 1024 * 1024; // 25MB limit
    const mockWordCount = Math.floor(Math.random() * 80000) + 20000;
    
    if (!isValidFormat) {
      toast.error('Please upload a supported file format (.docx, .doc, .pdf, .txt, .rtf, .odt)');
      return;
    }
    
    if (!isValidSize) {
      toast.error('File size must be less than 25MB');
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
    
    setUploadedFile(uploadedFileData);
    toast.success('File uploaded successfully!');
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePayment = async () => {
    if (!email || !selectedPlan) {
      toast.error('Please provide your email and select a plan');
      return;
    }
    
    setCurrentStep('processing');
    
    // Simulate payment processing and analysis
    const steps = [
      'Processing payment...',
      'Uploading manuscript...',
      'Analyzing structure...',
      'Examining pacing...',
      'Mapping characters...',
      'Evaluating dialogue...',
      'Generating insights...',
      'Creating revision roadmap...',
      'Finalizing report...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i]);
      setProcessingProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Simulate analysis completion
    const mockAnalysisData = {
      id: 'analysis-' + Date.now(),
      manuscript: {
        title: uploadedFile?.file.name || 'Untitled',
        wordCount: uploadedFile?.wordCount || 0,
      },
      plan: selectedPlan,
      email: email,
      completedAt: new Date().toISOString(),
      // Mock analysis data will be added in the dashboard component
    };
    
    onUploadComplete(mockAnalysisData);
  };

  return (
    <div className="min-h-screen seamless-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-museo font-bold text-charcoal">Upload Manuscript</h1>
              <p className="text-payne">Get professional analysis in minutes</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            Step {currentStep === 'upload' ? '1' : currentStep === 'payment' ? '2' : '3'} of 3
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 'upload' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              {!uploadedFile ? (
                <Card className="neo-brutal-card p-8">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-3xl font-museo">Upload Your Manuscript</CardTitle>
                    <CardDescription className="text-lg">
                      Drag and drop your .docx file or click to browse
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`relative border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
                        dragActive 
                          ? 'border-tangerine bg-orange-50 scale-105' 
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
                        className="space-y-4"
                      >
                        <Upload className="h-16 w-16 text-payne mx-auto" />
                        <div>
                          <p className="text-xl font-semibold text-charcoal mb-2">
                            Drop your manuscript here
                          </p>
                          <p className="text-payne">
                            Supported formats: .docx, .doc, .pdf, .txt, .rtf, .odt (max 25MB)
                          </p>
                        </div>
                        <Button className="neo-brutal-button">
                          Browse Files
                        </Button>
                      </motion.div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <Lock className="h-6 w-6 text-green-600" />
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
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* File Preview */}
                  <Card className="neo-brutal-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <Check className="h-6 w-6 text-green-600" />
                        <span>File Successfully Uploaded</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedFile(null)}
                        >
                          Change File
                        </Button>
                      </div>
                      
                      {/* Preflight Checks */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-charcoal mb-3">Pre-flight Analysis</h4>
                        <div className="space-y-2">
                          {Object.entries(uploadedFile.preflightChecks).map(([check, passed]) => (
                            <div key={check} className="flex items-center space-x-3">
                              {passed ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <X className="h-4 w-4 text-red-600" />
                              )}
                              <span className={`capitalize ${passed ? 'text-green-700' : 'text-red-700'}`}>
                                {check} {passed ? 'valid' : 'invalid'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email Input */}
                  <Card className="neo-brutal-card">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>
                        We'll send your analysis report to this email address
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-2 border-gray-300 focus:border-tangerine"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Continue Button */}
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="neo-brutal-button px-8"
                      onClick={() => setCurrentStep('payment')}
                      disabled={!email}
                    >
                      Continue to Analysis Options
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 'payment' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-museo font-bold text-charcoal mb-2">
                  Choose Your Analysis Level
                </h2>
                <p className="text-lg text-payne">
                  Select the depth of analysis that's right for your manuscript
                </p>
              </div>
              
              <PricingPlans onPlanSelect={handlePlanSelect} selectedPlan={selectedPlan} />
              
              {selectedPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card className="neo-brutal-card max-w-2xl mx-auto">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Complete Your Order</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Selected Plan:</span>
                            <Badge className="bg-tangerine text-white">
                              {selectedPlan === 'free' ? 'Free Analysis' : 
                               selectedPlan === 'pro' ? 'Pro Analysis' : 'Premium Workshop'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">Email:</span>
                            <span className="text-payne">{email}</span>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between gap-4">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentStep('upload')}
                          >
                            Back to Upload
                          </Button>
                          <Button
                            size="lg"
                            className="neo-brutal-button flex-1"
                            onClick={handlePayment}
                          >
                            {selectedPlan === 'free' ? 'Start Free Analysis' : 'Process Payment & Start Analysis'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 'processing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="neo-brutal-card text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-museo">Analyzing Your Manuscript</CardTitle>
                  <CardDescription className="text-lg">
                    Our AI is working hard to give you professional insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-tangerine border-t-transparent rounded-full mx-auto"
                  />
                  
                  <div className="space-y-3">
                    <Progress value={processingProgress} className="h-3" />
                    <p className="text-payne font-medium">{processingStep}</p>
                    <p className="text-sm text-gray-500">
                      {Math.round(processingProgress)}% complete
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Did you know?</strong> Our AI analyzes over 50 different aspects 
                      of your manuscript to provide comprehensive feedback that would normally 
                      take weeks to get from human editors.
                    </p>
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