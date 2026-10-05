import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, MessageCircle, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FOOTER_QUICK_LINKS, FOOTER_PRODUCT_LINKS } from '../../data/navigation';
import { COMPANY_INFO } from '../../data/company';
import { Logo } from '../common/Logo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FooterProps {
  onProductClick?: (productId: string) => void;
  onOpenQuoteModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onProductClick,
  onOpenQuoteModal,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const logoBlockRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!footerRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // 1. Logo block reveal
      if (logoBlockRef.current) {
        tl.fromTo(
          logoBlockRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }

      // 2. Columns stagger reveal
      const cols = [quickLinksRef.current, productsRef.current].filter(Boolean);
      if (cols.length) {
        tl.fromTo(
          cols,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' },
          '-=0.35'
        );
      }

      // 3. Contact reveal
      if (contactRef.current) {
        tl.fromTo(
          contactRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 4. Copyright reveal last
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }, footerRef.current);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="bg-[#0D2B1E] text-white pt-16 sm:pt-20 pb-10 border-t border-[#174D35]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div ref={logoBlockRef} className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block" aria-label="Focus Agrotech Home">
              <Logo variant="combined" theme="dark" />
            </Link>
            <p className="text-sm text-neutral-300/85 leading-relaxed max-w-sm font-sans-body">
              Agricultural product sourcing and export support from India for global buyers. Established 2016 as Focus AgroTech Pvt. Ltd.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-neutral-300 hover:text-white transition-colors border border-white/10"
                aria-label="Focus Agrotech LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/919824964465`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-neutral-300 hover:text-white transition-colors border border-white/10"
                aria-label="Focus Agrotech WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.website}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/18 flex items-center justify-center text-neutral-300 hover:text-white transition-colors border border-white/10"
                aria-label="Focus Agrotech Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2.5 cols) */}
          <div ref={quickLinksRef} className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300/80 font-sans-body">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column (2.5 cols) */}
          <div ref={productsRef} className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300/80 font-sans-body">
              {FOOTER_PRODUCT_LINKS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    to={prod.href}
                    onClick={() => onProductClick && onProductClick(prod.id)}
                    className="hover:text-white transition-colors duration-150 inline-block py-0.5 cursor-pointer text-left"
                  >
                    {prod.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div ref={contactRef} className="lg:col-span-4 space-y-4 font-sans-body">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-neutral-300/85">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#174D35] flex items-center justify-center shrink-0 text-[#4F8054]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#174D35] flex items-center justify-center shrink-0 text-[#4F8054]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#174D35] flex items-center justify-center shrink-0 text-[#4F8054] mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug">{COMPANY_INFO.location}</span>
              </li>
            </ul>

            {onOpenQuoteModal && (
              <div className="pt-2">
                <button
                  onClick={onOpenQuoteModal}
                  className="text-xs font-semibold text-[#D6A84F] hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Direct Commercial Sourcing Desk →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          ref={bottomBarRef}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4 font-sans-body"
        >
          <p>© {COMPANY_INFO.copyrightYear} Focus Agrotech. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-neutral-200 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-neutral-600">|</span>
            <Link to="/contact" className="hover:text-neutral-200 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
