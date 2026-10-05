import React from 'react';

interface SectionHeadingProps {
  title: string;
  italicPart?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  italicPart,
  subtitle,
  align = 'left',
  light = false,
  size = 'lg',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  const sizeClasses = {
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl lg:text-[42px]',
    xl: 'text-4xl sm:text-5xl lg:text-[54px]',
  }[size];

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      <h2
        className={`font-serif-display font-normal leading-[1.14] tracking-tight ${sizeClasses} ${
          light ? 'text-white' : 'text-[#252A26]'
        }`}
      >
        {title}{' '}
        {italicPart && (
          <span className="italic font-normal font-serif-display block sm:inline text-[#174D35] dark:text-[#D6A84F]">
            {italicPart}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-3.5 text-base sm:text-lg leading-relaxed font-sans-body max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-neutral-300' : 'text-[#555C56]'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
