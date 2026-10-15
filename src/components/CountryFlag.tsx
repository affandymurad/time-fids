import React from 'react';

interface CountryFlagProps {
  countryCode: string; // ISO 3166-1 alpha-2, e.g. "id", "us", "gb", "jp"
  countryName?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Accurate flag artwork from the `flag-icons` package (4:3 SVGs), bundled locally by Vite
// so rendering stays 100% offline. Files are served as hashed asset URLs / data URIs.
const FLAG_URLS = import.meta.glob('/node_modules/flag-icons/flags/4x3/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const flagUrlByCode: Record<string, string> = {};
for (const [path, url] of Object.entries(FLAG_URLS)) {
  const code = path.split('/').pop()!.replace('.svg', '');
  flagUrlByCode[code] = url;
}

// Universal / UTC placeholder
const UNIVERSAL_SVG = `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block"><rect width="600" height="400" fill="#4a7fb5"/><circle cx="300" cy="200" r="100" fill="none" stroke="#ffffff" stroke-width="14"/><line x1="200" y1="200" x2="400" y2="200" stroke="#ffffff" stroke-width="12"/><line x1="300" y1="100" x2="300" y2="300" stroke="#ffffff" stroke-width="12"/></svg>`;

/**
 * Returns raw HTML markup for a given 2-letter country code.
 * Used both by <CountryFlag> and by MapLibre HTML markers.
 * An <img> is used (not inline <svg>) so internal ids of different flags never collide.
 */
export function getCountryFlagSvgString(countryCode: string): string {
  const code = (countryCode || 'un').toLowerCase().trim();
  if (code === 'un') return UNIVERSAL_SVG;
  const url = flagUrlByCode[code];
  if (url) {
    return `<img src="${url}" alt="" draggable="false" class="w-full h-full block object-cover"/>`;
  }
  // Fallback vector pill with the ISO code
  return `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block"><rect width="600" height="400" fill="#4a7fb5" rx="20"/><text x="300" y="245" fill="#ffffff" font-size="160" font-weight="900" text-anchor="middle" font-family="sans-serif">${code.toUpperCase()}</text></svg>`;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName = '',
  className = '',
  size = 'md',
}) => {
  const code = (countryCode || 'un').toLowerCase().trim();

  const sizeClasses = {
    sm: 'w-4.5 h-3',
    md: 'w-6 h-4',
    lg: 'w-8 h-5.5',
  };

  return (
    <span
      title={countryName || code.toUpperCase()}
      dangerouslySetInnerHTML={{ __html: getCountryFlagSvgString(code) }}
      className={`inline-flex items-center justify-center overflow-hidden rounded-xs border border-black/20 dark:border-white/20 shadow-2xs select-none shrink-0 ${sizeClasses[size]} ${className}`}
    />
  );
};
