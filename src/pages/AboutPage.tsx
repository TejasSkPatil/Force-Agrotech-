import React from 'react';
import { ArrowRight, ShieldCheck, Award, CheckCircle2, Globe, Building2, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { SectionHeading } from '../components/common/SectionHeading';
import { COMPANY_INFO, WHY_CHOOSE_US } from '../data/company';

export const AboutPage: React.FC = () => {
  return (
    <PageLayout
      eyebrow="ABOUT FOCUS AGROTECH"
      title="A Dependable Global Partner in"
      italicTitle="Agricultural Export"
      description="Focus Agrotech Private Limited sources, inspects, and exports premium agricultural commodities from India to international food businesses, wholesalers, and importers."
      breadcrumbs={[{ label: 'About Us' }]}
    >
      {/* 1. Corporate Background & History */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E5E7DF]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] arch-right-shape overflow-hidden shadow-xl border-4 border-white bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                  alt="Lush green agricultural crop field in India"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={750}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Foundation Badge */}
              <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-[#E5E7DF] max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#174D35]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#4F8054] font-bold block">
                      Established 2016
                    </span>
                    <span className="text-sm font-bold text-[#252A26]">
                      Focus AgroTech Pvt. Ltd.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <SectionLabel label="COMPANY HERITAGE" icon={Building2} />
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#252A26] leading-tight">
                Rooted in Integrity, Connected to Global Markets
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#555C56] leading-relaxed font-sans-body">
                <p>
                  Originally founded in 2016, <strong>Focus AgroTech Pvt. Ltd.</strong> is a leading agricultural export enterprise headquartered in Ahmedabad, Gujarat, India.
                </p>
                <p>
                  We coordinate agricultural sourcing directly from major farming belts across Gujarat, Madhya Pradesh, Punjab, Haryana, and Maharashtra. By prioritizing quality over volume, we help international food processors, distributors, and bulk purchasers secure clean, verified grains and pulses with transparent documentation.
                </p>
              </div>

              {/* Verified Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-xl bg-[#FAFAF5] border border-[#E5E7DF]">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#252A26] mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#174D35]" />
                    <span>Buyer-Focused Sourcing</span>
                  </div>
                  <p className="text-xs text-[#555C56] leading-relaxed">
                    Custom grade specifications tailored to target regional culinary standards.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAFAF5] border border-[#E5E7DF]">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#252A26] mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#174D35]" />
                    <span>Product Sourcing Support</span>
                  </div>
                  <p className="text-xs text-[#555C56] leading-relaxed">
                    Direct mandi procurement and rigorous pre-loading verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Sourcing Mission & Operating Principles */}
      <section className="py-16 sm:py-24 bg-[#FAFAF5]">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel label="OUR CORE COMMITMENT" icon={Target} className="justify-center" />
            <SectionHeading
              title="Built Around Accuracy, Consistency and"
              italicPart="Trust"
              subtitle="International agricultural trade relies on uncompromised specifications, timely shipping, and clear communication."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7DF] card-shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                  Rigorous Quality Control
                </h3>
                <p className="text-sm text-[#555C56] leading-relaxed font-sans-body">
                  Every lot is analyzed for moisture, grain length, foreign material, and sortex purity before export packing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-semibold text-[#174D35]">
                Lab Verified Standards
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E5E7DF] card-shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                  Western Indian Gateway
                </h3>
                <p className="text-sm text-[#555C56] leading-relaxed font-sans-body">
                  Strategic access to Mundra, Kandla, and Nhava Sheva ports facilitates reliable vessel departures and predictable sailing times.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-semibold text-[#174D35]">
                Port-to-Port Containerization
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E5E7DF] card-shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-normal text-[#252A26] mb-3">
                  Clear Regulatory Execution
                </h3>
                <p className="text-sm text-[#555C56] leading-relaxed font-sans-body">
                  From Phytosanitary Certificates to non-GMO attestations, we supply complete, verifiable export paperwork for customs clearance.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-semibold text-[#174D35]">
                Incoterms & L/C Compliance
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/products"
              className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-xs hover:bg-[#123E2A]"
            >
              <span>Explore Our Product Portfolio</span>
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </Link>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};
