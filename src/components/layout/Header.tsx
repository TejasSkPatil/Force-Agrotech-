import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { MAIN_NAVIGATION } from '../../data/navigation';
import { Logo } from '../common/Logo';

interface HeaderProps {
  onOpenQuoteModal: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll and Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3 border-b border-[#E5E7DF] shadow-xs'
          : 'bg-white/80 backdrop-blur-xs py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand Wordmark / Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform duration-200 shrink-0"
            aria-label="Focus Agrotech Home"
          >
            <Logo variant="combined" theme="light" />
          </Link>

          {/* Zone 2: Navigation Links — Horizontal Black Segmented Capsule Bar in center area */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center p-1 bg-[#282C29] border border-white/10 rounded-xl shadow-inner text-[11px] md:text-xs xl:text-[13px] font-medium overflow-x-auto max-w-[calc(100vw-270px)] sm:max-w-none scrollbar-none shrink-0"
          >
            {MAIN_NAVIGATION.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-all duration-200 px-2 sm:px-2.5 xl:px-3.5 py-1 sm:py-1.5 rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white font-semibold shadow-xs'
                      : 'text-white/80 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] hover:bg-[#123E2A] text-white text-xs sm:text-[13px] font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
            </button>

            {/* Mobile Toggle Button (only on extra small screens when needed) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-1.5 rounded-lg text-[#252A26] hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-[#E5E7DF] shadow-xl transition-all duration-300"
        >
          <nav className="flex flex-col p-6 space-y-2 max-h-[75vh] overflow-y-auto font-sans-body">
            {MAIN_NAVIGATION.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2.5 px-4 rounded-xl transition-all ${
                    isActive
                      ? 'bg-black text-white font-semibold shadow-xs'
                      : 'text-[#252A26] hover:bg-[#F0F2EB]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-neutral-100 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#174D35] text-white py-3 rounded-full text-sm font-semibold shadow-sm cursor-pointer"
              >
                <span>Request Commercial Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
