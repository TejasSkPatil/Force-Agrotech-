import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'btn-interactive inline-flex items-center justify-center font-medium font-sans-body cursor-pointer whitespace-nowrap active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-6 py-3.5 rounded-full gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#174D35] text-white hover:bg-[#123E2A] shadow-xs hover:shadow-md border border-[#174D35]',
    secondary:
      'bg-[#EBF2ED] text-[#174D35] hover:bg-[#DFEAE2] border border-[#D5E2D9]',
    outline:
      'bg-transparent text-[#174D35] border border-[#174D35]/35 hover:border-[#174D35] hover:bg-[#174D35]/5',
    white:
      'bg-white text-[#174D35] hover:bg-[#F7F9F7] shadow-xs hover:shadow-md border border-neutral-100',
    ghost:
      'bg-transparent text-[#174D35] hover:bg-[#174D35]/8 border border-transparent',
  }[variant];

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {withArrow && <ArrowRight className="w-4 h-4 shrink-0 btn-arrow" />}
    </button>
  );
};
