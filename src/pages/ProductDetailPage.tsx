import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, Globe, Package, Check, ArrowRight, Truck, FileCheck, Layers } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { ProductCard } from '../components/products/ProductCard';
import { QuoteModal } from '../components/common/QuoteModal';
import { PRODUCTS, Product } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const product = PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <PageLayout
      eyebrow={`COMMODITY EXPORT · ${product.category.toUpperCase()}`}
      title={product.name}
      italicTitle="Export Specifications"
      description={product.tagline}
      breadcrumbs={[
        { label: 'Products', href: '/products' },
        { label: product.name },
      ]}
    >
      {/* 1. Main Commodity Overview Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E5E7DF]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Visual Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] arch-right-shape overflow-hidden shadow-2xl border-4 border-white bg-neutral-900">
                <img
                  src={product.imageUrl}
                  alt={`${product.name} - ${product.category} for global export from India`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  width={800}
                  height={550}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block bg-[#174D35] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-xs">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Shipping & Handling Fast Facts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAFAF5] border border-[#E5E7DF]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#174D35] mb-1">
                    <Truck className="w-4 h-4" />
                    <span>Transit Ports</span>
                  </div>
                  <p className="text-xs text-[#555C56]">
                    Mundra, Kandla & Nhava Sheva (JNPT)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF5] border border-[#E5E7DF]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#174D35] mb-1">
                    <FileCheck className="w-4 h-4" />
                    <span>Incoterms</span>
                  </div>
                  <p className="text-xs text-[#555C56]">
                    FOB, CIF & CFR to all global destination ports
                  </p>
                </div>
              </div>
            </div>

            {/* Content & Specifications Column */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <SectionLabel label="PRODUCT PROFILE" icon={Layers} />
                <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#252A26] leading-tight mb-4">
                  Export Grade {product.name} Sourced from India
                </h2>
                <p className="text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body">
                  {product.description}
                </p>
              </div>

              {/* Standard Laboratory Specifications Table */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#174D35] mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#174D35]" />
                  Standard Export Parameters & Purity
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#FAFAF5] rounded-xl border border-[#E5E7DF] flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-medium text-[#555C56]">
                        {spec.label}
                      </span>
                      <span className="text-base font-bold text-[#252A26] tabular-nums mt-1">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Origin & Packaging Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#FAFAF5] border border-[#E5E7DF]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#174D35] mb-2">
                    <Globe className="w-4 h-4" />
                    <span>Agricultural Origin</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#252A26] font-semibold">
                    {product.origin}
                  </p>
                  <p className="text-[11px] text-[#555C56] mt-1">
                    Direct mandi aggregation from verified regional farm cooperatives.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAFAF5] border border-[#E5E7DF]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#174D35] mb-2">
                    <Package className="w-4 h-4" />
                    <span>Export Packaging</span>
                  </div>
                  <ul className="text-xs text-[#555C56] space-y-1.5">
                    {product.packaging.map((pack, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#174D35] shrink-0" />
                        <span>{pack}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full shadow-xs hover:bg-[#123E2A] cursor-pointer"
                >
                  <span>Request Quote for {product.name}</span>
                  <ArrowRight className="w-4 h-4 btn-arrow" />
                </button>

                <Link
                  to="/products"
                  className="btn-interactive inline-flex items-center gap-2 bg-transparent text-[#174D35] text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full border border-[#174D35]/35 hover:border-[#174D35] hover:bg-[#174D35]/5"
                >
                  <span>View All Commodities</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Related Commodities Section */}
      <section className="py-16 sm:py-24 bg-[#FAFAF5]">
        <Container size="xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel label="COMPLEMENTARY SOURCING" />
              <h2 className="font-serif-display text-3xl font-normal text-[#252A26]">
                Other Quality Agricultural Commodities
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-bold text-[#174D35] hover:underline hidden sm:inline-block"
            >
              Browse Complete Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(prod) => {
                  window.location.href = `/products/${prod.id}`;
                }}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Commodity-Specific Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={product.id}
      />
    </PageLayout>
  );
};
