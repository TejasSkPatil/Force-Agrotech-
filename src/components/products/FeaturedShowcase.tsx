import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { Container } from '../layout/Container';

interface FeaturedShowcaseProps {
  onSelectProduct?: (product: Product) => void;
  onOpenQuoteModal?: (productName?: string) => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  onSelectProduct,
  onOpenQuoteModal,
}) => {
  const renderCard = (product: Product, keyPrefix: string, isAriaHidden = false) => {
    return (
      <div
        key={`${keyPrefix}-${product.id}`}
        aria-hidden={isAriaHidden}
        className="w-[88vw] sm:w-[620px] lg:w-[700px] shrink-0 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7DF] card-shadow-soft hover:card-shadow-hover hover:border-[#174D35]/35 transition-all duration-300 flex flex-col justify-between group"
      >
        {/* Card Top Meta Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7DF] mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#174D35] text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{product.category}</span>
          </span>

          <span className="text-xs text-[#555C56] flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#4F8054]" />
            <span>Origin: {product.origin}</span>
          </span>
        </div>

        {/* 2-Column Responsive Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7 items-center">
          {/* Left Column: Arched Produce Image */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[1/1] rounded-2xl arch-right-shape overflow-hidden shadow-md border-2 border-white bg-neutral-900">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
                decoding="async"
                width={500}
                height={500}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#174D35] shadow-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#174D35]" />
                <span>Export Grade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Specs & CTAs */}
          <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
            <div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#252A26] leading-tight group-hover:text-[#174D35] transition-colors">
                {product.name}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#555C56] leading-relaxed line-clamp-3 font-sans-body">
                {product.description}
              </p>
            </div>

            {/* Export Specifications Matrix */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88908A] block">
                Export Specifications
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.slice(0, 4).map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2 rounded-xl bg-[#FAFAF5] border border-[#E5E7DF] flex flex-col justify-center"
                  >
                    <span className="text-[10px] sm:text-[11px] text-[#717872] truncate">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-[#174D35] truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                to={`/products/${product.id}`}
                className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] hover:bg-[#123E2A] text-white text-xs font-semibold px-4.5 py-2.5 rounded-full shadow-xs active:scale-95"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (onOpenQuoteModal) onOpenQuoteModal(product.name);
                  else if (onSelectProduct) onSelectProduct(product);
                }}
                className="btn-interactive inline-flex items-center gap-2 bg-transparent hover:bg-[#174D35]/5 text-[#174D35] text-xs font-semibold px-4.5 py-2.5 rounded-full border border-[#174D35]/30 hover:border-[#174D35] cursor-pointer active:scale-95"
              >
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="core-commodities-showcase"
      className="relative py-16 sm:py-24 bg-[#FAFAF5] border-b border-[#E5E7DF] overflow-hidden select-none"
    >
      {/* Background Kinetic Watermark Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden opacity-[0.03] z-0">
        <span className="font-serif-display text-[140px] sm:text-[220px] lg:text-[320px] font-bold text-[#174D35] uppercase tracking-tighter whitespace-nowrap block leading-none text-center">
          COMMODITIES
        </span>
      </div>

      <Container size="xl" className="relative z-10 mb-8 sm:mb-12">
        {/* Clean Editorial Section Header without manual controls/sketch elements */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2ED] text-[#174D35] text-xs font-bold tracking-wider uppercase mb-3 border border-[#174D35]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#4F8054]" />
            <span>EXPORT PORTFOLIO</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#252A26] leading-tight">
            Core Export <span className="italic-accent text-[#174D35]">Commodities</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#555C56] max-w-xl font-sans-body leading-relaxed">
            Carefully sorted milling grains, aromatic basmati rice, protein pulses, and export-grade oilseeds moving direct from Indian farms to global ports.
          </p>
        </div>
      </Container>

      {/* Horizontal Automatic Loop Slides Moving Container */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Left & Right Fade Edges for cinematic transition */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#FAFAF5] via-[#FAFAF5]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#FAFAF5] via-[#FAFAF5]/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous Automatic Horizontal Marquee Loop (Pauses on Hover) */}
        <div className="animate-horizontal-loop py-2">
          {/* First Complete Set */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 px-4">
            {PRODUCTS.map((product) => renderCard(product, 'loop-1'))}
          </div>

          {/* Second Duplicate Set for Infinite Seamless Loop */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0 px-4" aria-hidden="true">
            {PRODUCTS.map((product) => renderCard(product, 'loop-2', true))}
          </div>
        </div>
      </div>
    </section>
  );
};
