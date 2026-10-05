import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Globe, Truck, Building, Mail, Phone, Package } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { PRODUCTS } from '../data/products';

export const RequestQuotePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('wheat');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationPort, setDestinationPort] = useState('');
  const [quantity, setQuantity] = useState('');
  const [incoterm, setIncoterm] = useState('CIF');
  const [packaging, setPackaging] = useState('50kg PP Bags');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <PageLayout
      eyebrow="COMMERCIAL EXPORT DESK"
      title="Request a Custom Commercial"
      italicTitle="Export Quotation"
      description="Receive direct FOB/CIF containerized export pricing and verified quality parameters tailored to your port of destination."
      breadcrumbs={[{ label: 'Request a Quote' }]}
      showCTA={false}
    >
      <section className="py-16 sm:py-24 bg-[#FAFAF5]">
        <Container size="lg">
          <div className="bg-white rounded-3xl p-7 sm:p-12 border border-[#E5E7DF] card-shadow-hover">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-20 h-20 bg-[#EBF2ED] text-[#174D35] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-serif-display text-3xl font-normal text-[#252A26]">
                  Commercial Sourcing Request Confirmed
                </h2>
                <p className="text-sm sm:text-base text-[#555C56] max-w-lg mx-auto leading-relaxed font-sans-body">
                  Thank you, <span className="font-semibold text-[#252A26]">{fullName}</span> ({company}). We have logged your request for{' '}
                  <span className="font-semibold text-[#252A26]">{PRODUCTS.find(p => p.id === selectedProduct)?.name}</span> ({quantity}) to{' '}
                  <span className="font-semibold text-[#252A26]">{destinationPort}</span> under <span className="font-semibold text-[#252A26]">{incoterm}</span> terms.
                </p>
                <p className="text-xs text-[#4F8054] font-semibold">
                  A preliminary proforma quotation will be dispatched to {email} within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-interactive px-7 py-3 bg-[#174D35] text-white rounded-full text-xs font-semibold hover:bg-[#123E2A]"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 font-sans-body">
                <div>
                  <SectionLabel label="STEP 1: SELECT COMMODITY" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-2">
                    {PRODUCTS.map((prod) => (
                      <button
                        type="button"
                        key={prod.id}
                        onClick={() => setSelectedProduct(prod.id)}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          selectedProduct === prod.id
                            ? 'border-[#174D35] bg-[#EBF2ED] text-[#174D35] font-bold shadow-xs'
                            : 'border-neutral-200 text-[#555C56] hover:border-neutral-300 bg-[#FAFAF5]'
                        }`}
                      >
                        <span className="text-sm">{prod.name}</span>
                        <span className="text-[10px] text-neutral-400 mt-0.5">India Origin</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logistics & Order Parameters */}
                <div>
                  <SectionLabel label="STEP 2: VOLUME & INCOTERMS" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Required Quantity (MT / Containers) *
                      </label>
                      <input
                        type="text"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 250 MT (10 x 20ft FCL)"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Destination Port & Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={destinationPort}
                        onChange={(e) => setDestinationPort(e.target.value)}
                        placeholder="e.g. Jebel Ali / Rotterdam / Mersin"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Preferred Incoterm *
                      </label>
                      <select
                        value={incoterm}
                        onChange={(e) => setIncoterm(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      >
                        <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                        <option value="CFR">CFR (Cost & Freight)</option>
                        <option value="FOB">FOB (Mundra / Kandla / Nhava Sheva)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Packaging & Contact Details */}
                <div>
                  <SectionLabel label="STEP 3: BUYER & CONTACT INFORMATION" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Marcus Thorne"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Global Agri Foods B.V."
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Official Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="procurement@globalagrifoods.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+31 20 1234567"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Custom Packaging & Target Specifications
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify maximum moisture, sortex grading level, customized private-label bag printing, or delivery timeline constraints."
                    className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs text-[#555C56]">
                    <ShieldCheck className="w-4 h-4 text-[#174D35]" />
                    <span>Direct Export Operations · Gujarat & Indian Ports</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-interactive inline-flex items-center gap-2 px-8 py-3.5 bg-[#174D35] text-white rounded-full text-xs font-semibold hover:bg-[#123E2A] shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Commercial Quote Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};
