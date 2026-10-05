import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/hero/Hero';
import { InfiniteMarquee } from '../components/common/InfiniteMarquee';
import { ProductGrid } from '../components/products/ProductGrid';
import { FeaturedShowcase } from '../components/products/FeaturedShowcase';
import { AboutSection } from '../components/about/AboutSection';
import { WhyChooseUs } from '../components/why-us/WhyChooseUs';
import { ExportServices } from '../components/services/ExportServices';
import { FinalCTA } from '../components/cta/FinalCTA';
import { QuoteModal } from '../components/common/QuoteModal';
import { ProductModal } from '../components/products/ProductModal';
import { AnimatedPreloader } from '../components/common/AnimatedPreloader';
import { PRODUCTS, Product } from '../data/products';

export const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [defaultQuoteProduct, setDefaultQuoteProduct] = useState<string>('');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'quality', 'services', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuoteModal = (productId = '') => {
    setDefaultQuoteProduct(productId);
    setIsQuoteModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const handleInquireFromProductModal = (product: Product) => {
    setSelectedProductForModal(null);
    handleOpenQuoteModal(product.id);
  };

  const handleFooterProductClick = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setSelectedProductForModal(product);
    }
  };

  const handleScrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF5] text-[#252A26] antialiased selection:bg-[#174D35] selection:text-white font-sans-body">
      {/* 0. GSAP Video-Inspired Animated Intro Preloader */}
      <AnimatedPreloader />

      {/* 1. Top Navigation Bar */}
      <Header
        activeSection={activeSection}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreProducts={handleScrollToProducts}
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />

        {/* 2.1 Video-Inspired Infinite Marquee Ticker */}
        <InfiniteMarquee />

        {/* 3. Product Range Showcase */}
        <ProductGrid
          products={PRODUCTS}
          onSelectProduct={handleSelectProduct}
          onDiscussRequirements={() => handleOpenQuoteModal()}
        />

        {/* 3.1 Video-Inspired Kinetic Featured Showcase Slider */}
        <FeaturedShowcase
          onSelectProduct={handleSelectProduct}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 4. About Focus Agrotech Section */}
        <AboutSection
          onOpenQuoteModal={() => handleOpenQuoteModal()}
        />

        {/* 5. Why Choose Focus Agrotech */}
        <WhyChooseUs />

        {/* 6. Export Services Matrix */}
        <ExportServices
          onStartEnquiry={() => handleOpenQuoteModal()}
        />

        {/* 7. Final Call to Action */}
        <FinalCTA
          onRequestQuote={() => handleOpenQuoteModal()}
        />
      </main>

      {/* 8. Corporate Footer */}
      <Footer
        onProductClick={handleFooterProductClick}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Interactive Commercial Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultProduct={defaultQuoteProduct}
      />

      {/* Interactive Product Details & Specs Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onInquire={handleInquireFromProductModal}
      />
    </div>
  );
};
