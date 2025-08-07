"use client";

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SkipLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a 
      href={href}
      className={cn("skip-link", className)}
    >
      {children}
    </a>
  );
}

interface ScreenReaderOnlyProps {
  children: ReactNode;
  className?: string;
}

export function ScreenReaderOnly({ children, className }: ScreenReaderOnlyProps) {
  return (
    <span className={cn("sr-only", className)}>
      {children}
    </span>
  );
}

interface FocusableProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function FocusableElement({ children, className, as: Component = 'div' }: FocusableProps) {
  return (
    <Component 
      className={cn("focus-ring", className)}
      tabIndex={0}
    >
      {children}
    </Component>
  );
}

interface HighContrastProps {
  children: ReactNode;
  className?: string;
}

export function HighContrastSupport({ children, className }: HighContrastProps) {
  return (
    <div className={cn("contrast-more:border-black contrast-more:text-black", className)}>
      {children}
    </div>
  );
}