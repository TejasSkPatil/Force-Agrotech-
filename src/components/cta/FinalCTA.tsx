import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { SectionLabel } from '../common/SectionLabel';
import { WavyDivider } from '../common/WavyDivider';
import { useReducedMotion } from '../../hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FinalCTAProps {
  onRequestQuote: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onRequestQuote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Background subtle parallax (moves slightly while foreground remains stable)
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { y: -30 },
          {
            y: 35,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Subtle reveal for heading and button
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
        );
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-24 overflow-hidden bg-[#0D2B1E]"
    >
      {/* Parallax Background Foliage Imagery */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80"
          alt="Lush green agricultural leaves background"
          className="w-full h-[140%] object-cover object-center -translate-y-12 opacity-30 filter brightness-75 contrast-125 will-change-transform"
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          referrerPolicy="no-referrer"
        />
        {/* Deep Emerald Scrim gradient ensuring WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2518] via-[#0D2B1E]/95 to-[#0B2518]/90" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="max-w-2xl space-y-3">
            <SectionLabel label="LET'S WORK TOGETHER" light icon={Sparkles} />

            <h2
              ref={headingRef}
              className="font-serif-display text-3xl sm:text-4xl lg:text-[46px] font-normal text-white leading-tight"
            >
              Looking for quality agricultural products?
            </h2>

            {/* GSAP Video Inspired Wavy Accent Line */}
            <WavyDivider color="#D6A84F" className="py-1" />

            <p className="text-sm sm:text-base text-neutral-300 font-sans-body">
              Connect with us to discuss your product requirements and export inquiries.
            </p>
          </div>

          {/* Right CTA Button */}
          <div ref={buttonRef} className="shrink-0">
            <button
              onClick={onRequestQuote}
              className="btn-interactive inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-[#174D35] text-xs sm:text-sm font-bold px-7 py-4 rounded-full shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-[#174D35] btn-arrow" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
