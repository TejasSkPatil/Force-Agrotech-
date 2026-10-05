import React from 'react';
import { LucideIcon, Sprout } from 'lucide-react';

interface SectionLabelProps {
  label: string;
  icon?: LucideIcon | boolean;
  light?: boolean;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  icon = false,
  light = false,
  className = '',
}) => {
  const IconComponent = typeof icon === 'boolean' ? (icon ? Sprout : null) : icon;

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase mb-3 font-sans-body ${
        light ? 'text-[#D6A84F]' : 'text-[#4F8054]'
      } ${className}`}
    >
      {IconComponent && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </div>
  );
};
