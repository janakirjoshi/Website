import React, { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton.tsx';

interface TopBarProps {
  bookingLink: string;
}

export const TopBar: React.FC<TopBarProps> = ({ bookingLink }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOverInk, setIsOverInk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      // Check if header is currently intersecting any dark/ink section
      const inkSections = document.querySelectorAll('[data-theme="ink"]');
      let overInk = false;
      const headerTop = 40; // sampling point around header center

      inkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= headerTop && rect.bottom >= headerTop) {
          overInk = true;
        }
      });

      setIsOverInk(overInk);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine top bar styling:
  // - Top: transparent
  // - Over ink section: ink background with cream text
  // - Over cream section: cream background with hairline border
  const barBackground = !scrolled
    ? 'bg-transparent border-transparent'
    : isOverInk
    ? 'bg-[#1B2A4A] border-b border-[#F7F1E6]/12 text-[#F7F1E6] shadow-sm'
    : 'bg-[#F7F1E6] border-b border-[#1B2A4A]/12 text-[#1B2A4A] shadow-xs';

  const linkColor = isOverInk
    ? 'text-[#F7F1E6]/85 hover:text-[#E8590C]'
    : 'text-[#1B2A4A]/80 hover:text-[#1B2A4A]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${barBackground}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 md:px-12">
        {/* Zone 1: Logo (placed in a small cream rounded panel whenever sitting on ink) */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-[#E8590C]"
          aria-label="Mohanwebsitestudio home"
        >
          <div
            className={`transition-all duration-300 ${
              isOverInk
                ? 'bg-[#F7F1E6] rounded-2xl p-1.5 shadow-xs'
                : 'bg-transparent p-0'
            }`}
          >
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-01_at_10.10.30_PM_f1dfc110.jpeg"
              alt="Mohanwebsitestudio"
              className="h-10 w-10 md:h-11 md:w-11 rounded-xl object-cover shadow-xs"
            />
          </div>
        </a>

        {/* Zone 2: 3 clean navigation links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight"
          aria-label="Primary navigation"
        >
          <a
            href="#what-i-do"
            className={`transition-colors whitespace-nowrap shrink-0 ${linkColor}`}
          >
            What I do
          </a>
          <a
            href="#how-it-works"
            className={`transition-colors whitespace-nowrap shrink-0 ${linkColor}`}
          >
            How it works
          </a>
          <a
            href="#about"
            className={`transition-colors whitespace-nowrap shrink-0 ${linkColor}`}
          >
            About
          </a>
          <a
            href="#enquiry-form"
            className={`transition-colors whitespace-nowrap shrink-0 ${linkColor}`}
          >
            Enquiry
          </a>
        </nav>

        {/* Zone 3: Book a call pill */}
        <div className="flex items-center shrink-0">
          <MagneticButton
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            variant={isOverInk ? 'primary' : 'pill'}
            className="!px-5 !py-2.5 !text-sm font-medium"
          >
            Book a call
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};
