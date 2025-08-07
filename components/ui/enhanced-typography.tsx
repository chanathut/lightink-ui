"use client";

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function SectionTitle({ children, className, as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={cn("section-title", className)}>
      {children}
    </Component>
  );
}

export function SectionSubtitle({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn("section-subtitle", className)}>
      {children}
    </Component>
  );
}

export function CardTitle({ children, className, as: Component = 'h3' }: TypographyProps) {
  return (
    <Component className={cn("card-title", className)}>
      {children}
    </Component>
  );
}

export function CardDescription({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn("card-description", className)}>
      {children}
    </Component>
  );
}

export function BodyText({ children, className, as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={cn("text-base text-payne leading-relaxed", className)}>
      {children}
    </Component>
  );
}

export function CaptionText({ children, className, as: Component = 'span' }: TypographyProps) {
  return (
    <Component className={cn("text-sm text-gray-600 leading-normal", className)}>
      {children}
    </Component>
  );
}

export function LabelText({ children, className, as: Component = 'label' }: TypographyProps) {
  return (
    <Component className={cn("text-sm font-medium text-charcoal leading-normal", className)}>
      {children}
    </Component>
  );
}