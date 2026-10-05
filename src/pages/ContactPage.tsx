import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Building2, CheckCircle2, Globe } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Container } from '../components/layout/Container';
import { SectionLabel } from '../components/common/SectionLabel';
import { COMPANY_INFO } from '../data/company';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
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
      eyebrow="GET IN TOUCH"
      title="Connect with Our"
      italicTitle="International Export Desk"
      description="Direct inquiries, sample dispatch requests, and commercial FOB/CIF pricing for global agricultural buyers."
      breadcrumbs={[{ label: 'Contact Us' }]}
    >
      <section className="py-16 sm:py-24 bg-[#FAFAF5]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Verified Contact Information & Office Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <SectionLabel label="CORPORATE HEADQUARTERS" icon={Building2} />
                <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#252A26] leading-tight mb-4">
                  Focus Agrotech Private Limited
                </h2>
                <p className="text-sm text-[#555C56] leading-relaxed font-sans-body">
                  Established in 2016 as Focus AgroTech Pvt. Ltd. Contact our commercial team in Ahmedabad for commodity specifications, vessel allocations, and trade documentation.
                </p>
              </div>

              {/* Direct Touchpoints */}
              <div className="space-y-4 font-sans-body">
                <div className="p-5 rounded-2xl bg-white border border-[#E5E7DF] card-shadow-soft flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#4F8054] font-bold block">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-base font-bold text-[#252A26] hover:text-[#174D35] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Monday to Saturday, 9:30 AM – 6:30 PM IST
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5E7DF] card-shadow-soft flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#4F8054] font-bold block">
                      Export Desk Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-base font-bold text-[#252A26] hover:text-[#174D35] transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <p className="text-xs text-[#555C56] mt-0.5">
                      Response within 24 business hours
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5E7DF] card-shadow-soft flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF2ED] text-[#174D35] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#4F8054] font-bold block">
                      Registered Office & Facility
                    </span>
                    <p className="text-sm font-semibold text-[#252A26] leading-relaxed mt-0.5">
                      {COMPANY_INFO.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="p-6 rounded-2xl bg-[#EBF2ED] border border-[#D5E2D9] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#174D35]">Quick WhatsApp Chat</h4>
                  <p className="text-xs text-[#555C56] mt-0.5">Direct link with export coordinator</p>
                </div>
                <a
                  href="https://wa.me/919824964465"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-interactive inline-flex items-center gap-2 bg-[#174D35] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[#123E2A]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Now</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Commercial Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-10 border border-[#E5E7DF] card-shadow-soft">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#EBF2ED] text-[#174D35] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-display text-2xl font-normal text-[#252A26]">
                    Message Transmitted Successfully
                  </h3>
                  <p className="text-sm text-[#555C56] max-w-md mx-auto leading-relaxed font-sans-body">
                    Thank you, <span className="font-semibold text-[#252A26]">{fullName}</span>. Your message has been routed to our Ahmedabad export operations desk. A trade representative will reply shortly to <span className="font-semibold text-[#252A26]">{email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-interactive px-6 py-2.5 bg-[#174D35] text-white text-xs font-semibold rounded-full hover:bg-[#123E2A]"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-sans-body">
                  <div className="border-b border-neutral-100 pb-4">
                    <h3 className="font-serif-display text-2xl font-normal text-[#252A26]">
                      Direct Trade Inquiry Form
                    </h3>
                    <p className="text-xs text-[#555C56] mt-1">
                      Complete this form for prompt commercial assistance and proforma invoices.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Robert Jensen"
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
                        placeholder="e.g. Jensen Food Trading LLC"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@company.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 1234567"
                        className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Subject / Target Commodity *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Inquiry for 500 MT Basmati Rice (CIF Rotterdam)"
                      className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Message & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe target specifications, estimated quantity, preferred packaging, and required port of destination."
                      className="w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-interactive inline-flex items-center gap-2 px-7 py-3 bg-[#174D35] text-white rounded-full text-xs font-semibold hover:bg-[#123E2A] shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Trade Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};
