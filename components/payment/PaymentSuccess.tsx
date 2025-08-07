"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PaymentSuccessProps {
  paymentData: {
    transactionId: string;
    plan: {
      id: string;
      name: string;
      price: number;
      period: string;
    };
    amount: number;
    period: string;
    paymentMethod: string;
    last4: string;
    timestamp: string;
  };
  onContinueToAnalysis: () => void;
}

export default function PaymentSuccess({ paymentData, onContinueToAnalysis }: PaymentSuccessProps) {
  const handleDownloadReceipt = () => {
    // Mock receipt download
    const receiptData = {
      transactionId: paymentData.transactionId,
      date: new Date(paymentData.timestamp).toLocaleDateString(),
      plan: paymentData.plan.name,
      amount: paymentData.amount,
      paymentMethod: `**** **** **** ${paymentData.last4}`
    };
    
    console.log('Downloading receipt:', receiptData);
    alert('Receipt download would be implemented here');
  };

  return (
    <div className="min-h-screen seamless-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <Card className="neo-brutal-card text-center">
          <CardHeader className="pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <CardTitle className="text-3xl font-museo font-bold text-charcoal mb-2">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-lg text-payne">
              Your manuscript analysis is now being processed
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <h3 className="font-semibold text-charcoal mb-4 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-payne">Plan:</span>
                  <Badge className="bg-tangerine text-white">{paymentData.plan.name}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-payne">Amount:</span>
                  <span className="font-semibold text-charcoal">
                    ${paymentData.amount}/{paymentData.period}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-payne">Payment Method:</span>
                  <span className="text-charcoal">**** **** **** {paymentData.last4}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-payne">Transaction ID:</span>
                  <span className="text-charcoal font-mono text-sm">{paymentData.transactionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-payne">Date:</span>
                  <span className="text-charcoal">
                    {new Date(paymentData.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* What Happens Next */}
            <div className="text-left space-y-4">
              <h3 className="font-semibold text-charcoal mb-4">What happens next?</h3>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Analysis in Progress</p>
                    <p className="text-sm text-blue-700">
                      Our AI is currently analyzing your manuscript. This typically takes 5-10 minutes.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Email Notification</p>
                    <p className="text-sm text-green-700">
                      You'll receive an email with a secure link to view your detailed analysis report.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-purple-800">Access Your Dashboard</p>
                    <p className="text-sm text-purple-700">
                      View interactive visualizations, insights, and your personalized revision roadmap.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-2 border-charcoal hover:bg-charcoal hover:text-white"
                onClick={handleDownloadReceipt}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button
                size="lg"
                variant="default"
                className="flex-1"
                onClick={onContinueToAnalysis}
              >
                Continue to Analysis
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Support Info */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-orange-800">Need Help?</p>
                  <p className="text-sm text-orange-700">
                    If you have any questions about your analysis or need support, 
                    contact us at <a href="mailto:support@lightink.com" className="underline font-medium">support@lightink.com</a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}