import React, { useState } from 'react';
import { MagneticButton } from './MagneticButton.tsx';

interface AboutSectionProps {
  bookingLink: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ bookingLink }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="bg-[#F7F1E6] border border-[#1B2A4A]/12 rounded-[28px] p-8 sm:p-12 md:p-16 shadow-xs">
        {/* Header row with small and round me.jpg */}
        <div className="flex items-center gap-5 sm:gap-6 mb-10 pb-8 border-b border-[#1B2A4A]/10">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full overflow-hidden border-2 border-[#1B2A4A]/15 bg-gradient-to-br from-[#1B2A4A] to-[#E8590C]">
            {!imgError ? (
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-01_at_10.10.30_PM_f1dfc110.jpeg"
                alt="SH Deshpande"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-[#F7F1E6]">
                SHD
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-1">
              About me
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2A4A] tracking-tight">
              A note from SH Deshpande
            </h2>
          </div>
        </div>

        {/* Letter body in a slightly larger reading size */}
        <div className="space-y-6 text-lg sm:text-xl text-[#1B2A4A]/90 leading-relaxed font-sans max-w-[65ch]">
          <p>
            I am a passionate website designer and developer based in Bangalore, running{' '}
            <strong className="font-semibold text-[#1B2A4A]">Website Studio of Mohan</strong>.
          </p>
          <p>
            I specialise in creating modern, professional and attractive websites for businesses.
          </p>
          <p>
            My goal is to help businesses grow online with affordable, creative and high-quality websites.
          </p>
          <p>
            I believe every business deserves a strong online presence.
          </p>
        </div>

        {/* Handwritten signature in Caveat font */}
        <div className="mt-10 pt-6">
          <div className="font-signature text-5xl sm:text-6xl text-[#1B2A4A] select-none -rotate-2">
            SH
          </div>
        </div>

        {/* Call to action button */}
        <div className="mt-10">
          <MagneticButton
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="!px-8 !py-4 font-semibold text-base"
          >
            Book a 20 minute call with SH
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
