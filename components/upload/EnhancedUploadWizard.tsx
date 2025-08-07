"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Check, X, Mail, Shield, Clock, AlertCircle, ChevronRight, ChevronLeft,
  User, BookOpen, Target, Globe, Calendar, FileCheck, Star, Zap, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { WordCountLimitation } from '@/components/ui/free-tier-enhancements';

interface UploadedFile {
  file: File;
  wordCount: number;
  preflightChecks: {
    format: boolean;
    size: boolean;
    readability: boolean;
  };
}

interface ManuscriptDetails {
  authorName: string;
  manuscriptTitle: string;
  genre: string;
  wordCount: number;
  publicationStatus: string;
  targetAudience: string;
  synopsis: string;
  email: string;
}

interface EnhancedUploadWizardProps {
  onComplete: (data: { file: UploadedFile; details: ManuscriptDetails; selectedPlan: string }) => void;
  onBack?: () => void;
}

const genres = [
  'Fantasy', 'Science Fiction', 'Romance', 'Mystery/Thriller', 'Literary Fiction',
  'Historical Fiction', 'Young Adult', 'Middle Grade', 'Non-Fiction', 'Biography/Memoir',
  'Self-Help', 'Business', 'Poetry', 'Drama/Screenplay', 'Other'
];

const targetAudiences = [
  'General Adult', 'Young Adult (13-17)', 'Middle Grade (8-12)', 'Children (5-8)',
  'Academic/Professional', 'Niche/Specialized', 'International/Global'
];

const publicationStatuses = [
  'Unpublished (First Draft)', 'Unpublished (Revised Draft)', 'Self-Published',
  'Traditionally Published', 'Previously Published (Seeking Revision)'
];

const plans = [
  {
    id: 'free',
    name: 'Free Analysis',
    price: 0,
    period: 'one-time',
    icon: Star,
    description: 'Perfect for getting started',
    wordLimit: '10,000 words',
    features: [
      'Basic plot structure review',
      'Simple character assessment', 
      'General pacing overview',
      'Limited revision suggestions',
      'Basic PDF report'
    ],
    recommended: false,
    color: 'from-gray-400 to-gray-500'
  },
  {
    id: 'pro',
    name: 'Pro Analysis',
    price: 24,
    period: 'month',
    yearlyPrice: 240,
    icon: Zap,
    description: 'For serious writers',
    wordLimit: '100,000 words',
    features: [
      'Complete structural analysis',
      'Advanced plot analysis with hole detection',
      'Character relationship mapping',
      'Pacing heatmap visualization',
      'Comprehensive revision roadmap',
      'Interactive dashboard access'
    ],
    recommended: true,
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'premium',
    name: 'Premium Workshop',
    price: 49,
    period: 'month',
    yearlyPrice: 490,
    icon: Crown,
    description: 'For professional authors',
    wordLimit: 'Unlimited words',
    features: [
      'Everything in Pro, plus:',
      'Unlimited word count analysis',
      'Genre-specific insights',
      'Market readiness assessment',
      'Publishing recommendations',
      'Priority AI processing'
    ],
    recommended: false,
    color: 'from-purple-400 to-indigo-500'
  }
];

export default function EnhancedUploadWizard({ onComplete, onBack }: EnhancedUploadWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro'); // Default to recommended plan
  
  const [manuscriptDetails, setManuscriptDetails] = useState<ManuscriptDetails>({
    authorName: '',
    manuscriptTitle: '',
    genre: '',
    wordCount: 0,
    publicationStatus: '',
    targetAudience: '',
    synopsis: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<ManuscriptDetails>>({});

  const totalSteps = 3;

  // File validation - only show warnings for invalid files
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const allowedExtensions = ['.docx', '.doc', '.pdf', '.txt', '.rtf', '.odt'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const maxSize = 25 * 1024 * 1024; // 25MB

    if (!allowedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: `Unsupported format. Please upload: ${allowedExtensions.join(', ')}`
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 25MB'
      };
    }

    return { isValid: true };
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

  // Enhanced file processing
  const handleFile = async (file: File) => {
    const validation = validateFile(file);
    
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing with progress
    const progressSteps = [
      { progress: 20, message: "Securing your manuscript..." },
      { progress: 40, message: "Validating file format..." },
      { progress: 60, message: "Analyzing document structure..." },
      { progress: 80, message: "Counting words..." },
      { progress: 100, message: "Upload complete!" }
    ];

    for (const step of progressSteps) {
      setUploadProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    try {
      // Auto-detect word count and other metadata
      const mockWordCount = Math.floor(Math.random() * 80000) + 20000;
      
      const uploadedFileData: UploadedFile = {
        file,
        wordCount: mockWordCount,
        preflightChecks: {
          format: true,
          size: true,
          readability: true
        }
      };
      
      setUploadedFile(uploadedFileData);
      
      // Auto-populate manuscript details from file
      setManuscriptDetails(prev => ({
        ...prev,
        manuscriptTitle: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        wordCount: mockWordCount
      }));
      
      toast.success('File uploaded successfully!');
      
      // Auto-advance to next step
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

  // Form validation for Step 2
  const validateManuscriptDetails = (): boolean => {
    const newErrors: Partial<ManuscriptDetails> = {};

    if (!manuscriptDetails.authorName.trim()) {
      newErrors.authorName = 'Author name is required';
    }
    if (!manuscriptDetails.manuscriptTitle.trim()) {
      newErrors.manuscriptTitle = 'Manuscript title is required';
    }
    if (!manuscriptDetails.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manuscriptDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!manuscriptDetails.genre) {
      newErrors.genre = 'Please select a genre';
    }
    if (!manuscriptDetails.publicationStatus) {
      newErrors.publicationStatus = 'Please select publication status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsChange = (field: keyof ManuscriptDetails, value: string | number) => {
    setManuscriptDetails(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleStepTwo = () => {
    if (validateManuscriptDetails()) {
      setCurrentStep(3);
    }
  };

  const handleComplete = () => {
    if (uploadedFile && selectedPlan) {
      onComplete({
        file: uploadedFile,
        details: manuscriptDetails,
        selectedPlan
      });
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
        {/* Enhanced Header */}
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
              <span className={currentStep >= 1 ? 'text-charcoal font-medium' : ''}>
                Upload File
              </span>
              <span className={currentStep >= 2 ? 'text-charcoal font-medium' : ''}>
                Manuscript Details
              </span>
              <span className={currentStep >= 3 ? 'text-charcoal font-medium' : ''}>
                Choose Plan
              </span>
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
                  <CardTitle className="text-2xl font-museo">
                    {!uploadedFile ? 'Upload Your Manuscript' : 'File Successfully Uploaded'}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {!uploadedFile 
                      ? 'Drag and drop your file or click to browse'
                      : 'Your manuscript is ready for analysis'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!uploadedFile && !isProcessing ? (
                    <>
                      {/* Upload Zone */}
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

                      {/* Trust Indicators */}
                      <div className="grid grid-cols-3 gap-4 text-center pt-6 border-t">
                        <div className="flex flex-col items-center space-y-2">
                          <Shield className="h-6 w-6 text-green-600" />
                          <span className="text-sm text-payne font-medium">Secure Upload</span>
                          <span className="text-xs text-gray-500">Your work stays private</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <Clock className="h-6 w-6 text-blue-600" />
                          <span className="text-sm text-payne font-medium">Quick Analysis</span>
                          <span className="text-xs text-gray-500">Results in minutes</span>
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
                        <h3 className="text-xl font-semibold text-charcoal">Processing Your Manuscript</h3>
                        <p className="text-payne">Analyzing structure and preparing for insights...</p>
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
                          <h4 className="font-semibold text-charcoal">Validation Complete</h4>
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
                      
                      <div className="flex justify-center">
                        <Button 
                          size="lg" 
                          variant="default"
                          className=""
                          onClick={() => setCurrentStep(2)}
                        >
                          Continue to Manuscript Details
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Manuscript Details */}
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
                  <CardTitle className="text-2xl font-museo">Manuscript Details</CardTitle>
                  <CardDescription className="text-lg">
                    Help us provide more targeted analysis for your work
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Author Name */}
                    <div className="space-y-2">
                      <Label htmlFor="authorName" className="text-base font-medium">
                        Author Name *
                      </Label>
                      <Input
                        id="authorName"
                        type="text"
                        placeholder="Your full name"
                        value={manuscriptDetails.authorName}
                        onChange={(e) => handleDetailsChange('authorName', e.target.value)}
                        className={`border-2 ${errors.authorName ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                      {errors.authorName && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.authorName}
                        </p>
                      )}
                    </div>

                    {/* Manuscript Title */}
                    <div className="space-y-2">
                      <Label htmlFor="manuscriptTitle" className="text-base font-medium">
                        Manuscript Title *
                      </Label>
                      <Input
                        id="manuscriptTitle"
                        type="text"
                        placeholder="The title of your work"
                        value={manuscriptDetails.manuscriptTitle}
                        onChange={(e) => handleDetailsChange('manuscriptTitle', e.target.value)}
                        className={`border-2 ${errors.manuscriptTitle ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                      {errors.manuscriptTitle && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.manuscriptTitle}
                        </p>
                      )}
                    </div>

                    {/* Genre */}
                    <div className="space-y-2">
                      <Label htmlFor="genre" className="text-base font-medium">
                        Genre/Category *
                      </Label>
                      <Select value={manuscriptDetails.genre} onValueChange={(value) => handleDetailsChange('genre', value)}>
                        <SelectTrigger className={`border-2 ${errors.genre ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}>
                          <SelectValue placeholder="Select your genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.genre && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.genre}
                        </p>
                      )}
                    </div>

                    {/* Word Count (Auto-detected but editable) */}
                    <div className="space-y-2">
                      <Label htmlFor="wordCount" className="text-base font-medium">
                        Word Count
                      </Label>
                      <Input
                        id="wordCount"
                        type="number"
                        value={manuscriptDetails.wordCount}
                        onChange={(e) => handleDetailsChange('wordCount', parseInt(e.target.value) || 0)}
                        className="border-2 border-gray-300 focus:border-tangerine"
                      />
                      <p className="text-xs text-payne">Auto-detected from your file (editable)</p>
                    </div>

                    {/* Publication Status */}
                    <div className="space-y-2">
                      <Label htmlFor="publicationStatus" className="text-base font-medium">
                        Publication Status *
                      </Label>
                      <Select value={manuscriptDetails.publicationStatus} onValueChange={(value) => handleDetailsChange('publicationStatus', value)}>
                        <SelectTrigger className={`border-2 ${errors.publicationStatus ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}>
                          <SelectValue placeholder="Select publication status" />
                        </SelectTrigger>
                        <SelectContent>
                          {publicationStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.publicationStatus && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.publicationStatus}
                        </p>
                      )}
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience" className="text-base font-medium">
                        Target Audience
                      </Label>
                      <Select value={manuscriptDetails.targetAudience} onValueChange={(value) => handleDetailsChange('targetAudience', value)}>
                        <SelectTrigger className="border-2 border-gray-300 focus:border-tangerine">
                          <SelectValue placeholder="Select target audience (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {targetAudiences.map((audience) => (
                            <SelectItem key={audience} value={audience}>
                              {audience}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-payne" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={manuscriptDetails.email}
                        onChange={(e) => handleDetailsChange('email', e.target.value)}
                        className={`pl-10 border-2 ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Synopsis (Optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="synopsis" className="text-base font-medium">
                      Brief Synopsis (Optional)
                    </Label>
                    <Textarea
                      id="synopsis"
                      placeholder="A brief description of your manuscript (helps us provide more targeted insights)"
                      value={manuscriptDetails.synopsis}
                      onChange={(e) => handleDetailsChange('synopsis', e.target.value)}
                      className="border-2 border-gray-300 focus:border-tangerine min-h-[100px]"
                      maxLength={500}
                    />
                    <p className="text-xs text-payne">
                      {manuscriptDetails.synopsis.length}/500 characters
                    </p>
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
                      onClick={handleStepTwo}
                    >
                      Continue to Plan Selection
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Choose Plan */}
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
                  <CardTitle className="text-2xl font-museo">Choose Your Analysis Plan</CardTitle>
                  <CardDescription className="text-lg">
                    Select the depth of analysis that's right for your manuscript
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Plan Selection */}
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                    {plans.map((plan) => {
                      const Icon = plan.icon;
                      const isSelected = selectedPlan === plan.id;
                      
                      return (
                        <motion.div
                          key={plan.id}
                          whileHover={{ scale: 1.01 }}
                          className="relative"
                        >
                          {plan.recommended && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                              <Badge className="bg-tangerine text-white px-3 py-1 text-xs font-semibold">
                                Recommended
                              </Badge>
                            </div>
                          )}
                          
                          <div className={`relative border-4 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'border-tangerine bg-orange-50 shadow-neo-brutal' 
                              : 'border-gray-300 hover:border-tangerine hover:bg-orange-50'
                          }`}>
                            <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                            <label htmlFor={plan.id} className="cursor-pointer block">
                              <div className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0`}>
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-museo font-bold text-charcoal">
                                      {plan.name}
                                    </h3>
                                    <div className="text-right">
                                      {plan.price === 0 ? (
                                        <div className="text-2xl font-bold text-charcoal">Free</div>
                                      ) : (
                                        <div className="text-2xl font-bold text-charcoal">
                                          ${plan.price}
                                          <span className="text-sm font-normal text-payne">/{plan.period}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <p className="text-payne mb-3">{plan.description}</p>
                                  <Badge variant="secondary" className="mb-3">
                                    {plan.wordLimit}
                                  </Badge>
                                  
                                  {/* Word Count Warning for Free Plan */}
                                  {plan.id === 'free' && uploadedFile && (
                                    <WordCountLimitation 
                                      currentWordCount={uploadedFile.wordCount}
                                      limit={10000}
                                    />
                                  )}
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {plan.features.slice(0, 4).map((feature, index) => (
                                      <div key={index} className="flex items-center space-x-2">
                                        <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-payne">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {plan.features.length > 4 && (
                                    <p className="text-xs text-gray-500 mt-2">
                                      +{plan.features.length - 4} more features
                                    </p>
                                  )}
                                </div>
                                
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4"
                                  >
                                    <div className="w-6 h-6 bg-tangerine rounded-full flex items-center justify-center">
                                      <Check className="h-4 w-4 text-white" />
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </label>
                          </div>
                        </motion.div>
                      );
                    })}
                  </RadioGroup>

                  {/* Summary */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Manuscript:</span>
                        <span className="font-medium text-blue-800">{manuscriptDetails.manuscriptTitle || 'Untitled'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Author:</span>
                        <span className="font-medium text-blue-800">{manuscriptDetails.authorName || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Word Count:</span>
                        <span className="font-medium text-blue-800">{manuscriptDetails.wordCount.toLocaleString()} words</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Selected Plan:</span>
                        <span className="font-medium text-blue-800">
                          {plans.find(p => p.id === selectedPlan)?.name}
                        </span>
                      </div>
                    </div>
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
                      variant="default"
                      className=""
                      onClick={handleComplete}
                    >
                      {selectedPlan === 'free' ? 'Start Free Analysis' : 'Proceed to Payment'}
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