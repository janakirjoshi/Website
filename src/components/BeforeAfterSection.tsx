import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const withoutList = [
  'Answering enquiry messages late to clarify how many pages someone wants.',
  'Wondering which open quotes are still active and what rupees remain at risk.',
  'Searching through posts hoping someone is asking for website help.',
  'Beginning work before the client agrees to lock the price.',
];

const withList = [
  'Reviewing short enquiry submissions with the pages and budget already fixed.',
  'Checking the board that shows every open quote and the rupees at risk.',
  'Opening your Monday list of people publicly asking for a website.',
  'Knowing the price is locked before the work starts.',
];

export const BeforeAfterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'without' | 'with'>('without');
  const prefersReducedMotion = useReducedMotion();

  const isWithout = activeTab === 'without';

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-3">
          Your evening
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B2A4A] tracking-tight">
          Before and after
        </h2>
      </div>

      {/* Two-position switch */}
      <div className="flex justify-center mb-14">
        <div className="inline-flex p-1.5 bg-[#F7F1E6] border border-[#1B2A4A]/15 rounded-full shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('without')}
            className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-200 select-none whitespace-nowrap ${
              isWithout
                ? 'text-[#1B2A4A] font-semibold'
                : 'text-[#1B2A4A]/65 hover:text-[#1B2A4A]'
            }`}
          >
            {isWithout && (
              <motion.div
                layoutId="switch-pill"
                className="absolute inset-0 bg-[#F7F1E6] border border-[#1B2A4A]/20 rounded-full shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            Without Mohanwebsitestudio
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('with')}
            className={`relative px-5 sm:px-7 py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-200 select-none whitespace-nowrap ${
              !isWithout
                ? 'text-[#1B2A4A] font-semibold'
                : 'text-[#1B2A4A]/65 hover:text-[#1B2A4A]'
            }`}
          >
            {!isWithout && (
              <motion.div
                layoutId="switch-pill"
                className="absolute inset-0 bg-[#E8590C]/15 border border-[#E8590C]/40 rounded-full shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            With Mohanwebsitestudio
          </button>
        </div>
      </div>

      {/* Crossfading Day-in-the-life lists stacked in the same space */}
      <div className="relative min-h-[320px] max-w-2xl mx-auto bg-[#F7F1E6] border border-[#1B2A4A]/12 rounded-[28px] p-8 sm:p-10 shadow-xs">
        <AnimatePresence mode="wait" initial={false}>
          {isWithout ? (
            <motion.div
              key="without"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              {withoutList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-baseline gap-4 pb-4 border-b border-[#1B2A4A]/8 last:border-b-0 last:pb-0"
                >
                  <span className="font-serif text-xl font-normal text-[#1B2A4A]/40 shrink-0">
                    0{index + 1}
                  </span>
                  <p className="text-base sm:text-lg text-[#1B2A4A]/85 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="with"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              {withList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-baseline gap-4 pb-4 border-b border-[#1B2A4A]/8 last:border-b-0 last:pb-0"
                >
                  <span className="font-serif text-xl font-normal text-[#E8590C] shrink-0">
                    0{index + 1}
                  </span>
                  <p className="text-base sm:text-lg text-[#1B2A4A] font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
