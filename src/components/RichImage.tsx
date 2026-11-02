import React, { useState } from 'react';

interface RichImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  initials?: string;
  number?: string;
  subtitle?: string;
  arch?: boolean;
}

export const RichImage: React.FC<RichImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  initials,
  number,
  subtitle,
  arch = false,
}) => {
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImgError = () => {
    setHasError(true);
  };

  const displayText = number || initials || '';

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#1B2A4A] via-[#2A1E38] to-[#E8590C] ${
        arch
          ? 'rounded-t-[140px] md:rounded-t-[200px] rounded-b-none'
          : 'rounded-[28px]'
      } ${aspectRatio} ${className}`}
    >
      {/* Real SVG film grain layer at 5% opacity */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle fine architectural grid lines */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#F7F1E6]/10" />
        <div className="absolute right-6 top-0 bottom-0 w-[1px] bg-[#F7F1E6]/10" />
        <div className="absolute left-0 right-0 bottom-6 h-[1px] bg-[#F7F1E6]/10" />
      </div>

      {/* Rich Fallback Panel underneath in case image is missing or loading */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
        {displayText && (
          <span
            className="font-serif text-7xl md:text-9xl tracking-wider select-none leading-none"
            style={{
              WebkitTextStroke: '2px rgba(247, 241, 230, 0.45)',
              color: 'transparent',
              fontFamily: '"Instrument Serif", Georgia, serif',
            }}
          >
            {displayText}
          </span>
        )}
        {subtitle && (
          <span className="mt-4 font-sans text-xs md:text-sm font-medium tracking-[0.2em] text-[#F7F1E6]/75 uppercase">
            {subtitle}
          </span>
        )}
      </div>

      {/* Actual image rendered with object-fit cover */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={handleImgError}
          referrerPolicy="no-referrer"
          className={`relative z-20 h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
