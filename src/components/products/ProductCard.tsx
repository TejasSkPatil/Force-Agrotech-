import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../data/products';
import { useTilt } from '../../hooks/useTilt';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const { cardRef, imageRef, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>({
    maxRotation: 4,
    perspective: 1000,
    imageScale: 1.05,
  });

  return (
    <div
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5E7DF] card-shadow-soft hover:card-shadow-hover transition-shadow duration-300 flex flex-col h-full cursor-pointer select-none perspective-container"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          ref={imageRef as any}
          src={product.imageUrl}
          alt={`${product.name} - ${product.category} export commodity`}
          className="w-full h-full object-cover will-change-transform"
          loading="lazy"
          decoding="async"
          width={640}
          height={400}
          referrerPolicy="no-referrer"
        />

        {/* Small Category Badge: "EXPORT INQUIRIES" in top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-[#174D35]/92 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
            {product.badge}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h3 className="font-serif-display text-2xl font-normal text-[#252A26] group-hover:text-[#174D35] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#555C56] leading-relaxed line-clamp-2 font-sans-body">
            {product.tagline}
          </p>
        </div>

        {/* View Products Action */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs sm:text-[13px] font-bold tracking-wide uppercase text-[#174D35] group-hover:text-[#123E2A]">
          <span>View Products</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
