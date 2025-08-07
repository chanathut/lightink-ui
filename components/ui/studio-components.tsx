/**
 * Studio UI Components
 * Reusable components with consistent styling for the Lightink Studio interface
 */

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn, neoBrutalCard, neoBrutalButton, studioText, studioAnimations } from '@/lib/studio-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Studio Card Component with consistent neo-brutal styling
interface StudioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'active';
  children: React.ReactNode;
}

export function StudioCard({ variant = 'default', className, children, ...props }: StudioCardProps) {
  return (
    <div className={cn(neoBrutalCard(variant), className)} {...props}>
      {children}
    </div>
  );
}

// Studio Button Component with consistent neo-brutal styling
interface StudioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export function StudioButton({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  isLoading = false,
  disabled,
  ...props 
}: StudioButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        neoBrutalButton(variant),
        sizeClasses[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// Studio Heading Component with consistent typography
interface StudioHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export function StudioHeading({ level, className, children, ...props }: StudioHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const textClass = studioText(`h${level}` as 'h1' | 'h2' | 'h3' | 'h4');

  return React.createElement(
    Component,
    {
      className: cn(textClass, className),
      ...props,
    },
    children
  );
}

// Studio Text Component with consistent styling
interface StudioTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'caption' | 'label';
  children: React.ReactNode;
}

export function StudioText({ variant = 'body', className, children, ...props }: StudioTextProps) {
  return (
    <p className={cn(studioText(variant), className)} {...props}>
      {children}
    </p>
  );
}

// Studio Badge Component with semantic variants
interface StudioBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
}

export function StudioBadge({ variant = 'neutral', className, children, ...props }: StudioBadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 text-green-800 border-green-600',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-600',
    error: 'bg-red-100 text-red-800 border-red-600',
    info: 'bg-blue-100 text-blue-800 border-blue-600',
    neutral: 'bg-gray-100 text-gray-800 border-gray-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Studio Section Component with consistent spacing
interface StudioSectionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
}

export function StudioSection({ 
  children, 
  spacing = 'md', 
  className, 
  ...props 
}: StudioSectionProps) {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-24',
  };

  return (
    <motion.section
      className={cn(spacingClasses[spacing], className)}
      {...studioAnimations.fadeIn}
      {...props}
    >
      {children}
    </motion.section>
  );
}

// Studio Container Component with responsive padding
interface StudioContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export function StudioContainer({ 
  size = 'lg', 
  className, 
  children, 
  ...props 
}: StudioContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <div
      className={cn('mx-auto px-4', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Studio Grid Component for consistent layouts
interface StudioGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function StudioGrid({ 
  cols = 3, 
  gap = 'md', 
  className, 
  children, 
  ...props 
}: StudioGridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn('grid', colClasses[cols], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Studio Loading Component with consistent styling
interface StudioLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function StudioLoading({ size = 'md', text = 'Loading...' }: StudioLoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div
        className={cn(
          'border-4 border-tangerine border-t-transparent rounded-full animate-spin',
          sizeClasses[size]
        )}
      />
      {text && (
        <StudioText variant="caption" className="text-center">
          {text}
        </StudioText>
      )}
    </div>
  );
}

// Studio Error Component with consistent styling
interface StudioErrorProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function StudioError({ 
  title = 'Something went wrong', 
  message, 
  action 
}: StudioErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <div className="text-center space-y-2">
        <StudioHeading level={3}>{title}</StudioHeading>
        <StudioText variant="body" className="max-w-md">
          {message}
        </StudioText>
      </div>
      {action && (
        <StudioButton variant="primary" onClick={action.onClick}>
          {action.label}
        </StudioButton>
      )}
    </div>
  );
}

// Studio Empty State Component
interface StudioEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function StudioEmptyState({ 
  icon, 
  title, 
  description, 
  action 
}: StudioEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="text-center space-y-2">
        <StudioHeading level={3}>{title}</StudioHeading>
        <StudioText variant="body" className="max-w-md text-center">
          {description}
        </StudioText>
      </div>
      {action && (
        <StudioButton variant="primary" onClick={action.onClick}>
          {action.label}
        </StudioButton>
      )}
    </div>
  );
}