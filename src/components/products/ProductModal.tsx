import React, { useEffect } from 'react';
import { X, Check, Globe, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '../../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onInquire: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 bg-neutral-900 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6A84F] bg-[#174D35]/90 px-2.5 py-0.5 rounded-full inline-block mb-1.5 font-sans-body">
              {product.category}
            </span>
            <h3 id="product-modal-title" className="text-2xl sm:text-3xl font-serif-display font-normal text-white">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-lg font-sans-body">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto font-sans-body">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Product Overview
            </h4>
            <p className="text-sm text-[#555C56] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#174D35]" />
              Standard Export Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {product.specs.map((spec, index) => (
                <div key={index} className="p-3 bg-[#F4F7F5] rounded-xl border border-[#E5E7DF]">
                  <span className="block text-[11px] text-[#555C56]">{spec.label}</span>
                  <span className="block text-sm font-semibold text-[#252A26] mt-0.5 tabular-nums">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging & Origin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-neutral-700 mb-2">
                <Globe className="w-4 h-4 text-[#174D35]" />
                Agricultural Origin
              </div>
              <p className="text-xs text-neutral-600 font-medium">
                {product.origin}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-neutral-700 mb-2">
                <Package className="w-4 h-4 text-[#174D35]" />
                Export Packaging Options
              </div>
              <ul className="text-xs text-neutral-600 space-y-1">
                {product.packaging.map((pack, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#174D35]" />
                    <span>{pack}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans-body">
          <a
            href={`/products/${product.id}`}
            className="text-xs font-semibold text-[#174D35] hover:underline"
          >
            Open Full Specifications Page →
          </a>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(product);
              }}
              className="btn-interactive inline-flex items-center gap-2 px-5 py-2.5 bg-[#174D35] text-white text-xs font-semibold rounded-full hover:bg-[#123E2A] transition-all shadow-xs"
            >
              <span>Inquire for {product.name}</span>
              <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
