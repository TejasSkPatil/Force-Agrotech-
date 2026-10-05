import React, { useEffect, useRef } from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { SectionLabel } from '../common/SectionLabel';
import { ServiceCard } from './ServiceCard';
import { EXPORT_SERVICES, ServiceItem } from '../../data/company';
import { useReducedMotion } from '../../hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExportServicesProps {
  services?: ServiceItem[];
  onStartEnquiry: () => void;
}

export const ExportServices: React.FC<ExportServicesProps> = ({
  services = EXPORT_SERVICES,
  onStartEnquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Heading: slide upward
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
        );
      }

      // Description: fade
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.45'
        );
      }

      // CTA: fade
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // Service cards: stagger reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card-item');
        tl.fromTo(
          cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="services" ref={sectionRef} className="py-20 sm:py-28 bg-[#F4F7F5] relative">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SectionLabel label="QUALITY & EXPORT SERVICES" icon={Briefcase} />

            <h2
              ref={headingRef}
              className="font-serif-display text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#252A26] leading-[1.14] tracking-tight"
            >
              Support Built Around{' '}
              <span className="block">Your Order</span>
            </h2>

            <p
              ref={descRef}
              className="text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body"
            >
              From product review to export enquiries, our services are designed to keep your sourcing process clear and efficient.
            </p>

            <div ref={ctaRef} className="pt-2">
              <button
                onClick={onStartEnquiry}
                className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] hover:bg-[#123E2A] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Start on an Enquiry</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Services Grid (7 cols) */}
          <div
            ref={gridRef}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
