import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from './Container';
import { FinalCTA } from '../cta/FinalCTA';
import { QuoteModal } from '../common/QuoteModal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  italicTitle?: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  showCTA?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  italicTitle,
  eyebrow,
  description,
  breadcrumbs = [],
  showCTA = true,
}) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const breadcrumbRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 1: Breadcrumb slides in from left to right
      if (breadcrumbRef.current) {
        tl.fromTo(
          breadcrumbRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' }
        );
      }

      // Step 2: Eyebrow badge slides in from left to right
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.35'
        );
      }

      // Step 3: Main page heading slides in from left to right
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, x: -70 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.45'
        );
      }

      // Step 4: Page description slides in from left to right
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.55'
        );
      }
    });

    return () => ctx.revert();
  }, [title, prefersReduced]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF5] text-[#252A26] antialiased selection:bg-[#174D35] selection:text-white font-sans-body">
      {/* Header */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main className="flex-1">
        {/* Page Hero Header Banner with Left-to-Right Entrance */}
        <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-gradient-to-b from-[#EBF2ED]/60 via-[#FAFAF5] to-[#FAFAF5] border-b border-[#E5E7DF] overflow-hidden">
          <Container size="xl">
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
              <nav
                ref={breadcrumbRef}
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-xs text-[#555C56] mb-5 will-change-transform"
              >
                <Link to="/" className="hover:text-[#174D35] transition-colors">
                  Home
                </Link>
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    {crumb.href ? (
                      <Link to={crumb.href} className="hover:text-[#174D35] transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-[#174D35] font-semibold">{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <div className="max-w-3xl space-y-3">
              {eyebrow && (
                <span
                  ref={eyebrowRef}
                  className="text-xs uppercase tracking-wider text-[#4F8054] font-bold block will-change-transform"
                >
                  {eyebrow}
                </span>
              )}
              <h1
                ref={headingRef}
                className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#252A26] leading-[1.12] will-change-transform"
              >
                {title}{' '}
                {italicTitle && (
                  <span className="italic-accent text-[#174D35] font-normal">
                    {italicTitle}
                  </span>
                )}
              </h1>
              {description && (
                <p
                  ref={descRef}
                  className="text-base sm:text-lg text-[#555C56] leading-relaxed pt-1 will-change-transform"
                >
                  {description}
                </p>
              )}
            </div>
          </Container>
        </section>

        {/* Page Inner Content */}
        {children}

        {/* Global CTA Section */}
        {showCTA && (
          <FinalCTA onRequestQuote={() => setIsQuoteModalOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      {/* Interactive Global Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
};
