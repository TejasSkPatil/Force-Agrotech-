import React, { useState } from 'react';
import { ShieldCheck, Microscope, CheckCircle2, FileCheck2, Award, ArrowRight, Layers } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { SectionHeading } from '../components/common/SectionHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { QuoteModal } from '../components/common/QuoteModal';

export const QualityAssurancePage: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const qualityStages = [
    {
      step: '01',
      title: 'Mandi-Level Primary Selection',
      desc: 'Our sourcing representatives examine incoming harvest batches directly at farm-gate markets in Gujarat, Punjab, and Madhya Pradesh, testing grain fill, aroma, and natural dryness.',
    },
    {
      step: '02',
      title: 'Sortex Optical Cleaning & Grading',
      desc: 'Grains pass through multi-channel bichromatic optical sorters to eliminate chalky, discolored, or broken kernels, achieving up to 99.5% purity.',
    },
    {
      step: '03',
      title: 'Certified Laboratory Analysis',
      desc: 'Accredited testing for moisture percentage, falling number, protein concentration, gluten strength, aflatoxin limits, and pesticide residue verification.',
    },
    {
      step: '04',
      title: 'Supervised Fumigation & Containerization',
      desc: 'Container dry pre-checks, food-grade paper lining, desiccant placement, and government-licensed fumigation with gas clearance certificates.',
    },
  ];

  const parameterTable = [
    { commodity: 'Milling Wheat', moisture: '12% Max', purity: '98.5% Min', foreign: '1.5% Max', keyFactor: 'Protein 11.5% - 13.5%' },
    { commodity: '1121 Basmati Rice', moisture: '12.5% Max', purity: '95% Min', foreign: '0.5% Max', keyFactor: 'Average Length 8.35mm' },
    { commodity: 'Kabuli Chickpeas', moisture: '11% Max', purity: '99% Sortex', foreign: '0.5% Max', keyFactor: 'Counts 42/44, 44/46, 58/60' },
    { commodity: 'Yellow Maize / Corn', moisture: '13% Max', purity: '98% Min', foreign: '1.5% Max', keyFactor: 'Aflatoxin < 20 PPB' },
    { commodity: 'Kidney Beans (Rajma)', moisture: '12% Max', purity: '98% Min', foreign: '0.5% Max', keyFactor: 'Uniform Color & Size' },
    { commodity: 'Turmeric Fingers', moisture: '10% Max', purity: '99% Clean', foreign: '1% Max', keyFactor: 'Curcumin 3% - 5% Min' },
  ];

  return (
    <PageLayout
      eyebrow="STANDARDS & CERTIFICATIONS"
      title="Uncompromising Standards at"
      italicTitle="Every Sourcing Stage"
      description="Quality is the cornerstone of Focus Agrotech. From farm aggregation to oceanic dispatch, our verification protocols protect your supply chain."
      breadcrumbs={[{ label: 'Quality Assurance' }]}
    >
      {/* 1. Four-Stage Quality Pipeline with Alternating Left/Right Slides */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E5E7DF] overflow-hidden">
        <Container size="xl">
          <ScrollReveal x={-50} duration={0.7} className="max-w-3xl mb-14">
            <SectionLabel label="SYSTEMATIC REVIEW" icon={ShieldCheck} />
            <SectionHeading
              title="End-to-End Quality Protocol Built For"
              italicPart="Global Importers"
              subtitle="We implement strict standardized operating procedures across aggregation, handling, processing, and port loading."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStages.map((stage, sIdx) => {
              // Alternating left and right entrance for stages:
              const isEven = sIdx % 2 === 0;
              return (
                <ScrollReveal
                  key={stage.step}
                  x={isEven ? -45 : 45}
                  delay={sIdx * 0.1}
                  duration={0.75}
                  className="bg-[#FAFAF5] rounded-2xl p-6 sm:p-7 border border-[#E5E7DF] card-shadow-soft hover:card-shadow-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif-display text-3xl font-bold text-[#174D35] block mb-4">
                      {stage.step}
                    </span>
                    <h3 className="font-serif-display text-xl font-normal text-[#252A26] mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
                      {stage.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-neutral-200/70 flex items-center gap-1 text-[11px] font-semibold text-[#174D35]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Benchmark</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 2. Benchmark Specifications Table with Alternating Reveal */}
      <section className="py-16 sm:py-24 bg-[#FAFAF5] overflow-hidden">
        <Container size="xl">
          <ScrollReveal x={-40} duration={0.7} className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel label="COMMODITY PARAMETERS" icon={Microscope} className="justify-center" />
            <SectionHeading
              title="Standard Export Quality"
              italicPart="Tolerances & Metrics"
              subtitle="All parameters are validated by government-approved testing agencies prior to issuing the export Bill of Lading."
              align="center"
            />
          </ScrollReveal>

          <ScrollReveal y={35} duration={0.8} className="bg-white rounded-2xl border border-[#E5E7DF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans-body">
                <thead className="bg-[#EBF2ED] text-xs font-bold uppercase tracking-wider text-[#174D35] border-b border-[#E5E7DF]">
                  <tr>
                    <th className="py-4 px-6">Commodity</th>
                    <th className="py-4 px-6">Moisture Limit</th>
                    <th className="py-4 px-6">Sortex Purity</th>
                    <th className="py-4 px-6">Foreign Matter</th>
                    <th className="py-4 px-6">Key Quality Determinant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7DF] text-[#252A26]">
                  {parameterTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAF5] transition-colors">
                      <td className="py-4 px-6 font-bold text-[#252A26]">{row.commodity}</td>
                      <td className="py-4 px-6 tabular-nums">{row.moisture}</td>
                      <td className="py-4 px-6">{row.purity}</td>
                      <td className="py-4 px-6 tabular-nums">{row.foreign}</td>
                      <td className="py-4 px-6 font-semibold text-[#174D35]">{row.keyFactor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Third party inspections banner with alternating slide */}
          <ScrollReveal y={30} delay={0.2} className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7DF] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-display text-xl font-normal text-[#252A26]">
                  Need Independent Inspection Certification?
                </h4>
                <p className="text-xs sm:text-sm text-[#555C56] mt-0.5">
                  We gladly coordinate with SGS, Bureau Veritas, Intertek, or your nominated surveyor prior to vessel departure.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#123E2A] shrink-0 cursor-pointer"
            >
              <span>Discuss Inspection Criteria</span>
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </button>
          </ScrollReveal>
        </Container>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </PageLayout>
  );
};
