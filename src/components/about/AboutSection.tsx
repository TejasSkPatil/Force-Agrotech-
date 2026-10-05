import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Sprout, Info, ShieldCheck, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { SectionLabel } from '../common/SectionLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutSectionProps {
  onLearnMore?: () => void;
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMore,
  onOpenQuoteModal,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Image Parallax: subtle scroll movement
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: -20 },
          {
            y: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Floating "From India" badge
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: '-=8',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. Staggered reveal timeline for About section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Image: fade + slight X translation
      if (imageFrameRef.current) {
        tl.fromTo(
          imageFrameRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' }
        );
      }

      // Text elements: fade + translateY
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // Feature badges: stagger
      if (featuresRef.current) {
        tl.fromTo(
          featuresRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // Button: appears last
      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.25'
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, [prefersReduced]);

  const handleLearnMoreClick = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#F4F7F5] relative overflow-hidden"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Parallax Crop Field Visual (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Background subtle green decorative accent */}
            <div className="absolute -top-4 -left-4 sm:-left-6 w-32 h-32 bg-[#174D35]/8 rounded-3xl -z-10" />

            {/* Arched shape frame */}
            <div
              ref={imageFrameRef}
              className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/11] arch-right-shape overflow-hidden shadow-xl border-4 border-white bg-neutral-900"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Vibrant green agricultural field with crops in morning sunlight"
                className="w-full h-[120%] object-cover object-center -translate-y-6 will-change-transform"
                loading="lazy"
                decoding="async"
                width={1000}
                height={750}
                referrerPolicy="no-referrer"
              />

              {/* Gentle sunflare gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge at Bottom Right: "From India - to global buyers" */}
              <div
                ref={badgeRef}
                className="absolute bottom-6 right-6 z-20"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-neutral-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0">
                    <Sprout className="w-4 h-4 text-[#174D35]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#252A26] leading-tight">
                      From India
                    </h5>
                    <p className="text-[11px] text-[#555C56] mt-0.5">
                      to global buyers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <SectionLabel label="ABOUT FOCUS AGROTECH" icon={Info} />

            <h2
              ref={headingRef}
              className="font-serif-display text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#252A26] leading-[1.14] tracking-tight"
            >
              Your Trusted Agricultural{' '}
              <span className="block sm:inline">Export Partner</span>
            </h2>

            <p
              ref={textRef}
              className="text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body"
            >
              Focus AgroTech Pvt. Ltd. was established in 2016. We source and supply agricultural products including{' '}
              <span className="marker-highlight-yellow font-semibold text-[#252A26]">
                wheat, rice, pulses, cereals, and beans
              </span>
              , supporting businesses with{' '}
              <span className="marker-highlight-green font-semibold text-[#174D35]">
                dependable product sourcing and export assistance
              </span>{' '}
              from India.
            </p>

            {/* Supporting Feature Labels */}
            <div
              ref={featuresRef}
              className="flex flex-wrap items-center gap-6 pt-1 text-sm font-semibold text-[#252A26]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#174D35]" />
                <span>Buyer-focused sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#174D35]" />
                <span>Product sourcing support</span>
              </div>
            </div>

            {/* CTA Button: Appears last */}
            <div ref={btnRef} className="pt-2">
              <button
                onClick={handleLearnMoreClick}
                className="btn-interactive inline-flex items-center gap-2 bg-transparent hover:bg-[#174D35]/5 text-[#174D35] text-xs sm:text-sm font-bold px-6 py-3 rounded-full border border-[#174D35]/35 hover:border-[#174D35] transition-all duration-200 cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Learn More Modal with Verified Business Background */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 border border-neutral-200 font-sans-body">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#174D35] font-bold">
                  Corporate Profile · Established 2016
                </span>
                <h3 className="text-2xl font-normal font-serif-display text-[#252A26] mt-0.5">
                  About Focus Agrotech Pvt. Ltd.
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="text-sm text-[#555C56] space-y-3.5 leading-relaxed">
              <p>
                Founded in 2016, <strong>Focus AgroTech Pvt. Ltd.</strong> operates with a strong foundation in agricultural procurement, sorting, and export distribution from Ahmedabad and major farming regions of India.
              </p>
              <p>
                We specialize in establishing dependable agricultural supply chains for international importers, food processing enterprises, and wholesale distributors seeking consistent quality in wheat, rice, pulses, cereals, and spices.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#F4F7F5] rounded-xl border border-[#E5E7DF]">
                <ShieldCheck className="w-5 h-5 text-[#174D35] mb-1.5" />
                <h5 className="text-xs font-bold text-[#252A26]">Quality & Laboratory Checks</h5>
                <p className="text-[11px] text-[#555C56] mt-0.5">
                  Moisture, foreign matter, sortex purity & phytosanitary protocols.
                </p>
              </div>
              <div className="p-3 bg-[#F4F7F5] rounded-xl border border-[#E5E7DF]">
                <Award className="w-5 h-5 text-[#174D35] mb-1.5" />
                <h5 className="text-xs font-bold text-[#252A26]">Export Logistics</h5>
                <p className="text-[11px] text-[#555C56] mt-0.5">
                  Full container load (FCL) coordination via Indian gateway ports.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onOpenQuoteModal();
                }}
                className="btn-interactive px-5 py-2.5 bg-[#174D35] text-white text-xs font-semibold rounded-full hover:bg-[#123E2A]"
              >
                Direct Sourcing Inquiry →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
