import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MagneticButton } from './MagneticButton.tsx';
import { RichImage } from './RichImage.tsx';

interface HeroProps {
  bookingLink: string;
  whatsappLink: string;
}

export const Hero: React.FC<HeroProps> = ({ bookingLink, whatsappLink }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Arch moves slightly slower than the page (parallax)
  const archY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
    >
      {/* 2-column layout on desktop, arch above words on phone */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 justify-between">
        {/* Left Column: Typography and CTAs */}
        <div className="w-full lg:w-7/12 flex flex-col items-start">
          {/* Small line from MY DETAILS */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-medium tracking-tight text-[#1B2A4A]/70 mb-5 max-w-xl"
          >
            For who ever is intrested in website to thair buisness them i serve in I live near the city of Bangalore, in Tumkur, and I want clients from Bangalore.
          </motion.p>

          {/* Headline in very large serif type with one key word set in italic in the accent colour */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={prefersReducedMotion ? false : { y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-[44px] sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.0] tracking-tight text-[#1B2A4A]"
              style={{ textWrap: 'balance' }}
            >
              Lock the price before the work{' '}
              <span className="italic font-normal text-[#E8590C]">starts</span>.
            </motion.h1>
          </div>

          {/* One plain line saying what I set up */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-base md:text-lg leading-[1.6] text-[#1B2A4A]/80 mb-10 max-w-[62ch]"
          >
            You set up a short enquiry form that fixes the pages and the budget, a board that shows every open quote and the rupees at risk, and a Monday list of people publicly asking for a website.
          </motion.p>

          {/* Actions: Main button & WhatsApp */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <MagneticButton
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="!px-8 !py-4 font-semibold text-base"
            >
              Book a 20 minute call
            </MagneticButton>

            <MagneticButton
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="!px-6 !py-4 font-medium text-base"
            >
              Message me on WhatsApp
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column: me.jpg in tall arch frame with floating badge */}
        <div className="w-full sm:w-2/3 lg:w-5/12 flex justify-center">
          <motion.div
            style={{ y: archY }}
            initial={
              prefersReducedMotion
                ? false
                : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }
            }
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative w-full max-w-[340px] md:max-w-[400px]"
          >
            {/* Arch frame container */}
            <div className="relative shadow-xl shadow-[#1B2A4A]/5">
              <RichImage
                src="/me.jpg"
                alt="SH Deshpande, founder of Mohanwebsitestudio"
                aspectRatio="aspect-[3/4]"
                arch={true}
                initials="SHD"
                subtitle="SH DESHPANDE"
                className="w-full border border-[#1B2A4A]/10"
              />

              {/* Floating card on corner */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-6 z-30 bg-[#F7F1E6] text-[#1B2A4A] border border-[#1B2A4A]/12 rounded-[20px] px-5 py-3.5 shadow-lg shadow-[#1B2A4A]/8 backdrop-blur-xs">
                <p className="text-xs md:text-sm font-semibold tracking-tight">
                  SH Deshpande, founder of Mohanwebsitestudio
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
