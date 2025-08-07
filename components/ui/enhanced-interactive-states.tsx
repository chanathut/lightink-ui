"use client";

import { cn } from '@/lib/utils';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface InteractiveElementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  className?: string;
}

export function EnhancedButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  className,
  disabled,
  ...props 
}: InteractiveElementProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus-ring disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "neo-brutal-button",
    secondary: "bg-vanilla text-charcoal border-4 border-charcoal rounded-xl shadow-[4px_4px_0px_0px_theme(colors.charcoal)] hover:shadow-[6px_6px_0px_0px_theme(colors.charcoal)] hover:translate-x-[-1px] hover:translate-y-[-1px]",
    outline: "bg-white text-charcoal border-4 border-charcoal rounded-xl shadow-[4px_4px_0px_0px_theme(colors.charcoal)] hover:bg-charcoal hover:text-white hover:shadow-[6px_6px_0px_0px_theme(colors.charcoal)] hover:translate-x-[-1px] hover:translate-y-[-1px]",
    ghost: "text-charcoal hover:bg-vanilla rounded-xl"
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
    xl: "px-8 py-5 text-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
        />
      ) : null}
      {children}
    </motion.button>
  );
}

export function InteractiveCard({ 
  children, 
  className, 
  onClick,
  ...props 
}: { 
  children: ReactNode; 
  className?: string; 
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "neo-brutal-card cursor-pointer interactive-element",
        onClick && "hover:shadow-[12px_12px_0px_0px_theme(colors.charcoal)]",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}