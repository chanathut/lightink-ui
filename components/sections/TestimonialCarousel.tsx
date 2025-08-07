"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    text: "Lightink transformed my editing process. What used to take months of confusion now takes minutes of clarity. The revision roadmap is brilliant.",
    author: "Sarah M.",
    role: "Fantasy Author",
    avatar: "👩‍💼",
    rating: 5
  },
  {
    id: 2,
    text: "As someone who spent $4,000 on developmental editing before, Lightink gives 80% of the value for 5% of the cost. Incredible.",
    author: "Michael C.",
    role: "Thriller Author",
    avatar: "👨‍💻",
    rating: 5
  },
  {
    id: 3,
    text: "The pacing heatmap alone was worth the entire cost. I could finally see what my beta readers couldn't articulate.",
    author: "Emma T.",
    role: "Romance Author",
    avatar: "👩‍🎨",
    rating: 5
  },
  {
    id: 4,
    text: "Finally, objective feedback that doesn't crush my soul! The AI analysis helped me identify plot holes I was completely blind to.",
    author: "David R.",
    role: "Sci-Fi Author",
    avatar: "👨‍🔬",
    rating: 5
  },
  {
    id: 5,
    text: "I was drowning in conflicting beta reader notes. Lightink gave me one clear, actionable path forward. Game changer!",
    author: "Lisa K.",
    role: "Mystery Author",
    avatar: "👩‍🕵️",
    rating: 5
  },
  {
    id: 6,
    text: "The character development insights were spot-on. It's like having a professional editor available 24/7 at a fraction of the cost.",
    author: "James W.",
    role: "Literary Fiction Author",
    avatar: "👨‍🎭",
    rating: 5
  }
];

export default function TestimonialCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-museo font-bold text-charcoal mb-4"
          >
            What Authors Are Saying
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-payne max-w-2xl mx-auto"
          >
            Join thousands of authors who've transformed their manuscripts with Lightink
          </motion.p>
        </div>

        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Carousel container */}
          <div 
            className="flex"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              width: `${duplicatedTestimonials.length * 400}px`, // 400px = 24rem + 2rem gap
            }}
          >
            <motion.div
              className="flex"
              animate={{
                x: isPaused ? undefined : [`0px`, `-${testimonials.length * 400}px`]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60, // 60 seconds for full cycle
                  ease: "linear"
                }
              }}
              style={{
                width: `${duplicatedTestimonials.length * 400}px`,
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="neo-brutal-card p-6 w-96 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    marginRight: '2rem'
                  }}
                >
                  {/* Star Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-payne mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full mr-4 border-2 border-charcoal shadow-neo-brutal-tiny bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{testimonial.author}</p>
                      <p className="text-sm text-payne">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pause indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPaused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-payne bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-gray-200">
            Carousel paused - move cursor away to resume
          </p>
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 max-w-2xl mx-auto">
            <p className="text-charcoal font-semibold mb-2">
              Join 10,000+ authors who've discovered clarity
            </p>
            <p className="text-payne text-sm">
              Average rating: 4.9/5 stars • 98% would recommend to fellow authors
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}