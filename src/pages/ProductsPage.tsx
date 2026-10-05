import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Search, X, PackageX, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS, Product } from '../data/products';

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Commodities' },
    { id: 'Grains & Cereals', label: 'Grains & Cereals' },
    { id: 'Grains & Rice', label: 'Rice' },
    { id: 'Legumes & Pulses', label: 'Pulses' },
    { id: 'Beans & Oilseeds', label: 'Beans' },
    { id: 'Spices & Herbs', label: 'Spices' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.specs.some(
          (s) =>
            s.label.toLowerCase().includes(q) ||
            s.value.toLowerCase().includes(q)
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectProduct = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <PageLayout
      eyebrow="OUR EXPORT PORTFOLIO"
      title="Verified Produce For"
      italicTitle="International Markets"
      description="Explore our range of milling wheat, premium basmati & non-basmati rice, protein-rich pulses, commercial cereals, beans, and aromatic Indian spices."
      breadcrumbs={[{ label: 'Products' }]}
    >
      <section className="py-16 sm:py-24 bg-[#FAFAF5]">
        <Container size="xl">
          {/* Top Search & Filter Bar Controls */}
          <div className="mb-10 space-y-5 pb-6 border-b border-[#E5E7DF]">
            {/* Search Input Bar */}
            <div className="max-w-xl relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#4F8054] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wheat, basmati rice, pulses, cumin, maize..."
                  aria-label="Search agricultural commodities"
                  className="w-full bg-white text-[#252A26] placeholder:text-[#88908A] pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl border border-[#E5E7DF] shadow-xs text-sm sm:text-base focus:outline-none focus:border-[#174D35] focus:ring-2 focus:ring-[#174D35]/15 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (From Reference Screenshot) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#4F8054] mr-2">
                <Layers className="w-4 h-4" />
                <span>Filter By:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#174D35] text-white shadow-xs'
                      : 'bg-white text-[#555C56] hover:bg-[#EBF2ED] hover:text-[#174D35] border border-[#E5E7DF]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results Counter and Active Filter Tags */}
            <div className="flex items-center justify-between text-xs text-[#555C56] pt-1">
              <span>
                Showing <strong className="text-[#174D35]">{filteredProducts.length}</strong> of{' '}
                {PRODUCTS.length} commodities
              </span>

              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs text-[#174D35] hover:text-[#123E2A] font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Product Grid or Empty Search State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} onSelect={handleSelectProduct} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E5E7DF] max-w-lg mx-auto shadow-xs space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FAFAF5] border border-[#E5E7DF] flex items-center justify-center mx-auto text-[#4F8054]">
                <PackageX className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-xl sm:text-2xl text-[#252A26]">
                No commodities found
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] max-w-sm mx-auto">
                No products match &ldquo;<span className="font-semibold text-[#174D35]">{searchQuery}</span>&rdquo; in the selected filter. Try searching for &ldquo;wheat&rdquo;, &ldquo;rice&rdquo;, or &ldquo;pulses&rdquo;.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Show All Products</span>
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>
    </PageLayout>
  );
};

