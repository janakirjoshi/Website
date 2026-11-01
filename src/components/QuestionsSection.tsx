import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Who is this for?',
    answer:
      'Who ever is intrested in website to thair buisness them i serve. I live near the city of Bangalore, in Tumkur, and I want clients from Bangalore.',
  },
  {
    question: 'What exactly do you set up?',
    answer:
      'You set up a short enquiry form that fixes the pages and the budget, a board that shows every open quote and the rupees at risk, and a Monday list of people publicly asking for a website. The studio pays once to set it up, then a small monthly fee to keep it running.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'The timeline is agreed on the call before the work starts.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Rs 15,000 setup + Rs 5,000 a month. Lock the price before the work starts.',
  },
  {
    question: 'How do we start?',
    answer:
      'Book a 20 minute call. We review your business, agree on the plan, and lock the price before the work starts.',
  },
];

export const QuestionsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-14">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-3">
          FAQ
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1B2A4A] tracking-tight">
          Questions
        </h2>
      </div>

      <div className="divide-y divide-[#1B2A4A]/12 border-t border-[#1B2A4A]/12">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-6 sm:py-8">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left gap-6 group focus-visible:outline-2 focus-visible:outline-[#E8590C]"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-2xl sm:text-[28px] text-[#1B2A4A] tracking-tight leading-snug group-hover:text-[#E8590C] transition-colors">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 w-8 h-8 rounded-full border border-[#1B2A4A]/15 flex items-center justify-center text-[#1B2A4A]"
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-base sm:text-lg text-[#1B2A4A]/80 leading-relaxed max-w-[65ch]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
