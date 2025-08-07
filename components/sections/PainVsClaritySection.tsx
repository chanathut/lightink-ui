"use client";

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const painPoints = [
  "Conflicting beta reader notes",
  "'Prohibitively expensive' editors", 
  "Can't see your own plot holes",
  "Vague, unhelpful feedback"
];

const clarityPoints = [
  "One objective, data-driven analysis",
  "Professional insights at a fraction of the cost",
  "A prioritized plan to fix structural issues", 
  "Actionable, clear next steps"
];

export default function PainVsClaritySection() {
  return (
    <section className="py-20 seamless-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-museo font-bold text-charcoal mb-4">
            Why Choose Lightink?
          </h3>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Pain Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-museo font-bold text-gray-600 mb-8 text-center">
              The Revision Rollercoaster
            </h3>
            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-gray-100 rounded-xl border-2 border-gray-300"
                >
                  <X className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Clarity Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-museo font-bold text-charcoal mb-8 text-center">
              The Lightink Roadmap
            </h3>
            <div className="space-y-4">
              {clarityPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-tangerine shadow-neo-brutal-small"
                >
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-charcoal font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}