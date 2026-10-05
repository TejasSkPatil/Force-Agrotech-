import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from './Container';
import { FinalCTA } from '../cta/FinalCTA';
import { QuoteModal } from '../common/QuoteModal';

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF5] text-[#252A26] antialiased selection:bg-[#174D35] selection:text-white font-sans-body">
      {/* Header */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main className="flex-1">
        {/* Page Hero Header Banner */}
        <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 bg-gradient-to-b from-[#EBF2ED]/60 via-[#FAFAF5] to-[#FAFAF5] border-b border-[#E5E7DF]">
          <Container size="xl">
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#555C56] mb-5">
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
                <span className="text-xs uppercase tracking-wider text-[#4F8054] font-bold block">
                  {eyebrow}
                </span>
              )}
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#252A26] leading-[1.12]">
                {title}{' '}
                {italicTitle && (
                  <span className="italic-accent text-[#174D35] font-normal">
                    {italicTitle}
                  </span>
                )}
              </h1>
              {description && (
                <p className="text-base sm:text-lg text-[#555C56] leading-relaxed pt-1">
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
