import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface AnimatedPreloaderProps {
  onComplete?: () => void;
}

export const AnimatedPreloader: React.FC<AnimatedPreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if preloader was already shown in this session
    const hasLoaded = sessionStorage.getItem('focus_agrotech_preloader_seen');
    if (hasLoaded) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('focus_agrotech_preloader_seen', 'true');
          setIsDone(true);
          onComplete?.();
        },
      });

      // Animate SVG path stroke dash
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });

        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        });
      }

      // Counter animation from 0 to 100
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counterObj.value)}%`;
            }
          },
        },
        0.1
      );

      // Pulse text
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.3
        );
      }

      // Curtain slide up animation like the video
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
            delay: 0.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF5] text-[#252A26] select-none pointer-events-auto"
      style={{ willChange: 'transform' }}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Organic Animated Glyph (Inspired by video's orange stroke glyph) */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated Organic Botanical Loop Glyph */}
            <path
              ref={pathRef}
              d="M 30 65 C 20 50, 25 25, 45 25 C 65 25, 68 55, 50 65 C 35 73, 28 65, 40 45 C 50 30, 75 32, 75 55 C 75 75, 45 78, 30 65 Z"
              stroke="#D6A84F"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sprout Leaf Dot */}
            <circle cx="75" cy="35" r="4.5" fill="#174D35" className="animate-pulse" />
          </svg>
        </div>

        {/* Brand Name & Loading Progress */}
        <div ref={textRef} className="text-center space-y-2">
          <span className="font-serif-display text-2xl sm:text-3xl text-[#174D35] tracking-wider block font-semibold">
            FOCUS AGROTECH
          </span>
          <p className="text-xs uppercase tracking-[0.25em] text-[#555C56] font-medium">
            Exporting Agricultural Excellence
          </p>
        </div>

        {/* Numerical Counter */}
        <div className="font-mono text-sm font-semibold text-[#174D35] px-3 py-1 bg-[#EBF2ED] rounded-full">
          <span ref={counterRef}>0%</span>
        </div>
      </div>

      {/* Skip Button in bottom corner */}
      <button
        onClick={() => {
          sessionStorage.setItem('focus_agrotech_preloader_seen', 'true');
          setIsDone(true);
          onComplete?.();
        }}
        className="absolute bottom-6 right-6 text-xs text-neutral-400 hover:text-neutral-700 underline underline-offset-4 tracking-wider uppercase transition-colors cursor-pointer"
      >
        Skip intro
      </button>
    </div>
  );
};
