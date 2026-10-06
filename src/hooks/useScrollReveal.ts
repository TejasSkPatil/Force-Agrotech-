import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealOptions {
  x?: number;
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  start?: string;
  stagger?: number;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReduced) return;

    const {
      x = 0,
      y = 30,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      ease = 'power2.out',
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options, prefersReduced]);

  return elementRef;
}
