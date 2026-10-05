import React from 'react';
import { ShieldCheck, Award, Globe, Ship, CheckCircle2, Leaf, Sparkles, Building2 } from 'lucide-react';

interface MarqueeItem {
  icon: React.ReactNode;
  label: string;
  tag: string;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  { icon: <Leaf className="w-4 h-4 text-[#D6A84F]" />, label: 'Sortex Wheat & Milling Grain', tag: 'A-Grade' },
  { icon: <ShieldCheck className="w-4 h-4 text-[#4F8054]" />, label: 'APEDA & FSSAI Certified', tag: 'Verified' },
  { icon: <Globe className="w-4 h-4 text-[#D6A84F]" />, label: '28+ Export Destinations', tag: 'Worldwide' },
  { icon: <Ship className="w-4 h-4 text-[#4F8054]" />, label: 'FCL Ports Mundra & Kandla', tag: 'Direct Line' },
  { icon: <Sparkles className="w-4 h-4 text-[#D6A84F]" />, label: '1121 & Pusa Basmati Rice', tag: 'Sortexed' },
  { icon: <Award className="w-4 h-4 text-[#4F8054]" />, label: '99.8% Purity Lab Inspected', tag: 'SGS/Intertek' },
  { icon: <Building2 className="w-4 h-4 text-[#D6A84F]" />, label: 'Non-GMO Soybeans & Pulses', tag: 'Bulk Supply' },
  { icon: <CheckCircle2 className="w-4 h-4 text-[#4F8054]" />, label: 'Spices Board of India Reg.', tag: 'Govt. Accredited' },
];

export const InfiniteMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#242825] text-white py-3.5 border-y border-neutral-700/50 select-none">
      {/* Subtle fade edges */}
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#242825] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#242825] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* First set */}
        <div className="flex items-center gap-8 shrink-0 px-4">
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`m1-${index}`}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs text-xs sm:text-[13px] font-medium text-neutral-200"
            >
              {item.icon}
              <span className="font-semibold text-white">{item.label}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A84F] bg-[#D6A84F]/10 px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate set for infinite seamless loop */}
        <div className="flex items-center gap-8 shrink-0 px-4" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`m2-${index}`}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs text-xs sm:text-[13px] font-medium text-neutral-200"
            >
              {item.icon}
              <span className="font-semibold text-white">{item.label}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A84F] bg-[#D6A84F]/10 px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
