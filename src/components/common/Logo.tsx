import React from 'react';

interface LogoProps {
  variant?: 'corporate' | 'emblem' | 'combined';
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'combined',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  if (variant === 'corporate') {
    // Exact reproduction of user uploaded logo-1
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <svg viewBox="0 0 260 76" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Letter F */}
            <path d="M14 12 H48 L45 22 H29 L28 30 H43 L40 40 H25 L20 62 H8 L14 12 Z" fill="#005DA6" />
            
            {/* Letter O with crosshair target */}
            <g transform="translate(68, 36) skewX(-12)">
              <circle cx="0" cy="0" r="22" stroke="#005DA6" strokeWidth="6" fill="none" />
              <circle cx="0" cy="0" r="16" fill="#D62828" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#FFFFFF" strokeWidth="2.5" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="6" fill="#D62828" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>

            {/* Letter C */}
            <path d="M124 16 C109 16 98 26 95 39 C92 52 101 62 116 62 C127 62 133 57 136 52 L127 47 C124 50 121 52 115 52 C108 52 104 47 106 39 C107 31 113 26 120 26 C125 26 128 29 130 32 L139 26 C136 20 130 16 124 16 Z" fill="#005DA6" />

            {/* Letter U */}
            <path d="M145 14 L136 46 C134 51 137 55 141 57 C144 59 149 60 155 60 C162 60 167 58 170 54 C173 50 175 45 177 39 L183 14 H171 L166 36 C164 41 162 49 155 49 C151 49 149 45 150 41 L157 14 H145 Z" fill="#005DA6" />

            {/* Letter S */}
            <path d="M205 16 C195 16 186 21 184 29 C182 36 188 38 194 40 C202 42 206 44 204 49 C203 53 198 54 193 54 C185 54 181 50 179 45 L168 47 C170 56 178 62 191 62 C202 62 213 57 215 48 C217 40 210 37 202 35 C195 33 192 31 193 27 C194 24 199 23 204 23 C209 23 213 25 215 29 L225 25 C221 19 213 16 205 16 Z" fill="#005DA6" />
          </g>
          <text x="12" y="74" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="13" fill="#D62828" letterSpacing="1.2">
            AGROTECH PVT. LTD.
          </text>
        </svg>
      </div>
    );
  }

  // Reference Mockup style: Circular leaf emblem + Clean serif/bold wordmark with optional corporate badge
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Agricultural Circular Leaf Emblem */}
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          isDark
            ? 'bg-[#174D35] text-[#D6A84F] border border-[#2B6045]'
            : 'bg-[#174D35] text-white shadow-xs'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-currentColor stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          {/* Stylized leaf with center vein */}
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="currentColor" fillOpacity={isDark ? "0.15" : "0.1"} />
          <path d="M8 16C9 13.5 11 9 17 7C16 11 14 15 8 16Z" fill="currentColor" fillOpacity={isDark ? "0.4" : "0.3"} />
          <path d="M7 17L17 7" strokeWidth="2" />
          <path d="M11 13L15 13" />
          <path d="M13 11L13 15" />
        </svg>
      </div>

      {/* Brand Name Lockup */}
      <div className="flex flex-col leading-none font-sans-body">
        <span
          className={`font-extrabold tracking-wider text-base sm:text-lg ${
            isDark ? 'text-white' : 'text-[#174D35]'
          }`}
        >
          FOCUS
        </span>
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold mt-0.5 ${
            isDark ? 'text-[#D6A84F]' : 'text-[#4F8054]'
          }`}
        >
          AGROTECH
        </span>
      </div>
    </div>
  );
};
