import React from 'react';
import { MagneticButton } from './MagneticButton.tsx';

interface FinalInvitationProps {
  bookingLink: string;
  whatsappLink: string;
  email: string;
}

export const FinalInvitation: React.FC<FinalInvitationProps> = ({
  bookingLink,
  whatsappLink,
  email,
}) => {
  return (
    <section
      data-theme="ink"
      className="relative w-full bg-[#1B2A4A] text-[#F7F1E6] py-28 md:py-36 lg:py-44 px-6 md:px-12 film-grain"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Big serif line */}
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-10 max-w-3xl">
          Let's give your evenings back to your business.
        </h2>

        {/* The booking button in the accent colour */}
        <div className="mb-8">
          <MagneticButton
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="!px-10 !py-4 text-lg font-semibold shadow-lg"
          >
            Book a 20 minute call
          </MagneticButton>
        </div>

        {/* WhatsApp and email under it as plain links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm sm:text-base text-[#F7F1E6]/75">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8590C] transition-colors underline underline-offset-4"
          >
            Message me on WhatsApp
          </a>
          <span className="hidden sm:inline text-[#F7F1E6]/30">·</span>
          <a
            href={`mailto:${email}`}
            className="hover:text-[#E8590C] transition-colors underline underline-offset-4"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};
