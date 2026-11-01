import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'A 20 minute call',
    description: 'We talk through your business and agree on what you need.',
  },
  {
    number: '02',
    title: 'A plan for your business',
    description: 'We fix the pages, the setup, and lock the price before the work starts.',
  },
  {
    number: '03',
    title: 'I set it up and show your team',
    description: 'I build your setup and walk you through how it runs.',
  },
];

export const HowWeStartSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.3'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" className="py-24 md:py-36 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-16">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-3">
          The process
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B2A4A] tracking-tight">
          How we start
        </h2>
      </div>

      <div ref={containerRef} className="relative pl-8 sm:pl-12">
        {/* Thin vertical line background */}
        <div className="absolute left-3 sm:left-4 top-2 bottom-8 w-[2px] bg-[#1B2A4A]/12" />

        {/* Vertical line that fills with the accent colour as you scroll */}
        <motion.div
          style={{
            height: prefersReducedMotion ? '100%' : lineHeight,
          }}
          className="absolute left-3 sm:left-4 top-2 w-[2px] bg-[#E8590C] origin-top"
        />

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Step indicator dot */}
              <div className="absolute -left-8 sm:-left-12 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-[#F7F1E6] border-2 border-[#E8590C] flex items-center justify-center text-xs font-semibold text-[#1B2A4A] shadow-xs">
                {idx + 1}
              </div>

              <div>
                <span className="font-serif text-xl sm:text-2xl text-[#E8590C] block mb-1">
                  Step {step.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1B2A4A] mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-[#1B2A4A]/80 leading-relaxed max-w-[62ch]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price line sitting under step 3 */}
        <div className="mt-16 pt-8 border-t border-[#1B2A4A]/12">
          <div className="bg-[#F7F1E6] border border-[#1B2A4A]/15 rounded-[24px] p-6 sm:p-8">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-2">
              Pricing
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-[#1B2A4A] mb-2">
              Rs 15,000 setup + Rs 5,000 a month
            </p>
            <p className="text-sm sm:text-base text-[#1B2A4A]/75 leading-relaxed">
              The studio pays once to set it up, then a small monthly fee to keep it running.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
