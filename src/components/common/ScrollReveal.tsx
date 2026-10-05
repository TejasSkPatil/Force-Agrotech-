import React from 'react';
import { useScrollReveal, ScrollRevealOptions } from '../../hooks/useScrollReveal';

interface ScrollRevealProps extends ScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span' | 'p';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  y = 30,
  opacity = 0,
  duration = 0.8,
  delay = 0,
  start = 'top 85%',
  ease = 'power2.out',
}) => {
  const ref = useScrollReveal<HTMLDivElement>({
    y,
    opacity,
    duration,
    delay,
    start,
    ease,
  });

  return (
    <Component ref={ref as any} className={className}>
      {children}
    </Component>
  );
};
