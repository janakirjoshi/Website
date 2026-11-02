import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { RichImage } from './RichImage.tsx';

interface CardItem {
  id: string;
  number: string;
  title: string;
  image: string;
  today: string;
  withStudio: string;
  subtitle: string;
}

const BRAND_IMAGE = '/assets/aistudio/WhatsApp_Image_2026-11-01_at_10.10.30_PM_f1dfc110.jpeg';

const cards: CardItem[] = [
  {
    id: '01',
    number: '01',
    title: 'Enquiry form',
    image: BRAND_IMAGE,
    subtitle: 'FIXED PAGES & BUDGET',
    today: 'Enquiries arrive without scope or budget, leaving you to guess the pages and negotiate back and forth.',
    withStudio: 'A short enquiry form fixes the pages and the budget before conversations begin.',
  },
  {
    id: '02',
    number: '02',
    title: 'Quote board',
    image: BRAND_IMAGE,
    subtitle: 'OPEN QUOTES & RUPEES AT RISK',
    today: 'Open quotes drift across messages and notebooks with no clear view of which proposals are pending.',
    withStudio: 'A board shows every open quote and the rupees at risk in one clear place.',
  },
  {
    id: '03',
    number: '03',
    title: 'Monday list',
    image: BRAND_IMAGE,
    subtitle: 'PUBLIC WEBSITE REQUESTS',
    today: 'You look for clients by asking around after the current project wraps up.',
    withStudio: 'A Monday list brings people publicly asking for a website straight to you.',
  },
];

export const WhatIDoSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Laptop horizontal translation tied to scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%']);

  return (
    <section id="what-i-do" className="relative bg-[#F7F1E6]">
      {/* DESKTOP PINNED VIEW (hidden if reduced motion or on mobile) */}
      {!prefersReducedMotion ? (
        <div ref={targetRef} className="hidden lg:block relative h-[280vh]">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-8 lg:px-16">
            <div className="max-w-7xl mx-auto w-full mb-8">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-2">
                What I set up
              </span>
              <h2 className="font-serif text-5xl xl:text-6xl text-[#1B2A4A] tracking-tight">
                What I do
              </h2>
            </div>

            {/* Horizontal sliding cards container */}
            <div className="max-w-7xl mx-auto w-full">
              <motion.div style={{ x }} className="flex gap-8 will-change-transform">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="w-[70vw] max-w-[820px] shrink-0 bg-[#F7F1E6] border border-[#1B2A4A]/12 rounded-[28px] p-6 lg:p-8 shadow-xs flex flex-col"
                  >
                    {/* Picture filling the top 60% */}
                    <div className="w-full h-[360px] lg:h-[420px] mb-6 overflow-hidden rounded-[20px]">
                      <RichImage
                        src={card.image}
                        alt={card.title}
                        aspectRatio="h-full w-full"
                        number={card.number}
                        subtitle={card.subtitle}
                        className="h-full w-full rounded-[20px]"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-serif text-3xl font-normal text-[#E8590C]">
                        {card.number}
                      </span>
                      <h3 className="font-serif text-3xl text-[#1B2A4A]">
                        {card.title}
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-base text-[#1B2A4A]/80 leading-relaxed">
                      <p>
                        <span className="font-semibold text-[#1B2A4A]">Today:</span>{' '}
                        {card.today}
                      </p>
                      <p>
                        <span className="font-semibold text-[#1B2A4A]">
                          With Mohanwebsitestudio:
                        </span>{' '}
                        {card.withStudio}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}

      {/* MOBILE & REDUCED MOTION VIEW: swipeable on phone, stacked if reduced motion */}
      <div
        className={`${
          !prefersReducedMotion ? 'lg:hidden' : ''
        } py-20 px-6 max-w-7xl mx-auto`}
      >
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1B2A4A]/60 block mb-2">
            What I set up
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1B2A4A] tracking-tight">
            What I do
          </h2>
        </div>

        {/* On mobile: swipe horizontally with snap; with reduced motion: clean stacked list */}
        <div
          className={
            prefersReducedMotion
              ? 'space-y-8'
              : 'flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 no-scrollbar'
          }
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${
                prefersReducedMotion
                  ? 'w-full'
                  : 'w-[85vw] max-w-[380px] shrink-0 snap-center'
              } bg-[#F7F1E6] border border-[#1B2A4A]/12 rounded-[28px] p-6 shadow-xs flex flex-col`}
            >
              <div className="w-full h-56 sm:h-64 mb-6 overflow-hidden rounded-[20px]">
                <RichImage
                  src={card.image}
                  alt={card.title}
                  aspectRatio="h-full w-full"
                  number={card.number}
                  subtitle={card.subtitle}
                  className="h-full w-full rounded-[20px]"
                />
              </div>

              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-serif text-2xl font-normal text-[#E8590C]">
                  {card.number}
                </span>
                <h3 className="font-serif text-2xl text-[#1B2A4A]">
                  {card.title}
                </h3>
              </div>

              <div className="space-y-2 text-sm sm:text-base text-[#1B2A4A]/80 leading-relaxed">
                <p>
                  <span className="font-semibold text-[#1B2A4A]">Today:</span>{' '}
                  {card.today}
                </p>
                <p>
                  <span className="font-semibold text-[#1B2A4A]">
                    With Mohanwebsitestudio:
                  </span>{' '}
                  {card.withStudio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
