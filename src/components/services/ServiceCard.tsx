import React from 'react';
import { ClipboardCheck, Package, Boxes, Headphones, Briefcase } from 'lucide-react';
import { ServiceItem } from '../../data/company';

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  className = '',
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'clipboard-check':
        return <ClipboardCheck className="w-5 h-5 text-[#174D35]" />;
      case 'package':
        return <Package className="w-5 h-5 text-[#174D35]" />;
      case 'boxes':
        return <Boxes className="w-5 h-5 text-[#174D35]" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-[#174D35]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#174D35]" />;
    }
  };

  return (
    <div
      className={`service-card-item bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E7DF] card-shadow-soft hover:card-shadow-hover transition-all duration-300 flex items-start gap-4 group hover:-translate-y-0.5 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] group-hover:bg-[#174D35] flex items-center justify-center shrink-0 transition-colors duration-200">
        <div className="group-hover:text-white transition-colors duration-200">
          {renderIcon(service.iconName)}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-serif-display text-lg font-normal text-[#252A26] group-hover:text-[#174D35] transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#555C56] leading-relaxed font-sans-body">
          {service.description}
        </p>
      </div>
    </div>
  );
};
