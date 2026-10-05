import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const product = PRODUCTS[currentIndex];

  const handleNext = () => {
    animateSlide((currentIndex + 1) % PRODUCTS.length, 1);
  };

  const handlePrev = () => {
    animateSlide((currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length, -1);
  };

  const animateSlide = (newIndex: number, direction: number) => {
    if (!slideContainerRef.current) {
      setCurrentIndex(newIndex);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
      },
    });

    // Animate out
    tl.to([imageRef.current, contentRef.current], {
      opacity: 0,
      x: direction * -30,
      duration: 0.25,
      ease: 'power2.in',
    });
  };

  useEffect(() => {
    // Animate in when currentIndex updates
    if (imageRef.current && contentRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, x: 25 },
        { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#F6F7F2] border-b border-[#E5E7DF]">
      {/* Background Kinetic Big Typography inspired by video "FEATURED WORKS" */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden opacity-5 z-0">
        <span className="font-serif-display text-[120px] sm:text-[200px] lg:text-[280px] font-bold text-[#174D35] uppercase tracking-tighter whitespace-nowrap block leading-none text-center">
          FEATURED
        </span>
      </div>

      <Container size="xl" className="relative z-10">
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D35]/10 text-[#174D35] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Interactive Showcase</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#252A26]">
              Core Export <span className="italic-accent text-[#174D35]">Commodities</span>
            </h2>
          </div>

          {/* Slider Controls matching the GSAP video style */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-semibold text-[#555C56]">
              <span className="text-[#174D35] font-bold text-base">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>{' '}
              / {String(PRODUCTS.length).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white border border-[#E5E7DF] shadow-xs flex items-center justify-center text-[#252A26] hover:bg-[#174D35] hover:text-white transition-colors cursor-pointer"
                aria-label="Previous Commodity"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-[#174D35] text-white shadow-xs flex items-center justify-center hover:bg-[#123E2A] transition-colors cursor-pointer"
                aria-label="Next Commodity"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Card Container */}
        <div
          ref={slideContainerRef}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#E5E7DF] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-2xl arch-right-shape overflow-hidden shadow-lg border-2 border-neutral-100 bg-neutral-900">
                <img
                  ref={imageRef}
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block bg-[#174D35] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-xs">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div ref={contentRef} className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#4F8054] font-bold block mb-1">
                  Origin: {product.origin}
                </span>
                <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#252A26] leading-tight">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body">
                  {product.description}
                </p>
              </div>

              {/* Key Specs Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Export Specifications
                </span>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {product.specs.slice(0, 4).map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-xl bg-[#FAFAF5] border border-[#E5E7DF] flex flex-col"
                    >
                      <span className="text-[11px] text-[#717872]">{spec.label}</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#174D35]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/products/${product.id}`}
                  className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] hover:bg-[#123E2A] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full shadow-xs active:scale-95"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(product);
                    else if (onOpenQuoteModal) onOpenQuoteModal(product.name);
                  }}
                  className="btn-interactive inline-flex items-center gap-2 bg-transparent hover:bg-[#174D35]/5 text-[#174D35] text-xs sm:text-sm font-semibold px-5 py-3 rounded-full border border-[#174D35]/30 hover:border-[#174D35] cursor-pointer"
                >
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Bar below */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 overflow-x-auto py-2 scrollbar-none">
          {PRODUCTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => animateSlide(idx, idx > currentIndex ? 1 : -1)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                idx === currentIndex
                  ? 'bg-black text-white shadow-xs scale-105'
                  : 'bg-white text-[#555C56] hover:bg-neutral-100 border border-[#E5E7DF]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};
