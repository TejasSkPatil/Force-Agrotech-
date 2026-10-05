import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Play, Sprout } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionLabel } from '../common/SectionLabel';
import { AmbientBotanicalBackground } from '../common/AmbientBotanicalBackground';
import { initHeroAnimations } from '../../animations/heroAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onOpenQuoteModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const cleanup = initHeroAnimations(
      {
        section: sectionRef.current,
        badge: badgeRef.current,
        heading: headingRef.current,
        description: descRef.current,
        actions: actionsRef.current,
        trustBadge: trustBadgeRef.current,
        imageContainer: imageContainerRef.current,
        floatingBadge: floatingBadgeRef.current,
        floatingLeaves: [],
      },
      prefersReduced
    );

    return cleanup;
  }, [prefersReduced]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#FAFAF5]"
    >
      {/* Premium 16:9 ambient floating botanical leaves field */}
      <AmbientBotanicalBackground />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-7">
            {/* Small eyebrow label */}
            <div ref={badgeRef}>
              <SectionLabel label="YOUR AGRICULTURAL EXPORT PARTNER" icon={Sprout} />
            </div>

            {/* Large heading with DM Serif Display */}
            <h1
              ref={headingRef}
              className="font-serif-display text-[34px] sm:text-[50px] lg:text-[64px] xl:text-[72px] font-normal text-[#252A26] leading-[1.1] tracking-tight"
            >
              Connecting Global Markets with Quality{' '}
              <span className="italic-accent text-[#174D35] block sm:inline font-normal">
                Agricultural Products
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-[#555C56] leading-relaxed max-w-xl font-sans-body"
            >
              Your trusted partner for sourcing and exporting quality agricultural products from India.
            </p>

            {/* Buttons */}
            <div
              ref={actionsRef}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <button
                onClick={onExploreProducts}
                className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] hover:bg-[#123E2A] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="btn-interactive inline-flex items-center gap-2 bg-transparent hover:bg-[#174D35]/5 text-[#174D35] text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full border border-[#174D35]/30 hover:border-[#174D35] cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </button>
            </div>

            {/* Quality-focused sourcing badge */}
            <div ref={trustBadgeRef} className="pt-3">
              <div className="inline-flex items-center gap-3 p-3 pr-5 bg-white rounded-xl border border-[#E5E7DF] card-shadow-soft">
                <div className="w-10 h-10 rounded-lg bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#174D35]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#252A26] leading-tight">
                    Quality-focused sourcing
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#555C56] mt-0.5">
                    From selection to export inquiry support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Agricultural Wheat/Rice Field Image with Arched Treatment */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center lg:justify-end">
            {/* Main Arch-Curved Image Container */}
            <div
              ref={imageContainerRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[450px] mx-auto aspect-[4/5] arch-top-shape overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 group"
            >
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80"
                alt="Golden ripe wheat crop field in natural sunlight"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                width={800}
                height={1000}
                referrerPolicy="no-referrer"
              />

              {/* Gentle warm golden light scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-500/10 pointer-events-none" />

              {/* Center "Watch Our Story" Visual Trigger */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#252A26] text-xs font-bold shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Watch Focus Agrotech Story"
              >
                <div className="w-7 h-7 rounded-full bg-[#174D35] text-white flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>

              {/* Floating "Watch Sourced" visual element */}
              <div
                ref={floatingBadgeRef}
                className="absolute bottom-6 left-6 right-6 z-20"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-neutral-100/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0">
                    <Sprout className="w-5 h-5 text-[#174D35]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#252A26] leading-tight">
                      Watch Sourced
                    </h5>
                    <p className="text-[11px] text-[#555C56] mt-0.5">
                      agricultural produce
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Story Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174D35]">
                <Sprout className="w-4 h-4" />
                <span>Focus Agrotech · Sourcing Journey</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 font-semibold text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden relative flex flex-col items-center justify-center text-white text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#174D35] flex items-center justify-center mb-3">
                <Play className="w-7 h-7 fill-white ml-1 text-white" />
              </div>
              <h4 className="font-serif-display text-2xl font-normal">
                From Indian Farms to Global Ports
              </h4>
              <p className="text-xs text-neutral-300 max-w-md mt-1.5 font-sans-body">
                Focus Agrotech coordinates farm-level aggregation, sortex grading, standard fumigation, and containerized dispatch directly to international destinations.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenQuoteModal();
                }}
                className="btn-interactive px-5 py-2.5 bg-[#174D35] text-white text-xs font-semibold rounded-full hover:bg-[#123E2A]"
              >
                Request Sourcing Specifications →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
