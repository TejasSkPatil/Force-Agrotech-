import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Package,
  Boxes,
  Headphones,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../layout/Container';
import { DETAILED_SERVICES, ServiceDetail } from '../../data/services';
import { useReducedMotion } from '../../hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PinnedServiceParallaxStackProps {
  onInquire: (serviceTitle?: string) => void;
}

export const PinnedServiceParallaxStack: React.FC<PinnedServiceParallaxStackProps> = ({
  onInquire,
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const cardsGroupRef = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReduced = useReducedMotion();

  // Multi-directional initial offsets and parallax speeds per category card
  const CARD_CONFIGS = [
    // Category 01: Quality Inspection & Lab Testing
    [
      { startX: -85, startY: -65, endX: -100, endY: -45, rot: -1.8, speed: 0.85, z: 20 },
      { startX: 90, startY: 75, endX: 95, endY: 50, rot: 1.5, speed: 1.05, z: 30 },
      { startX: 70, startY: -55, endX: -50, endY: 85, rot: -1.2, speed: 1.25, z: 40 },
    ],
    // Category 02: Custom Packaging & Private Labeling
    [
      { startX: -75, startY: 60, endX: -90, endY: 45, rot: 1.6, speed: 0.9, z: 20 },
      { startX: 85, startY: -70, endX: 90, endY: -50, rot: -1.5, speed: 1.1, z: 30 },
      { startX: 15, startY: 85, endX: -45, endY: -75, rot: 1.2, speed: 1.2, z: 40 },
    ],
    // Category 03: Bulk Container Orders & Vessel Freight
    [
      { startX: -90, startY: -45, endX: -105, endY: -35, rot: -1.5, speed: 0.85, z: 20 },
      { startX: 95, startY: 20, endX: 80, endY: 65, rot: 1.4, speed: 1.05, z: 30 },
      { startX: -60, startY: 80, endX: 65, endY: -80, rot: -1.8, speed: 1.25, z: 40 },
    ],
    // Category 04: Export Inquiry & Documentation Support
    [
      { startX: 80, startY: -65, endX: 95, endY: -40, rot: 1.5, speed: 0.9, z: 20 },
      { startX: -85, startY: 60, endX: -90, endY: 55, rot: -1.6, speed: 1.1, z: 30 },
      { startX: -20, startY: -85, endX: 50, endY: 75, rot: 1.2, speed: 1.2, z: 40 },
    ],
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'clipboard-check':
        return <ClipboardCheck className="w-5 h-5 text-[#174D35]" />;
      case 'package':
        return <Package className="w-5 h-5 text-[#174D35]" />;
      case 'boxes':
        return <Boxes className="w-5 h-5 text-[#174D35]" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-[#174D35]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#174D35]" />;
    }
  };

  // Setup GSAP Pinned ScrollTrigger for desktop
  useEffect(() => {
    const section = sectionRef.current;
    const pinnedWrapper = pinnedWrapperRef.current;
    if (!section || !pinnedWrapper || prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const totalCategories = DETAILED_SERVICES.length; // 4
      const scrollDistance = 3400; // Optimal vertical scroll length

      // Main pinned timeline with smooth scrub
      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: 'pinned-service-stack',
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: pinnedWrapper,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Determine active category index based on scroll progress
            const progress = self.progress;
            const newIndex = Math.min(
              Math.floor(progress * totalCategories),
              totalCategories - 1
            );
            setActiveCategoryIndex((prev) => (prev !== newIndex ? newIndex : prev));
          },
        },
      });

      // For each category, animate its card group in and out
      DETAILED_SERVICES.forEach((_, catIdx) => {
        const groupEl = cardsGroupRef.current[catIdx];
        if (!groupEl) return;

        const cards = groupEl.querySelectorAll('.parallax-deliverable-card');
        const config = CARD_CONFIGS[catIdx] || CARD_CONFIGS[0];

        // Normalized time segments in timeline
        const catStart = catIdx / totalCategories;
        const catPeak = (catIdx + 0.5) / totalCategories;
        const catEnd = (catIdx + 1) / totalCategories;

        // Animate each of the 3 cards with its distinct directional trajectory & parallax speed
        cards.forEach((card, cardIdx) => {
          const cfg = config[cardIdx] || config[0];

          // Entry phase: from outer multi-directional offset to resting center
          masterTl.fromTo(
            card,
            {
              x: cfg.startX * cfg.speed,
              y: cfg.startY * cfg.speed,
              scale: 0.92,
              opacity: 0,
              rotation: cfg.rot,
              pointerEvents: 'none',
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotation: 0,
              pointerEvents: 'auto',
              ease: 'power2.out',
              duration: 0.35,
            },
            catIdx === 0 ? 0 : catStart - 0.05
          );

          // Hold slightly at active state during catPeak
          // Exit phase (for categories 0, 1, 2) moving towards exit direction
          if (catIdx < totalCategories - 1) {
            masterTl.to(
              card,
              {
                x: cfg.endX * cfg.speed,
                y: cfg.endY * cfg.speed,
                scale: 0.94,
                opacity: 0,
                pointerEvents: 'none',
                ease: 'power2.in',
                duration: 0.35,
              },
              catEnd - 0.08
            );
          }
        });
      });

      return () => {
        masterTl.kill();
        const st = ScrollTrigger.getById('pinned-service-stack');
        if (st) st.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [prefersReduced]);

  // Smooth scroll jump to a specific category stage on desktop
  const handleJumpToCategory = (targetIndex: number) => {
    setActiveCategoryIndex(targetIndex);
    if (window.innerWidth >= 1024) {
      const st = ScrollTrigger.getById('pinned-service-stack');
      if (st) {
        const total = DETAILED_SERVICES.length;
        const targetProgress = (targetIndex + 0.15) / total;
        const targetScroll = st.start + (st.end - st.start) * targetProgress;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
        return;
      }
    }

    // Mobile fallback: scroll directly to mobile section element
    const el = document.getElementById(`mobile-service-${targetIndex}`);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const activeService = DETAILED_SERVICES[activeCategoryIndex] || DETAILED_SERVICES[0];

  return (
    <section
      ref={sectionRef}
      id="service-capabilities"
      className="relative bg-white border-b border-[#E5E7DF]"
    >
      {/* ============================================================== */}
      {/* DESKTOP PINNED VIEWPORT EXPERIENCE (>= 1024px)                 */}
      {/* ============================================================== */}
      <div
        ref={pinnedWrapperRef}
        className="hidden lg:flex w-full min-h-screen h-screen flex-col justify-center relative overflow-hidden py-8"
      >
        {/* Subtle background luxury watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-[0.025] z-0 text-center">
          <span className="font-serif-display text-[260px] font-bold text-[#174D35] uppercase tracking-tighter whitespace-nowrap block leading-none">
            SERVICES
          </span>
        </div>

        <Container size="xl" className="relative z-10 w-full">
          {/* Top Active Category Indicator Ribbon */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5E7DF]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2ED] text-[#174D35] text-xs font-bold uppercase tracking-wider border border-[#174D35]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#4F8054]" />
                <span>Service Capabilities</span>
              </span>
              <span className="text-xs text-[#555C56] hidden xl:inline">
                Scroll to experience interactive service categories
              </span>
            </div>

            {/* 4 Category Indicator Pills */}
            <div className="flex items-center gap-2">
              {DETAILED_SERVICES.map((cat, idx) => {
                const isActive = activeCategoryIndex === idx;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleJumpToCategory(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#174D35] text-white shadow-xs scale-102 ring-2 ring-[#174D35]/15'
                        : 'bg-[#FAFAF5] text-[#555C56] hover:bg-[#EBF2ED] hover:text-[#174D35] border border-[#E5E7DF]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? 'bg-[#D6A84F]' : 'bg-neutral-300'
                      }`}
                    />
                    <span className="font-mono text-[10px] opacity-80">0{idx + 1}</span>
                    <span>{cat.title.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main 12-Column Editorial Grid: Stable Left Anchor & Multi-Directional Right Cards */}
          <div className="grid grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* ========================================================== */}
            {/* LEFT CONTENT: Visual Anchor (Stable, smooth cross-fading)  */}
            {/* ========================================================== */}
            <div ref={leftContentRef} className="col-span-5 space-y-5">
              <div className="transition-all duration-300">
                <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#4F8054] flex items-center gap-2 mb-2">
                  <span className="w-6 h-px bg-[#4F8054]" />
                  <span>Service Category 0{activeCategoryIndex + 1}</span>
                </span>

                <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#252A26] leading-[1.15] tracking-tight min-h-[100px] flex items-center">
                  {activeService.title}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body min-h-[72px]">
                {activeService.detailedDescription}
              </p>

              {/* Verified Highlights Checklist */}
              <div className="space-y-2.5 pt-1 min-h-[140px]">
                {activeService.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#252A26]">
                    <div className="w-5 h-5 rounded-full bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 mt-0.5 border border-[#174D35]/15">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium leading-snug">{h}</span>
                  </div>
                ))}
              </div>

              {/* Inquire CTA with Micro-Interaction */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onInquire(activeService.title)}
                  className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#123E2A] shadow-xs active:scale-95 cursor-pointer group"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* ========================================================== */}
            {/* RIGHT SIDE: Multi-Directional Parallax Overlapping Cards  */}
            {/* ========================================================== */}
            <div className="col-span-7 relative h-[480px] flex items-center justify-center">
              {DETAILED_SERVICES.map((service, catIdx) => {
                const isCatActive = activeCategoryIndex === catIdx;

                return (
                  <div
                    key={service.id}
                    ref={(el) => {
                      cardsGroupRef.current[catIdx] = el;
                    }}
                    className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
                      isCatActive ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-10'
                    }`}
                  >
                    {/* The 3 Parallax Deliverable Cards Arranged with Dynamic Editorial Layering */}
                    {service.deliverables.map((del, dIdx) => {
                      // Staggered layout offsets for floating editorial composition
                      const cardLayoutClasses = [
                        // Card 1: Top-Left angled layer
                        'top-2 left-2 sm:left-4 z-20 w-[360px] sm:w-[410px]',
                        // Card 2: Center-Right angled layer
                        'top-32 right-2 sm:right-6 z-30 w-[360px] sm:w-[420px]',
                        // Card 3: Bottom-Left angled layer
                        'bottom-2 left-6 sm:left-14 z-40 w-[360px] sm:w-[430px]',
                      ][dIdx] || 'top-10 left-10 z-20 w-[400px]';

                      return (
                        <div
                          key={dIdx}
                          className={`parallax-deliverable-card absolute ${cardLayoutClasses} bg-white rounded-3xl p-5 sm:p-6 border border-[#E5E7DF] card-shadow-soft hover:card-shadow-hover hover:border-[#174D35]/40 transition-shadow duration-300 cursor-default group`}
                          style={{
                            willChange: 'transform, opacity',
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          {/* Card Header Bar */}
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E7DF]">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 border border-[#174D35]/10 group-hover:bg-[#174D35] group-hover:text-white transition-colors duration-200">
                                {getServiceIcon(service.iconName)}
                              </div>
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4F8054]">
                                Capability 0{dIdx + 1}
                              </span>
                            </div>

                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#174D35] bg-[#EBF2ED] px-2.5 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-[#174D35]" />
                              <span>Verified</span>
                            </span>
                          </div>

                          {/* Card Title & Content */}
                          <h3 className="font-serif-display text-lg sm:text-xl font-normal text-[#252A26] leading-snug mb-2 group-hover:text-[#174D35] transition-colors">
                            {del.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                            {del.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET NATURAL RESPONSIVE VIEW (< 1024px)             */}
      {/* Non-pinned clean stack ensuring zero scroll-trap or overflow  */}
      {/* ============================================================== */}
      <div className="lg:hidden py-14 sm:py-20">
        <Container size="xl">
          {/* Mobile Category Quick Tabs */}
          <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md py-3 -mx-4 px-4 mb-10 border-y border-[#E5E7DF] overflow-x-auto no-scrollbar flex items-center gap-2">
            {DETAILED_SERVICES.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => handleJumpToCategory(idx)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-[#FAFAF5] text-[#555C56] hover:bg-[#EBF2ED] hover:text-[#174D35] border border-[#E5E7DF] shrink-0"
              >
                0{idx + 1} {cat.title.split('&')[0].trim()}
              </button>
            ))}
          </div>

          <div className="space-y-16">
            {DETAILED_SERVICES.map((service, index) => (
              <div
                key={service.id}
                id={`mobile-service-${index}`}
                className="space-y-6 pt-4 border-b border-[#E5E7DF] pb-12 last:border-b-0"
              >
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#4F8054] block">
                    Service Category 0{index + 1}
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#252A26] leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#555C56] leading-relaxed font-sans-body">
                    {service.detailedDescription}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-1">
                    {service.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#252A26]">
                        <div className="w-4 h-4 rounded-full bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#174D35]" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onInquire(service.title)}
                      className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs font-semibold px-5 py-3 rounded-full hover:bg-[#123E2A]"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
                    </button>
                  </div>
                </div>

                {/* Deliverables Cards Stack for Mobile */}
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {service.deliverables.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAFAF5] border border-[#E5E7DF] card-shadow-soft"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#4F8054] uppercase">
                          0{dIdx + 1}
                        </span>
                        <h3 className="font-serif-display text-base font-normal text-[#252A26]">
                          {d.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#555C56] leading-relaxed font-sans-body">
                        {d.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};
