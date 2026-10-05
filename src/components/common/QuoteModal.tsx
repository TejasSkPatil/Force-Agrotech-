import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Globe, Phone, Mail, Building } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = '',
}) => {
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct || 'wheat');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationPort, setDestinationPort] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="bg-[#174D35] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#D6A84F] font-semibold">
              Export Desk · Direct Inquiry
            </span>
            <h3 id="modal-title" className="text-xl font-normal font-serif-display mt-0.5">
              Request Commercial Export Quote
            </h3>
          </div>
          <button
            onClick={resetForm}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#EBF2ED] text-[#174D35] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif-display font-normal text-[#252A26]">
              Inquiry Dispatched Successfully
            </h4>
            <p className="text-sm text-[#555C56] max-w-md mx-auto leading-relaxed font-sans-body">
              Thank you, <span className="font-semibold text-[#252A26]">{fullName}</span>. Our international export team will review your specifications for{' '}
              <span className="font-semibold text-[#252A26]">{PRODUCTS.find(p => p.id === selectedProduct)?.name || selectedProduct}</span> and contact your office within 24 business hours with preliminary FOB/CIF quotes.
            </p>
            <div className="pt-4">
              <button
                onClick={resetForm}
                className="btn-interactive px-6 py-2.5 bg-[#174D35] text-white rounded-full text-sm font-medium hover:bg-[#123E2A] transition-colors"
              >
                Return to Overview
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto font-sans-body">
            {/* Product selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-neutral-700 mb-1.5">
                Target Agricultural Commodity *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.map((prod) => (
                  <button
                    type="button"
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                      selectedProduct === prod.id
                        ? 'border-[#174D35] bg-[#EBF2ED] text-[#174D35] font-semibold'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {prod.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Two column inputs */}
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
                  placeholder="e.g. David Mueller"
                  className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Company / Organization *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. EuroGrains Trading Ltd"
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                  />
                  <Building className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Business Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buyer@enterprise.com"
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 170 1234567"
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                  />
                  <Phone className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Destination Port / Country *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="e.g. Jebel Ali, Rotterdam, Mersin"
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                  />
                  <Globe className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Estimated Quantity (MT) *
                </label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 500 Metric Tons / 2 Containers"
                  className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Order Specifications & Packaging Preferences
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Include custom moisture/purity specs, target delivery schedule, or preferred packaging (e.g. 50kg PP bags)."
                className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:ring-1 focus:ring-[#174D35] focus:border-[#174D35] bg-neutral-50/50"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-interactive inline-flex items-center gap-2 px-6 py-2.5 bg-[#174D35] text-white rounded-full text-xs font-semibold hover:bg-[#123E2A] transition-colors shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Submit Commercial Inquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
