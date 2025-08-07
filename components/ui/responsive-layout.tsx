"use client";

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  variant?: 'default' | 'narrow' | 'wide' | 'fluid';
  className?: string;
}

export function ResponsiveContainer({ children, variant = 'default', className }: ContainerProps) {
  const variantClasses = {
    default: "container mx-auto px-4",
    narrow: "container-narrow",
    wide: "container-wide", 
    fluid: "container-fluid"
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}

interface GridProps {
  children: ReactNode;
  variant?: 'responsive' | 'auto-fit' | 'custom';
  className?: string;
}

export function ResponsiveGrid({ children, variant = 'responsive', className }: GridProps) {
  const variantClasses = {
    responsive: "grid-responsive",
    'auto-fit': "grid-auto-fit",
    custom: ""
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'seamless' | 'gradient';
}

export function ResponsiveSection({ children, className, background = 'default' }: SectionProps) {
  const backgroundClasses = {
    default: "py-16 md:py-20",
    seamless: "py-16 md:py-20 seamless-bg",
    gradient: "py-16 md:py-20 bg-gradient-to-br from-azure to-vanilla"
  };

  return (
    <section className={cn(backgroundClasses[background], className)}>
      {children}
    </section>
  );
}