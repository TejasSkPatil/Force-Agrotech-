import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseParallaxOptions {
  speed?: number; // Distance in px, e.g. 40
  direction?: 'vertical' | 'horizontal';
  triggerHook?: string; // 'top bottom'
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReduced) return;

    const {
      speed = 40,
      direction = 'vertical',
      triggerHook = 'top bottom',
    } = options;

    const ctx = gsap.context(() => {
      if (direction === 'vertical') {
        gsap.fromTo(
          el,
          { y: -speed / 2 },
          {
            y: speed / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: triggerHook,
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { x: -speed / 2 },
          {
            x: speed / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: triggerHook,
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [options, prefersReduced]);

  return elementRef;
}
