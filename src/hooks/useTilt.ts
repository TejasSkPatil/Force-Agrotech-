import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from './useReducedMotion';

export interface UseTiltOptions {
  maxRotation?: number; // 3 - 5 degrees
  perspective?: number; // 1000px
  imageScale?: number;  // 1.03 - 1.06
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  options: UseTiltOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const imageRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { maxRotation = 4, perspective = 1000, imageScale = 1.04 } = options;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (prefersReduced || !elementRef.current) return;
      // Disable on touch screens or screen width < 1024px
      if (
        e.pointerType === 'touch' ||
        (typeof window !== 'undefined' &&
          (window.innerWidth < 1024 || window.matchMedia('(hover: none)').matches))
      ) {
        return;
      }

      const card = elementRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      gsap.to(card, {
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
        duration: 0.25,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: imageScale,
          duration: 0.35,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }
    },
    [maxRotation, perspective, imageScale, prefersReduced]
  );

  const handlePointerLeave = useCallback(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, [perspective]);

  return {
    cardRef: elementRef,
    imageRef,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };
}
