"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Shield, Check, AlertCircle, Loader2, Apple, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { TrustIndicators } from '@/components/ui/trust-indicators';

interface EnhancedPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    id: string;
    name: string;
    price: number;
    period: string;
    yearlyPrice?: number;
  } | null;
  onPaymentSuccess: (paymentData: any) => void;
  userEmail?: string; // Pre-populate from upload step
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingEmail: string;
}

export default function EnhancedPaymentModal({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  onPaymentSuccess,
  userEmail = ''
}: EnhancedPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingEmail: userEmail
  });
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  if (!isOpen || !selectedPlan) return null;

  const currentPrice = billingPeriod === 'yearly' && selectedPlan.yearlyPrice 
    ? selectedPlan.yearlyPrice 
    : selectedPlan.price;
  
  const savings = selectedPlan.yearlyPrice 
    ? (selectedPlan.price * 12) - selectedPlan.yearlyPrice 
    : 0;

  // Enhanced form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = 'Please enter cardholder name';
      }
    }

    if (!formData.billingEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billingEmail)) {
      newErrors.billingEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enhanced card number formatting
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    if (errors[field as keyof PaymentFormData]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handlePayment = async (method: 'card' | 'apple' | 'google') => {
    if (method === 'card' && !validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing with different methods
      const processingTime = method === 'card' ? 3000 : 1500;
      await new Promise(resolve => setTimeout(resolve, processingTime));
      
      const isSuccess = Math.random() > 0.05; // 95% success rate
      
      if (isSuccess) {
        const paymentData = {
          transactionId: 'txn_' + Date.now(),
          plan: selectedPlan,
          amount: currentPrice,
          period: billingPeriod,
          paymentMethod: method,
          last4: method === 'card' ? formData.cardNumber.slice(-4) : '****',
          timestamp: new Date().toISOString()
        };
        
        toast.success('Payment successful! Redirecting to analysis...');
        onPaymentSuccess(paymentData);
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-tangerine rounded-xl flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-museo font-bold text-charcoal">Secure Checkout</h2>
                <p className="text-sm text-payne">{selectedPlan.name} - Professional Analysis</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Trust Indicators */}
            <TrustIndicators variant="payment" className="justify-center" />

            {/* Enhanced Plan Summary */}
            <Card className="border-2 border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-charcoal">{selectedPlan.name}</h3>
                    <p className="text-sm text-payne">Professional manuscript analysis</p>
                  </div>
                  <Badge className="bg-tangerine text-white">Selected</Badge>
                </div>

                {/* Enhanced Billing Period Toggle */}
                {selectedPlan.yearlyPrice && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-4 p-3 bg-white rounded-xl border">
                      <label className="flex items-center space-x-2 cursor-pointer flex-1">
                        <input
                          type="radio"
                          name="billing"
                          value="monthly"
                          checked={billingPeriod === 'monthly'}
                          onChange={() => setBillingPeriod('monthly')}
                          className="text-tangerine focus:ring-tangerine"
                        />
                        <div>
                          <span className="text-sm font-medium">Monthly</span>
                          <p className="text-xs text-gray-500">${selectedPlan.price}/month</p>
                        </div>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer flex-1">
                        <input
                          type="radio"
                          name="billing"
                          value="yearly"
                          checked={billingPeriod === 'yearly'}
                          onChange={() => setBillingPeriod('yearly')}
                          className="text-tangerine focus:ring-tangerine"
                        />
                        <div>
                          <span className="text-sm font-medium">Yearly</span>
                          <p className="text-xs text-green-600">
                            ${selectedPlan.yearlyPrice}/year (Save ${savings})
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                <Separator />
                
                <div className="flex items-center justify-between pt-4">
                  <span className="font-semibold text-charcoal">Total Today:</span>
                  <span className="text-2xl font-bold text-charcoal">
                    ${currentPrice}
                    <span className="text-sm font-normal text-payne">
                      /{billingPeriod === 'yearly' ? 'year' : 'month'}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-charcoal">Choose Payment Method</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border-2 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-tangerine bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Credit Card</span>
                </button>
                
                <button
                  onClick={() => handlePayment('apple')}
                  disabled={isProcessing}
                  className="p-4 border-2 border-gray-200 rounded-xl flex items-center justify-center space-x-2 hover:border-gray-300 transition-all"
                >
                  <Apple className="h-5 w-5" />
                  <span className="font-medium">Apple Pay</span>
                </button>
                
                <button
                  onClick={() => handlePayment('google')}
                  disabled={isProcessing}
                  className="p-4 border-2 border-gray-200 rounded-xl flex items-center justify-center space-x-2 hover:border-gray-300 transition-all"
                >
                  <Smartphone className="h-5 w-5" />
                  <span className="font-medium">Google Pay</span>
                </button>
              </div>
            </div>

            {/* Enhanced Card Form */}
            {paymentMethod === 'card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="font-semibold text-charcoal flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Card Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        maxLength={19}
                        className={`border-2 ${errors.cardNumber ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-600 mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        maxLength={5}
                        className={`border-2 ${errors.expiryDate ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-600 mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        maxLength={4}
                        className={`border-2 ${errors.cvv ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-600 mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        className={`border-2 ${errors.cardholderName ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                      />
                      {errors.cardholderName && (
                        <p className="text-sm text-red-600 mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.cardholderName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing Email */}
                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Email Address</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.billingEmail}
                    onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                    className={`border-2 ${errors.billingEmail ? 'border-red-400' : 'border-gray-300'} focus:border-tangerine`}
                  />
                  {errors.billingEmail && (
                    <p className="text-sm text-red-600 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.billingEmail}
                    </p>
                  )}
                </div>

                {/* Enhanced Security Notice */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Your Payment is Protected</p>
                      <p className="text-sm text-green-700">
                        We use bank-level 256-bit SSL encryption. Your card details are never stored 
                        on our servers and are processed securely by our PCI-compliant payment processor.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <Button
                  onClick={() => handlePayment('card')}
                  size="lg"
                  variant="default"
                  className="w-full text-lg py-4"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Complete Payment - ${currentPrice}
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Enhanced Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 pt-4 border-t">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-4 w-4" />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4" />
                <span>30-day Guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}