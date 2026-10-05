import React, { useState } from 'react';
import { ArrowRight, Check, Briefcase, Anchor, ShieldCheck, Box, Headphones } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { SectionHeading } from '../components/common/SectionHeading';
import { QuoteModal } from '../components/common/QuoteModal';
import { DETAILED_SERVICES } from '../data/services';

export const ExportServicesPage: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <PageLayout
      eyebrow="GLOBAL SOURCING SERVICES"
      title="Comprehensive Support Built"
      italicTitle="Around Your Orders"
      description="From customized retail packaging and optical grading to containerized port logistics, Focus Agrotech simplifies agricultural procurement from India."
      breadcrumbs={[{ label: 'Export Services' }]}
    >
      {/* 1. In-depth Service Capabilities */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E5E7DF]">
        <Container size="xl">
          <div className="space-y-16">
            {DETAILED_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:col-span-6 space-y-5">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#4F8054]">
                    Service Category 0{index + 1}
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#252A26] leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body">
                    {service.detailedDescription}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2.5 pt-2">
                    {service.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#252A26]">
                        <div className="w-5 h-5 rounded-full bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => setIsQuoteOpen(true)}
                      className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#123E2A] cursor-pointer"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4 btn-arrow" />
                    </button>
                  </div>
                </div>

                {/* Deliverables Cards */}
                <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                  {service.deliverables.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#FAFAF5] border border-[#E5E7DF] card-shadow-soft"
                    >
                      <h3 className="font-serif-display text-lg font-normal text-[#252A26] mb-1.5">
                        {d.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                        {d.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Ports of Loading & Logistics Infrastructure */}
      <section className="py-16 sm:py-24 bg-[#FAFAF5]">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel label="PORT LOGISTICS" icon={Anchor} className="justify-center" />
            <SectionHeading
              title="Western Indian Sea Gateways &"
              italicPart="Container Loading"
              subtitle="All consignments are routed through India's premier international container ports with modern handling infrastructure."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-[#E5E7DF] card-shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174D35] block mb-2">
                Primary Deepwater Port
              </span>
              <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                Mundra Port (INMUN)
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                India’s largest commercial deepwater terminal, enabling high-volume container stuffing with minimal berth congestion and direct ocean routes to the Middle East, Europe, and Asia.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E5E7DF] card-shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174D35] block mb-2">
                Gulf of Kutch Gateway
              </span>
              <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                Kandla / Deendayal Port
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                Specialized in bulk dry agricultural shipments and containerized agricultural grains originating from Gujarat, Rajasthan, and central India.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E5E7DF] card-shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174D35] block mb-2">
                Major Western Hub
              </span>
              <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                Nhava Sheva / JNPT
              </h3>
              <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                Premier maritime trade center offering extensive vessel frequency, fast transit customs processing, and refrigerated reefer plug-ins for specialized spices.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </PageLayout>
  );
};
