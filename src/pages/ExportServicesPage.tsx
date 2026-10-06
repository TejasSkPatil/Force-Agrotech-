import React, { useState } from 'react';
import { Anchor } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { QuoteModal } from '../components/common/QuoteModal';
import { PinnedServiceParallaxStack } from '../components/services/PinnedServiceParallaxStack';

export const ExportServicesPage: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');

  const handleInquire = (serviceTitle?: string) => {
    if (serviceTitle) setSelectedServiceTitle(serviceTitle);
    setIsQuoteOpen(true);
  };

  return (
    <PageLayout
      eyebrow="GLOBAL SOURCING SERVICES"
      title="Comprehensive Support Built"
      italicTitle="Around Your Orders"
      description="From customized retail packaging and optical grading to containerized port logistics, Focus Agrotech simplifies agricultural procurement from India."
      breadcrumbs={[{ label: 'Export Services' }]}
    >
      {/* 1. In-depth Service Capabilities: Pinned Scroll-Driven Multi-Directional Parallax Card Stack */}
      <PinnedServiceParallaxStack onInquire={handleInquire} />

      {/* 2. Ports of Loading & Logistics Infrastructure with Alternating Reveal */}
      <section className="py-16 sm:py-24 bg-[#FAFAF5] overflow-hidden">
        <Container size="xl">
          <ScrollReveal x={-40} duration={0.7} className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel label="PORT LOGISTICS" icon={Anchor} className="justify-center" />
            <SectionHeading
              title="Western Indian Sea Gateways &"
              italicPart="Container Loading"
              subtitle="All consignments are routed through India's premier international container ports with modern handling infrastructure."
              align="center"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal x={-50} delay={0.1} className="bg-white p-7 rounded-2xl border border-[#E5E7DF] card-shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174D35] block mb-2">
                Primary Deepwater Port
              </span>
              <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                Mundra Port (INMUN)
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                India’s largest commercial deepwater terminal, enabling high-volume container stuffing with minimal berth congestion and direct ocean routes to the Middle East, Europe, and Asia.
              </p>
            </ScrollReveal>

            <ScrollReveal y={40} delay={0.2} className="bg-white p-7 rounded-2xl border border-[#E5E7DF] card-shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174D35] block mb-2">
                Gulf of Kutch Gateway
              </span>
              <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                Kandla / Deendayal Port
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                Specialized in bulk dry agricultural shipments and containerized agricultural grains originating from Gujarat, Rajasthan, and central India.
              </p>
            </ScrollReveal>

            <ScrollReveal x={50} delay={0.3} className="bg-white p-7 rounded-2xl border border-[#E5E7DF] card-shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174D35] block mb-2">
                Major Western Hub
              </span>
              <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                Nhava Sheva / JNPT
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                Premier maritime trade center offering extensive vessel frequency, fast transit customs processing, and refrigerated reefer plug-ins for specialized spices.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={selectedServiceTitle}
      />
    </PageLayout>
  );
};
