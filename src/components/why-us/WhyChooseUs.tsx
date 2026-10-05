import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Search, Users, Truck, Check } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionLabel } from '../common/SectionLabel';
import { WHY_CHOOSE_US, FeatureItem } from '../../data/company';
import { initStaggerReveal } from '../../animations/scrollAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WhyChooseUsProps {
  items?: FeatureItem[];
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  items = WHY_CHOOSE_US,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initStaggerReveal(containerRef.current, '.why-us-card', 0.14, prefersReduced);
    return cleanup;
  }, [prefersReduced]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield-check':
        return <ShieldCheck className="w-5 h-5 text-[#174D35]" />;
      case 'search':
        return <Search className="w-5 h-5 text-[#174D35]" />;
      case 'users':
        return <Users className="w-5 h-5 text-[#174D35]" />;
      case 'truck':
        return <Truck className="w-5 h-5 text-[#174D35]" />;
      default:
        return <Check className="w-5 h-5 text-[#174D35]" />;
    }
  };

  return (
    <section id="quality" className="py-20 sm:py-28 bg-[#FAFAF5]">
      <Container size="xl">
        {/* Centered Heading Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <SectionLabel label="WHY FOCUS AGROTECH" icon={ShieldCheck} className="justify-center" />
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#252A26] leading-tight">
            A Dependable Partner For Your Business
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body">
            Straightforward agricultural sourcing with responsive support at every stage.
          </p>
        </div>

        {/* 4 Staggered Feature Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="why-us-card bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7DF] card-shadow-soft hover:card-shadow-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] group-hover:bg-[#174D35] flex items-center justify-center transition-colors duration-200 mb-5">
                  <div className="group-hover:text-white transition-colors duration-200">
                    {renderIcon(item.iconName)}
                  </div>
                </div>

                <h3 className="font-serif-display text-xl font-normal text-[#252A26] leading-snug group-hover:text-[#174D35] transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                  {item.description}
                </p>
              </div>

              {/* Verified standard badge */}
              <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#174D35]">
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
