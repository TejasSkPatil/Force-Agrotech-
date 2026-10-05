import React from 'react';

interface WavyDividerProps {
  color?: string;
  className?: string;
}

export const WavyDivider: React.FC<WavyDividerProps> = ({
  color = '#D6A84F',
  className = '',
}) => {
  return (
    <div className={`overflow-hidden py-2 ${className}`}>
      <svg
        className="w-48 h-6 overflow-visible"
        viewBox="0 0 200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12 Q 25 0, 50 12 T 100 12 T 150 12 T 200 12"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};
