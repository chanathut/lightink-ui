"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Target,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { STUDIO_NAV_ITEMS } from '@/lib/studio-constants';
import { useState, useEffect } from 'react';

interface StudioNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const iconMap = {
  BarChart3,
  TrendingUp,
  Users,
  MessageCircle,
  BookOpen,
  Target,
} as const;

export default function StudioNav({ activeTab, onTabChange, className }: StudioNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  // Mobile Navigation Toggle Button
  const MobileToggle = () => (
    <Button
      variant="outline"
      size="sm"
      className="lg:hidden fixed top-4 left-4 z-50 bg-white border-2 border-charcoal shadow-neo-brutal-small"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      {isMobileMenuOpen ? (
        <X className="h-4 w-4" />
      ) : (
        <Menu className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  );

  // Desktop Navigation
  const DesktopNav = () => (
    <motion.nav 
      className={cn("hidden lg:block bg-white border-r-4 border-charcoal h-full relative", className)}
      animate={{
        width: isSidebarOpen ? "320px" : "80px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            animate={{
              opacity: isSidebarOpen ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {isSidebarOpen && (
              <>
                <h2 className="text-2xl font-museo font-bold text-charcoal mb-1">
                  Analysis Studio
                </h2>
                <p className="text-sm text-payne">
                  Explore your manuscript insights
                </p>
              </>
            )}
          </motion.div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex-shrink-0 p-2 hover:bg-vanilla transition-colors"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4 text-charcoal" />
            ) : (
              <ChevronRight className="h-4 w-4 text-charcoal" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-2 flex-1" role="list">
          {STUDIO_NAV_ITEMS.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = activeTab === item.id;
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                role="listitem"
                className="relative"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-tangerine rounded-r-md"
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-3 h-auto text-left transition-all duration-200 group relative",
                    "hover:bg-vanilla",
                    isActive && "bg-orange-50"
                  )}
                  onClick={() => onTabChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center w-full">
                    <Icon className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                      isActive ? "text-tangerine" : "text-charcoal group-hover:text-tangerine",
                      !isSidebarOpen && "mx-auto"
                    )} />
                    
                    <motion.div
                      animate={{
                        opacity: isSidebarOpen ? 1 : 0,
                        width: isSidebarOpen ? "auto" : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 min-w-0 overflow-hidden"
                    >
                      {isSidebarOpen && (
                        <div>
                          <div className={cn(
                            "font-semibold text-sm transition-colors duration-200",
                            isActive ? "text-charcoal font-bold" : "text-charcoal"
                          )}>
                            {item.label}
                          </div>
                          <div className="text-xs mt-1 leading-tight text-payne">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </Button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );

  // Mobile Navigation Overlay
  const MobileNav = () => (
    <>
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed top-0 left-0 w-80 h-full bg-white border-r-4 border-charcoal z-50 overflow-y-auto"
          >
            <div className="p-6 pt-16">
              <div className="mb-8">
                <h2 className="text-2xl font-museo font-bold text-charcoal mb-1">
                  Analysis Studio
                </h2>
                <p className="text-sm text-payne">
                  Explore your manuscript insights
                </p>
              </div>

              <ul className="space-y-2" role="list">
                {STUDIO_NAV_ITEMS.map((item, index) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  const isActive = activeTab === item.id;
                  
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      role="listitem"
                      className="relative"
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-tangerine rounded-r-md"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start p-3 h-auto text-left transition-all duration-200 group",
                          "hover:bg-vanilla",
                          isActive && "bg-orange-50"
                        )}
                        onClick={() => onTabChange(item.id)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <div className="flex items-center w-full">
                          <Icon className={cn(
                            "h-5 w-5 mr-3 flex-shrink-0 transition-colors duration-200",
                            isActive ? "text-tangerine" : "text-charcoal group-hover:text-tangerine"
                          )} />
                          <div className="flex-1 min-w-0">
                            <div className={cn(
                              "font-semibold text-sm transition-colors duration-200",
                              isActive ? "text-charcoal font-bold" : "text-charcoal"
                            )}>
                              {item.label}
                            </div>
                            <div className="text-xs mt-1 leading-tight text-payne">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <MobileToggle />
      <DesktopNav />
      <MobileNav />
    </>
  );
}