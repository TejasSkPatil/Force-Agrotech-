import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionLabel } from '../common/SectionLabel';
import { ProductCard } from './ProductCard';
import { Product } from '../../data/products';
import { initStaggerReveal } from '../../animations/scrollAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onDiscussRequirements?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onDiscussRequirements,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!gridRef.current) return;
    const cleanup = initStaggerReveal(gridRef.current, '.product-card-item', 0.14, prefersReduced);
    return cleanup;
  }, [prefersReduced]);

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#FAFAF5]">
      <Container size="xl">
        {/* Header Block: Two columns on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <SectionLabel label="OUR PRODUCT RANGE" icon={Layers} />
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#252A26] leading-tight">
              Quality Produce For Global Markets
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body">
              Explore our selection of agricultural products for importers, wholesalers, distributors, and food businesses.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/products"
              className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] hover:bg-[#123E2A] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xs active:scale-95 group cursor-pointer"
            >
              <span>Our Products</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 btn-arrow" />
            </Link>
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {products.map((product) => (
            <div key={product.id} className="product-card-item">
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
